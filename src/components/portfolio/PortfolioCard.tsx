"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, Calendar } from "lucide-react";
import Image from "next/image";
import TechStackBadge from "./TechStackBadge";
import { PortfolioProject } from "@/data/portfolio";

interface PortfolioCardProps {
  project: PortfolioProject;
  index?: number;
}

export default function PortfolioCard({ project, index = 0 }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10 hover:border-[#00D9FF]/50 transition-all duration-300 cursor-pointer"
    >
      <Link href={`/portfolio/${project.id}`} className="block">
      {/* Image/Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        {project.images && project.images.length > 0 ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#00D9FF]/20 to-[#B026FF]/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-white/50">{project.title.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-black text-xs font-bold">
            Featured
          </div>
        )}

        {/* Category Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {project.category.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium border border-white/20"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-[#00D9FF] transition-colors pr-12">
            {project.title}
          </h3>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <TechStackBadge key={tech} tech={tech} index={idx} />
          ))}
          {project.techStack.length > 4 && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/60">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{project.date}</span>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/10 via-transparent to-[#B026FF]/10 blur-xl" />
      </div>
      </Link>

      {/* External links - outside Link to avoid nested <a> */}
      {(project.websiteLink || project.githubLink) && (
        <div className="absolute top-[13.25rem] right-6 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.websiteLink && (
            <a
              href={project.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-[#00D9FF]/20 text-white transition-colors"
              aria-label="Visit website"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-[#00D9FF]/20 text-white transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
