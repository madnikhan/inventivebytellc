import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

// Portfolio Project type matching Sanity schema
export interface SanityPortfolioProject {
  _id: string;
  _type: 'portfolio';
  title: string;
  slug: { current: string };
  description: string;
  longDescription?: string;
  images?: Array<{
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  }>;
  video?: string;
  websiteLink?: string;
  githubLink?: string;
  techStack?: string[];
  category?: string[];
  date?: string;
  featured?: boolean;
}

// Testimonial type matching Sanity schema
export interface SanityTestimonial {
  _id: string;
  _type: 'testimonial';
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  rating?: number;
  type: 'client' | 'project';
  project?: {
    _ref: string;
    _type: 'reference';
  };
}

// Lazy Sanity client creation - only create if projectId is configured
let sanityClient: ReturnType<typeof createClient> | null = null;

function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  
  // Don't create client if projectId is missing (allows build to succeed without Sanity)
  if (!projectId) {
    return null;
  }

  if (!sanityClient) {
    sanityClient = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      useCdn: process.env.NODE_ENV === 'production',
      apiVersion: '2024-01-01',
      token: process.env.SANITY_API_TOKEN, // Optional, for authenticated requests
    });
  }

  return sanityClient;
}

// Image URL builder - lazy initialization
let builder: ReturnType<typeof createImageUrlBuilder> | null = null;

function getImageBuilder() {
  const client = getSanityClient();
  if (!client) {
    throw new Error('Sanity client not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.');
  }
  if (!builder) {
    builder = createImageUrlBuilder(client);
  }
  return builder;
}

export function urlFor(source: SanityImageSource) {
  return getImageBuilder().image(source);
}

// GROQ Queries
export const portfolioQuery = `*[_type == "portfolio"] | order(date desc) {
  _id,
  _type,
  title,
  slug,
  description,
  longDescription,
  images[]{
    _type,
    asset,
    alt
  },
  video,
  websiteLink,
  githubLink,
  techStack,
  category,
  date,
  featured
}`;

export const featuredPortfolioQuery = `*[_type == "portfolio" && featured == true] | order(date desc) {
  _id,
  _type,
  title,
  slug,
  description,
  longDescription,
  images[]{
    _type,
    asset,
    alt
  },
  video,
  websiteLink,
  githubLink,
  techStack,
  category,
  date,
  featured
}`;

export const portfolioBySlugQuery = `*[_type == "portfolio" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  description,
  longDescription,
  images[]{
    _type,
    asset,
    alt
  },
  video,
  websiteLink,
  githubLink,
  techStack,
  category,
  date,
  featured
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  _type,
  quote,
  author,
  role,
  company,
  avatar{
    _type,
    asset
  },
  rating,
  type,
  project->{
    _id,
    title,
    slug
  }
}`;

// Helper functions to fetch data
export async function getPortfolioProjects(): Promise<SanityPortfolioProject[]> {
  try {
    const client = getSanityClient();
    if (!client) {
      return []; // Return empty array if Sanity not configured
    }
    const projects = await client.fetch<SanityPortfolioProject[]>(portfolioQuery);
    return projects;
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    return [];
  }
}

export async function getFeaturedPortfolioProjects(): Promise<SanityPortfolioProject[]> {
  try {
    const client = getSanityClient();
    if (!client) {
      return []; // Return empty array if Sanity not configured
    }
    const projects = await client.fetch<SanityPortfolioProject[]>(featuredPortfolioQuery);
    return projects;
  } catch (error) {
    console.error('Error fetching featured portfolio projects:', error);
    return [];
  }
}

export async function getPortfolioProjectBySlug(slug: string): Promise<SanityPortfolioProject | null> {
  try {
    const client = getSanityClient();
    if (!client) {
      return null; // Return null if Sanity not configured
    }
    const project = await client.fetch<SanityPortfolioProject | null>(portfolioBySlugQuery, { slug });
    return project;
  } catch (error) {
    console.error('Error fetching portfolio project:', error);
    return null;
  }
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  try {
    const client = getSanityClient();
    if (!client) {
      return []; // Return empty array if Sanity not configured
    }
    const testimonials = await client.fetch<SanityTestimonial[]>(testimonialsQuery);
    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

// Build a single image URL from Sanity image object (reference or dereferenced asset)
function getImageUrl(
  img: NonNullable<SanityPortfolioProject['images']>[number] | undefined
): string {
  if (!img || typeof img !== 'object') return '';
  const asset = (img as { asset?: { _ref?: string; _id?: string; url?: string } }).asset;
  if (asset && typeof (asset as { url?: string }).url === 'string')
    return (asset as { url: string }).url;
  try {
    if (asset) {
      const ref = (asset as { _ref?: string })._ref || (asset as { _id?: string })._id;
      if (ref) return getImageBuilder().image(ref).width(1200).height(800).url();
    }
    // Fallback: pass full image object (Sanity image-url accepts it)
    return urlFor(img as SanityImageSource).width(1200).height(800).url();
  } catch {
    return '';
  }
}

// Convert Sanity portfolio to app format
export function convertSanityPortfolioToApp(sanityProject: SanityPortfolioProject): {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  images: string[];
  video?: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: string[];
  category: string[];
  date: string;
  featured: boolean;
} {
  return {
    id: sanityProject.slug?.current || sanityProject._id,
    title: sanityProject.title,
    description: sanityProject.description,
    longDescription: sanityProject.longDescription,
    images: (sanityProject.images ?? []).map(getImageUrl).filter(Boolean),
    video: sanityProject.video ? String(sanityProject.video).trim() : undefined,
    websiteLink: sanityProject.websiteLink,
    githubLink: sanityProject.githubLink,
    techStack: sanityProject.techStack || [],
    category: sanityProject.category || [],
    date: sanityProject.date || '',
    featured: sanityProject.featured || false,
  };
}
