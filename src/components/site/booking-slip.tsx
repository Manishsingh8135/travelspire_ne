import { cn } from "@/lib/cn";

/**
 * THE BOOKING SLIP (08-blueprint/05 §3, persistent) — the money rail as a
 * physical slip: dotted perforation header, computed FROM price, one marigold
 * action. Desktop: sticky right-rail card. Mobile: fixed bottom bar,
 * safe-area padded, thumb-reachable through the whole read. WhatsApp is the
 * checkout until Razorpay — "Reserve" drops into the same slots later.
 */

function ChatGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M20.5 12a8.5 8.5 0 0 1-12.36 7.57L4 21l1.43-4.14A8.5 8.5 0 1 1 20.5 12Z" />
      <path d="M8.5 10.5h7M8.5 13.5h4.5" />
    </svg>
  );
}

const CTA_CLASS =
  "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-[background-color,transform] duration-150 ease-out outline-none hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px";

export function BookingSlip({
  fromInr,
  window: windowLabel,
  whatsAppHref,
  askHref,
  title,
  className,
}: {
  /** Computed from-price (tourFromPrice) — never the typed column alone. */
  fromInr: number | null;
  /** "OCT–NOV · MAR–APR" — best_time, uppercased by the caller. */
  window?: string | null;
  whatsAppHref: string;
  /** Quiet secondary — helloUrl(). */
  askHref: string;
  title: string;
  className?: string;
}) {
  const price = fromInr ? `₹${fromInr.toLocaleString("en-IN")}` : "Ask for price";
  return (
    <>
      {/* Desktop — the sticky slip */}
      <aside
        className={cn(
          "sticky top-24 hidden overflow-hidden rounded-xl border border-border-subtle bg-card shadow-lift lg:block",
          className,
        )}
      >
        <p className="border-b-2 border-dotted border-border-default px-6 py-3 font-mono text-[10px] font-medium tracking-[0.22em] text-muted-foreground uppercase">
          Booking slip
        </p>
        <div className="p-6">
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            From
          </p>
          <p className="mt-1 font-display text-3xl font-medium tabular-nums">
            {price}
            {fromInr ? (
              <span className="ml-1.5 text-sm font-normal text-muted-foreground">/ person</span>
            ) : null}
          </p>
          {windowLabel ? (
            <p className="mt-2.5 font-mono text-[11px] tracking-[0.14em] text-secondary uppercase">
              Window · {windowLabel}
            </p>
          ) : null}
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Plan ${title} on WhatsApp`}
            className={cn(CTA_CLASS, "mt-5 w-full")}
          >
            <ChatGlyph className="size-4.5" />
            Plan this on WhatsApp
          </a>
          <a
            href={askHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center text-sm font-medium text-secondary underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          >
            Just have a question? →
          </a>
          <p className="mt-4 border-t border-dotted border-border-default pt-3 text-center font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            Replies &lt; 2 hrs · IST daytime
          </p>
        </div>
      </aside>

      {/* Mobile — the fixed bottom slip */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-dotted border-border-default bg-card/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lift backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              From
            </p>
            <p className="font-display text-xl leading-none font-medium tabular-nums">{price}</p>
          </div>
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Plan ${title} on WhatsApp`}
            className={cn(CTA_CLASS, "shrink-0 px-5 py-2.5")}
          >
            <ChatGlyph className="size-4" />
            Plan on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
