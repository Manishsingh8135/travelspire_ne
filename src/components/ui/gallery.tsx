// components/ui/gallery.tsx
"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { DotPattern } from "./background-patterns";

interface GalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
  layout?: 'grid' | 'masonry';
  className?: string;
  imageClassName?: string;
}

export function Gallery({
  images,
  layout = 'grid',
  className,
  imageClassName,
}: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const isModalOpen = selectedIndex !== null;

  // Navigation functions
  const showNext = React.useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  }, [images.length]);

  const showPrev = React.useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return images.length - 1;
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  }, [images.length]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      switch (e.key) {
        case "ArrowRight":
          showNext();
          break;
        case "ArrowLeft":
          showPrev();
          break;
        case "Escape":
          setSelectedIndex(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, showNext, showPrev]);

  return (
    <>
      {/* Gallery Grid */}
      <div className={cn(
        "grid gap-4",
        layout === 'grid' 
          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
          : "columns-2 md:columns-3 lg:columns-4",
        className
      )}>
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-lg",
              layout === 'grid' ? "aspect-square" : "break-inside-avoid mb-4",
              imageClassName
            )}
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isModalOpen && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <DotPattern className="opacity-10" />
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-sm transition-colors hover:bg-black/75 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={showPrev}
              className="absolute left-4 z-50 rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-sm transition-colors hover:bg-black/75 hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={showNext}
              className="absolute right-4 z-50 rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-sm transition-colors hover:bg-black/75 hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Main Image */}
            <div className="relative h-full w-full">
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
