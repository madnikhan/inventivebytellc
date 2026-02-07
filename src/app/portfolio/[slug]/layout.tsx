import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { alternates: { canonical: `/portfolio/${slug}` } };
}

export default function PortfolioSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
