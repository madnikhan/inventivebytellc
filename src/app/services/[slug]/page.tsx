"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, CheckCircle, Search, Building2, Layout, Megaphone, FileSearch, Wrench, Sparkles, Lightbulb, Users, ShoppingCart, Layers, Smartphone, BarChart3 } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientButton from "@/components/ui/GradientButton";

const SERVICE_SLUGS: Record<string, boolean> = {
  "google-business-profiles": true,
  "seo": true,
  "google-local-services-ads": true,
  "web-design": true,
  "google-ads-ppc": true,
  "website-audits": true,
  "other-marketing-services": true,
  "website-maintenance": true,
  "consulting-strategy": true,
  "recruitment-hr-tools": true,
  "ecommerce-marketplaces": true,
  "saas-development": true,
  "web-mobile-apps": true,
  "analytics-dashboards": true,
};

const SLUG_TO_TITLE: Record<string, string> = {
  "google-business-profiles": "Google Business Profile",
  "seo": "SEO",
  "google-local-services-ads": "Google Local Services Ads",
  "web-design": "Web Design",
  "google-ads-ppc": "Google Ads & PPC",
  "website-audits": "Website Audits",
  "other-marketing-services": "Other Marketing Services",
  "website-maintenance": "Website Maintenance",
  "consulting-strategy": "Consulting & Strategy",
  "recruitment-hr-tools": "Recruitment & HR Tools",
  "ecommerce-marketplaces": "E-Commerce & Marketplaces",
  "saas-development": "SaaS Development",
  "web-mobile-apps": "Web & Mobile Apps",
  "analytics-dashboards": "Analytics & Dashboards",
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

function GoogleAdsPPCContent() {
  return (
    <>
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          Google Ads & PPC
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          Paid search and display campaigns that bring in qualified traffic. We handle setup, targeting, and ongoing optimisation.
        </p>
        <Link href="/get-started?service=google-ads-ppc">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why paid search works
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          When people search for what you offer, paid ads put you in front of them at the moment they’re ready to act. Unlike organic search, you control where you appear and can scale up or down by budget. Done well, Google Ads and display campaigns drive qualified traffic and measurable leads or sales.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "Reach people actively searching for your products or services",
            "Control budget, targeting, and messaging",
            "Fast visibility — no waiting for SEO to build",
            "Clear reporting on clicks, conversions, and ROI",
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

      <AnimatedSection delay={0.2} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          What we do for you
        </h2>
        <ul className="space-y-4 max-w-3xl">
          {[
            "Campaign setup: Search, Display, or both, aligned with your goals and budget.",
            "Keyword research and targeting so your ads show for the right searches.",
            "Ad copy and creatives that stand out and drive clicks.",
            "Bidding and budget management for the best return.",
            "Ongoing optimisation: tests, adjustments, and scaling what works.",
            "Reporting and insights so you see performance and ROI.",
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
          Businesses that want to grow leads or sales quickly and are ready to invest in paid traffic. We work with local and regional businesses across London, Birmingham, Coventry, Warwick, Leamington Spa, Kenilworth, and beyond. Whether you’re new to Google Ads or want to improve existing campaigns, we’ll set up and optimise so you get qualified traffic. Meetings are online-first.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <Megaphone className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to grow with paid campaigns?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Tell us your goals and budget. We’ll propose a plan for setup, targeting, and ongoing optimisation.
          </p>
          <Link href="/get-started?service=google-ads-ppc">
            <GradientButton variant="primary" size="lg">
              Get started
            </GradientButton>
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}

function WebsiteAuditsContent() {
  return (
    <>
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          Website Audits
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          A one-off health check of your site: what&apos;s broken, slow, or holding you back, with a clear, actionable plan.
        </p>
        <Link href="/get-started?service=website-audits">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>
      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why an audit matters
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          Hidden issues — slow load times, broken links, poor SEO, or security gaps — can cost you traffic and trust. A structured audit surfaces what&apos;s wrong and what to fix first, so you can prioritise and invest wisely.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Identify technical and SEO issues holding you back",
            "Prioritised, actionable recommendations",
            "Clear roadmap for improvements",
            "Baseline for measuring future gains",
            "Security and performance insights",
            "Better user experience and conversions",
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
            "Full-site review: speed, structure, SEO, and usability.",
            "Technical checks: Core Web Vitals, crawlability, and errors.",
            "Content and conversion path review.",
            "Security and hosting considerations.",
            "Written report with prioritised actions and next steps.",
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
          Who it&apos;s for
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          Anyone with an existing site who wants to know where they stand and what to fix first — from small businesses to larger teams. We deliver a clear, actionable plan so you can decide what to tackle in-house or with our help.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <FileSearch className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready for a clear picture of your site?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Book an audit and we&apos;ll deliver a prioritised plan you can act on.
          </p>
          <Link href="/get-started?service=website-audits">
            <GradientButton variant="primary" size="lg">
              Get started
            </GradientButton>
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}

function OtherMarketingServicesContent() {
  return (
    <>
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          Other Marketing Services
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          Brand, content, or campaigns tailored to your goals. We put together a plan that fits your budget and timeline.
        </p>
        <Link href="/get-started?service=other-marketing-services">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>
      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why it matters
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          Marketing is more than a single channel. Whether you need brand clarity, content that converts, or campaigns across channels, a plan that fits your budget and timeline keeps you moving forward without overreaching.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Brand and messaging aligned with your audience",
            "Content strategy and execution",
            "Campaign planning across channels",
            "Budget and timeline that work for you",
            "Clear goals and measurable outcomes",
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
            "Brand and positioning: clarity, voice, and visual direction.",
            "Content: strategy, copy, and assets for web and campaigns.",
            "Campaign planning: channels, messaging, and timelines.",
            "Execution and optimisation within your budget.",
            "Reporting and next-step recommendations.",
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
          Who it&apos;s for
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          Businesses that want marketing support beyond a single service — brand, content, or multi-channel campaigns — with a plan that fits their budget and timeline. We work with small and mid-size businesses across the UK.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <Sparkles className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to grow your marketing?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Tell us your goals and we&apos;ll propose a plan that fits your budget and timeline.
          </p>
          <Link href="/get-started?service=other-marketing-services">
            <GradientButton variant="primary" size="lg">
              Get started
            </GradientButton>
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}

function WebsiteMaintenanceContent() {
  return (
    <>
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          Website Maintenance
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          Ongoing care: hosting, security updates, content changes, and support so your site stays secure and up to date.
        </p>
        <Link href="/get-started?service=website-maintenance">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>
      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why maintenance matters
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          Sites that aren&apos;t updated can become slow, insecure, or broken. Regular maintenance keeps your site secure, fast, and aligned with your business — so you can focus on running it, not fixing it.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Security updates and patches",
            "Reliable hosting and uptime",
            "Content and copy updates when you need them",
            "Backups and recovery options",
            "Support when something goes wrong",
            "Peace of mind so your site stays current",
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
            "Hosting and environment management so your site stays online.",
            "Security updates: core, plugins, and dependencies.",
            "Content and copy changes within agreed scope.",
            "Backups and restore support.",
            "Monitoring and quick response when issues arise.",
            "Reporting so you know your site is in good shape.",
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
          Who it&apos;s for
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          Businesses that want their site looked after without hiring in-house. We handle hosting, updates, and content changes so you can focus on your business. Flexible plans to match how often you need support.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <Wrench className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready for hassle-free site care?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Tell us your site and needs — we&apos;ll propose a maintenance plan that fits.
          </p>
          <Link href="/get-started?service=website-maintenance">
            <GradientButton variant="primary" size="lg">
              Get started
            </GradientButton>
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}

function ConsultingStrategyContent() {
  return (
    <>
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          Consulting & Strategy
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          Technical audits, product strategy, and roadmap planning to align build with business goals.
        </p>
        <Link href="/get-started?service=consulting-strategy">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>
      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why strategy matters
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          Building without a clear plan can waste time and budget. Technical audits and product strategy help you prioritise, avoid pitfalls, and align what you build with what your business actually needs.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Technical audits to identify risks and opportunities",
            "Product and feature roadmap aligned with goals",
            "Clear priorities and sequencing",
            "Alignment between build and business",
            "Informed decisions before big investments",
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
            "Technical audits: architecture, stack, security, and scalability.",
            "Product strategy: goals, users, and feature prioritisation.",
            "Roadmap planning: what to build, in what order, and why.",
            "Vendor and build vs. buy guidance.",
            "Ongoing advisory so decisions stay aligned with strategy.",
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
          Who it&apos;s for
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          Founders, product owners, and teams who want an outside view before committing to a build. We help you clarify goals, prioritise work, and plan a roadmap that fits your budget and timeline.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <Lightbulb className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to align build with strategy?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Share your goals and we&apos;ll propose an audit or strategy engagement.
          </p>
          <Link href="/get-started?service=consulting-strategy">
            <GradientButton variant="primary" size="lg">
              Get started
            </GradientButton>
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}

function RecruitmentHRToolsContent() {
  return (
    <>
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          Recruitment & HR Tools
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          Applicant tracking, candidate pipelines, and HR platforms that make hiring and people operations easier.
        </p>
        <Link href="/get-started?service=recruitment-hr-tools">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>
      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why it matters
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          Hiring and HR workflows are easier when you have the right tools. From applicant tracking to candidate pipelines and people operations, we build or integrate systems that scale with your team.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Applicant tracking and candidate pipelines",
            "HR workflows and people operations",
            "Integrations with job boards and tools",
            "Reporting and compliance support",
            "Scalable as your team grows",
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
            "ATS and candidate pipeline design and build.",
            "HR portals and self-service for staff.",
            "Integrations with job boards, calendars, and comms.",
            "Reporting, analytics, and compliance features.",
            "Ongoing support and iteration as your needs evolve.",
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
          Who it&apos;s for
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          Recruiters, HR teams, and growing companies that need better tools for hiring and people operations. We build custom or integrated solutions that fit your process and scale.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <Users className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to streamline hiring and HR?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Tell us your workflow and we&apos;ll propose a solution that fits.
          </p>
          <Link href="/get-started?service=recruitment-hr-tools">
            <GradientButton variant="primary" size="lg">
              Get started
            </GradientButton>
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}

function EcommerceMarketplacesContent() {
  return (
    <>
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          E-Commerce & Marketplaces
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          Online stores and marketplaces with payments, inventory, and a smooth buyer and seller experience.
        </p>
        <Link href="/get-started?service=ecommerce-marketplaces">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>
      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why it matters
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          E-commerce and marketplaces need more than a pretty storefront. Payments, inventory, fulfilment, and a great experience for buyers (and sellers, for marketplaces) are what drive sales and retention.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Secure payments and checkout",
            "Inventory and order management",
            "Smooth buyer and seller experience",
            "Scalable and reliable infrastructure",
            "Integrations with shipping and tools",
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
            "Online store design and build: products, cart, checkout, and payments.",
            "Marketplace platforms: multi-seller, listings, and commissions.",
            "Inventory, orders, and fulfilment workflows.",
            "Integrations: payment gateways, shipping, and analytics.",
            "Ongoing support and scaling as you grow.",
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
          Who it&apos;s for
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          Brands and businesses that want to sell online or run a marketplace. We build stores and platforms with payments, inventory, and a smooth experience for buyers and sellers.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <ShoppingCart className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to sell online?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Tell us your product and audience — we&apos;ll propose a store or marketplace that fits.
          </p>
          <Link href="/get-started?service=ecommerce-marketplaces">
            <GradientButton variant="primary" size="lg">
              Get started
            </GradientButton>
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}

function SaaSDevelopmentContent() {
  return (
    <>
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          SaaS Development
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          End-to-end SaaS platforms: authentication, billing, dashboards, and scalable infrastructure so you can focus on growth.
        </p>
        <Link href="/get-started?service=saas-development">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>
      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why it matters
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          SaaS products need auth, billing, dashboards, and infrastructure that scale. We build the full stack so you can focus on your product and customers, not reinventing the wheel.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Authentication and user management",
            "Subscription and billing",
            "Dashboards and admin tools",
            "Scalable, secure infrastructure",
            "APIs and integrations",
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
            "Product design and architecture for your SaaS idea.",
            "Auth, roles, and user management.",
            "Subscription and payment integration (e.g. Stripe).",
            "Dashboards, reporting, and admin panels.",
            "APIs, integrations, and scalable hosting.",
            "Ongoing development and support as you grow.",
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
          Who it&apos;s for
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          Startups and businesses building a software product. We handle the platform — auth, billing, dashboards, and infrastructure — so you can focus on features and growth.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <Layers className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to build your SaaS?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Share your vision and we&apos;ll propose an architecture and plan that scales.
          </p>
          <Link href="/get-started?service=saas-development">
            <GradientButton variant="primary" size="lg">
              Get started
            </GradientButton>
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}

function WebMobileAppsContent() {
  return (
    <>
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          Web & Mobile Apps
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          Responsive web apps and native or cross-platform mobile apps built with modern stacks and best practices.
        </p>
        <Link href="/get-started?service=web-mobile-apps">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>
      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why it matters
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          Users expect fast, reliable experiences on every device. Whether you need a responsive web app or a native or cross-platform mobile app, we build with modern stacks and best practices so your product performs.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Responsive web apps that work on any device",
            "Native or cross-platform mobile apps",
            "Modern stacks and best practices",
            "Performance and accessibility",
            "Ongoing support and updates",
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
            "Web apps: responsive, fast, and built for your use case.",
            "Mobile apps: native (iOS/Android) or cross-platform (e.g. React Native).",
            "UI/UX aligned with your brand and users.",
            "APIs, auth, and backend as needed.",
            "Launch, app store support, and ongoing updates.",
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
          Who it&apos;s for
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          Businesses that need a web app or mobile app — from startups to enterprises. We build responsive web apps and native or cross-platform mobile apps with modern stacks and best practices.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <Smartphone className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to build your app?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Tell us your platform and goals — we&apos;ll propose a plan that fits.
          </p>
          <Link href="/get-started?service=web-mobile-apps">
            <GradientButton variant="primary" size="lg">
              Get started
            </GradientButton>
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}

function AnalyticsDashboardsContent() {
  return (
    <>
      <AnimatedSection className="mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
          Analytics & Dashboards
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-8">
          Real-time data visualization, custom reports, and business intelligence tools that drive decisions.
        </p>
        <Link href="/get-started?service=analytics-dashboards">
          <GradientButton variant="primary" size="lg">
            Get started
          </GradientButton>
        </Link>
      </AnimatedSection>
      <AnimatedSection delay={0.1} className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Why it matters
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          Data is only useful when you can see it and act on it. Dashboards and custom reports turn your data into clear visuals and insights so you can make better decisions, spot trends, and track what matters.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Real-time and historical data in one place",
            "Custom reports and visualisations",
            "KPIs and metrics that matter to you",
            "Integrations with your existing tools",
            "Business intelligence that drives decisions",
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
            "Dashboard design and build: KPIs, charts, and filters.",
            "Data pipelines and integrations (APIs, DBs, spreadsheets).",
            "Custom reports and scheduled exports.",
            "Real-time or near-real-time updates where needed.",
            "Training and documentation so your team can use it.",
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
          Who it&apos;s for
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          Teams and businesses that need to see their data clearly. We build dashboards, reports, and BI tools that connect to your sources and surface the metrics that drive your decisions.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 text-center">
          <BarChart3 className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to see your data clearly?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Tell us your data sources and KPIs — we&apos;ll propose a dashboard or report solution.
          </p>
          <Link href="/get-started?service=analytics-dashboards">
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
        {slug === "google-ads-ppc" && <GoogleAdsPPCContent />}
        {slug === "google-local-services-ads" && <GoogleLocalServicesAdsContent />}
        {slug === "web-design" && <WebDesignContent />}
        {slug === "website-audits" && <WebsiteAuditsContent />}
        {slug === "other-marketing-services" && <OtherMarketingServicesContent />}
        {slug === "website-maintenance" && <WebsiteMaintenanceContent />}
        {slug === "consulting-strategy" && <ConsultingStrategyContent />}
        {slug === "recruitment-hr-tools" && <RecruitmentHRToolsContent />}
        {slug === "ecommerce-marketplaces" && <EcommerceMarketplacesContent />}
        {slug === "saas-development" && <SaaSDevelopmentContent />}
        {slug === "web-mobile-apps" && <WebMobileAppsContent />}
        {slug === "analytics-dashboards" && <AnalyticsDashboardsContent />}
      </div>
    </div>
  );
}
