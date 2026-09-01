"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { TourGalleryGrid } from "./tour-gallery-grid";
import { cn } from "@/lib/utils";
import { getPlaceImageAlt } from "@/data/seo/image-seo-data";

interface TourGalleryProps {
  images: string[];
  className?: string;
  title?: string;
}

export function TourGallery({
  images,
  className,
  title = "Journey gallery",
}: TourGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const showNext = useCallback(() => {
    setSelectedIndex((current) =>
      current === null || current === images.length - 1 ? 0 : current + 1,
    );
  }, [images.length]);

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) =>
      current === null || current === 0 ? images.length - 1 : current - 1,
    );
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrevious]);

  if (images.length === 0) return null;

  return (
    <div className={cn(className)}>
      <TourGalleryGrid images={images} onImageClick={setSelectedIndex} />

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050a07]/[0.95] p-3 sm:p-6"
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative h-[82vh] w-full max-w-[1500px]"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={images[selectedIndex]}
                alt={getPlaceImageAlt(
                  images[selectedIndex],
                  `Photograph ${selectedIndex + 1} from this journey`,
                )}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />

              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close gallery"
                className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-[9px] bg-black/55 text-white shadow-[5px_10px_22px_-14px_rgba(0,0,0,0.95)] backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>

              {images.length > 1 && (
                <>
                  <GalleryButton
                    label="Previous image"
                    side="left"
                    onClick={showPrevious}
                  >
                    <ArrowLeft aria-hidden="true" className="h-5 w-5" />
                  </GalleryButton>
                  <GalleryButton
                    label="Next image"
                    side="right"
                    onClick={showNext}
                  >
                    <ArrowRight aria-hidden="true" className="h-5 w-5" />
                  </GalleryButton>
                </>
              )}

              <p className="absolute bottom-0 left-0 rounded-[8px] bg-black/[0.55] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/[0.7] backdrop-blur-sm">
                {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryButton({
  children,
  label,
  side,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-[9px] bg-black/55 text-white shadow-[5px_10px_22px_-14px_rgba(0,0,0,0.95)] backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
        side === "left" ? "left-0" : "right-0",
      )}
    >
      {children}
    </button>
  );
}
