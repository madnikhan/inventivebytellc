"use client";

import { cn } from "@/lib/utils";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export default function FormSelect({
  label,
  error,
  required,
  options,
  className,
  ...props
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-[#00D9FF] ml-1">*</span>}
        </label>
      )}
      <select
        className={cn(
          "w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-[#00D9FF] focus:ring-2 focus:ring-[#00D9FF] transition-colors",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      >
        <option value="" className="bg-[#0f0f1a]">
          Select an option...
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-[#0f0f1a]"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
