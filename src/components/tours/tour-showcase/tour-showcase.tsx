// components/tours/tour-showcase/tour-showcase.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { DotPattern, GlowEffect } from "@/components/ui/background-patterns";

interface TourShowcaseProps {
  children: React.ReactNode;
  className?: string;
}

export function TourShowcase({ children, className }: TourShowcaseProps) {
  return (
    <section className={cn(
      "relative w-full overflow-hidden py-20 md:py-32",
      "bg-gradient-to-b from-primary-50 via-white to-primary-50",
      "dark:from-black dark:via-accent-900 dark:to-black",
      className
    )}>
      {/* Background pattern */}
      <DotPattern className="opacity-30 dark:opacity-10" />
      
      {/* Gradient beams */}
      <GlowEffect 
        color="primary"
        size="lg"
        className="-top-40 -right-40"
      />
      <GlowEffect 
        color="secondary"
        size="lg"
        className="-bottom-40 -left-40"
      />
      
      <div className="relative max-w-7xl mx-auto px-4">
        {children}
      </div>
    </section>
  );
}