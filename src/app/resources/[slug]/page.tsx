import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MarkdownContent from "@/components/ui/MarkdownContent";
import { ArrowLeft } from "lucide-react";

const articles: Record<
  string,
  { title: string; date: string; category: string; content: string }
> = {
  "what-is-saas-and-why-it-matters": {
    title: "What Is SaaS and Why It Matters for Your Business",
    date: "2025-01-15",
    category: "Guides",
    content: `
Software-as-a-Service (SaaS) is software that runs in the cloud and is accessed over the internet, usually via a subscription. Instead of buying and installing software once, you pay on a recurring basis and get updates and support included.

**Why it matters for your business:** SaaS reduces upfront cost, scales with usage, and lets you focus on your product instead of servers and upgrades. At InventiveByte LLC we build SaaS platforms that are secure, scalable, and ready to grow with you. If you're considering a new product or moving an existing one to a subscription model, we can help you scope and build it.
    `.trim(),
  },
  "building-mvp-montana": {
    title: "Building an MVP from Montana: Our Approach",
    date: "2025-01-08",
    category: "Process",
    content: `
We treat an MVP as the smallest version of your product that delivers real value and lets you learn from users. Our approach: define the core problem, pick one primary user flow, build it well, then iterate based on feedback.

We scope with you up front so timelines and budget are clear, use modern stacks for fast iteration, and keep design and UX in mind from day one. Whether you're in Montana or anywhere else, we work remotely and collaborate closely so your MVP ships on a solid foundation.
    `.trim(),
  },
  "choosing-tech-stack-2025": {
    title: "Choosing a Tech Stack in 2025",
    date: "2024-12-20",
    category: "Technical",
    content: `
There’s no single “best” stack — it depends on your product, team, and goals. For most SaaS and web apps we use React or Next.js on the front end, Node or similar on the backend, and cloud providers (e.g. Vercel, AWS) for hosting and APIs. We choose based on maintainability, performance, and your long-term roadmap.

If you're starting a new project or refactoring an existing one, we can recommend and implement a stack that fits. Get in touch for a technical discussion.
    `.trim(),
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = slug ? articles[slug] : undefined;
  if (!post) return { title: "Resource | InventiveByte LLC" };
  return {
    title: `${post.title} | InventiveByte LLC`,
    description: post.content.slice(0, 160).replace(/\n/g, " ").trim() + "...",
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = slug ? articles[slug] : undefined;

  if (!post) notFound();

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
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
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
