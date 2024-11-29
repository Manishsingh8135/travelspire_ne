// components/common/logo/logo.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center"
      >
        {/* Logo Image */}
        <div className="relative w-24 h-24">
          <Image
            src="/images/logo/Travelspire_ne_logo_new.png"  // You'll need to add this file to your public/images directory
            alt="Travelspire NE Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Logo Text */}
        {/* <span className={cn(
          "ml-2 text-2xl font-bold tracking-tight",
          "bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500",
          "dark:from-primary-400 dark:via-primary-500 dark:to-secondary-400",
          "bg-clip-text text-transparent"
        )}>
          Travelspire NE
        </span> */}
      </motion.div>
    </Link>
  );
}