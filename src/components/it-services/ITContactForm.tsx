"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GradientButton from "@/components/ui/GradientButton";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const IT_SERVICE_OPTIONS = [
  { value: "computer-repair", label: "Computer Repair" },
  { value: "laptop-repair", label: "Laptop Repair" },
  { value: "gaming-pc-build", label: "Custom Gaming PCs" },
  { value: "software-installation", label: "Software Installation" },
  { value: "ssd-upgrade", label: "SSD Upgrade" },
  { value: "business-it-support", label: "Business IT Support" },
  { value: "onsite-it-support", label: "Onsite IT Support" },
  { value: "other", label: "Other" },
] as const;

const inputClasses =
  "bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-[#00D9FF] focus:ring-[#00D9FF]";

export default function ITContactForm({
  defaultService,
  className,
}: {
  defaultService?: string;
  className?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!name || !email || !service || !message) {
      setError("Please fill in Name, Email, Service, and Message.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact-it", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Your request has been sent. We'll get back to you soon.");
        setName("");
        setEmail("");
        setPhone("");
        setService(defaultService || "");
        setMessage("");
        formRef.current?.reset();
      } else {
        setError(data.error || "Something went wrong. Please try again later.");
      }
    } catch {
      setError("Failed to send request. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn("space-y-6", className)}
    >
      <div>
        <Input
          type="text"
          placeholder="Your Name"
          className={inputClasses}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Your Email"
          className={inputClasses}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <Input
          type="tel"
          placeholder="Phone (optional)"
          className={inputClasses}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          disabled={loading}
          className={cn(
            "flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
            "border-input focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "bg-white/5 border-white/20 text-white focus:border-[#00D9FF] focus:ring-[#00D9FF]"
          )}
          required
        >
          <option value="" className="bg-[#1a1a2e] text-gray-300">
            Service required
          </option>
          {IT_SERVICE_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-[#1a1a2e] text-gray-300"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Textarea
          placeholder="Your Message"
          rows={5}
          className={inputClasses}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400">
          <CheckCircle className="w-5 h-5 shrink-0" />
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
            Request Service
          </span>
        )}
      </GradientButton>
    </form>
  );
}
