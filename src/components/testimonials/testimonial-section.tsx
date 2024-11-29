// components/testimonials/testimonial-section.tsx
"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  type TestimonialSection as TestimonialSectionType,
  type Testimonial,
} from "@/types/testimonials/testimonial";
import { cn } from "@/lib/utils";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { DotPattern, GlowEffect } from "@/components/ui/background-patterns";

interface TestimonialSectionProps {
  data: TestimonialSectionType;
  className?: string;
}

export function TestimonialSection({ data, className }: TestimonialSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      zIndex: 0,
    }),
  };

  // Navigation function
  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex(
      (prev) => (prev + newDirection + data.testimonials.length) % data.testimonials.length
    );
  };

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden py-20 md:py-32",
        "bg-gradient-to-b from-background via-primary-50/10 to-background",
        "dark:from-accent-950 dark:via-accent-900/50 dark:to-accent-950",
        className
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <DotPattern className="opacity-20" />
        <GlowEffect
          color="primary"
          size="lg"
          opacity="low"
          className="absolute -top-40 -right-40"
        />
        <GlowEffect
          color="secondary"
          size="lg"
          opacity="low"
          className="absolute -bottom-40 -left-40"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          {data.subtitle && (
            <span className="inline-block mb-4 text-sm font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400">
              {data.subtitle}
            </span>
          )}
          <h2 className="heading-2 mb-6">
            <span className="block text-foreground dark:text-white">
              {data.title}
            </span>
          </h2>
          {data.description && (
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground dark:text-neutral-300">
              {data.description}
            </p>
          )}
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative h-[700px] md:h-[600px] mb-16">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.4 },
              }}
              className="absolute inset-0"
            >
              <TestimonialCard testimonial={data.testimonials[activeIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <NavigationButton direction="prev" onClick={() => paginate(-1)} />
          <div className="flex items-center gap-2">
            {data.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-8 bg-primary-500"
                    : "bg-primary-200 dark:bg-primary-800 hover:bg-primary-300 dark:hover:bg-primary-700"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <NavigationButton direction="next" onClick={() => paginate(1)} />
        </div>
      </div>
    </section>
  );
}

// TestimonialCard Component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      className={cn(
        "h-full w-full rounded-[2.5rem] overflow-hidden",
        "bg-gradient-to-b from-white/90 via-white/90 to-white/90",
        "dark:from-accent-900/90 dark:via-accent-900/90 dark:to-accent-900/90",
        "border border-primary-100/20 dark:border-primary-900/20",
        "shadow-2xl shadow-primary-500/10 dark:shadow-black/20",
        "backdrop-blur-xl"
      )}
    >
      {/* Card Content Layout */}
      <div className="relative h-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Media Section */}
        <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden">
          {testimonial.media && testimonial.media[0] && (
            <>
              {testimonial.media[0].type === "image" ? (
                <Image
                  src={testimonial.media[0].url}
                  alt={
                    testimonial.media[0].caption || "Travel experience"
                  }
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <video
                    src={testimonial.media[0].url}
                    poster={testimonial.media[0].thumbnail}
                    controls
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {testimonial.media[0].location && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {testimonial.media[0].location}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between h-full">
          {/* Header */}
          <div>
            {/* Tour Details */}
            <div className="mb-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100/50 dark:bg-primary-900/50">
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  {testimonial.travelDetails.tourName}
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-sm md:text-sm font-medium text-foreground dark:text-white mb-6 line-clamp-4">
                &ldquo;{testimonial.content}&rdquo;
              </p>
            </div>

            {/* Trip Highlights */}
            {testimonial.highlights && (
              <div className="space-y-3 mb-6 hidden lg:block">
                {testimonial.highlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="flex items-start gap-2"
                  >
                    <Star className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground dark:text-white">
                        {highlight.title}
                      </h4>
                      <p className="text-sm text-muted-foreground dark:text-neutral-400">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Author Info */}
          <div className="flex items-start gap-4 mt-auto pt-6 border-t border-primary-100/20 dark:border-primary-900/20">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              {testimonial.author.avatar ? (
                <Image
                  src={testimonial.author.avatar}
                  alt={testimonial.author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <span className="text-lg font-medium text-primary-700 dark:text-primary-300">
                    {testimonial.author.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground dark:text-white">
                  {testimonial.author.name}
                </h4>
                {testimonial.author.verified && (
                  <BadgeCheck className="w-4 h-4 text-primary-500" />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-sm text-muted-foreground dark:text-neutral-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {testimonial.author.location}
                </span>
                {testimonial.travelDetails.travelDate && (
                  <span>
                    {new Date(
                      testimonial.travelDetails.travelDate
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>

              {/* Rating */}
              {testimonial.rating && (
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={cn(
                        "fill-current",
                        i < testimonial.rating.overall
                          ? "text-yellow-500"
                          : "text-gray-300 dark:text-gray-600"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface NavigationButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

function NavigationButton({ direction, onClick }: NavigationButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative group p-3 rounded-full",
        "bg-white/80 dark:bg-accent-800/80",
        "hover:bg-white dark:hover:bg-accent-700",
        "border border-primary-100/20 dark:border-primary-900/20",
        "shadow-sm hover:shadow-md",
        "backdrop-blur-sm",
        "transition-all duration-300"
      )}
      aria-label={
        direction === "prev" ? "Previous testimonial" : "Next testimonial"
      }
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-400/20 blur-xl" />
      </div>

      {/* Icon */}
      <div className="relative">
        {direction === "prev" ? (
          <ChevronLeft className="w-6 h-6 text-foreground dark:text-white" />
        ) : (
          <ChevronRight className="w-6 h-6 text-foreground dark:text-white" />
        )}
      </div>
    </motion.button>
  );
}

// Optional: Add mobile-specific navigation for touch devices
function MobileNavigation({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-10">
      <div className="flex items-center gap-4 p-2 rounded-full bg-white/90 dark:bg-accent-800/90 backdrop-blur-sm shadow-lg">
        <NavigationButton direction="prev" onClick={onPrev} />
        <NavigationButton direction="next" onClick={onNext} />
      </div>
    </div>
  );
}

// Optional: Add keyboard navigation hook
function useKeyboardNavigation(onPrev: () => void, onNext: () => void) {
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        onPrev();
      } else if (event.key === "ArrowRight") {
        onNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext]);
}

// Optional: Add gesture support
function useSwipeGesture(onPrev: () => void, onNext: () => void) {
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const minSwipeDistance = 50;

  React.useEffect(() => {
    if (touchStart && touchEnd) {
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        onNext();
      } else if (isRightSwipe) {
        onPrev();
      }
    }
  }, [touchStart, touchEnd, onNext, onPrev]);

  const onTouchStartHandler = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMoveHandler = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    setTouchStart(null);
    setTouchEnd(null);
  };

  return {
    onTouchStart: onTouchStartHandler,
    onTouchMove: onTouchMoveHandler,
    onTouchEnd: onTouchEndHandler,
  };
}

// Export variants for different styles
export function TestimonialCarousel(props: TestimonialSectionProps) {
  return <TestimonialSection {...props} />;
}

export function TestimonialGrid(props: TestimonialSectionProps) {
  return (
    <TestimonialSection
      {...props}
      data={{
        ...props.data,
        layout: "grid",
      }}
    />
  );
}

export function TestimonialMasonry(props: TestimonialSectionProps) {
  return (
    <TestimonialSection
      {...props}
      data={{
        ...props.data,
        layout: "masonry",
      }}
    />
  );
}

// You can use these exports in your pages like this:
// import { TestimonialCarousel, TestimonialGrid, TestimonialMasonry } from "@/components/testimonials/testimonial-section";
