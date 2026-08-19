import { HandHeart } from "lucide-react";
import { awfIduGlossary, awfLegacy } from "@/data/festivals/anini-winter-fest";
import { cn } from "@/lib/utils";

export function AwfPeople() {
  return (
    <section
      aria-labelledby="awf-people-title"
      className="bg-[#07100d] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Idu Mishmi */}
          <div className="lg:col-span-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
              The people
            </p>
            <h2
              id="awf-people-title"
              className="text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f7f4ec]"
            >
              The Idu{" "}
              <span className="font-serif font-normal italic text-[#dfcfab]">Mishmi</span>
            </h2>
            <p className="mt-6 max-w-[34rem] text-base leading-7 text-white/[0.62] sm:text-lg sm:leading-8">
              The indigenous people of Dibang Valley — one of India&apos;s smallest,
              most distinctive tribal communities. For centuries Idu lived only in
              speech and memory; a Roman script for the language was formally adopted
              in 2017, and its speakers&apos; knowledge of this forest remains
              unparalleled. The festival is built with the community&apos;s involvement
              and blessing, and a portion of every pass goes directly to local
              development.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-2.5">
              {awfIduGlossary.map((entry) => (
                <li
                  key={entry.word}
                  className="rounded-[12px] border border-white/[0.1] bg-[#0b1512] p-4"
                >
                  <p className="font-serif text-lg font-normal italic text-[#dfcfab]">
                    {entry.word}
                  </p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/[0.45]">
                    {entry.meaning}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-6 inline-flex items-start gap-2.5 text-[13px] leading-6 text-white/[0.5]">
              <HandHeart aria-hidden="true" className="mt-1 h-4 w-4 flex-none text-[#d8c59d]" />
              Greetings shared by the festival&apos;s Idu Mishmi community partners.
              Approach the community and their land with curiosity and respect — ask
              before photographing people, and join village visits with a guide.
            </p>
          </div>

          {/* Legacy timeline */}
          <div className="lg:col-span-7">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.4]">
              The journey so far
            </p>
            <h3 className="font-serif text-3xl font-normal italic tracking-[-0.02em] text-[#f7f4ec] sm:text-4xl">
              Four editions. One growing legacy.
            </h3>

            <ol className="mt-9 grid gap-2.5">
              {awfLegacy.map((chapter) => (
                <li
                  key={chapter.edition}
                  className={cn(
                    "flex flex-col gap-2 rounded-[14px] border p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6",
                    chapter.current
                      ? "border-[#d8c59d]/45 bg-[#141d16]"
                      : "border-white/[0.09] bg-[#0b1512]",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 flex-none items-center justify-center rounded-[10px] font-serif text-lg italic",
                      chapter.current
                        ? "bg-[#d8c59d] text-[#07100d]"
                        : "bg-white/[0.06] text-[#d8c59d]",
                    )}
                  >
                    {chapter.edition}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold tracking-[-0.01em] text-[#f7f4ec]">
                      {chapter.title}
                      {chapter.current && (
                        <span className="ml-2.5 rounded-full border border-[#d8c59d]/40 px-2.5 py-0.5 align-middle text-[8px] font-bold uppercase tracking-[0.14em] text-[#d8c59d]">
                          You are here
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-[13px] leading-5 text-white/[0.52]">
                      {chapter.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
