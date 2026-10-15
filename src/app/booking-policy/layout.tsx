import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking & Cancellation Policy",
  description:
    "How booking, full payment, cancellations, refunds and date changes work for Travelspire North-East tours across Arunachal Pradesh and Northeast India.",
  alternates: { canonical: "/booking-policy" },
};

export default function BookingPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
