import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | InventiveByte LLC",
  description:
    "Learn about InventiveByte LLC — building and scaling SaaS platforms and digital brands from Montana, USA. Our mission, values, and team.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
