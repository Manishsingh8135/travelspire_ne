// components/ui/gradient-badge.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    // Base styles
    "inline-flex items-center justify-center gap-1.5",
    "rounded-full px-3 py-1 text-sm font-medium",
    "transition-all duration-300",
    
    // Icon styles
    "[&_svg]:size-4 [&_svg]:shrink-0",
    
    // Animation setup
    "group relative isolate overflow-hidden",
  ],
  {
    variants: {
      variant: {
        // Default gradient badge
        default: [
          // Background and text
          "bg-gradient-to-r from-primary-500 to-secondary-500",
          "text-white",
          // Hover effects
          "hover:shadow-md hover:shadow-primary-500/20",
          "hover:scale-[1.02]",
          // Border
          "ring-1 ring-white/10",
        ],
        
        // Outline badge with hover gradient
        outline: [
          // Base style
          "border border-primary-200 dark:border-primary-800",
          "bg-white/50 dark:bg-black/50",
          "text-primary-700 dark:text-primary-300",
          "backdrop-blur-sm",
          // Hover gradient
          "hover:border-transparent",
          "hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500",
          "hover:text-white",
          "hover:shadow-md hover:shadow-primary-500/20",
          "hover:scale-[1.02]",
        ],
        
        // Subtle badge
        subtle: [
          // Base style
          "bg-primary-50 dark:bg-primary-950",
          "text-primary-700 dark:text-primary-300",
          // Hover effect
          "hover:bg-primary-100 dark:hover:bg-primary-900",
          "hover:scale-[1.02]",
        ],
        
        // Secondary badge
        secondary: [
          // Background and text
          "bg-gradient-to-r from-secondary-500 to-primary-500",
          "text-white",
          // Hover effects
          "hover:shadow-md hover:shadow-secondary-500/20",
          "hover:scale-[1.02]",
          // Border
          "ring-1 ring-white/10",
        ],
      },
      size: {
        default: "h-6 text-xs",
        sm: "h-5 text-[0.6875rem]",
        lg: "h-7 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface GradientBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function GradientBadge({
  className,
  variant,
  size,
  children,
  icon,
  ...props
}: GradientBadgeProps) {
  return (
    <motion.div
      className={cn(badgeVariants({ variant, size, className }))}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      {...props}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      {/* Icon */}
      {icon && (
        <span className="relative">
          {icon}
        </span>
      )}
      
      {/* Content */}
      <span className="relative">
        {children}
      </span>
    </motion.div>
  );
}

export { GradientBadge, badgeVariants };
