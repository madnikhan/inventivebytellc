"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FormField from "@/components/forms/FormField";
import FormSelect from "@/components/forms/FormSelect";
import FormTextarea from "@/components/forms/FormTextarea";
import GradientButton from "@/components/ui/GradientButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { trackConversion } from "@/lib/google-ads";
import { CheckCircle, AlertCircle, DollarSign } from "lucide-react";

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budgetRange: "",
    timeline: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const projectTypes = [
    { value: "web-app", label: "Web Application" },
    { value: "saas-platform", label: "SaaS Platform" },
    { value: "mobile-app", label: "Mobile App" },
    { value: "e-commerce", label: "E-Commerce Platform" },
    { value: "custom-software", label: "Custom Software" },
    { value: "other", label: "Other" },
  ];

  const budgetRanges = [
    { value: "under-10k", label: "Under $10,000" },
    { value: "10k-25k", label: "$10,000 - $25,000" },
    { value: "25k-50k", label: "$25,000 - $50,000" },
    { value: "50k-100k", label: "$50,000 - $100,000" },
    { value: "100k-plus", label: "$100,000+" },
  ];

  const timelines = [
    { value: "asap", label: "ASAP" },
    { value: "1-3months", label: "1-3 Months" },
    { value: "3-6months", label: "3-6 Months" },
    { value: "6-12months", label: "6-12 Months" },
    { value: "flexible", label: "Flexible" },
  ];

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
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type";
    }
    if (!formData.budgetRange) {
      newErrors.budgetRange = "Please select a budget range";
    }
    if (!formData.timeline) {
      newErrors.timeline = "Please select a timeline";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
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
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        trackConversion("request_quote");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "",
          budgetRange: "",
          timeline: "",
          description: "",
        });
      } else {
        setError(data.error || "Failed to submit quote request");
      }
    } catch {
      setError("Failed to submit quote request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 pb-20 px-6">
      <AnimatedSection className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block mb-6"
        >
          <DollarSign className="w-16 h-16 text-[#00D9FF]" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text"
        >
          Request a Quote
        </motion.h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
          Get a detailed quote for your project. Tell us about your requirements and we&apos;ll provide a customized estimate.
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
              Quote Request Received!
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              We&apos;ve received your quote request and will review it carefully. Our team will get back to you within 24-48 hours with a detailed estimate.
            </p>
            <GradientButton
              variant="primary"
              onClick={() => setSuccess(false)}
            >
              Request Another Quote
            </GradientButton>
          </motion.div>
        </AnimatedSection>
      ) : (
        <AnimatedSection delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10"
            >
              <h2 className="text-3xl font-bold text-white mb-8">
                Project Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
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
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    error={errors.phone}
                    disabled={loading}
                  />

                  <FormField
                    label="Company"
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormSelect
                    label="Project Type"
                    required
                    options={projectTypes}
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    error={errors.projectType}
                    disabled={loading}
                  />

                  <FormSelect
                    label="Budget Range"
                    required
                    options={budgetRanges}
                    value={formData.budgetRange}
                    onChange={(e) =>
                      setFormData({ ...formData, budgetRange: e.target.value })
                    }
                    error={errors.budgetRange}
                    disabled={loading}
                  />
                </div>

                <FormSelect
                  label="Timeline"
                  required
                  options={timelines}
                  value={formData.timeline}
                  onChange={(e) =>
                    setFormData({ ...formData, timeline: e.target.value })
                  }
                  error={errors.timeline}
                  disabled={loading}
                />

                <FormTextarea
                  label="Project Description"
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe your project in detail. Include features, requirements, and any specific needs..."
                  error={errors.description}
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
                    "Request Quote"
                  )}
                </GradientButton>
              </form>
            </motion.div>
          </div>
        </AnimatedSection>
      )}
    </main>
  );
}
