"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight, MessageCircle } from "lucide-react";
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
        {/* Ziro Festival Premium Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center lg:justify-start mb-6"
        >
          <div className="relative group">
            {/* Outer glow */}
            <motion.div
              className="absolute -inset-3 bg-gradient-to-r from-amber-400/30 via-orange-500/30 to-red-500/30 rounded-[2.5rem] blur-xl"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Main badge */}
            <Link href="/ziro-music-festival-2025">
              <motion.div
                className="relative px-6 py-3 bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-red-500/15 backdrop-blur-xl border border-amber-400/30 rounded-[2rem] shadow-2xl cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3">
                  {/* Animated music icon */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="w-5 h-5 text-amber-400"
                  >
                    🎵
                  </motion.div>
                  
                  {/* Badge text */}
                  <span className="text-sm font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                    ZIRO FESTIVAL 2025
                  </span>
                  
                  {/* Pulsing dot */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                  />
                  
                  {/* Live badge */}
                  <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full animate-pulse">
                    LIVE
                  </span>
                </div>
              </motion.div>
            </Link>
              
              {/* Floating sparkles */}
              <motion.div
                className="absolute -top-1 -right-1 text-amber-400 text-xs"
                animate={{ 
                  y: [0, -3, 0],
                  rotate: [0, 15, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                ✨
              </motion.div>
              
              <motion.div
                className="absolute -bottom-1 -left-1 text-orange-400 text-xs"
                animate={{ 
                  y: [0, 3, 0],
                  rotate: [0, -15, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                ✨
              </motion.div>
            </div>
          </motion.div>

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
          <p className="text-lg sm:text-xl md:text-left text-muted-foreground dark:text-neutral-300 max-w-full sm:max-w-xl pl-0 sm:pl-8 text-center lg:text-left">
            {description}
          </p>
        </div>

        <div className="flex flex-row gap-2 sm:gap-3 justify-center lg:justify-start">
          {/* Primary CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link 
              href={cta.href}
              className={cn(
                "group relative inline-flex items-center gap-1 sm:gap-2",
                "px-3 sm:px-5 lg:px-6",
                "py-2.5 sm:py-2.5 lg:py-3",
                "rounded-full",
                "text-sm sm:text-base lg:text-lg font-medium",
                "bg-gradient-to-r from-primary-500 to-secondary-500",
                "hover:from-primary-400 hover:to-secondary-400",
                "text-white",
                "shadow-xl shadow-primary-500/25 dark:shadow-primary-500/10",
                "transition-all duration-300"
              )}
            >
              <span className="hidden sm:inline">{cta.text}</span>
              <span className="sm:hidden">Start Journey</span>
              <ArrowUpRight className="w-4 h-4 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
          
          {/* Ziro Festival WhatsApp Booking Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link 
              href="https://wa.me/c/919864141211?text=Hi! I'm interested in booking Ziro Music Festival 2025 packages. Can you share the details?"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative inline-flex items-center gap-1 sm:gap-2",
                "px-3 sm:px-5 lg:px-6",
                "py-2.5 sm:py-2.5 lg:py-3",
                "rounded-full",
                "text-sm sm:text-base lg:text-lg font-medium",
                "bg-gradient-to-r from-green-600 to-green-700",
                "hover:from-green-500 hover:to-green-600",
                "text-white",
                "shadow-xl shadow-green-500/25",
                "transition-all duration-300",
                "border border-green-500/30"
              )}
            >
              <span className="hidden sm:inline">🎵 Book Ziro Festival</span>
              <span className="sm:hidden">Ziro Music Festival</span>
              <MessageCircle className="w-4 h-4 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
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