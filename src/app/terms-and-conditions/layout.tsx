import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply to Travelspire North-East tours, bookings, permits and travel services in Arunachal Pradesh and Northeast India.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
