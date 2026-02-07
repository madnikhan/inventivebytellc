"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function PortfolioPage() {
  const { projects: portfolioProjects, loading } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");

  // Get all unique categories and tech stacks
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    portfolioProjects.forEach((project) => {
      project.category.forEach((cat) => categories.add(cat));
    });
    return Array.from(categories);
  }, [portfolioProjects]);

  const allTechStacks = useMemo(() => {
    const techs = new Set<string>();
    portfolioProjects.forEach((project) => {
      project.techStack.forEach((tech) => techs.add(tech));
    });
    return Array.from(techs);
  }, [portfolioProjects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" ||
        project.category.includes(selectedCategory);

      const matchesTech =
        selectedTech === "all" || project.techStack.includes(selectedTech);

      return matchesSearch && matchesCategory && matchesTech;
    });
  }, [searchQuery, selectedCategory, selectedTech, portfolioProjects]);

  const featuredProjects = portfolioProjects.filter((p) => p.featured);

  return (
    <div className="min-h-screen pt-20 pb-20 px-6">
      <AnimatedSection className="max-w-7xl mx-auto mb-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Portfolio" }]} />
      </AnimatedSection>
      {/* Hero Section */}
      <AnimatedSection className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text"
        >
          Portfolio
        </motion.h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
          Showcasing innovative projects and cutting-edge solutions
        </p>
      </AnimatedSection>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <AnimatedSection delay={0.2} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* Filters and Search */}
      <AnimatedSection delay={0.3} className="mb-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0f0f1a] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF]/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Filters - dropdowns to keep UI compact */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400 shrink-0" aria-hidden />
              <span className="text-gray-400 font-medium shrink-0">Filters:</span>
            </div>

            {/* Category dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="category-filter" className="sr-only">Category</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-[#0f0f1a] border border-white/10 text-white font-medium focus:outline-none focus:border-[#00D9FF]/50 transition-colors cursor-pointer min-w-[180px]"
              >
                <option value="all">All Categories</option>
                {allCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Tech stack dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="tech-filter" className="sr-only">Technology</label>
              <select
                id="tech-filter"
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-[#0f0f1a] border border-white/10 text-white font-medium focus:outline-none focus:border-[#B026FF]/50 transition-colors cursor-pointer min-w-[180px]"
              >
                <option value="all">All Tech</option>
                {allTechStacks.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Grid */}
      <AnimatedSection delay={0.4}>
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D9FF]"></div>
            <p className="text-gray-400 mt-4">Loading projects...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 mb-4">No projects found</p>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection delay={0.5} className="mt-20">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let&apos;s discuss how we can bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/quote">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-black font-semibold hover:opacity-90 transition-opacity"
              >
                Request a Quote
              </motion.button>
            </a>
            <a href="/appointment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl border-2 border-[#00D9FF] text-[#00D9FF] font-semibold hover:bg-[#00D9FF]/10 transition-colors"
              >
                Schedule Consultation
              </motion.button>
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
