"use client";

import { useMemo } from "react";
import TestimonialCard from "./TestimonialCard";
import GoogleReviewTrustBadge from "./GoogleReviewTrustBadge";
import { useTestimonials } from "@/hooks/useTestimonials";

interface TestimonialsSectionProps {
  limit?: number;
  filter?: 'all' | 'client' | 'project';
  showTrustBadge?: boolean;
}

export default function TestimonialsSection({ limit, filter = 'all', showTrustBadge = false }: TestimonialsSectionProps) {
  const { testimonials, loading } = useTestimonials();
  
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((t) => 
      filter === 'all' || t.type === filter
    ).slice(0, limit);
  }, [testimonials, filter, limit]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D9FF]"></div>
        <p className="text-gray-400 mt-4">Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showTrustBadge && (
        <div className="flex justify-center">
          <GoogleReviewTrustBadge variant="compact" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTestimonials.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          index={index}
        />
      ))}
      </div>
    </div>
  );
}
