import type { Metadata } from "next";
import Image from "next/image";
import { Accordion, Container, Eyebrow, Heading, Section, SectionHeader } from "@/components/ds";
import { IconCalendar, IconMountain, IconMusic, IconVehicle } from "@/components/icons";
import { EndedNotice, Lineup, OpenNow, RecapHero } from "@/components/festivals/festival-recap";
import { StructuredData } from "@/components/seo/structured-data";
import { PlanCta } from "@/components/site/content-blocks";
import { PhotoGallery } from "@/components/site/photo-gallery";
import {
  awfArtists,
  awfEdition,
  awfEvergreen,
  awfGallery,
  awfHeroImages,
  awfLegacy,
  awfMeta,
  awfRecapFaqs,
  awfStayLonger,
} from "@/data/festivals/anini-winter-fest";
import { createTripPlanningURL } from "@/lib/whatsapp";

const siteUrl = "https://travelspirene.com";
const pageUrl = `${siteUrl}/anini-winter-fest-2026`;
const heroImageUrl = `${siteUrl}${awfHeroImages.desktop.src}`;

export const metadata: Metadata = {
  title: { absolute: `Anini Winter Fest ${awfEdition.nextYear} — Dates Soon · 2026 Recap | Travelspire NE` },
  description: `Anini Winter Fest 2026 (19–20 Sep) has wrapped — ${awfEdition.nextYear} dates will be announced on the festival's official channels. The 2026 line-up, photos, and how to plan Anini and Dibang Valley any season.`,
  keywords: [
    "Anini Winter Fest",
    `Anini Winter Fest ${awfEdition.nextYear}`,
    "Anini Winter Fest 2026",
    "Anini Winter Festival",
    "Dibang Valley music festival",
    "Anini tour package",
    "Dibrugarh to Anini",
  ],
  openGraph: {
    title: `Anini Winter Fest 2026 recap · ${awfEdition.nextYear} dates soon — Travelspire NE`,
    description:
      "AWF 5.0 played to Dibang Valley in September 2026. Plan Anini any season — the road, the stays and the valleys beyond — with the team that drives it.",
    url: pageUrl,
    siteName: "Travelspire NE",
    images: [{ url: heroImageUrl, width: 1200, height: 675, alt: awfHeroImages.alt }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Anini Winter Fest 2026 recap · ${awfEdition.nextYear} dates soon`,
    description: "AWF 5.0 has wrapped. Plan Anini and Dibang Valley any season with Travelspire NE.",
    images: [heroImageUrl],
    site: "@TravelSpireNE",
  },
  alternates: { canonical: pageUrl },
};

function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Anini Winter Fest 2026 — recap",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${pageUrl}#event` },
        primaryImageOfPage: heroImageUrl,
        datePublished: "2026-08-19",
        dateModified: "2026-10-16",
        inLanguage: "en-IN",
      },
      {
        // The edition took place as scheduled; past dates tell search engines
        // it is over. No offers — nothing is on sale.
        "@type": "MusicEvent",
        "@id": `${pageUrl}#event`,
        name: "Anini Winter Fest 2026 (AWF 5.0)",
        alternateName: "AWF 5.0",
        description:
          "The fifth edition of Anini Winter Fest — two days of music at 1,970 m in Dibang Valley, Arunachal Pradesh. Travelspire Northeast was the Official Travel & Taxi Partner.",
        startDate: awfMeta.dates.start,
        endDate: awfMeta.dates.end,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        image: [heroImageUrl],
        url: pageUrl,
        location: {
          "@type": "Place",
          "@id": `${siteUrl}/places/anini#place`,
          name: "Anini, Dibang Valley",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Anini",
            addressRegion: "Arunachal Pradesh",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: Number(awfMeta.coordinates.lat),
            longitude: Number(awfMeta.coordinates.lng),
          },
        },
        organizer: { "@type": "Organization", name: "Anini Winter Fest", sameAs: [awfMeta.officialSite, awfMeta.instagram] },
        performer: awfArtists.filter((a) => !a.tba).map((a) => ({ "@type": "MusicGroup", name: a.name })),
      },
    ],
  };
}

