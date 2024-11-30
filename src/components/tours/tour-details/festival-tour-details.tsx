// components/tours/tour-detail/festival-tour-detail.tsx
"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Clock, MapPin, Calendar, Check,
  BadgeIndianRupee, PartyPopper, Users
} from "lucide-react";
import { FestivalTour } from "@/types/tours/tour";
import { DotPattern, GlowEffect } from "@/components/ui/background-patterns";
import { TourSection } from "./tour-section";
import { TourGallery } from "./tour-gallery";
import { FestivalPackageCard } from "./festival-package-card";
import { FestivalInfoCard } from "./festival-info-card";

interface FestivalTourDetailProps {
  tour: FestivalTour;
  className?: string;
}

export function FestivalTourDetail({ tour, className }: FestivalTourDetailProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const basePrice = Math.min(...tour.variants.map(v => v.price));

  return (
    <div className={cn("relative min-h-screen", className)}>
      {/* Hero Section with Parallax - Similar to regular tour detail */}
      <motion.div
        style={{ opacity, scale }}
        className="relative h-[80vh] w-full"
      >
        {/* Hero Image */}
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
        
        <DotPattern className="opacity-20" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent">
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Festival Badge */}
              <span className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                "bg-gradient-primary",
                "text-white text-sm font-medium"
              )}>
                <PartyPopper className="w-4 h-4" />
                {tour.festivalName}
              </span>

              <h1 className="heading-1 text-gradient-primary dark:text-white">
                {tour.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(tour.eventDates.start).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })} - {new Date(tour.eventDates.end).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeIndianRupee className="w-5 h-5" />
                  <span>From ₹{basePrice.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Similar structure to regular tour detail */}
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50 via-white to-primary-50 dark:from-black dark:via-accent-900 dark:to-black" />
          <DotPattern className="opacity-30 dark:opacity-10" />
        </div>

        <GlowEffect
          color="primary"
          size="lg"
          opacity="medium"
          className="absolute -right-[40%] top-0"
        />
        <GlowEffect
          color="secondary"
          size="lg"
          opacity="medium"
          className="absolute -left-[40%] bottom-0"
        />

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <TourSection title="Overview">
                <p className="text-lg text-muted-foreground">
                  {tour.overview}
                </p>
              </TourSection>

              {/* Festival Highlights */}
              <TourSection title="Festival Highlights">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tour.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-1 w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary-500" />
                      </div>
                      <span className="text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </TourSection>

              {/* Available Packages */}
              <TourSection title="Available Packages">
                <div className="space-y-6">
                  {tour.variants.map((variant, index) => (
                    <FestivalPackageCard
                      key={variant.id}
                      variant={variant}
                      index={index}
                    />
                  ))}
                </div>
              </TourSection>

              {/* Gallery */}
              <TourSection title="Gallery">
                <TourGallery images={tour.gallery} />
              </TourSection>
            </div>

            {/* Right Column */}
            <div className="lg:sticky lg:top-8 space-y-8 h-fit">
              <FestivalInfoCard tour={tour} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}