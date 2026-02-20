import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProjectDetailContent from "@/components/portfolio/ProjectDetailContent";
import { getPortfolioProjectBySlug, convertSanityPortfolioToApp } from "@/lib/sanity";
import { portfolioProjects } from "@/data/portfolio";
import { stripMarkdown } from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inventivebytellc.com";

type Props = { params: Promise<{ slug: string }> };

async function getProjectBySlug(slug: string) {
  const sanityProject = await getPortfolioProjectBySlug(slug);
  if (sanityProject) return convertSanityPortfolioToApp(sanityProject);
  return portfolioProjects.find((p) => p.id === slug) ?? null;
}

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  return `${baseUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export default async function PortfolioProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const plainDescription = stripMarkdown(project.description) || project.description || "";
  const shortDescription =
    plainDescription.length > 160 ? plainDescription.slice(0, 157) + "..." : plainDescription;
  const imageUrl =
    project.images?.length > 0 ? absoluteUrl(project.images[0]) : `${baseUrl}/inventivebyte-logo2.png`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: shortDescription,
    image: imageUrl,
    url: `${baseUrl}/portfolio/${project.id}`,
    dateCreated: project.date?.length === 4 ? `${project.date}-01-01` : project.date,
    author: {
      "@type": "Organization",
      name: "InventiveByte LLC",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "InventiveByte LLC",
      url: baseUrl,
    },
    ...(project.techStack?.length > 0 && {
      keywords: project.techStack.join(", "),
    }),
    ...(project.category?.length > 0 && {
      genre: project.category,
    }),
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-4xl mx-auto">
        <AnimatedSection className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Portfolio", href: "/portfolio" },
              { label: project.title },
            ]}
          />
        </AnimatedSection>

        <header className="mb-10">
          <AnimatedSection delay={0.05}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {project.title}
            </h1>
            {plainDescription && (
              <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
                {shortDescription}
              </p>
            )}
          </AnimatedSection>
        </header>

        <AnimatedSection delay={0.1}>
          <ProjectDetailContent project={project} />
        </AnimatedSection>
      </article>
    </div>
  );
}
