"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormTextareaProps
  extends React.ComponentProps<typeof Textarea> {
  label?: string;
  error?: string;
  required?: boolean;
}

export default function FormTextarea({
  label,
  error,
  required,
  className,
  ...props
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-[#00D9FF] ml-1">*</span>}
        </label>
      )}
      <Textarea
        className={cn(
          "bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-[#00D9FF] focus:ring-[#00D9FF]",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
