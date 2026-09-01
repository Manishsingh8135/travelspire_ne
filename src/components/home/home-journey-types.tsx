import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { homeJourneyTypes, type HomeJourneyType } from "@/data/home/homepage";
import { createCustomItineraryURL } from "@/lib/whatsapp";

// The photograph is the card. Text sits over the lower third rather than in a
// panel beneath it, and every tile is the same size at every breakpoint — a
// mixed grid made this read as a layout accident rather than a set of choices.
function JourneyTypeCard({ type }: { type: HomeJourneyType }) {
  return (
    <Link
      href={type.href}
      aria-label={`${type.title} — ${type.linkLabel}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-[16px] bg-paper-deep ring-1 ring-ink/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss"
    >
      <Image
        src={type.image}
        alt={type.imageAlt}
        fill
        sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 78vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,26,21,0.90)_0%,rgba(14,26,21,0.74)_16%,rgba(14,26,21,0.44)_34%,rgba(14,26,21,0.16)_52%,rgba(14,26,21,0.02)_70%,transparent_84%)]"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="text-[1.3rem] font-medium leading-tight tracking-[-0.025em] text-paper sm:text-2xl">
          {type.title}
        </h3>
        <p className="mt-2 text-[13px] leading-5 text-paper/[0.72]">
          {type.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#E4D3AC] transition-colors duration-200 group-hover:text-paper">
          {type.linkLabel}
          <ArrowUpRight
            aria-hidden="true"
            className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

export function HomeJourneyTypes() {
  // Custom journeys is a call to action, not a category — pulling it out of
  // the grid is what makes the remaining four divide evenly.
  const categories = homeJourneyTypes.filter((type) => !type.external);
  const custom = homeJourneyTypes.find((type) => type.external);

  return (
    <section
      aria-labelledby="journey-types-heading"
      className="bg-paper-soft py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
              Choose your kind of journey
            </p>
            <h2
              id="journey-types-heading"
              className="max-w-[16ch] text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink"
            >
              Four ways in,{" "}
              <span className="font-display font-normal italic text-clay">
                or one of your own.
              </span>
            </h2>
          </div>
          <p className="max-w-[26rem] text-[15px] leading-7 text-ink-soft">
            Long circuits, high treks, slow cultural travel and festival
            seasons — and when none of them fit, we build the route around you.
          </p>
        </header>

        <div className="rail -mx-5 gap-5 px-5 pb-1 scroll-pl-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4 lg:gap-6">
          {categories.map((type) => (
            <div
              key={type.title}
              className="w-[78vw] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <JourneyTypeCard type={type} />
            </div>
          ))}
        </div>

        {custom && (
          <a
            href={createCustomItineraryURL()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${custom.title} — ${custom.linkLabel} on WhatsApp (opens in a new tab)`}
            className="group relative mt-6 block overflow-hidden rounded-[16px] bg-paper-deep ring-1 ring-ink/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss lg:mt-6"
          >
            <div className="relative aspect-[16/9] sm:aspect-[21/7] lg:aspect-[24/6]">
              <Image
                src={custom.image}
                alt={custom.imageAlt}
                fill
                sizes="100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,26,21,0.90)_0%,rgba(14,26,21,0.72)_38%,rgba(14,26,21,0.34)_68%,rgba(14,26,21,0.18)_100%)]"
              />

              <div className="absolute inset-0 flex flex-col justify-center gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:px-12">
                <div className="max-w-[34rem]">
                  <h3 className="text-[1.35rem] font-medium leading-tight tracking-[-0.025em] text-paper sm:text-[1.75rem]">
                    {custom.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-6 text-paper/[0.74] sm:text-sm">
                    {custom.description}
                  </p>
                </div>
                <span className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-[8px] bg-paper px-5 text-[13px] font-semibold text-ink transition-colors duration-200 group-hover:bg-white sm:self-auto sm:px-6 sm:text-sm">
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  {custom.linkLabel}
                </span>
              </div>
            </div>
          </a>
        )}
      </div>
    </section>
  );
}
