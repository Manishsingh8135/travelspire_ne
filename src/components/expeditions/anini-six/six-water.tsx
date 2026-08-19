import Image from "next/image";
import { sixWater } from "@/data/expeditions/anini-six-days";

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

        <ol className="relative mt-16 sm:mt-20">
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-[15px] top-2 w-px bg-[#111C18]/15 sm:left-[19px]"
          />

          {sixWater.entries.map((entry, index) => {
            const wide = entry.kind === "Falls" || entry.kind === "River";
            const flip = index % 2 === 1;

            return (
              <li
                key={entry.name}
                className={`relative grid items-center gap-6 py-8 sm:gap-10 sm:py-10 lg:grid-cols-12 ${
                  index === 0 ? "pt-0" : "border-t border-[#111C18]/[0.08]"
                }`}
              >
                <div
                  className={`flex gap-5 lg:col-span-5 ${
                    flip ? "lg:col-start-8 lg:row-start-1" : ""
                  }`}
                >
                  <span className="relative z-10 mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#F3EEE2] font-mono text-[10px] text-[#9A5B36] ring-1 ring-[#111C18]/15 sm:h-10 sm:w-10">
                    {entry.n}
                  </span>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#9A5B36]">
                      {entry.kind}
                    </p>
                    <h3 className="mt-2 font-serif text-[2rem] italic leading-none tracking-[-0.03em] sm:text-[2.45rem]">
                      {entry.name}
                    </h3>
                    <p className="mt-3 max-w-[32rem] text-[0.98rem] leading-7 text-[#3D4B44]">
                      {entry.note}
                    </p>
                  </div>
                </div>

                <figure
                  className={`lg:col-span-7 ${
                    flip ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden ${
                      wide
                        ? "aspect-[21/9] sm:aspect-[2.4/1]"
                        : "aspect-[16/10] sm:aspect-[21/10]"
                    }`}
                  >
                    <Image
                      src={entry.image}
                      alt={entry.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
