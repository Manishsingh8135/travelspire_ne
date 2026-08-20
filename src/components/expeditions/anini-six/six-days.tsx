import Link from "next/link";
import { sixDays } from "@/data/expeditions/anini-six-days";
import { sixDayLead, sixDayStrips } from "@/data/expeditions/anini-six-atlas";
import { RATIO } from "@/lib/media";
import { Plate, PlateImage } from "./plate";

const TONE = {
  ink: {
    section: "bg-[#070E0D] text-[#F3EEE2]",
    kicker: "text-[#C9683A]",
    title: "text-[#F7F3E9]",
    serif: "text-[#D8BE8B]",
    body: "text-[#F3EEE2]/[0.66]",
    rule: "border-[#F3EEE2]/[0.14]",
    spine: "bg-[#D8BE8B]",
    note: "text-[#F3EEE2]/[0.45]",
    caption: "light" as const,
    hair: "bg-[#F3EEE2]/20",
    frame: "bg-[#0E1815]",
  },
  paper: {
    section: "bg-[#F3EEE2] text-[#111C18]",
    kicker: "text-[#9A5B36]",
    title: "text-[#111C18]",
    serif: "text-[#7A4E2E]",
    body: "text-[#3D4B44]",
    rule: "border-[#111C18]/[0.12]",
    spine: "bg-[#C9683A]",
    note: "text-[#111C18]/[0.45]",
    caption: "dark" as const,
    hair: "bg-[#111C18]/20",
    frame: "bg-[#E4DAC6]",
  },
  summit: {
    section: "bg-[#0A1210] text-[#F3EEE2]",
    kicker: "text-[#C9683A]",
    title: "text-[#F7F3E9]",
    serif: "text-[#D8BE8B]",
    body: "text-[#F3EEE2]/[0.66]",
    rule: "border-[#F3EEE2]/[0.14]",
    spine: "bg-[#C9683A]",
    note: "text-[#F3EEE2]/[0.45]",
    caption: "light" as const,
    hair: "bg-[#F3EEE2]/20",
    frame: "bg-[#111C18]",
  },
} as const;

