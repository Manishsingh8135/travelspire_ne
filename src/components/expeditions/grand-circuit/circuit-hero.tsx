import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowDown, MessageCircle } from "lucide-react";
import {
  circuitFacts,
  circuitHero,
  circuitMeta,
} from "@/data/expeditions/mechuka-dong-anini";
import { createGrandCircuitInquiryURL } from "@/lib/whatsapp";

export function CircuitHero() {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: circuitHero.desktop.src,
    alt: circuitHero.alt,
    width: circuitHero.desktop.width,
    height: circuitHero.desktop.height,
    quality: 82,
    sizes: "100vw",
    priority: true,
  });

  const { props: mobileImageProps } = getImageProps({
    src: circuitHero.mobile.src,
    alt: circuitHero.alt,
    width: circuitHero.mobile.width,
    height: circuitHero.mobile.height,
    quality: 80,
    sizes: "100vw",
    priority: true,
  });

  return (
    <section
      aria-labelledby="circuit-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#07110f] text-[#f7f0e3]"
    >
      <picture className="absolute inset-0">
        <source
          media="(min-width: 768px)"
          srcSet={desktopSrcSet}
          sizes="100vw"
        />
        <img
          {...mobileImageProps}
          alt={circuitHero.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[50%_54%] md:object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,10,0.82)_0%,rgba(4,12,10,0.18)_27%,rgba(4,12,10,0.52)_56%,rgba(4,12,10,0.98)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_72%_at_22%_72%,rgba(5,15,12,0.76)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 pb-6 pt-28 sm:px-8 sm:pb-8 md:px-10 md:pt-32 lg:px-16 xl:px-24">
        <div className="flex items-start justify-between gap-5">
          <p className="max-w-[34rem] font-mono text-[9px] uppercase leading-4 tracking-[0.18em] text-[#edd39b] sm:text-[10px] sm:tracking-[0.22em]">
            {circuitMeta.route}
          </p>
          <p className="hidden shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 sm:block">
            {circuitMeta.duration}
          </p>
        </div>

        <div className="flex flex-1 items-end py-12 sm:py-14 md:py-16">
          <div className="max-w-[74rem]">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f29a64] sm:text-[11px]">
              <span className="h-px w-8 bg-[#f29a64]/75" aria-hidden="true" />
              The grand Arunachal circuit
            </p>

            <h1
              id="circuit-title"
              className="max-w-[11ch] text-[clamp(3.35rem,14vw,6.2rem)] font-medium leading-[0.84] tracking-[-0.065em] text-[#fff9ed] md:max-w-none md:text-[clamp(5rem,8vw,8.6rem)]"
            >
              <span className="block md:inline">Mechuka</span>
              <span className="mx-2 font-serif font-normal italic text-[#e5c483] md:mx-4">
                ·
              </span>
              <span className="block md:inline">Dong</span>
              <span className="mx-2 font-serif font-normal italic text-[#e5c483] md:mx-4">
                ·
              </span>
              <span className="block md:inline">Anini</span>
              <span className="mt-5 block font-mono text-[0.18em] font-semibold uppercase leading-none tracking-[0.18em] text-[#f4e6c8]/[0.85] md:mt-7 md:text-[0.1em]">
                12 nights · 13 day tour package
              </span>
            </h1>

            <div className="mt-7 grid gap-6 md:grid-cols-[minmax(0,43rem)_auto] md:items-end md:gap-10">
              <p className="max-w-[43rem] text-[0.98rem] leading-7 text-white/[0.72] sm:text-[1.08rem] sm:leading-8">
                Thirteen days from monastery valley to India&apos;s far east,
                then across Mayodia into Dibang country. One vehicle, twelve
                nights, and enough time to experience each place as more than a
                photo stop.
              </p>

              <div className="grid grid-cols-2 gap-2.5 sm:flex">
                <a
                  href={createGrandCircuitInquiryURL({ kind: "general" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Enquire about the Mechuka Dong Anini tour on WhatsApp (opens in a new tab)"
                  className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-[10px] bg-[#f4e6c8] px-4 text-[13px] font-semibold text-[#07110f] shadow-[0_16px_30px_-20px_rgba(0,0,0,0.9)] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07110f] sm:min-w-[12rem] sm:px-6 sm:text-sm"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  Plan this circuit
                </a>
                <Link
                  href="#journey"
                  className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-[10px] bg-black/20 px-4 text-[13px] font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)] backdrop-blur-sm transition-colors duration-200 hover:bg-black/[0.35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-6 sm:text-sm"
                >
                  <ArrowDown aria-hidden="true" className="h-4 w-4" />
                  See all 13 days
                </Link>
              </div>
            </div>
          </div>
        </div>

        <dl
          aria-label="Tour quick facts"
          className="grid grid-cols-2 border-t border-white/[0.15] sm:grid-cols-4"
        >
          {circuitFacts.map((fact, index) => (
            <div
              key={fact.label}
              className={`py-3.5 sm:px-5 sm:py-4 ${
                index > 0 ? "sm:border-l sm:border-white/[0.12]" : ""
              }`}
            >
              <dd className="font-mono text-xl tracking-[-0.04em] text-[#fff9ed] sm:text-2xl">
                {fact.value}
                <span className="ml-1.5 text-[9px] uppercase tracking-[0.14em] text-[#e5c483]">
                  {fact.unit}
                </span>
              </dd>
              <dt className="mt-1 text-[9px] uppercase tracking-[0.13em] text-white/[0.48] sm:text-[10px]">
                {fact.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
