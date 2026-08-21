import {
  circuitMeta,
  circuitPricing,
} from "@/data/expeditions/mechuka-dong-anini";
import { sixMeta, sixPricing } from "@/data/expeditions/anini-six-days";
import { awfSharedTransfer } from "@/data/festivals/anini-winter-fest";
import { upcomingTours } from "@/data/tours";
import { isRegularTour } from "@/types/tours/tour";

export type BookingTier = {
  id: string;
  name: string;
  unitPrice: number;
  minTravellers: number;
  maxTravellers: number;
  fixedTravellers: number | null;
};

export type BookingProduct = {
  slug: string;
  name: string;
  sourceUrl: string;
  defaultDepartureDate: string | null;
  fixedDepartureDate: string | null;
  tiers: BookingTier[];
};

function regularProducts(): BookingProduct[] {
  return upcomingTours.map((tour) => {
    const tiers: BookingTier[] = isRegularTour(tour)
      ? [
          {
            id: "standard",
            name: "Standard package",
            unitPrice: tour.price,
            minTravellers: 1,
            maxTravellers: tour.maxGroupSize,
            fixedTravellers: null,
          },
        ]
      : tour.variants.map((variant) => ({
          id: variant.id,
          name: variant.name,
          unitPrice: variant.price,
          minTravellers: 1,
          maxTravellers: variant.maxGroupSize ?? 30,
          fixedTravellers: null,
        }));

    return {
      slug: tour.slug,
      name: tour.title,
      sourceUrl: `/tours/${tour.slug}`,
      defaultDepartureDate: "eventDates" in tour ? tour.eventDates.start : null,
      fixedDepartureDate: null,
      tiers,
    };
  });
}

const expeditionProducts: BookingProduct[] = [
  {
    slug: circuitMeta.slug,
    name: circuitMeta.shortTitle,
    sourceUrl: `/tours/${circuitMeta.slug}`,
    defaultDepartureDate: null,
    fixedDepartureDate: null,
    tiers: circuitPricing.tiers.map((tier) => ({
      id: tier.id,
      name: tier.label,
      unitPrice: tier.price,
      minTravellers: tier.size,
      maxTravellers: tier.size,
      fixedTravellers: tier.size,
    })),
  },
  {
    slug: sixMeta.slug,
    name: sixMeta.title,
    sourceUrl: `/tours/${sixMeta.slug}`,
    defaultDepartureDate: null,
    fixedDepartureDate: null,
    tiers: sixPricing.tiers.map((tier) => ({
      id: tier.id,
      name: tier.label,
      unitPrice: tier.price,
      minTravellers: tier.size,
      maxTravellers: tier.size,
      fixedTravellers: tier.size,
    })),
  },
];

const festivalTravelProducts: BookingProduct[] = [
  {
    slug: awfSharedTransfer.slug,
    name: `Anini Winter Fest 2026 · ${awfSharedTransfer.name}`,
    sourceUrl: "/#transport",
    defaultDepartureDate: awfSharedTransfer.departureDate,
    fixedDepartureDate: awfSharedTransfer.departureDate,
    tiers: [
      {
        id: "shared-convoy",
        name: "Return shared convoy · 18–21 September",
        unitPrice: awfSharedTransfer.price,
        minTravellers: 1,
        maxTravellers: awfSharedTransfer.maxTravellersPerBooking,
        fixedTravellers: null,
      },
    ],
  },
];

const expeditionSlugs = new Set(
  expeditionProducts.map((product) => product.slug),
);

export const bookingProducts = [
  ...festivalTravelProducts,
  ...expeditionProducts,
  ...regularProducts().filter((product) => !expeditionSlugs.has(product.slug)),
];

export function getBookingProduct(slug: string) {
  return bookingProducts.find((product) => product.slug === slug) ?? null;
}

export function resolveBookingPrice(input: {
  slug: string;
  tierId: string;
  travellers: number;
}) {
  const product = getBookingProduct(input.slug);
  if (!product) return null;

  const tier = product.tiers.find((candidate) => candidate.id === input.tierId);
  if (!tier) return null;

  if (
    !Number.isSafeInteger(input.travellers) ||
    input.travellers < tier.minTravellers ||
    input.travellers > tier.maxTravellers ||
    (tier.fixedTravellers !== null && input.travellers !== tier.fixedTravellers)
  ) {
    return null;
  }

  const totalAmount = tier.unitPrice * input.travellers;
  if (!Number.isSafeInteger(totalAmount) || totalAmount <= 0) return null;

  return { product, tier, totalAmount, totalAmountPaise: totalAmount * 100 };
}
