import { NextResponse } from 'next/server';
import { getResources } from '@/lib/sanity';
import { staticResources } from '@/data/resources';

export const runtime = 'nodejs';
export const revalidate = 0;

function convertSanityResourceToApp(r: {
  _id: string;
  slug: { current: string };
  title: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  body?: string;
}) {
  return {
    id: r.slug?.current ?? r._id,
    slug: r.slug?.current ?? r._id,
    title: r.title,
    excerpt: r.excerpt ?? '',
    date: r.publishedAt ? new Date(r.publishedAt).toISOString().slice(0, 10) : '',
    category: r.category ?? 'Company',
    body: r.body,
  };
}

export async function GET() {
  try {
    const sanityResources = await getResources();

    if (sanityResources.length > 0) {
      const converted = sanityResources.map(convertSanityResourceToApp);
      return NextResponse.json(
        { resources: converted, source: 'sanity' },
        {
          headers: {
            'Cache-Control': 'no-store, max-age=0',
            'X-Resources-Source': 'sanity',
          },
        }
      );
    }

    return NextResponse.json(
      { resources: staticResources, source: 'static' },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'X-Resources-Source': 'static',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { resources: staticResources, source: 'static' },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'X-Resources-Source': 'static',
        },
      }
    );
  }
}
