import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials | InventiveByte LLC",
  description:
    "What our clients and partners say about InventiveByte LLC. Real reviews and ratings from Montana-based SaaS and digital product work.",
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
