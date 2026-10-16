import type { Metadata } from "next";
import { Accent, Accordion, ButtonLink, Container, KeyFacts, Section, SectionHeader } from "@/components/ds";
import { IconArrowRight, IconCalendar, IconMountain, IconPermit, IconRoute } from "@/components/icons";
import { ElevationProfile } from "@/components/places/elevation-profile";
import {
  ExperienceGrid,
  FactList,
  NextPlaces,
  PlaceHero,
  QuoteBlock,
  SeasonStrip,
  StayList,
} from "@/components/places/place-kit";
import { PlaceTours } from "@/components/places/place-tours";
import { ImageSEO } from "@/components/seo/image-seo";
import { StructuredData } from "@/components/seo/structured-data";
import { PlanCta } from "@/components/site/content-blocks";
import { PhotoGallery } from "@/components/site/photo-gallery";
import { SectionNav } from "@/components/site/section-nav";
import {
  aniniExperiences,
  aniniFaqSection,
  aniniFrames,
  aniniHeroImages,
  aniniMeta,
  aniniNextPlaces,
  aniniPractical,
  aniniRouteProfile,
  aniniSeasons,
  aniniStats,
  aniniStays,
} from "@/data/places/anini";
import { anini2026Images } from "@/data/seo/image-seo-data";
import { createTripPlanningURL } from "@/lib/whatsapp";

const pageUrl = "https://travelspirene.com/places/anini";
const heroImageUrl = `https://travelspirene.com${aniniHeroImages.desktop.src}`;

