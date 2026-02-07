import { MetadataRoute } from "next";
import { getPortfolioProjects, getResources } from "@/lib/sanity";

// Use same domain as Search Console property (https://inventivebytellc.com) to avoid redirect issues
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inventivebytellc.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/testimonials`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/testimonials/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/brands`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/appointment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/quote`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/get-started`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/signup`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/legal`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/google-business-profiles`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/seo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/google-local-services-ads`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/web-design`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  let portfolioSlugs: { slug: string }[] = [];
  try {
    const projects = await getPortfolioProjects();
    portfolioSlugs = projects
      .filter((p) => p.slug?.current)
      .map((p) => ({ slug: p.slug!.current }));
  } catch {
    // If Sanity is not configured or fails, sitemap still returns static routes
  }

  const portfolioEntries: MetadataRoute.Sitemap = portfolioSlugs.map(({ slug }) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  let resourceSlugs: { slug: string }[] = [];
  try {
    const resources = await getResources();
    resourceSlugs = resources
      .filter((r) => r.slug?.current)
      .map((r) => ({ slug: r.slug!.current }));
  } catch {
    // Fallback: add static resource slugs if Sanity fails
    resourceSlugs = [
      { slug: "what-is-saas-and-why-it-matters" },
      { slug: "building-mvp-montana" },
      { slug: "choosing-tech-stack-2025" },
    ];
  }

  const resourceEntries: MetadataRoute.Sitemap = resourceSlugs.map(({ slug }) => ({
    url: `${baseUrl}/resources/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...portfolioEntries, ...resourceEntries];
}
