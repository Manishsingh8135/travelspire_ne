import type { Metadata } from "next";
// import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider/theme-provider";
import AdvancedNavbar from "@/components/common/navbar/advance-navbar";
import FooterHome from "@/components/common/footer/footer-home";
//import Footer from "@/components/common/footer";

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
    default: "Travelspire North-East | Explore the Unexplored",
    template: "%s | Travelspire North-East",
  },
  description: "Experience authentic travel experiences in North-East India. Discover hidden gems, local culture, and breathtaking landscapes with Travelspire NE.",
  keywords: [
    "North East India travel",
    "Arunachal Pradesh tours",
    "Assam tourism",
    "Meghalaya trips",
    "Nagaland tours",
    "authentic travel experiences",
    "local culture",
    "adventure tourism",
    "Travelspire NE",
  ],
  authors: [{ name: "Travelspire North-East" }],
  creator: "Travelspire North-East",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://travelspirene.com",
    title: "Travelspire North-East | Authentic North-East India Travel Experiences",
    description: "Experience authentic travel experiences in North-East India. Discover hidden gems, local culture, and breathtaking landscapes with Travelspire NE.",
    siteName: "Travelspire North-East",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travelspire North-East",
    description: "Authentic North-East India Travel Experiences",
    creator: "@travelspire_ne",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    // Add your verification tokens here
    google: "your-google-verification-code",
    // other verification codes as needed
  },
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
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <AdvancedNavbar />
            <main className="flex-1">
              {children}
            </main>
            
          </div>
        </ThemeProvider>
        <FooterHome/>
      </body>
    </html>
  );
}