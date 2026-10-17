import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider/theme-provider";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/site";
import { getSiteNav } from "@/data/site-nav";
import { StructuredData } from "@/components/seo/structured-data";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { 
  generateOrganizationSchema, 
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateWebSiteSchema
} from "@/lib/structured-data";

// Evergreen body + UI face. Variable weight; the width axis is not loaded.
const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-ui",
  display: "swap",
});

// Display face for headline italics, pull quotes and numerals only — never
// body copy. Already the serif used on the expedition pages.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Travelspire Northeast | Arunachal Pradesh & Northeast India Tours",
    template: "%s | Travelspire North-East",
  },
  description: "A local travel company from Dibrugarh running Arunachal Pradesh tours — Tawang, Mechuka, Anini, Dong and Ziro — plus festival journeys and Inner Line Permit help across Northeast India.",
  keywords: [
    "North East India travel",
    "Arunachal Pradesh tours",
    "Assam tourism", 
    "Meghalaya trips",
    "Nagaland tours",
    "Manipur travel",
    "Mizoram tours", 
    "Tripura tourism",
    "authentic travel experiences",
    "local culture Northeast India",
    "adventure tourism",
    "eco tourism Northeast",
    "heritage tourism",
    "trekking Northeast India", 
    "wildlife tours",
    "festival tours",
    "offbeat destinations India",
    "responsible tourism",
    "Travelspire NE",
    "Northeast India guide",
    "tribal culture tours",
    "Hornbill Festival",
    "Ziro Festival",
    "Kaziranga National Park",
    "Tawang Monastery",
    "Cherrapunji",
    "Shillong",
    "Kohima",
    "Imphal"
  ],
  authors: [{ name: "Travelspire North-East", url: "https://travelspirene.com" }],
  creator: "Travelspire North-East",
  publisher: "Travelspire North-East",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://travelspirene.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://travelspirene.com",
    title: "Travelspire Northeast | Arunachal Pradesh & Northeast India Tours",
    description: "Locally run tours, expeditions and festival journeys across Arunachal Pradesh and Northeast India, with permits arranged — from a Dibrugarh-based team.",
    siteName: "Travelspire North-East",
    images: [
      {
        url: "/images/places/mechuka-new/mechuka-new-landscape-16.JPG",
        alt: "Mechuka Valley, Arunachal Pradesh — a Travelspire Northeast route",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travelspire Northeast | Arunachal & Northeast India Tours",
    description: "Locally run tours, expeditions and festival journeys across Arunachal Pradesh, with permits arranged.",
    creator: "@travelspire_ne",
    images: ["/images/places/mechuka-new/mechuka-new-landscape-16.JPG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Search Console: prefer a DNS-verified Domain property; this HTML tag is
  // the fallback and only renders when the env var is set.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  other: {
    "contact:phone": "+91-9864141211",
    "contact:email": "info@travelspirene.com",
    "contact:address": "HSR Layout, Dibrugarh, Assam, India",
    "business:contact_data:street_address": "HSR Layout",
    "business:contact_data:locality": "Dibrugarh",
    "business:contact_data:region": "Assam",
    "business:contact_data:postal_code": "786001",
    "business:contact_data:country_name": "India",
    "business:contact_data:phone_number": "+91-9864141211",
    "business:contact_data:website": "https://travelspirene.com",
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0B0D" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nav = getSiteNav();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-canvas font-ui text-fg antialiased">
        <GoogleAnalytics />
        {/* Enhanced Structured Data — all blocks share @id #organization so
            search engines merge them into one entity */}
        <StructuredData data={generateOrganizationSchema()} />
        <StructuredData data={generateLocalBusinessSchema()} />
        <StructuredData data={generateWebSiteSchema()} />
        <StructuredData data={generateServiceSchema()} />

        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only z-[60] rounded-control bg-brand px-4 py-2 font-ui text-small font-semibold text-on-brand focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
          >
            Skip to content
          </a>
          <SiteHeader nav={nav} />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <SiteFooter nav={nav} />
          <WhatsAppFloat href={nav.contact.whatsapp} />
        </ThemeProvider>
      </body>
    </html>
  );
}
