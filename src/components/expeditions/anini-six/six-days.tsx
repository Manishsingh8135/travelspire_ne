import Image from "next/image";
import Link from "next/link";
import { sixDays } from "@/data/expeditions/anini-six-days";

const TONE = {
  ink: {
    section: "bg-[#070E0D] text-[#F3EEE2]",
    kicker: "text-[#C9683A]",
    title: "text-[#F7F3E9]",
    serif: "text-[#D8BE8B]",
    body: "text-[#F3EEE2]/[0.72]",
    rule: "border-[#F3EEE2]/[0.14]",
    number: "text-[#F3EEE2]/[0.07]",
    spine: "bg-[#D8BE8B]",
    note: "text-[#F3EEE2]/[0.48]",
  },
  paper: {
    section: "bg-[#F3EEE2] text-[#111C18]",
    kicker: "text-[#9A5B36]",
    title: "text-[#111C18]",
    serif: "text-[#7A4E2E]",
    body: "text-[#3D4B44]",
    rule: "border-[#111C18]/[0.12]",
    number: "text-[#111C18]/[0.06]",
    spine: "bg-[#C9683A]",
    note: "text-[#111C18]/[0.48]",
  },
  summit: {
    section: "bg-[#0A1210] text-[#F3EEE2]",
    kicker: "text-[#C9683A]",
    title: "text-[#F7F3E9]",
    serif: "text-[#D8BE8B]",
    body: "text-[#F3EEE2]/[0.72]",
    rule: "border-[#F3EEE2]/[0.14]",
    number: "text-[#F3EEE2]/[0.08]",
    spine: "bg-[#C9683A]",
    note: "text-[#F3EEE2]/[0.48]",
  },
} as const;

export function SixDays() {
  return (
    <div>
      <nav
        aria-label="The six days"
        className="border-y border-[#111C18]/[0.08] bg-[#E9E1CE] text-[#111C18]"
      >
        <ol className="mx-auto flex w-full max-w-[1600px] gap-0 overflow-x-auto px-5 [scrollbar-width:none] sm:px-8 md:px-10 lg:px-16 xl:px-24 [&::-webkit-scrollbar]:hidden">
          {sixDays.map((day) => (
            <li key={day.n} className="flex-none sm:flex-1">
              <Link
                href={`#day-${day.n}`}
                className="group flex min-h-[4.5rem] flex-col justify-center border-r border-[#111C18]/[0.08] py-3 pr-6 last:border-r-0 sm:min-h-[5.25rem] sm:pr-4 lg:pr-8"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#9A5B36]">
                  {day.n}
                </span>
                <span className="mt-1 text-[13px] font-medium leading-5 tracking-[-0.02em] text-[#111C18] group-hover:text-[#7A4E2E] sm:text-sm">
                  {day.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      {sixDays.map((day, index) => {
        const tone = TONE[day.tone];
        const isSummit = day.tone === "summit";
        const plateLeft = index % 2 === 1;

        return (
          <article
            key={day.n}
            id={`day-${day.n}`}
            aria-labelledby={`day-${day.n}-title`}
            className={`relative scroll-mt-24 overflow-hidden ${tone.section}`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute -right-6 top-8 font-serif text-[min(42vw,18rem)] italic leading-none ${tone.number} sm:right-8 sm:top-4`}
            >
              {day.n}
            </span>

            {isSummit && (
              <figure className="relative h-[72svh] min-h-[28rem] w-full">
                <Image
                  src={day.image}
                  alt={day.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,16,0.15)_0%,rgba(10,18,16,0.08)_40%,rgba(10,18,16,0.92)_100%)]" />
                <figcaption className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1600px] px-5 pb-8 sm:px-8 md:px-10 lg:px-16 xl:px-24">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9683A]">
                    Day {day.day} · {day.departs} start
                  </p>
                  <p className="mt-2 max-w-[22ch] font-serif text-[clamp(2.4rem,6vw,4.5rem)] italic leading-[0.92] text-[#F7F3E9]">
                    {day.serif}
                  </p>
                </figcaption>
              </figure>
            )}

            <div className="relative mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 md:px-10 lg:px-16 lg:py-24 xl:px-24">
              <div
                className={`grid items-start gap-10 lg:grid-cols-12 lg:gap-14 ${
                  isSummit ? "" : "lg:min-h-[28rem]"
                }`}
              >
                <header className="lg:col-span-4">
                  <p
                    className={`font-mono text-[10px] uppercase tracking-[0.22em] ${tone.kicker}`}
                  >
                    Day {day.day} · leaves {day.departs}
                  </p>
                  <h2
                    id={`day-${day.n}-title`}
                    className={`mt-4 max-w-[14ch] text-[clamp(2.1rem,4.6vw,3.4rem)] font-medium leading-[0.96] tracking-[-0.045em] ${tone.title}`}
                  >
                    {day.title}
                    <span
                      className={`mt-2 block font-serif text-[0.58em] font-normal italic tracking-[-0.02em] ${tone.serif}`}
                    >
                      {day.serif}
                    </span>
                  </h2>
                  <dl
                    className={`mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-6 ${tone.rule} sm:max-w-xs`}
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

                <div className="lg:col-span-8">
                  <p
                    className={`max-w-[34rem] font-serif text-[1.35rem] italic leading-[1.35] tracking-[-0.02em] sm:text-[1.55rem] ${tone.title}`}
                  >
                    {day.lede}
                  </p>
                  <div
                    className={`mt-8 max-w-[40rem] space-y-5 text-[1.02rem] leading-8 ${tone.body}`}
                  >
                    <p>{day.story}</p>
                    <p>{day.closing}</p>
                  </div>
                </div>
              </div>

              {!isSummit && (
                <figure
                  className={`relative mt-12 overflow-hidden sm:mt-16 ${
                    plateLeft ? "lg:mr-[8%]" : "lg:ml-[8%]"
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
                    <Image
                      src={day.image}
                      alt={day.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 80vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] ${tone.note}`}
                  >
                    <span>{day.imageAlt}</span>
                    <span className="flex-none">Plate {day.n}</span>
                  </figcaption>
                </figure>
              )}

              <ol
                className={`mt-12 flex gap-0 overflow-x-auto border-t pt-8 [scrollbar-width:none] sm:mt-16 ${tone.rule} [&::-webkit-scrollbar]:hidden`}
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
                      } ${day.tone === "paper" ? "bg-[#111C18]/20" : "bg-[#F3EEE2]/20"}`}
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
