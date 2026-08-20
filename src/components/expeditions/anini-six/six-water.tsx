import { sixWater } from "@/data/expeditions/anini-six-days";
import { sixWaterFrames } from "@/data/expeditions/anini-six-atlas";
import { RATIO } from "@/lib/media";
import { PlateImage } from "./plate";

export function SixWater() {
  return (
    <section
      aria-labelledby="six-water-title"
      className="relative overflow-hidden bg-[#F3EEE2] py-20 text-[#111C18] sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9A5B36]">
              {sixWater.kicker}
            </p>
            <h2
              id="six-water-title"
              className="mt-4 text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.05em]"
            >
              The water{" "}
              <span className="font-serif font-normal italic text-[#7A4E2E]">
                index
              </span>
            </h2>
          </div>
          <p className="max-w-[36rem] text-[1.02rem] leading-8 text-[#3D4B44] lg:col-span-7">
            {sixWater.standfirst}
          </p>
        </div>
      </div>

      {/* The seven stops read as one drive, left to right, in the order the
          road takes them — not as seven alternating slabs. */}
      {/* The rail bleeds past the container, but its first card must still line
          up with the heading above it on wide screens. */}
      <ol className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mt-16 sm:gap-5 sm:px-8 md:px-10 lg:px-16 xl:px-[max(6rem,calc((100vw-1600px)/2+6rem))] [&::-webkit-scrollbar]:hidden">
        {sixWater.entries.map((entry, index) => {
          const frame = sixWaterFrames[index] ?? sixWaterFrames[0];
          const last = index === sixWater.entries.length - 1;

          return (
            <li
              key={entry.name}
              className="w-[74vw] flex-none snap-start sm:w-[44vw] lg:w-[27vw] xl:w-[21rem]"
            >
              {/* Kilometre marker: the hairline runs on toward the next stop. */}
              <div className="flex items-center gap-3 pb-4">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#E4DAC6] font-mono text-[10px] text-[#7A4E2E] ring-1 ring-[#111C18]/12">
                  {entry.n}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-px flex-1 ${last ? "bg-transparent" : "bg-[#111C18]/15"}`}
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#9A5B36]">
                  {entry.kind}
                </span>
              </div>

              <figure className="group">
                <div
                  className="relative overflow-hidden rounded-[18px] bg-[#E4DAC6] ring-1 ring-[#111C18]/[0.08]"
                  style={{ aspectRatio: RATIO.tall }}
                >
                  <PlateImage
                    frame={frame}
                    sizes="(min-width: 1280px) 21rem, (min-width: 1024px) 27vw, (min-width: 640px) 44vw, 74vw"
                    className="transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <figcaption className="mt-4">
                  <h3 className="font-serif text-[1.85rem] italic leading-none tracking-[-0.03em] sm:text-[2.1rem]">
                    {entry.name}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-7 text-[#3D4B44]">
                    {entry.note}
                  </p>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ol>

      <p className="mx-auto mt-2 w-full max-w-[1600px] px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#111C18]/40 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        Scroll the valley floor →
      </p>
    </section>
  );
}
