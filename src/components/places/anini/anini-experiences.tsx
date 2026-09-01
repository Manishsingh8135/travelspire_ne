import Image from "next/image";
import { aniniExperiences } from "@/data/places/anini";

export function AniniExperiences() {
  return (
    <section
      id="anini-experiences"
      aria-labelledby="anini-experiences-title"
      className="bg-[#f1ebdf] py-20 text-[#17221b] sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
              Signature experiences
            </p>
            <h2
              id="anini-experiences-title"
              className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em]"
            >
              What the valley{" "}
              <span className="font-serif font-normal italic text-[#76533e]">
                does to you
              </span>
            </h2>
          </div>
          <p className="max-w-[26rem] text-base leading-7 text-[#5a655e]">
            Seven ways in. None of them are checklists — each one is half a day to
            a full day of being somewhere that doesn&apos;t feel like anywhere else.
          </p>
        </div>

        {/* Big story cards — places are never chips */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16">
          {aniniExperiences.map((experience) => (
            <article
              key={experience.index}
              className="group relative flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-[18px] bg-[#0b1512] text-white shadow-[10px_22px_44px_-26px_rgba(35,47,39,0.5)] sm:min-h-[34rem]"
            >
              <Image
                src={experience.image}
                alt={experience.imageAlt}
                fill
                sizes="(min-width: 768px) 46vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,15,0.05)_30%,rgba(5,13,15,0.35)_58%,rgba(5,13,15,0.92)_100%)]" />

              <div className="relative p-7 sm:p-9">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8c59d]">
                  {experience.index}
                </p>
                <h3 className="mt-2.5 font-serif text-[2rem] font-normal italic leading-[1.05] tracking-[-0.02em] text-[#f7f4ec] sm:text-[2.4rem]">
                  {experience.title}
                </h3>
                <p className="mt-3 max-w-[44ch] text-[0.95rem] leading-6 text-white/[0.78] sm:text-base sm:leading-7">
                  {experience.story}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 border-t border-white/[0.18] pt-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#e7d9b8]">
                  {experience.meta}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
