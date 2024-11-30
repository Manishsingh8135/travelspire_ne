// components/ui/animated-button.tsx
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    // Base styles
    "relative inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-md text-sm font-medium",
    "transition-all duration-300 ease-out",
    
    // Focus styles
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-primary-500 focus-visible:ring-offset-2",
    
    // Disabled styles
    "disabled:pointer-events-none disabled:opacity-50",
    
    // Icon styles
    "[&_svg]:size-4 [&_svg]:shrink-0",
    "[&_svg]:transition-transform [&_svg]:duration-300",
    "group", // For hover effects on children
  ],
  {
    variants: {
      variant: {
        // Primary button with gradient
        default: [
          "bg-gradient-to-r from-primary-500 to-secondary-500",
          "text-white shadow-lg shadow-primary-500/25",
          "hover:shadow-xl hover:shadow-primary-500/30",
          "hover:scale-[1.02] active:scale-[0.98]",
          "[&_svg]:group-hover:translate-x-0.5",
        ],
        
        // Secondary button
        secondary: [
          "bg-secondary text-secondary-foreground",
          "shadow-sm hover:bg-secondary/80",
          "hover:shadow-md hover:scale-[1.02]",
          "active:scale-[0.98]",
        ],
        
        // Outline button with hover gradient
        outline: [
          "border-2 border-primary-500/20",
          "bg-background/80 backdrop-blur-sm",
          "text-primary-600 dark:text-primary-400",
          "hover:border-transparent",
          "hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500",
          "hover:text-white hover:shadow-lg hover:shadow-primary-500/25",
          "hover:scale-[1.02] active:scale-[0.98]",
        ],
        
        // Ghost button
        ghost: [
          "text-primary-600 dark:text-primary-400",
          "hover:bg-primary-50 dark:hover:bg-primary-950",
          "hover:text-primary-600 dark:hover:text-primary-300",
          "[&_svg]:group-hover:translate-x-0.5",
        ],
        
        // Link style
        link: [
          "text-primary-600 dark:text-primary-400",
          "underline-offset-4 hover:underline",
          "[&_svg]:group-hover:translate-x-1",
        ],
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 py-1 text-xs",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : motion.button;

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        whileHover={{ scale: variant === "link" ? 1 : 1.02 }}
        whileTap={{ scale: variant === "link" ? 0.98 : 0.98 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        {...props}
      />
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton, buttonVariants };
