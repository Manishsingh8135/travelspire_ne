// components/testimonials/testimonial-section.tsx
"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { type TestimonialSection as TestimonialSectionType,
    type Testimonial
 } from "@/types/testimonials/testimonial";
import { cn } from "@/lib/utils";
import { Quote, Star, ChevronLeft, ChevronRight, BadgeCheck, MapPin } from "lucide-react";
import Image from "next/image";
import { DotPattern, GlowEffect } from '@/components/ui/background-patterns';

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
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      zIndex: 0
    })
  };

  // Navigation function
  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => 
      (prev + newDirection + data.testimonials.length) % data.testimonials.length
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
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                scale: { duration: 0.4 }
              }}
              className="absolute inset-0"
            >
              <TestimonialCard
                testimonial={data.testimonials[activeIndex]}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <NavigationButton
            direction="prev"
            onClick={() => paginate(-1)}
          />
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
          <NavigationButton
            direction="next"
            onClick={() => paginate(1)}
          />
        </div>
      </div>
    </section>
  );
}




// Continuing in the same file, after TestimonialSection...

// function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
//     return (
//       <motion.div
//         className={cn(
//           "h-full w-full rounded-[2.5rem] overflow-hidden",
//           "bg-gradient-to-b from-white/90 via-white/90 to-white/90",
//           "dark:from-accent-900/90 dark:via-accent-900/90 dark:to-accent-900/90",
//           "border border-primary-100/20 dark:border-primary-900/20",
//           "shadow-2xl shadow-primary-500/10 dark:shadow-black/20",
//           "backdrop-blur-xl"
//         )}
//       >
//         {/* Card Content Layout */}
//         <div className="relative h-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-6 md:p-8">
//           {/* Media Section - Kept as is for good media handling */}
//           <div className="relative w-full h-full min-h-[280px] rounded-2xl overflow-hidden">
//             {testimonial.media && testimonial.media[0] && (
//               <>
//                 {testimonial.media[0].type === 'image' ? (
//                   <Image
//                     src={testimonial.media[0].url}
//                     alt={testimonial.media[0].caption || 'Travel experience'}
//                     fill
//                     className="object-cover"
//                   />
//                 ) : (
//                   <div className="relative w-full h-full">
//                     <video
//                       src={testimonial.media[0].url}
//                       poster={testimonial.media[0].thumbnail}
//                       controls
//                       className="absolute inset-0 w-full h-full object-cover"
//                     />
//                   </div>
//                 )}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 {testimonial.media[0].location && (
//                   <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
//                     <MapPin className="w-4 h-4" />
//                     <span className="text-sm">{testimonial.media[0].location}</span>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
  
//           {/* Content Section - Modified for better fit */}
//           <div className="flex flex-col h-full">
//             <div className="space-y-4">
//               {/* Header Area - More compact */}
//               <div className="flex items-center justify-between">
//                 <div className="text-primary-500 dark:text-primary-400">
//                   <Quote className="w-8 h-8" />
//                 </div>
                
//                 {/* Tour Tag - Moved to header */}
//                 <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary-100/50 dark:bg-primary-900/50">
//                   <span className="text-xs font-medium text-primary-700 dark:text-primary-300">
//                     {testimonial.travelDetails.tourName}
//                   </span>
//                 </div>
//               </div>
  
//               {/* Content - Controlled height */}
//               <blockquote className="relative">
//                 <p className="text-sm md:text-base text-foreground dark:text-white line-clamp-3">
//                   "{testimonial.content}"
//                 </p>
//               </blockquote>
  
//               {/* Trip Highlights - More compact */}
//               {testimonial.highlights && (
//                 <div className="space-y-2">
//                   {testimonial.highlights.map((highlight) => (
//                     <div 
//                       key={highlight.title}
//                       className="flex items-start gap-2"
//                     >
//                       <Star className="w-3.5 h-3.5 mt-0.5 text-primary-500 fill-current flex-shrink-0" />
//                       <div>
//                         <h4 className="text-xs font-medium text-foreground dark:text-white">
//                           {highlight.title}
//                         </h4>
//                         <p className="text-xs text-muted-foreground dark:text-neutral-400 line-clamp-1">
//                           {highlight.description}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
  
//             {/* Author Info - Optimized spacing */}
//             <div className="mt-auto pt-4 border-t border-primary-100/20 dark:border-primary-900/20">
//               <div className="flex items-center gap-3">
//                 {/* Avatar */}
//                 <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
//                   {testimonial.author.avatar ? (
//                     <Image
//                       src={testimonial.author.avatar}
//                       alt={testimonial.author.name}
//                       fill
//                       className="object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
//                       <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
//                         {testimonial.author.name.charAt(0)}
//                       </span>
//                     </div>
//                   )}
//                 </div>
  
