import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  homeAtlasAnchor,
  homeAtlasArunachal,
  homeAtlasCluster,
  type HomeAtlasDestination,
} from "@/data/home/homepage";

// Rails bleed to the screen edge so the next card peeks past it — that peek
// is the affordance, which is why there is no arrow and no scrollbar. The
// first card still lines up with the page gutter via scroll-padding.
const railClass =
  "rail -mx-5 gap-5 px-5 pb-1 scroll-pl-5 sm:-mx-8 sm:px-8 sm:scroll-pl-8 md:-mx-10 md:px-10 md:scroll-pl-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:px-0";

const railItemClass =
  "w-[78vw] shrink-0 snap-start sm:w-[54vw] md:w-[38vw] lg:w-auto lg:shrink";

function TierLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
      <span aria-hidden="true" className="h-px w-6 bg-ink/20" />
      {children}
    </h3>
  );
}

// ─── Atlas card ────────────────────────────────────────────────────────────
// The image IS the card — edge to edge, no mat, no ring, no paper body.
// Resting state shows only the name over a soft scrim. On hover or keyboard
// focus the deeper scrim rises and the copy opens in two beats: the blurb
// first, then a filled call-to-action button — not a bare text link — because
// this is a place we want people to actually go. The reveal is a CSS grid
// 0fr→1fr expand so the copy grows smoothly instead of jumping, and it keys
// off group-focus-visible so keyboard and (via the first tap) touch users get
// the same reveal as the mouse.
function AtlasCard({
  place,
  aspect,
  sizes,
}: {
  place: HomeAtlasDestination;
  aspect: string;
  sizes: string;
}) {
  return (
    <Link
      href={place.href}
      aria-label={`${place.name} — ${place.linkLabel}`}
      className={`group relative block overflow-hidden rounded-[16px] bg-ink-band shadow-card transition-[box-shadow] duration-300 ease-out hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${aspect}`}
    >
      <Image
        src={place.image}
        alt={place.imageAlt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
        loading="lazy"
      />

      {/* Resting scrim — just enough to hold the name. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,26,21,0.74)_0%,rgba(14,26,21,0.42)_24%,rgba(14,26,21,0.10)_46%,transparent_66%)]"
      />
      {/* Hover scrim — slides up to carry the description and the button. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,26,21,0.95)_0%,rgba(14,26,21,0.84)_38%,rgba(14,26,21,0.54)_64%,rgba(14,26,21,0.16)_100%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 sm:p-6">
        <h4 className="text-[1.25rem] font-medium leading-tight tracking-[-0.025em] text-paper sm:text-[1.375rem]">
          {place.name}
        </h4>

        <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
          <div className="overflow-hidden">
            <p className="pt-3 text-[13px] leading-6 text-paper/[0.88]">
              {place.whyGo}
            </p>
            <span className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-[8px] bg-paper px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-200 group-hover:bg-white">
              {place.linkLabel}
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function HomeDestinationAtlas() {
  return (
    <section
      id="destinations"
      aria-labelledby="destinations-heading"
      className="scroll-mt-24 bg-paper py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="max-w-[46rem]">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
            The atlas
          </p>
          <h2
            id="destinations-heading"
            className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink"
          >
            The valleys we{" "}
            <span className="font-display font-normal italic text-clay">
              come back to.
            </span>
          </h2>
          <p className="mt-6 max-w-[34rem] text-[15px] leading-7 text-ink-soft">
            Our work is concentrated in Arunachal Pradesh — the Dibang Valley
            above all — and reaches the wider Northeast through festivals and
            permit guidance.
          </p>
        </header>

        {/* ── The anchor ─────────────────────────────────────────────── */}
        <div className="mt-14 sm:mt-16">
          <TierLabel>Dibang Valley · our home ground</TierLabel>

          <Link
            href={homeAtlasAnchor.href}
            aria-label={`${homeAtlasAnchor.name} — ${homeAtlasAnchor.linkLabel}`}
            className="group relative block aspect-[4/3] overflow-hidden rounded-[20px] bg-ink-band shadow-card transition-[box-shadow] duration-300 ease-out hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:aspect-[16/9] lg:aspect-[16/7]"
          >
            <Image
              src={homeAtlasAnchor.image}
              alt={homeAtlasAnchor.imageAlt}
              fill
              sizes="(min-width: 1600px) 1504px, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
              loading="lazy"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,26,21,0.78)_0%,rgba(14,26,21,0.5)_22%,rgba(14,26,21,0.18)_46%,transparent_70%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,26,21,0.95)_0%,rgba(14,26,21,0.84)_36%,rgba(14,26,21,0.52)_62%,rgba(14,26,21,0.16)_100%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
            />

            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E4D3AC]">
                {homeAtlasAnchor.region}
              </p>
              <h4 className="mt-2.5 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.04em] text-paper">
                {homeAtlasAnchor.name}
              </h4>

              <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
                <div className="overflow-hidden">
                  <p className="max-w-[34rem] pt-4 text-[14px] leading-6 text-paper/[0.88] sm:text-[15px] sm:leading-7">
                    {homeAtlasAnchor.whyGo}
                  </p>
                  <span className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-[8px] bg-paper px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-200 group-hover:bg-white">
                    {homeAtlasAnchor.linkLabel}
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <div className={`mt-6 ${railClass}`}>
            {homeAtlasCluster.map((place) => (
              <div key={place.name} className={railItemClass}>
                <AtlasCard
                  place={place}
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 38vw, 78vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── The wider Arunachal catalogue ──────────────────────────── */}
        <div className="mt-20 sm:mt-24">
          <TierLabel>Across Arunachal</TierLabel>

          <div className={railClass}>
            {homeAtlasArunachal.map((place) => (
              <div key={place.name} className={railItemClass}>
                <AtlasCard
                  place={place}
                  aspect="aspect-[3/4]"
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 38vw, 78vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
