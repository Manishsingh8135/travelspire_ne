// components/tours/tour-showcase.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, MapPin, Calendar } from "lucide-react";
import { Tour } from "@/types/tours/tour";

interface TourShowcaseProps {
  children: React.ReactNode;
  className?: string;
}

export function TourShowcase({ children, className }: TourShowcaseProps) {
  return (
    <section className={cn(
      "relative w-full overflow-hidden py-20 md:py-32",
      className
    )}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black" />
      <div className="absolute inset-0 bg-dot-white/[0.1]" />
      
      {/* Gradient beams */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/20 rounded-full blur-[100px] animate-pulse" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        {children}
      </div>
    </section>
  );
}

export function TourShowcaseHeader({ 
  title, 
  subtitle 
}: { 
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center space-y-6 mb-20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
      >
        <span className="block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

interface TourCardProps {
  tour: Tour;
  index: number;
}

export function TourCard({ tour, index }: TourCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

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
        "border border-white/10",
        "h-[30rem]",
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
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-500" />
        
        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 bg-dot-white/[0.1]">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
        {tour.featured && (
          <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-primary-500 text-white text-sm font-medium">
            Featured Tour
          </div>
        )}

        <div className="relative space-y-4">
          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{tour.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{tour.startDate}</span>
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
              <div className="text-2xl font-bold text-white">₹{tour.price.toLocaleString()}</div>
            </div>
            
            <Link 
              href={`/tours/${tour.slug}`}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl",
                "bg-white/10 backdrop-blur-md",
                "hover:bg-white/20 transition-colors duration-300",
                "text-white font-medium"
              )}
            >
              View Details
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TourGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {children}
    </div>
  );
}