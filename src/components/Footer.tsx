import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-white/10 glass-effect text-white text-base font-sans mt-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/appointment" className="hover:text-[#00D9FF] transition-colors">
                  Schedule Appointment
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-[#00D9FF] transition-colors">
                  Request Quote
                </Link>
              </li>
              <li>
                <Link href="/get-started" className="hover:text-[#00D9FF] transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-[#00D9FF] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#00D9FF] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-[#00D9FF] transition-colors">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-[#00D9FF] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="mailto:info@inventivebytellc.com" className="hover:text-[#00D9FF] transition-colors">
                  Email Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/legal" className="hover:text-[#00D9FF] transition-colors">
                  Privacy / Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <div className="text-gray-400 text-sm md:text-base">
            © 2025 InventiveByte LLC — Registered in Montana, USA. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-all hover:scale-110 hover:text-[#00D9FF] text-gray-400">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="currentColor" fillOpacity="0.1"/><path d="M7.5 9.5v5M7.5 7.5v.01M12 14.5v-2.25a1.25 1.25 0 0 1 2.5 0V14.5M17 12.25V14.5M17 14.5v-2.25a1.25 1.25 0 0 0-2.5 0V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="transition-all hover:scale-110 hover:text-[#00D9FF] text-gray-400">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="currentColor" fillOpacity="0.1"/><path d="M19 7.5a6.5 6.5 0 0 1-1.89.52A3.28 3.28 0 0 0 18.5 6a6.56 6.56 0 0 1-2.08.8A3.28 3.28 0 0 0 12 9.5c0 .26.03.52.08.76A9.32 9.32 0 0 1 5.5 6.5s-2 4.5 2.5 6.5a6.5 6.5 0 0 1-4 1.5c6 3.5 13 0 13-8.5 0-.13 0-.26-.01-.39A4.7 4.7 0 0 0 19 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-all hover:scale-110 hover:text-[#00D9FF] text-gray-400">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="currentColor" fillOpacity="0.1"/><path d="M12 17.5v-1.5M9.5 17.5v-1.5M14.5 17.5v-1.5M12 15.5c-2.5 0-4.5-2-4.5-4.5S9.5 6.5 12 6.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 