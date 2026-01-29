import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createEvent } from "@/lib/google-calendar";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, serviceType, message, date, time } =
      await req.json();

    // Validation
    if (!name || !email || !phone || !serviceType || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create calendar event
    const startDate = new Date(time);
    const appointmentDuration =
      parseInt(process.env.CALENDAR_APPOINTMENT_DURATION || "60") * 60000;
    const endDate = new Date(startDate.getTime() + appointmentDuration);

    const eventId = await createEvent({
      summary: `Appointment: ${name} - ${serviceType}`,
      description: `Appointment with ${name}\n\nContact Information:\nEmail: ${email}\nPhone: ${phone}\n\nService Type: ${serviceType}\n\n${message ? `Message: ${message}` : ""}`,
      start: startDate,
      end: endDate,
      attendeeEmail: email,
    });

    // Send confirmation emails (non-blocking - don't fail if email fails)
    let emailError: string | null = null;
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Email to admin
      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: email,
        subject: `New Appointment Scheduled: ${name} - ${serviceType}`,
        html: `
          <h2>New Appointment Scheduled</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service Type:</strong> ${serviceType}</p>
          <p><strong>Date & Time:</strong> ${startDate.toLocaleString()}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
          <p><strong>Calendar Event ID:</strong> ${eventId}</p>
        `,
      });

      // Email to user
      await transporter.sendMail({
        from: `"InventiveByte LLC" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Appointment Confirmed - InventiveByte LLC",
        html: `
          <h2>Appointment Confirmed</h2>
          <p>Hi ${name},</p>
          <p>Your appointment has been scheduled successfully!</p>
          <p><strong>Date & Time:</strong> ${startDate.toLocaleString()}</p>
          <p><strong>Service:</strong> ${serviceType}</p>
          <p>We look forward to meeting with you. If you need to reschedule or have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>InventiveByte LLC</p>
        `,
      });
    } catch (emailErr) {
      // Log email error but don't fail the appointment
      emailError = emailErr instanceof Error ? emailErr.message : "Email sending failed";
      console.error("Email sending error (non-critical):", emailErr);
    }

    // Track conversion (server-side if needed)
    // Client-side tracking is handled in the component

    return NextResponse.json({
      success: true,
      eventId,
      message: "Appointment scheduled successfully",
      emailSent: !emailError,
      emailError: emailError || undefined,
    });
  } catch (error: unknown) {
    console.error("Appointment scheduling error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to schedule appointment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
