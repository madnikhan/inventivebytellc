"use client";
import { motion } from "framer-motion";

interface BrandCardProps {
  title: string;
  description?: string;
  logoSrc?: string;
  badge?: React.ReactNode;
  onClick?: () => void;
}

export default function BrandCard({ title, description, logoSrc, badge, onClick }: BrandCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(176,182,190,0.18)', borderColor: '#b0b6be' }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer select-none bg-white/40 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md flex flex-col items-center text-center px-6 py-8 transition-all duration-200 hover:border-[#b0b6be]"
      onClick={onClick}
    >
      {badge && <div className="mb-2 w-full flex justify-center">{badge}</div>}
      {logoSrc ? (
        <motion.img
          src={logoSrc}
          alt={title + ' logo'}
          className="h-12 w-12 object-contain mb-3 drop-shadow-md rounded-full bg-white/80"
          whileHover={{ scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      ) : (
        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#b0b6be]/20 text-2xl font-bold text-[#b0b6be] mb-3 drop-shadow-md">
          {title.charAt(0)}
        </div>
      )}
      <div className="text-xl font-extrabold tracking-tight mb-1">{title}</div>
      {description && <div className="text-base text-gray-600 leading-relaxed font-medium">{description}</div>}
    </motion.div>
  );
} 