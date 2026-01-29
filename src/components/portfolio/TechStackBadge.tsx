"use client";

import { motion } from "framer-motion";

interface TechStackBadgeProps {
  tech: string;
  index?: number;
}

export default function TechStackBadge({ tech, index = 0 }: TechStackBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#00D9FF]/20 to-[#0066FF]/20 text-[#00D9FF] border border-[#00D9FF]/30 backdrop-blur-sm"
    >
      {tech}
    </motion.span>
  );
}
