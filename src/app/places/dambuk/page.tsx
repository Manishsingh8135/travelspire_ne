import type { Metadata } from "next";
import { Accent, Accordion, Container, Section, SectionHeader } from "@/components/ds";
import { IconCalendar, IconClock, IconLeaf, IconPermit } from "@/components/icons";
import { ExperienceGrid, NextPlaces, PlaceHero, SeasonStrip } from "@/components/places/place-kit";
import { PlaceTours } from "@/components/places/place-tours";
import { StructuredData } from "@/components/seo/structured-data";
import { PlanCta } from "@/components/site/content-blocks";
import { PhotoGallery } from "@/components/site/photo-gallery";
import { SectionNav } from "@/components/site/section-nav";
import {
  dambukExperiences,
  dambukFaqSection,
  dambukFrames,
  dambukHeroImages,
  dambukNextPlaces,
  dambukSeasons,
} from "@/data/places/dambuk";
import { createTripPlanningURL } from "@/lib/whatsapp";

const pageUrl = "https://travelspirene.com/places/dambuk";

export const metadata: Metadata = {
  title: {
    absolute: "Dambuk Travel Guide 2026 — Orange Orchards & the Dibang",
  },
  description:
    "The Dambuk guide by the team that drives this road every week. Orange harvest (Nov–Jan), the Dibang riverbanks, the bridge that ended the ferry era, and pairing Dambuk with Roing and Anini.",
  keywords: [
    "dambuk travel guide",
    "dambuk oranges",
    "dambuk arunachal pradesh",
    "lower dibang valley",
    "dambuk orange season",
    "dibang river",
    "dambuk to anini",
    "dambuk tour package",
    "travelspire northeast",
  ],
  alternates: { canonical: "/places/dambuk" },
  openGraph: {
    title: "Dambuk — where the river grows oranges | Travelspire NE",
    description:
      "Orange country on the banks of the Dibang. Harvest season, riverbank sunsets and the road onward to Anini — the complete guide.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: "/images/places/dambuk/Dambuk_7.jpg",
        width: 3024,
        height: 4032,
        alt: "Fresh oranges packed in net bags for sale in Dambuk",
      },
    ],
  },
  twitter: {
    title: "Dambuk — where the river grows oranges | Travelspire NE",
    description: "Orange orchards, the Dibang riverbanks and the road onward to Anini — the complete Dambuk guide.",
  },
};

const placeSchema = {
  "@type": "TouristAttraction",
  "@id": `${pageUrl}#place`,
  name: "Dambuk",
  description:
    "Riverside town in Lower Dibang Valley, Arunachal Pradesh, known for its orange orchards, the Dibang riverbanks, and the bridge that ended decades of ferry crossings. Best visited November to January during harvest.",
  url: pageUrl,
  image: ["https://travelspirene.com/images/places/dambuk/Dambuk_7.jpg"],
  sameAs: ["https://en.wikipedia.org/wiki/Dambuk"],
  containedInPlace: {
    "@type": "AdministrativeArea",
    name: "Lower Dibang Valley district, Arunachal Pradesh, India",
    sameAs: "https://en.wikipedia.org/wiki/Lower_Dibang_Valley_district",
  },
  address: { "@type": "PostalAddress", addressLocality: "Dambuk", addressRegion: "Arunachal Pradesh", addressCountry: "IN" },
  touristType: ["Nature travelers", "Road trippers", "Food and farm travelers", "Photographers"],
};

const webPageSchema = {
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: "Dambuk Travel Guide 2026 — Orange Orchards, Dibang Riverbanks & How to Reach",
  isPartOf: { "@id": "https://travelspirene.com/#website" },
  about: { "@id": `${pageUrl}#place` },
  primaryImageOfPage: "https://travelspirene.com/images/places/dambuk/Dambuk_7.jpg",
  datePublished: "2026-08-19",
  dateModified: "2026-10-16",
  inLanguage: "en-IN",
};

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: dambukFaqSection.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

