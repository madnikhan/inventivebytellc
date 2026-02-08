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
    "google-ads-ppc": "Google Ads & PPC | Services | InventiveByte LLC",
    "website-audits": "Website Audits | Services | InventiveByte LLC",
    "other-marketing-services": "Other Marketing Services | InventiveByte LLC",
    "website-maintenance": "Website Maintenance | Services | InventiveByte LLC",
    "consulting-strategy": "Consulting & Strategy | Services | InventiveByte LLC",
    "recruitment-hr-tools": "Recruitment & HR Tools | Services | InventiveByte LLC",
    "ecommerce-marketplaces": "E-Commerce & Marketplaces | Services | InventiveByte LLC",
    "saas-development": "SaaS Development | Services | InventiveByte LLC",
    "web-mobile-apps": "Web & Mobile Apps | Services | InventiveByte LLC",
    "analytics-dashboards": "Analytics & Dashboards | Services | InventiveByte LLC",
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
    "google-ads-ppc":
      "Paid search and display campaigns that bring in qualified traffic. Setup, targeting, and ongoing optimisation. Get started today.",
    "website-audits":
      "A one-off health check of your site: what's broken, slow, or holding you back, with a clear, actionable plan. Get started today.",
    "other-marketing-services":
      "Brand, content, or campaigns tailored to your goals. We put together a plan that fits your budget and timeline. Get started today.",
    "website-maintenance":
      "Ongoing care: hosting, security updates, content changes, and support so your site stays secure and up to date. Get started today.",
    "consulting-strategy":
      "Technical audits, product strategy, and roadmap planning to align build with business goals. Get started today.",
    "recruitment-hr-tools":
      "Applicant tracking, candidate pipelines, and HR platforms that make hiring and people operations easier. Get started today.",
    "ecommerce-marketplaces":
      "Online stores and marketplaces with payments, inventory, and a smooth buyer and seller experience. Get started today.",
    "saas-development":
      "End-to-end SaaS platforms: authentication, billing, dashboards, and scalable infrastructure so you can focus on growth. Get started today.",
    "web-mobile-apps":
      "Responsive web apps and native or cross-platform mobile apps built with modern stacks and best practices. Get started today.",
    "analytics-dashboards":
      "Real-time data visualization, custom reports, and business intelligence tools that drive decisions. Get started today.",
  };
  if (titles[slug]) {
    return {
      title: titles[slug],
      description: descriptions[slug] ?? undefined,
      alternates: { canonical: `/services/${slug}` },
    };
  }
  return { title: "Services | InventiveByte LLC", alternates: { canonical: `/services/${slug}` } };
}

export default function ServiceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
