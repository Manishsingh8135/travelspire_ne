import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { sixMeta, sixRelated } from "@/data/expeditions/anini-six-days";
import { createAniniSixInquiryURL } from "@/lib/whatsapp";

export function SixClose() {
  return (
    <>
      <section
        aria-labelledby="six-related-title"
        className="bg-[#E9E1CE] py-20 text-[#111C18] sm:py-24"
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9A5B36]">
            Keep reading
          </p>
          <h2
            id="six-related-title"
            className="mt-4 text-[clamp(2rem,4.4vw,3.2rem)] font-medium leading-[0.95] tracking-[-0.04em]"
          >
            The country around{" "}
            <span className="font-serif font-normal italic text-[#7A4E2E]">
              the week
            </span>
          </h2>

          <ul className="mt-12 divide-y divide-[#111C18]/10 border-y border-[#111C18]/10">
            {sixRelated.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-5 py-5 sm:grid-cols-[7rem_1fr_auto] sm:gap-8"
                >
                  <span className="relative block aspect-[5/4] overflow-hidden">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </span>
                  <span>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[#9A5B36]">
                      {item.kind}
                    </span>
                    <span className="mt-1 block text-[1.15rem] font-medium tracking-[-0.03em] sm:text-xl">
                      {item.name}
                    </span>
                    <span className="mt-1 hidden max-w-[42ch] text-sm leading-6 text-[#3D4B44] sm:block">
                      {item.blurb}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 text-[#111C18]/40 transition-colors group-hover:text-[#C9683A]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="six-close-title"
        className="relative isolate overflow-hidden bg-[#070E0D] text-[#F3EEE2]"
      >
        <Image
          src="/images/places/pomo/pomo3.JPG"
          alt="Rolling high grassland at Pomo above Anini in Dibang Valley"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,14,13,0.55)_0%,rgba(7,14,13,0.72)_48%,rgba(7,14,13,0.94)_100%)]" />

        <div className="relative mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-8 sm:py-28 md:px-10 lg:px-16 lg:py-36 xl:px-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D8BE8B]">
            {sixMeta.duration} · from ₹{sixMeta.fromPrice.toLocaleString("en-IN")}
          </p>
          <h2
            id="six-close-title"
            className="mt-5 max-w-[16ch] text-[clamp(2.8rem,8vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.055em] text-[#F7F3E9]"
          >
            Hold six days{" "}
            <span className="font-serif font-normal italic text-[#D8BE8B]">
              in the Dibang
            </span>
          </h2>
          <p className="mt-6 max-w-[34rem] text-[1.05rem] leading-8 text-[#F3EEE2]/[0.72]">
            Groups of four to six, or a private week for two. Inner Line Permit
            and forest pass included. We pick up in Dibrugarh before dawn on day
            one — arrive the night before.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={createAniniSixInquiryURL({ kind: "general" })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire about Six Days in the Dibang on WhatsApp (opens in a new tab)"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#F2EAD8] px-6 text-sm font-semibold text-[#07100D] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2EAD8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070E0D]"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              Enquire on WhatsApp
            </a>
            <a
              href={createAniniSixInquiryURL({ kind: "dates" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-[#F3EEE2]/[0.34] px-6 text-sm font-medium text-[#F3EEE2] transition-colors hover:border-[#F3EEE2]/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3EEE2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070E0D]"
            >
              Check open months
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
