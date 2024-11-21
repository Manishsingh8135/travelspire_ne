"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface SplitHeroProps {
  children: React.ReactNode;
  className?: string;
}

export function SplitHero({ children, className }: SplitHeroProps) {
  return (
    <section className={cn(
      "relative w-full overflow-hidden min-h-[calc(100vh-var(--navbar-height,0px))]",
      "dark:bg-gradient-to-b dark:from-accent-950 dark:via-accent-900 dark:to-accent-950",
      "bg-gradient-to-b from-primary-50 via-white to-primary-50",
      className
    )}>
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-primary/[0.1] dark:bg-dot-white/[0.1]">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/50 to-transparent dark:from-accent-950 dark:to-transparent" />
      </div>

      {/* Gradient beams */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 dark:bg-primary-400/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/20 dark:bg-secondary-400/10 rounded-full blur-[100px] animate-pulse" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {children}
        </div>
      </div>
    </section>
  );
}

export function HeroContent({
  title,
  highlightedTitle,
  description,
  cta,
  className
}: {
  title: string;
  highlightedTitle: string;
  description: string;
  cta: { text: string; href: string; };
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 sm:space-y-8"
      >
        <h1 className="heading-2 text-center lg:text-left">
          <span className="block text-foreground dark:text-white">
            {title}
          </span>
          <span className="block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 dark:from-primary-400 dark:via-primary-500 dark:to-secondary-400 bg-clip-text text-transparent">
            {highlightedTitle}
          </span>
        </h1>
        
        <div className="relative">
          <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-primary-500 to-secondary-500 hidden sm:block" />
          <p className="text-lg sm:text-xl text-center md:text-left text-muted-foreground dark:text-neutral-300 max-w-full sm:max-w-xl pl-0 sm:pl-8 text-center lg:text-left">
            {description}
          </p>
        </div>

        <div className="flex justify-center lg:justify-start">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link 
              href={cta.href}
              className={cn(
                "group relative inline-flex items-center gap-2",
                "px-4 sm:px-6 lg:px-8",
                "py-2 sm:py-3 lg:py-4",
                "rounded-full",
                "text-lg sm:text-xl font-medium",
                "bg-gradient-to-r from-primary-500 to-secondary-500",
                "hover:from-primary-400 hover:to-secondary-400",
                "text-white",
                "shadow-xl shadow-primary-500/25 dark:shadow-primary-500/10",
                "transition-all duration-300"
              )}
            >
              {cta.text}
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function HeroStats({ stats }: { stats: { value: string; label: string; }[] }) {
  return (
    <div className="mt-16 grid grid-cols-2 gap-8 pl-0 md:pl-8 text-center md:text-left">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 0.2 + index * 0.1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="relative animate-smooth-fade-in"
        >
          {/* Gradient line with proper positioning */}
          <div 
            className={cn(
              "absolute -top-2 h-1 w-12",
              "left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0",
              "gradient-primary" // Using your custom gradient utility
            )} 
          />
          
          <div className="pt-4">
            <div className={cn(
              "text-2xl font-bold", // Using your font size vars
              "bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent",
              "dark:from-white dark:to-white/90"
            )}>
              {stat.value}
            </div>
            <div className="text-muted-foreground text-base">
              {stat.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function HeroDecorator({ className }: { className?: string }) {
  return (
    <div className={cn(
      "absolute inset-y-0 w-px",
      "bg-gradient-to-b from-transparent via-primary-200 to-transparent",
      "dark:via-accent-800",
      className
    )} />
  );
}