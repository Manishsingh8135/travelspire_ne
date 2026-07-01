import Link from "next/link";
import { cn } from "@/lib/cn";

/** Compass-rose mark. Inherits `currentColor` so the consumer sets the tone. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <circle cx="16" cy="16" r="14.25" stroke="currentColor" strokeWidth="1.25" opacity="0.55" />
      <path
        d="M16 4.5 L17.7 14.3 L27.5 16 L17.7 17.7 L16 27.5 L14.3 17.7 L4.5 16 L14.3 14.3 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Brand lockup — compass mark + wordmark. Used in the nav and footer.
 * Wordmark in tracked Hanken caps; the "Northeast India" line in mono.
 */
export function BrandLogo({
  className,
  subtitle = true,
  onClick,
}: {
  className?: string;
  subtitle?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Travelspire — Northeast India, home"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-sm text-current transition-opacity hover:opacity-90",
        className,
      )}
    >
      <BrandMark className="size-8 shrink-0" />
      <span className="flex flex-col">
        <span className="font-sans text-base leading-none font-semibold tracking-[0.18em] uppercase">
          Travelspire
        </span>
        {subtitle ? (
          <span className="mt-1 font-mono text-[0.6rem] leading-none tracking-[0.28em] uppercase opacity-65">
            Northeast India
          </span>
        ) : null}
      </span>
    </Link>
  );
}
