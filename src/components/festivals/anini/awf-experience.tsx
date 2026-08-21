import Image from "next/image";
import { Award, Leaf } from "lucide-react";
import { awfExperiences, awfMeta } from "@/data/festivals/anini-winter-fest";

export function AwfTrustStrip() {
  return (
    <section
      aria-label="Festival credentials"
      className="border-b border-white/[0.08] bg-[#050d0f] text-white"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-5 py-8 sm:px-8 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16 xl:px-24">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/[0.45]">
          Supported by{" "}
          <span className="text-white/[0.8]">
            {awfMeta.supporters.join(" · ")}
          </span>
        </p>
        <div className="flex flex-wrap gap-2.5">
          {awfMeta.awards.map((award) => (
            <p
              key={award.title}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#d8c59d]/25 bg-[#d8c59d]/[0.06] px-4 py-2"
            >
              <Award
                aria-hidden="true"
                className="h-3.5 w-3.5 flex-none text-[#d8c59d]"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#e7d9b8]">
                {award.title}
              </span>
              <span className="text-[9px] uppercase tracking-[0.12em] text-white/[0.4]">
                {award.body}
              </span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AwfExperience() {
  return (
    <section
      aria-labelledby="awf-experience-title"
      className="bg-[#f1ebdf] py-20 text-[#17221b] sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
            What to expect
          </p>
          <h2
            id="awf-experience-title"
            className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em]"
          >
            Music, wilderness,{" "}
            <span className="font-serif font-normal italic text-[#76533e]">
              and the tribe you came with
            </span>
          </h2>
          <p className="mt-6 max-w-[34rem] text-base leading-7 text-[#5a655e] sm:text-lg sm:leading-8">
            Anini is not a festival you attend. It is a festival you arrive at —
            after one of India&apos;s great road journeys — and share with the
            valley that hosts it.
          </p>
        </div>

        <p className="mt-10 text-[9px] font-bold uppercase tracking-[0.18em] text-[#87543a] sm:hidden">
          Swipe to explore <span aria-hidden="true">→</span>
        </p>
        <div className="-mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-16">
          {awfExperiences.map((experience) => (
            <article
              key={experience.index}
              className="group w-[84vw] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-[16px] bg-[#e7dece] shadow-[7px_14px_30px_-24px_rgba(35,47,39,0.45)] sm:w-auto sm:max-w-none sm:rounded-[18px]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={experience.image}
                  alt={experience.imageAlt}
                  fill
                  sizes="(min-width: 640px) 50vw, 84vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(23,34,27,0.35)_100%)]" />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b5a40]">
                  {experience.index} · {experience.tag}
                </p>
                <h3 className="mt-3 font-serif text-[1.75rem] font-normal italic leading-tight tracking-[-0.02em] text-[#17221b] sm:text-[2rem]">
                  {experience.title}
                </h3>
                <p className="mt-3 max-w-[40ch] text-sm leading-6 text-[#526057] sm:text-base sm:leading-7">
                  {experience.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6b5a43]">
          <Leaf aria-hidden="true" className="h-4 w-4 text-[#5c7250]" />
          Bamboo-built stages · no single-use plastic · leave Dibang lighter
        </p>
      </div>
    </section>
  );
}
