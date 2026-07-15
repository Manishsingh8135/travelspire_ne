import Link from "next/link";
import type { Route } from "next";
import { MediaImage } from "@/components/media/media-image";
import type { HeroMedia } from "@/lib/media";
import { cn } from "@/lib/cn";

export type TicketData = {
  slug: string;
  title: string;
  hero?: HeroMedia | null;
  /** "DIBRUGARH → AALO → MECHUKA" — built via lib/tours/read routeLine(). */
  routeLine?: string | null;
  /** "6D/5N" — shortDuration(). */
  duration?: string | null;
  /** "▲▲△" — difficultyTicks(). */
  ticks?: string | null;
  /** Computed from-price (tourFromPrice) — rendered "FROM ₹X". */
  fromInr?: number | null;
  /** Catalogue number — renders the "Nº 03" chip when present. */
  index?: number;
};

/**
 * The expedition ticket (08-blueprint/05 §4) — a physical object, so it may be
 * a box (de-shadcn rule 2): portrait 3:4 photograph, catalogue Nº chip, a
 * dotted PERFORATION between photo and meta, mono facts ledger. Whole card is
 * the tap target; card-lift is the public shadow doctrine (D3).
 */
export function TicketCard({ ticket, className }: { ticket: TicketData; className?: string }) {
  const facts = [
    ticket.duration,
    ticket.ticks,
    ticket.fromInr ? `FROM ₹${ticket.fromInr.toLocaleString("en-IN")}` : null,
  ].filter(Boolean) as string[];

  return (
    <Link
      href={`/tours/${ticket.slug}` as Route}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-card card-lift outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {ticket.hero ? (
          <MediaImage
            media={ticket.hero}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : null}
        {ticket.index != null ? (
          <span className="absolute top-3 left-3 rounded-[4px] bg-charcoal-950/45 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.16em] text-mist-100 backdrop-blur-sm">
            Nº {String(ticket.index).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {ticket.routeLine ? (
          <p className="truncate font-mono text-[10px] tracking-[0.16em] text-secondary uppercase">
            {ticket.routeLine}
          </p>
        ) : null}
        <h3 className="mt-1.5 font-display text-[1.35rem] leading-snug font-medium text-balance">
          {ticket.title}
        </h3>

        {/* the perforation — where you'd tear the stub */}
        <div aria-hidden className="mt-auto border-t-2 border-dotted border-border-subtle pt-3.5" />

        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground tabular-nums uppercase">
            {facts.map((fact, i) => (
              <span key={fact}>
                {i > 0 ? (
                  <span aria-hidden className="mx-2 opacity-40">
                    ▪
                  </span>
                ) : null}
                {fact}
              </span>
            ))}
          </p>
          <span
            aria-hidden
            className="text-base text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
