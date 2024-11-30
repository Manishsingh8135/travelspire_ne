// components/tours/tour-detail/tour-detail.tsx
"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Clock, MapPin, Calendar, Check,
  BadgeIndianRupee, Mountain
} from "lucide-react";
import { Tour, isRegularTour, isFestivalTour, isSpecialActivityTour } from "@/types/tours/tour";
import { DotPattern, GlowEffect } from "@/components/ui/background-patterns";
import { TourSection } from "./tour-section";
import { TourItineraryDay } from "./tour-itinerary-day";
import { TourBookingCard } from "./tour-booking-card";
import { TourInfoCard } from "./tour-info-card";
import { TourGallery } from "./tour-gallery";

interface TourDetailProps {
  tour: Tour;
  className?: string;
}

export function TourDetail({ tour, className }: TourDetailProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Helper functions to get the correct display values based on tour type
  const getDuration = () => {
    if (isRegularTour(tour)) {
      return tour.duration;
    }
    if (isFestivalTour(tour) || isSpecialActivityTour(tour)) {
      const shortestVariant = tour.variants.reduce((prev, curr) => 
        prev.duration.days < curr.duration.days ? prev : curr
      );
      return `${shortestVariant.duration.days} Days / ${shortestVariant.duration.nights} Nights`;
    }
    return "Multiple Options";
  };

  const getStartDate = () => {
    if (isRegularTour(tour)) {
      return tour.startDate;
    }
    if (isFestivalTour(tour) || isSpecialActivityTour(tour)) {
      return new Date(tour.eventDates.start).toLocaleDateString('en-US', { 
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }
    return "";
  };

  const getPrice = () => {
    if (isRegularTour(tour)) {
      return `₹${tour.price.toLocaleString()} per person`;
    }
    if (isFestivalTour(tour) || isSpecialActivityTour(tour)) {
      const basePrice = Math.min(...tour.variants.map(v => v.price));
      return `Starting from ₹${basePrice.toLocaleString()}`;
    }
    return "";
  };

  return (
    <div className={cn("relative min-h-screen", className)}>
      {/* Hero Section with Parallax */}
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

        {/* Background Pattern */}
        <DotPattern className="opacity-20" />

        {/* Hero Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent">
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Tour Type Badge */}
              <span className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                "bg-gradient-primary",
                "text-white text-sm font-medium"
              )}>
                <Mountain className="w-4 h-4" />
                {isRegularTour(tour) ? tour.type : (isFestivalTour(tour) ? 'Festival' : tour.activityType)}
              </span>

              <h1 className="heading-1 text-gradient-primary dark:text-white">
                {tour.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{getDuration()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{getStartDate()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeIndianRupee className="w-5 h-5" />
                  <span>{getPrice()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50 via-white to-primary-50 dark:from-black dark:via-accent-900 dark:to-black" />
          <DotPattern className="opacity-30 dark:opacity-10" />
        </div>

        {/* Gradient Glows */}
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
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <TourSection title="Overview">
                <p className="text-lg text-muted-foreground">
                  {tour.overview}
                </p>
              </TourSection>

              {/* Itinerary */}
              {isRegularTour(tour) && (
                <TourSection title="Itinerary">
                  <div className="space-y-8">
                    {tour.itinerary.map((day, index) => (
                      <TourItineraryDay
                        key={index}
                        day={day}
                        index={index}
                      />
                    ))}
                  </div>
                </TourSection>
              )}

              {/* Package Variants for Festival/Special Activity Tours */}
              {(isFestivalTour(tour) || isSpecialActivityTour(tour)) && (
                <TourSection title="Available Packages">
                  <div className="space-y-8">
                    {tour.variants.map((variant, index) => (
                      <div key={index} className="space-y-4">
                        <h3 className="text-xl font-semibold">{variant.name}</h3>
                        {variant.description && (
                          <p className="text-muted-foreground">{variant.description}</p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary-500" />
                            <span>{variant.duration.days} Days / {variant.duration.nights} Nights</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BadgeIndianRupee className="w-5 h-5 text-primary-500" />
                            <span>₹{variant.price.toLocaleString()}</span>
                          </div>
                        </div>
                        {variant.inclusions && variant.inclusions.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Package Inclusions:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {variant.inclusions.map((inclusion, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 mt-1 text-primary-500" />
                                  <span className="text-muted-foreground">{inclusion}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TourSection>
              )}

              {/* Highlights */}
              <TourSection title="Tour Highlights">
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

              {/* Gallery */}
              <TourSection title="Gallery">
                <TourGallery images={tour.gallery}/>
              </TourSection>

              {/* Additional Information */}
              <TourSection title="Important Information">
                <div className="space-y-8">
                  {/* Base Inclusions */}
                  {((isFestivalTour(tour) || isSpecialActivityTour(tour)) ? tour.baseInclusions : tour.inclusions)?.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Inclusions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {((isFestivalTour(tour) || isSpecialActivityTour(tour)) ? tour.baseInclusions : tour.inclusions).map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 mt-1 text-primary-500" />
                            <span className="text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Base Exclusions */}
                  {((isFestivalTour(tour) || isSpecialActivityTour(tour)) ? tour.baseExclusions : tour.exclusions)?.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Exclusions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {((isFestivalTour(tour) || isSpecialActivityTour(tour)) ? tour.baseExclusions : tour.exclusions).map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 mt-1 text-primary-500" />
                            <span className="text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Things to Carry */}
                  {tour.thingsToCarry?.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Things to Carry</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tour.thingsToCarry.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 mt-1 text-primary-500" />
                            <span className="text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Important Note */}
                  {tour.importantNote && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Important Note</h3>
                      <p className="text-muted-foreground">{tour.importantNote}</p>
                    </div>
                  )}
                </div>
              </TourSection>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <TourBookingCard tour={tour} />
                <TourInfoCard tour={tour} className="mt-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}