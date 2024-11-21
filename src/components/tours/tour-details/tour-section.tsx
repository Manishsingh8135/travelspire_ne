// components/tours/tour-detail/tour-section.tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TourSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function TourSection({ title, children, className }: TourSectionProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("space-y-6", className)}
    >
      <h2 className="heading-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}