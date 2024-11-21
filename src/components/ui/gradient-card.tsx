"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DotPattern, GlowEffect } from "./background-patterns";

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  glowClassName?: string;
  interactive?: boolean;
}

export function GradientCard({ 
  children, 
  className,
  glowClassName,
  interactive = false
}: GradientCardProps) {
  const MotionWrapper = interactive ? motion.div : "div";
  
  return (
    <MotionWrapper
      initial={interactive ? { opacity: 0, y: 20 } : undefined}
      whileInView={interactive ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      whileHover={interactive ? { scale: 1.02, y: -5 } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden isolate",
        "border border-primary-100/20 dark:border-white/10",
        "bg-gradient-to-b from-white/80 via-primary-50/50 to-white/80",
        "dark:from-accent-900/90 dark:via-accent-900/90 dark:to-accent-900/90",
        "shadow-2xl shadow-primary-500/10 dark:shadow-black/20",
        "backdrop-blur-xl",
        className
      )}
    >
      {/* Background pattern */}
      <DotPattern className="opacity-50" />
      
      {/* Gradient glow effects */}
      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-b from-transparent via-primary-500/5 to-primary-500/10",
        "dark:from-transparent dark:via-primary-400/5 dark:to-primary-400/10",
        glowClassName
      )} />
      
      {/* Hover glow effects for interactive cards */}
      {interactive && (
        <>
          <div className="absolute -top-px left-20 right-20 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -bottom-px left-20 right-20 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </>
      )}
      
      {/* Gradient beams */}
      <GlowEffect 
        color="primary"
        className="-top-40 -right-40"
      />
      <GlowEffect 
        color="secondary"
        className="-bottom-40 -left-40"
      />
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </MotionWrapper>
  );
}