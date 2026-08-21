import { ArrowUpRight, ExternalLink, MessageCircle, Tent } from "lucide-react";
import {
  awfBookingSteps,
  awfPackagePlans,
  awfPassPartners,
  awfPasses,
} from "@/data/festivals/anini-winter-fest";
import { createAwfInquiryURL } from "@/lib/whatsapp";

const priceFormatter = new Intl.NumberFormat("en-IN");

function PassArtwork({ featured }: { featured?: boolean }) {
  const palette = featured
    ? {
        skyTop: "#07181a",
        skyBottom: "#244b45",
        sun: "#e8c980",
        farMountain: "#365d51",
        nearMountain: "#132d2c",
        foreground: "#081716",
        river: "#d9c28b",
      }
    : {
        skyTop: "#dec88f",
        skyBottom: "#91afa0",
        sun: "#f6e7bd",
        farMountain: "#719084",
        nearMountain: "#345c52",
        foreground: "#173b37",
        river: "#dce9df",
      };

  return (
    <div
      className="relative h-[13rem] overflow-hidden sm:h-[14.5rem]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 720 380"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient
            id={featured ? "festival-night-sky" : "explorer-day-sky"}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0" stopColor={palette.skyTop} />
            <stop offset="1" stopColor={palette.skyBottom} />
          </linearGradient>
          <linearGradient
            id={featured ? "festival-river" : "explorer-river"}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0" stopColor={palette.river} stopOpacity="0.18" />
            <stop offset="0.54" stopColor={palette.river} stopOpacity="0.92" />
            <stop offset="1" stopColor={palette.river} stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <rect
          width="720"
          height="380"
          fill={`url(#${featured ? "festival-night-sky" : "explorer-day-sky"})`}
        />
        <circle
          cx={featured ? "550" : "548"}
          cy={featured ? "90" : "104"}
          r={featured ? "43" : "54"}
          fill={palette.sun}
          opacity={featured ? "0.9" : "0.74"}
        />
        {featured && (
          <g fill="#f8efd7">
            <circle cx="92" cy="66" r="2.2" opacity="0.8" />
            <circle cx="176" cy="115" r="1.8" opacity="0.55" />
            <circle cx="286" cy="59" r="2.4" opacity="0.72" />
            <circle cx="414" cy="108" r="1.6" opacity="0.62" />
            <circle cx="655" cy="61" r="2" opacity="0.72" />
          </g>
        )}
        <path
          d="M0 220 86 153l61 37 88-110 99 112 73-63 92 73 81-104 140 126v156H0Z"
          fill={palette.farMountain}
          opacity="0.72"
        />
        <path
          d="M0 270 93 193l71 47 92-91 101 94 78-75 104 93 83-56 98 73v102H0Z"
          fill={palette.nearMountain}
        />
        <path
          d="M0 311c112-29 183-32 273-4 88 27 168 28 247-7 65-29 126-28 200 7v73H0Z"
          fill={palette.foreground}
        />
        <path
          d="M323 380c-9-52 6-81 53-112 38-25 52-47 61-78-4 44-17 72-45 99-34 33-32 60-19 91Z"
          fill={`url(#${featured ? "festival-river" : "explorer-river"})`}
        />

        {featured && (
          <g>
            <path d="M102 286h128l-15 94H119Z" fill="#0a1515" />
            <path
              d="M105 286c31-48 92-48 122 0"
              fill="none"
              stroke="#d9bd7c"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path d="m112 281 55-55 55 55Z" fill="#b36b42" opacity="0.9" />
            <circle cx="167" cy="279" r="17" fill="#efd08a" opacity="0.72" />
          </g>
        )}
      </svg>

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/[0.76]">
            Anini Winter Fest
          </p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
            Edition 05 · 2026
          </p>
        </div>
        <div className="border-l border-white/[0.34] pl-4 text-right">
          <p className="font-serif text-[2rem] leading-none text-white">
            {featured ? "19·20" : "19 / 20"}
          </p>
          <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-white/[0.7]">
            September
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 left-5 flex items-center gap-2 sm:left-6">
        <span className="h-px w-7 bg-white/[0.55]" />
        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/[0.72]">
          28.78° N · Dibang Valley
        </span>
      </div>
    </div>
  );
}

