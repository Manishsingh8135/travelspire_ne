import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeAtlas, homeWiderNortheast } from "@/data/home/homepage";
import { cn } from "@/lib/utils";

export function HomeDestinationAtlas() {
  const [anchor, ...rest] = homeAtlas;

  return (
    <section
      aria-labelledby="destinations-heading"
      className="bg-[#050d0f] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d8c59d]">
              The destination atlas
            </p>
            <h2
              id="destinations-heading"
              className="max-w-[18ch] text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#fffdf7]"
            >
              Know the ground{" "}
              <span className="font-serif font-normal italic text-[#dfcfab]">
                before you go.
              </span>
            </h2>
          </div>
          <p className="max-w-[26rem] text-sm leading-6 text-white/[0.62]">
            Real destination guides written from the field — strongest on
            Arunachal Pradesh, our home ground.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:auto-rows-[250px]">
          {/* Anchor tile */}
          <Link
            href={anchor.href}
            aria-label={anchor.linkLabel}
            className="group relative col-span-2 block overflow-hidden rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c59d] lg:row-span-2"
          >
            <div className="relative aspect-[4/3] h-full lg:aspect-auto">
              <Image
                src={anchor.image}
                alt={anchor.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,15,0.05)_35%,rgba(5,13,15,0.85)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#fffdf7] sm:text-3xl">
                  {anchor.name}
                </h3>
                <p className="mt-1.5 max-w-[24rem] font-serif text-sm italic leading-6 text-white/[0.7] sm:text-base">
                  {anchor.whyGo}
                </p>
              </div>
            </div>
          </Link>

          {rest.map((destination) => (
            <Link
              key={destination.name}
              href={destination.href}
              aria-label={destination.linkLabel}
              className="group relative block overflow-hidden rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c59d]"
            >
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
                <Image
                  src={destination.image}
                  alt={destination.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,15,0.05)_35%,rgba(5,13,15,0.85)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <h3 className="text-base font-semibold tracking-[-0.015em] text-[#fffdf7] sm:text-lg">
                      {destination.name}
                    </h3>
                    <p className="mt-1 hidden font-serif text-[13px] italic leading-5 text-white/[0.62] sm:block">
                      {destination.whyGo}
                    </p>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mb-0.5 h-4 w-4 flex-none text-white/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f2ead8]"
                  />
                </div>
              </div>
            </Link>
          ))}

          {/* The wider Northeast — honest, quiet framing */}
          <div className="col-span-2 flex flex-col justify-center rounded-[14px] border border-white/[0.09] bg-[#0b1714] p-5 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d8c59d]">
              The wider Northeast
            </p>
            <p className="mt-2 text-[13px] leading-5 text-white/[0.55]">
              Festival reach and permit guidance — while our destination
              coverage keeps growing honestly.
            </p>
            <ul className="mt-4 space-y-2.5">
              {homeWiderNortheast.map((region) => (
                <li key={region.name}>
                  <Link
                    href={region.href}
                    className="group/link inline-flex items-baseline gap-2 text-sm text-white/[0.82] transition-colors duration-200 hover:text-[#f2ead8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c59d]"
                  >
                    <span className="font-medium">{region.name}</span>
                    <span
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-[0.12em] text-white/[0.4]",
                        "group-hover/link:text-white/[0.6]",
                      )}
                    >
                      {region.note}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
