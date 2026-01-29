import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, interest } = await req.json();

    if (!name || !email || !interest) {
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
      subject: `New Information Request: ${interest}`,
      html: `
        <h2>New Information Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <p><strong>Interest:</strong> ${interest}</p>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: `"InventiveByte LLC" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You for Your Interest - InventiveByte LLC",
      html: `
        <h2>Thank You, ${name}!</h2>
        <p>We've received your information and our team will be in touch soon.</p>
        <p>In the meantime, feel free to explore our portfolio or schedule a consultation.</p>
        <p>Best regards,<br>InventiveByte LLC</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Information form error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to submit form";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
