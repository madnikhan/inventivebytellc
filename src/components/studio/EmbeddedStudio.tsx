'use client';

import { Studio } from 'sanity';
import config from '@/lib/sanity-studio-config';

export default function EmbeddedStudio() {
  return <Studio config={config} />;
}
