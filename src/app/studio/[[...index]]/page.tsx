'use client';

import dynamic from 'next/dynamic';
// Config lives at project root; schema (including "Project (Volunteering)") is loaded from there
import config from '../../../../sanity.config';

const Studio = dynamic(
  () => import('sanity').then((mod) => ({ default: mod.Studio })),
  { ssr: false }
);

export default function StudioPage() {
  return (
    <div className="fixed inset-0 h-screen w-screen min-h-screen min-w-full overflow-auto [&_#app]:min-h-screen">
      <Studio config={config} />
    </div>
  );
}