// BreadcrumbList is emitted by the visible <Breadcrumbs> in the hero.
const dambukGraph = {
  "@context": "https://schema.org",
  "@graph": [webPageSchema, placeSchema, faqSchema],
};

const sections = [
  { id: "experiences", label: "Things to do" },
  { id: "photos", label: "Photos" },
  { id: "when-to-go", label: "When to go" },
  { id: "faq", label: "FAQ" },
  { id: "tours", label: "Tours" },
];

export default function DambukPlacePage() {
  const planUrl = createTripPlanningURL({ destination: "Dambuk, Lower Dibang Valley" });

  return (
    <>
      <StructuredData data={dambukGraph} />

      <PlaceHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Dibang Valley", href: "/places/dibang-valley" },
          { label: "Dambuk", href: "/places/dambuk" },
        ]}
        eyebrow="Lower Dibang Valley · Arunachal Pradesh"
        title={
          <>
            Dambuk, <Accent>orange country</Accent>
          </>
        }
        lead="A town on the banks of the Dibang that the river kept cut off for decades — now known for its orange orchards, wide shingle beaches and sunsets that turn the riverbank gold."
        facts={[
          { label: "Orange harvest", value: "Nov – Jan", icon: IconLeaf },
          { label: "From Dibrugarh", value: "About 4 hours", icon: IconClock },
          { label: "Permit", value: "ILP", icon: IconPermit },
          { label: "Time needed", value: "1–2 days", icon: IconCalendar },
        ]}
        image={dambukHeroImages.desktop.src}
        imageAlt={dambukHeroImages.alt}
        primary={{ label: "See Dambuk tours", href: "#tours" }}
        whatsappHref={planUrl}
      />

      <SectionNav items={sections} />

      <Section id="experiences" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="Things to do"
            title={
              <>
                Orchards, river, <Accent>and the bridge</Accent>
              </>
            }
            intro="Four reasons to stop — and a night here turns the stop into a chapter."
          />
          <ExperienceGrid className="mt-10" items={dambukExperiences} />
        </Container>
      </Section>

      <Section id="photos" tone="subtle" className="scroll-mt-32">
        <Container>
          <SectionHeader eyebrow="Photos" title="Harvest, festival nights and the plains" />
          <PhotoGallery className="mt-10" photos={dambukFrames.map((f) => ({ src: f.src, alt: f.alt, caption: f.caption }))} />
        </Container>
      </Section>

      <Section id="when-to-go" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="When to go"
            title={
              <>
                Harvest is <Accent>the season</Accent>
              </>
            }
            intro="Dambuk is a flood-plain town: in monsoon the Dibang reclaims the banks and the road is a risk, not a route. November to January is when the oranges, the weather and the river light all agree."
          />
          <SeasonStrip className="mt-10" months={dambukSeasons} />
        </Container>
      </Section>

      <Section id="faq" tone="subtle" className="scroll-mt-32">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeader className="md:grid-cols-1 lg:self-start" eyebrow="FAQ" title={dambukFaqSection.title} intro={dambukFaqSection.description} />
          <Accordion items={dambukFaqSection.faqs} />
        </Container>
      </Section>

      <PlaceTours
        slugs={["orange-festival-2026", "dambuk-anini-ofam", "dambuk-dong-valley-ofam", "dambuk-golden-pagoda-ofam"]}
        title={
          <>
            Start the valley <Accent>in Dambuk</Accent>
          </>
        }
        intro="Orchards, the bridge at dusk, then the long road onward to Anini or Dong. Every route is sequenced so each leg runs in daylight."
      />

      <Section spacing="compact" tone="subtle">
        <Container>
          <h2 className="font-ui text-h3 text-fg">Keep going</h2>
          <NextPlaces className="mt-6 lg:grid-cols-3" places={dambukNextPlaces} />
        </Container>
      </Section>

      <PlanCta whatsappHref={planUrl} />
    </>
  );
}
