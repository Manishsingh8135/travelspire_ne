"use client";

import { motion } from "framer-motion";

interface FestivalSectionHeaderProps {
  badge?: {
    emoji: string;
    text: string;
  };
  title: string;
  description: string;
  titleGradient?: string;
  badgeGradient?: string;
}

export function FestivalSectionHeader({
  badge,
  title,
  description,
  titleGradient = "from-amber-400 via-orange-500 to-red-500",
  badgeGradient = "from-amber-500/20 to-orange-500/20"
}: FestivalSectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
          className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${badgeGradient} backdrop-blur-xl border border-amber-400/30 rounded-[2rem] mb-8`}
        >
          <span className="text-2xl">{badge.emoji}</span>
          <span className="text-sm font-semibold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            {badge.text}
          </span>
        </motion.div>
      )}

      <h2 className="text-5xl md:text-7xl font-bold mb-8">
        <span className={`bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent drop-shadow-2xl`}>
          {title}
        </span>
      </h2>
      
      <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
