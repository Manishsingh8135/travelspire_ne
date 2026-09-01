import { circuitMechukaArchive } from "@/data/expeditions/mechuka-dong-anini";
import { Plate } from "@/components/expeditions/anini-six/plate";
import { getPlaceImageBySrc } from "@/data/seo/image-seo-data";

export function CircuitGallery() {
  return (
    <section
      id="mechuka-photographs"
      aria-labelledby="circuit-gallery-title"
      className="bg-[#f6f1e7] text-[#13211b]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:px-16 lg:py-28 xl:px-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9b5636]">
              Mechuka in the field
            </p>
            <h2
              id="circuit-gallery-title"
              className="mt-4 max-w-[14ch] text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.05em]"
            >
              The western valley,{" "}
              <span className="font-serif font-normal italic text-[#7b5c3e]">
                as it actually looks.
              </span>
            </h2>
          </div>
          <p className="max-w-[30rem] text-base leading-7 text-[#536059]">
            Recent photographs from Mechuka — the Yargyap Chu, the golden
            Buddha, Dorjeeling, the helicopter landmark and winter snow on the
            pines. These are the days 01–05 landscape, not stock.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 lg:grid-cols-4">
          {circuitMechukaArchive.map((frame, index) => (
            <Plate
              key={frame.src}
              frame={frame}
              sizes="(min-width: 1024px) 23vw, 46vw"
              index={String(index + 1).padStart(2, "0")}
              caption={getPlaceImageBySrc(frame.src)?.title ?? frame.place}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
