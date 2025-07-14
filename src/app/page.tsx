"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import BrandCard from "../components/BrandCard";
import { useRouter } from "next/navigation";

const brandTeasers = [
  {
    title: "Inventix Studio",
    description: "Our flagship: A creative software house delivering custom SaaS solutions, web apps, and digital products for businesses worldwide.",
    href: "/brands#inventix-studio",
    featured: true,
    logoSrc: "/brands/inventix-logo.svg",
  },
  {
    title: "ZapTools",
    description: "A suite of free, fast, and easy-to-use online tools designed to simplify everyday tasks for everyone.",
    href: "/brands#zaptools",
    featured: true,
    logoSrc: "/brands/zaptools-logo.svg",
  },
  {
    title: "BritRecruit",
    description: "A UK-focused recruitment project — one of our smaller ventures, connecting employers and job seekers with modern hiring tools.",
    href: "/brands#britrecruit",
    featured: false,
    logoSrc: "/brands/britrecruit-logo.svg",
  },
  {
    title: "New Brands Coming Soon!",
    description: "We're always working on new ideas. Interested in partnering or pitching a project? Contact us!",
    href: "/contact",
    featured: false,
    comingSoon: true,
    logoSrc: undefined,
  },
];

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-black px-6 py-20 space-y-12">
      <img
        src="/inventivebyte-logo.png"
        alt="InventiveByte LLC logo"
        className="h-32 w-auto mb-6"
      />
      <motion.h1
        className="text-6xl md:text-8xl font-extrabold text-center mb-6 tracking-tight select-none"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        InventiveByte LLC
      </motion.h1>
      <motion.p
        className="text-2xl md:text-3xl text-center text-gray-700 max-w-3xl mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        We launch, incubate, and scale innovative SaaS brands and digital products — building the future from Montana, USA.
      </motion.p>
      <section className="max-w-2xl text-center text-lg md:text-xl leading-relaxed mb-12">
        <p>
          InventiveByte LLC is a Montana-registered parent company dedicated to creating, launching, and growing new digital brands. Our mission is to turn bold ideas into successful SaaS platforms, online tools, and technology ventures that help people work smarter and connect better. We&rsquo;re always exploring new opportunities and building the next generation of digital solutions.
        </p>
      </section>
      {/* Modern Card/Panel for Brands Section */}
      <section className="w-full max-w-5xl mb-12">
        <div className="rounded-3xl shadow-lg px-8 py-12 md:py-16 md:px-12 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 tracking-tight">Our Brands & Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandTeasers.map((brand) => (
              <BrandCard
                key={brand.title}
                title={brand.title}
                description={brand.description}
                logoSrc={brand.logoSrc}
                onClick={() => router.push(brand.href)}
                badge={
                  brand.comingSoon ? (
                    <span className="inline-block px-3 py-1 text-xs bg-[#b0b6be]/40 text-[#222] rounded-full font-semibold tracking-wide shadow">Coming Soon</span>
                  ) : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>
      <motion.div
        className="mt-12 w-full max-w-2xl mx-auto bg-white/60 backdrop-blur-md rounded-2xl shadow-lg px-8 py-10 flex flex-col items-center border-2 border-[#b0b6be]/40"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#b0b6be" fillOpacity="0.15"/><path d="M16 9v10m0 4h.01" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h2 className="text-2xl md:text-3xl font-bold text-center tracking-tight">Have a bold idea?</h2>
        </div>
        <p className="text-center text-lg md:text-xl text-gray-700 mb-6 max-w-xl">We&rsquo;re always looking for new opportunities and partners. Let&rsquo;s connect and build something great together.</p>
        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex justify-center"
        >
          <Link href="/contact" className="px-8 py-4 rounded-xl border-2 border-[#b0b6be] bg-black/90 text-white font-bold text-lg shadow transition-all duration-200 hover:bg-black hover:border-black focus:outline-none focus:ring-2 focus:ring-[#b0b6be] focus:ring-offset-2">
            Let&rsquo;s build something great together &rarr;
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
