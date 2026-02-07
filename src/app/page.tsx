"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroSection from "@/components/ui/HeroSection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import GradientButton from "@/components/ui/GradientButton";
import { Code, Users, Rocket, Award, MapPin } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function Home() {
  const { projects: portfolioProjects, loading: portfolioLoading } = usePortfolio();
  const featuredProjects = portfolioProjects.filter((p) => p.featured).slice(0, 3);
  const featuredTestimonials = 3;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="InventiveByte LLC"
        subtitle="Innovation Meets Excellence"
        description="We launch, incubate, and scale innovative SaaS brands and digital products — building the future from Montana, USA."
        primaryCTA={{
          text: "Schedule Free Consultation",
          href: "/appointment",
        }}
        secondaryCTA={{
          text: "Get Started",
          href: "/get-started",
        }}
      />

      {/* At a glance — clear summary for users and AI/search */}
      <AnimatedSection className="px-6 pb-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-[#00D9FF]/90 mb-4">
            What We Do
          </h2>
          <div className="p-5 md:p-6 rounded-2xl bg-[#0f0f1a]/80 border border-[#00D9FF]/20 shadow-lg shadow-[#00D9FF]/5">
            <p className="text-center text-lg md:text-xl text-gray-200 leading-relaxed">
              InventiveByte LLC is a Montana-based company that builds and scales SaaS platforms, web and mobile apps, recruitment tools, and digital products. We work with startups and enterprises worldwide.
            </p>
            <p className="text-center text-lg md:text-xl text-gray-200 leading-relaxed mt-4">
              Our services include SaaS development, e-commerce and marketplaces, analytics and dashboards, HR and recruitment tools, and product consulting — from Kalispell, USA.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* UK service area — visible for Quality Score / local SEO */}
      <AnimatedSection className="px-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 p-5 md:p-6 rounded-2xl bg-[#0f0f1a]/80 border border-[#00D9FF]/20 shadow-lg shadow-[#00D9FF]/5">
            <MapPin className="w-6 h-6 text-[#00D9FF] shrink-0" aria-hidden />
            <p className="text-center sm:text-left text-base md:text-lg text-gray-200 leading-relaxed m-0">
              We serve businesses across London, Birmingham, Coventry, Warwick, Leamington Spa & Kenilworth. Meetings are online-first, with on-site visits available when required.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Code, value: "150+", label: "Projects Completed" },
            { icon: Users, value: "50+", label: "Happy Clients" },
            { icon: Rocket, value: "10+", label: "Brands Launched" },
            { icon: Award, value: "100%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10 hover:border-[#00D9FF]/50 transition-all"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-[#00D9FF]" />
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Featured Portfolio Section */}
      <AnimatedSection delay={0.2} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore some of our most innovative and impactful projects
            </p>
          </div>

          {portfolioLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D9FF]"></div>
              <p className="text-gray-400 mt-4">Loading projects...</p>
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProjects.map((project, index) => (
                <PortfolioCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400">No featured projects available</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/portfolio">
              <GradientButton variant="outline" size="lg">
                View All Projects →
              </GradientButton>
            </Link>
            <Link href="/quote">
              <GradientButton variant="accent" size="lg">
                Request Quote →
              </GradientButton>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Preview */}
      <AnimatedSection delay={0.3} className="py-20 px-6 bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Don&apos;t just take our word for it — hear from those we&apos;ve worked with
            </p>
          </div>

          <TestimonialsSection limit={featuredTestimonials} showTrustBadge />

          <div className="text-center mt-12">
            <Link href="/testimonials">
              <GradientButton variant="accent" size="lg">
                Read All Testimonials →
              </GradientButton>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection delay={0.4} className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 backdrop-blur-sm"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s collaborate and turn your bold ideas into successful digital products. 
            We&apos;re always looking for new opportunities and partners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointment">
              <GradientButton variant="primary" size="lg">
                Schedule Consultation
              </GradientButton>
            </Link>
            <Link href="/quote">
              <GradientButton variant="accent" size="lg">
                Get a Quote
              </GradientButton>
            </Link>
            <Link href="/get-started">
              <GradientButton variant="outline" size="lg">
                Get Started
              </GradientButton>
            </Link>
          </div>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}
