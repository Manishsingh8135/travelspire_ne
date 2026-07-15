import type { Pricing } from "@/lib/tours/pricing";
import { availabilityUrl } from "@/lib/whatsapp";
import { WaxStamp } from "@/components/marketing/decor/wax-stamp";
import { cn } from "@/lib/cn";

/**
 * THE RATE CARD (08-blueprint/05 §3.8) — the pricing matrix as an official
 * document: a real <table> (screen-reader semantics), dotted row rules,
 * tabular mono rupees, a per-row WhatsApp ask that names the tier, and the
 * computed-honesty footnote ("FROM ₹X" = largest-group rate). Handles all
 * three data shapes: group+private matrix, festival variant tiers, and the
 * honest single-price fallback.
 */

type Row = {
  key: string;
  label: string;
  sub?: string | null;
  inclusions?: string[];
  priceInr: number;
  /** Tier name carried into the WhatsApp pre-fill. */
  tierAsk: string;
};

function rowsFrom(pricing: Pricing | null, priceInr: number | null): Row[] {
  if (pricing) {
    return pricing.modes.flatMap((mode): Row[] => {
      if (mode.mode === "group") {
        return mode.tiers.map((tier) => ({
          key: `group-${tier.groupSize}`,
          label: tier.groupSize > 0 ? `Group of ${tier.groupSize}` : (mode.label ?? "Group trip"),
          priceInr: tier.pricePax,
          tierAsk: tier.groupSize > 0 ? `group of ${tier.groupSize}` : "group",
        }));
      }
      if (mode.mode === "private") {
        return [
          {
            key: "private",
            label: mode.label ?? "Private",
            priceInr: mode.pricePax,
            tierAsk: mode.label ?? "private",
          },
        ];
      }
      return [
        {
          key: `variant-${mode.label}`,
          label: mode.label,
          sub:
            [
              mode.nights != null && mode.days != null ? `${mode.nights}N/${mode.days}D` : null,
              mode.description ?? null,
            ]
              .filter(Boolean)
              .join(" — ") || null,
          inclusions: mode.inclusions,
          priceInr: mode.pricePax,
          tierAsk: mode.label,
        },
      ];
    });
  }
  if (priceInr != null) {
    return [{ key: "flat", label: "Per person", priceInr, tierAsk: "standard" }];
  }
  return [];
}

export function RateCard({
  tourTitle,
  pricing,
  priceInr,
  className,
}: {
  tourTitle: string;
  pricing: Pricing | null;
  priceInr: number | null;
  className?: string;
}) {
  const rows = rowsFrom(pricing, priceInr);
  if (rows.length === 0) return null;

  const minRow = rows.reduce((a, b) => (b.priceInr < a.priceInr ? b : a));
  const season = `${new Date().getFullYear()}/${String(new Date().getFullYear() + 1).slice(2)}`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border-subtle bg-card shadow-panel",
        className,
      )}
    >
      <WaxStamp
        label="Rates"
        sub={season}
        className="absolute -top-3 -right-3 size-20 rotate-6 text-stone-400/50 dark:text-mist-300/40"
      />

      <div className="border-b border-border-subtle px-5 py-3.5 sm:px-6">
        <p className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase">Rate card</p>
        <p className="mt-0.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          Per person · INR
        </p>
      </div>

      <table className="w-full">
        <caption className="sr-only">
          {tourTitle} — rates per person by party or package
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Party or package</th>
            <th scope="col">Rate per person</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.key}
              className="border-b border-dotted border-border-subtle last:border-0"
            >
              <td className="px-5 py-4 align-top sm:px-6">
                <p className="font-mono text-xs font-medium tracking-[0.12em] uppercase">
                  {row.label}
                </p>
                {row.sub ? (
                  <p className="mt-1 max-w-md text-[13px] leading-snug text-pretty text-muted-foreground">
                    {row.sub}
                  </p>
                ) : null}
                {row.inclusions?.length ? (
                  <p className="mt-1.5 max-w-md font-mono text-[10px] leading-relaxed tracking-[0.08em] text-muted-foreground uppercase">
                    {row.inclusions.join(" · ")}
                  </p>
                ) : null}
                <a
                  href={availabilityUrl(tourTitle, row.tierAsk)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-mono text-[11px] font-medium tracking-[0.16em] text-secondary uppercase underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Ask availability →
                </a>
              </td>
              <td className="px-5 py-4 text-right align-top sm:px-6">
                <span className="font-mono text-base font-semibold tabular-nums">
                  ₹{row.priceInr.toLocaleString("en-IN")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="border-t border-border-subtle bg-muted/40 px-5 py-3 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase sm:px-6">
        {pricing
          ? `"From ₹${minRow.priceInr.toLocaleString("en-IN")}" = ${minRow.label} rate · no prepayment to ask`
          : "Group & private rates on WhatsApp · no prepayment to ask"}
      </p>
    </div>
  );
}
