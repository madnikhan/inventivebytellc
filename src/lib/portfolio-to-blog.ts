import {
  getSanityClient,
  portfolioByIdQuery,
  resourceBySlugQuery,
  type SanityPortfolioProject,
} from "./sanity";
import { stripMarkdown } from "./utils";

/**
 * Build a full blog post (resource) body in markdown from a portfolio project.
 */
export function buildResourceBodyFromPortfolio(project: SanityPortfolioProject): string {
  const title = project.title || "Portfolio Project";
  const description = project.description?.trim() || "";
  const longDescription = project.longDescription?.trim() || "";
  const techStack = project.techStack ?? [];
  const category = project.category ?? [];
  const date = project.date ?? "";
  const websiteLink = project.websiteLink?.trim();
  const githubLink = project.githubLink?.trim();

  const sections: string[] = [];

  sections.push(`# ${title}\n`);
  if (description) {
    sections.push("## Overview\n\n");
    sections.push(description);
    sections.push("\n\n");
  }

  if (longDescription) {
    sections.push("## About this project\n\n");
    sections.push(longDescription);
    sections.push("\n\n");
  }

  if (techStack.length > 0) {
    sections.push("## Technology stack\n\n");
    sections.push(techStack.map((t) => `- ${t}`).join("\n"));
    sections.push("\n\n");
  }

  if (category.length > 0) {
    sections.push("## Categories\n\n");
    sections.push(category.join(", "));
    sections.push("\n\n");
  }

  if (date) {
    sections.push(`**Completed:** ${date}\n\n`);
  }

  if (websiteLink || githubLink) {
    sections.push("## Links\n\n");
    if (websiteLink) sections.push(`- [Visit website](${websiteLink})\n`);
    if (githubLink) sections.push(`- [View code on GitHub](${githubLink})\n`);
    sections.push("\n");
  }

  sections.push("---\n\n");
  sections.push(
    "*This post was generated from our portfolio. [View all projects](/portfolio) or [get in touch](/contact) for a similar project.*"
  );

  return sections.join("");
}

/**
 * Build resource document fields (title, slug, excerpt, category, publishedAt, body)
 * for creating or updating a Sanity resource from a portfolio project.
 */
export function buildResourceFromPortfolio(project: SanityPortfolioProject): {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  body: string;
} {
  const slug = project.slug?.current || project._id?.replace(/^drafts\./, "") || "portfolio-project";
  const title = project.title || "Portfolio Project";
  const plainDesc = stripMarkdown(project.description || "") || project.description || "";
  const excerpt = plainDesc.length > 160 ? plainDesc.slice(0, 157) + "..." : plainDesc;
  const body = buildResourceBodyFromPortfolio(project);
  const date = project.date;
  const publishedAt = date
    ? new Date(date.length === 4 ? `${date}-01-01` : date + "T12:00:00.000Z").toISOString()
    : new Date().toISOString();

  return {
    title: `${title} – Case Study`,
    slug,
    excerpt,
    category: "Technical",
    publishedAt,
    body,
  };
}

/**
 * Fetch portfolio by id, build resource payload, and create or update the Resource in Sanity.
 * Requires SANITY_API_TOKEN with write access. Used by API route and revalidate webhook.
 */
export async function createOrUpdateResourceFromPortfolioId(documentId: string): Promise<{
  action: "created" | "updated";
  slug: string;
  resourceId: string;
} | null> {
  const client = getSanityClient();
  if (!client) return null;

  const project = await client.fetch<SanityPortfolioProject | null>(portfolioByIdQuery, {
    id: documentId,
  });
  if (!project || project._type !== "portfolio") return null;

  const resourcePayload = buildResourceFromPortfolio(project);
  const existing = await client.fetch<{ _id: string } | null>(resourceBySlugQuery, {
    slug: resourcePayload.slug,
  });

  const doc = {
    _type: "resource" as const,
    title: resourcePayload.title,
    slug: { _type: "slug" as const, current: resourcePayload.slug },
    excerpt: resourcePayload.excerpt,
    category: resourcePayload.category,
    publishedAt: resourcePayload.publishedAt,
    body: resourcePayload.body,
  };

  if (existing) {
    await client.createOrReplace({ ...doc, _id: existing._id });
    return { action: "updated", slug: resourcePayload.slug, resourceId: existing._id };
  }
  const created = await client.create(doc);
  return { action: "created", slug: resourcePayload.slug, resourceId: created._id };
}
