"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Testimonial } from "@/data/testimonials";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

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

      {/* Type Badge + Google Review Badge - Top Left */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            testimonial.type === "client"
              ? "bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30"
              : "bg-[#B026FF]/20 text-[#B026FF] border border-[#B026FF]/30"
          }`}
        >
          {testimonial.type === "client" ? "Client" : "Project"}
        </span>
        {testimonial.isGoogleReview && (
          <span
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-200 border border-white/20"
            title="Review from Google"
          >
            <GoogleIcon className="w-3.5 h-3.5" />
            Google Review
          </span>
        )}
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
