import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | InventiveByte LLC",
  description:
    "Explore our portfolio of SaaS platforms, web apps, and digital products. Featured projects from InventiveByte LLC.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
