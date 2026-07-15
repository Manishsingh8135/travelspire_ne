import Link from "next/link";
import type { Route } from "next";

/**
 * The page-turn (08-blueprint/05 §3.11) — the dossier ends the way a catalogue
 * page does: NEXT IN THE CATALOGUE, the next expedition's name set large, the
 * whole band a link.
 */
export function NextExpedition({ title, slug }: { title: string; slug: string }) {
  return (
    <Link
      href={`/tours/${slug}` as Route}
      className="group block border-t border-border-subtle outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="mx-auto flex max-w-[92rem] flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Next in the catalogue
          </p>
          <p className="mt-2 font-display text-2xl font-medium text-balance sm:text-3xl">
            {title}
          </p>
        </div>
        <span
          aria-hidden
          className="font-display text-3xl text-secondary transition-transform duration-200 group-hover:translate-x-2"
        >
          →
        </span>
      </div>
    </Link>
  );
}
