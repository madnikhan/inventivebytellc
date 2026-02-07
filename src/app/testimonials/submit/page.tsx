"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GradientButton from "@/components/ui/GradientButton";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function SubmitTestimonialPage() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState<number | "">(5);
  const [type, setType] = useState<"client" | "project" | "project_volunteering">("client");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!quote.trim()) {
      setError("Please enter your review.");
      return;
    }
    if (!author.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!role.trim()) {
      setError("Please enter your role or title.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quote: quote.trim(),
          author: author.trim(),
          role: role.trim(),
          company: company.trim() || undefined,
          rating: rating === "" ? undefined : Number(rating),
          type,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message || "Thank you! Your review has been submitted.");
        setQuote("");
        setAuthor("");
        setRole("");
        setCompany("");
        setRating(5);
        setType("client");
        formRef.current?.reset();
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to submit. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-[#00D9FF] focus:ring-[#00D9FF]";
  const labelClass = "block text-sm font-medium text-gray-400 mb-1";

  return (
    <div className="min-h-screen pt-20 pb-20 px-6">
      <AnimatedSection className="max-w-2xl mx-auto">
        <Link
          href="/testimonials"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00D9FF] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Testimonials
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold mb-2 gradient-text"
        >
          Submit a Review
        </motion.h1>
        <p className="text-lg text-gray-400 mb-10">
          Share your experience working with InventiveByte. Your review will be
          submitted for approval before it appears on our site.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10"
        >
          {success && (
            <div className="mb-6 p-4 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#00D9FF] shrink-0 mt-0.5" />
              <p className="text-gray-200">{success}</p>
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-gray-200">{error}</p>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="quote" className={labelClass}>
                Your review *
              </label>
              <Textarea
                id="quote"
                placeholder="Tell us about your experience..."
                rows={5}
                className={`${inputClass} resize-none`}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div>
              <label htmlFor="author" className={labelClass}>
                Your name *
              </label>
              <Input
                id="author"
                type="text"
                placeholder="e.g. Jane Smith"
                className={inputClass}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div>
              <label htmlFor="role" className={labelClass}>
                Role / Title *
              </label>
              <Input
                id="role"
                type="text"
                placeholder="e.g. CEO, Product Manager"
                className={inputClass}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div>
              <label htmlFor="company" className={labelClass}>
                Company (optional)
              </label>
              <Input
                id="company"
                type="text"
                placeholder="e.g. Acme Inc."
                className={inputClass}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className={labelClass}>Rating (optional)</label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#00D9FF]"
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        (rating === "" ? 0 : rating) >= n
                          ? "fill-[#FFD700] text-[#FFD700]"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Review type</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="client"
                    checked={type === "client"}
                    onChange={() => setType("client")}
                    className="accent-[#00D9FF]"
                    disabled={loading}
                  />
                  <span className="text-gray-300">Client</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="project"
                    checked={type === "project"}
                    onChange={() => setType("project")}
                    className="accent-[#00D9FF]"
                    disabled={loading}
                  />
                  <span className="text-gray-300">Project</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="project_volunteering"
                    checked={type === "project_volunteering"}
                    onChange={() => setType("project_volunteering")}
                    className="accent-[#00D9FF]"
                    disabled={loading}
                  />
                  <span className="text-gray-300">Project (Volunteering)</span>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <GradientButton
                type="submit"
                variant="accent"
                size="lg"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </GradientButton>
            </div>
          </form>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}
