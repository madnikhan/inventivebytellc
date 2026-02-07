"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProjectDetailContent from "@/components/portfolio/ProjectDetailContent";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function PortfolioProjectPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];
  const { projects, loading } = usePortfolio();

  const project = projects.find((p) => p.id === slug);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-32">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D9FF]" />
          <p className="text-gray-400 mt-4">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-20 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center py-32">
          <h1 className="text-3xl font-bold text-white mb-4">Project not found</h1>
          <p className="text-gray-400 mb-8">
            The project you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-black font-semibold hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Portfolio", href: "/portfolio" },
              { label: project.title },
            ]}
          />
        </AnimatedSection>

        {/* Heading on top only */}
        <AnimatedSection delay={0.05} className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {project.title}
          </h1>
        </AnimatedSection>

        {/* Gallery + video, then short description, long description, tech, links */}
        <AnimatedSection delay={0.1}>
          <ProjectDetailContent project={project} />
        </AnimatedSection>
      </div>
    </div>
  );
}
