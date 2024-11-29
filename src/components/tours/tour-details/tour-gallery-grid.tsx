// components/tours/tour-detail/tour-gallery/tour-gallery-grid.tsx
"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

interface TourGalleryGridProps {
  images: string[];
  onImageClick: (index: number) => void;
}

export function TourGalleryGrid({ images, onImageClick }: TourGalleryGridProps) {
  // Calculate grid layout based on number of images
  const gridLayout = React.useMemo(() => {
    if (images.length <= 3) return "grid-cols-1 md:grid-cols-3";
    if (images.length === 4) return "grid-cols-1 md:grid-cols-2";
    return "grid-cols-1 md:grid-cols-3";
  }, [images.length]);

  // Special spans for first image in different layouts
  const firstImageSpan = React.useMemo(() => {
    if (images.length <= 3) return "md:col-span-2";
    if (images.length === 4) return "md:row-span-2";
    return "md:col-span-2 md:row-span-2";
  }, [images.length]);

  return (
    <div className={cn(
      "grid gap-4",
      "auto-rows-[250px] md:auto-rows-[300px]",
      gridLayout
    )}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "group relative rounded-[2rem] overflow-hidden cursor-pointer",
            "border border-primary-100/20 dark:border-primary-900/20",
            "bg-primary-50/50 dark:bg-primary-950/50",
            index === 0 && firstImageSpan
          )}
          onClick={() => onImageClick(index)}
        >
          {/* Image */}
          <Image
            src={image}
            alt={`Tour location ${index + 1}`}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              "group-hover:scale-110"
            )}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          
          {/* Overlay */}
          <div className={cn(
            "absolute inset-0 transition-opacity duration-300",
            "bg-gradient-to-t from-black/60 via-black/30 to-transparent",
            "opacity-0 group-hover:opacity-100"
          )}>
            {/* Zoom Icon */}
            <div className={cn(
              "absolute inset-0 flex items-center justify-center",
              "transition-transform duration-500",
              "translate-y-4 group-hover:translate-y-0"
            )}>
              <div className={cn(
                "w-12 h-12 rounded-full",
                "bg-white/10 backdrop-blur-sm",
                "border border-white/20",
                "flex items-center justify-center"
              )}>
                <ZoomIn className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}