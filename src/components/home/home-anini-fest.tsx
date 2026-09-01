import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Ticket } from "lucide-react";
import {
  awfArtists,
  awfEdition,
  awfHeroImages,
  awfMeta,
  awfPasses,
  awfPassPartners,
  awfSharedTransfer,
} from "@/data/festivals/anini-winter-fest";

const facts = [
  { label: "When", value: awfMeta.dates.label },
  {
    label: "Where",
    value: `${awfMeta.location}, ${awfMeta.state} · ${awfMeta.elevation}`,
  },
  { label: "Lineup", value: `${awfArtists.length} artists across two days` },
  { label: "Getting there", value: "385 km from Dibrugarh, over Mayodia Pass" },
];

const relatedLinks = [
  {
    name: "The road to Anini",
    note: "NH-313 in nine chapters",
    href: "/guides/dibrugarh-to-anini",
  },
  {
    name: "Anini travel guide",
    note: "Stays, seasons, experiences",
    href: "/places/anini",
  },
  {
    name: "Arunachal ILP",
    note: "Must mention Dibang Valley",
    href: "/permits/arunachal-pradesh-ilp",
  },
];

// The flagship partnership, and the most time-sensitive thing on the site.
// Deliberately the one dark band high on the page: a night festival should
// not be rendered on cream, and the tonal break stops the paper sections
// running together. Disappears entirely once the edition is past — the
// dedicated page handles the evergreen pivot.
export function HomeAniniFest() {
  if (awfEdition.status === "past") {
    return null;
  }

  const cheapestPass = Math.min(...awfPasses.map((pass) => pass.price));

  return (
    <section
      aria-labelledby="anini-fest-heading"
      className="relative isolate overflow-hidden bg-ink-band text-paper"
    >
      <Image
        src={awfHeroImages.desktop.src}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-[0.28]"
        loading="lazy"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(14,26,21,0.94)_0%,rgba(14,26,21,0.80)_28%,rgba(14,26,21,0.78)_62%,rgba(14,26,21,0.96)_100%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-8 sm:py-28 md:px-10 lg:px-16 lg:py-36 xl:px-24">
        <header>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-brass/40 px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-brass sm:text-[10px]">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ember" />
            Official Travel &amp; Taxi Partner
          </p>

          <h2
            id="anini-fest-heading"
            className="mt-6 max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.94] tracking-[-0.045em] text-paper"
          >
            {awfMeta.name}{" "}
            <span className="font-display font-normal italic text-[#F2E5C8]">
              {awfMeta.edition}
            </span>
          </h2>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ember sm:text-[11px]">
            {awfMeta.dates.label}
            <span aria-hidden="true" className="text-paper/30"> · </span>
            {awfMeta.location}
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="max-w-[38rem] text-[15px] leading-7 text-paper/[0.78] sm:text-base sm:leading-8">
              Two days of music on a plateau at 1,970 m, 385 km beyond the last
              city, built with the Idu Mishmi community. We are not the
              promoter — we are the reason you arrive. Shared convoys from
              Dibrugarh, private vehicles, stays, permits and the valley
              afterwards.
            </p>

            <div className="mt-8 grid max-w-[34rem] grid-cols-1 gap-2.5 sm:flex sm:gap-3">
              <Link
                href="/anini-winter-fest-2026"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] bg-paper px-6 text-[13px] font-semibold text-ink transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink-band sm:text-sm"
              >
                Explore the festival
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>

              <Link
                href={`/book/${awfSharedTransfer.slug}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border border-paper/40 bg-paper/[0.06] px-6 text-[13px] font-medium text-paper backdrop-blur-[2px] transition-colors duration-200 hover:border-paper/80 hover:bg-paper/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink-band sm:text-sm"
              >
                <Ticket aria-hidden="true" className="h-4 w-4" />
                Shared convoy · ₹{awfSharedTransfer.price.toLocaleString("en-IN")}
              </Link>
            </div>

            <p className="mt-5 text-[12.5px] leading-6 text-paper/[0.5]">
              Festival passes from ₹{cheapestPass.toLocaleString("en-IN")} are
              sold by {awfPassPartners.join(" and ")}, not by us. Supported by{" "}
              {awfMeta.supporters.join(", ")}.
            </p>
          </div>

          <dl className="lg:col-span-5">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[7rem_1fr] gap-4 border-t border-paper/[0.14] py-4"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/45">
                  {fact.label}
                </dt>
                <dd className="text-[14px] leading-6 text-paper/[0.86]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Lineup ─────────────────────────────────────────────────── */}
        <div className="mt-16 sm:mt-20">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
              The {awfMeta.year} lineup
            </h3>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-paper/35">
              Verified {awfMeta.lineupVerified}
            </p>
          </div>

          <ul className="rail -mx-5 gap-4 px-5 pb-1 scroll-pl-5 sm:-mx-8 sm:px-8 sm:scroll-pl-8 md:-mx-10 md:px-10 md:scroll-pl-10 lg:-mx-16 lg:px-16 lg:scroll-pl-16 xl:-mx-24 xl:px-24 xl:scroll-pl-24">
            {awfArtists.map((artist) => (
              <li
                key={artist.name}
                className="w-[44vw] shrink-0 snap-start sm:w-[28vw] lg:w-[196px]"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[14px] bg-paper/[0.06] ring-1 ring-paper/[0.12]">
                  <Image
                    src={artist.image}
                    alt={artist.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 196px, (min-width: 640px) 28vw, 44vw"
                    style={
                      artist.imagePosition
                        ? { objectPosition: artist.imagePosition }
                        : undefined
                    }
                    className="object-cover"
                    loading="lazy"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,26,21,0.94)_0%,rgba(14,26,21,0.74)_22%,rgba(14,26,21,0.34)_44%,rgba(14,26,21,0.04)_66%,transparent_80%)]"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-ink-band/70 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-paper/80 backdrop-blur-[2px]">
                    Day {artist.day}
                  </span>
                  {artist.headliner && (
                    <span className="absolute right-3 top-3 rounded-full bg-ember px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink-band">
                      Headliner
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[15px] font-medium leading-tight tracking-[-0.02em] text-paper">
                      {artist.name}
                    </p>
                    <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/55">
                      {artist.genre}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Everything the festival needs you to already know ──────── */}
        <ul className="mt-14 grid gap-x-8 border-t border-paper/[0.14] pt-8 sm:grid-cols-3">
          {relatedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-center justify-between gap-4 border-b border-paper/[0.1] py-4 transition-colors duration-200 hover:text-paper sm:block sm:border-0 sm:py-0"
              >
                <span className="flex items-center gap-1.5 text-[15px] text-paper/[0.88] transition-colors duration-200 group-hover:text-[#F2E5C8]">
                  {link.name}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper/40 sm:mt-1.5 sm:block">
                  {link.note}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
