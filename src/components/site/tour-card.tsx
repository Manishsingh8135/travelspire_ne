import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { MediaImage } from "@/components/media/media-image";
import type { HeroMedia } from "@/lib/media";
import { cn } from "@/lib/cn";

const DIFFICULTY_TICKS: Record<string, string> = {
  easy: "▲△△",
  moderate: "▲▲△",
  challenging: "▲▲▲",
};

export type TourCardData = {
  slug: string;
  title: string;
  subtitle?: string | null;
  hero?: HeroMedia | null;
  durationDays?: number | null;
  priceInr?: number | null;
  difficulty?: string | null;
  routeLine?: string | null; // "TEZPUR → DIRANG → TAWANG"
};

/**
 * The expedition ticket (docs-new/07-pages/04 §A3): photo, mono route line,
 * days · difficulty ticks · ₹ — the card reads like a ticket, not a product
 * tile. Container-query friendly; whole card is the tap target (≥44px rows).
 */
export function TourCard({ tour, className }: { tour: TourCardData; className?: string }) {
  const facts = [
    tour.durationDays ? `${tour.durationDays} DAYS` : null,
    tour.difficulty ? (DIFFICULTY_TICKS[tour.difficulty] ?? tour.difficulty.toUpperCase()) : null,
    tour.priceInr ? `₹${tour.priceInr.toLocaleString("en-IN")}` : null,
  ].filter(Boolean) as string[];

  return (
    <Link
      href={`/tours/${tour.slug}` as Route}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-card shadow-panel transition-shadow duration-200 outline-none hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {tour.hero ? (
          <MediaImage
            media={tour.hero}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {tour.routeLine ? (
          <p className="truncate font-mono text-[10px] tracking-[0.14em] text-secondary uppercase">
            {tour.routeLine}
          </p>
        ) : null}
        <h3 className="mt-1.5 font-display text-xl leading-snug font-medium text-balance">
          {tour.title}
        </h3>
        {tour.subtitle ? (
          <p className="mt-1 line-clamp-2 text-sm text-pretty text-muted-foreground">
            {tour.subtitle}
          </p>
        ) : null}
        <div className="mt-auto flex items-center justify-between border-t border-border-subtle pt-3.5">
          <p className="flex items-center gap-2.5 font-mono text-xs tracking-wide text-muted-foreground tabular-nums uppercase">
            {facts.map((fact, i) => (
              <span key={fact} className="flex items-center gap-2.5">
                {i > 0 ? <span aria-hidden className="size-0.5 rounded-full bg-border-strong" /> : null}
                {fact}
              </span>
            ))}
          </p>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground" />
        </div>
      </div>
    </Link>
  );
}
