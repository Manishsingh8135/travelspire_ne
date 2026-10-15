import {
  circuitMeta,
  circuitPricing,
} from "@/data/expeditions/mechuka-dong-anini";
import { sixMeta, sixPricing } from "@/data/expeditions/anini-six-days";
import { awfSharedTransfer } from "@/data/festivals/anini-winter-fest";
import { allTours } from "@/data/tours";
import { indiaToday } from "@/lib/dates";
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
  /**
   * Inclusive range of departure dates we sell, as ISO dates. A null end is
   * open. Once `latest` has passed the product is off sale everywhere — the
   * booking page and the checkout API both enforce it.
   */
  departureWindow: { earliest: string | null; latest: string | null };
  tiers: BookingTier[];
};

const OPEN_WINDOW = { earliest: null, latest: null } as const;

function regularProducts(): BookingProduct[] {
  return allTours.map((tour) => {
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
      // Festival packages run inside the festival; everything else departs
      // whenever the traveller chooses.
      departureWindow:
        "eventDates" in tour
          ? { earliest: tour.eventDates.start, latest: tour.eventDates.end }
          : OPEN_WINDOW,
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
    departureWindow: OPEN_WINDOW,
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
    departureWindow: OPEN_WINDOW,
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
    sourceUrl: "/anini-winter-fest-2026",
    defaultDepartureDate: awfSharedTransfer.departureDate,
    fixedDepartureDate: awfSharedTransfer.departureDate,
    departureWindow: {
      earliest: awfSharedTransfer.departureDate,
      latest: awfSharedTransfer.departureDate,
    },
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

/** False once the last sellable departure date is behind us. */
export function isOnSale(product: BookingProduct, today: string = indiaToday()) {
  const { latest } = product.departureWindow;
  return latest === null || latest >= today;
}

/** The earliest date the date picker should offer today. */
export function earliestSellableDate(
  product: BookingProduct,
  today: string = indiaToday(),
) {
  const { earliest } = product.departureWindow;
  return earliest !== null && earliest > today ? earliest : today;
}

/**
 * Why a departure date can't be sold, or null when it can. Shared by the
 * checkout API so the rules live in one place.
 */
export function departureDateProblem(
  product: BookingProduct,
  departureDate: string,
  today: string = indiaToday(),
): string | null {
  if (departureDate < today) return "Choose a valid future departure date.";
  if (
    product.fixedDepartureDate !== null &&
    departureDate !== product.fixedDepartureDate
  ) {
    return "That departure date is not available for this package.";
  }
  const { earliest, latest } = product.departureWindow;
  if (
    (earliest !== null && departureDate < earliest) ||
    (latest !== null && departureDate > latest)
  ) {
    return "That departure date is outside this package's dates.";
  }
  return null;
}

export function resolveBookingPrice(input: {
  slug: string;
  tierId: string;
  travellers: number;
}) {
  const product = getBookingProduct(input.slug);
  if (!product || !isOnSale(product)) return null;

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