export const metadata: Metadata = {
  title: {
    absolute: "Anini Travel Guide 2026 — How to Reach, ILP, Stays & Things to Do",
  },
  description:
    "The Anini guide by the team that drives NH-313 every week: the Mayodia Pass road, ILP permits, honest seasons, stays, Dri Valley, Pomo Grassland and Idu Mishmi villages.",
  keywords: [
    "Anini",
    "Anini Arunachal Pradesh",
    "Anini Dibang Valley",
    "how to reach Anini",
    "Dibrugarh to Anini",
    "Roing to Anini",
    "Mayodia Pass",
    "Anini weather",
    "best time to visit Anini",
    "Anini ILP permit",
    "things to do in Anini",
    "places to visit in Anini",
    "Dri Valley",
    "Pomo Grassland",
    "Seven Lakes Trek Anini",
    "Emuli Grassland",
    "Anini waterfalls",
    "Idu Mishmi",
    "Dibang Valley travel guide",
    "Anini homestay",
  ].join(", "),
  openGraph: {
    title: "Anini, Dibang Valley — the complete travel guide | Travelspire NE",
    description:
      "A plateau at 1,970 m between the Dri and Mathun rivers. The road, the permits, the seasons and the stays — from the people who drive it every week.",
    url: pageUrl,
    siteName: "Travelspire NE",
    images: [
      {
        url: heroImageUrl,
        width: 4032,
        height: 3024,
        alt: "Double rainbow over mountains and glamping tents at Anini, Dibang Valley",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anini, Dibang Valley — the complete 2026 guide",
    description:
      "How to reach, ILP permits, honest seasons, stays and the valley's best experiences — by the team that drives NH-313 every week.",
    images: [heroImageUrl],
    site: "@TravelSpireNE",
  },
  alternates: { canonical: pageUrl },
};

const placeSchema = {
  "@type": "TouristAttraction",
  "@id": `${pageUrl}#place`,
  name: "Anini, Dibang Valley",
  alternateName: "Anini",
  description:
    "Headquarters of Dibang Valley district in Arunachal Pradesh — a plateau at 1,970 m between the Dri and Mathun rivers, home of the Idu Mishmi, reached via NH-313 over the 2,655 m Mayodia Pass. One of India's least-visited and most biodiverse regions.",
  url: pageUrl,
  image: [heroImageUrl],
  sameAs: ["https://en.wikipedia.org/wiki/Anini"],
  containedInPlace: {
    "@type": "AdministrativeArea",
    name: "Dibang Valley district, Arunachal Pradesh, India",
    sameAs: "https://en.wikipedia.org/wiki/Dibang_Valley_district",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Anini",
    addressRegion: "Arunachal Pradesh",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: Number(aniniMeta.coordinates.lat),
    longitude: Number(aniniMeta.coordinates.lng),
  },
  touristType: ["Adventure travellers", "Nature photographers", "Culture travellers"],
  isAccessibleForFree: true,
  publicAccess: true,
};

const webPageSchema = {
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: "Anini, Dibang Valley: 2026 Travel Guide — How to Reach, ILP, Stays & Things to Do",
  isPartOf: { "@id": "https://travelspirene.com/#website" },
  about: { "@id": `${pageUrl}#place` },
  primaryImageOfPage: heroImageUrl,
  datePublished: "2026-08-19",
  dateModified: "2026-10-16",
  inLanguage: "en-IN",
};

const faqSchema = {
  "@type": "FAQPage",
  "@id": `${pageUrl}#faq`,
  mainEntity: aniniFaqSection.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

// BreadcrumbList is emitted by the visible <Breadcrumbs> in the hero.
const aniniGraph = {
  "@context": "https://schema.org",
  "@graph": [webPageSchema, placeSchema, faqSchema],
};

const sections = [
  { id: "experiences", label: "Things to do" },
  { id: "getting-there", label: "Getting there" },
  { id: "when-to-go", label: "When to go" },
  { id: "stays", label: "Where to stay" },
  { id: "photos", label: "Photos" },
  { id: "faq", label: "FAQ" },
  { id: "tours", label: "Tours" },
];

export default function AniniPlacePage() {
  const planUrl = createTripPlanningURL({ destination: "Anini, Dibang Valley" });

  return (
    <>
      <StructuredData data={aniniGraph} />
      <ImageSEO images={anini2026Images} limit={14} />

      <PlaceHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Dibang Valley", href: "/places/dibang-valley" },
          { label: "Anini", href: "/places/anini" },
        ]}
        eyebrow="Dibang Valley · Arunachal Pradesh"
        title={
          <>
            Anini, <Accent>the quiet plateau</Accent>
          </>
        }
        lead="A plateau at 1,970 m between the Dri and Mathun rivers — headquarters of Dibang Valley district and one of the least-visited corners of India. More forest than people, and night skies with almost no light in them."
        facts={[
          { label: "Altitude", value: "1,970 m", icon: IconMountain },
          { label: "From Roing", value: "235 km · NH-313", icon: IconRoute },
          { label: "Permit", value: "ILP (Dibang Valley)", icon: IconPermit },
          { label: "Best months", value: "Oct – Apr", icon: IconCalendar },
        ]}
        image={aniniHeroImages.desktop.src}
        imageAlt={aniniHeroImages.alt}
        primary={{ label: "See the six-day trip", href: "/tours/anini-pomo-grassland-expedition" }}
        whatsappHref={planUrl}
      />

      <SectionNav items={sections} />

      {/* At a glance: why the place is the way it is. */}
      <Section spacing="compact">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <QuoteBlock source="Travelspire field notes · Dibang Valley">
            Most places on the map are destinations. Anini is still a journey — 235 km of cloud pass, river gorges and
            suspension bridges stand between it and the rest of India, which is exactly what keeps it worth arriving at.
          </QuoteBlock>
          <KeyFacts
            layout="grid"
            items={aniniStats.map((s) => ({ label: s.label, value: `${s.value} ${s.unit}` }))}
          />
        </Container>
      </Section>

      <Section id="experiences" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="Things to do"
            title={
              <>
                What the valley <Accent>does to you</Accent>
              </>
            }
            intro="Seven ways in. None of them are checklist stops — each is half a day to a full day somewhere that doesn't feel like anywhere else."
          />
          <ExperienceGrid className="mt-10" items={aniniExperiences} />
        </Container>
      </Section>

      <Section id="getting-there" tone="subtle" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="Getting there"
            title={
              <>
                One road, one pass, <Accent>no shortcuts.</Accent>
              </>
            }
            intro="NH-313 from Roing: 235 km, a 2,655 m cloud pass and a final climb onto the plateau. Six to seven hours in dry conditions, eight to ten when the monsoon is leaving. We drive it every week."
            action={
              <ButtonLink href="/guides/dibrugarh-to-anini" variant="secondary" size="sm">
                Read the road guide
                <IconArrowRight />
              </ButtonLink>
            }
          />
          <ElevationProfile className="mt-10" stops={aniniRouteProfile} />
          <p className="mt-6 max-w-prose font-ui text-small text-fg-muted">
            Depart Roing by 6:00 AM, in daylight only, in an SUV or 4WD with a driver who knows the slide zones. Small
            hatchbacks and sedans are strongly discouraged.
          </p>
          <h3 className="mt-12 font-ui text-h3 text-fg">Before you leave Roing</h3>
          <FactList className="mt-5" items={aniniPractical} />
        </Container>
      </Section>

      <Section id="when-to-go" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="When to go"
            title={
              <>
                Twelve months, <Accent>honestly graded</Accent>
              </>
            }
            intro={
              <>
                Our pick: <strong className="font-semibold text-fg">late October to November</strong> — post-monsoon
                clarity, golden grasslands, kiwi harvest. September is festival month: beautiful, wet, and worth it with
                the right driver. June to August, we don&apos;t run leisure trips.
              </>
            }
          />
          <SeasonStrip className="mt-10" months={aniniSeasons} />
        </Container>
      </Section>

      <Section id="stays" tone="subtle" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="Where to stay"
            title={
              <>
                Few beds, <Accent>good ones</Accent>
              </>
            }
            intro="Festival weekend and peak October sell out weeks ahead — lock your stay the moment your dates are fixed."
          />
          <StayList className="mt-10" items={aniniStays} />
        </Container>
      </Section>

      <Section id="photos" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="Photos"
            title="From the plateau and the trails"
            intro="Every frame shot in Dibang Valley, captioned with the place it actually shows."
          />
          <PhotoGallery
            className="mt-10"
            photos={aniniFrames.map((f) => ({ src: f.src, alt: f.alt, caption: f.caption }))}
          />
        </Container>
      </Section>

      <Section id="faq" tone="subtle" className="scroll-mt-32">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeader className="md:grid-cols-1 lg:self-start" eyebrow="FAQ" title={aniniFaqSection.title} intro={aniniFaqSection.description} />
          <Accordion items={aniniFaqSection.faqs} />
        </Container>
      </Section>

      <PlaceTours
        slugs={["anini-pomo-grassland-expedition", "anini-expedition", "pomo-trek-expedition", "dambuk-anini-ofam"]}
        title={
          <>
            We drive this road every week. <Accent>Ride with us.</Accent>
          </>
        }
        intro="Six Days in the Dibang is the full week with the Pomo Grassland trek; the three-day loop is the short version. Permits, transport and stays included."
      />

      <Section spacing="compact" tone="subtle">
        <Container>
          <h2 className="font-ui text-h3 text-fg">Keep going east</h2>
          <NextPlaces className="mt-6" places={aniniNextPlaces} />
        </Container>
      </Section>

      <PlanCta whatsappHref={planUrl} />
    </>
  );
}
