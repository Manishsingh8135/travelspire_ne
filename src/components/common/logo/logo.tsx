// components/common/logo/logo.tsx
//
// The globe mark comes from the brand PNG; the wordmark is typeset alongside
// it. The PNG is a full lockup with "NORTHEAST" set in light grey, which is
// invisible on the cream navbar — so the mark is windowed out of it and the
// words are set in currentColor instead. One component then serves the dark
// and light navbars at any size.
//
// In the 500×500 source the globe sits at x 112–386, y 109–333, with the
// wordmark starting immediately below it — hence the exact offsets below.
// A mark-only asset (ideally SVG) would let all of this go away.

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Travelspire North-East home"
      className={cn(
        "inline-flex shrink-0 items-center gap-2.5 text-[color:var(--nav-fg-strong)]",
        "transition-opacity duration-200 hover:opacity-80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--nav-ring)] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent",
        className,
      )}
    >
      <span className="relative block h-[37px] w-12 shrink-0 overflow-hidden">
        <Image
          src="/images/logo/Travelspire_ne_logo_new.png"
          alt=""
          aria-hidden="true"
          width={83}
          height={83}
          priority
          className="absolute left-[-18px] top-[-18px] max-w-none"
        />
      </span>

      <span className="flex flex-col gap-[5px]">
        <span className="text-[15px] font-semibold uppercase leading-none tracking-[0.18em] sm:text-base">
          Travelspire
        </span>
        {/* The rule flexes to fill the remaining width, so the second line
            always ends flush with the first without forced letter-spacing. */}
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-current opacity-30"
          />
          <span className="font-mono text-[8.5px] uppercase leading-none tracking-[0.3em] opacity-65 sm:text-[9px]">
            Northeast
          </span>
        </span>
      </span>
    </Link>
  );
}
