import { Clock3, MapPin, Moon, Navigation } from "lucide-react";
import {
  circuitChapters,
  circuitDays,
} from "@/data/expeditions/mechuka-dong-anini";

const chapterTone = {
  mechuka: {
    badge:
      "bg-[#ead9b7] text-[#3f2c1d] shadow-[0_9px_18px_-12px_rgba(60,35,14,0.85)]",
    number: "text-[#9b5636]",
  },
  dong: {
    badge:
      "bg-[#bcd7d2] text-[#17302c] shadow-[0_9px_18px_-12px_rgba(12,45,39,0.85)]",
    number: "text-[#3d7970]",
  },
  anini: {
    badge:
      "bg-[#cbd6b9] text-[#24311d] shadow-[0_9px_18px_-12px_rgba(33,52,25,0.85)]",
    number: "text-[#687f4b]",
  },
} as const;

export function CircuitItinerary() {
  return (
    <section
      id="journey"
      aria-labelledby="itinerary-title"
      className="scroll-mt-20 bg-[#f6f1e7] text-[#13211b]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:px-16 lg:py-32 xl:px-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9b5636]">
              The complete route
            </p>
            <h2
              id="itinerary-title"
              className="mt-4 max-w-[12ch] text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.058em]"
            >
              Thirteen days,
              <span className="block font-serif font-normal italic text-[#7b5c3e]">
                without the blur.
              </span>
            </h2>
          </div>
          <p className="max-w-[34rem] text-base leading-7 text-[#536059] lg:col-span-4">
            The route below is the promised shape of the trip. Within a day, the
            driver may reorder stops for weather, road access and daylight—the
            honest way to run remote Arunachal.
          </p>
        </div>

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {circuitChapters.map((chapter) => {
            const days = circuitDays.filter(
              (day) => day.chapter === chapter.id,
            );
            const tone = chapterTone[chapter.id as keyof typeof chapterTone];

            return (
              <section
                key={chapter.id}
                aria-labelledby={`chapter-${chapter.id}`}
                className="grid gap-9 lg:grid-cols-12 lg:gap-12"
              >
                <header className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <span
                      className={`inline-flex rounded-[8px] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] ${tone.badge}`}
                    >
                      {chapter.days}
                    </span>
                    <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8c735d]">
                      {chapter.eyebrow}
                    </p>
                    <h3
                      id={`chapter-${chapter.id}`}
                      className="mt-3 max-w-[12ch] text-[2.5rem] font-medium leading-[0.96] tracking-[-0.05em] sm:text-5xl"
                    >
                      {chapter.place}
                    </h3>
                    <p className="mt-5 max-w-[25rem] text-sm leading-6 text-[#5c6861]">
                      {chapter.description}
                    </p>
                  </div>
                </header>

                <ol className="space-y-4 lg:col-span-8">
                  {days.map((day) => (
                    <li
                      id={`day-${String(day.day).padStart(2, "0")}`}
                      key={day.day}
                      className="scroll-mt-28 rounded-[14px] bg-white/[0.72] p-5 shadow-[0_20px_45px_-38px_rgba(26,40,33,0.72)] sm:p-7"
                    >
                      <div className="grid gap-5 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-7">
                        <div>
                          <p
                            className={`font-mono text-[2.4rem] leading-none tracking-[-0.08em] ${tone.number}`}
                          >
                            {String(day.day).padStart(2, "0")}
                          </p>
                          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7f8a84]">
                            Day
                          </p>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#718078]">
                            <span className="inline-flex items-center gap-1.5">
                              <Navigation
                                aria-hidden="true"
                                className="h-3.5 w-3.5"
                              />
                              {day.from} → {day.to}
                            </span>
                            {day.journey && (
                              <span className="inline-flex items-center gap-1.5">
                                <Clock3
                                  aria-hidden="true"
                                  className="h-3.5 w-3.5"
                                />
                                {day.journey}
                              </span>
                            )}
                          </div>

                          <h4 className="mt-3 text-[1.65rem] font-medium leading-[1.05] tracking-[-0.04em] text-[#17251f] sm:text-[2rem]">
                            {day.title}
                          </h4>
                          <p className="mt-4 max-w-[46rem] text-[0.94rem] leading-7 text-[#53615a]">
                            {day.summary}
                          </p>

                          {day.departure && (
                            <p className="mt-4 inline-flex items-center gap-2 rounded-[8px] bg-[#efe6d5] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.11em] text-[#6f5035] shadow-[0_8px_17px_-14px_rgba(50,30,14,0.8)]">
                              <Clock3
                                aria-hidden="true"
                                className="h-3.5 w-3.5"
                              />
                              {day.departure}
                            </p>
                          )}

                          <div className="mt-5 flex flex-wrap gap-2">
                            {day.stops.map((stop) => (
                              <span
                                key={stop}
                                className="inline-flex items-center gap-1.5 rounded-[7px] bg-[#e9eee9] px-2.5 py-1.5 text-[10px] font-medium text-[#405047] shadow-[0_7px_16px_-14px_rgba(17,32,24,0.9)]"
                              >
                                <MapPin
                                  aria-hidden="true"
                                  className="h-3 w-3 text-[#7e5a3d]"
                                />
                                {stop}
                              </span>
                            ))}
                          </div>

                          <div className="mt-5 flex flex-col gap-3 border-t border-[#203229]/10 pt-4 sm:flex-row sm:items-start sm:justify-between">
                            <p className="inline-flex items-center gap-2 text-xs font-semibold text-[#2f4037]">
                              <Moon
                                aria-hidden="true"
                                className="h-3.5 w-3.5 text-[#9b5636]"
                              />
                              {day.stay}
                            </p>
                            {day.note && (
                              <p className="max-w-[29rem] text-xs leading-5 text-[#7a6654] sm:text-right">
                                {day.note}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
