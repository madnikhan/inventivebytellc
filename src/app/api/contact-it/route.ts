import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, service, message } = await req.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, service, message" },
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

    const subject = `IT Service Request: ${service} from ${name}`;
    const body = [
      `Service: ${service}`,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject,
      text: body,
      html: `<pre style="white-space: pre-wrap; font-family: sans-serif;">${body.replace(/\n/g, "<br>")}</pre>`,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("IT contact email error:", error);
    const msg =
      error instanceof Error ? error.message : "Failed to send request";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
