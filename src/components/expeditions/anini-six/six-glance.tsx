import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sixDays, sixMeta, sixVitals } from "@/data/expeditions/anini-six-days";
import { sixDayLead } from "@/data/expeditions/anini-six-atlas";
import { RATIO } from "@/lib/media";
import { PlateImage } from "./plate";

// One line per day, short enough to read at a glance. The long version lives
// in the chapter further down the page.
const GLANCE: Record<number, string> = {
  1: "385 km and one mountain pass",
  2: "Falls, the Dri, and a camp",
  3: "The trek. Twelve hours",
  4: "A side valley and a glass floor",
  5: "High meadows, then a bonfire",
  6: "Down the mountain, home",
};

export function SixGlance() {
  return (
    <section
      aria-labelledby="six-glance-title"
      className="relative overflow-hidden bg-[#F3EEE2] py-20 text-[#111C18] sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9A5B36]">
              The whole week, in one screen
            </p>
            <h2
              id="six-glance-title"
              className="mt-4 text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.05em]"
            >
              Six days,{" "}
              <span className="font-serif font-normal italic text-[#7A4E2E]">
                six frames
              </span>
            </h2>
          </div>
          <p className="max-w-[34rem] text-[1.02rem] leading-8 text-[#3D4B44] lg:col-span-5">
            Before any of the detail: this is what the week actually looks like,
            in order, one photograph per day. Everything below is the long version
            of these six pictures.
          </p>
        </div>

        {/* Six days, six plates — the visual table of contents. */}
        <ol className="-mx-5 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-6 [&::-webkit-scrollbar]:hidden">
          {sixDays.map((day) => (
            <li
              key={day.n}
              className="w-[62vw] flex-none snap-start sm:w-auto"
            >
              <Link
                href={`#day-${day.n}`}
                className="group block focus-visible:outline-none"
              >
                <div
                  className="relative overflow-hidden rounded-[18px] bg-[#E4DAC6] ring-1 ring-[#111C18]/10 transition-shadow duration-300 group-hover:shadow-[0_20px_40px_-24px_rgba(17,28,24,0.55)] group-focus-visible:ring-2 group-focus-visible:ring-[#C9683A]"
                  style={{ aspectRatio: RATIO.tall }}
                >
                  <PlateImage
                    frame={sixDayLead[day.day]}
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 31vw, 62vw"
                    className="transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,16,0)_42%,rgba(10,18,16,0.88)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#D8BE8B]">
                      Day {day.day}
                    </p>
                    <p className="mt-1 font-serif text-[1.3rem] italic leading-[1.05] text-[#F7F3E9]">
                      {day.title}
                    </p>
                  </div>
                </div>
                <p className="mt-2.5 text-[0.88rem] leading-5 text-[#3D4B44]">
                  {GLANCE[day.day]}
                </p>
              </Link>
            </li>
          ))}
        </ol>

        {/* The numbers, and the way in. */}
        <div className="mt-14 grid gap-8 border-t border-[#111C18]/12 pt-10 lg:grid-cols-12 lg:gap-12">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-5 lg:col-span-8">
            {sixVitals.map((vital) => (
              <div key={vital.label}>
                <dd className="flex items-baseline gap-1 font-mono text-2xl tracking-[-0.035em] text-[#111C18] sm:text-[1.75rem]">
                  {vital.value}
                  <span className="text-[0.5em] uppercase tracking-[0.12em] text-[#9A5B36]">
                    {vital.unit}
                  </span>
                </dd>
                <dt className="mt-1 text-[11px] font-medium uppercase leading-4 tracking-[0.1em] text-[#5A655E]">
                  {vital.label}
                </dt>
              </div>
            ))}
          </dl>

          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9A5B36]">
              {sixMeta.duration} · {sixMeta.season}
            </p>
            <p className="mt-2 font-mono text-[2.6rem] leading-none tracking-[-0.05em] text-[#111C18]">
              ₹{sixMeta.fromPrice.toLocaleString("en-IN")}
              <span className="ml-2 font-sans text-sm tracking-normal text-[#5A655E]">
                per person
              </span>
            </p>
            <Link
              href="#desk"
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#111C18] px-6 text-[13px] font-semibold text-[#F3EEE2] transition-colors hover:bg-[#1C2A24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9683A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EEE2]"
            >
              See what your party pays
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
