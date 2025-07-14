"use client";
import { useState, useRef } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

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
    <main className="flex flex-col items-center justify-center min-h-screen text-black px-10 py-20 space-y-10">
      <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-8 tracking-tight">Contact InventiveByte LLC</h1>
      <p className="text-xl md:text-2xl text-center max-w-xl mb-4 text-gray-700 leading-relaxed">
        Have a project in mind? Interested in our brands or partnerships? Let&rsquo;s connect.
      </p>
      <div className="mb-8 text-center text-base md:text-lg text-gray-600 space-y-2">
        <div className="font-bold">Registered Office:</div>
        <div>InventiveByte LLC</div>
        <div>1001 S. Main St. STE 600</div>
        <div>Kalispell, MT 59901</div>
        <div>USA</div>
        <div className="mt-2">Business email: <a href="mailto:info@inventivebytellc.com" className="underline-offset-4 hover:underline transition-colors">info@inventivebytellc.com</a></div>
      </div>
      <div className="w-full flex justify-center mb-8">
        <iframe
          title="InventiveByte LLC Location"
          src="https://www.google.com/maps?q=1001+S+Main+St+STE+600,+Kalispell,+MT+59901&output=embed"
          width="100%"
          height="300"
          className="rounded-lg border border-gray-300 max-w-xl w-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-lg bg-white/60 backdrop-blur-md rounded-xl shadow-md p-10 flex flex-col gap-6 space-y-4 border border-gray-200">
        <Input
          type="text"
          placeholder="Name"
          className="bg-transparent"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={loading}
        />
        <Input
          type="email"
          placeholder="Email"
          className="bg-transparent"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
        <Textarea
          placeholder="Message"
          rows={5}
          className="bg-transparent"
          value={message}
          onChange={e => setMessage(e.target.value)}
          disabled={loading}
        />
        {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
        {success && <div className="text-green-700 text-sm font-medium">{success}</div>}
        <Button type="submit" className="mt-4 w-full" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </main>
  );
} 