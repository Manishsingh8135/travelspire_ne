// Price tiers for the multi-day expeditions. A tier is priced one of two ways:
//
//  - per person (the default): `price` is what each traveller pays. A tier
//    with `minSize` sells to any party from `minSize` to `size` people;
//    without it, the party is exactly `size`.
//  - per party (`basis: "party"`): `price` is the total for exactly `size`
//    travellers, e.g. a private trip quoted as one figure for a couple.
//
// The tier pages, the booking catalogue, the WhatsApp messages and the
// structured data all read tiers through these helpers.

export type ExpeditionTierPricing = {
  id: string;
  label: string;
  size: number;
  minSize?: number;
  price: number;
  basis?: "person" | "party";
};

export const isPartyPriced = (tier: ExpeditionTierPricing) => tier.basis === "party";

/** "4–5" for a range, "2" for a fixed party. */
export function tierTravellers(tier: ExpeditionTierPricing): string {
  return tier.minSize ? `${tier.minSize}–${tier.size}` : String(tier.size);
}

/** What one traveller pays, for comparing tiers (schema, sorting). */
export function tierPerPerson(tier: ExpeditionTierPricing): number {
  return isPartyPriced(tier) ? tier.price / tier.size : tier.price;
}

/** "₹25,999 per person" or "₹1,89,999 total for 2". */
export function tierPriceText(tier: ExpeditionTierPricing): string {
  const amount = `₹${tier.price.toLocaleString("en-IN")}`;
  return isPartyPriced(tier) ? `${amount} total for ${tier.size}` : `${amount} per person`;
}
