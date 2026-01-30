import { NextResponse } from 'next/server';
import { createTestimonial } from '@/lib/sanity';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quote, author, role, company, rating, type } = body;

    if (!quote || typeof quote !== 'string' || !quote.trim()) {
      return NextResponse.json(
        { error: 'Quote is required.' },
        { status: 400 }
      );
    }
    if (!author || typeof author !== 'string' || !author.trim()) {
      return NextResponse.json(
        { error: 'Author name is required.' },
        { status: 400 }
      );
    }
    if (!role || typeof role !== 'string' || !role.trim()) {
      return NextResponse.json(
        { error: 'Role/Title is required.' },
        { status: 400 }
      );
    }

    const validType = type === 'project' ? 'project' : 'client';
    const numRating =
      rating != null && typeof rating === 'number'
        ? Math.min(5, Math.max(1, Math.floor(rating)))
        : undefined;

    const result = await createTestimonial({
      quote: quote.trim(),
      author: author.trim(),
      role: role.trim(),
      ...(company != null && typeof company === 'string' && { company: company.trim() }),
      ...(numRating != null && { rating: numRating }),
      type: validType,
    });

    revalidatePath('/testimonials');
    revalidatePath('/');
    revalidateTag('testimonials');

    return NextResponse.json({
      success: true,
      id: result._id,
      message: 'Thank you! Your review has been submitted and will appear after we approve it.',
    });
  } catch (error) {
    console.error('Testimonial submit error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to submit review.';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
