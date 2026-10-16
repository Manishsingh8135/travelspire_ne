// app/ziro-music-festival-2026/page.tsx
import type { Metadata } from "next";
import { Accordion, Container, Eyebrow, Heading, Section, SectionHeader } from "@/components/ds";
import { IconCalendar, IconLeaf, IconMusic, IconPin } from "@/components/icons";
import { EndedNotice, Lineup, OpenNow, RecapHero } from "@/components/festivals/festival-recap";
import { ImageSEO } from "@/components/seo/image-seo";
import { StructuredData } from "@/components/seo/structured-data";
import { CheckList, PlanCta } from "@/components/site/content-blocks";
import { PhotoGallery } from "@/components/site/photo-gallery";
import { ziro2026, ziro2026Lineup, ziro2026Scenes, ziroAbout, ziroRecapFaqs } from "@/data/festivals/ziro-2026";
import { getPlaceImageAlt } from "@/data/seo/image-seo-data";
import { ziroFestival2026 } from "@/data/tours/festival-data";
import { generateZiroFestival2026Schema } from "@/lib/structured-data";
import { createTripPlanningURL } from "@/lib/whatsapp";

const pageUrl = "https://travelspirene.com/ziro-music-festival-2026";
const title = "Ziro Festival of Music 2027 — Dates Soon · 2026 Recap | Travelspire NE";
const description =
  "The 2026 Ziro Festival of Music (24–27 Sep) has wrapped. The 2026 line-up, photos of Ziro Valley, and how to plan Ziro and Arunachal any season — 2027 dates come from the festival's official channels.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "Ziro Festival of Music",
    "Ziro Festival 2027",
    "Ziro Festival 2026",
    "Ziro Valley",
    "Apatani",
    "Arunachal Pradesh music festival",
  ],
  openGraph: {
    title,
    description,
    images: [{ url: `https://travelspirene.com${ziroFestival2026.heroImage}`, alt: "Rice fields and pine ridges of Ziro Valley" }],
    url: pageUrl,
    siteName: "Travelspire NE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`https://travelspirene.com${ziroFestival2026.heroImage}`],
    site: "@TravelSpireNE",
  },
  alternates: { canonical: pageUrl },
};

export default function ZiroMusicFestival2026Page() {
  // The edition is over, so its event schema carries no offers (undefined
  // keys are dropped when the JSON-LD is serialised).
  const eventSchema = { ...generateZiroFestival2026Schema(), offers: undefined };
  const planUrl = createTripPlanningURL({ destination: "Ziro Valley" });
  const heroAlt = getPlaceImageAlt(ziroFestival2026.heroImage, "Rice fields and pine ridges of Ziro Valley, Arunachal Pradesh");

  return (
    <>
      <StructuredData data={eventSchema} />
      <ImageSEO location="ziro-new" limit={5} />

      <RecapHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Ziro Festival of Music 2026", href: "/ziro-music-festival-2026" },
        ]}
        eyebrow={`${ziro2026.dates.label} · Ziro Valley`}
        title="Ziro Festival of Music 2026,"
        accent="in review."
        lead="Four days of music in the rice fields of the Apatani plateau. The 2026 edition has wrapped — the valley, and the rest of Arunachal, are open year-round."
        image={ziroFestival2026.heroImage}
        imageAlt={heroAlt}
        primary={{ label: "See tours open now", href: "/all-tours" }}
        whatsappHref={planUrl}
      />

      <EndedNotice
        title="This edition has ended"
        facts={[
          { label: "Dates", value: "24–27 Sep 2026", icon: IconCalendar },
          { label: "Where", value: "Ziro Valley", icon: IconPin },
          { label: "Line-up", value: `${ziro2026.artistCount} artists`, icon: IconMusic },
          { label: "Running since", value: ziro2026.since, icon: IconLeaf },
        ]}
      >
        The 2027 dates will be announced on the festival&apos;s{" "}
        <a href={ziro2026.officialSite} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline underline-offset-4">
          official website
        </a>
        . We sold camping and travel packages for 2026; we&apos;ll update this page when the next edition opens.
      </EndedNotice>

      <Section tone="subtle">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <Eyebrow>The festival</Eyebrow>
            <Heading className="mt-3 max-w-[18ch]">Music in the Apatani valley</Heading>
            <p className="mt-4 max-w-[48ch] font-ui text-body text-fg-muted">{ziro2026.intro}</p>
          </div>
          <CheckList items={[...ziroAbout]} tone="neutral" className="self-center" />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="The 2026 line-up"
            title="Who played Ziro this year"
            intro="Highlights from the 2026 bill, grouped by where the music came from."
          />
          <div className="mt-10">
            <Lineup
              artists={ziro2026Lineup.map((a) => ({ name: a.name, detail: `${a.genre} · ${a.origin}`, group: a.scene }))}
              groups={[...ziro2026Scenes]}
            />
          </div>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container>
          <SectionHeader
            eyebrow="Ziro Valley"
            title="The valley around the stage"
            intro="Paddy fields, pine ridges and Apatani villages — photographed on our trips to Ziro."
          />
          <PhotoGallery
            className="mt-10"
            limit={5}
            photos={ziroFestival2026.gallery.map((src) => ({
              src,
              alt: getPlaceImageAlt(src, "Ziro Valley, Arunachal Pradesh"),
            }))}
          />
        </Container>
      </Section>

      <OpenNow
        title="Ziro is over for 2026."
        accent="Arunachal isn't."
        intro="October to April is the clearest season across Arunachal. These journeys run all season, with permits and transport handled."
        tourSlugs={["tawang-expedition", "mechuka-expedition", "anini-pomo-grassland-expedition", "mechuka-dong-anini-tour-package"]}
      />

      <Section tone="subtle">
        <Container size="prose">
          <SectionHeader title="Questions after the festival" size="h2" stacked />
          <Accordion className="mt-8" items={[...ziroRecapFaqs]} schema />
        </Container>
      </Section>

      <PlanCta
        title="Plan Ziro around your own dates."
        body="The rice terraces, the Apatani villages and Talley Valley don't need a festival. Tell us when you can travel."
        whatsappHref={planUrl}
        secondary={{ label: "Arunachal permit guide", href: "/permits/arunachal-pradesh-ilp" }}
      />
    </>
  );
}
