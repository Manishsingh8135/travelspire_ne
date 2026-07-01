import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type Story = {
  region: string;
  headline: string;
  location: string;
  src: string;
  alt: string;
  href: string;
};

/**
 * One Dream-feed card — a dream, not a product (new.md §3). Tall editorial
 * portrait: photograph + region tag + a single emotional Fraunces line +
 * place. The whole card is the link; the arrow is the affordance.
 */
export function StoryCard({ story, index }: { story: Story; index: number }) {
  return (
    <Link
      href={story.href as Route}
      aria-label={`${story.headline} — ${story.location}, ${story.region}`}
      className={cn(
        "group relative block aspect-[3/4] w-[78vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-2xl",
        "ring-1 ring-white/10 sm:w-[290px] lg:w-[300px]",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <Image
        src={story.src}
        alt={story.alt}
        fill
        sizes="(min-width: 640px) 300px, 78vw"
        loading={index < 2 ? undefined : "lazy"}
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />
      {/* legibility scrim */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/15 to-charcoal-950/30"
      />

      {/* region tag */}
      <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-charcoal-950/55 px-3 py-1 font-mono text-[0.6rem] font-medium tracking-[0.16em] uppercase text-mist-100 ring-1 ring-white/15 backdrop-blur-sm">
        {story.region}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex flex-col p-5">
        <h3 className="font-display text-[1.6rem] leading-[1.12] font-medium text-balance text-mist-50">
          {story.headline}
        </h3>
        <p className="mt-2.5 flex items-center gap-1.5 text-sm text-mist-200/85">
          <MapPin className="size-3.5 shrink-0 text-secondary" />
          {story.location}
        </p>
        <span
          aria-hidden
          className="mt-4 flex size-10 items-center justify-center rounded-full border border-mist-50/40 text-mist-50 transition-colors duration-200 ease-out group-hover:bg-mist-50 group-hover:text-charcoal-950"
        >
          <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
