import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createOrUpdateResourceFromPortfolioId } from '@/lib/portfolio-to-blog';

export const runtime = 'nodejs';

function normalizeWebhookIds(rawBody: unknown, body: Record<string, unknown> | null): string[] {
  const single = (v: unknown): string[] =>
    v && typeof v === 'string' ? [v] : [];
  const arr = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];

  if (Array.isArray(rawBody)) {
    return rawBody
      .map((item) => (item && typeof item === 'object' && '_id' in item ? (item as { _id: string })._id : null))
      .filter((x): x is string => typeof x === 'string');
  }

  const o = (rawBody && typeof rawBody === 'object' ? rawBody : body) as Record<string, unknown> | null;
  if (!o) return [];

  const idsVal = o.ids as { all?: unknown } | unknown;
  const idsArray =
    idsVal && typeof idsVal === 'object' && 'all' in idsVal
      ? (idsVal as { all: unknown }).all
      : idsVal;

  return (
    arr(idsArray) ||
    single(o._id ?? o.id ?? o.documentId) ||
    []
  );
}

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

    const rawBody = await req.json().catch(() => ({}));
    const body = Array.isArray(rawBody) ? rawBody[0] : rawBody;
    const _type = body?._type ?? body?.type ?? rawBody?._type ?? rawBody?.type;
    const ids = normalizeWebhookIds(rawBody, body);

    if (!process.env.SANITY_API_TOKEN && (Array.isArray(ids) ? ids.length > 0 : true)) {
      console.warn('[revalidate] SANITY_API_TOKEN not set – skipping auto blog from portfolio');
    }

    // When any doc changes, try to generate a blog from it if it's a portfolio (for each affected id)
    if (process.env.SANITY_API_TOKEN && Array.isArray(ids) && ids.length > 0) {
      for (const id of ids) {
        try {
          await createOrUpdateResourceFromPortfolioId(id);
        } catch (e) {
          console.error('[revalidate] portfolio-to-blog failed for', id, e);
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
