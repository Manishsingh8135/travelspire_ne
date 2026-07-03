import * as React from "react";
import { Photo } from "@/components/ui/photo";
import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/cn";

export type Experience = {
  title: string;
  blurb: string;
  src: string;
  alt: string;
  href: string;
  icon: React.ReactNode;
};

/**
 * One "way to experience" tile — a photograph with a pine icon seal, a Fraunces
 * title and a one-line invitation (new.md §4). Not a product card: a mood. The
 * whole tile is the link; hover deepens the scrim, lifts the copy and eases the
 * photo in (honest photography, no faux video autoplay).
 */
export function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  return (
    <Link
      href={exp.href as Route}
      aria-label={exp.title}
      className={cn(
        "group relative block aspect-[4/5] overflow-hidden rounded-xl",
        "ring-1 ring-black/5 outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <Photo
        src={exp.src}
        alt={exp.alt}
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
        loading={index < 5 ? undefined : "lazy"}
        className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.07]"
      />
      {/* legibility scrim — deepens on hover */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-charcoal-950/92 via-charcoal-950/30 to-charcoal-950/5 transition-[background] duration-500 group-hover:from-charcoal-950"
      />

      <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 sm:p-5">
        <span
          aria-hidden
          className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-secondary/85 text-secondary-foreground ring-1 ring-white/15 backdrop-blur-sm [&_svg]:size-4.5"
        >
          {exp.icon}
        </span>
        <h3 className="font-display text-base leading-tight font-medium text-balance text-mist-50 sm:text-lg lg:text-xl">
          {exp.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-mist-200/80 sm:text-sm">
          {exp.blurb}
        </p>
      </div>
    </Link>
  );
}
