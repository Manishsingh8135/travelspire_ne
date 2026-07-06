import { Check } from "lucide-react";

export type Variant = {
  name: string;
  price: number;
  days?: number | null;
  nights?: number | null;
  note?: string | null;
  inclusions?: string[];
};

/**
 * Packages/tiers table (docs-new/07-pages/10 §25): tier name, what you get,
 * ₹ in mono, per-row ask. Desktop: ruled rows. Mobile: stacked tier cards —
 * same markup, container-driven. Real variants only (festival packages).
 */
export function VariantTable({
  variants,
  whatsAppHref,
}: {
  variants: Variant[];
  whatsAppHref: (variantName: string) => string;
}) {
  if (!variants.length) return null;
  return (
    <section className="flex flex-col gap-5" aria-label="Packages">
      <h2 className="font-display text-2xl font-medium sm:text-3xl">Packages</h2>
      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card shadow-panel">
        {variants.map((variant, i) => (
          <div
            key={variant.name}
            className={
              "flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6" +
              (i > 0 ? " border-t border-border-subtle" : "")
            }
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-lg font-medium">{variant.name}</h3>
                {variant.days ? (
                  <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                    {variant.days}D{variant.nights != null ? `/${variant.nights}N` : ""}
                  </span>
                ) : null}
              </div>
              {variant.note ? (
                <p className="mt-1 text-sm text-pretty text-muted-foreground">{variant.note}</p>
              ) : null}
              {variant.inclusions?.length ? (
                <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
                  {variant.inclusions.map((inc) => (
                    <li
                      key={inc}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <Check aria-hidden className="size-3 shrink-0 text-success" />
                      {inc}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center justify-between gap-5 sm:flex-col sm:items-end sm:gap-2">
              <p className="font-display text-xl font-medium tabular-nums">
                ₹{variant.price.toLocaleString("en-IN")}
              </p>
              <a
                href={whatsAppHref(variant.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center rounded-full border border-secondary/40 px-4 py-1.5 text-xs font-semibold tracking-wide text-secondary uppercase transition-colors outline-none hover:bg-secondary/10 focus-visible:ring-2 focus-visible:ring-ring"
              >
                Ask availability
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
