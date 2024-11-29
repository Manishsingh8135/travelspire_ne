// components/tours/tour-detail/tour-gallery/index.tsx
"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { TourGalleryGrid } from './tour-gallery-grid';
import { DotPattern } from "@/components/ui/background-patterns";

interface TourGalleryProps {
  images: string[];
  className?: string;
}

export function TourGallery({ images, className }: TourGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number | null>(null);
  const isModalOpen = selectedImageIndex !== null;

  // Navigate through images in modal
  const showNextImage = React.useCallback(() => {
    setSelectedImageIndex((prev) => {
      if (prev === null) return 0;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  }, [images.length]);

  const showPrevImage = React.useCallback(() => {
    setSelectedImageIndex((prev) => {
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
          showNextImage();
          break;
        case "ArrowLeft":
          showPrevImage();
          break;
        case "Escape":
          setSelectedImageIndex(null);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, showNextImage, showPrevImage]);

  return (
    <div className={className}>
      {/* Grid View */}
      <TourGalleryGrid 
        images={images}
        onImageClick={setSelectedImageIndex}
      />

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isModalOpen && selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setSelectedImageIndex(null)}
            >
              <DotPattern className="opacity-10" />
            </motion.div>

            {/* Content */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "absolute top-4 right-4 z-50",
                  "w-10 h-10 rounded-full",
                  "bg-white/10 backdrop-blur-sm",
                  "border border-white/20",
                  "flex items-center justify-center",
                  "hover:bg-white/20 transition-colors"
                )}
                onClick={() => setSelectedImageIndex(null)}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              {/* Navigation Buttons */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "absolute left-4 z-50",
                  "w-12 h-12 rounded-full",
                  "bg-white/10 backdrop-blur-sm",
                  "border border-white/20",
                  "flex items-center justify-center",
                  "hover:bg-white/20 transition-colors"
                )}
                onClick={showPrevImage}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "absolute right-4 z-50",
                  "w-12 h-12 rounded-full",
                  "bg-white/10 backdrop-blur-sm",
                  "border border-white/20",
                  "flex items-center justify-center",
                  "hover:bg-white/20 transition-colors"
                )}
                onClick={showNextImage}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </motion.button>

              {/* Image */}
              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full h-full"
              >
                <Image
                  src={images[selectedImageIndex]}
                  alt="Tour location"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}