import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "About Travelspire NE — Northeast India Travel Experts" },
  description:
    "Meet the Dibrugarh-based team behind Travelspire North-East. Local guides, honest road knowledge, and responsible tourism across Arunachal Pradesh, Assam, Meghalaya, Nagaland and beyond.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
