import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, serviceInterest, referralSource } =
      await req.json();

    if (!name || !email || !serviceInterest) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
      subject: `New Sign Up: ${serviceInterest}`,
      html: `
        <h2>New User Sign Up</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <p><strong>Service Interest:</strong> ${serviceInterest}</p>
        ${referralSource ? `<p><strong>Referral Source:</strong> ${referralSource}</p>` : ""}
      `,
    });

    // Welcome email to user
    await transporter.sendMail({
      from: `"InventiveByte LLC" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Welcome to InventiveByte LLC!",
      html: `
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for signing up with InventiveByte LLC!</p>
        <p>We're excited to have you on board. You'll receive updates about our services, new features, and exclusive offers.</p>
        <p>If you have any questions or would like to discuss your project, feel free to reach out to us.</p>
        <p>Best regards,<br>InventiveByte LLC</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Signup error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to sign up";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
