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

// Create Sanity client
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Optional, for authenticated requests
});

// Image URL builder
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
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
    asset->{
      _ref,
      _type
    },
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
    asset->{
      _ref,
      _type
    },
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
    asset->{
      _ref,
      _type
    },
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
    asset->{
      _ref,
      _type
    }
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
    const projects = await sanityClient.fetch<SanityPortfolioProject[]>(portfolioQuery);
    return projects;
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    return [];
  }
}

export async function getFeaturedPortfolioProjects(): Promise<SanityPortfolioProject[]> {
  try {
    const projects = await sanityClient.fetch<SanityPortfolioProject[]>(featuredPortfolioQuery);
    return projects;
  } catch (error) {
    console.error('Error fetching featured portfolio projects:', error);
    return [];
  }
}

export async function getPortfolioProjectBySlug(slug: string): Promise<SanityPortfolioProject | null> {
  try {
    const project = await sanityClient.fetch<SanityPortfolioProject | null>(portfolioBySlugQuery, { slug });
    return project;
  } catch (error) {
    console.error('Error fetching portfolio project:', error);
    return null;
  }
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  try {
    const testimonials = await sanityClient.fetch<SanityTestimonial[]>(testimonialsQuery);
    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
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
    images: sanityProject.images?.map((img) => {
      try {
        return urlFor(img).width(1200).height(800).url();
      } catch {
        // Fallback if image URL builder fails
        return '';
      }
    }).filter(Boolean) || [],
    video: sanityProject.video,
    websiteLink: sanityProject.websiteLink,
    githubLink: sanityProject.githubLink,
    techStack: sanityProject.techStack || [],
    category: sanityProject.category || [],
    date: sanityProject.date || '',
    featured: sanityProject.featured || false,
  };
}
