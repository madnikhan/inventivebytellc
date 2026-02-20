import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createOrUpdateResourceFromPortfolioId } from '@/lib/portfolio-to-blog';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get('x-sanity-webhook-secret');
    const expectedSecret = process.env.SANITY_WEBHOOK_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const _type = body?._type ?? body?.type;
    const ids = body?.ids?.all ?? body?.ids ?? (body?._id ? [body._id] : body?.id ? [body.id] : []);

    // When any doc changes, try to generate a blog from it if it's a portfolio (for each affected id)
    if (process.env.SANITY_API_TOKEN && Array.isArray(ids) && ids.length > 0) {
      for (const id of ids) {
        try {
          await createOrUpdateResourceFromPortfolioId(id);
        } catch {
          // No-op if not a portfolio doc or other error
        }
      }
      revalidatePath('/portfolio');
      revalidatePath('/resources');
      revalidatePath('/');
      revalidateTag('portfolio');
      revalidateTag('resources');
    }

    if (_type === 'portfolio') {
      revalidatePath('/portfolio');
      revalidatePath('/resources');
      revalidatePath('/');
      revalidateTag('portfolio');
      revalidateTag('resources');
    } else if (_type === 'testimonial') {
      revalidatePath('/testimonials');
      revalidatePath('/');
      revalidateTag('testimonials');
    } else if (_type === 'resource') {
      revalidatePath('/resources');
      revalidatePath('/');
      revalidateTag('resources');
    } else if (_type) {
      // Unknown type: revalidate portfolio and home so any content change is reflected
      revalidatePath('/portfolio');
      revalidatePath('/');
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
