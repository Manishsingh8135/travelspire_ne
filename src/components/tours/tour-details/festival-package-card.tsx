// components/tours/tour-detail/festival-package-card.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Clock, Users } from "lucide-react";
import { TourPackageVariant } from "@/types/tours/tour";
import { contactInfo } from "@/data/social/social-links";

interface FestivalPackageCardProps {
  variant: TourPackageVariant;
  index: number;
}

export function FestivalPackageCard({ variant, index }: FestivalPackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "rounded-[2rem] overflow-hidden",
        "bg-gradient-to-tr from-primary-50 via-white to-secondary-50/30",
        "dark:from-accent-900/90 dark:via-accent-900/90 dark:to-accent-900/90",
        "border border-primary-100/20 dark:border-white/10",
        "shadow-glow dark:shadow-none",
        "backdrop-blur-xl",
        "p-6"
      )}
    >
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        {/* Package Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {variant.name}
            </h3>
            {variant.description && (
              <p className="text-muted-foreground">
                {variant.description}
              </p>
            )}
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{variant.duration.days} Days / {variant.duration.nights} Nights</span>
            </div>
            {variant.maxGroupSize && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Max {variant.maxGroupSize} people</span>
              </div>
            )}
          </div>

          {/* Inclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {variant.inclusions.map((inclusion, idx) => (
              <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-4 h-4 text-primary-500" />
                <span>{inclusion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price and Booking */}
        <div className="flex flex-col justify-between items-center md:items-end gap-4 md:min-w-[200px]">
          <div className="text-center md:text-right">
            <div className="text-sm text-muted-foreground">Price per person</div>
            <div className="text-3xl font-bold text-foreground">₹{variant.price.toLocaleString()}</div>
          </div>

          <button 
            onClick={() => window.open(contactInfo.whatsapp, '_blank')}
            className={cn(
              "px-6 py-3 rounded-xl",
              "bg-gradient-primary hover:bg-gradient-secondary",
              "text-white font-medium",
              "shadow-glow-sm dark:shadow-none",
              "transition-all duration-300",
              "w-full md:w-auto text-center"
            )}
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}