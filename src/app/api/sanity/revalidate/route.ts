import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // Verify webhook secret (optional but recommended)
    const secret = req.headers.get('x-sanity-webhook-secret');
    const expectedSecret = process.env.SANITY_WEBHOOK_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { _type } = body;

    // Revalidate relevant pages based on content type
    if (_type === 'portfolio') {
      revalidatePath('/portfolio');
      revalidatePath('/');
      revalidateTag('portfolio');
    } else if (_type === 'testimonial') {
      revalidatePath('/testimonials');
      revalidatePath('/');
      revalidateTag('testimonials');
    }

    // Also trigger Vercel deployment via their API if needed
    // This is handled by Sanity webhook → Vercel directly, but we can also revalidate here

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      type: _type 
    });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