export default function AniniWinterFest2026Page() {
  const planUrl = createTripPlanningURL({ destination: "Anini, Dibang Valley" });
  const artists = awfArtists.map((a) => ({
    name: a.name,
    detail: a.genre === "Revealing Soon" ? a.origin : `${a.genre} · ${a.origin}`,
    group: a.day === 1 ? "Day 1 · Saturday 19 September" : "Day 2 · Sunday 20 September",
    headliner: a.headliner,
    image: a.image,
    imageAlt: a.imageAlt,
  }));

  return (
    <>
      <StructuredData data={structuredData()} />
      <RecapHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Anini Winter Fest 2026", href: "/anini-winter-fest-2026" },
        ]}
        eyebrow={`${awfMeta.dates.label} · ${awfMeta.location}`}
        title="Anini Winter Fest 2026,"
        accent="in review."
        lead="AWF 5.0 brought two days of music to the Anini plateau, 1,970 m up in Dibang Valley. We were its Official Travel & Taxi Partner. The festival is over — Anini isn't."
        image={awfHeroImages.desktop.src}
        imageAlt={awfHeroImages.alt}
        primary={{ label: "Plan Anini now", href: "/places/anini" }}
        whatsappHref={planUrl}
      />

      <EndedNotice
        title="This edition has ended"
        facts={[
          { label: "Dates", value: "19–20 Sep 2026", icon: IconCalendar },
          { label: "Where", value: `Anini · ${awfMeta.elevation}`, icon: IconMountain },
          { label: "Edition", value: `AWF ${awfMeta.edition}`, icon: IconMusic },
          { label: "Our role", value: "Official travel partner", icon: IconVehicle },
        ]}
      >
        Anini Winter Fest {awfEdition.nextYear} dates will be announced on the festival&apos;s{" "}
        <a href={awfMeta.officialSite} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline underline-offset-4">
          official website
        </a>{" "}
        and{" "}
        <a href={awfMeta.instagram} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline underline-offset-4">
          Instagram
        </a>
        . We&apos;ll update this page when they are.
      </EndedNotice>

      <Section tone="subtle">
        <Container>
          <SectionHeader
            eyebrow="The 2026 line-up"
            title="Who played the plateau"
            intro={`Nine acts across two nights — from Shillong trance to Bollywood playback. Line-up as published by the festival, verified ${awfMeta.lineupVerified}.`}
          />
          <div className="mt-10">
            <Lineup artists={artists} groups={["Day 1 · Saturday 19 September", "Day 2 · Sunday 20 September"]} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>Five editions</Eyebrow>
            <Heading className="mt-3 max-w-[18ch]">From a village gathering to a destination</Heading>
            <p className="mt-4 max-w-[46ch] font-ui text-body text-fg-muted">
              Anini Winter Fest grew out of Idu Mishmi community gatherings into one of Arunachal&apos;s best-known
              festivals — and helped put Dibang Valley on travellers&apos; maps.
            </p>
          </div>
          <ol className="border-t border-line font-ui">
            {awfLegacy.map((e) => (
              <li key={e.edition} className="grid grid-cols-[4rem_1fr] gap-4 border-b border-line py-5">
                <span className="text-small font-semibold text-highlight tabular-nums">AWF {e.edition}</span>
                <span>
                  <span className="block text-h4 text-fg">{e.title}</span>
                  <span className="mt-1 block text-body text-fg-muted">{e.note}</span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container>
          <SectionHeader
            eyebrow="The valley"
            title="Around the festival ground"
            intro="Anini, the Pomo grassland and the Dibang at Dambuk — the country the festival sits in, photographed on our own trips."
          />
          <PhotoGallery
            className="mt-10"
            limit={5}
            photos={awfGallery.map((p) => ({ src: p.src, alt: p.alt, caption: p.caption }))}
          />
        </Container>
      </Section>

      <OpenNow
        title="The festival's over."
        accent="The valley is open."
        intro="October to April is Anini's clearest season. These journeys run all season, with permits and the NH-313 drive handled."
        tourSlugs={["anini-pomo-grassland-expedition", "anini-expedition", "pomo-trek-expedition", "dambuk-anini-ofam"]}
        guides={awfEvergreen.map((g) => ({ name: g.name, blurb: g.blurb, href: g.href, image: g.image }))}
      />

      <Section tone="subtle">
        <Container>
          <SectionHeader
            eyebrow="Stay longer"
            title="What else the Dibang holds"
            intro="If you came for the festival and wished you'd stayed — these are the reasons to come back."
          />
          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {awfStayLonger.map((item) => (
              <li key={item.title} className="font-ui">
                <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-canvas">
                  <Image
                    src={item.images[0].src}
                    alt={item.images[0].alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-small text-fg-subtle">{item.tier}</p>
                <h3 className="mt-0.5 text-h4 text-fg">{item.title}</h3>
                <p className="mt-1 text-small text-fg-muted">{item.tags.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container size="prose">
          <SectionHeader title="Questions after the festival" size="h2" stacked />
          <Accordion className="mt-8" items={[...awfRecapFaqs]} schema />
        </Container>
      </Section>

      <PlanCta
        title="Missed the festival? Come for the valley."
        body="Tell us your dates and we'll plan Anini around them — the road, the stays and the permits."
        whatsappHref={planUrl}
        secondary={{ label: "Read the Anini guide", href: "/places/anini" }}
      />
    </>
  );
}
