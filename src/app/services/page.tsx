"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientButton from "@/components/ui/GradientButton";
import { Code, Globe, Users, BarChart3, ShoppingCart, MessageSquare } from "lucide-react";

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
          From SaaS and web apps to recruitment tools and analytics — we build what scales.
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
              className="p-6 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10 hover:border-[#00D9FF]/40 transition-all"
            >
              <service.icon className="w-10 h-10 text-[#00D9FF] mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">{service.title}</h2>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
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
