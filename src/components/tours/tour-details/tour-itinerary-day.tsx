// components/tours/tour-detail/tour-itinerary-day.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Compass } from "lucide-react";

interface TourItineraryDayProps {
  day: {
    title: string;
    description: string;
    activities: string[];
  };
  index: number;
}

export function TourItineraryDay({ day, index }: TourItineraryDayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 pb-8"
    >
      {/* Timeline */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 to-secondary-500" />
      <div className={cn(
        "absolute left-0 top-2 w-2 h-2 rounded-full -translate-x-[calc(50%-0.5px)]",
        "bg-gradient-to-r from-primary-500 to-secondary-500",
        "ring-4 ring-primary-500/20"
      )} />

      <div className="relative">
        {/* Day Title */}
        <h3 className="text-xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Day {index + 1}: {day.title}
        </h3>
        
        {/* Description */}
        <p className="text-muted-foreground mb-6">
          {day.description}
        </p>

        {/* Activities */}
        <div className="space-y-3 pl-2">
          {day.activities.map((activity, actIndex) => (
            <motion.div 
              key={actIndex}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * actIndex }}
              className="flex items-center gap-3 text-muted-foreground group"
            >
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                "bg-primary-100 dark:bg-primary-900/50",
                "group-hover:bg-primary-500/20 transition-colors duration-300"
              )}>
                <Compass className="w-3 h-3 text-primary-500" />
              </div>
              <span className="group-hover:text-foreground transition-colors duration-300">
                {activity}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}