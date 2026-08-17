import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TourShowcaseHeaderProps {
  title: string;
  subtitle: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

export function TourShowcaseHeader({
  title,
  subtitle,
  actionHref,
  actionLabel,
  className,
}: TourShowcaseHeaderProps) {
  const finalSpace = title.lastIndexOf(" ");
  const lead = finalSpace > 0 ? title.slice(0, finalSpace) : title;
  const accent = finalSpace > 0 ? title.slice(finalSpace + 1) : "";

  return (
    <header
      className={cn(
        "mb-12 grid gap-7 md:mb-16 md:grid-cols-12 md:gap-8 lg:mb-20",
        className,
      )}
    >
      <div className="md:col-span-7">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d8c59d]">
          Curated departures
        </p>

        <h2 className="max-w-[12ch] text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.055em] text-[#f7f4ec]">
          <span>{lead}</span>{" "}
          {accent && (
            <span className="font-serif font-normal italic tracking-[-0.04em] text-[#dfcfab]">
              {accent}
            </span>
          )}
        </h2>
      </div>

      <div className="flex flex-col items-start justify-end md:col-span-5 md:pb-1">
        <p className="max-w-[36rem] text-base leading-7 text-white/[0.62] sm:text-lg sm:leading-8">
          {subtitle}
        </p>

        {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className="mt-6 inline-flex items-center gap-2 rounded-[10px] border border-white/[0.18] bg-white/[0.04] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#eee6d3] transition-colors duration-200 hover:border-[#d8c59d]/70 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6d8b8]"
          >
            {actionLabel}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        )}
      </div>
    </header>
  );
}
