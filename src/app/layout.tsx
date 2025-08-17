import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider/theme-provider";
import AdvancedNavbar from "@/components/common/navbar/advance-navbar";
import FooterHome from "@/components/common/footer/footer-home";
import { StructuredData } from "@/components/seo/structured-data";
import { WhatsAppWidget } from "@/components/whatsapp-widget";
import { 
  generateOrganizationSchema, 
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateWhatsAppSchema
} from "@/lib/structured-data";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Travelspire North-East | Explore the Unexplored Northeast India",
    template: "%s | Travelspire North-East",
  },
  description: "Experience authentic travel adventures in Northeast India with Travelspire NE. Expert local guides, offbeat destinations, cultural immersion, and responsible tourism across Arunachal Pradesh, Assam, Meghalaya, Nagaland, Manipur, Mizoram & Tripura.",
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
    "Orange Festival",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://travelspirene.com",
    title: "Travelspire North-East | Authentic Northeast India Travel Experiences",
    description: "Experience authentic travel adventures in Northeast India with expert local guides. Discover hidden gems, rich tribal culture, and breathtaking landscapes across all 8 northeastern states.",
    siteName: "Travelspire North-East",
    images: [
      {
        url: "/images/logo/Travelspire_ne_logo_new.png",
        width: 1200,
        height: 630,
        alt: "Travelspire North-East - Authentic Northeast India Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travelspire North-East | Explore Northeast India",
    description: "Authentic Northeast India travel experiences with expert local guides",
    creator: "@travelspire_ne",
    images: ["/images/logo/Travelspire_ne_logo_new.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Enhanced Structured Data */}
        <StructuredData data={generateOrganizationSchema()} />
        <StructuredData data={generateLocalBusinessSchema()} />
        <StructuredData data={generateServiceSchema()} />
        <StructuredData data={generateWhatsAppSchema()} />
        
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="dark"
        >
          <div className="relative flex min-h-screen flex-col">
            <AdvancedNavbar />
            <main className="flex-1">
              {children}
            </main>
            
            {/* WhatsApp Widget - Available on all pages */}
            <WhatsAppWidget />
          </div>
        </ThemeProvider>
        <FooterHome/>
      </body>
    </html>
  );
}