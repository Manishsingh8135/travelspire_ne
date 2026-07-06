import { MessageCircle, ShieldCheck } from "lucide-react";

/**
 * The money rail (docs-new/07-pages/10 §20). Desktop: sticky right-rail card.
 * Mobile: fixed bottom bar, safe-area padded, thumb-reachable through the whole
 * read. WhatsApp is the primary action until Razorpay lands — then "Reserve"
 * drops into the same slots without redesign.
 */
export function StickyTripBar({
  priceInr,
  bestTime,
  whatsAppHref,
  title,
}: {
  priceInr: number | null;
  bestTime: string | null;
  whatsAppHref: string;
  title: string;
}) {
  const price = priceInr ? `₹${priceInr.toLocaleString("en-IN")}` : "Ask for price";
  return (
    <>
      {/* Desktop — sticky rail card */}
      <aside className="sticky top-24 hidden rounded-2xl border border-border-subtle bg-card p-6 shadow-lift lg:block">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          From
        </p>
        <p className="mt-1 font-display text-3xl font-medium tabular-nums">
          {price}
          <span className="ml-1.5 text-sm font-normal text-muted-foreground">/ person</span>
        </p>
        {bestTime ? (
          <p className="mt-2 font-mono text-xs tracking-wide text-secondary uppercase">
            Best window · {bestTime}
          </p>
        ) : null}
        <a
          href={whatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Plan ${title} on WhatsApp`}
          className="group mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-[opacity,transform] duration-150 ease-out outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px"
        >
          <MessageCircle className="size-4.5" />
          Plan this on WhatsApp
        </a>
        <p className="mt-3 text-center font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          Replies within the hour · IST daytime
        </p>
        <ul className="mt-5 flex flex-col gap-2 border-t border-border-subtle pt-4 text-xs text-muted-foreground">
          <li className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 shrink-0 text-secondary" /> Permits handled by us
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 shrink-0 text-secondary" /> Local crew, small groups
          </li>
        </ul>
      </aside>

      {/* Mobile — fixed bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle bg-card/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lift backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">From</p>
            <p className="font-display text-xl leading-none font-medium tabular-nums">{price}</p>
          </div>
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Plan ${title} on WhatsApp`}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px"
          >
            <MessageCircle className="size-4" />
            Plan on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
