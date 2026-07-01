import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SiteNav } from "@/components/marketing/site-nav";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Hero } from "@/components/marketing/hero/hero";
import { Problem } from "@/components/marketing/problem/problem";
import { Dream } from "@/components/marketing/dream/dream";
import { Experience } from "@/components/marketing/experience/experience";
import { LivingMap } from "@/components/marketing/map/living-map";
import { Mei } from "@/components/marketing/mei/mei";
import { Journey } from "@/components/marketing/journey/journey";
import { Exclusive } from "@/components/marketing/exclusive/exclusive";
import { Emotion } from "@/components/marketing/emotion/emotion";
import { Featured } from "@/components/marketing/featured/featured";
import { People } from "@/components/marketing/people/people";
import { Community } from "@/components/marketing/community/community";
import { Marketplace } from "@/components/marketing/marketplace/marketplace";
import { Atlas } from "@/components/marketing/atlas/atlas";
import { SocialProof } from "@/components/marketing/stories/social-proof";
import { Membership } from "@/components/marketing/membership/membership";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/og/travelspire-ne-og.png",
        width: 1200,
        height: 630,
        alt: "Travelspire — Northeast India, on your own terms",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <SiteNav />
      <MotionProvider>
        <main id="main">
          <Hero />
          <Problem />
          <Dream />
          <Experience />
          <LivingMap />
          <Mei />
          <Journey />
          <Exclusive />
          <Emotion />
          <Featured />
          <People />
          <Community />
          <Marketplace />
          <Atlas />
          <SocialProof />
          <Membership />
          {/* §17 Footer is the SiteFooter below. */}
        </main>
      </MotionProvider>
      <SiteFooter />
    </>
  );
}
