import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/ui/HeroSection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GradientButton from "@/components/ui/GradientButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ITContactForm from "@/components/it-services/ITContactForm";

export const metadata: Metadata = {
  title: "IT Support, Computer Repair & Custom PC Build Services UK | Inventive Byte LLC",
  description:
    "Expert IT support, computer repair, laptop repair, custom gaming PC builds, software installation, and business IT support across the UK. Book a service or request a quote.",
};

const serviceCards = [
  { href: "/computer-repair", label: "Computer Repair" },
  { href: "/laptop-repair", label: "Laptop Repair" },
  { href: "/gaming-pc-build", label: "Custom Gaming PCs" },
  { href: "/software-installation", label: "Software Installation" },
  { href: "/business-it-support", label: "Business IT Support" },
  { href: "/onsite-it-support", label: "Onsite IT Support" },
];

export default function ITServicesPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <main id="main-content">
        <AnimatedSection className="max-w-6xl mx-auto px-6 mb-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "IT Services" },
            ]}
          />
        </AnimatedSection>

        <HeroSection
          title="IT Support, Computer Repair & Custom PC Build Services in the UK"
          description="From desktop and laptop repair to custom gaming builds, software installation, and business IT support — we deliver reliable, transparent IT services across the United Kingdom."
          primaryCTA={{ text: "Book IT Service", href: "/contact" }}
        />

        <AnimatedSection delay={0.1} className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center">
            Our IT Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block p-6 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10 hover:border-[#00D9FF]/50 transition-all text-center group"
              >
                <span className="text-xl font-semibold text-white group-hover:text-[#00D9FF] transition-colors">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <GradientButton variant="primary" size="lg">
                Book IT Service
              </GradientButton>
            </Link>
            <a href="tel:+441234567890">
              <GradientButton variant="outline" size="lg">
                Call / Book by phone
              </GradientButton>
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.25} className="max-w-2xl mx-auto px-6 py-16">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Request Service
            </h2>
            <ITContactForm />
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
