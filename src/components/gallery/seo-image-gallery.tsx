// SEO-Optimized Image Gallery Component
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, MapPin, Camera } from "lucide-react";
import { type PlaceImage } from "@/data/seo/image-seo-data";
import { GalleryStructuredData } from "@/components/seo/image-seo";

interface SEOImageGalleryProps {
  images: PlaceImage[];
  galleryTitle: string;
  galleryDescription: string;
  className?: string;
}

export function SEOImageGallery({ 
  images, 
  galleryTitle, 
  galleryDescription,
  className = "" 
}: SEOImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<PlaceImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image: PlaceImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % images.length
      : (currentIndex - 1 + images.length) % images.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  return (
    <>
      {/* Structured Data for Gallery */}
      <GalleryStructuredData 
        images={images}
        galleryName={galleryTitle}
        galleryDescription={galleryDescription}
      />

      {/* Gallery Grid */}
      <div className={`space-y-6 ${className}`}>
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {galleryTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {galleryDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => openLightbox(image, index)}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  title={image.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                
                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-white font-medium text-sm mb-1">
                    {image.title}
                  </h3>
                  <div className="flex items-center text-white/80 text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {image.location.name}, {image.location.state}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
              >
                ←
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
              >
                →
              </button>

              {/* Image */}
              <motion.div
                className="relative max-w-5xl max-h-[80vh]"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  title={selectedImage.title}
                  width={1200}
                  height={800}
                  className="object-contain w-full h-full"
                  priority
                />
                
                {/* Image Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-white/90 text-sm mb-2">
                    {selectedImage.caption}
                  </p>
                  <div className="flex items-center justify-between text-white/80 text-xs">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {selectedImage.location.name}, {selectedImage.location.state}
                    </div>
                    <div className="flex items-center">
                      <Camera className="w-3 h-3 mr-1" />
                      {selectedImage.category}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
