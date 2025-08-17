// app/ziro-music-festival-2025/page.tsx
import { Metadata } from "next";
import { ZiroHeroSSR } from "@/components/festivals/hero";
import { FestivalFeaturesSSRV3 } from "@/components/festivals/features/festival-features-ssr-v3";
import { FestivalLineupSSR } from "@/components/festivals/lineup/festival-lineup-ssr";
import { FestivalFAQFast } from "@/components/festivals/faqs/festival-faq-fast";
import { ZiroFestivalClientSections } from "@/components/festivals/ziro-festival-client-sections";
import { ziroFestivalFAQData } from "@/data/faqs/ziro-festival-faq-data";
import { StructuredData } from "@/components/seo/structured-data";
import { generateZiroFestival2025Schema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Ziro Music Festival 2025 | Official Packages & Tickets | TravelSpire NE",
  description: "Book official Ziro Music Festival 2025 packages (Sep 25-28). 35+ international & Indian artists, eco-friendly camping in UNESCO Tentative World Heritage Site. All-inclusive packages from ₹1,999.",
  keywords: "Ziro Music Festival 2025, Ziro Festival tickets, Ziro Festival packages, Ziro Festival 2025 booking, Arunachal Pradesh music festival, eco-friendly festival camping, Ziro Valley festival, indie music festival India, UNESCO heritage music festival, Apatani tribe festival",
  openGraph: {
    title: "Ziro Music Festival 2025 | Official Packages & Tickets | TravelSpire NE",
    description: "Book official Ziro Music Festival 2025 packages (Sep 25-28). 35+ artists, eco-friendly camping in UNESCO valley.",
    images: ["/images/places/ziro-new/ziro-new-landscape-1.jpeg"],
    url: "https://travelspirene.com/ziro-music-festival-2025",
    siteName: "TravelSpire NE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziro Music Festival 2025 | Official Packages & Tickets",
    description: "Book official Ziro Music Festival 2025 packages (Sep 25-28). 35+ artists, eco-friendly camping in UNESCO valley.",
    images: ["/images/places/ziro-new/ziro-new-landscape-1.jpeg"],
    site: "@TravelSpireNE",
  },
  alternates: {
    canonical: "https://travelspirene.com/ziro-music-festival-2025",
  },
};

// Enhanced artist lineup data with more artists for 2025
const lineup2025 = [
  { 
    name: "Shilpa Rao", 
    origin: "Mumbai", 
    type: "Bollywood/Mainstream",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
    genre: "Bollywood, Playback"
  },
  { 
    name: "Anna Erhard", 
    origin: "Switzerland", 
    type: "International",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    genre: "Folk, Indie"
  },
  { 
    name: "Soumik Datta", 
    origin: "UK", 
    type: "International",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    genre: "World Music, Sarod"
  },
  { 
    name: "Susheela Raman", 
    origin: "UK", 
    type: "International",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    genre: "World Music, Tamil"
  },
  { 
    name: "Buried Treasures", 
    origin: "France/Delhi", 
    type: "International",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    genre: "Electronic, Indie"
  },
  { 
    name: "Guitar Prasanna", 
    origin: "USA", 
    type: "International",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    genre: "Jazz Fusion, Guitar"
  },
  { 
    name: "Swarathma", 
    origin: "Bengaluru", 
    type: "Indian Indie",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    genre: "Folk Rock, Indie"
  },
  { 
    name: "Parvaaz", 
    origin: "Bengaluru", 
    type: "Indian Indie",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    genre: "Progressive Rock"
  },
  { 
    name: "Chorun Mugli", 
    origin: "Arunachal Pradesh", 
    type: "Northeast",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face",
    genre: "Traditional, Folk"
  },
  { 
    name: "Da Minot", 
    origin: "Meghalaya", 
    type: "Northeast",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
    genre: "Blues, Rock"
  },
  { 
    name: "Pink Eye", 
    origin: "Nagaland", 
    type: "Northeast",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
    genre: "Punk, Alternative"
  },
  { 
    name: "Remi Remi", 
    origin: "Arunachal Pradesh", 
    type: "Northeast",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&h=400&fit=crop&crop=face",
    genre: "Folk, Traditional"
  },
  // Additional artists for enhanced SEO
  { 
    name: "The Local Train", 
    origin: "New Delhi", 
    type: "Indian Indie",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
    genre: "Indie Rock, Hindi"
  },
  { 
    name: "Dualist Inquiry", 
    origin: "New Delhi", 
    type: "Indian Indie",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    genre: "Electronic, Ambient"
  },
  { 
    name: "Menwhopause", 
    origin: "Shillong", 
    type: "Northeast",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    genre: "Alternative Rock"
  }
];

export default function ZiroMusicFestival2025PageRoute() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Enhanced Structured Data for 2025 Festival */}
      <StructuredData data={generateZiroFestival2025Schema()} />
      
      {/* SSR Hero Section - Lightning Fast */}
      <ZiroHeroSSR />
      
      {/* SSR Festival Features V3 - Simple Card Layout */}
      <FestivalFeaturesSSRV3 />

      {/* Client-side sections */}
      <ZiroFestivalClientSections />

      {/* SSR Artist Lineup - Lightning Fast with Enhanced 2025 Lineup */}
      <FestivalLineupSSR 
        artists={lineup2025}
        year="2025"
        totalArtists="35+"
      />

      {/* FAQ Section - Lightning Fast Client */}
      <FestivalFAQFast section={ziroFestivalFAQData} />
      
      
    </div>
  );
}
