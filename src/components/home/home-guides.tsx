import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeGuides } from "@/data/home/homepage";

export function HomeGuides() {
  return (
    <section
      aria-labelledby="guides-heading"
      className="bg-[#050d0f] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d8c59d]">
              Field notes &amp; travel guides
            </p>
            <h2
              id="guides-heading"
              className="max-w-[18ch] text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#fffdf7]"
            >
              Useful long before{" "}
              <span className="font-serif font-normal italic text-[#dfcfab]">
                you book.
              </span>
            </h2>
          </div>
          <p className="max-w-[26rem] text-sm leading-6 text-white/[0.62]">
            Practical guides written from our own journeys — routes, seasons,
            permits and planning.
          </p>
        </header>

        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {homeGuides.map((guide) => (
            <li
              key={guide.href}
              className="w-[76vw] flex-none snap-start sm:w-[46vw] lg:w-auto"
            >
              <Link
                href={guide.href}
                className="group flex h-full flex-col overflow-hidden rounded-[14px] bg-[#0b1714] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c59d]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 46vw, 76vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold leading-6 tracking-[-0.015em] text-[#fffdf7]">
                    {guide.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-5 text-white/[0.58]">
                    {guide.value}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/70 transition-colors duration-200 group-hover:text-[#f2ead8]">
                    Read guide
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
