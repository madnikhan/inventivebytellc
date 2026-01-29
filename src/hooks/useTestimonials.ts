"use client";

import { useState, useEffect } from 'react';
import { Testimonial } from '@/data/testimonials';

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'sanity' | 'static'>('static');

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        setTestimonials(data.testimonials);
        setSource(data.source);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to static import
        const { testimonials: staticTestimonials } = await import('@/data/testimonials');
        setTestimonials(staticTestimonials);
        setSource('static');
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, source };
}
