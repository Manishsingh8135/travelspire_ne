import {
  FileCheck2,
  MapPin,
  ShieldCheck,
  Users,
  Warehouse,
} from "lucide-react";
import { homeTrustItems } from "@/data/home/homepage";

const icons = {
  MapPin,
  FileCheck2,
  Users,
  ShieldCheck,
  Warehouse,
} as const;

export function HomeTrustStrip() {
  return (
    <section
      aria-label="Why travellers trust Travelspire NE"
      className="border-b border-white/[0.08] bg-[#050d0f] text-white"
    >
      <ul className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-x-6 gap-y-4 px-5 py-6 sm:grid-cols-3 sm:px-8 md:px-10 lg:flex lg:flex-wrap lg:items-center lg:justify-between lg:px-16 lg:py-7 xl:px-24">
        {homeTrustItems.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li
              key={item.label}
              className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.04em] text-white/[0.66]"
            >
              <Icon
                aria-hidden="true"
                className="h-4 w-4 flex-none text-[#d8c59d]/80"
                strokeWidth={1.75}
              />
              {item.label}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
