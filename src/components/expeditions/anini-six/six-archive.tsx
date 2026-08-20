import { sixArchive } from "@/data/expeditions/anini-six-atlas";
import { Plate } from "./plate";

export function SixArchive() {
  return (
    <section
      aria-labelledby="six-archive-title"
      className="relative overflow-hidden bg-[#F3EEE2] py-20 text-[#111C18] sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9A5B36]">
              The archive
            </p>
            <h2
              id="six-archive-title"
              className="mt-4 text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.05em]"
            >
              Horizon{" "}
              <span className="font-serif font-normal italic text-[#7A4E2E]">
                country
              </span>
            </h2>
          </div>
          <p className="max-w-[30rem] text-[0.98rem] leading-7 text-[#3D4B44]">
            Photographs from the route, every one of them printed to the same
            plate. Each caption names the place it was taken — if we cannot say
            where a frame is from, it does not go on this page.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 lg:grid-cols-4">
          {sixArchive.map((frame, index) => (
            <Plate
              key={`${frame.src}-${index}`}
              frame={frame}
              sizes="(min-width: 1024px) 23vw, 46vw"
              index={String(index + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
