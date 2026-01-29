"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CalendarPicker from "@/components/calendar/CalendarPicker";
import TimeSlotPicker from "@/components/calendar/TimeSlotPicker";
import FormField from "@/components/forms/FormField";
import FormSelect from "@/components/forms/FormSelect";
import FormTextarea from "@/components/forms/FormTextarea";
import GradientButton from "@/components/ui/GradientButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { trackConversion } from "@/lib/google-ads";
import { CheckCircle, AlertCircle, Calendar, Clock } from "lucide-react";

export default function AppointmentPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const serviceTypes = [
    { value: "consultation", label: "Free Consultation" },
    { value: "web-development", label: "Web Development" },
    { value: "saas-development", label: "SaaS Development" },
    { value: "mobile-app", label: "Mobile App Development" },
    { value: "other", label: "Other" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedDate) {
      newErrors.date = "Please select a date";
    }
    if (!selectedTime) {
      newErrors.time = "Please select a time";
    }
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
    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service type";
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
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: selectedDate?.toISOString(),
          time: selectedTime,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Track conversion
        trackConversion("schedule_appointment");
        // Reset form
        setSelectedDate(undefined);
        setSelectedTime("");
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          message: "",
        });
      } else {
        setError(data.error || "Failed to schedule appointment");
      }
    } catch {
      setError("Failed to schedule appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 pb-20 px-6">
      <AnimatedSection className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text"
        >
          Schedule an Appointment
        </motion.h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
          Book a free consultation with our team. Select a date and time that works for you.
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
              Appointment Scheduled!
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              We&apos;ve sent a confirmation email to {formData.email}. We&apos;ll see you on{" "}
              {selectedDate?.toLocaleDateString()} at{" "}
              {selectedTime && new Date(selectedTime).toLocaleTimeString()}.
            </p>
            <GradientButton
              variant="primary"
              onClick={() => {
                setSuccess(false);
                setSelectedDate(undefined);
                setSelectedTime("");
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  serviceType: "",
                  message: "",
                });
              }}
            >
              Schedule Another Appointment
            </GradientButton>
          </motion.div>
        </AnimatedSection>
      ) : (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Calendar Section */}
          <AnimatedSection delay={0.2}>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-[#00D9FF]" />
                <h2 className="text-2xl font-bold text-white">Select Date</h2>
              </div>
              <CalendarPicker
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
                minDate={new Date()}
              />
              {errors.date && (
                <p className="text-sm text-red-400 mt-2">{errors.date}</p>
              )}

              {selectedDate && (
                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-[#00D9FF]" />
                    <h2 className="text-2xl font-bold text-white">Select Time</h2>
                  </div>
                  <TimeSlotPicker
                    selectedDate={selectedDate}
                    onTimeSelect={setSelectedTime}
                    selectedTime={selectedTime}
                  />
                  {errors.time && (
                    <p className="text-sm text-red-400 mt-2">{errors.time}</p>
                  )}
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Form Section */}
          <AnimatedSection delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] border border-white/10"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Your Information
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

                <FormSelect
                  label="Service Type"
                  required
                  options={serviceTypes}
                  value={formData.serviceType}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceType: e.target.value })
                  }
                  error={errors.serviceType}
                  disabled={loading}
                />

                <FormTextarea
                  label="Message (Optional)"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your project or any specific questions..."
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
                      Scheduling...
                    </span>
                  ) : (
                    "Schedule Appointment"
                  )}
                </GradientButton>
              </form>
            </motion.div>
          </AnimatedSection>
        </div>
      )}
    </main>
  );
}
