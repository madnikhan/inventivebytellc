"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { normalizeVideoUrl, isDirectVideoUrl } from "@/lib/utils";
import ImageGallery from "./ImageGallery";
import TechStackBadge from "./TechStackBadge";
import MarkdownContent from "@/components/ui/MarkdownContent";
import { PortfolioProject } from "@/data/portfolio";

const ReactPlayer = dynamic(
  () => import("react-player"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-black flex items-center justify-center text-white rounded-xl">
        Loading video...
      </div>
    ),
  }
) as React.ComponentType<{
  url: string;
  width?: string;
  height?: string;
  controls?: boolean;
  playing?: boolean;
}>;

interface ProjectDetailContentProps {
  project: PortfolioProject;
}

export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const videoUrl = useMemo(() => {
    const linkUrl = normalizeVideoUrl(project?.video);
    if (linkUrl) return linkUrl;
    return project?.videoFileUrl?.trim() || undefined;
  }, [project?.video, project?.videoFileUrl]);

  const hasImages = (project.images?.length ?? 0) > 0;

  return (
    <div className="space-y-8">
      {/* 1. Media first: Image gallery + Video */}
      {hasImages && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Screenshots &amp; Gallery</h2>
          <ImageGallery images={project.images ?? []} title={project.title} />
        </section>
      )}

      {videoUrl && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Video</h2>
          <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-video max-h-[560px]">
            {isDirectVideoUrl(videoUrl) ? (
              <video
                key={videoUrl}
                src={videoUrl}
                controls
                playsInline
                className="w-full h-full object-contain"
                preload="auto"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                controls
                playing={false}
              />
            )}
          </div>
        </section>
      )}

      {/* Short description (below gallery + video) */}
      {project.description && (
        <section>
          <div className="text-gray-400 [&_.prose]:text-gray-400">
            <MarkdownContent content={project.description} />
          </div>
        </section>
      )}

      {/* Long Description (Markdown from Sanity) */}
      {project.longDescription && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">About this project</h2>
          <MarkdownContent content={project.longDescription} />
        </section>
      )}

      {/* Tech Stack */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-3">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, idx) => (
            <TechStackBadge key={tech} tech={tech} index={idx} />
          ))}
        </div>
      </div>

      {/* Project Details */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar className="w-5 h-5" />
          <span>Completed: {project.date}</span>
        </div>
        <div>
          <span className="text-gray-400 block mb-2">Categories</span>
          <div className="flex flex-wrap gap-2">
            {project.category.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full text-sm font-medium bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
        <div className="flex flex-wrap gap-4">
          {project.websiteLink && (
            <span className="inline-flex items-center gap-2 flex-wrap">
              <a
                href={project.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-black font-semibold hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </a>
              <span className="text-sm text-gray-400">— Contact us to see the demo</span>
            </span>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
          )}
        </div>
        <a
          href="/quote"
          className="inline-flex justify-center items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#B026FF] to-[#FF0066] text-white font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          Get Quote for Similar Project
        </a>
      </div>
    </div>
  );
}
