// components/tours/tour-showcase/special-activity-card.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, MapPin, Calendar, Bike } from "lucide-react";
import { SpecialActivityTour } from "@/types/tours/tour";

interface ActivityTourCardProps {
  tour: SpecialActivityTour;
  index: number;
}

export function ActivityTourCard({ tour, index }: ActivityTourCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const basePrice = Math.min(...tour.variants.map(v => v.price));

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
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
        {/* Activity Type Badge */}
        <div className="absolute top-6 left-6">
          <span className={cn(
            "px-4 py-2 rounded-full",
            "bg-gradient-primary text-white text-sm font-medium",
            "border border-white/10 backdrop-blur-sm",
            "flex items-center gap-2"
          )}>
            {tour.type === 'BikeTrip' ? <Bike className="w-4 h-4" /> : null}
            {tour.activityType}
          </span>
        </div>

        <div className="relative space-y-4">
          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(tour.eventDates.start).toLocaleDateString('en-US', { 
                month: 'short',
                day: 'numeric'
              })} - {new Date(tour.eventDates.end).toLocaleDateString('en-US', { 
                month: 'short',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{tour.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{tour.variants[0].duration.days} Days / {tour.variants[0].duration.nights} Nights</span>
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
              <div className="text-2xl font-bold text-white">₹{basePrice.toLocaleString()}</div>
            </div>
            
            <Link 
              href={`/tours/${tour.slug}`}
              className={cn(
                "group/btn flex items-center gap-2 px-6 py-3 rounded-xl",
                "bg-white/10 backdrop-blur-md",
                "hover:bg-white/20 transition-colors duration-300",
                "text-white font-medium"
              )}
            >
              View Details
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}