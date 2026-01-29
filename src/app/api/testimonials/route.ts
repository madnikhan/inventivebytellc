import { NextResponse } from 'next/server';
import { getTestimonials, urlFor } from '@/lib/sanity';
import { testimonials } from '@/data/testimonials';

export const runtime = 'nodejs';
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    // Try to fetch from Sanity first
    const sanityTestimonials = await getTestimonials();
    
    if (sanityTestimonials.length > 0) {
      // Convert Sanity format to app format
      const convertedTestimonials = sanityTestimonials.map((t) => {
        let avatarUrl: string | undefined;
        if (t.avatar) {
          try {
            avatarUrl = urlFor(t.avatar).width(96).height(96).url();
          } catch {
            avatarUrl = undefined;
          }
        }
        return {
          id: t._id,
          quote: t.quote,
          author: t.author,
          role: t.role,
          company: t.company,
          avatar: avatarUrl,
          rating: t.rating,
          type: t.type,
          projectId: t.project?._ref,
        };
      });
      return NextResponse.json({ testimonials: convertedTestimonials, source: 'sanity' });
    }
    
    // Fallback to static data if Sanity is not configured or returns no data
    return NextResponse.json({ testimonials, source: 'static' });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    // Fallback to static data on error
    return NextResponse.json({ testimonials, source: 'static' });
  }
}
