"use client";

import Link from "next/link";
import HeroSection from "@/components/ui/HeroSection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GradientButton from "@/components/ui/GradientButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ITContactForm from "./ITContactForm";
import { Phone, Wrench, Shield, Clock, PoundSterling } from "lucide-react";

export interface ITServicePageTemplateProps {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  breadcrumbLabel: string;
  breadcrumbHref: string;
  servicesList: string[];
  pricingText: string;
  heroCtaText?: string;
  heroCtaHref?: string;
  /** Optional: service key for pre-selecting in form (e.g. "computer-repair") */
  defaultService?: string;
  /** Optional JSON-LD service name for this page */
  serviceSchemaName?: string;
  serviceSchemaDescription?: string;
}

const whyChooseUs = [
  { icon: Wrench, text: "Experienced technicians" },
  { icon: Shield, text: "UK-focused, reliable service" },
  { icon: PoundSterling, text: "Transparent pricing" },
  { icon: Clock, text: "Quick turnaround when possible" },
];

export default function ITServicePageTemplate({
  title,
  description,
  breadcrumbLabel,
  breadcrumbHref,
  servicesList,
  pricingText,
  heroCtaText = "Book IT Service",
  heroCtaHref = "/contact",
  defaultService,
  serviceSchemaName,
  serviceSchemaDescription,
}: ITServicePageTemplateProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inventivebytellc.com";
  const serviceJsonLd =
    serviceSchemaName && serviceSchemaDescription
      ? {
          "@context": "https://schema.org",
          "@type": "Service" as const,
          name: serviceSchemaName,
          description: serviceSchemaDescription,
          provider: { "@id": `${siteUrl}/#organization` },
          areaServed: "GB",
        }
      : null;

  return (
    <div className="min-h-screen pt-20 pb-20">
      {serviceJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      )}
      <main id="main-content">
        <AnimatedSection className="max-w-6xl mx-auto px-6 mb-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "IT Services", href: "/it-services" },
              { label: breadcrumbLabel, href: breadcrumbHref },
            ]}
          />
        </AnimatedSection>

        <HeroSection
          title={title}
          description={description}
          primaryCTA={
            heroCtaText && heroCtaHref
              ? { text: heroCtaText, href: heroCtaHref }
              : undefined
          }
        />

        <AnimatedSection delay={0.1} className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center">
            What We Offer
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto list-disc list-inside text-gray-300 text-lg">
            {servicesList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="max-w-6xl mx-auto px-6 py-8">
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <PoundSterling className="w-6 h-6 text-[#00D9FF]" />
              Pricing
            </h2>
            <p className="text-gray-300 text-lg">{pricingText}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.25} className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
            Why Choose Us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10"
              >
                <Icon className="w-8 h-8 text-[#00D9FF] mb-3" />
                <span className="text-gray-300 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={heroCtaHref}>
              <GradientButton variant="primary" size="lg">
                {heroCtaText}
              </GradientButton>
            </Link>
            <a href="tel:+441234567890">
              <GradientButton variant="outline" size="lg">
                <span className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call / Book by phone
                </span>
              </GradientButton>
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.35} className="max-w-2xl mx-auto px-6 py-16">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Request Service
            </h2>
            <ITContactForm defaultService={defaultService} />
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
