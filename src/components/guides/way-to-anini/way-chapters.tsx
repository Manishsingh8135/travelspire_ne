import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { wayChapters } from "@/data/guides/way-to-anini";

// The nine chapters — alternating editorial blocks. Each pairs one visual
// beat (the story) with one operational truth box (the Travelspire protocol).

export function WayChapters() {
  return (
    <section aria-label="The nine chapters of the road" className="bg-[#f1ebdf] py-20 text-[#17221b] sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
            The road, chapter by chapter
          </p>
          <h2 className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em]">
            Every beat,{" "}
            <span className="font-serif font-normal italic text-[#76533e]">every truth</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#5a5344]">
            Each chapter below is one real stretch of the drive — what it looks like,
            and exactly what we do there. The story sells the road; the protocol is
            why you survive it smiling.
          </p>
        </div>

        <div className="mt-16 space-y-20 sm:space-y-24 lg:mt-20 lg:space-y-32">
          {wayChapters.map((chapter, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={chapter.index}
                id={`chapter-${chapter.index}`}
                aria-labelledby={`chapter-${chapter.index}-title`}
                className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-12 lg:gap-14"
              >
                <div className={`relative lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-[18px] shadow-[12px_26px_52px_-28px_rgba(35,47,39,0.5)]">
                    <Image
                      src={chapter.image}
                      alt={chapter.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 56vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <p
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-10 font-serif text-[6rem] italic leading-none text-[#17221b]/[0.08] sm:-top-14 sm:text-[9rem] ${
                      flip ? "right-2" : "left-2"
                    }`}
                  >
                    {chapter.index}
                  </p>
                </div>

                <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
                    Chapter {chapter.index}
                  </p>
                  <h3
                    id={`chapter-${chapter.index}-title`}
                    className="mt-3 font-serif text-[2.4rem] font-normal italic leading-[1.02] tracking-[-0.02em] sm:text-[2.9rem]"
                  >
                    {chapter.title}
                  </h3>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6c6552]">
                    {chapter.where}
                  </p>
                  <p className="mt-5 text-base leading-8 text-[#3d4238] sm:text-[1.05rem]">
                    {chapter.story}
                  </p>

                  <div className="mt-7 rounded-[14px] border border-[#d5c9ae] bg-[#faf7f0] p-5 sm:p-6">
                    <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#87543a]">
                      <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
                      {chapter.protocolLabel}
                    </p>
                    <p className="mt-2.5 text-sm leading-6 text-[#4a4638]">{chapter.protocol}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
