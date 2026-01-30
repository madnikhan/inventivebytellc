import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Legal | InventiveByte LLC",
  description:
    "Privacy policy and legal notice for InventiveByte LLC. Company registration and data practices.",
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
