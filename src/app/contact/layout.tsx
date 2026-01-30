import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | InventiveByte LLC",
  description:
    "Get in touch with InventiveByte LLC. Schedule an appointment, request a quote, or send a message. Montana-based SaaS and digital product studio.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
