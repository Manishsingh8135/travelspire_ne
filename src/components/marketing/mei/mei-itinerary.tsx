import Link from "next/link";
import type { Route } from "next";
import { CalendarDays, ArrowRight } from "lucide-react";

const DAYS = [
  { d: "Day 1", t: "Guwahati to Bhalukpong", s: "Riverside stay & local market" },
  { d: "Day 2", t: "Bhalukpong to Dirang", s: "Scenic drive & hot springs" },
  { d: "Day 3", t: "Dirang to Tawang", s: "Sela Pass & high-altitude views" },
  { d: "Day 4", t: "Tawang Exploration", s: "Monastery, war memorial & lake" },
  { d: "Day 5", t: "Zemithang Village Stay", s: "Offbeat, peaceful & authentic" },
  { d: "Day 6", t: "Shonga-tser Lake", s: "Alpine lake near Tawang" },
  { d: "Day 7", t: "Return to Guwahati", s: "Memories for a lifetime" },
];

/** The plan Mei builds — a clean 7-day timeline the chat produces. */
export function MeiItinerary() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-2.5">
        <CalendarDays className="size-4 text-pine-300" />
        <p className="font-display text-lg font-medium text-mist-50">Your 7-Day Plan</p>
      </div>
      <ol className="mt-5">
        {DAYS.map((day, i) => (
          <li key={day.d} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-pine-300 ring-4 ring-pine-300/15" />
              {i < DAYS.length - 1 ? <span className="w-px flex-1 bg-white/10" /> : null}
            </div>
            <div className={i < DAYS.length - 1 ? "pb-4" : ""}>
              <p className="font-mono text-[10px] tracking-[0.18em] text-pine-300 uppercase">
                {day.d}
              </p>
              <p className="mt-0.5 text-sm font-medium text-mist-50">{day.t}</p>
              <p className="text-xs text-mist-300">{day.s}</p>
            </div>
          </li>
        ))}
      </ol>
      <Link
        href={"/explore" as Route}
        className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-pine-200 outline-none hover:text-pine-100 focus-visible:ring-2 focus-visible:ring-ring"
      >
        View Full Itinerary
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
