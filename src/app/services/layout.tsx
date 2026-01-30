import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | InventiveByte LLC",
  description:
    "SaaS development, web and mobile apps, analytics, e-commerce, recruitment tools, and consulting. InventiveByte LLC builds what scales.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
