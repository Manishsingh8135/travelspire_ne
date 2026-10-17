import type { Metadata } from "next";
import { Accent, Accordion, Container, KeyFacts, Section, SectionHeader } from "@/components/ds";
import { IconCalendar, IconMap, IconMountain, IconPermit } from "@/components/icons";
import {
  ExperienceGrid,
  MonthTable,
  NextPlaces,
  PlaceHero,
  SeasonStrip,
  SplitStory,
} from "@/components/places/place-kit";
import { PlaceTours } from "@/components/places/place-tours";
import { ImageSEO } from "@/components/seo/image-seo";
import { StructuredData } from "@/components/seo/structured-data";
import { PlanCta } from "@/components/site/content-blocks";
import { SectionNav } from "@/components/site/section-nav";
import {
  valleyChapters,
  valleyFaqSection,
  valleyHeroFacts,
  valleyHeroImages,
  valleyNextPlaces,
  valleyRiver,
  valleySeasons,
} from "@/data/places/dibang-valley";
import { anini2026Images } from "@/data/seo/image-seo-data";
import { createTripPlanningURL } from "@/lib/whatsapp";

const pageUrl = "https://travelspirene.com/places/dibang-valley";

export const metadata: Metadata = {
  title: {
    absolute: "Dibang Valley Travel Guide — Anini, Dambuk, Roing & More",
  },
  description:
    "The Dibang Valley guide by the team that drives NH-313 every week. Anini's plateau, Dambuk's orange orchards, Roing the gateway, the Mayodia pass — permits, seasons and how it fits into one journey.",
  keywords: [
    "dibang valley travel guide",
    "dibang valley arunachal pradesh",
    "anini dambuk roing",
    "pomo grassland trek",
    "seven lakes trek anini",
    "emuli grassland",
    "lower dibang valley",
    "nh-313 road trip",
    "mayodia pass",
    "idu mishmi",
    "dibang river",
    "travelspire northeast",
  ],
  alternates: { canonical: "/places/dibang-valley" },
  openGraph: {
    title: "Dibang Valley — one river, two worlds | Travelspire NE",
    description:
      "Arunachal's largest district and India's emptiest. Orange country below, cloud passes above — the complete guide to the whole valley.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: valleyHeroImages.desktop.src,
        width: valleyHeroImages.desktop.width,
        height: valleyHeroImages.desktop.height,
        alt: valleyHeroImages.alt,
      },
    ],
  },
  twitter: {
    title: "Dibang Valley — one river, two worlds | Travelspire NE",
    description: "Anini, Dambuk, Roing, Mayodia — the complete guide to India's emptiest frontier.",
  },
};

const placeSchema = {
  "@type": "TouristAttraction",
  "@id": `${pageUrl}#place`,
  name: "Dibang Valley",
  description:
    "Two districts sharing one river in eastern Arunachal Pradesh: Lower Dibang Valley (Roing, Dambuk) in the foothills and Dibang Valley district (Anini and beyond) in the high mountains. Dibang Valley is Arunachal's largest district by area and India's least densely populated, with fewer than one person per square kilometre.",
  url: pageUrl,
  image: [`https://travelspirene.com${valleyHeroImages.desktop.src}`],
  sameAs: [
    "https://en.wikipedia.org/wiki/Dibang_Valley_district",
    "https://en.wikipedia.org/wiki/Lower_Dibang_Valley_district",
  ],
  address: { "@type": "PostalAddress", addressRegion: "Arunachal Pradesh", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 28.7, longitude: 95.7 },
  containsPlace: [
    { "@type": "TouristAttraction", "@id": "https://travelspirene.com/places/anini#place", name: "Anini", url: "https://travelspirene.com/places/anini" },
    { "@type": "TouristAttraction", "@id": "https://travelspirene.com/places/dambuk#place", name: "Dambuk", url: "https://travelspirene.com/places/dambuk" },
    { "@type": "TouristAttraction", "@id": "https://travelspirene.com/places/roing#place", name: "Roing", url: "https://travelspirene.com/places/roing" },
  ],
  touristType: ["Nature travelers", "Road trippers", "Photographers", "Cultural travelers"],
};

const webPageSchema = {
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: "Dibang Valley Travel Guide — Anini, Dambuk, Roing & the Whole Valley",
  isPartOf: { "@id": "https://travelspirene.com/#website" },
  about: { "@id": `${pageUrl}#place` },
  primaryImageOfPage: `https://travelspirene.com${valleyHeroImages.desktop.src}`,
  datePublished: "2026-08-19",
  dateModified: "2026-10-16",
  inLanguage: "en-IN",
};

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: valleyFaqSection.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

// BreadcrumbList is emitted by the visible <Breadcrumbs> in the hero.
const valleyGraph = {
  "@context": "https://schema.org",
  "@graph": [webPageSchema, placeSchema, faqSchema],
};

