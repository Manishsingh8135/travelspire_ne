import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { homeBooking } from "@/data/home/homepage";
import { createTripPlanningURL } from "@/lib/whatsapp";

export function HomeBooking() {
  return (
    <section
      aria-labelledby="booking-heading"
      className="bg-[#050d0f] py-20 text-white sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-10 max-w-[44rem] sm:mb-14">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d8c59d]">
            How booking works
          </p>
          <h2
            id="booking-heading"
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#fffdf7]"
          >
            Two ways to book.{" "}
            <span className="font-serif font-normal italic text-[#dfcfab]">
              Both end securely.
            </span>
          </h2>
        </header>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {homeBooking.models.map((model, modelIndex) => (
            <article
              key={model.title}
              className="flex flex-col rounded-[16px] border border-white/[0.09] bg-[#0b1714] p-6 sm:p-9"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d8c59d]">
                {modelIndex === 0 ? "Book online" : "Plan with us"}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[#fffdf7]">
                {model.title}
              </h3>
              <ol className="mt-6 flex-1 space-y-4">
                {model.steps.map((step, stepIndex) => (
                  <li key={step} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] leading-6 tracking-[0.1em] text-[#d8c59d]/70"
                    >
                      {String(stepIndex + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-6 text-white/[0.68]">{step}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                {model.cta.href === "whatsapp" ? (
                  <a
                    href={createTripPlanningURL()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Talk to a trip planner on WhatsApp (opens in a new tab)"
                    className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-[#f2ead8] px-5 text-[13px] font-semibold text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8]"
                  >
                    <MessageCircle aria-hidden="true" className="h-4 w-4" />
                    {model.cta.label}
                  </a>
                ) : (
                  <Link
                    href={model.cta.href}
                    className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-[#f2ead8] px-5 text-[13px] font-semibold text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8]"
                  >
                    {model.cta.label}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
          {homeBooking.assurances.map((assurance) => (
            <li
              key={assurance}
              className="flex items-start gap-2.5 text-[12px] leading-5 text-white/[0.55]"
            >
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 h-3.5 w-3.5 flex-none text-[#d8c59d]/80"
              />
              {assurance}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
