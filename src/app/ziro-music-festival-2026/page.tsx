// app/ziro-music-festival-2026/page.tsx
import { Metadata } from "next";
import { ZiroHeroSSR } from "@/components/festivals/hero";
import { FestivalFeaturesSSRV3 } from "@/components/festivals/features/festival-features-ssr-v3";
import { FestivalLineupCompact } from "@/components/festivals/lineup/festival-lineup-compact";
import { FestivalFAQFast } from "@/components/festivals/faqs/festival-faq-fast";
import { ZiroFestivalClientSections } from "@/components/festivals/ziro-festival-client-sections";
import { ziroFestivalFAQData } from "@/data/faqs/ziro-festival-faq-data";
import { StructuredData } from "@/components/seo/structured-data";
import { generateZiroFestival2026Schema } from "@/lib/structured-data";
import { ImageSEO } from "@/components/seo/image-seo";

export const metadata: Metadata = {
  title: "Ziro Music Festival 2026 | Official Packages & Tickets | TravelSpire NE",
  description: "Book official Ziro Music Festival 2026 packages (Sep 25-28). 35+ international & Indian artists, eco-friendly camping in UNESCO Tentative World Heritage Site. All-inclusive packages from ₹1,999.",
  keywords: "Ziro Music Festival 2026, Ziro Festival tickets, Ziro Festival packages, Ziro Festival 2026 booking, Arunachal Pradesh music festival, eco-friendly festival camping, Ziro Valley festival, indie music festival India, UNESCO heritage music festival, Apatani tribe festival",
  openGraph: {
    title: "Ziro Music Festival 2026 | Official Packages & Tickets | TravelSpire NE",
    description: "Book official Ziro Music Festival 2026 packages (Sep 25-28). 35+ artists, eco-friendly camping in UNESCO valley.",
    images: ["/images/og/travelspire-ne-og.png"],
    url: "https://travelspirene.com/ziro-music-festival-2026",
    siteName: "TravelSpire NE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziro Music Festival 2026 | Official Packages & Tickets",
    description: "Book official Ziro Music Festival 2026 packages (Sep 25-28). 35+ artists, eco-friendly camping in UNESCO valley.",
    images: ["/images/og/travelspire-ne-og.png"],
    site: "@TravelSpireNE",
  },
  alternates: {
    canonical: "https://travelspirene.com/ziro-music-festival-2026",
  },
};

// Enhanced artist lineup data with more artists for 2026
const lineup2026 = [
  { 
    name: "Shilpa Rao", 
    origin: "Mumbai", 
    type: "Bollywood/Mainstream",
    genre: "Bollywood, Playback"
  },
  { 
    name: "Anna Erhard", 
    origin: "Switzerland", 
    type: "International",
    genre: "Folk, Indie"
  },
  { 
    name: "Soumik Datta", 
    origin: "UK", 
    type: "International",
    genre: "World Music, Sarod"
  },
  { 
    name: "Susheela Raman", 
    origin: "UK", 
    type: "International",
    genre: "World Music, Tamil"
  },
  { 
    name: "Buried Treasures", 
    origin: "France/Delhi", 
    type: "International",
    genre: "Electronic, Indie"
  },
  { 
    name: "Guitar Prasanna", 
    origin: "USA", 
    type: "International",
    genre: "Jazz Fusion, Guitar"
  },
  { 
    name: "Swarathma", 
    origin: "Bengaluru", 
    type: "Indian Indie",
    genre: "Folk Rock, Indie"
  },
  { 
    name: "Parvaaz", 
    origin: "Bengaluru", 
    type: "Indian Indie",
    genre: "Progressive Rock"
  },
  { 
    name: "Chorun Mugli", 
    origin: "Arunachal Pradesh", 
    type: "Northeast",
    genre: "Traditional, Folk"
  },
  { 
    name: "Da Minot", 
    origin: "Meghalaya", 
    type: "Northeast",
    genre: "Blues, Rock"
  },
  { 
    name: "Pink Eye", 
    origin: "Nagaland", 
    type: "Northeast",
    genre: "Punk, Alternative"
  },
  { 
    name: "Remi Remi", 
    origin: "Arunachal Pradesh", 
    type: "Northeast",
    genre: "Folk, Traditional"
  },
  // Additional artists for enhanced SEO
  { 
    name: "The Local Train", 
    origin: "New Delhi", 
    type: "Indian Indie",
    genre: "Indie Rock, Hindi"
  },
  { 
    name: "Dualist Inquiry", 
    origin: "New Delhi", 
    type: "Indian Indie",
    genre: "Electronic, Ambient"
  },
  { 
    name: "Menwhopause", 
    origin: "Shillong", 
    type: "Northeast",
    genre: "Alternative Rock"
  }
];

export default function ZiroMusicFestival2026PageRoute() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Enhanced Structured Data for 2026 Festival */}
      <StructuredData data={generateZiroFestival2026Schema()} />
      
      {/* Ziro Valley Images SEO */}
      <ImageSEO location="ziro-new" limit={5} />
      
      {/* SSR Hero Section - Lightning Fast */}
      <ZiroHeroSSR />
      
      {/* SSR Festival Features V3 - Simple Card Layout */}
      <FestivalFeaturesSSRV3 />

      {/* Client-side sections */}
      <ZiroFestivalClientSections />

      {/* SSR Artist Lineup - Compact Version Without Images */}
      <FestivalLineupCompact 
        artists={lineup2026}
        year="2026"
        totalArtists="35+"
      />

      {/* FAQ Section - Lightning Fast Client */}
      <FestivalFAQFast section={ziroFestivalFAQData} />
      
      
    </div>
  );
}
