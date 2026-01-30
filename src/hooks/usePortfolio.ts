"use client";

import { useState, useEffect } from 'react';
import { PortfolioProject } from '@/data/portfolio';

export function usePortfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'sanity' | 'static'>('static');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/portfolio', { cache: 'no-store' });
        const data = await response.json();
        setProjects(data.projects);
        setSource(data.source);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        // Fallback to static import
        const { portfolioProjects } = await import('@/data/portfolio');
        setProjects(portfolioProjects);
        setSource('static');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, source };
}
