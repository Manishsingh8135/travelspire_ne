import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* The brand globe, windowed out of the original PNG lockup. The PNG sets
   "NORTHEAST" in light grey, which disappears on a white header, so only the
   globe is shown and the words are typeset beside it in the text colour.

   In the 500×500 source the globe sits at x 112–386, y 109–333, with the
   wordmark starting immediately below it — hence the exact offsets below.
   Do not redraw this mark; it is the brand logo. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative block h-[37px] w-12 shrink-0 overflow-hidden", className)}>
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
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Travelspire Northeast — home"
      className={cn(
        "inline-flex shrink-0 items-center gap-2.5 rounded-control text-fg",
        "transition-opacity duration-200 hover:opacity-80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-canvas",
        className,
      )}
    >
      <LogoMark />
      <span className="flex flex-col gap-[5px]">
        <span className="text-[15px] font-semibold uppercase leading-none tracking-[0.18em] sm:text-base">
          Travelspire
        </span>
        {/* The rule flexes to fill the remaining width, so the second line
            always ends flush with the first without forced letter-spacing. */}
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-px flex-1 bg-current opacity-30" />
          <span className="font-mono text-[8.5px] uppercase leading-none tracking-[0.3em] opacity-65 sm:text-[9px]">
            Northeast
          </span>
        </span>
      </span>
    </Link>
  );
}
