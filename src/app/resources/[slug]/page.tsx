import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MarkdownContent from "@/components/ui/MarkdownContent";
import { ArrowLeft } from "lucide-react";
import { getResourceBySlug } from "@/lib/sanity";
import { staticResources } from "@/data/resources";

function getPost(slug: string) {
  const staticPost = staticResources.find((r) => r.slug === slug);
  return staticPost
    ? {
        title: staticPost.title,
        date: staticPost.date,
        category: staticPost.category,
        content: staticPost.body ?? "",
      }
    : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) return { title: "Resource | InventiveByte LLC" };

  const sanityPost = await getResourceBySlug(slug);
  if (sanityPost) {
    const desc =
      (sanityPost.excerpt ?? sanityPost.body?.slice(0, 160) ?? "").replace(/\n/g, " ").trim() + "...";
    return {
      title: `${sanityPost.title} | InventiveByte LLC`,
      description: desc,
      alternates: { canonical: `/resources/${slug}` },
    };
  }

  const staticPost = getPost(slug);
  if (staticPost) {
    return {
      title: `${staticPost.title} | InventiveByte LLC`,
      description: staticPost.content.slice(0, 160).replace(/\n/g, " ").trim() + "...",
      alternates: { canonical: `/resources/${slug}` },
    };
  }

  return { title: "Resource | InventiveByte LLC", alternates: { canonical: `/resources/${slug}` } };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) notFound();

  const sanityPost = await getResourceBySlug(slug);
  const post = sanityPost
    ? {
        title: sanityPost.title,
        date: sanityPost.publishedAt
          ? new Date(sanityPost.publishedAt).toISOString().slice(0, 10)
          : "",
        category: sanityPost.category ?? "Company",
        content: sanityPost.body ?? "",
      }
    : getPost(slug);

  if (!post) notFound();

  const dateFormatted = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen pt-20 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: post.title },
          ]}
          className="mb-8"
        />
        <article>
          <span className="text-xs font-medium text-[#00D9FF] uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4 gradient-text">
            {post.title}
          </h1>
          <time className="text-gray-500" dateTime={post.date}>
            {dateFormatted}
          </time>
          <div className="mt-8">
            <MarkdownContent content={post.content} />
          </div>
        </article>
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 mt-10 text-[#00D9FF] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>
      </div>
    </div>
  );
}
