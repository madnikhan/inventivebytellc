"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 
  'onDrag' | 'onDragStart' | 'onDragEnd' | 
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  children: ReactNode;
  variant?: "primary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function GradientButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: GradientButtonProps) {
  const baseClasses = "font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-black hover:shadow-[0_0_30px_rgba(0,217,255,0.5)]",
    accent: "bg-gradient-to-r from-[#B026FF] to-[#FF0066] text-white hover:shadow-[0_0_30px_rgba(176,38,255,0.5)]",
    outline: "border-2 border-[#00D9FF] text-[#00D9FF] bg-transparent hover:bg-[#00D9FF]/10"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant !== "outline" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  );
}
