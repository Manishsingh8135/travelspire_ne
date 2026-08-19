"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { sixPricing } from "@/data/expeditions/anini-six-days";
import { createAniniSixInquiryURL } from "@/lib/whatsapp";

const inr = new Intl.NumberFormat("en-IN");

export function SixLedger() {
  const [activeId, setActiveId] = useState(sixPricing.tiers[0].id);
  const active = sixPricing.tiers.find((tier) => tier.id === activeId) ?? sixPricing.tiers[0];

  return (
    <section
      aria-labelledby="six-ledger-title"
      className="relative overflow-hidden bg-[#F3EEE2] py-20 text-[#111C18] sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9A5B36]">
              {sixPricing.kicker}
            </p>
            <h2
              id="six-ledger-title"
              className="mt-4 text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.05em]"
            >
              What it{" "}
              <span className="font-serif font-normal italic text-[#7A4E2E]">
                costs
              </span>
            </h2>
            <p className="mt-6 max-w-[32rem] text-[1.02rem] leading-8 text-[#3D4B44]">
              {sixPricing.standfirst}
            </p>
          </div>

          <div className="lg:col-span-7">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Expedition price per person by group size
              </caption>
              <thead>
                <tr className="border-b border-[#111C18]/15 font-mono text-[9px] uppercase tracking-[0.16em] text-[#9A5B36]">
                  <th scope="col" className="pb-3 font-medium">
                    Party
                  </th>
                  <th scope="col" className="pb-3 font-medium">
                    Per person
                  </th>
                  <th scope="col" className="hidden pb-3 font-medium sm:table-cell">
                    Vehicle
                  </th>
                </tr>
              </thead>
              <tbody>
                {sixPricing.tiers.map((tier) => {
                  const selected = tier.id === activeId;
                  const isPrivate = tier.id === "private";
                  return (
                    <tr
                      key={tier.id}
                      className={`cursor-pointer border-b transition-colors ${
                        isPrivate
                          ? "border-[#111C18]/20"
                          : "border-[#111C18]/[0.08]"
                      } ${selected ? "bg-[#E9E1CE]" : "hover:bg-[#E9E1CE]/60"}`}
                    >
                      <th scope="row" className="px-0 py-0 font-medium">
                        <button
                          type="button"
                          onClick={() => setActiveId(tier.id)}
                          aria-pressed={selected}
                          className="flex w-full items-center gap-3 px-3 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9683A] sm:px-4"
                        >
                          <span
                            aria-hidden="true"
                            className={`h-2 w-2 flex-none rounded-full ${
                              selected ? "bg-[#C9683A]" : "bg-[#111C18]/20"
                            }`}
                          />
                          <span>
                            <span className="block text-[0.98rem] tracking-[-0.02em] sm:text-base">
                              {tier.label}
                            </span>
                            {tier.badge && (
                              <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-[#9A5B36]">
                                {tier.badge}
                              </span>
                            )}
                          </span>
                        </button>
                      </th>
                      <td className="whitespace-nowrap py-4 pr-3 font-mono text-xl tracking-[-0.03em] sm:text-2xl">
                        {sixPricing.currency}
                        {inr.format(tier.price)}
                      </td>
                      <td className="hidden py-4 pr-4 text-sm text-[#3D4B44] sm:table-cell">
                        {tier.vehicle}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-8 grid gap-6 border-t border-[#111C18]/10 pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-[38rem] text-[0.98rem] leading-7 text-[#3D4B44]">
                {active.note}
              </p>
              <a
                href={createAniniSixInquiryURL({
                  kind: "tier",
                  label: active.label,
                  size: active.size,
                  price: active.price,
                })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enquire about the ${active.label} rate on WhatsApp (opens in a new tab)`}
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#111C18] px-5 text-[13px] font-semibold text-[#F3EEE2] transition-colors hover:bg-[#1C2A24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9683A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EEE2] sm:px-6"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Hold this rate
              </a>
            </div>

            <ul className="mt-8 space-y-1.5 font-mono text-[11px] leading-5 text-[#5A655E] sm:text-[12px]">
              {sixPricing.fineprint.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
