import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | InventiveByte LLC",
  description:
    "Frequently asked questions about InventiveByte LLC — what we do, where we're located, how to get a quote, and how to work with us.",
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
