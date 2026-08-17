"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  MapPin,
  Quote,
  Star,
} from "lucide-react";
import type {
  Testimonial,
  TestimonialSection as TestimonialSectionType,
} from "@/types/testimonials/testimonial";
import { cn } from "@/lib/utils";

interface TestimonialSectionProps {
  data: TestimonialSectionType;
  className?: string;
}

export function TestimonialSection({
  data,
  className,
}: TestimonialSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = data.testimonials[activeIndex];

  const paginate = (direction: number) => {
    setActiveIndex(
      (current) =>
        (current + direction + data.testimonials.length) %
        data.testimonials.length,
    );
  };

  return (
    <section
      aria-labelledby="traveller-stories-title"
      className={cn(
        "relative overflow-hidden bg-[#eee7d9] py-20 text-[#142019] sm:py-24 lg:py-32",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-10 grid gap-7 md:mb-14 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            {data.subtitle && (
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
                {data.subtitle}
              </p>
            )}
            <h2
              id="traveller-stories-title"
              className="max-w-[11ch] text-[clamp(2.75rem,5.8vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.055em]"
            >
              Travel stories that{" "}
              <span className="font-serif font-normal italic text-[#76533e]">
                inspire
              </span>
            </h2>
          </div>

          {data.description && (
            <p className="max-w-[34rem] text-base leading-7 text-[#445149] md:col-span-5 md:justify-self-end md:text-lg md:leading-8">
              {data.description}
            </p>
          )}
        </header>

        <div className="relative overflow-hidden rounded-[18px] bg-[#101a15] shadow-[14px_24px_55px_-26px_rgba(18,28,22,0.64)]">
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        </div>

        <div className="mt-6 flex items-center justify-between gap-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#68736c]">
            Story {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(data.testimonials.length).padStart(2, "0")}
          </p>

          <div className="flex items-center gap-2">
            <NavigationButton
              label="Previous story"
              onClick={() => paginate(-1)}
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </NavigationButton>
            <NavigationButton label="Next story" onClick={() => paginate(1)}>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </NavigationButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const media = testimonial.media?.[0];

  return (
    <article className="grid min-h-[46rem] md:min-h-[35rem] md:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.75fr)]">
      <div className="relative min-h-[23rem] overflow-hidden md:min-h-full">
        {media?.type === "image" && (
          <Image
            src={media.url}
            alt={media.caption || testimonial.travelDetails.tourName}
            fill
            sizes="(min-width: 768px) 62vw, 100vw"
            className="object-cover"
          />
        )}
        {media?.type === "video" && (
          <video
            src={media.url}
            poster={media.thumbnail}
            controls
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_54%,rgba(4,10,7,0.72)_100%)]" />
        {media?.location && (
          <p className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 sm:bottom-7 sm:left-7">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            {media.location}
          </p>
        )}
      </div>

      <div className="flex flex-col p-6 text-[#f4efe4] sm:p-8 lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex rounded-full bg-[#734732] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#fff3e9] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.8)]">
            {testimonial.travelDetails.tripType}
          </span>
          <Quote
            aria-hidden="true"
            className="h-8 w-8 text-[#cdb98f]/55"
            strokeWidth={1.25}
          />
        </div>

        <blockquote className="mt-7 line-clamp-6 font-serif text-[1.45rem] leading-[1.3] tracking-[-0.025em] text-[#f2ecdf] sm:text-[1.65rem] md:line-clamp-8">
          “{testimonial.content}”
        </blockquote>

        <div className="mt-auto pt-8">
          <div
            className="mb-5 flex gap-1 text-[#d7b568]"
            aria-label={`${testimonial.rating.overall} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                aria-hidden="true"
                className={cn(
                  "h-3.5 w-3.5",
                  index < testimonial.rating.overall && "fill-current",
                )}
              />
            ))}
          </div>

          <div className="flex items-end justify-between gap-4 border-t border-white/[0.11] pt-5">
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
                {testimonial.author.name}
                {testimonial.author.verified && (
                  <BadgeCheck
                    aria-label="Verified traveller"
                    className="h-4 w-4 text-[#d7b568]"
                  />
                )}
              </p>
              <p className="mt-1 text-xs text-white/50">
                {testimonial.author.location}
              </p>
            </div>
            <p className="max-w-[12rem] text-right text-[9px] font-semibold uppercase leading-4 tracking-[0.14em] text-white/45">
              {testimonial.travelDetails.tourName}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function NavigationButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-11 w-14 items-center justify-center rounded-[10px] bg-[#16231c] text-[#f2eadc] shadow-[5px_10px_24px_-14px_rgba(12,20,15,0.8)] transition-colors duration-200 hover:bg-[#27372e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87543a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#eee7d9]"
    >
      {children}
    </button>
  );
}

export const TestimonialCarousel = TestimonialSection;
