import { ArrowUpRight, ExternalLink, MessageCircle, Tent } from "lucide-react";
import {
  awfBookingSteps,
  awfPackagePlans,
  awfPassPartners,
  awfPasses,
} from "@/data/festivals/anini-winter-fest";
import { createAwfInquiryURL } from "@/lib/whatsapp";

const priceFormatter = new Intl.NumberFormat("en-IN");

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
            than you&apos;d expect. Two things to lock in: your festival pass, and
            your journey.
          </p>
        </div>

        {/* Festival passes */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:max-w-4xl">
          {awfPasses.map((pass) => (
            <article
              key={pass.name}
              className={
                pass.featured
                  ? "relative rounded-[18px] border border-[#d8c59d]/45 bg-[#141d16] p-7 sm:p-9"
                  : "rounded-[18px] border border-white/[0.1] bg-[#0b1512] p-7 sm:p-9"
              }
            >
              {pass.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-[#d8c59d] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#07100d]">
                  Most popular
                </span>
              )}
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/[0.5]">
                {pass.span}
              </p>
              <h3 className="mt-3 font-serif text-3xl font-normal italic tracking-[-0.02em] text-[#f7f4ec]">
                {pass.name}
              </h3>
              <p className="mt-4">
                <span className="text-[2.4rem] font-medium leading-none tracking-[-0.04em] text-white">
                  ₹{priceFormatter.format(pass.price)}
                </span>
                <span className="ml-2 text-sm text-white/[0.5]">{pass.unit}</span>
              </p>
              <p className="mt-3 max-w-[30ch] text-sm leading-6 text-white/[0.58]">
                {pass.blurb}
              </p>
              <p className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#d8c59d]">
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                Book via {awfPassPartners.join(" or ")}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-4 max-w-[46rem] text-xs leading-5 text-white/[0.42]">
          Festival passes are sold by the festival&apos;s official booking partners,
          Zaatio and Baahi — not by Travelspire. What we handle is everything around
          the pass: the road, the stay, the permits and the valley.
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
              transport and valley extensions — bundled by us into a single plan.
              Tell us your dates and group size; we come back with the full picture.
            </p>

            <div className="mt-7 grid gap-2.5 sm:grid-cols-3">
              {awfPackagePlans.map((plan) => (
                <a
                  key={plan.plan}
                  href={createAwfInquiryURL({ kind: "package", plan: plan.plan })}
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
                  <p className="mt-2 text-xs leading-5 text-white/[0.52]">{plan.label}</p>
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
              Adventure add-ons (trekking, rafting, ATV) and stays are selected in the
              festival booking flow. All festival prices include GST.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
