"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientButton from "@/components/ui/GradientButton";
import Link from "next/link";
import { Rocket, Target, MapPin, Code, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-20 px-6">
      <AnimatedSection className="max-w-4xl mx-auto mb-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      </AnimatedSection>
      {/* Hero Section */}
      <AnimatedSection className="text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text"
        >
          About InventiveByte LLC
        </motion.h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Building the future, one innovative project at a time
        </p>
      </AnimatedSection>

      {/* Main Content */}
      <AnimatedSection delay={0.2} className="max-w-4xl mx-auto mb-20">
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-300 leading-relaxed mb-8 text-center">
            InventiveByte LLC was founded in 2025 in Montana, USA, with one vision: to build and manage multiple future-focused brands under a single, flexible parent structure.
          </p>
        </div>
      </AnimatedSection>

      {/* Mission & Values */}
      <AnimatedSection delay={0.3} className="mb-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10 hover:border-[#00D9FF]/50 transition-all"
          >
            <Target className="w-12 h-12 text-[#00D9FF] mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              Our mission is to launch innovative SaaS platforms, useful online tools, and smart recruitment solutions that deliver real value for clients worldwide. We combine cutting-edge technology with user-centric design to create products that make a difference.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10 hover:border-[#B026FF]/50 transition-all"
          >
            <Rocket className="w-12 h-12 text-[#B026FF] mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              To become a leading incubator of innovative digital brands, transforming bold ideas into successful SaaS platforms and technology ventures that help people work smarter and connect better.
            </p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Location */}
      <AnimatedSection delay={0.4} className="mb-20">
        <div className="max-w-4xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10">
          <MapPin className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Where We Work</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            InventiveByte LLC is registered in Montana and works with partners and clients around the world. Our distributed team brings together the best talent from across the globe.
          </p>
          <div className="text-gray-400 space-y-2">
            <div className="font-semibold text-white">Registered Office:</div>
            <div>InventiveByte LLC</div>
            <div>1001 S. Main St. STE 600</div>
            <div>Kalispell, MT 59901</div>
            <div>USA</div>
          </div>
        </div>
      </AnimatedSection>

      {/* Founder Note */}
      <AnimatedSection delay={0.5} className="mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 gradient-text">A Note from the Founder</h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30 backdrop-blur-sm"
          >
            <p className="text-xl text-gray-300 leading-relaxed text-center mb-6 italic">
              &ldquo;InventiveByte LLC is just getting started, but our vision is bold: to launch and grow innovative SaaS brands and digital products from Montana to the world. If you&rsquo;re interested in partnering, collaborating, or joining our journey, I&rsquo;d love to connect.&rdquo;
            </p>
            <div className="text-center">
              <div className="text-[#00D9FF] font-bold text-lg">— Muhammad Madni</div>
              <div className="text-gray-400">Founder & CEO</div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection delay={0.6}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          {[
            { icon: Code, value: "10+", label: "Projects" },
            { icon: Users, value: "50+", label: "Clients" },
            { icon: Rocket, value: "5+", label: "Brands" },
            { icon: Award, value: "100%", label: "Satisfaction" },
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

      {/* CTA */}
      <AnimatedSection delay={0.7} className="text-center">
        <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-[#00D9FF]/10 via-[#B026FF]/10 to-[#FF0066]/10 border border-[#00D9FF]/30">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            Let&apos;s Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Choose how you&apos;d like to get started. We&apos;re here to help bring your vision to life.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/appointment">
              <GradientButton variant="primary" size="lg" className="w-full">
                Schedule Consultation
              </GradientButton>
            </Link>
            <Link href="/quote">
              <GradientButton variant="accent" size="lg" className="w-full">
                Request a Quote
              </GradientButton>
            </Link>
            <Link href="/get-started">
              <GradientButton variant="outline" size="lg" className="w-full">
                Get Started
              </GradientButton>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
