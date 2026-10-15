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
import { FestivalWrappedBanner } from "@/components/festivals/common/festival-wrapped-banner";
import { ziroFestival2026 } from "@/data/tours/festival-data";
import { isPastDate } from "@/lib/dates";

export const revalidate = 21600; // DATE_DRIVEN_REVALIDATE_SECONDS — must be a literal

const pageUrl = "https://travelspirene.com/ziro-music-festival-2026";

function isEditionOver() {
  return isPastDate(ziroFestival2026.eventDates.end);
}

export async function generateMetadata(): Promise<Metadata> {
  if (isEditionOver()) {
    const title = "Ziro Festival of Music 2027 — Dates Soon · 2026 Recap | Travelspire NE";
    const description =
      "The 2026 Ziro Festival of Music (Sep 24–27) has wrapped. 2027 dates come from the festival's official channels — plan Ziro Valley and Arunachal journeys any season with Travelspire NE.";
    return {
      title: { absolute: title },
      description,
      keywords:
        "Ziro Festival of Music, Ziro Festival 2027, Ziro Festival 2026, Ziro Valley, Apatani, Arunachal Pradesh music festival",
      openGraph: {
        title,
        description,
        images: ["/images/og/travelspire-ne-og.png"],
        url: pageUrl,
        siteName: "Travelspire NE",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/images/og/travelspire-ne-og.png"],
        site: "@TravelSpireNE",
      },
      alternates: { canonical: pageUrl },
    };
  }

  return {
    title: { absolute: "Ziro Festival 2026 — Packages & Tickets | Travelspire NE" },
    description: "Book Ziro Festival of Music 2026 packages (Sep 24–27). Eco-friendly camping from ₹1,999; complete 4N/5D all-inclusive packages from ₹22,999.",
    keywords: "Ziro Music Festival 2026, Ziro Festival tickets, Ziro Festival packages, Ziro Festival 2026 booking, Arunachal Pradesh music festival, eco-friendly festival camping, Ziro Valley festival, indie music festival India, UNESCO heritage music festival, Apatani tribe festival",
    openGraph: {
      title: "Ziro Festival 2026 — Packages & Tickets | Travelspire NE",
      description: "Book official Ziro Music Festival 2026 packages (Sep 24-27). 35+ artists, eco-friendly camping in UNESCO valley.",
      images: ["/images/og/travelspire-ne-og.png"],
      url: pageUrl,
      siteName: "TravelSpire NE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Ziro Music Festival 2026 | Official Packages & Tickets",
      description: "Book official Ziro Music Festival 2026 packages (Sep 24-27). 35+ artists, eco-friendly camping in UNESCO valley.",
      images: ["/images/og/travelspire-ne-og.png"],
      site: "@TravelSpireNE",
    },
    alternates: { canonical: pageUrl },
  };
}

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
  const isPast = isEditionOver();
  // A finished edition sells nothing, so its event schema carries no offers.
  const { offers, ...eventSchema } = generateZiroFestival2026Schema();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Enhanced Structured Data for 2026 Festival */}
      <StructuredData data={isPast ? eventSchema : { ...eventSchema, offers }} />
      
      {/* Ziro Valley Images SEO */}
      <ImageSEO location="ziro-new" limit={5} />

      {isPast && (
        <FestivalWrappedBanner
          festivalName="Ziro Festival of Music"
          edition="2026"
          nextEdition="2027"
          nextStep={{ href: "/all-tours", label: "Explore Arunachal journeys" }}
        />
      )}
      
      {/* SSR Hero Section - Lightning Fast */}
      <ZiroHeroSSR isPast={isPast} />
      
      {/* SSR Festival Features V3 - Simple Card Layout */}
      <FestivalFeaturesSSRV3 />

      {/* Client-side sections: packages and stays, only while bookable */}
      {!isPast && <ZiroFestivalClientSections />}

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
