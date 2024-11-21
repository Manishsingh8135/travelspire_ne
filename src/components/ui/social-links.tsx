"use client";

import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export function SocialLink({ href, icon: Icon, label }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group relative p-4 rounded-xl isolate overflow-hidden",
        "bg-gradient-to-br from-primary-50/80 to-primary-100/80",
        "dark:from-accent-800/80 dark:to-accent-900/80",
        "hover:from-primary-500 hover:to-secondary-500",
        "text-primary-600 dark:text-white",
        "shadow-lg shadow-primary-500/10 dark:shadow-black/20",
        "transition-all duration-300"
      )}
    >
      {/* Subtle gradient border */}
      <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-white/50 to-white/10 dark:from-white/10 dark:to-white/5" />

      {/* Hover effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-400/20 blur-xl" />
      </div>

      {/* Icon */}
      <span className="relative z-10">
        <span className="sr-only">{label}</span>
        <Icon className={cn(
          "w-6 h-6 transition-transform duration-300",
          "group-hover:text-white group-hover:scale-110",
          "transform-gpu group-hover:rotate-6"
        )} />
      </span>
    </motion.a>
  );
}