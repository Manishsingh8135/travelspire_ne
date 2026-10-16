import * as React from "react";
import { IconWhatsApp } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ButtonLink, buttonVariants } from "./button";
import { formatInr } from "./content";

/* The one persistent action on a product page. It owns the WhatsApp slot,
   so pages that render it hide the floating widget instead of stacking two
   buttons in the same corner. `floating` pins it to the viewport on phones. */
type PriceBarProps = {
  title: string;
  price: number;
  unit?: string;
  bookHref: string;
  bookLabel?: string;
  whatsappHref: string;
  floating?: boolean;
  className?: string;
};

export function PriceBar({
  title,
  price,
  unit = "per person",
  bookHref,
  bookLabel = "Book now",
  whatsappHref,
  floating = false,
  className,
}: PriceBarProps) {
  return (
    <div
      data-price-bar={floating ? "floating" : ""}
      className={cn(
        "flex items-center justify-between gap-4 rounded-panel border border-line bg-surface-raised/95 p-3 pl-5 font-ui shadow-e3 backdrop-blur",
        floating && "fixed inset-x-3 bottom-3 z-40 md:hidden",
        className,
      )}
    >
      <div className="min-w-0">
        <p className="truncate text-caption text-fg-subtle">{title}</p>
        <p className="whitespace-nowrap text-caption text-fg-muted">
          <span className="text-h4 font-semibold text-fg tabular-nums">{formatInr(price)}</span> {unit}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ask on WhatsApp"
          className={buttonVariants({ variant: "secondary", size: "icon" })}
        >
          <IconWhatsApp />
        </a>
        <ButtonLink href={bookHref}>{bookLabel}</ButtonLink>
      </div>
    </div>
  );
}
