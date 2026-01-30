"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const faqs = [
  {
    question: "What does InventiveByte LLC do?",
    answer:
      "InventiveByte LLC builds, launches, and scales SaaS platforms, digital products, and online tools. We also develop recruitment solutions and incubate multiple brands from our base in Montana, USA.",
  },
  {
    question: "Where is InventiveByte LLC located?",
    answer:
      "We are registered in Montana, USA, with our address at 1001 S. Main St. STE 600, Kalispell, MT 59901. We work with clients and partners globally.",
  },
  {
    question: "How do I get a quote or start a project?",
    answer:
      "You can request a quote from our Quote page, schedule a free consultation from the Appointment page, or contact us directly via the Contact form or email at info@inventivebytellc.com.",
  },
  {
    question: "What kinds of projects do you build?",
    answer:
      "We build SaaS platforms, web and mobile applications, e-commerce solutions, recruitment and HR tools, analytics dashboards, and custom digital products. Check our Portfolio for examples.",
  },
  {
    question: "Do you work with startups and enterprises?",
    answer:
      "Yes. We work with startups, SMBs, and enterprises. We offer everything from MVP development to scaling existing products and building new brands.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope and complexity. We’ll provide an estimate after discussing your requirements. Many MVPs ship in a few months; larger platforms may take longer.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer project-based pricing, retainers, and custom arrangements. Contact us or request a quote with your project details for a tailored proposal.",
  },
  {
    question: "Can I see testimonials from past clients?",
    answer:
      "Yes. Visit our Testimonials page for client and project reviews. You can also submit your own review from the Submit a Review page.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-20 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AnimatedSection className="max-w-4xl mx-auto mb-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "FAQ" },
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
          Frequently Asked Questions
        </motion.h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Quick answers about InventiveByte LLC, our services, and how to work with us
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="max-w-3xl mx-auto">
        <dl className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10 hover:border-[#00D9FF]/30 transition-colors"
            >
              <dt className="text-lg font-semibold text-white mb-2">
                {faq.question}
              </dt>
              <dd className="text-gray-400 leading-relaxed">{faq.answer}</dd>
            </motion.div>
          ))}
        </dl>
      </AnimatedSection>
    </div>
  );
}
