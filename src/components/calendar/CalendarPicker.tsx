"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarPickerProps {
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
  minDate?: Date;
  maxDate?: Date;
}

export default function CalendarPicker({
  onDateSelect,
  selectedDate,
  minDate,
  maxDate,
}: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Fetch available dates for the current month view
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    fetch(
      `/api/calendar/availability?startDate=${startOfMonth.toISOString()}&endDate=${endOfMonth.toISOString()}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.slots) {
          const dates = new Set<string>(
            data.slots.map((slot: { start: string }) =>
              new Date(slot.start).toDateString()
            )
          );
          setAvailableDates(dates);
        }
      })
      .catch((error) => {
        console.error("Error fetching available dates:", error);
      });
  }, [currentMonth]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const isDateAvailable = (day: number | null): boolean => {
    if (day === null) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return availableDates.has(date.toDateString());
  };

  const isDateDisabled = (day: number | null): boolean => {
    if (day === null) return true;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const handleDateClick = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onDateSelect(date);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const days = getDaysInMonth();

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <h3 className="text-xl font-bold text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isAvailable = isDateAvailable(day);
          const isDisabled = isDateDisabled(day);
          const isSelected =
            day !== null &&
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth.getMonth() &&
            selectedDate.getFullYear() === currentMonth.getFullYear();

          return (
            <button
              key={index}
              onClick={() => day !== null && !isDisabled && handleDateClick(day)}
              disabled={isDisabled || !isAvailable}
              className={`
                aspect-square p-2 rounded-lg text-sm font-medium transition-all
                ${
                  isSelected
                    ? "bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-black"
                    : isAvailable && !isDisabled
                    ? "bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
