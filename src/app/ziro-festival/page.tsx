// app/ziro-festival/page.tsx
import { Metadata } from "next";
import { ZiroHeroSSR } from "@/components/festivals/hero";
import { FestivalFeaturesSSRV3 } from "@/components/festivals/features/festival-features-ssr-v3";
import { FestivalLineupSSR } from "@/components/festivals/lineup/festival-lineup-ssr";
import { FestivalFAQFast } from "@/components/festivals/faqs/festival-faq-fast";
import { ZiroFestivalClientSections } from "@/components/festivals/ziro-festival-client-sections";
import { ziroFestivalFAQData } from "@/data/faqs/ziro-festival-faq-data";

export const metadata: Metadata = {
  title: "Ziro Festival of Music 2025 | TravelSpire NE",
  description: "Experience India's premier eco-friendly outdoor music festival in UNESCO Tentative World Heritage Site Ziro Valley. 33+ artists, sustainable practices, Apatani culture.",
  keywords: "Ziro Festival, music festival, Arunachal Pradesh, eco-friendly festival, Apatani tribe, UNESCO heritage, indie music, outdoor festival",
  openGraph: {
    title: "Ziro Festival of Music 2025 | TravelSpire NE",
    description: "Experience India's premier eco-friendly outdoor music festival in UNESCO Tentative World Heritage Site Ziro Valley.",
    images: ["/images/places/ziro-new/ziro-new-landscape-1.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziro Festival of Music 2025 | TravelSpire NE",
    description: "Experience India's premier eco-friendly outdoor music festival in UNESCO Tentative World Heritage Site Ziro Valley.",
    images: ["/images/places/ziro-new/ziro-new-landscape-1.jpeg"],
  },
};

// Artist lineup data
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
  }
];

export default function ZiroFestivalPageRoute() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* SSR Hero Section - Lightning Fast */}
      <ZiroHeroSSR />
      
      {/* SSR Festival Features V3 - Simple Card Layout */}
      <FestivalFeaturesSSRV3 />

      {/* SSR Artist Lineup - Lightning Fast */}
      <FestivalLineupSSR 
        artists={lineup2025}
        year="2025"
        totalArtists="33+"
      />

      {/* FAQ Section - Lightning Fast Client */}
      <FestivalFAQFast section={ziroFestivalFAQData} />
      
      {/* Client-side sections */}
      <ZiroFestivalClientSections />
    </div>
  );
}
