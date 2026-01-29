"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import GradientButton from "../../components/ui/GradientButton";
import AnimatedSection from "../../components/ui/AnimatedSection";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { trackConversion } from "@/lib/google-ads";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Your message has been sent! We'll get back to you soon.");
        trackConversion("request_contact");
        setName("");
        setEmail("");
        setMessage("");
        formRef.current?.reset();
      } else {
        setError(data.error || "Something went wrong. Please try again later.");
      }
    } catch {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen pt-20 pb-20 px-6">
      {/* Hero Section */}
      <AnimatedSection className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text"
        >
          Contact Us
        </motion.h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
          Have a project in mind? Interested in our brands or partnerships? Let&rsquo;s connect.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/appointment">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-black font-semibold"
            >
              Schedule Appointment
            </motion.button>
          </a>
          <a href="/quote">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#B026FF] to-[#FF0066] text-white font-semibold"
            >
              Request Quote
            </motion.button>
          </a>
          <a href="/get-started">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg border-2 border-[#00D9FF] text-[#00D9FF] font-semibold"
            >
              Get Started
            </motion.button>
          </a>
        </div>
      </AnimatedSection>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <AnimatedSection delay={0.2}>
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#00D9FF]/20">
                    <Mail className="w-6 h-6 text-[#00D9FF]" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Email</div>
                    <a
                      href="mailto:info@inventivebytellc.com"
                      className="text-white hover:text-[#00D9FF] transition-colors"
                    >
                      info@inventivebytellc.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#B026FF]/20">
                    <MapPin className="w-6 h-6 text-[#B026FF]" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Address</div>
                    <div className="text-white">
                      <div>InventiveByte LLC</div>
                      <div>1001 S. Main St. STE 600</div>
                      <div>Kalispell, MT 59901</div>
                      <div>USA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <iframe
                title="InventiveByte LLC Location"
                src="https://www.google.com/maps?q=1001+S+Main+St+STE+600,+Kalispell,+MT+59901&output=embed"
                width="100%"
                height="300"
                className="w-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Form */}
        <AnimatedSection delay={0.3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-[#00D9FF] focus:ring-[#00D9FF]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-[#00D9FF] focus:ring-[#00D9FF]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  rows={6}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-[#00D9FF] focus:ring-[#00D9FF]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>{success}</span>
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
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </span>
                )}
              </GradientButton>
            </form>
          </motion.div>
        </AnimatedSection>
      </div>
    </main>
  );
}
