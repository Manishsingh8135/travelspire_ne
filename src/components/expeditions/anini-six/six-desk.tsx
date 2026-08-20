"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { sixPricing } from "@/data/expeditions/anini-six-days";
import {
  partyTotal,
  perPersonPerDay,
  sixTierDetail,
  type TierDetail,
} from "@/data/expeditions/anini-six-atlas";
import { createAniniSixInquiryURL } from "@/lib/whatsapp";
import { PlateImage } from "./plate";

const inr = new Intl.NumberFormat("en-IN");

// Guest seats in the vehicle, drawn top-down. The driver is separate — these
// are the six that are actually sold.
const SEATS = [
  { x: 126, y: 46, w: 64, h: 54 },
  { x: 25, y: 132, w: 50, h: 54 },
  { x: 85, y: 132, w: 50, h: 54 },
  { x: 145, y: 132, w: 50, h: 54 },
  { x: 30, y: 218, w: 64, h: 54 },
  { x: 126, y: 218, w: 64, h: 54 },
];

const maxPrice = Math.max(...sixPricing.tiers.map((t) => t.price));

export function SixDesk() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<TierDetail["id"]>(
    sixPricing.tiers[0].id,
  );

  const tier = sixPricing.tiers.find((t) => t.id === activeId) ?? sixPricing.tiers[0];
  const detail =
    sixTierDetail.find((d) => d.id === activeId) ?? sixTierDetail[0];

  const perDay = perPersonPerDay(tier.price);
  const total = partyTotal(tier.price, detail.size);

  const matrix = [
    { label: "Vehicle", value: detail.vehicle },
    { label: "Seats used", value: `${detail.seatsFilled} of ${detail.seatsTotal}` },
    { label: "Room on the long days", value: detail.space },
    { label: "Rooms", value: detail.room },
    { label: "Schedule", value: detail.schedule },
    { label: "Suits", value: detail.bestFor },
  ];

  return (
    <section
      id="desk"
      aria-labelledby="six-desk-title"
      className="relative scroll-mt-20 overflow-hidden bg-[#070E0D] py-20 text-[#F3EEE2] sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9683A]">
              {sixPricing.kicker}
            </p>
            <h2
              id="six-desk-title"
              className="mt-4 text-[clamp(2.6rem,7vw,5rem)] font-medium leading-[0.92] tracking-[-0.05em]"
            >
              Build the{" "}
              <span className="font-serif font-normal italic text-[#D8BE8B]">
                week
              </span>
            </h2>
          </div>
          <p className="max-w-[36rem] text-[1.02rem] leading-8 text-[#F3EEE2]/[0.62] lg:col-span-6">
            {sixPricing.standfirst}
          </p>
        </div>

        {/* Party selector — the price bars make the whole ladder legible at once. */}
        <div
          role="group"
          aria-label="Choose your party size"
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] bg-[#F3EEE2]/[0.12] sm:mt-16 lg:grid-cols-4"
        >
          {sixPricing.tiers.map((option) => {
            const selected = option.id === activeId;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setActiveId(option.id)}
                aria-pressed={selected}
                className={`group relative flex flex-col gap-3 px-4 py-5 text-left transition-colors duration-200 sm:px-6 sm:py-7 ${
                  selected
                    ? "bg-[#16211D]"
                    : "bg-[#070E0D] hover:bg-[#0E1815]"
                }`}
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span
                    className={`text-[0.95rem] font-medium tracking-[-0.02em] sm:text-base ${
                      selected ? "text-[#F7F3E9]" : "text-[#F3EEE2]/60"
                    }`}
                  >
                    {option.shortLabel}
                  </span>
                  {option.badge && (
                    <span className="hidden font-mono text-[8.5px] uppercase tracking-[0.14em] text-[#C9683A] sm:inline">
                      {option.badge}
                    </span>
                  )}
                </span>

                <span
                  className={`font-mono text-xl tracking-[-0.03em] sm:text-2xl ${
                    selected ? "text-[#D8BE8B]" : "text-[#F3EEE2]/45"
                  }`}
                >
                  ₹{inr.format(option.price)}
                </span>

                <span
                  aria-hidden="true"
                  className="h-[3px] w-full overflow-hidden rounded-full bg-[#F3EEE2]/[0.09]"
                >
                  <span
                    className={`block h-full rounded-full transition-[width,background-color] duration-500 ${
                      selected ? "bg-[#C9683A]" : "bg-[#F3EEE2]/25"
                    }`}
                    style={{ width: `${(option.price / maxPrice) * 100}%` }}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          {/* The plate. All four stay mounted so switching is instant. */}
          <div className="relative overflow-hidden rounded-[18px] bg-[#0B1310] lg:col-span-7">
            <div className="relative aspect-[3/4] w-full sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[40rem]">
              {sixTierDetail.map((option) => (
                <div
                  key={option.id}
                  aria-hidden={option.id !== activeId}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    option.id === activeId ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <PlateImage
                    frame={option.frame}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,14,13,0.12)_0%,rgba(7,14,13,0.1)_40%,rgba(7,14,13,0.93)_100%)]" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <motion.p
                  key={`${detail.id}-headline`}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-[20ch] font-serif text-[clamp(1.8rem,3.6vw,2.9rem)] italic leading-[1.05] tracking-[-0.02em] text-[#F7F3E9]"
                >
                  {detail.headline}
                </motion.p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#D8BE8B]">
                  {detail.frame.place}
                </p>
              </div>
            </div>
          </div>

          {/* The readout. */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="rounded-[16px] bg-[#0E1815] p-6 sm:p-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#F3EEE2]/45">
                {tier.label} · per person
              </p>
              <motion.p
                key={`${tier.id}-price`}
                initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 font-mono text-[clamp(2.8rem,7vw,4.2rem)] leading-none tracking-[-0.05em] text-[#F7F3E9]"
              >
                ₹{inr.format(tier.price)}
              </motion.p>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[#F3EEE2]/[0.12] pt-5">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#F3EEE2]/45">
                    Per day
                  </dt>
                  <dd className="mt-1 font-mono text-lg tracking-[-0.02em] text-[#D8BE8B]">
                    ₹{inr.format(perDay)}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#F3EEE2]/45">
                    {detail.size} travellers pay
                  </dt>
                  <dd className="mt-1 font-mono text-lg tracking-[-0.02em] text-[#F3EEE2]/85">
                    ₹{inr.format(total)}
                  </dd>
                </div>
              </dl>

              <a
                href={createAniniSixInquiryURL({
                  kind: "tier",
                  label: tier.label,
                  size: detail.size,
                  price: tier.price,
                })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enquire about the ${tier.label} rate on WhatsApp (opens in a new tab)`}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[#F2EAD8] px-5 text-[13px] font-semibold text-[#07100D] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2EAD8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1815]"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Hold this rate
              </a>
            </div>

            {/* Seat map + what changes. */}
            <div className="grid gap-4 rounded-[16px] bg-[#0E1815] p-6 sm:grid-cols-[auto_1fr] sm:gap-7 sm:p-8">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#F3EEE2]/45">
                  The vehicle
                </p>
                <svg
                  viewBox="0 0 220 320"
                  role="img"
                  aria-label={`${detail.seatsFilled} of ${detail.seatsTotal} guest seats taken`}
                  className="mt-3 h-[168px] w-auto"
                >
                  <rect
                    x={10}
                    y={10}
                    width={200}
                    height={300}
                    rx={30}
                    fill="none"
                    stroke="#F3EEE2"
                    strokeOpacity={0.2}
                    strokeWidth={2}
                  />
                  {/* Driver — never for sale. */}
                  <rect
                    x={30}
                    y={46}
                    width={64}
                    height={54}
                    rx={12}
                    fill="none"
                    stroke="#F3EEE2"
                    strokeOpacity={0.22}
                    strokeWidth={2}
                    strokeDasharray="4 5"
                  />
                  <circle
                    cx={62}
                    cy={73}
                    r={12}
                    fill="none"
                    stroke="#F3EEE2"
                    strokeOpacity={0.3}
                    strokeWidth={2}
                  />
                  {SEATS.map((seat, i) => {
                    const taken = i < detail.seatsFilled;
                    return (
                      <rect
                        key={`${seat.x}-${seat.y}`}
                        x={seat.x}
                        y={seat.y}
                        width={seat.w}
                        height={seat.h}
                        rx={12}
                        fill={taken ? "#C9683A" : "transparent"}
                        fillOpacity={taken ? 0.9 : 0}
                        stroke={taken ? "#C9683A" : "#F3EEE2"}
                        strokeOpacity={taken ? 1 : 0.18}
                        strokeWidth={2}
                        className="transition-all duration-500"
                      />
                    );
                  })}
                </svg>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#F3EEE2]/40">
                  Driver not shown as a seat
                </p>
              </div>

              <dl className="grid content-start gap-0">
                {matrix.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[minmax(0,7.5rem)_1fr] gap-3 border-t border-[#F3EEE2]/[0.1] py-3 first:border-t-0 first:pt-0"
                  >
                    <dt className="font-mono text-[9px] uppercase leading-4 tracking-[0.14em] text-[#F3EEE2]/45">
                      {row.label}
                    </dt>
                    <dd className="text-[0.9rem] leading-5 text-[#F3EEE2]/85">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-[#F3EEE2]/[0.12] pt-7 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
          <p className="max-w-[42rem] text-[0.98rem] leading-7 text-[#F3EEE2]/[0.7]">
            {tier.note}
          </p>
          <ul className="grid flex-none gap-1.5 font-mono text-[11px] leading-5 text-[#F3EEE2]/40">
            {sixPricing.fineprint.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
