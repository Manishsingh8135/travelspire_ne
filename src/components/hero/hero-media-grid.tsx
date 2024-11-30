"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface MediaItemProps {
  src: string;
  alt?: string;
  className?: string;
  sizes?: 'small' | 'medium' | 'large';
  priority?: boolean;
  index: number;
}

const MediaItem = ({ 
  src, 
  alt = "", 
  className,
  sizes = "medium",
  priority = false,
  index
}: MediaItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 1,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={cn(
        "relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden",
        "border border-primary-100/20 dark:border-white/10",
        "bg-gradient-to-b from-white/90 via-white/90 to-white/90",
        "dark:from-accent-900/90 dark:via-accent-900/90 dark:to-accent-900/90",
        "shadow-2xl shadow-primary-500/10 dark:shadow-black/20",
        "backdrop-blur-xl",
        sizes === "small" && "aspect-square",
        sizes === "medium" && "aspect-[4/3]",
        sizes === "large" && "aspect-[16/9]",
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-primary/[0.1] dark:bg-dot-white/[0.1]" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />

      {/* Image */}
      <div className="absolute inset-0 group">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 scale-105 group-hover:scale-110"
        />
      </div>
    </motion.div>
  );
};

export function HeroMediaGrid({ items }: { items: Omit<MediaItemProps, "index">[] }) {
  console.log('Total items received:', items.length);
  console.log('Items:', items);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative grid grid-cols-2 gap-4 md:gap-6 lg:gap-8"
    >
      {/* Main large image */}
      <div className="col-span-2">
        <MediaItem {...items[0]} sizes="large" priority index={0} />
      </div>

      {/* Secondary images grid */}
      <div className="space-y-4 md:space-y-6 lg:space-y-8">
        <MediaItem {...items[1]} sizes="medium" index={1} />
        <MediaItem {...items[2]} sizes="small" index={2} />
      </div>

      <div className="space-y-4 md:space-y-6 lg:space-y-8">
        <MediaItem {...items[3]} sizes="small" index={3} />
        <MediaItem {...items[4]} sizes="medium" index={4} />
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-[10%] top-[5%] w-[20%] h-[20%] bg-primary-500/30 dark:bg-primary-400/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -left-[10%] bottom-[5%] w-[20%] h-[20%] bg-secondary-500/30 dark:bg-secondary-400/20 rounded-full blur-[120px] animate-pulse" />
    </motion.div>
  );
}