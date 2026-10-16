import type { Metadata } from "next";
import { Accent, Accordion, ButtonLink, Container, Section, SectionHeader } from "@/components/ds";
import { IconArrowRight, IconCalendar, IconClock, IconPermit, IconRoute } from "@/components/icons";
import { NextPlaces, NumberedList, PlaceHero, SeasonStrip } from "@/components/places/place-kit";
import { PlaceTours } from "@/components/places/place-tours";
import { StructuredData } from "@/components/seo/structured-data";
import { PlanCta } from "@/components/site/content-blocks";
import { SectionNav } from "@/components/site/section-nav";
import {
  roingExperiences,
  roingFaqSection,
  roingHeroImages,
  roingNextPlaces,
  roingSeasons,
} from "@/data/places/roing";
import { createTripPlanningURL } from "@/lib/whatsapp";

const pageUrl = "https://travelspirene.com/places/roing";

export const metadata: Metadata = {
  title: {
    absolute: "Roing Travel Guide 2026 — Gateway to Anini & NH-313 Mile Zero",
  },
  description:
    "The Roing guide by the team that stages here every week. Mehao Lake, the Bhishmaknagar ruins, the last fuel and network before the 235 km climb to Anini, ILP permits and honest seasons.",
  keywords: [
    "roing travel guide",
    "roing arunachal pradesh",
    "roing to anini",
    "lower dibang valley",
    "mehao lake",
    "bhishmaknagar",
    "nh-313",
    "dibrugarh to roing",
    "travelspire northeast",
  ],
  alternates: { canonical: "/places/roing" },
  openGraph: {
    title: "Roing — where every Anini journey begins | Travelspire NE",
    description:
      "Mile zero of the NH-313 climb. Lakes, old fort walls, foothill light — and the last full stop before the high valley.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: "/images/places/anini-new/anini-new-portrait-2.jpg",
        width: 3024,
        height: 4032,
        alt: "Morning mist over a river and bare trees in Dibang country, Arunachal Pradesh",
      },
    ],
  },
  twitter: {
    title: "Roing — where every Anini journey begins | Travelspire NE",
    description: "The gateway town of Lower Dibang Valley — lakes, ruins, and the last full stop before the climb to Anini.",
  },
};

const placeSchema = {
  "@type": "TouristAttraction",
  "@id": `${pageUrl}#place`,
  name: "Roing",
  description:
    "Gateway town of Lower Dibang Valley, Arunachal Pradesh — mile zero of the NH-313 climb to Anini. Known for Mehao Lake, the Bhishmaknagar fort ruins, and as the last reliable stop for fuel, cash and network before the high valley.",
  url: pageUrl,
  image: ["https://travelspirene.com/images/places/anini-new/anini-new-portrait-2.jpg"],
  sameAs: ["https://en.wikipedia.org/wiki/Roing"],
  containedInPlace: {
    "@type": "AdministrativeArea",
    name: "Lower Dibang Valley district, Arunachal Pradesh, India",
    sameAs: "https://en.wikipedia.org/wiki/Lower_Dibang_Valley_district",
  },
  address: { "@type": "PostalAddress", addressLocality: "Roing", addressRegion: "Arunachal Pradesh", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 28.14278, longitude: 95.84278 },
  touristType: ["Nature travelers", "Road trippers", "History travelers", "Photographers"],
};

const webPageSchema = {
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: "Roing Travel Guide 2026 — Gateway to Anini, Mehao Lake & NH-313 Mile Zero",
  isPartOf: { "@id": "https://travelspirene.com/#website" },
  about: { "@id": `${pageUrl}#place` },
  primaryImageOfPage: "https://travelspirene.com/images/places/anini-new/anini-new-portrait-2.jpg",
  datePublished: "2026-08-19",
  dateModified: "2026-10-16",
  inLanguage: "en-IN",
};

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: roingFaqSection.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

// BreadcrumbList is emitted by the visible <Breadcrumbs> in the hero.
const roingGraph = {
  "@context": "https://schema.org",
  "@graph": [webPageSchema, placeSchema, faqSchema],
};

const sections = [
  { id: "experiences", label: "Things to do" },
  { id: "when-to-go", label: "When to go" },
  { id: "faq", label: "FAQ" },
  { id: "tours", label: "Tours" },
];

export default function RoingPlacePage() {
  const planUrl = createTripPlanningURL({ destination: "Roing and Anini" });

  return (
    <>
      <StructuredData data={roingGraph} />

      <PlaceHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Dibang Valley", href: "/places/dibang-valley" },
          { label: "Roing", href: "/places/roing" },
        ]}
        eyebrow="Lower Dibang Valley · Arunachal Pradesh"
        title={
          <>
            Roing, <Accent>the gateway</Accent>
          </>
        }
        lead="Mile zero of the NH-313 climb. Last fuel, last full network, first checkpoint — and, if you give it a night, a still lake, old fort walls and foothill light worth far more than a drive-through."
        facts={[
          { label: "From Dibrugarh", value: "About 3.5 hours", icon: IconClock },
          { label: "Road", value: "NH-313 · km 0", icon: IconRoute },
          { label: "Permit", value: "ILP", icon: IconPermit },
          { label: "Time needed", value: "1 day", icon: IconCalendar },
        ]}
        image={roingHeroImages.desktop.src}
        imageAlt={roingHeroImages.alt}
        primary={{ label: "The road to Anini", href: "/guides/dibrugarh-to-anini" }}
        whatsappHref={planUrl}
      />

      <SectionNav items={sections} />

      <Section id="experiences" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="Things to do"
            title={
              <>
                More than <Accent>a fuel stop</Accent>
              </>
            }
            intro="Every Anini journey stages here anyway. Give it a day and the errands become a chapter of the trip."
            action={
              <ButtonLink href="/places/anini" variant="secondary" size="sm">
                Where the road leads
                <IconArrowRight />
              </ButtonLink>
            }
          />
          <NumberedList className="mt-10" items={roingExperiences} />
        </Container>
      </Section>

      <Section id="when-to-go" tone="subtle" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="When to go"
            title={
              <>
                The low-valley <Accent>clock</Accent>
              </>
            }
            intro="Roing is fine most of the year, but in monsoon the rivers rise and the onward climb becomes a gamble. October to April is when the gateway and the road above it are both at their best."
          />
          <SeasonStrip className="mt-10" months={roingSeasons} />
        </Container>
      </Section>

      <Section id="faq" className="scroll-mt-32">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeader className="md:grid-cols-1 lg:self-start" eyebrow="FAQ" title={roingFaqSection.title} intro={roingFaqSection.description} />
          <Accordion items={roingFaqSection.faqs} />
        </Container>
      </Section>

      <PlaceTours
        slugs={["anini-pomo-grassland-expedition", "anini-expedition", "dambuk-anini-ofam"]}
        title={
          <>
            Mile zero, <Accent>sorted</Accent>
          </>
        }
        intro="We stage every Dibang journey here — permits, fuel, supplies, sleep — then climb over the pass into the high valley."
      />

      <Section spacing="compact" tone="subtle">
        <Container>
          <h2 className="font-ui text-h3 text-fg">Keep going</h2>
          <NextPlaces className="mt-6 lg:grid-cols-3" places={roingNextPlaces} />
        </Container>
      </Section>

      <PlanCta whatsappHref={planUrl} />
    </>
  );
}
