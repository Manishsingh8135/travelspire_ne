import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { NightAB } from "@/components/dev/night-ab";
import { env } from "@/lib/env";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Travelspire — Northeast India, on your own terms",
    template: "%s · Travelspire",
  },
  description:
    "Plan, explore and remember Northeast India — guided or independent. The living atlas, marketplaces and trip companion for the region.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${hanken.variable} ${geistMono.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          themes={["light", "dark"]}
        >
          {children}
          {/* TEMPORARY: dark-theme A/B switch — dev only, deleted after the verdict. */}
          <NightAB />
        </ThemeProvider>
      </body>
    </html>
  );
}
