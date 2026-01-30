"use client";

import { useState, useEffect } from 'react';
import { Resource } from '@/data/resources';

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'sanity' | 'static'>('static');

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch('/api/resources', { cache: 'no-store' });
        const data = await response.json();
        setResources(data.resources);
        setSource(data.source ?? 'static');
      } catch (error) {
        console.error('Error fetching resources:', error);
        const { staticResources } = await import('@/data/resources');
        setResources(staticResources);
        setSource('static');
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  return { resources, loading, source };
}
