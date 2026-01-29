"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FormField from "@/components/forms/FormField";
import FormSelect from "@/components/forms/FormSelect";
import GradientButton from "@/components/ui/GradientButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { trackConversion } from "@/lib/google-ads";
import { CheckCircle, AlertCircle, UserPlus } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceInterest: "",
    referralSource: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const serviceInterests = [
    { value: "web-development", label: "Web Development" },
    { value: "saas-platform", label: "SaaS Platform Development" },
    { value: "mobile-app", label: "Mobile App Development" },
    { value: "consultation", label: "Consultation Services" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "other", label: "Other" },
  ];

  const referralSources = [
    { value: "google-search", label: "Google Search" },
    { value: "social-media", label: "Social Media" },
    { value: "referral", label: "Referral" },
    { value: "portfolio", label: "Portfolio/Previous Work" },
    { value: "other", label: "Other" },
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
    if (!formData.serviceInterest) {
      newErrors.serviceInterest = "Please select a service interest";
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
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        trackConversion("sign_up");
        setFormData({
          name: "",
          email: "",
          company: "",
          serviceInterest: "",
          referralSource: "",
        });
      } else {
        setError(data.error || "Failed to sign up");
      }
    } catch {
      setError("Failed to sign up. Please try again.");
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
          <UserPlus className="w-16 h-16 text-[#00D9FF]" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text"
        >
          Sign Up
        </motion.h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
          Join our community and get access to exclusive resources, updates, and early access to new services.
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
              Welcome Aboard!
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Thank you for signing up! Check your email for a welcome message and next steps.
            </p>
            <GradientButton
              variant="primary"
              onClick={() => setSuccess(false)}
            >
              Sign Up Another Account
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
              <h2 className="text-3xl font-bold text-white mb-8">
                Create Your Account
              </h2>

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
                  label="Service Interest"
                  required
                  options={serviceInterests}
                  value={formData.serviceInterest}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceInterest: e.target.value })
                  }
                  error={errors.serviceInterest}
                  disabled={loading}
                />

                <FormSelect
                  label="How did you hear about us?"
                  options={referralSources}
                  value={formData.referralSource}
                  onChange={(e) =>
                    setFormData({ ...formData, referralSource: e.target.value })
                  }
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
                      Signing Up...
                    </span>
                  ) : (
                    "Sign Up"
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
