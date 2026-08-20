import { Check } from "lucide-react";
import {
  circuitChapters,
  circuitIntro,
} from "@/data/expeditions/mechuka-dong-anini";
import { PlateImage } from "@/components/expeditions/anini-six/plate";

const chapterBadge = {
  mechuka:
    "bg-[#f1e1be] text-[#3b2919] shadow-[0_9px_20px_-13px_rgba(43,27,12,0.9)]",
  dong: "bg-[#b8d8d3] text-[#102d2a] shadow-[0_9px_20px_-13px_rgba(5,32,29,0.95)]",
  anini:
    "bg-[#c8d5b6] text-[#1c2c17] shadow-[0_9px_20px_-13px_rgba(21,40,16,0.95)]",
} as const;

export function CircuitStory() {
  return (
    <>
      <section
        aria-labelledby="circuit-premise"
        className="bg-[#f2ecdf] text-[#12201b]"
      >
        <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-32 xl:px-24">
          <div className="lg:col-span-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9c5435]">
              {circuitIntro.kicker}
            </p>
            <h2
              id="circuit-premise"
              className="mt-5 max-w-[12ch] text-[clamp(2.8rem,6vw,5.7rem)] font-medium leading-[0.92] tracking-[-0.055em]"
            >
              {circuitIntro.title}
            </h2>
            <p className="mt-8 max-w-[46rem] text-xl leading-8 text-[#203029] sm:text-2xl sm:leading-9">
              {circuitIntro.lead}
            </p>
          </div>

          <div className="flex flex-col justify-end lg:col-span-5">
            <div className="space-y-5 text-[0.98rem] leading-7 text-[#405049]">
              {circuitIntro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-8 space-y-3 rounded-[14px] bg-[#e7ddcc] p-5 shadow-[0_24px_50px_-40px_rgba(24,38,31,0.8)] sm:p-6">
              {circuitIntro.truths.map((truth) => (
                <li
                  key={truth}
                  className="flex gap-3 text-sm leading-6 text-[#26372f]"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] bg-[#2e4a3c] text-[#f4ead7] shadow-[0_8px_15px_-10px_rgba(0,0,0,0.9)]">
                    <Check
                      aria-hidden="true"
                      className="h-3 w-3"
                      strokeWidth={2.4}
                    />
                  </span>
                  {truth}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="three-chapters"
        className="bg-[#0b1713] text-[#f5efe3]"
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:px-16 lg:py-28 xl:px-24">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d5ad69]">
                Three chapters
              </p>
              <h2
                id="three-chapters"
                className="mt-4 text-[clamp(2.7rem,5vw,5rem)] font-medium leading-[0.94] tracking-[-0.05em]"
              >
                The landscape changes.
                <span className="block font-serif font-normal italic text-[#d8c49e]">
                  The journey keeps going.
                </span>
              </h2>
            </div>
            <p className="max-w-[32rem] text-sm leading-6 text-white/[0.55] sm:text-base sm:leading-7">
              Each chapter gets its own days and its own pace. The photographs
              stay large because the places—not the card chrome—are the product.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-7">
            {circuitChapters.map((chapter) => (
              <article key={chapter.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] bg-[#13231d] shadow-[0_30px_60px_-42px_rgba(0,0,0,1)] lg:aspect-[4/5]">
                  <PlateImage
                    frame={chapter.frame}
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 100vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.018] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,13,10,0.22)_62%,rgba(5,13,10,0.96)_100%)]" />

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 sm:p-5">
                    <span
                      className={`rounded-[8px] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] ${chapterBadge[chapter.id as keyof typeof chapterBadge]}`}
                    >
                      {chapter.days}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/80 [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
                      {chapter.place}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#e8c77f]">
                      {chapter.eyebrow}
                    </p>
                    <h3 className="mt-2 max-w-[16ch] text-2xl font-medium leading-[1.05] tracking-[-0.035em] text-white sm:text-[1.75rem]">
                      {chapter.title}
                    </h3>
                  </div>
                </div>
                <p className="px-1 pt-4 text-sm leading-6 text-white/[0.52]">
                  {chapter.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
