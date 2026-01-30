"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FileText } from "lucide-react";
import { useResources } from "@/hooks/useResources";

export default function ResourcesPage() {
  const { resources, loading } = useResources();

  return (
    <div className="min-h-screen pt-20 pb-20 px-6">
      <AnimatedSection className="max-w-4xl mx-auto mb-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Resources" },
          ]}
          className="mb-8"
        />
      </AnimatedSection>

      <AnimatedSection className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 gradient-text"
        >
          Resources
        </motion.h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Guides, process notes, and technical insights from the InventiveByte team
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D9FF]" />
            <p className="text-gray-400 mt-4">Loading resources...</p>
          </div>
        ) : resources.length > 0 ? (
          <ul className="space-y-6">
            {resources.map((post, index) => (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={`/resources/${post.slug}`}
                  className="block p-6 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10 hover:border-[#00D9FF]/40 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium text-[#00D9FF] uppercase tracking-wider">
                        {post.category}
                      </span>
                      <h2 className="text-xl font-bold text-white mt-1 group-hover:text-[#00D9FF] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 mt-2 line-clamp-2">{post.excerpt}</p>
                      <time className="text-sm text-gray-500 mt-2 block" dateTime={post.date}>
                        {post.date
                          ? new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : ""}
                      </time>
                    </div>
                    <FileText className="w-6 h-6 text-gray-500 group-hover:text-[#00D9FF] shrink-0 mt-1" />
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        ) : null}

        <p className="text-center text-gray-500 mt-10">
          Want a topic covered?{" "}
          <Link href="/contact" className="text-[#00D9FF] hover:underline">
            Let us know
          </Link>
          .
        </p>
      </AnimatedSection>
    </div>
  );
}
