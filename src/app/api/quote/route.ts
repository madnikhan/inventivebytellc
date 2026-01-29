import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      company,
      projectType,
      budgetRange,
      timeline,
      description,
    } = await req.json();

    if (
      !name ||
      !email ||
      !phone ||
      !projectType ||
      !budgetRange ||
      !timeline ||
      !description
    ) {
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
      subject: `New Quote Request: ${projectType}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Budget Range:</strong> ${budgetRange}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <h3>Project Description:</h3>
        <p>${description.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: `"InventiveByte LLC" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Quote Request Received - InventiveByte LLC",
      html: `
        <h2>Thank You for Your Quote Request, ${name}!</h2>
        <p>We've received your quote request and our team will review it carefully.</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Budget Range:</strong> ${budgetRange}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p>We'll get back to you within 24-48 hours with a detailed estimate and next steps.</p>
        <p>Best regards,<br>InventiveByte LLC</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Quote request error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to submit quote request";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
