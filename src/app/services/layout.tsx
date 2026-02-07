import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | InventiveByte LLC",
  description:
    "SaaS development, web and mobile apps, analytics, e-commerce, recruitment tools, SEO, Google Ads, web design, audits, and marketing. InventiveByte LLC builds what scales. Serving London, Birmingham, Coventry and beyond.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
