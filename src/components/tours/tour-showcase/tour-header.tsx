// components/tours/tour-showcase/tour-header.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TourShowcaseHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function TourShowcaseHeader({ 
  title, 
  subtitle,
  className 
}: TourShowcaseHeaderProps) {
  return (
    <div className={cn("text-center space-y-6 mb-20", className)}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="heading-1"
      >
        <span className="block text-gradient-primary dark:bg-gradient-to-r dark:from-white dark:via-white dark:to-white/70 dark:bg-clip-text dark:text-transparent">
          {title}
        </span>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}