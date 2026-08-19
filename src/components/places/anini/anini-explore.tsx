import Image from "next/image";
import { aniniFrames, aniniStats } from "@/data/places/anini";

export function AniniStatsBand() {
  return (
    <section
      aria-label="Dibang Valley in numbers"
      className="border-y border-white/[0.08] bg-[#050d0f] py-16 text-white sm:py-20"
    >
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-y-10 px-5 sm:px-8 md:px-10 lg:grid-cols-4 lg:px-16 xl:px-24">
        {aniniStats.map((stat) => (
          <div key={stat.label} className="pr-6">
            <p className="font-serif text-[clamp(2.6rem,4.5vw,4.2rem)] font-normal italic leading-none tracking-[-0.03em] text-[#f7f4ec]">
              {stat.value}
              <span className="ml-1.5 text-[0.38em] not-italic tracking-[0.08em] text-[#d8c59d]">
                {stat.unit}
              </span>
            </p>
            <p className="mt-3 max-w-[22ch] text-[10px] font-semibold uppercase leading-4 tracking-[0.16em] text-white/[0.45]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AniniFrames() {
  return (
    <section
      aria-labelledby="anini-frames-title"
      className="bg-[#050d0f] pb-20 pt-4 text-white sm:pb-24 lg:pb-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="anini-frames-title"
            className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.96] tracking-[-0.05em] text-[#f7f4ec]"
          >
            The valley{" "}
            <span className="font-serif font-normal italic text-[#dfcfab]">in frames</span>
          </h2>
          <p className="max-w-[30ch] text-xs leading-5 text-white/[0.42]">
            Every frame shot in Dibang Valley, captioned with the place it actually shows.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:mt-12">
          {aniniFrames.map((frame, index) => (
            <figure
              key={frame.src + index}
              className={
                index === 2 || index === 5
                  ? "group relative col-span-2 aspect-[16/10] overflow-hidden rounded-[16px] bg-[#101a14]"
                  : "group relative aspect-[4/5] overflow-hidden rounded-[16px] bg-[#101a14]"
              }
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(5,13,15,0.55)_100%)]" />
              <figcaption className="absolute bottom-3.5 left-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90">
                {frame.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
