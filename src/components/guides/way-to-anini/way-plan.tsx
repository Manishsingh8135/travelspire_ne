import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { wayRules, wayTiming } from "@/data/guides/way-to-anini";
import { createTripPlanningURL } from "@/lib/whatsapp";

const TIMING_TONES: Record<string, { bar: string; label: string }> = {
  good: { bar: "bg-[#274435]", label: "text-[#274435]" },
  caution: { bar: "bg-[#c1993f]", label: "text-[#8a6b21]" },
  avoid: { bar: "bg-[#b06b52]", label: "text-[#9c4f38]" },
};

export function WayTiming() {
  return (
    <section aria-labelledby="way-timing-title" className="bg-[#f1ebdf] py-20 text-[#17221b] sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
            The honest clock
          </p>
          <h2
            id="way-timing-title"
            className="text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.055em]"
          >
            How long it takes,{" "}
            <span className="font-serif font-normal italic text-[#76533e]">really</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#5a5344]">
            We publish a window, never a best case. The season picks your number —
            the mountain doesn&apos;t negotiate.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-14">
          {wayTiming.map((slot) => {
            const tone = TIMING_TONES[slot.tone];
            return (
              <div
                key={slot.label}
                className="overflow-hidden rounded-[16px] border border-[#d5c9ae] bg-[#faf7f0] shadow-[8px_18px_40px_-26px_rgba(35,47,39,0.4)]"
              >
                <div className={`h-1.5 ${tone.bar}`} aria-hidden="true" />
                <div className="p-6 sm:p-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6c6552]">
                    {slot.label}
                  </p>
                  <p className={`mt-3 font-serif text-[2.2rem] font-normal italic leading-none tracking-[-0.02em] ${tone.label}`}>
                    {slot.window}
                  </p>
                  <p className="mt-3.5 text-sm leading-6 text-[#4a4638]">{slot.note}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-[16px] border border-[#d5c9ae] bg-[#faf7f0] p-6 sm:p-8 lg:mt-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#87543a]">
            Six rules that never change
          </p>
          <ul className="mt-5 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {wayRules.map((rule) => (
              <li key={rule.slice(0, 24)} className="flex items-start gap-3">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none text-[#274435]" />
                <span className="text-sm leading-6 text-[#3d4238]">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function WayGo() {
  return (
    <section aria-labelledby="way-go-title" className="bg-[#050d0f] py-20 text-white sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8c59d]">
            We drive this road every week
          </p>
          <h2
            id="way-go-title"
            className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#f7f4ec]"
          >
            Ride it{" "}
            <span className="font-serif font-normal italic text-[#dfcfab]">with us</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/[0.72]">
            The vehicle, the driver, the permits, the buffer day, the named lunch stop —
            every protocol on this page is what you get when you book the drive with
            Travelspire. One message starts it.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={createTripPlanningURL({ destination: "Dibrugarh to Anini road journey" })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Plan the drive to Anini on WhatsApp (opens in a new tab)"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#f2ead8] px-6 text-sm font-semibold text-[#07100d] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f]"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              Plan on WhatsApp
            </a>
            <Link
              href="/places/anini"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-white/[0.38] px-6 text-sm font-medium text-white transition-colors duration-200 hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0f]"
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
              The Anini Guide
            </Link>
          </div>
          <p className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/[0.4]">
            <span>Departures daily Oct–Apr</span>
            <Link
              href="/permits/arunachal-pradesh-ilp"
              className="inline-flex items-center gap-1.5 text-[#d8c59d] underline-offset-4 transition-colors hover:text-[#eadfc8] hover:underline"
            >
              ILP guide
              <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
            </Link>
            <span>Replies within hours</span>
          </p>
        </div>
      </div>
    </section>
  );
}
