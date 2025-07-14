export default function Footer() {
  return (
    <footer className="w-full text-center py-8 border-t-2 border-[#b0b6be]/40 bg-white/60 backdrop-blur-md text-black text-base font-sans shadow-lg mt-16">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 text-gray-700 text-sm md:text-base">
          © 2025 InventiveByte LLC — Registered in Montana, USA. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-transform hover:scale-110 hover:text-[#0077b5]">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#b0b6be" fillOpacity="0.15"/><path d="M7.5 9.5v5M7.5 7.5v.01M12 14.5v-2.25a1.25 1.25 0 0 1 2.5 0V14.5M17 12.25V14.5M17 14.5v-2.25a1.25 1.25 0 0 0-2.5 0V14.5" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="transition-transform hover:scale-110 hover:text-[#1da1f2]">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#b0b6be" fillOpacity="0.15"/><path d="M19 7.5a6.5 6.5 0 0 1-1.89.52A3.28 3.28 0 0 0 18.5 6a6.56 6.56 0 0 1-2.08.8A3.28 3.28 0 0 0 12 9.5c0 .26.03.52.08.76A9.32 9.32 0 0 1 5.5 6.5s-2 4.5 2.5 6.5a6.5 6.5 0 0 1-4 1.5c6 3.5 13 0 13-8.5 0-.13 0-.26-.01-.39A4.7 4.7 0 0 0 19 7.5Z" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-transform hover:scale-110 hover:text-black">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#b0b6be" fillOpacity="0.15"/><path d="M12 17.5v-1.5M9.5 17.5v-1.5M14.5 17.5v-1.5M12 15.5c-2.5 0-4.5-2-4.5-4.5S9.5 6.5 12 6.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5Z" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a href="/legal" className="px-4 py-2 rounded-lg border border-[#b0b6be] bg-white/80 text-black font-medium transition-all duration-200 hover:bg-[#b0b6be]/10 hover:border-black focus:outline-none focus:ring-2 focus:ring-[#b0b6be] focus:ring-offset-2">
            Privacy / Legal
          </a>
        </div>
      </div>
    </footer>
  );
} 