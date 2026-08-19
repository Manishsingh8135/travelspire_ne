import { Instrument_Serif } from "next/font/google";

const sixSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-six-serif",
});

export default function SixDaysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${sixSerif.variable} six-edition`}>{children}</div>;
}
