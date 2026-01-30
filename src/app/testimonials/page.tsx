"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import GoogleReviewTrustBadge from "@/components/testimonials/GoogleReviewTrustBadge";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useTestimonials } from "@/hooks/useTestimonials";

export default function TestimonialsPage() {
  const { testimonials, loading } = useTestimonials();
  const [filter, setFilter] = useState<"all" | "client" | "project">("all");

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter(
      (t) => filter === "all" || t.type === filter
    );
  }, [testimonials, filter]);

  return (
    <main className="min-h-screen pt-20 pb-20 px-6">
      {/* Hero Section */}
      <AnimatedSection className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text"
        >
          Testimonials
        </motion.h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
          What our clients and partners say about our work
        </p>
      </AnimatedSection>

      {/* Filter Tabs */}
      <AnimatedSection delay={0.2} className="mb-12">
        <div className="flex justify-center gap-4">
          {(["all", "client", "project"] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all capitalize ${
                filter === filterType
                  ? "bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-black"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              }`}
            >
              {filterType === "all"
                ? "All Testimonials"
                : filterType === "client"
                ? "Client Reviews"
                : "Project Reviews"}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Google Review Trust Badge */}
      <AnimatedSection delay={0.25} className="mb-10">
        <div className="max-w-4xl mx-auto">
          <GoogleReviewTrustBadge variant="full" />
        </div>
      </AnimatedSection>

      {/* Testimonials Grid */}
      <AnimatedSection delay={0.3}>
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D9FF]"></div>
            <p className="text-gray-400 mt-4">Loading testimonials...</p>
          </div>
        ) : filteredTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No testimonials found</p>
          </div>
        )}
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection delay={0.4} className="mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10"
          >
            <div className="text-4xl font-bold gradient-text mb-2">
              {testimonials.length}+
            </div>
            <div className="text-gray-400">Total Testimonials</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10"
          >
            <div className="text-4xl font-bold gradient-text mb-2">
              {testimonials.filter((t) => t.type === "client").length}+
            </div>
            <div className="text-gray-400">Happy Clients</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10"
          >
            <div className="text-4xl font-bold gradient-text mb-2">5.0</div>
            <div className="text-gray-400">Average Rating</div>
          </motion.div>
        </div>
      </AnimatedSection>
    </main>
  );
}
