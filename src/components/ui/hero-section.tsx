// components/ui/hero-section.tsx
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { DotPattern } from "./background-patterns";

interface HeroSectionProps {
  image: string;
  imageAlt: string;
  overlayOpacity?: string;
  className?: string;
  children?: React.ReactNode;
  withParallax?: boolean;
}

export function HeroSection({
  image,
  imageAlt,
  overlayOpacity = "60",
  className,
  children,
  withParallax = true,
}: HeroSectionProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const Content = () => (
    <div className="relative h-[80vh] w-full">
      {/* Hero Image */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b",
        `from-black/${overlayOpacity} via-black/${overlayOpacity} to-black/${overlayOpacity}`
      )} />

      {/* Background Pattern */}
      <DotPattern className="opacity-20" />

      {/* Content Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent">
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );

  if (!withParallax) {
    return (
      <div className={cn("relative", className)}>
        <Content />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <motion.div style={{ opacity, scale }}>
        <Content />
      </motion.div>
    </div>
  );
}