const sections = [
  { id: "places", label: "Places" },
  { id: "river", label: "The river" },
  { id: "when-to-go", label: "When to go" },
  { id: "faq", label: "FAQ" },
  { id: "tours", label: "Tours" },
];

export default function DibangValleyPlacePage() {
  const planUrl = createTripPlanningURL({ destination: "Dibang Valley — Anini, Dambuk, Roing" });

  return (
    <>
      <StructuredData data={valleyGraph} />
      <ImageSEO images={anini2026Images} limit={14} />

      <PlaceHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Dibang Valley", href: "/places/dibang-valley" },
        ]}
        eyebrow="Eastern Arunachal Pradesh"
        title={
          <>
            Dibang Valley, <Accent>one river, two worlds</Accent>
          </>
        }
        lead="Arunachal's largest district and India's emptiest. Orange orchards and old ferry towns in the foothills; cloud passes and silent plateaus above. This page is the whole map in one place."
        facts={[
          { label: "Upper district", value: "9,129 km²", icon: IconMap },
          { label: "Highest road point", value: "Mayodia · 2,655 m", icon: IconMountain },
          { label: "Permit", value: "ILP (Dibang Valley)", icon: IconPermit },
          { label: "Best months", value: "Oct – Apr", icon: IconCalendar },
        ]}
        image={valleyHeroImages.desktop.src}
        imageAlt={valleyHeroImages.alt}
        primary={{ label: "Start with Anini", href: "/places/anini" }}
        whatsappHref={planUrl}
      />

      <SectionNav items={sections} />

      <Section spacing="compact">
        <Container>
          <KeyFacts items={valleyHeroFacts.map((f) => ({ label: f.label, value: f.value }))} />
        </Container>
      </Section>

      <Section id="places" className="scroll-mt-32" spacing="compact">
        <Container>
          <SectionHeader
            eyebrow="The places"
            title={
              <>
                The valley, <Accent>low to high</Accent>
              </>
            }
            intro="Dibang isn't one destination — it's a sequence. These are its chapters, in the order you'll travel them: the orchards and the gateway below, the pass, then the plateau and the valleys beyond it."
          />
          <ExperienceGrid
            className="mt-10"
            items={valleyChapters.map((c) => ({
              title: c.name,
              tag: c.tag,
              story: c.story,
              meta: c.meta,
              image: c.image,
              imageAlt: c.imageAlt,
              href: c.href,
            }))}
          />
        </Container>
      </Section>

      <Section id="river" tone="subtle" className="scroll-mt-32">
        <Container>
          <SplitStory
            eyebrow="One thread through everything"
            title={
              <>
                The river that <Accent>draws the map</Accent>
              </>
            }
            paragraphs={valleyRiver.body}
            image={valleyRiver.image}
            imageAlt={valleyRiver.imageAlt}
          />
        </Container>
      </Section>

      <Section id="when-to-go" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="When to go"
            title={
              <>
                The whole valley, <Accent>month by month</Accent>
              </>
            }
            intro="The low valley and the high valley share a clock but not the weather: when Mayodia is under snow, Dambuk is in harvest. We sequence every route so you get both at their best."
          />
          <SeasonStrip className="mt-10" months={valleySeasons} />
          <h3 className="mt-14 font-ui text-h3 text-fg">Month by month, low valley and high</h3>
          <p className="mt-2 max-w-prose font-ui text-body text-fg-muted">
            Open any month for temperatures and conditions in both halves of the valley, and what we&apos;d tell a friend.
          </p>
          <MonthTable
            className="mt-6"
            months={valleySeasons}
            lowLabel="Low valley · Dambuk & Roing"
            highLabel="High valley · Anini & Mayodia"
          />
        </Container>
      </Section>

      <Section id="faq" tone="subtle" className="scroll-mt-32">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeader stacked className="lg:self-start" eyebrow="FAQ" title={valleyFaqSection.title} intro={valleyFaqSection.description} />
          <Accordion items={valleyFaqSection.faqs} />
        </Container>
      </Section>

      <PlaceTours
        slugs={["anini-pomo-grassland-expedition", "anini-expedition", "pomo-trek-expedition"]}
        title={
          <>
            The whole region, <Accent>one plan</Accent>
          </>
        }
        intro="Orchards to plateau, one permit, one driver who knows every kilometre. Tell us your dates and how far you want to go — we'll build the route."
      />

      <Section spacing="compact" tone="subtle">
        <Container>
          <h2 className="font-ui text-h3 text-fg">Read next</h2>
          <NextPlaces className="mt-6 lg:grid-cols-3" places={valleyNextPlaces} />
        </Container>
      </Section>

      <PlanCta whatsappHref={planUrl} />
    </>
  );
}
