import Link from "next/link";
import { cn } from "@/lib/utils";

/* The Travelspire mark, redrawn as vector in the icon language: the open
   ring of the original logo, a ridgeline and the first sun. Ring and sun take
   the brand colour; the ridge takes the text colour, so it works on any
   ground in either theme. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-9 shrink-0", className)}
    >
      <path d="M5.3 28.5A17 17 0 1 1 34.7 28.5" className="stroke-brand" strokeWidth="2.4" />
      <path d="M8 28.5 15.5 16.5l4.4 6.6 3.4-4.3 8.7 9.7" stroke="currentColor" strokeWidth="2.4" />
      <path d="M12.6 21.2l1.8 1.3 1.7-1.1 1.6.9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="26.5" cy="12.5" r="2.4" className="fill-brand" />
      <path d="M6 32.5h28" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Travelspire Northeast — home"
      className={cn(
        "inline-flex shrink-0 items-center gap-2.5 rounded-control text-fg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-canvas",
        className,
      )}
    >
      <LogoMark />
      <span className="flex flex-col font-ui leading-none">
        <span className="text-[1.0625rem] font-semibold tracking-[-0.01em]">Travelspire</span>
        <span className="mt-1 text-eyebrow uppercase text-fg-subtle">Northeast</span>
      </span>
    </Link>
  );
}
