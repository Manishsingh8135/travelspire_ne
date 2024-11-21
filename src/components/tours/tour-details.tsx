// components/tours/tour-detail.tsx
"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { 
  Clock, MapPin, Calendar, Check, 
  ArrowUpRight, X, AlertCircle, 
  BadgeIndianRupee, Compass 
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import map component to avoid SSR issues
const Map = dynamic(() => import('@/components/tours/tour-map'), {
  ssr: false
});

interface TourDetailProps {
  tour: any; // We'll define the full type later
  className?: string;
}

export function TourDetail({ tour, className }: TourDetailProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  return (
    <div className={cn("relative min-h-screen", className)}>
      {/* Hero Section with Parallax */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative h-[80vh] w-full"
      >
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Tour Type Badge */}
              <span className="inline-block px-4 py-2 rounded-full bg-primary-500 text-white text-sm font-medium">
                {tour.type}
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl">
                {tour.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{tour.startDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeIndianRupee className="w-5 h-5" />
                  <span>₹{tour.price.toLocaleString()} per person</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative bg-black">
        <div className="absolute inset-0 bg-dot-white/[0.1]">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <TourSection title="Overview">
                <p className="text-lg text-neutral-300">
                  {tour.overview}
                </p>
              </TourSection>

              {/* Itinerary */}
              <TourSection title="Itinerary">
                <div className="space-y-8">
                  {tour.itinerary.map((day: any, index: number) => (
                    <TourItineraryDay 
                      key={index}
                      day={day}
                      index={index}
                    />
                  ))}
                </div>
              </TourSection>

              {/* Map */}
              <TourSection title="Tour Route">
                <div className="h-[30rem] rounded-[2.5rem] overflow-hidden border border-white/10">
                  <Map route={tour.route} />
                </div>
              </TourSection>

              {/* Highlights */}
              <TourSection title="Tour Highlights">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tour.highlights.map((highlight: string, index: number) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-1 w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary-500" />
                      </div>
                      <span className="text-neutral-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </TourSection>

              {/* Gallery */}
              <TourSection title="Gallery">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tour.gallery.map((image: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative aspect-square rounded-2xl overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`Tour image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </motion.div>
                  ))}
                </div>
              </TourSection>
            </div>

            {/* Right Column - Booking Card & Info */}
            <div className="lg:sticky lg:top-8 space-y-8 h-fit">
              <TourBookingCard tour={tour} />
              <TourInfoCard tour={tour} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TourSection({ 
  title, 
  children 
}: { 
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
        {title}
      </h2>
      {children}
    </section>
  );
}

function TourItineraryDay({ 
  day,
  index 
}: { 
  day: {
    title: string;
    description: string;
    activities: string[];
  };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 pb-8"
    >
      {/* Timeline */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 to-violet-500" />
      <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary-500 -translate-x-[calc(50%-0.5px)]" />

      <h3 className="text-xl font-bold text-white mb-4">
        Day {index + 1}: {day.title}
      </h3>
      
      <p className="text-neutral-300 mb-4">
        {day.description}
      </p>

      <div className="space-y-2">
        {day.activities.map((activity, actIndex) => (
          <div 
            key={actIndex}
            className="flex items-center gap-3 text-neutral-400"
          >
            <Compass className="w-4 h-4 text-primary-500" />
            <span>{activity}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function TourBookingCard({ tour }: { tour: any }) {
  return (
    <div className={cn(
      "rounded-[2rem] overflow-hidden",
      "border border-white/10",
      "bg-white/5 backdrop-blur-xl",
      "p-6"
    )}>
      <div className="space-y-6">
        <div className="text-center pb-6 border-b border-white/10">
          <div className="text-sm text-neutral-400">Price per person</div>
          <div className="text-4xl font-bold text-white">
            ₹{tour.price.toLocaleString()}
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className={cn(
              "w-full px-4 py-3 rounded-xl",
              "bg-white/5 border border-white/10",
              "text-white placeholder:text-neutral-500",
              "focus:outline-none focus:ring-2 focus:ring-primary-500",
              "transition-all duration-200"
            )}
          />
          <input
            type="email"
            placeholder="Your Email"
            className={cn(
              "w-full px-4 py-3 rounded-xl",
              "bg-white/5 border border-white/10",
              "text-white placeholder:text-neutral-500",
              "focus:outline-none focus:ring-2 focus:ring-primary-500",
              "transition-all duration-200"
            )}
          />
          <input
            type="tel"
            placeholder="Your Phone"
            className={cn(
              "w-full px-4 py-3 rounded-xl",
              "bg-white/5 border border-white/10",
              "text-white placeholder:text-neutral-500",
              "focus:outline-none focus:ring-2 focus:ring-primary-500",
              "transition-all duration-200"
            )}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full py-4 rounded-xl",
              "bg-gradient-to-r from-primary-500 to-violet-500",
              "hover:from-primary-400 hover:to-violet-400",
              "text-white font-medium",
              "shadow-xl shadow-primary-500/25",
              "transition-all duration-300"
            )}
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function TourInfoCard({ tour }: { tour: any }) {
  return (
    <div className={cn(
      "rounded-[2rem] overflow-hidden",
      "border border-white/10",
      "bg-white/5 backdrop-blur-xl",
      "p-6"
    )}>
      {/* Inclusions */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-bold text-white">Inclusions</h3>
        <div className="space-y-2">
          {tour.inclusions.map((item: string, index: number) => (
            <div key={index} className="flex items-center gap-3 text-neutral-300">
              <Check className="w-4 h-4 text-primary-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Exclusions */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Exclusions</h3>
        <div className="space-y-2">
          {tour.exclusions.map((item: string, index: number) => (
            <div key={index} className="flex items-center gap-3 text-neutral-300">
              <X className="w-4 h-4 text-red-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="mt-8 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          <div className="space-y-2">
            <h4 className="font-medium text-yellow-500">Important Note</h4>
            <p className="text-sm text-neutral-300">
              {tour.importantNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}