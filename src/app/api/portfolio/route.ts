import { NextResponse } from 'next/server';
import { getPortfolioProjects, convertSanityPortfolioToApp } from '@/lib/sanity';
import { portfolioProjects } from '@/data/portfolio';

export const runtime = 'nodejs';
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    // Try to fetch from Sanity first
    const sanityProjects = await getPortfolioProjects();
    
    if (sanityProjects.length > 0) {
      // Convert Sanity format to app format
      const convertedProjects = sanityProjects.map(convertSanityPortfolioToApp);
      return NextResponse.json({ projects: convertedProjects, source: 'sanity' });
    }
    
    // Fallback to static data if Sanity is not configured or returns no data
    return NextResponse.json({ projects: portfolioProjects, source: 'static' });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    // Fallback to static data on error
    return NextResponse.json({ projects: portfolioProjects, source: 'static' });
  }
}
