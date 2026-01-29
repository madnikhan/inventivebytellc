"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10 hover:border-[#B026FF]/50 p-6 transition-all duration-300"
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity z-0">
        <Quote className="w-8 h-8 text-[#B026FF]" />
      </div>

      {/* Type Badge - Top Left */}
      <div className="absolute top-4 left-4 z-20">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            testimonial.type === "client"
              ? "bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30"
              : "bg-[#B026FF]/20 text-[#B026FF] border border-[#B026FF]/30"
          }`}
        >
          {testimonial.type === "client" ? "Client" : "Project"}
        </span>
      </div>

      {/* Rating - Positioned below type badge */}
      {testimonial.rating && (
        <div className="flex gap-1 mb-4 pt-8 relative z-10">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating!
                  ? "fill-[#FFD700] text-[#FFD700]"
                  : "fill-gray-700 text-gray-700"
              }`}
            />
          ))}
        </div>
      )}

      {/* Quote */}
      <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt={testimonial.author}
            width={48}
            height={48}
            className="rounded-full border-2 border-[#00D9FF]/50"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#B026FF] flex items-center justify-center text-white font-bold text-lg">
            {testimonial.author.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <div className="font-semibold text-white">{testimonial.author}</div>
          <div className="text-sm text-gray-400">
            {testimonial.role}
            {testimonial.company && ` at ${testimonial.company}`}
          </div>
          {testimonial.projectId && (
            <Link
              href={`/portfolio#${testimonial.projectId}`}
              className="text-xs text-[#00D9FF] hover:underline mt-1 inline-block"
            >
              View Project →
            </Link>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#B026FF]/10 via-transparent to-[#00D9FF]/10 blur-xl" />
      </div>
    </motion.div>
  );
}
