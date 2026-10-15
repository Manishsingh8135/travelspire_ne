import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What personal information Travelspire North-East collects for enquiries, bookings and payments, how it is used and protected, and how to reach us about it.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
