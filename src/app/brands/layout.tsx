import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Brands | InventiveByte LLC",
  description:
    "Discover the brands under InventiveByte LLC — SaaS, tools, and digital products we build and scale from Montana.",
};

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
