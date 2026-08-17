import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export type MediaTourCardMeta = {
  icon: LucideIcon;
  label: string;
};

export type TourBadgeTone =
  | "adventure"
  | "cultural"
  | "nature"
  | "pilgrimage"
  | "festival"
  | "activity";

const badgeToneStyles: Record<TourBadgeTone, string> = {
  adventure:
    "border-[#efb184]/45 bg-[#82442d]/90 text-[#fff4eb] shadow-[0_10px_30px_rgba(86,39,23,0.38)]",
  cultural:
    "border-[#cfadd7]/40 bg-[#69466f]/90 text-[#fbf0ff] shadow-[0_10px_30px_rgba(59,34,64,0.38)]",
  nature:
    "border-[#92c9aa]/40 bg-[#256247]/90 text-[#effcf4] shadow-[0_10px_30px_rgba(22,68,47,0.4)]",
  pilgrimage:
    "border-[#e2c47f]/45 bg-[#80612d]/90 text-[#fff8e8] shadow-[0_10px_30px_rgba(74,52,17,0.4)]",
  festival:
    "border-[#e2a3ba]/45 bg-[#7b3550]/90 text-[#fff0f5] shadow-[0_10px_30px_rgba(74,26,44,0.42)]",
  activity:
    "border-[#9fc5d5]/40 bg-[#315f72]/90 text-[#effaff] shadow-[0_10px_30px_rgba(25,58,72,0.42)]",
};

interface MediaTourCardProps {
  href: string;
  image: string;
  title: string;
  subtitle: string;
  location: string;
  eyebrow: string;
  badgeTone: TourBadgeTone;
  price: number;
  priceLabel?: string;
  actionLabel?: string;
  meta: MediaTourCardMeta[];
  className?: string;
}

const priceFormatter = new Intl.NumberFormat("en-IN");

export function MediaTourCard({
  href,
  image,
  title,
  subtitle,
  location,
  eyebrow,
  badgeTone,
  price,
  priceLabel = "Starting from",
  actionLabel = "View journey",
  meta,
  className,
}: MediaTourCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block h-[34rem] overflow-hidden rounded-[18px] bg-[#09120f]",
        "shadow-[0_16px_34px_-22px_rgba(0,0,0,0.72)] transition-shadow duration-300 hover:shadow-[12px_24px_48px_-20px_rgba(0,0,0,0.88)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6d8b8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07100d]",
        "sm:h-[36rem] lg:h-[36rem] xl:h-[38rem]",
        className,
      )}
    >
      <article className="relative h-full w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
          className="object-cover"
        />

        {/* The light map protects the text while leaving most of the photograph untouched. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,7,5,0.05)_0%,rgba(2,7,5,0.02)_36%,rgba(2,7,5,0.48)_62%,rgba(2,7,5,0.97)_100%)]" />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.06] group-focus-visible:bg-black/[0.06] motion-reduce:transition-none" />

        <span
          className={cn(
            "absolute left-5 top-5 z-10 max-w-[calc(100%-2.5rem)] truncate rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md sm:left-6 sm:top-6",
            badgeToneStyles[badgeTone],
          )}
        >
          {eyebrow}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.13em] text-white/[0.62]">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5 flex-none" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <h3 className="mt-2 max-w-[19ch] text-[1.75rem] font-medium leading-[1.02] tracking-[-0.045em] text-[#f7f4ec] sm:text-[2rem] lg:text-[2.2rem]">
            {title}
          </h3>

          <div className="mt-4 max-h-28 overflow-hidden opacity-100 transition-[max-height,opacity,margin] duration-300 md:mt-0 md:max-h-0 md:opacity-0 md:group-hover:mt-4 md:group-hover:max-h-28 md:group-hover:opacity-100 md:group-focus-visible:mt-4 md:group-focus-visible:max-h-28 md:group-focus-visible:opacity-100 motion-reduce:transition-none">
            <p className="line-clamp-1 max-w-[34rem] text-sm leading-5 text-white/[0.7] sm:line-clamp-2">
              {subtitle}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {meta.slice(0, 3).map((item, index) => {
                const Icon = item.icon;

                return (
                  <span
                    key={item.label}
                    className={cn(
                      "items-center gap-1.5 text-[11px] font-medium text-white/[0.64]",
                      index === 2 ? "hidden md:flex" : "flex",
                    )}
                  >
                    <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between gap-4 pt-1">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/[0.5]">
                {priceLabel}
              </p>
              <p className="mt-1 text-lg font-medium tracking-[-0.025em] text-white sm:text-xl">
                ₹{priceFormatter.format(price)}
              </p>
            </div>

            <span className="inline-flex h-11 min-w-[8.75rem] items-center justify-center gap-2 rounded-[10px] bg-[#eadfc8] px-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[#07100d] shadow-[0_10px_26px_rgba(0,0,0,0.24)] transition-colors duration-200 group-hover:bg-[#f7f1e5] group-focus-visible:bg-[#f7f1e5]">
              {actionLabel}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