export function AwfPasses() {
  return (
    <section
      aria-labelledby="awf-passes-title"
      className="bg-[#050d0f] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
            Secure your spot
          </p>
          <h2
            id="awf-passes-title"
            className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f7f4ec]"
          >
            Passes, stays{" "}
            <span className="font-serif font-normal italic text-[#dfcfab]">
              and the way up
            </span>
          </h2>
          <p className="mt-6 max-w-[34rem] text-base leading-7 text-white/[0.6] sm:text-lg sm:leading-8">
            Limited capacity. Anini is remote — passes and beds sell out faster
            than you&apos;d expect. Two things to lock in: your festival pass,
            and your journey.
          </p>
        </div>

        {/* Festival passes */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:max-w-5xl">
          {awfPasses.map((pass) => (
            <article
              key={pass.name}
              className={
                pass.featured
                  ? "relative overflow-hidden rounded-[18px] border border-[#d8c59d]/40 bg-[#111d18] shadow-[0_24px_70px_-38px_rgba(216,197,157,0.44)]"
                  : "relative overflow-hidden rounded-[18px] border border-white/[0.13] bg-[#eee7d7] shadow-[0_24px_70px_-42px_rgba(0,0,0,0.9)]"
              }
            >
              <PassArtwork featured={pass.featured} />
              {pass.featured && (
                <span className="absolute left-5 top-[11.1rem] rounded-full bg-[#e5cf9d] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-[#07100d] shadow-[0_7px_24px_rgba(0,0,0,0.25)] sm:left-6 sm:top-[12.55rem]">
                  Most popular
                </span>
              )}
              <div className="relative p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className={`text-[9px] font-bold uppercase tracking-[0.22em] ${
                        pass.featured ? "text-[#d8c59d]" : "text-[#426158]"
                      }`}
                    >
                      {pass.span}
                    </p>
                    <h3
                      className={`mt-2 font-serif text-[2rem] font-normal italic leading-none tracking-[-0.025em] ${
                        pass.featured ? "text-[#f7f4ec]" : "text-[#102f2b]"
                      }`}
                    >
                      {pass.name}
                    </h3>
                  </div>
                  <p className="shrink-0 text-right">
                    <span
                      className={`block text-[2rem] font-medium leading-none tracking-[-0.05em] ${
                        pass.featured ? "text-white" : "text-[#102f2b]"
                      }`}
                    >
                      ₹{priceFormatter.format(pass.price)}
                    </span>
                    <span
                      className={`mt-1 block text-[10px] ${
                        pass.featured ? "text-white/[0.48]" : "text-[#426158]"
                      }`}
                    >
                      {pass.unit}
                    </span>
                  </p>
                </div>

                <div
                  className={`my-5 border-t border-dashed ${
                    pass.featured
                      ? "border-white/[0.16]"
                      : "border-[#173b37]/[0.2]"
                  }`}
                />

                <p
                  className={`max-w-[38ch] text-sm leading-6 ${
                    pass.featured ? "text-white/[0.62]" : "text-[#294a43]"
                  }`}
                >
                  {pass.blurb}
                </p>
                <p
                  className={`mt-5 flex min-h-11 w-full items-center justify-between rounded-[9px] px-4 text-[9px] font-bold uppercase tracking-[0.14em] ${
                    pass.featured
                      ? "bg-[#e5cf9d] text-[#07100d]"
                      : "bg-[#173b37] text-[#f7f1e4]"
                  }`}
                >
                  Book via {awfPassPartners.join(" or ")}
                  <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 max-w-[46rem] text-xs leading-5 text-white/[0.42]">
          Festival passes are sold by the festival&apos;s official booking
          partners, Zaatio and Baahi — not by Travelspire. What we handle is
          everything around the pass: the road, the stay, the permits and the
          valley.
        </p>

        {/* Stay + festival packages */}
        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          <div className="rounded-[18px] bg-[#101a14] p-7 sm:p-9 lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8c59d]">
              <Tent aria-hidden="true" className="h-4 w-4" />
              Stay + festival packages
            </p>
            <h3 className="mt-4 font-serif text-3xl font-normal italic tracking-[-0.02em] text-[#f7f4ec] sm:text-4xl">
              One WhatsApp message. Whole weekend sorted.
            </h3>
            <p className="mt-4 max-w-[46ch] text-sm leading-6 text-white/[0.6] sm:text-base sm:leading-7">
              Stay options (camps, homestays, lodges), festival logistics, ILP,
              transport and valley extensions — bundled by us into a single
              plan. Tell us your dates and group size; we come back with the
              full picture.
            </p>

            <div className="mt-7 grid gap-2.5 sm:grid-cols-3">
              {awfPackagePlans.map((plan) => (
                <a
                  key={plan.plan}
                  href={createAwfInquiryURL({
                    kind: "package",
                    plan: plan.plan,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[12px] border border-white/[0.12] bg-white/[0.03] p-5 transition-colors duration-200 hover:border-[#d8c59d]/50 hover:bg-[#d8c59d]/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6d8b8]"
                >
                  <p className="text-lg font-semibold tracking-[-0.02em] text-[#f7f4ec]">
                    {plan.plan}
                    {plan.recommended && (
                      <span className="ml-2 rounded-full bg-[#d8c59d] px-2 py-0.5 align-middle text-[8px] font-bold uppercase tracking-[0.12em] text-[#07100d]">
                        Best
                      </span>
                    )}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/[0.52]">
                    {plan.label}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#d8c59d]">
                    Ask for pricing
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </p>
                </a>
              ))}
            </div>

            <a
              href={createAwfInquiryURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#f2ead8] px-6 text-[11px] font-bold uppercase tracking-[0.13em] text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101a14]"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              Build my festival package
            </a>
          </div>

          {/* How booking works */}
          <div className="rounded-[18px] border border-white/[0.09] bg-[#0b1512] p-7 sm:p-9 lg:col-span-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/[0.45]">
              How booking works
            </p>
            <ol className="mt-6 grid gap-5">
              {awfBookingSteps.map((step) => (
                <li key={step.step} className="flex gap-4">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-[9px] bg-[#d8c59d]/[0.12] text-[10px] font-bold tracking-[0.08em] text-[#d8c59d]">
                    {step.step}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold tracking-[-0.01em] text-[#f7f4ec]">
                      {step.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-5 text-white/[0.52]">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-white/[0.08] pt-5 text-xs leading-5 text-white/[0.4]">
              Adventure add-ons (trekking, rafting, ATV) and stays are selected
              in the festival booking flow. All festival prices include GST.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
