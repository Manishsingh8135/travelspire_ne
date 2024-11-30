// components/tours/tour-showcase/tour-card.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, MapPin, Calendar } from "lucide-react";
import { Tour, isRegularTour, isFestivalTour, isSpecialActivityTour } from "@/types/tours/tour";
import { DotPattern } from "@/components/ui/background-patterns";

interface TourCardProps {
  tour: Tour;
  index: number;
}

export function TourCard({ tour, index }: TourCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Helper functions to get the correct display values based on tour type
  const getDuration = () => {
    if (isRegularTour(tour)) {
      return tour.duration;
    }
    if (isFestivalTour(tour) || isSpecialActivityTour(tour)) {
      const shortestVariant = tour.variants.reduce((prev, curr) => 
        prev.duration.days < curr.duration.days ? prev : curr
      );
      return `${shortestVariant.duration.days} Days`;
    }
    return "Multiple Options";
  };

  const getStartDate = () => {
    if (isRegularTour(tour)) {
      return tour.startDate;
    }
    if (isFestivalTour(tour) || isSpecialActivityTour(tour)) {
      return new Date(tour.eventDates.start).toLocaleDateString('en-US', { 
        month: 'short',
        day: 'numeric'
      });
    }
    return "";
  };

  const getPrice = () => {
    if (isRegularTour(tour)) {
      return tour.price;
    }
    if (isFestivalTour(tour) || isSpecialActivityTour(tour)) {
      return Math.min(...tour.variants.map(v => v.price));
    }
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden",
        "border border-primary-200/50 dark:border-white/10",
        "h-[30rem]",
        "bg-gradient-to-b from-white/80 to-primary-50/50",
        "dark:from-black dark:to-accent-900",
        "hover:shadow-glow dark:hover:shadow-none",
        tour.featured && "md:col-span-2"
      )}
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 transition-transform duration-1000">
        <Image
          src={tour.thumbnail}
          alt={tour.title}
          fill
          className={cn(
            "object-cover transition-transform duration-1000",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

        {/* Dot Pattern Overlay */}
        <DotPattern className="opacity-20" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
        {tour.featured && (
          <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-gradient-primary text-white text-sm font-medium">
            Featured Tour
          </div>
        )}

        <div className="relative space-y-4">
          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{getDuration()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{tour.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{getStartDate()}</span>
            </div>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {tour.title}
            </h3>
            <p className="text-white/80">
              {tour.subtitle}
            </p>
          </div>

          {/* Price & CTA */}
          <div className="flex items-end justify-between">
            <div>
              <div className="text-sm text-white/60">Starting from</div>
              <div className="text-2xl font-bold text-white">₹{getPrice().toLocaleString()}</div>
            </div>

            <Link
              href={`/tours/${tour.slug}`}
              className={cn(
                "group/btn relative inline-flex items-center justify-center gap-2",
                // Mobile baseline
                "px-4 py-2 rounded-lg",
                "text-sm",
                // Desktop scaling
                "md:px-8 md:py-4 md:rounded-full",
                "md:text-xl",
                // Consistent styling
                "bg-gradient-to-r from-primary-500 to-secondary-500",
                "hover:from-primary-400 hover:to-secondary-400",
                "text-white font-medium",
                "shadow-xl shadow-primary-500/25 dark:shadow-primary-500/10",
                "transition-all duration-300"
              )}
            >
              View Details
              <ArrowUpRight className="w-3 h-3 md:w-5 md:h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}