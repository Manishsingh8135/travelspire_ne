import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeGuides } from "@/data/home/homepage";

// Two big plates rather than four small ones. These guides are the strongest
// editorial work on the site and were being shown at thumbnail scale.
export function HomeGuides() {
  return (
    <section
      aria-labelledby="guides-heading"
      className="bg-paper py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
              Field notes &amp; travel guides
            </p>
            <h2
              id="guides-heading"
              className="max-w-[16ch] text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink"
            >
              Useful long before{" "}
              <span className="font-display font-normal italic text-clay">
                you book.
              </span>
            </h2>
          </div>
          <p className="max-w-[26rem] text-[15px] leading-7 text-ink-soft">
            Written from our own journeys — routes, seasons, permits and the
            practical detail nobody else publishes.
          </p>
        </header>

        <ul className="rail -mx-5 gap-5 px-5 pb-1 scroll-pl-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 sm:gap-6 lg:gap-8">
          {homeGuides.map((guide) => (
            <li
              key={guide.href}
              className="w-[86vw] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <Link
                href={guide.href}
                className="group relative block aspect-[4/3] overflow-hidden rounded-[20px] bg-paper-deep ring-1 ring-ink/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss"
              >
                <Image
                  src={guide.image}
                  alt={guide.imageAlt}
                  fill
                  sizes="(min-width: 640px) 48vw, 86vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,26,21,0.92)_0%,rgba(14,26,21,0.76)_18%,rgba(14,26,21,0.44)_38%,rgba(14,26,21,0.14)_58%,transparent_80%)]"
                />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-9">
                  <h3 className="text-[1.5rem] font-medium leading-tight tracking-[-0.03em] text-paper sm:text-[1.75rem] lg:text-[2.125rem]">
                    {guide.title}
                  </h3>
                  <p className="mt-2.5 max-w-[32rem] text-[13.5px] leading-6 text-paper/[0.74] sm:text-[15px] sm:leading-7">
                    {guide.value}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#E4D3AC] transition-colors duration-200 group-hover:text-paper">
                    Read the guide
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
