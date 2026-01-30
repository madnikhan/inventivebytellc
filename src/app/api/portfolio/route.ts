import { NextResponse } from 'next/server';
import { getPortfolioProjects, convertSanityPortfolioToApp } from '@/lib/sanity';
import { portfolioProjects } from '@/data/portfolio';

export const runtime = 'nodejs';
export const revalidate = 0; // Always fetch fresh from Sanity so CMS updates show immediately

export async function GET() {
  try {
    // Try to fetch from Sanity first
    const sanityProjects = await getPortfolioProjects();
    
    if (sanityProjects.length > 0) {
      const convertedProjects = sanityProjects.map(convertSanityPortfolioToApp);
      return NextResponse.json(
        { projects: convertedProjects, source: 'sanity' },
        {
          headers: {
            'Cache-Control': 'no-store, max-age=0',
            'X-Portfolio-Source': 'sanity',
          },
        }
      );
    }

    return NextResponse.json(
      { projects: portfolioProjects, source: 'static' },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'X-Portfolio-Source': 'static',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { projects: portfolioProjects, source: 'static' },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'X-Portfolio-Source': 'static',
        },
      }
    );
  }
}
