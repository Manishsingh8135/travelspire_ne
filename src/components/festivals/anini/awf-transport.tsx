import { Check, Clock3, MessageCircle, Phone, UtensilsCrossed } from "lucide-react";
import {
  awfContact,
  awfFleet,
  awfFleetInclusions,
  awfSharedTransfer,
} from "@/data/festivals/anini-winter-fest";
import { createAwfInquiryURL } from "@/lib/whatsapp";

const priceFormatter = new Intl.NumberFormat("en-IN");

export function AwfTransport() {
  const shared = awfSharedTransfer;

  return (
    <section
      id="transport"
      aria-labelledby="awf-transport-title"
      className="bg-[#f1ebdf] py-20 text-[#17221b] sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#87543a]">
            Official Travel &amp; Taxi Partner
          </p>
          <h2
            id="awf-transport-title"
            className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.055em]"
          >
            We know every dhaba,{" "}
            <span className="font-serif font-normal italic text-[#76533e]">
              every slide zone
            </span>
          </h2>
          <p className="mt-6 max-w-[36rem] text-base leading-7 text-[#5a655e] sm:text-lg sm:leading-8">
            Travelspire has run the Dibrugarh–Anini stretch for years. Tell us you&apos;re
            coming for the fest and we sort the rest — seats, SUVs, permits and
            exactly when to leave so you cross Mayodia in daylight.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-12">
          {/* Shared transfer — the hero product */}
          <article className="overflow-hidden rounded-[18px] bg-[#17241d] text-[#f5f0e5] shadow-[10px_20px_44px_-26px_rgba(23,36,29,0.7)] lg:col-span-5">
            <div className="p-7 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#cdb783]">
                  Festival special · Shared convoy
                </p>
                <span className="rounded-full border border-[#cdb783]/35 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#cdb783]">
                  Limited slots
                </span>
              </div>

              <h3 className="mt-4 font-serif text-[2rem] font-normal italic leading-tight tracking-[-0.02em] sm:text-[2.35rem]">
                {shared.name}
              </h3>

              <p className="mt-5">
                <span className="text-[2.6rem] font-medium leading-none tracking-[-0.04em] text-white">
                  ₹{priceFormatter.format(shared.price)}
                </span>
                <span className="ml-2 text-sm text-white/[0.55]">{shared.unit}</span>
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/[0.5]">
                {shared.window}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/[0.38]">
                {shared.route}
              </p>

              {/* Pickup schedule */}
              <div className="mt-7">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/[0.42]">
                  Convoy pickup points
                </p>
                <ol className="mt-3 grid gap-2">
                  {shared.pickups.map((pickup, index) => (
                    <li
                      key={pickup.point}
                      className="flex items-center justify-between rounded-[10px] bg-white/[0.05] px-4 py-3"
                    >
                      <span className="flex items-center gap-3 text-sm font-medium">
                        <span className="text-[10px] font-bold text-[#cdb783]">{index + 1}</span>
                        {pickup.point}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/[0.65]">
                        <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
                        {pickup.time}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Meal stops */}
              <p className="mt-6 inline-flex items-center gap-2 text-[11px] leading-5 text-white/[0.55]">
                <UtensilsCrossed aria-hidden="true" className="h-4 w-4 flex-none text-[#cdb783]" />
                {shared.meals.map((meal) => `${meal.meal} at ${meal.where}`).join(" · ")}
              </p>

              {/* Inclusions */}
              <ul className="mt-5 flex flex-wrap gap-2">
                {shared.inclusions.map((inclusion) => (
                  <li
                    key={inclusion}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/[0.66]"
                  >
                    <Check aria-hidden="true" className="h-3 w-3 text-[#cdb783]" />
                    {inclusion}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] leading-5 text-white/[0.45]">
                At actuals, not bundled: {shared.atActuals.join(" · ")}
              </p>

              <a
                href={createAwfInquiryURL({ kind: "shared-transfer" })}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[#eadfc8] px-5 text-[11px] font-bold uppercase tracking-[0.13em] text-[#09110d] transition-colors duration-200 hover:bg-[#f8f1e4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eadfc8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17241d]"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Reserve a seat
              </a>
              <p className="mt-4 text-center text-[10px] leading-4 tracking-[0.06em] text-white/[0.4]">
                {shared.pickupNote}
              </p>
              <p className="mt-3 text-center text-[10px] uppercase tracking-[0.14em] text-white/[0.35]">
                {shared.note}
              </p>
            </div>
          </article>

          {/* Private fleet */}
          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {awfFleet.map((vehicle) => (
                <article
                  key={vehicle.name}
                  className="group flex flex-col justify-between rounded-[14px] bg-[#e7dece] p-6 shadow-[6px_12px_26px_-22px_rgba(37,46,39,0.45)] transition-shadow duration-300 hover:shadow-[9px_16px_32px_-20px_rgba(37,46,39,0.6)]"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#17221b]">
                        {vehicle.name}
                      </h3>
                      <p className="text-[15px] font-semibold text-[#6b4a2f]">
                        ₹{priceFormatter.format(vehicle.pricePerDay)}
                        <span className="text-[11px] font-medium text-[#7a7263]">/day</span>
                      </p>
                    </div>
                    <p className="mt-1.5 font-serif text-[15px] italic leading-6 text-[#6a5c49]">
                      {vehicle.character}
                    </p>
                  </div>
                  <a
                    href={createAwfInquiryURL({
                      kind: "vehicle",
                      vehicleName: vehicle.name,
                      pricePerDay: vehicle.pricePerDay,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Reserve the ${vehicle.name} for Anini Winter Fest on WhatsApp`}
                    className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-[9px] border border-[#17241d]/25 px-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[#17241d] transition-colors duration-200 hover:bg-[#17241d] hover:text-[#f5efe2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87543a]"
                  >
                    Reserve this vehicle
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-4 rounded-[14px] border border-[#17241d]/[0.12] bg-[#ece5d5] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#87543a]">
                Per vehicle, per day — all included
              </p>
              <p className="mt-2 text-sm leading-6 text-[#526057]">
                {awfFleetInclusions.join(" · ")}. One price, no surprise charges at the
                end of the trip. Bookings and availability are handled directly by
                Travelspire Northeast.
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href={awfContact.phonePrimaryHref}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#17241d] underline-offset-4 hover:underline"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 text-[#87543a]" />
                  {awfContact.phonePrimary}
                </a>
                <a
                  href={awfContact.phoneSecondaryHref}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#17241d] underline-offset-4 hover:underline"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 text-[#87543a]" />
                  {awfContact.phoneSecondary}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
