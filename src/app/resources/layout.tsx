import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | InventiveByte LLC",
  description:
    "Guides, process notes, and technical insights from InventiveByte LLC — SaaS, product development, and building from Montana.",
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
