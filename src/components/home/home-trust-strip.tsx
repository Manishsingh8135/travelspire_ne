import {
  FileCheck2,
  MapPin,
  ShieldCheck,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { homeTrustItems } from "@/data/home/homepage";

const icons: Record<string, LucideIcon> = {
  MapPin,
  FileCheck2,
  Users,
  ShieldCheck,
  Warehouse,
};

// One thin line directly under the hero caption. It exists to survive a
// second of scrutiny, so it stays factual and carries no numbers we cannot
// defend.
export function HomeTrustStrip() {
  return (
    <section aria-label="What Travelspire NE provides" className="bg-paper">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/10 py-6 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between lg:gap-x-8">
          {homeTrustItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.label} className="flex items-center gap-2.5">
                {Icon && (
                  <Icon
                    aria-hidden="true"
                    className="h-[15px] w-[15px] shrink-0 text-clay"
                  />
                )}
                <span className="text-[13px] leading-snug text-ink-soft">
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
