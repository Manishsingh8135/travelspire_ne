import Image from "next/image";
import { sixGallery } from "@/data/expeditions/anini-six-days";

export function SixGallery() {
  const [hero, ...rest] = sixGallery;

  return (
    <section
      aria-labelledby="six-gallery-title"
      className="relative overflow-hidden bg-[#F3EEE2] py-20 text-[#111C18] sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9A5B36]">
              From the field
            </p>
            <h2
              id="six-gallery-title"
              className="mt-4 text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.05em]"
            >
              Horizon{" "}
              <span className="font-serif font-normal italic text-[#7A4E2E]">
                country
              </span>
            </h2>
          </div>
          <p className="max-w-[28rem] text-[0.98rem] leading-7 text-[#3D4B44]">
            Only photographs whose location we can stand behind. Pomo grassland,
            the Anini plateau, the ridges that hold both.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-12 sm:gap-4">
          <figure className="sm:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-auto sm:min-h-[36rem]">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                sizes="(min-width: 640px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#9A5B36]">
              {hero.caption}
            </figcaption>
          </figure>

          <div className="grid gap-3 sm:col-span-5 sm:grid-rows-2 sm:gap-4">
            {rest.slice(0, 2).map((frame) => (
              <figure key={frame.src}>
                <div className="relative min-h-[16rem] overflow-hidden">
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(min-width: 640px) 38vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#9A5B36]">
                  {frame.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          {rest.slice(2).map((frame) => (
            <figure key={frame.src} className="sm:col-span-4">
              <div className="relative min-h-[14rem] overflow-hidden sm:min-h-[18rem]">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#9A5B36]">
                {frame.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
