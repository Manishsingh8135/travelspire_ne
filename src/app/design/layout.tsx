import type { Metadata } from "next";

// Internal design-system showcase — reachable, but never in search results.
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
