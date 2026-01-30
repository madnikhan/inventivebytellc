"use client";
import BrandCard from "../../components/BrandCard";
import Link from "next/link";
import { motion } from "framer-motion";

const brands = [
  {
    id: "inventix-studio",
    title: "Inventix Studio",
    description:
      "Our flagship: A creative software house delivering custom SaaS solutions, web apps, and digital products for businesses worldwide.",
    logoSrc: "/brands/inventix-logo.svg",
    learnMore: "/brands/inventix-studio",
    featured: true,
  },
  {
    id: "zaptools",
    title: "ZapTools",
    description:
      "A suite of free, fast, and easy-to-use online tools designed to simplify everyday tasks for everyone.",
    logoSrc: "/brands/zaptools-logo.svg",
    learnMore: "/brands/zaptools",
    featured: true,
  },
  {
    id: "britrecruit",
    title: "BritRecruit",
    description:
      "A UK-focused recruitment project — one of our smaller ventures, connecting employers and job seekers with modern hiring tools.",
    logoSrc: "/brands/britrecruit-logo.svg",
    learnMore: "/brands/britrecruit",
    featured: false,
  },
  {
    id: "coming-soon",
    title: "New Brands Coming Soon!",
    description:
      "We're always working on new ideas. Interested in partnering or pitching a project? Contact us!",
    logoSrc: "",
    learnMore: "/contact",
    featured: false,
    comingSoon: true,
  },
];

export default function BrandsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black px-10 py-20 space-y-10">
      <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-8 tracking-tight">Our Brands & Projects</h1>
      <section className="max-w-2xl text-center text-xl md:text-2xl leading-relaxed mb-8">
        <p>
          InventiveByte LLC manages multiple innovative brands across software development, SaaS, and online tools. We&rsquo;re always building and incubating new ideas.
        </p>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-6xl mb-12">
        {brands.map((brand) => (
          <BrandCard
            key={brand.id}
            title={brand.title}
            description={brand.description}
            logoSrc={brand.logoSrc || undefined}
            badge={
              brand.comingSoon ? (
                <span className="inline-block px-3 py-1 text-xs bg-[#b0b6be]/40 text-[#222] rounded-full font-semibold tracking-wide shadow">Coming Soon</span>
              ) : undefined
            }
          />
        ))}
      </div>
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
            Pitch Your Idea or Partner With Us &rarr;
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 