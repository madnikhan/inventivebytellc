"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeSlot {
  start: string;
  end: string;
}

interface TimeSlotPickerProps {
  selectedDate: Date;
  onTimeSelect: (time: string) => void;
  selectedTime?: string;
}

export default function TimeSlotPicker({
  selectedDate,
  onTimeSelect,
  selectedTime,
}: TimeSlotPickerProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedDate) return;

    setLoading(true);
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    fetch(
      `/api/calendar/availability?startDate=${startOfDay.toISOString()}&endDate=${endOfDay.toISOString()}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.slots) {
          setSlots(data.slots);
        }
      })
      .catch((error) => {
        console.error("Error fetching time slots:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedDate]);

  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#00D9FF]"></div>
        <p className="text-gray-400 mt-4">Loading available times...</p>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No available time slots for this date.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-white mb-4">
        Select a Time
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {slots.map((slot, index) => {
          const time = formatTime(slot.start);
          const isSelected = selectedTime === slot.start;

          return (
            <motion.button
              key={index}
              onClick={() => onTimeSelect(slot.start)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-4 py-3 rounded-lg font-medium transition-all
                ${
                  isSelected
                    ? "bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-black"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }
              `}
            >
              {time}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