//                 {/* Author Details - Compact layout */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-1.5 mb-0.5">
//                     <h4 className="font-medium text-sm text-foreground dark:text-white truncate">
//                       {testimonial.author.name}
//                     </h4>
//                     {testimonial.author.verified && (
//                       <BadgeCheck className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
//                     )}
//                   </div>
  
//                   {/* Location and Date */}
//                   <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-neutral-400">
//                     <span className="flex items-center gap-1">
//                       <MapPin className="w-3.5 h-3.5" />
//                       <span className="truncate">{testimonial.author.location}</span>
//                     </span>
//                     <span className="hidden md:inline">•</span>
//                     <span className="hidden md:block">
//                       {new Date(testimonial.travelDetails.travelDate).toLocaleDateString('en-US', {
//                         month: 'short',
//                         year: 'numeric'
//                       })}
//                     </span>
//                   </div>
  
//                   {/* Rating - Compact */}
//                   {testimonial.rating && (
//                     <div className="flex items-center gap-0.5 mt-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={12}
//                           className={cn(
//                             "fill-current",
//                             i < testimonial.rating.overall
//                               ? "text-yellow-500"
//                               : "text-gray-300 dark:text-gray-600"
//                           )}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }


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
                {testimonial.media[0].type === 'image' ? (
                  <Image
                    src={testimonial.media[0].url}
                    alt={testimonial.media[0].caption || 'Travel experience'}
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
                    <span className="text-sm">{testimonial.media[0].location}</span>
                  </div>
                )}
              </>
            )}
          </div>
  
          {/* Content Section */}
          <div className="flex flex-col justify-between h-full">
            {/* Header */}
            <div>
              {/* <div className="mb-6 text-primary-500 dark:text-primary-400">
                <Quote className="w-12 h-12" />
              </div> */}
  
              {/* Tour Details */}
              <div className="mb-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100/50 dark:bg-primary-900/50">
                  <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                    {testimonial.travelDetails.tourName}
                  </span>
                </div>
              </div>
  
              {/* Content */}
              {/* <blockquote className="relative">
                <p className="text-lg md:text-xl font-medium text-foreground dark:text-white mb-6 line-clamp-4">
                  "{testimonial.content}"
                </p>
              </blockquote> */}
              <div>
              <p className="text-sm md:text-sm font-medium text-foreground dark:text-white mb-6 line-clamp-4">
                  "{testimonial.content}"
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
                      <div className="mt-1 text-primary-500">
                        <Star className="w-4 h-4 fill-current" />
                      </div>
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
                      {new Date(testimonial.travelDetails.travelDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
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

//   testimonial-card 2


// function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
//     return (
//       <motion.div
//         className={cn(
//           "h-full w-full rounded-[2.5rem] overflow-hidden",
//           "bg-accent-950", // Dark background to match design
//           "border border-accent-900/50",
//         )}
//       >
//         {/* Card Content Layout - Grid layout changed to match design */}
//         <div className="relative h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
//           {/* Left - Image Section */}
//           <div className="relative w-full h-full min-h-[400px]">
//             {testimonial.media && testimonial.media[0] && (
//               <Image
//                 src={testimonial.media[0].url}
//                 alt={testimonial.media[0].caption || 'Travel experience'}
//                 fill
//                 className="object-cover"
//               />
//             )}
//           </div>
  
//           {/* Right - Content Section */}
//           <div className="relative p-8 lg:p-12 flex flex-col">
//             {/* Quote Icon */}
//             <div className="mb-8">
//               <Quote className="w-12 h-12 text-primary-500/50" />
//             </div>
  
//             {/* Tour Name Tag */}
//             <div className="mb-6">
//               <span className={cn(
//                 "inline-block px-6 py-2 rounded-full",
//                 "bg-primary-950/50", // Darker background with transparency
//                 "border border-primary-900/20",
//                 "text-primary-400 font-medium"
//               )}>
//                 {testimonial.travelDetails.tourName}
//               </span>
//             </div>
  
//             {/* Testimonial Content */}
//             <blockquote className="mb-8">
//               <p className="text-xl text-white/90 leading-relaxed">
//                 "{testimonial.content}"
//               </p>
//             </blockquote>
  
//             {/* Highlights */}
//             <div className="space-y-4 mt-auto">
//               {testimonial.highlights?.map((highlight) => (
//                 <div 
//                   key={highlight.title}
//                   className="flex items-start gap-3"
//                 >
//                   <Star className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
//                   <div>
//                     <h4 className="text-white font-medium">
//                       {highlight.title}
//                     </h4>
//                     <p className="text-white/60 text-sm">
//                       {highlight.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

// testimonial-card-3



// function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
//     return (
//       <motion.div
//         className={cn(
//           "h-full w-full rounded-[2.5rem] overflow-hidden",
//           "bg-accent-950",
//           "border border-accent-900/50",
//         )}
//       >
//         <div className="relative h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
//           {/* Left - Image Section (Same as before) */}
//           <div className="relative w-full h-full min-h-[400px]">
//             {testimonial.media && testimonial.media[0] && (
//               <Image
//                 src={testimonial.media[0].url}
//                 alt={testimonial.media[0].caption || 'Travel experience'}
//                 fill
//                 className="object-cover"
//               />
//             )}
//           </div>
  
//           {/* Right - Content Section */}
//           <div className="relative p-8 lg:p-12 flex flex-col">
//             {/* Tour Name Tag */}
//             {/* <div className="mb-6">
//               <span className={cn(
//                 "inline-block px-6 py-2 rounded-full",
//                 "bg-primary-950/50",
//                 "border border-primary-900/20",
//                 "text-primary-400 font-medium"
//               )}>
//                 {testimonial.travelDetails.tourName}
//               </span>
//             </div> */}
  
//             {/* Testimonial Content */}
//             {/* <blockquote className="mb-8">
//               <p className="text-xl text-white/90 leading-relaxed">
//                 "{testimonial.content}"
//               </p>
//             </blockquote> */}
  
//             {/* Highlights */}
//             <div className="space-y-4 mb-8">
//               {testimonial.highlights?.map((highlight) => (
//                 <div 
//                   key={highlight.title}
//                   className="flex items-start gap-3"
//                 >
//                   <Star className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
//                   <div>
//                     <h4 className="text-white font-medium">
//                       {highlight.title}
//                     </h4>
//                     <p className="text-white/60 text-sm">
//                       {highlight.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
  
//             {/* Author Section - Added */}
//             <div className="mt-auto pt-6 border-t border-accent-800">
//               <div className="flex items-start gap-4">
//                 {/* Author Avatar */}
//                 <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
//                   {testimonial.author.avatar ? (
//                     <Image
//                       src={testimonial.author.avatar}
//                       alt={testimonial.author.name}
//                       fill
//                       className="object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-primary-900 flex items-center justify-center">
//                       <span className="text-lg font-medium text-primary-200">
//                         {testimonial.author.name.charAt(0)}
//                       </span>
//                     </div>
//                   )}
//                 </div>
  
//                 {/* Author Details */}
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <h4 className="font-medium text-white">
//                       {testimonial.author.name}
//                     </h4>
//                     {testimonial.author.verified && (
//                       <BadgeCheck className="w-4 h-4 text-primary-500" />
//                     )}
//                   </div>
  
//                   <div className="flex flex-wrap gap-3 text-sm text-white/60">
//                     {/* Location */}
//                     <div className="flex items-center gap-1">
//                       <MapPin className="w-4 h-4" />
//                       <span>{testimonial.author.location}</span>
//                     </div>
  
//                     {/* Age if available */}
//                     {testimonial.author.age && (
//                       <span>Age {testimonial.author.age}</span>
//                     )}
  
//                     {/* Travel Date */}
//                     <span>
//                       {new Date(testimonial.travelDetails.travelDate).toLocaleDateString('en-US', {
//                         month: 'long',
//                         year: 'numeric'
//                       })}
//                     </span>
//                   </div>
  
//                   {/* Rating Stars */}
//                   {testimonial.rating && (
//                     <div className="flex items-center gap-1 mt-2">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={16}
//                           className={cn(
//                             "fill-current",
//                             i < testimonial.rating.overall
//                               ? "text-yellow-500"
//                               : "text-accent-700"
//                           )}
//                         />
//                       ))}
//                       <span className="ml-2 text-sm text-white/60">
//                         {testimonial.rating.overall}/5
//                       </span>
//                     </div>
//                   )}
  
//                   {/* Travel Style Tags */}
//                   {testimonial.author.travelStyle && (
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {testimonial.author.travelStyle.map((style) => (
//                         <span
//                           key={style}
//                           className="inline-block px-2 py-1 text-xs rounded-full
//                                    bg-primary-900/50 text-primary-300
//                                    border border-primary-800/50"
//                         >
//                           {style}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }


// testimonial-card-4

// function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
//     return (
//       <motion.div
//         className={cn(
//           "h-full w-full rounded-[2.5rem] overflow-hidden",
//           "bg-accent-950",
//           "border border-accent-900/50",
//         )}
//       >
//         <div className="relative h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
//           {/* Left - Image Section */}
//           <div className="relative w-full h-full">
//             {testimonial.media && testimonial.media[0] && (
//               <Image
//                 src={testimonial.media[0].url}
//                 alt={testimonial.media[0].caption || 'Travel experience'}
//                 fill
//                 className="object-cover"
//               />
//             )}
//           </div>
  
//           {/* Right - Content Section - Added max-height and overflow control */}
//           <div className="relative p-6 lg:p-8 flex flex-col h-full overflow-y-auto">
//             {/* Tour Name Tag - Reduced padding and font size */}
//             <div className="mb-4">
//               <span className={cn(
//                 "inline-block px-4 py-1.5 rounded-full text-sm",
//                 "bg-primary-950/50",
//                 "border border-primary-900/20",
//                 "text-primary-400 font-medium"
//               )}>
//                 {testimonial.travelDetails.tourName}
//               </span>
//             </div>
  
//             {/* Testimonial Content - Reduced margins and font size */}
//             <blockquote className="mb-4">
//               <p className="text-base lg:text-lg text-white/90 leading-relaxed line-clamp-4">
//                 "{testimonial.content}"
//               </p>
//             </blockquote>
  
//             {/* Highlights - Reduced spacing */}
//             <div className="space-y-2 mb-4">
//               {testimonial.highlights?.map((highlight) => (
//                 <div 
//                   key={highlight.title}
//                   className="flex items-start gap-2"
//                 >
//                   <Star className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <h4 className="text-sm text-white font-medium">
//                       {highlight.title}
//                     </h4>
//                     <p className="text-xs text-white/60">
//                       {highlight.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
  
//             {/* Author Section - Reduced spacing */}
//             <div className="mt-auto pt-4 border-t border-accent-800">
//               <div className="flex items-start gap-3">
//                 {/* Author Avatar - Smaller size */}
//                 <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
//                   {testimonial.author.avatar ? (
//                     <Image
//                       src={testimonial.author.avatar}
//                       alt={testimonial.author.name}
//                       fill
//                       className="object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-primary-900 flex items-center justify-center">
//                       <span className="text-base font-medium text-primary-200">
//                         {testimonial.author.name.charAt(0)}
//                       </span>
//                     </div>
//                   )}
//                 </div>
  
//                 {/* Author Details - Reduced font sizes and spacing */}
//                 <div className="flex-1 min-w-0"> {/* added min-w-0 to help with text truncation */}
//                   <div className="flex items-center gap-1.5 mb-0.5">
//                     <h4 className="font-medium text-sm text-white truncate">
//                       {testimonial.author.name}
//                     </h4>
//                     {testimonial.author.verified && (
//                       <BadgeCheck className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
//                     )}
//                   </div>
  
//                   <div className="flex flex-wrap gap-2 text-xs text-white/60">
//                     <div className="flex items-center gap-1">
//                       <MapPin className="w-3.5 h-3.5" />
//                       <span className="truncate">{testimonial.author.location}</span>
//                     </div>
//                     {testimonial.author.age && (
//                       <span>Age {testimonial.author.age}</span>
//                     )}
//                   </div>
  
//                   {/* Rating Stars - Smaller size */}
//                   {testimonial.rating && (
//                     <div className="flex items-center gap-0.5 mt-1.5">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={12}
//                           className={cn(
//                             "fill-current",
//                             i < testimonial.rating.overall
//                               ? "text-yellow-500"
//                               : "text-accent-700"
//                           )}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }


//   Continuing in the same file...






interface NavigationButtonProps {
    direction: 'prev' | 'next';
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
        aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
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
    onNext
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
        if (event.key === 'ArrowLeft') {
          onPrev();
        } else if (event.key === 'ArrowRight') {
          onNext();
        }
      }
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
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
  
    const onTouchStart = (e: React.TouchEvent) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };
  
    const onTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };
  
    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      setTouchStart(null);
      setTouchEnd(null);
    };
  
    return {
      onTouchStart,
      onTouchMove,
      onTouchEnd
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
          layout: 'grid'
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
          layout: 'masonry'
        }}
      />
    );
  }
  
  // You can use these exports in your pages like this:
  // import { TestimonialCarousel, TestimonialGrid, TestimonialMasonry } from "@/components/testimonials/testimonial-section";