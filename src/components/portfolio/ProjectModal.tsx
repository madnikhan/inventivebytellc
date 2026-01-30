"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Github, Calendar, Play } from "lucide-react";
import { normalizeVideoUrl } from "@/lib/utils";
import ImageGallery from "./ImageGallery";
import TechStackBadge from "./TechStackBadge";
import { PortfolioProject } from "@/data/portfolio";

const ReactPlayer = dynamic(() => import("react-player"), { 
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-black flex items-center justify-center text-white">Loading video...</div>
}) as React.ComponentType<{
  url: string;
  width?: string;
  height?: string;
  controls?: boolean;
  playing?: boolean;
}>;

interface ProjectModalProps {
  project: PortfolioProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  const [showVideo, setShowVideo] = useState(false);
  const videoUrl = useMemo(() => normalizeVideoUrl(project?.video), [project?.video]);

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border-[#00D9FF]/30">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold gradient-text">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Media Section: show video when toggled OR when no images; otherwise show gallery */}
          <div className="relative">
            {videoUrl && (showVideo || (project.images?.length ?? 0) === 0) ? (
              <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-black">
                <ReactPlayer
                  url={videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing={false}
                />
                {(project.images?.length ?? 0) > 0 && (
                  <button
                    onClick={() => setShowVideo(false)}
                    className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 transition-colors"
                  >
                    Show Images
                  </button>
                )}
              </div>
            ) : (
              <>
                {videoUrl && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute top-4 right-4 z-10 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-black font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Watch Video
                  </button>
                )}
                <ImageGallery images={project.images ?? []} title={project.title} />
              </>
            )}
          </div>

          {/* Long Description */}
          {project.longDescription && (
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed">
                {project.longDescription}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <TechStackBadge key={tech} tech={tech} index={idx} />
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Completed: {project.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Categories:</span>
              <div className="flex flex-wrap gap-1">
                {project.category.map((cat) => (
                  <span
                    key={cat}
                    className="px-2 py-1 rounded-full text-xs font-medium bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
            <div className="flex gap-4">
              {project.websiteLink && (
                <a
                  href={project.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-black font-semibold hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Website
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/20"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              )}
            </div>
            <a
              href="/quote"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#B026FF] to-[#FF0066] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Get Quote for Similar Project
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
