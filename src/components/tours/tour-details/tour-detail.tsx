"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Gauge,
  MapPin,
  MessageCircle,
  Users,
  X,
} from "lucide-react";
import { upcomingTours } from "@/data/tours";
import { createTourWhatsAppURL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import {
  getTourCategory,
  getTourDuration,
  getTourPrice,
  isFestivalTour,
  isRegularTour,
  isSpecialActivityTour,
  type Tour,
  type TourCategory,
  type TourPackageVariant,
} from "@/types/tours/tour";
import { ActivityTourCard } from "../tour-showcase/special-activity-card";
import { FestivalTourCard } from "../tour-showcase/festival-tour-card";
import { TourCard } from "../tour-showcase/tour-card";
import { TourBookingCard } from "./tour-booking-card";
import { TourGallery } from "./tour-gallery";
import { TourItineraryDay } from "./tour-itinerary-day";
import { TourSection } from "./tour-section";
import { getPlaceImageAlt } from "@/data/seo/image-seo-data";

interface TourDetailProps {
  tour: Tour;
  className?: string;
}

const priceFormatter = new Intl.NumberFormat("en-IN");
const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function TourDetail({ tour, className }: TourDetailProps) {
  const category = getTourCategory(tour);
  const price = getTourPrice(tour).min;
  const duration = getTourDuration(tour);
  const relatedTours = upcomingTours
    .filter((candidate) => candidate.id !== tour.id)
    .sort((a, b) => {
      const aMatch = getTourCategory(a) === category ? 1 : 0;
      const bMatch = getTourCategory(b) === category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  const durationLabel = isRegularTour(tour)
    ? tour.duration
    : duration.min === duration.max
      ? `${duration.min} days`
      : `${duration.min}–${duration.max} days`;
  const dateLabel = isRegularTour(tour)
    ? tour.startDate
    : `${dateFormatter.format(new Date(tour.eventDates.start))} — ${dateFormatter.format(new Date(tour.eventDates.end))}`;
  const inclusions = isRegularTour(tour)
    ? tour.inclusions
    : tour.baseInclusions;
  const exclusions = isRegularTour(tour)
    ? tour.exclusions
    : tour.baseExclusions;
  const extraHighlights = isFestivalTour(tour)
    ? [...(tour.culturalHighlights ?? []), ...(tour.specialActivities ?? [])]
    : isSpecialActivityTour(tour)
      ? (tour.activityHighlights ?? [])
      : [];
  const inquiryUrl = createTourWhatsAppURL(tour);

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden bg-[#f1ebdf] pb-24 text-[#17221b] lg:pb-0",
        className,
      )}
    >
      <TourHero
        tour={tour}
        category={category}
        duration={durationLabel}
        date={dateLabel}
      />

      <div className="mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 md:px-10 lg:px-16 lg:py-28 xl:px-24">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="space-y-20 lg:col-span-8 lg:space-y-24">
            <TourSection
              eyebrow="The experience"
              title="A journey into the landscape"
            >
              <p className="max-w-[52rem] font-serif text-[1.45rem] leading-[1.5] tracking-[-0.025em] text-[#46534a] sm:text-[1.7rem] sm:leading-[1.45]">
                {tour.overview}
              </p>
            </TourSection>

            <TourSection
              eyebrow="What stays with you"
              title="Journey highlights"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {[...tour.highlights, ...extraHighlights].map(
                  (highlight, index) => (
                    <div
                      key={`${highlight}-${index}`}
                      className="flex min-h-[7rem] items-start gap-4 rounded-[14px] bg-[#e7dece] p-5 shadow-[7px_14px_30px_-24px_rgba(35,47,39,0.58)] sm:p-6"
                    >
                      <span className="text-[10px] font-bold tracking-[0.14em] text-[#8b5a40]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm font-medium leading-6 text-[#435047] sm:text-base sm:leading-7">
                        {highlight}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </TourSection>

            {isRegularTour(tour) && (
              <TourSection
                id="itinerary"
                eyebrow="Day by day"
                title="Your itinerary"
              >
                <div className="grid gap-3">
                  {tour.itinerary.map((day, index) => (
                    <TourItineraryDay
                      key={`${day.title}-${index}`}
                      day={day}
                      index={index}
                    />
                  ))}
                </div>
              </TourSection>
            )}

            {!isRegularTour(tour) && (
              <TourSection
                id="packages"
                eyebrow="Choose your stay"
                title="Available packages"
              >
                <div className="grid gap-4">
                  {tour.variants.map((variant, index) => (
                    <PackageCard
                      key={variant.id}
                      variant={variant}
                      index={index}
                      inquiryUrl={inquiryUrl}
                    />
                  ))}
                </div>
              </TourSection>
            )}

            <TourSection
              id="essentials"
              eyebrow="Know before you go"
              title="Journey essentials"
            >
              <div className="overflow-hidden rounded-[16px] bg-[#e7dece] shadow-[8px_17px_36px_-27px_rgba(35,47,39,0.66)]">
                <div className="grid gap-10 p-6 sm:p-8 md:grid-cols-2 lg:p-10">
                  <EssentialList title="What is included" items={inclusions} />
                  <EssentialList
                    title="Not included"
                    items={exclusions}
                    negative
                  />
                  <EssentialList
                    title="What to carry"
                    items={tour.thingsToCarry}
                  />
                  {isSpecialActivityTour(tour) &&
                    tour.specialEquipment &&
                    tour.specialEquipment.length > 0 && (
                      <EssentialList
                        title="Required equipment"
                        items={tour.specialEquipment}
                      />
                    )}
                </div>

                {tour.importantNote && (
                  <div className="bg-[#d9cbb7] px-6 py-6 sm:px-8 lg:px-10">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#87543a]">
                      Important note
                    </p>
                    <p className="mt-3 max-w-[62rem] text-sm leading-6 text-[#566159] sm:text-base sm:leading-7">
                      {tour.importantNote}
                    </p>
                  </div>
                )}
              </div>
            </TourSection>
          </div>

          <div id="booking" className="lg:col-span-4">
            <div className="space-y-4 lg:sticky lg:top-24">
              <TourBookingCard tour={tour} />
              <QuickFacts tour={tour} duration={durationLabel} />
            </div>
          </div>
        </div>

        <TourSection
          id="gallery"
          eyebrow="See the journey"
          title="The places ahead"
          className="mt-20 lg:mt-28"
        >
          <TourGallery images={tour.gallery} title={`${tour.title} gallery`} />
        </TourSection>
      </div>

      {relatedTours.length > 0 && (
        <section className="bg-[#07100d] py-20 text-white sm:py-24 lg:py-28">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
            <header className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d5be8d]">
                  Continue exploring
                </p>
                <h2 className="max-w-[12ch] text-[clamp(2.7rem,5vw,4.8rem)] font-medium leading-[0.93] tracking-[-0.055em] text-[#f7f4ec]">
                  More journeys worth taking
                </h2>
              </div>
              <Link
                href="/all-tours"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#e4d8bd] transition-colors hover:text-white md:col-span-4 md:justify-self-end"
              >
                Explore all journeys
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </header>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedTours.map((relatedTour, index) => (
                <RelatedTourCard
                  key={relatedTour.id}
                  tour={relatedTour}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <MobileBookingBar
        price={price}
        regular={isRegularTour(tour)}
        inquiryUrl={inquiryUrl}
      />
    </div>
  );
}

function TourHero({
  tour,
  category,
  duration,
  date,
}: {
  tour: Tour;
  category: TourCategory;
  duration: string;
  date: string;
}) {
  const facts = [
    { icon: Clock3, label: "Duration", value: duration },
    { icon: MapPin, label: "Location", value: tour.location },
    { icon: CalendarDays, label: "Departure", value: date },
    { icon: Gauge, label: "Travel pace", value: tour.difficulty },
  ];

  return (
    <section className="relative isolate flex min-h-[94svh] overflow-hidden bg-[#07100d] text-white md:min-h-[86svh]">
      <Image
        src={tour.heroImage}
        alt={getPlaceImageAlt(tour.heroImage, `${tour.title} in ${tour.location}`)}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,9,7,0.94)_0%,rgba(3,9,7,0.7)_46%,rgba(3,9,7,0.2)_82%,rgba(3,9,7,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,9,7,0.5)_0%,transparent_30%,rgba(3,9,7,0.17)_58%,rgba(3,9,7,0.96)_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col px-5 pb-5 pt-28 sm:px-8 sm:pb-8 md:px-10 md:pt-32 lg:px-16 xl:px-24">
        <Link
          href="/all-tours"
          className="inline-flex w-fit items-center gap-2 text-[9px] font-bold uppercase tracking-[0.17em] text-white/[0.62] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          All journeys
        </Link>

        <div className="flex flex-1 items-end py-10 md:items-center md:py-12">
          <div className="max-w-[950px]">
            <span
              className={cn(
                "inline-flex rounded-full px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_25px_-13px_rgba(0,0,0,0.92)]",
                getCategoryStyle(category),
              )}
            >
              {formatCategory(category)}
              {tour.featured ? " · Featured" : ""}
            </span>
            <h1 className="mt-5 max-w-[14ch] text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.88] tracking-[-0.06em] text-[#f7f4ec]">
              {tour.title}
            </h1>
            <p className="mt-5 max-w-[42rem] font-serif text-xl italic leading-7 text-[#e2d7bf] sm:text-2xl sm:leading-8">
              {tour.subtitle}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-4 md:gap-5">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div key={fact.label} className="min-w-0 py-2 md:py-4">
                <dt className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.15em] text-white/[0.42] sm:text-[9px]">
                  <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                  {fact.label}
                </dt>
                <dd className="mt-1.5 line-clamp-2 text-xs font-medium leading-5 text-white/[0.82] sm:text-sm">
                  {fact.value}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

function PackageCard({
  variant,
  index,
  inquiryUrl,
}: {
  variant: TourPackageVariant;
  index: number;
  inquiryUrl: string;
}) {
  return (
    <article className="rounded-[14px] bg-[#e7dece] p-5 shadow-[7px_14px_30px_-24px_rgba(35,47,39,0.58)] sm:p-7">
      <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#8a715f]">
            Package {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#17221b]">
            {variant.name}
          </h3>
          {variant.description && (
            <p className="mt-3 max-w-[42rem] text-sm leading-6 text-[#59655d] sm:text-base sm:leading-7">
              {variant.description}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#68746c]">
            <span className="flex items-center gap-1.5">
              <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
              {variant.duration.days} days / {variant.duration.nights} nights
            </span>
            {variant.maxGroupSize && (
              <span className="flex items-center gap-1.5">
                <Users aria-hidden="true" className="h-3.5 w-3.5" />
                Maximum {variant.maxGroupSize} guests
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8a715f]">
            Per person
          </p>
          <p className="mt-1 text-3xl font-medium tracking-[-0.045em] text-[#17221b]">
            ₹{priceFormatter.format(variant.price)}
          </p>
          <a
            href={inquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-11 min-w-[10rem] items-center justify-center gap-2 rounded-[9px] bg-[#17241d] px-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[#f5efe2] shadow-[6px_10px_22px_-15px_rgba(0,0,0,0.86)] transition-colors hover:bg-[#2b3a31]"
          >
            Ask about this
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>

      {variant.inclusions.length > 0 && (
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {variant.inclusions.map((inclusion) => (
            <p
              key={inclusion}
              className="flex items-start gap-2.5 text-xs leading-5 text-[#556159] sm:text-sm sm:leading-6"
            >
              <Check
                aria-hidden="true"
                className="mt-1 h-3.5 w-3.5 flex-none text-[#7a513b]"
              />
              {inclusion}
            </p>
          ))}
        </div>
      )}

      {variant.additionalActivities &&
        variant.additionalActivities.length > 0 && (
          <div className="mt-5 rounded-[10px] bg-[#dcd1c0] p-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#87543a]">
              Additional experiences
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {variant.additionalActivities.map((activity) => (
                <span
                  key={activity}
                  className="rounded-[7px] bg-[#f4eee3] px-3 py-2 text-[11px] font-medium text-[#536057]"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        )}
    </article>
  );
}

function EssentialList({
  title,
  items,
  negative = false,
}: {
  title: string;
  items: string[];
  negative?: boolean;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold tracking-[-0.025em] text-[#17221b]">
        {title}
      </h3>
      <div className="mt-4 grid gap-2.5">
        {items.map((item) => (
          <p
            key={item}
            className="flex items-start gap-2.5 text-sm leading-6 text-[#566159]"
          >
            {negative ? (
              <X
                aria-hidden="true"
                className="mt-1 h-3.5 w-3.5 flex-none text-[#8a4e42]"
              />
            ) : (
              <Check
                aria-hidden="true"
                className="mt-1 h-3.5 w-3.5 flex-none text-[#4d765b]"
              />
            )}
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function QuickFacts({ tour, duration }: { tour: Tour; duration: string }) {
  const facts = [
    { label: "Duration", value: duration },
    { label: "Travel pace", value: tour.difficulty },
    ...(isRegularTour(tour)
      ? [
          { label: "Maximum group", value: `${tour.maxGroupSize} guests` },
          {
            label: "Best season",
            value: tour.bestTimeToVisit.join(", "),
          },
          ...(tour.altitude
            ? [{ label: "Highest altitude", value: `${tour.altitude} m` }]
            : []),
        ]
      : [{ label: "Package choices", value: String(tour.variants.length) }]),
  ];

  return (
    <div className="rounded-[14px] bg-[#e3d9c8] p-6 shadow-[7px_14px_30px_-25px_rgba(35,47,39,0.58)]">
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#87543a]">
        At a glance
      </p>
      <dl className="mt-5 grid gap-4">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex items-start justify-between gap-5"
          >
            <dt className="text-xs text-[#6c776f]">{fact.label}</dt>
            <dd className="max-w-[12rem] text-right text-xs font-semibold leading-5 text-[#2f3d34]">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function RelatedTourCard({ tour, index }: { tour: Tour; index: number }) {
  if (isFestivalTour(tour))
    return <FestivalTourCard tour={tour} index={index} />;
  if (isSpecialActivityTour(tour))
    return <ActivityTourCard tour={tour} index={index} />;
  return <TourCard tour={tour} index={index} />;
}

function MobileBookingBar({
  price,
  regular,
  inquiryUrl,
}: {
  price: number;
  regular: boolean;
  inquiryUrl: string;
}) {
  return (
    <div className="fixed bottom-3 left-3 right-[5.25rem] z-40 flex min-h-14 items-center justify-between gap-3 rounded-[12px] bg-[#111c16] px-4 py-2.5 text-white shadow-[8px_15px_34px_-15px_rgba(0,0,0,0.88)] lg:hidden">
      <div>
        <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-white/[0.42]">
          {regular ? "Per person" : "From"}
        </p>
        <p className="mt-0.5 text-base font-semibold tracking-[-0.025em]">
          ₹{priceFormatter.format(price)}
        </p>
      </div>
      <a
        href={inquiryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-[9px] bg-[#eadfc8] px-3.5 text-[9px] font-bold uppercase tracking-[0.11em] text-[#09110d]"
      >
        <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
        Enquire
      </a>
    </div>
  );
}

function formatCategory(category: TourCategory) {
  const labels: Partial<Record<TourCategory, string>> = {
    BikeTrip: "Bike trip",
    FruitFestival: "Fruit festival",
    CampingTrip: "Camping",
  };
  return labels[category] ?? category;
}

function getCategoryStyle(category: TourCategory) {
  const styles: Record<TourCategory, string> = {
    Adventure: "bg-[#82442d]/[0.92]",
    Cultural: "bg-[#69466f]/[0.92]",
    Nature: "bg-[#256247]/[0.92]",
    Pilgrimage: "bg-[#80612d]/[0.92]",
    Festival: "bg-[#7b3550]/[0.92]",
    BikeTrip: "bg-[#315f72]/[0.92]",
    FruitFestival: "bg-[#7b3550]/[0.92]",
    CampingTrip: "bg-[#256247]/[0.92]",
  };
  return styles[category];
}
