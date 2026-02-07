"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import FormField from "@/components/forms/FormField";
import FormSelect from "@/components/forms/FormSelect";
import GradientButton from "@/components/ui/GradientButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { trackConversion } from "@/lib/google-ads";
import { CheckCircle, AlertCircle, Download, Sparkles } from "lucide-react";

const interestOptions = [
  { value: "web-development", label: "Web Development" },
  { value: "saas-platform", label: "SaaS Platform" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "google-business-profiles", label: "Google Business Profile" },
  { value: "seo", label: "SEO" },
  { value: "google-local-services-ads", label: "Google Local Services Ads" },
  { value: "web-design", label: "Web Design" },
  { value: "consultation", label: "Free Consultation" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "other", label: "Other" },
];

export default function GetStartedPage() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (serviceParam && interestOptions.some((o) => o.value === serviceParam)) {
      setFormData((prev) => (prev.interest ? prev : { ...prev, interest: serviceParam }));
    }
  }, [serviceParam]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.interest) {
      newErrors.interest = "Please select what you're looking for";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/information-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        trackConversion("information_form");
        setFormData({
          name: "",
          email: "",
          company: "",
          interest: "",
        });
      } else {
        setError(data.error || "Failed to submit form");
      }
    } catch {
      setError("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-6">
      <AnimatedSection className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block mb-6"
        >
          <Sparkles className="w-16 h-16 text-[#00D9FF]" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text"
        >
          Get Started
        </motion.h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
          {serviceParam === "google-business-profiles"
            ? "Get started with Google Business Profile management. Tell us about your business and we'll be in touch."
            : serviceParam === "seo"
              ? "Get started with SEO. Share your goals and we&apos;ll propose a plan that fits."
              : serviceParam === "google-local-services-ads"
                ? "Get started with Google Local Services Ads. We&apos;ll check eligibility and walk you through setup."
                : serviceParam === "web-design"
                  ? "Get started with web design. Tell us about your project and we&apos;ll send a tailored quote."
                  : "Ready to bring your idea to life? Let&apos;s start the conversation and explore how we can help."}
        </p>
      </AnimatedSection>

      {success ? (
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center p-12 rounded-2xl bg-gradient-to-br from-[#00D9FF]/10 to-[#B026FF]/10 border border-[#00D9FF]/30"
          >
            <CheckCircle className="w-16 h-16 text-[#00D9FF] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Thank You!
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              We&apos;ve received your information and will be in touch soon. Check your email for next steps.
            </p>
            <GradientButton
              variant="primary"
              onClick={() => setSuccess(false)}
            >
              Submit Another Request
            </GradientButton>
          </motion.div>
        </AnimatedSection>
      ) : (
        <AnimatedSection delay={0.2}>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10"
            >
              <div className="flex items-center gap-3 mb-8">
                <Download className="w-8 h-8 text-[#00D9FF]" />
                <h2 className="text-3xl font-bold text-white">
                  Tell Us About Your Project
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                  label="Full Name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  error={errors.name}
                  disabled={loading}
                />

                <FormField
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={errors.email}
                  disabled={loading}
                />

                <FormField
                  label="Company (Optional)"
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  disabled={loading}
                />

                <FormSelect
                  label="What are you looking for?"
                  required
                  options={interestOptions}
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  error={errors.interest}
                  disabled={loading}
                />

                {error && (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                )}

                <GradientButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      />
                      Submitting...
                    </span>
                  ) : (
                    "Get Started"
                  )}
                </GradientButton>
              </form>
            </motion.div>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
