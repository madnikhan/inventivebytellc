"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, CheckCircle, Search, Building2, Layout } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientButton from "@/components/ui/GradientButton";

const SERVICE_SLUGS: Record<string, boolean> = {
  "google-business-profiles": true,
  "seo": true,
  "google-local-services-ads": true,
  "web-design": true,
};

const SLUG_TO_TITLE: Record<string, string> = {
  "google-business-profiles": "Google Business Profile",
  "seo": "SEO",
  "google-local-services-ads": "Google Local Services Ads",
  "web-design": "Web Design",
};

function GoogleBusinessProfileContent() {
  return (
    <>
      {/* Hero */}
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          Google Business Profile management & optimisation
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          Make your most important local SEO asset work harder. Get found by more local leads and stand out when people search for what you offer.
        </p>
        <Link href="/get-started?service=google-business-profiles">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>

      {/* Why it matters */}
      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why your Google Business Profile matters
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          When people search for a business like yours nearby, they see a small set of results — often with a map and a few listings. If your profile is missing, incomplete, or outranked by competitors, you miss those customers. A well-optimised profile helps you show up, build trust with reviews, and turn searchers into visitors and calls.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "More visibility in local search and on Maps",
            "Clear, accurate opening hours and contact details",
            "Reviews and photos that build credibility",
            "Better chance to appear for “near me” and local terms",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-[#0f0f1a]/80 border border-white/10"
            >
              <CheckCircle className="w-5 h-5 text-[#00D9FF] shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* What we do */}
      <AnimatedSection delay={0.2} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          What we do for you
        </h2>
        <ul className="space-y-4 max-w-3xl">
          {[
            "Profile setup and optimisation so your name, address, hours, and services are accurate and compelling.",
            "Category and service wording tuned for the searches that matter in your area.",
            "Review strategy: simple ways to ask happy customers for feedback and how we respond on your behalf.",
            "Photos and posts so your listing stays fresh and informative.",
            "Ongoing checks so NAPW (name, address, phone, website) and map pin stay correct.",
            "Reporting and insights so you see how your profile is performing.",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-400">
              <span className="text-[#00D9FF] font-bold shrink-0">{(i + 1).toString()}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </AnimatedSection>

      {/* Who it's for */}
      <AnimatedSection delay={0.3} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Who it’s for
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl mb-6">
          We help local and regional businesses that have a physical location or serve customers in a defined area. That includes shops, restaurants, trades, professional services, and anyone who wants to be found when people search locally — across London, Birmingham, Coventry, Warwick, Leamington Spa, Kenilworth, and beyond. Meetings are online-first; we can discuss on-site support if you need it.
        </p>
      </AnimatedSection>

      {/* Get started CTA */}
      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <MapPin className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to get found locally?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Tell us a bit about your business and goals. We’ll get back to you with next steps and options that fit.
          </p>
          <Link href="/get-started?service=google-business-profiles">
            <GradientButton variant="primary" size="lg">
              Get started
            </GradientButton>
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}

function SEOContent() {
  return (
    <>
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          SEO for small businesses
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          Move up the search rankings and get in front of people who are already looking for what you offer. We focus on sustainable, measurable growth.
        </p>
        <Link href="/get-started?service=seo">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why SEO matters
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          Most people never scroll past the first page of search results. Organic search drives a large share of website traffic, and visitors who find you through search are more likely to convert. SEO builds long-term visibility without ongoing ad spend — so the right investment pays off over time.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Attract high-intent traffic from people actively searching",
            "Outrank competitors for the terms that matter to your business",
            "Improve local visibility for “near me” and area-based searches",
            "Better site structure, speed, and content for users and search engines",
            "Sustained visibility that grows over time",
            "Clear reporting on rankings, traffic, and conversions",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#0f0f1a]/80 border border-white/10">
              <CheckCircle className="w-5 h-5 text-[#00D9FF] shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          What we do for you
        </h2>
        <ul className="space-y-4 max-w-3xl">
          {[
            "Audit of your site’s structure, content, and technical setup to find opportunities and issues.",
            "Keyword research and strategy so we target terms your audience actually searches for.",
            "On-page optimisation: meta tags, headings, URLs, and content aligned with best practices.",
            "Technical fixes: speed, crawlability, and any errors that hold your rankings back.",
            "Content creation and optimisation to attract and engage visitors while supporting search visibility.",
            "Local SEO, including your Google Business Profile and local citations where relevant.",
            "Regular reporting so you see how rankings, traffic, and conversions are changing.",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-400">
              <span className="text-[#00D9FF] font-bold shrink-0">{(i + 1).toString()}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Who it’s for
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          We work with small and mid-size businesses that want more organic traffic and leads. SEO is a long-term strategy — you can see early gains in a few months, with stronger results typically over 6–12 months. We serve clients across London, Birmingham, Coventry, Warwick, Leamington Spa, Kenilworth, and beyond. Meetings are online-first.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <Search className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to grow your search visibility?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Share your goals and we’ll propose a plan that fits. No two businesses are the same — we tailor our approach to you.
          </p>
          <Link href="/get-started?service=seo">
            <GradientButton variant="primary" size="lg">
              Get started
            </GradientButton>
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}

function GoogleLocalServicesAdsContent() {
  return (
    <>
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          Google Local Services Ads
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          Google Verified, pay-per-lead ads for local service businesses. Show up when people search for your trade or service nearby — you pay when a lead calls or messages, not per click.
        </p>
        <Link href="/get-started?service=google-local-services-ads">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why Local Services Ads work
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          Local Services Ads (LSAs) appear at the top of Google when someone searches for a local service like a plumber, electrician, or cleaner. You only pay when a potential customer contacts you — so your budget goes on real leads. With Google Verified (formerly Google Guaranteed), you can stand out and build trust with a badge that matters to searchers.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Generate calls and messages from people actively searching for your services",
            "Show your business at the moment someone in your area is looking",
            "Pay per lead, not per click — so spend aligns with results",
            "Build trust with ratings and a Google Verified badge",
            "Set your budget and service areas to match your capacity",
            "Competitive edge in a cost-effective ad format",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#0f0f1a]/80 border border-white/10">
              <CheckCircle className="w-5 h-5 text-[#00D9FF] shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          What we do for you
        </h2>
        <ul className="space-y-4 max-w-3xl">
          {[
            "Check eligibility and guide you through Google’s verification requirements.",
            "Set up and link your LSA account to your Google Business Profile where needed.",
            "Help you get Google Verified (badge and trust for customers).",
            "Configure ads, service areas, and budget to match your goals.",
            "Ongoing management and optimisation so you get the most from your leads.",
            "Reporting and recommendations so you understand performance.",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-400">
              <span className="text-[#00D9FF] font-bold shrink-0">{(i + 1).toString()}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Who it’s for
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          LSAs are designed for local service businesses that go to their customers — plumbers, electricians, cleaners, landscapers, and many other trades. You typically need a verified Google Business Profile and to meet Google’s requirements (e.g. insurance, registration). We help businesses across London, Birmingham, Coventry, Warwick, Leamington Spa, Kenilworth, and the UK get set up and run campaigns. Meetings are online-first.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <Building2 className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to get more local leads?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Tell us about your business and we’ll walk you through eligibility, setup, and options that fit your budget.
          </p>
          <Link href="/get-started?service=google-local-services-ads">
            <GradientButton variant="primary" size="lg">
              Get started
            </GradientButton>
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}

function WebDesignContent() {
  return (
    <>
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          Web design
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          Professionally designed, mobile-friendly websites that are built for search and built to convert. From landing pages to full sites — we handle design, build, and launch.
        </p>
        <Link href="/get-started?service=web-design">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why your website matters
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          Your website is often the first place people judge your business. A clear, fast, and trustworthy site builds credibility and turns visitors into leads. We design and build sites that look sharp on every device and are optimised for search from day one.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Custom design that reflects your brand and stands out",
            "Mobile-optimised so your site works on every screen",
            "SEO built in: structure, speed, and content that search engines favour",
            "Secure hosting and best-practice security",
            "Clear calls to action so visitors know what to do next",
            "Ongoing support and updates so your site stays current",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#0f0f1a]/80 border border-white/10">
              <CheckCircle className="w-5 h-5 text-[#00D9FF] shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          What we do for you
        </h2>
        <ul className="space-y-4 max-w-3xl">
          {[
            "Planning and structure so your site matches your goals and audience.",
            "Design from scratch: clean, responsive, and on-brand.",
            "Build with modern, maintainable tech so your site is fast and reliable.",
            "Content and copy that’s clear and tuned for both users and search.",
            "SEO basics: meta tags, headings, images, and connection to tools like Search Console.",
            "Launch, hosting, and optional ongoing maintenance and updates.",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-400">
              <span className="text-[#00D9FF] font-bold shrink-0">{(i + 1).toString()}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Who it’s for
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          Startups, small businesses, and anyone who needs a new site or a clear refresh. We work with clients across London, Birmingham, Coventry, Warwick, Leamington Spa, Kenilworth, and beyond. Whether you need a simple landing page or a multi-page site with forms and integrations, we’ll scope it with you and deliver something you can be proud of. Meetings are online-first.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <Layout className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready for a website that works?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Share your goals and we’ll propose a plan and quote tailored to your needs.
          </p>
          <Link href="/get-started?service=web-design">
            <GradientButton variant="primary" size="lg">
              Get started
            </GradientButton>
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];

  if (!slug || !SERVICE_SLUGS[slug]) {
    return (
      <div className="min-h-screen pt-20 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center py-32">
          <h1 className="text-3xl font-bold text-white mb-4">Service not found</h1>
          <p className="text-gray-400 mb-8">
            This service page doesn&apos;t exist yet. Browse our main services or get in touch to ask about it.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-black font-semibold hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              All services
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#00D9FF]/50 text-[#00D9FF] font-semibold hover:bg-[#00D9FF]/10 transition-colors"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: SLUG_TO_TITLE[slug] ?? slug },
            ]}
          />
        </AnimatedSection>

        {slug === "google-business-profiles" && <GoogleBusinessProfileContent />}
        {slug === "seo" && <SEOContent />}
        {slug === "google-local-services-ads" && <GoogleLocalServicesAdsContent />}
        {slug === "web-design" && <WebDesignContent />}
      </div>
    </div>
  );
}
