'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function StudioPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to deployed Sanity Studio
    // Replace with your actual Sanity Studio URL after running: npm run sanity:deploy
    window.location.href = 'https://inventivebytellc.sanity.studio'
  }, [])
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Loading Sanity Studio...</h1>
        <p className="text-gray-400">Redirecting to CMS...</p>
      </div>
    </div>
  )
}
