import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";

/**
 * V2 EDITORIAL EXPERIMENT — a parallel version of the tours pages with a
 * different type voice: Instrument Serif set huge, magazine grammar, zero
 * terminal-mono. Lives beside v1 (/tours) untouched; the winner takes the
 * route after the founder's verdict. noindex until then.
 */

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ToursV2Layout({ children }: { children: React.ReactNode }) {
  return <div className={instrument.variable}>{children}</div>;
}
