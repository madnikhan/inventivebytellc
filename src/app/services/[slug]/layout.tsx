import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const titles: Record<string, string> = {
    "google-business-profiles": "Google Business Profile Management | Services | InventiveByte LLC",
    "seo": "SEO for Small Businesses | Services | InventiveByte LLC",
    "google-local-services-ads": "Google Local Services Ads | Services | InventiveByte LLC",
    "web-design": "Web Design | Services | InventiveByte LLC",
  };
  const descriptions: Record<string, string> = {
    "google-business-profiles":
      "Google Business Profile management and optimisation. Get found in local search and on Maps. Serving London, Birmingham, Coventry, Warwick and beyond. Get started today.",
    "seo":
      "SEO for small businesses. Improve search rankings, attract high-intent traffic, and grow organically. London, Birmingham, Coventry and beyond. Get started today.",
    "google-local-services-ads":
      "Google Local Services Ads — pay-per-lead, Google Verified ads for local service businesses. Get more calls and messages. Get started today.",
    "web-design":
      "Professional web design: mobile-friendly, SEO-optimised sites that convert. From landing pages to full websites. Get started today.",
  };
  if (titles[slug]) {
    return { title: titles[slug], description: descriptions[slug] ?? undefined };
  }
  return { title: "Services | InventiveByte LLC" };
}

export default function ServiceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
