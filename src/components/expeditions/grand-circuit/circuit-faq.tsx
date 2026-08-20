import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  Luggage,
  MessageCircle,
} from "lucide-react";
import {
  circuitCarry,
  circuitFaq,
  circuitMeta,
  circuitRelated,
} from "@/data/expeditions/mechuka-dong-anini";
import { createGrandCircuitInquiryURL } from "@/lib/whatsapp";

export function CircuitFaq() {
  return (
    <>
      <section
        aria-labelledby="practical-title"
        className="bg-[#f4eee3] text-[#14221c]"
      >
        <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:grid-cols-12 lg:gap-14 lg:px-16 lg:py-28 xl:px-24">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#945035]">
              <Luggage aria-hidden="true" className="h-4 w-4" />
              Pack for the real route
            </p>
            <h2
              id="practical-title"
              className="mt-5 max-w-[11ch] text-[clamp(2.8rem,5vw,5.2rem)] font-medium leading-[0.93] tracking-[-0.055em]"
            >
              City luggage will not be enough.
            </h2>
            <p className="mt-6 max-w-[30rem] text-sm leading-7 text-[#5b6760] sm:text-base">
              Thirteen days means changing temperatures, intermittent power and
              one walk that begins in darkness. Pack light, but pack
              deliberately.
            </p>
          </div>

          <ul className="rounded-[16px] bg-[#e7dece] p-6 shadow-[0_28px_55px_-44px_rgba(29,43,35,0.75)] sm:p-8 lg:col-span-7">
            {circuitCarry.map((item, index) => (
              <li
                key={item}
                className="grid grid-cols-[2.25rem_1fr] gap-4 border-b border-[#1f3429]/10 py-4 first:pt-0 last:border-0 last:pb-0"
              >
                <span className="font-mono text-sm text-[#a15a3b]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-6 text-[#3f5047]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-title"
        className="scroll-mt-24 bg-[#0b1713] text-[#f7f0e4]"
      >
        <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-32 xl:px-24">
          <header className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d4b575]">
                Before you commit
              </p>
              <h2
                id="faq-title"
                className="mt-5 max-w-[10ch] text-[clamp(2.9rem,5vw,5.2rem)] font-medium leading-[0.92] tracking-[-0.055em]"
              >
                The questions that matter.
              </h2>
              <p className="mt-6 max-w-[28rem] text-sm leading-7 text-white/[0.52]">
                {circuitFaq.description}
              </p>
              <a
                href={createGrandCircuitInquiryURL({ kind: "dates" })}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#e8d8b8] px-5 text-[12px] font-bold text-[#102019] shadow-[0_16px_28px_-20px_rgba(0,0,0,0.9)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Ask about dates
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </header>

          <div className="lg:col-span-8">
            {circuitFaq.faqs.map((faq, index) => (
              <details
                key={faq.id}
                className="group border-b border-white/[0.12] py-1 first:border-t"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b575] sm:py-6 [&::-webkit-details-marker]:hidden">
                  <span className="grid grid-cols-[2rem_1fr] gap-3 sm:grid-cols-[2.5rem_1fr] sm:gap-4">
                    <span className="pt-1 font-mono text-[10px] text-[#d4b575]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg font-medium leading-6 tracking-[-0.025em] text-[#f7f0e4] sm:text-xl sm:leading-7">
                      {faq.question}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-[#d4b575] transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                  />
                </summary>
                <div className="pb-6 pl-11 pr-3 sm:pl-14 sm:pr-12">
                  <p className="max-w-[47rem] text-sm leading-7 text-white/[0.58] sm:text-[0.96rem]">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="continue-title"
        className="bg-[#ece3d3] text-[#14221c]"
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:px-16 lg:py-28 xl:px-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#955238]">
                Keep planning
              </p>
              <h2
                id="continue-title"
                className="mt-4 text-[clamp(2.6rem,5vw,4.8rem)] font-medium leading-[0.94] tracking-[-0.05em]"
              >
                Go deeper before you go.
              </h2>
            </div>
            <Link
              href="/all-tours"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#5f3a28] underline decoration-[#9d765e]/[0.45] underline-offset-4 transition-colors hover:text-[#9b5435]"
            >
              Browse every tour
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {circuitRelated.map((item) => (
              <Link key={item.href} href={item.href} className="group block">
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[#17261f] shadow-[0_26px_50px_-38px_rgba(20,35,27,0.78)]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      quality={76}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.018] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgba(5,13,10,0.88)_100%)]" />
                    <span className="absolute left-4 top-4 rounded-[8px] bg-[#f0e0bf] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.14em] text-[#3d2a1b] shadow-[0_9px_18px_-12px_rgba(0,0,0,0.9)]">
                      {item.label}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                      <h3 className="text-xl font-medium tracking-[-0.035em] text-white sm:text-2xl">
                        {item.title}
                      </h3>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 text-[#e6c685] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="circuit-close"
        aria-labelledby="close-title"
        className="relative overflow-hidden bg-[#a75237] text-[#fff7ed]"
      >
        <div
          className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#e6bc75]/[0.16] blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid w-full max-w-[1600px] gap-8 px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:grid-cols-12 lg:items-end lg:px-16 lg:py-28 xl:px-24">
          <div className="lg:col-span-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ffe1b8]">
              {circuitMeta.duration} · from ₹
              {circuitMeta.fromPrice.toLocaleString("en-IN")} per person
            </p>
            <h2
              id="close-title"
              className="mt-5 max-w-[12ch] text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.88] tracking-[-0.06em]"
            >
              Thirteen days is a decision.
              <span className="block font-serif font-normal italic text-[#ffe0ac]">
                Make it a good one.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="max-w-[31rem] text-base leading-7 text-white/[0.72]">
              Tell us your group size and preferred month. We will answer with
              the available route, room plan, vehicle and exact booking terms.
            </p>
            <a
              href={createGrandCircuitInquiryURL({ kind: "dates" })}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-[10px] bg-[#fff0d2] px-6 py-4 text-[13px] font-bold text-[#472316] shadow-[0_18px_30px_-20px_rgba(57,20,8,0.9)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto sm:min-w-[16rem]"
            >
              Check the next departure
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
