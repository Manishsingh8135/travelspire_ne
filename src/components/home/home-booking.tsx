import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { homeBooking } from "@/data/home/homepage";
import { createTripPlanningURL } from "@/lib/whatsapp";

const ctaClass =
  "inline-flex min-h-12 items-center gap-2 rounded-[8px] bg-paper px-5 text-[13px] font-semibold text-ink transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink-band sm:text-sm";

// The one dark band in the body. It interrupts the paper rhythm exactly where
// the page asks for money, and dark reads as secure.
export function HomeBooking() {
  return (
    <section
      aria-labelledby="booking-heading"
      className="bg-ink-band py-24 text-paper sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <header className="mb-12 max-w-[44rem] sm:mb-16">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
            How booking works
          </p>
          <h2
            id="booking-heading"
            className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-paper"
          >
            Two ways to book.{" "}
            <span className="font-display font-normal italic text-[#F2E5C8]">
              Both end securely.
            </span>
          </h2>
        </header>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {homeBooking.models.map((model, modelIndex) => (
            <article
              key={model.title}
              className="flex flex-col rounded-[16px] border border-paper/[0.12] bg-paper/[0.04] p-6 sm:p-9"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                {modelIndex === 0 ? "Book online" : "Plan with us"}
              </p>
              <h3 className="mt-3 text-[1.5rem] font-medium tracking-[-0.025em] text-paper">
                {model.title}
              </h3>
              <ol className="mt-7 flex-1 space-y-4">
                {model.steps.map((step, stepIndex) => (
                  <li key={step} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] leading-6 tracking-[0.1em] text-brass/75"
                    >
                      {String(stepIndex + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] leading-6 text-paper/[0.72]">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-9">
                {model.cta.href === "whatsapp" ? (
                  <a
                    href={createTripPlanningURL()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Talk to a trip planner on WhatsApp (opens in a new tab)"
                    className={ctaClass}
                  >
                    <MessageCircle aria-hidden="true" className="h-4 w-4" />
                    {model.cta.label}
                  </a>
                ) : (
                  <Link href={model.cta.href} className={ctaClass}>
                    {model.cta.label}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-3 border-t border-paper/[0.12] pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {homeBooking.assurances.map((assurance) => (
            <li
              key={assurance}
              className="flex items-start gap-2.5 text-[12.5px] leading-5 text-paper/[0.6]"
            >
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 h-3.5 w-3.5 flex-none text-brass/85"
              />
              {assurance}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
