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
            <span className="font-serif font-normal italic text-[#76533e]">in frames</span>
          </h2>
          <p className="mt-6 max-w-[36rem] text-base leading-7 text-[#5a655e] sm:text-lg sm:leading-8">
            Arunachal&apos;s largest district. Forests over 80% of its land, rivers
            that have never seen a dam, skies that have never known smog — and fewer
            than one person per square kilometre.
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

        {/* Reasons to stay longer */}
        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <h3 className="text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              Reasons to{" "}
              <span className="font-serif font-normal italic text-[#76533e]">
                stay longer
              </span>
            </h3>
            <p className="mt-5 max-w-[30rem] text-base leading-7 text-[#5a655e]">
              The festival is two days. Dibang Valley is a lifetime. Most of these
              need 3–5 extra days — we recommend arriving by 17 September.
            </p>
            <Link
              href="/tours/anini-expedition"
              className="group mt-7 inline-flex items-center gap-3 rounded-[12px] bg-[#17241d] px-5 py-4 text-[#f5efe2] transition-colors duration-200 hover:bg-[#24352b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87543a]"
            >
              <span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#cdb783]">
                  Extend with Travelspire
                </span>
                <span className="mt-1 block text-sm font-semibold">
                  Anini Dibang Valley Expedition · 3D/2N · from ₹12,499
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 flex-none transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <ol className="grid gap-2.5 sm:grid-cols-2 lg:col-span-8">
            {awfStayLonger.map((reason) => (
              <li
                key={reason.index}
                className="rounded-[14px] bg-[#e7dece] p-6 shadow-[6px_12px_26px_-24px_rgba(37,46,39,0.5)]"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[10px] font-bold tracking-[0.14em] text-[#8b5a40]">
                    {reason.index}
                  </span>
                  <h4 className="text-[17px] font-semibold tracking-[-0.02em] text-[#17221b]">
                    {reason.title}
                  </h4>
                </div>
                <p className="mt-3 flex flex-wrap gap-1.5">
                  {reason.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#17241d]/[0.14] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#5a655e]"
                    >
                      {tag}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
