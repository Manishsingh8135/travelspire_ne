// Thin wrapper over GA4's gtag. Safe to call anywhere on the client: it does
// nothing when analytics isn't configured (no measurement ID) or hasn't loaded.
//
// Event names follow GA4's recommended set where one fits (begin_checkout,
// purchase, generate_lead) so they map onto GA's built-in reports.

type GtagParams = Record<string, string | number | boolean | undefined | object>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: GtagParams) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function trackEvent(name: string, params?: GtagParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
