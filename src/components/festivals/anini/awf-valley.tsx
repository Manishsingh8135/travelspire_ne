import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { awfGallery, awfStayLonger } from "@/data/festivals/anini-winter-fest";

export function AwfValley() {
  return (
    <section
      aria-labelledby="awf-valley-title"
      className="bg-[#f1ebdf] py-20 text-[#17221b] sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
            Destination highlights
          </p>
          <h2
            id="awf-valley-title"
            className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em]"
          >
            Dibang{" "}
            <span className="font-serif font-normal italic text-[#76533e]">
              in frames
            </span>
          </h2>
          <p className="mt-6 max-w-[36rem] text-base leading-7 text-[#5a655e] sm:text-lg sm:leading-8">
            Arunachal&apos;s largest district. Forests over 80% of its land,
            rivers that have never seen a dam, skies that have never known smog
            — and fewer than one person per square kilometre.
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-14 grid grid-cols-2 gap-3 lg:mt-16 lg:grid-cols-4">
          {awfGallery.map((frame, index) => (
            <figure
              key={frame.src + index}
              className={
                index === 0 || index === 5
                  ? "group relative col-span-2 aspect-[16/10] overflow-hidden rounded-[16px] bg-[#ddd3bf]"
                  : "group relative aspect-[4/5] overflow-hidden rounded-[16px] bg-[#ddd3bf]"
              }
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(23,34,27,0.55)_100%)]" />
              <figcaption className="absolute bottom-3.5 left-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90">
                {frame.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Reasons to stay longer — decisions start with seeing the place. */}
        <div className="mt-16 lg:mt-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h3 className="text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[0.98] tracking-[-0.045em]">
                Reasons to{" "}
                <span className="font-serif font-normal italic text-[#76533e]">
                  stay longer
                </span>
              </h3>
              <p className="mt-5 max-w-[30rem] text-base leading-7 text-[#5a655e]">
                The festival is two days. Dibang Valley is a lifetime. Most of
                these need 3–5 extra days — we recommend arriving by 17
                September.
              </p>
            </div>
            <Link
              href="/tours/anini-pomo-grassland-expedition"
              className="group inline-flex items-center justify-between gap-5 rounded-[12px] bg-[#17241d] px-5 py-4 text-[#f5efe2] transition-colors duration-200 hover:bg-[#24352b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87543a] lg:col-span-5"
            >
              <span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#cdb783]">
                  Extend with Travelspire
                </span>
                <span className="mt-1 block text-sm font-semibold">
                  Six Days in the Dibang · 5N/6D · from ₹18,999
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 flex-none transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {awfStayLonger.map((reason) => (
              <li
                key={reason.index}
                className="group relative min-h-[28rem] overflow-hidden rounded-[14px] bg-[#17241d] shadow-[8px_22px_44px_-28px_rgba(23,36,29,0.75)]"
              >
                <Image
                  src={reason.images[0].src}
                  alt={reason.images[0].alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  style={{
                    objectPosition: reason.images[0].position ?? "center",
                  }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,17,13,0.04)_0%,rgba(10,17,13,0.12)_42%,rgba(10,17,13,0.96)_100%)]" />

                <div className="absolute right-4 top-4 h-24 w-28 overflow-hidden rounded-[10px] border border-white/25 bg-[#29372f] shadow-[0_14px_28px_-12px_rgba(0,0,0,0.75)] sm:h-28 sm:w-32">
                  <Image
                    src={reason.images[1].src}
                    alt={reason.images[1].alt}
                    fill
                    sizes="128px"
                    className="object-cover"
                    style={{
                      objectPosition: reason.images[1].position ?? "center",
                    }}
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 text-[#f6f0e5] sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold tracking-[0.16em] text-[#d8bd84]">
                      {reason.index}
                    </span>
                    <span className="h-px w-7 bg-[#d8bd84]/50" />
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/60">
                      {reason.tier}
                    </p>
                  </div>
                  <h4 className="mt-3 max-w-[16ch] text-[1.65rem] font-semibold leading-[1.02] tracking-[-0.035em]">
                    {reason.title}
                  </h4>
                  <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
                    {reason.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-semibold uppercase tracking-[0.1em] text-white/58"
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-8 max-w-[52rem] text-xs leading-5 text-[#7a7263]">
          Honest tiers: samplers bolt onto the festival weekend; the Roing
          buffer is a single extra day before the climb; expeditions like Seven
          Lakes, the Dri Valley trek and Athu Popu run 7–11 days with guides,
          fitness requirements, permits and cultural protocols — they are
          journeys in their own right, and Athu Popu is a sacred route, not a
          sightseeing add-on.
        </p>
      </div>
    </section>
  );
}