export function SixDays() {
  return (
    <div>
      <nav
        aria-label="The six days"
        className="sticky top-[72px] z-30 border-y border-[#111C18]/[0.08] bg-[#E9E1CE]/95 text-[#111C18] backdrop-blur-md md:top-20"
      >
        <ol className="mx-auto flex w-full max-w-[1600px] gap-0 overflow-x-auto px-5 [scrollbar-width:none] sm:px-8 md:px-10 lg:px-16 xl:px-24 [&::-webkit-scrollbar]:hidden">
          {sixDays.map((day) => (
            <li key={day.n} className="flex-none sm:flex-1">
              <Link
                href={`#day-${day.n}`}
                className="group flex min-h-[3.5rem] flex-col justify-center border-r border-[#111C18]/[0.08] py-2 pr-6 last:border-r-0 sm:min-h-[4rem] sm:pr-4 lg:pr-8"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#9A5B36]">
                  {day.n}
                </span>
                <span className="mt-0.5 text-[12.5px] font-medium leading-4 tracking-[-0.02em] text-[#111C18] group-hover:text-[#7A4E2E] sm:text-[13px]">
                  {day.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      {sixDays.map((day) => {
        const tone = TONE[day.tone];
        const lead = sixDayLead[day.day];
        const strip = sixDayStrips[day.day] ?? [];
        const isSummit = day.tone === "summit";

        return (
          <article
            key={day.n}
            id={`day-${day.n}`}
            aria-labelledby={`day-${day.n}-title`}
            className={`relative scroll-mt-[9.5rem] overflow-hidden ${tone.section}`}
          >
            {/* The trek day opens full-bleed. It has earned it. */}
            {isSummit && (
              <div className="relative h-[80svh] min-h-[30rem] w-full">
                <PlateImage frame={lead} sizes="100vw" quality={82} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,16,0.34)_0%,rgba(10,18,16,0.06)_38%,rgba(10,18,16,0.95)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1600px] px-5 pb-10 sm:px-8 md:px-10 lg:px-16 xl:px-24">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9683A]">
                    Day {day.day} · {day.departs} · {day.from}
                  </p>
                  <p className="mt-3 max-w-[16ch] font-serif text-[clamp(3rem,10vw,7rem)] italic leading-[0.88] text-[#F7F3E9]">
                    {day.serif}
                  </p>
                </div>
              </div>
            )}

            <div className="relative mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 md:px-10 lg:px-16 lg:py-24 xl:px-24">
              {/* Every chapter runs the same way down the page: title, one wide
                  plate, then the reading column. No side-to-side ping-pong. */}
              <header className="grid gap-5 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <p
                    className={`font-mono text-[10px] uppercase tracking-[0.22em] ${tone.kicker}`}
                  >
                    Day {day.day} of 6 · leaves {day.departs}
                  </p>
                  <h2
                    id={`day-${day.n}-title`}
                    className={`mt-4 max-w-[18ch] text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[0.95] tracking-[-0.045em] ${tone.title}`}
                  >
                    {day.title}
                    {!isSummit && (
                      <span
                        className={`mt-2 block font-serif text-[0.55em] font-normal italic tracking-[-0.02em] ${tone.serif}`}
                      >
                        {day.serif}
                      </span>
                    )}
                  </h2>
                </div>

                <dl
                  className={`flex gap-10 border-t pt-4 lg:col-span-4 lg:justify-end lg:border-t-0 lg:pt-0 ${tone.rule}`}
                >
                  <div>
                    <dt
                      className={`font-mono text-[9px] uppercase tracking-[0.16em] ${tone.note}`}
                    >
                      From
                    </dt>
                    <dd className="mt-1 text-sm tracking-[-0.02em]">{day.from}</dd>
                  </div>
                  <div>
                    <dt
                      className={`font-mono text-[9px] uppercase tracking-[0.16em] ${tone.note}`}
                    >
                      Sleeps
                    </dt>
                    <dd className="mt-1 text-sm tracking-[-0.02em]">
                      {day.sleeps === "—" ? "Dibrugarh drop" : day.sleeps}
                    </dd>
                  </div>
                </dl>
              </header>

              {!isSummit && (
                <figure className="mt-9">
                  <div
                    className={`relative overflow-hidden rounded-[18px] ${tone.frame}`}
                    style={{ aspectRatio: RATIO.wide }}
                  >
                    <PlateImage
                      frame={lead}
                      sizes="(min-width: 1600px) 1520px, 100vw"
                      quality={80}
                    />
                  </div>
                  <figcaption
                    className={`mt-2.5 flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] ${tone.note}`}
                  >
                    <span>{lead.place}</span>
                    <span className="flex-none opacity-70">Plate {day.n}</span>
                  </figcaption>
                </figure>
              )}

              {/* Reading column: the prose sits in one measure, not wrapped
                  around a picture. */}
              <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
                <p
                  className={`max-w-[24ch] font-serif text-[clamp(1.5rem,2.6vw,2.1rem)] italic leading-[1.22] tracking-[-0.02em] lg:col-span-5 ${tone.title}`}
                >
                  {day.lede}
                </p>
                <div
                  className={`max-w-[38rem] space-y-5 text-[1rem] leading-8 lg:col-span-7 ${tone.body}`}
                >
                  <p>{day.story}</p>
                  <p>{day.closing}</p>
                </div>
              </div>

              {/* The rest of the day, in frames rather than sentences. */}
              {strip.length > 0 && (
                <div className="-mx-5 mt-12 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
                  {strip.slice(0, 3).map((frame, i) => (
                    <Plate
                      key={frame.src}
                      frame={frame}
                      sizes="(min-width: 640px) 31vw, 62vw"
                      captionTone={tone.caption}
                      figureClassName="w-[62vw] flex-none sm:w-auto"
                      index={String(i + 1).padStart(2, "0")}
                    />
                  ))}
                </div>
              )}

              <ol
                className={`mt-12 flex gap-0 overflow-x-auto border-t pt-8 [scrollbar-width:none] sm:mt-14 ${tone.rule} [&::-webkit-scrollbar]:hidden`}
              >
                {day.waypoints.map((point, i) => (
                  <li
                    key={point.name}
                    className="relative min-w-[9.5rem] flex-1 pr-8 last:pr-0"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-[5px] h-px ${
                        i === day.waypoints.length - 1 ? "w-0" : "w-full"
                      } ${tone.hair}`}
                    />
                    <span
                      aria-hidden="true"
                      className={`relative z-10 mb-4 block h-2.5 w-2.5 rounded-full ${tone.spine}`}
                    />
                    <p className="text-[0.95rem] font-medium tracking-[-0.02em] sm:text-base">
                      {point.name}
                    </p>
                    <p
                      className={`mt-1 max-w-[18ch] text-[12px] leading-5 ${tone.note}`}
                    >
                      {point.note}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        );
      })}
    </div>
  );
}
