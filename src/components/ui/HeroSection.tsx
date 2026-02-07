"use client";

import { ReactNode } from "react";
import GradientButton from "./GradientButton";
import Link from "next/link";

interface HeroSectionProps {
  title: string | ReactNode;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D9FF]/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B026FF]/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#FF0066]/10 rounded-full blur-3xl animate-float" />
      </div>

      {/* Content - no JS animations so LCP paints immediately */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {subtitle && (
          <p className="hero-fade-in hero-fade-in-delay-1 text-[#00D9FF] font-semibold text-lg mb-4 uppercase tracking-wider">
            {subtitle}
          </p>
        )}

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
          {typeof title === "string" ? (
            <span className="gradient-text">{title}</span>
          ) : (
            title
          )}
        </h1>

        {description && (
          <p className="hero-fade-in hero-fade-in-delay-2 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            {description}
          </p>
        )}

        {(primaryCTA || secondaryCTA) && (
          <div className="hero-fade-in hero-fade-in-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryCTA && (
              <Link href={primaryCTA.href}>
                <GradientButton variant="primary" size="lg">
                  {primaryCTA.text}
                </GradientButton>
              </Link>
            )}
            {secondaryCTA && (
              <Link href={secondaryCTA.href}>
                <GradientButton variant="outline" size="lg">
                  {secondaryCTA.text}
                </GradientButton>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Scroll Indicator - CSS animation only */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hero-fade-in hero-fade-in-delay-4">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="animate-scroll-bounce w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
