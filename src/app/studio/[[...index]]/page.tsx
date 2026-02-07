'use client';

import dynamic from 'next/dynamic';

const EmbeddedStudio = dynamic(
  () => import('@/components/studio/EmbeddedStudio'),
  { ssr: false, loading: () => <StudioLoading /> }
);

function StudioLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] text-white">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#00D9FF] border-t-transparent" />
        <p className="text-gray-400">Loading Sanity Studio...</p>
      </div>
    </div>
  );
}

export default function StudioPage() {
  return (
    <div className="fixed inset-0 h-screen w-screen min-h-screen min-w-full overflow-auto [&_#app]:min-h-screen">
      <EmbeddedStudio />
    </div>
  );
}
