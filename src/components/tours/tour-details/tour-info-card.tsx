// components/tours/tour-detail/tour-info-card.tsx
"use client";

import { Check, X, AlertCircle } from "lucide-react";
import { Tour, isRegularTour, isFestivalTour, isSpecialActivityTour } from "@/types/tours/tour";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/background-patterns";
import { motion } from "framer-motion";

interface TourInfoCardProps {
  tour: Tour;
  className?: string;
}

export function TourInfoCard({ tour, className }: TourInfoCardProps) {
  // Helper function to get the correct inclusions based on tour type
  const getInclusions = () => {
    if (isRegularTour(tour)) {
      return tour.inclusions;
    }
    if (isFestivalTour(tour) || isSpecialActivityTour(tour)) {
      return tour.baseInclusions;
    }
    return [];
  };

  // Helper function to get the correct exclusions based on tour type
  const getExclusions = () => {
    if (isRegularTour(tour)) {
      return tour.exclusions;
    }
    if (isFestivalTour(tour) || isSpecialActivityTour(tour)) {
      return tour.baseExclusions;
    }
    return [];
  };

  return (
    <div className={cn(
      "relative rounded-[2.5rem] overflow-hidden",
      "bg-gradient-to-tr from-primary-50 via-white to-secondary-50/30",
      "dark:from-accent-900/90 dark:via-accent-900/90 dark:to-accent-900/90",
      "border border-primary-100/20 dark:border-white/10",
      "shadow-glow dark:shadow-none",
      "backdrop-blur-xl",
      "p-6",
      className
    )}>
      {/* Background pattern */}
      <DotPattern className="opacity-30 dark:opacity-10" />

      <div className="relative space-y-8">
        {/* Inclusions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            Inclusions
          </h3>
          <div className="space-y-2">
            {getInclusions().map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-muted-foreground group"
              >
                <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-500" />
                </div>
                <span className="group-hover:text-foreground transition-colors duration-300">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Exclusions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            Exclusions
          </h3>
          <div className="space-y-2">
            {getExclusions().map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-muted-foreground group"
              >
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="w-3 h-3 text-red-500" />
                </div>
                <span className="group-hover:text-foreground transition-colors duration-300">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "p-4 rounded-xl",
            "bg-gradient-to-br from-yellow-500/10 to-yellow-500/5",
            "border border-yellow-500/20",
            "backdrop-blur-sm"
          )}
        >
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-yellow-500">Important Note</h4>
              <p className="text-sm text-muted-foreground">
                {tour.importantNote}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}