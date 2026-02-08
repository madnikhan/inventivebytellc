"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientButton from "@/components/ui/GradientButton";
import {
  Code,
  Globe,
  Users,
  BarChart3,
  ShoppingCart,
  MessageSquare,
  MapPin,
  Megaphone,
  Building2,
  Search,
  Layout,
  FileSearch,
  Wrench,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Code,
    title: "SaaS Development",
    description:
      "End-to-end SaaS platforms: authentication, billing, dashboards, and scalable infrastructure so you can focus on growth.",
  },
  {
    icon: Globe,
    title: "Web & Mobile Apps",
    description:
      "Responsive web apps and native or cross-platform mobile apps built with modern stacks and best practices.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Dashboards",
    description:
      "Real-time data visualization, custom reports, and business intelligence tools that drive decisions.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce & Marketplaces",
    description:
      "Online stores and marketplaces with payments, inventory, and a smooth buyer and seller experience.",
  },
  {
    icon: Users,
    title: "Recruitment & HR Tools",
    description:
      "Applicant tracking, candidate pipelines, and HR platforms that make hiring and people operations easier.",
  },
  {
    icon: MessageSquare,
    title: "Consulting & Strategy",
    description:
      "Technical audits, product strategy, and roadmap planning to align build with business goals.",
  },
  {
    icon: MapPin,
    title: "Google Business Profile",
    slug: "google-business-profiles",
    description:
      "Get found when people search locally. We optimise your profile so you stand out in local search and attract nearby customers.",
  },
  {
    icon: Megaphone,
    title: "Google Ads & PPC",
    slug: "google-ads-ppc",
    description:
      "Paid search and display campaigns that bring in qualified traffic. We handle setup, targeting, and ongoing optimisation.",
  },
  {
    icon: Building2,
    title: "Google Local Services Ads",
    slug: "google-local-services-ads",
    description:
      "Pay-per-lead, Google-verified ads for local service businesses. You pay when leads come in, so spend aligns with results.",
  },
  {
    icon: Search,
    title: "SEO",
    slug: "seo",
    description:
      "Improve where you rank in search so more visitors find you. We focus on sustainable gains and clear, measurable outcomes.",
  },
  {
    icon: Layout,
    title: "Web Design",
    slug: "web-design",
    description:
      "Sites that look sharp and work hard: fast, clear, and built to convert. From landing pages to full websites.",
  },
  {
    icon: FileSearch,
    title: "Website Audits",
    description:
      "A one-off health check of your site: what’s broken, slow, or holding you back, with a clear, actionable plan.",
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    description:
      "Ongoing care: hosting, security updates, content changes, and support so your site stays secure and up to date.",
  },
  {
    icon: Sparkles,
    title: "Other Marketing Services",
    description:
      "Brand, content, or campaigns tailored to your goals. We put together a plan that fits your budget and timeline.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20 pb-20 px-6">
      <AnimatedSection className="max-w-4xl mx-auto mb-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
          className="mb-8"
        />
      </AnimatedSection>

      <AnimatedSection className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 gradient-text"
        >
          Our Services
        </motion.h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          From product development to digital marketing — we help businesses across London, Birmingham, Coventry and beyond grow online.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="max-w-6xl mx-auto mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10 hover:border-[#00D9FF]/40 transition-all flex flex-col"
            >
              <service.icon className="w-10 h-10 text-[#00D9FF] mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">{service.title}</h2>
              <p className="text-gray-400 leading-relaxed flex-grow">{service.description}</p>
              <Link
                href={"slug" in service && service.slug ? `/services/${service.slug}` : "/quote"}
                className="mt-4 inline-flex items-center text-sm font-medium text-[#00D9FF] hover:text-[#00D9FF]/80 transition-colors"
              >
                {"slug" in service && service.slug ? "Learn more →" : "Get in touch →"}
              </Link>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Pricing CTA */}
      <AnimatedSection delay={0.3} className="max-w-3xl mx-auto text-center">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-2">Pricing</h2>
          <p className="text-gray-400 mb-6">
            We offer project-based pricing, retainers, and custom arrangements. Share your goals and we’ll propose a plan that fits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quote">
              <GradientButton variant="accent" size="lg">
                Request a Quote
              </GradientButton>
            </Link>
            <Link href="/contact">
              <GradientButton variant="outline" size="lg">
                Contact Us
              </GradientButton>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
