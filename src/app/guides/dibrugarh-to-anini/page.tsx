import type { Metadata } from "next";
import { Accent, Accordion, Container, Section, SectionHeader } from "@/components/ds";
import { IconClock, IconMountain, IconRoute, IconSunrise } from "@/components/icons";
import { RoadChapters, type ChapterFacts } from "@/components/guides/road-chapters";
import { ElevationProfile } from "@/components/places/elevation-profile";
import { NextPlaces, PlaceHero } from "@/components/places/place-kit";
import { PlaceTours } from "@/components/places/place-tours";
import { StructuredData } from "@/components/seo/structured-data";
import { CheckList, PlanCta } from "@/components/site/content-blocks";
import { SectionNav } from "@/components/site/section-nav";
import { wayChapters, wayFaqSection, wayHeroImages, wayRules, wayTiming } from "@/data/guides/way-to-anini";
import { aniniRouteProfile } from "@/data/places/anini";
import { anini2026Src } from "@/data/seo/image-seo-data";
import { createTripPlanningURL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const pageUrl = "https://travelspirene.com/guides/dibrugarh-to-anini";

export const metadata: Metadata = {
  title: {
    absolute: "Dibrugarh to Anini Road Guide 2026 — NH-313 in 9 Chapters",
  },
  description:
    "The Dibrugarh to Anini road guide by the team that drives NH-313 every week: the Bhupen Hazarika Setu, the Shantipur ILP gate, staging in Roing, Mayodia Pass and the plateau — with honest timings.",
  keywords: [
    "dibrugarh to anini",
    "how to reach anini",
    "roing to anini distance",
    "nh-313 road condition",
    "mayodia pass",
    "anini road trip",
    "dibrugarh to anini distance",
    "anini by road",
    "travelspire northeast",
  ],
  alternates: { canonical: "/guides/dibrugarh-to-anini" },
  openGraph: {
    title: "The Way to Anini — the road guide in 9 chapters | Travelspire NE",
    description:
      "From Assam's tea flats across one of India's longest river bridges and up 235 km of mountain road. The whole drive, told the way we actually run it.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: "/images/places/anini/Anini_10.JPG",
        width: 3024,
        height: 4032,
        alt: "Travellers on a hilltop above a forested valley in Dibang Valley",
      },
    ],
  },
  twitter: {
    title: "The Way to Anini — the road guide in 9 chapters | Travelspire NE",
    description: "Dibrugarh to Anini over the Mayodia Pass — nine chapters, honest timings, no shortcuts.",
  },
};

const articleSchema = {
  "@type": "Article",
  "@id": `${pageUrl}#article`,
  headline: "The Way to Anini — Dibrugarh to Anini by Road in Nine Chapters",
  description:
    "The road guide to reaching Anini, Dibang Valley: the Bhupen Hazarika Setu crossing, the ILP gate at Shantipur, staging in Roing, climbing Mayodia Pass, the slide-zone corridor, and arrival on the Anini plateau — with honest seasonal timings.",
  image: ["https://travelspirene.com/images/places/anini/Anini_10.JPG"],
  datePublished: "2026-08-19",
  dateModified: "2026-10-16",
  inLanguage: "en-IN",
  author: {
    "@type": "Organization",
    "@id": "https://travelspirene.com/#organization",
    name: "Travelspire Northeast",
    url: "https://travelspirene.com",
  },
  publisher: {
    "@type": "Organization",
    "@id": "https://travelspirene.com/#organization",
    name: "Travelspire Northeast",
    url: "https://travelspirene.com",
  },
  isPartOf: { "@id": `${pageUrl}#webpage` },
  mainEntityOfPage: pageUrl,
  about: {
    "@type": "TouristAttraction",
    "@id": "https://travelspirene.com/places/anini#place",
    name: "Anini, Dibang Valley",
    url: "https://travelspirene.com/places/anini",
  },
};

const webPageSchema = {
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: "Dibrugarh to Anini Road Guide 2026 — NH-313 in 9 Chapters",
  isPartOf: { "@id": "https://travelspirene.com/#website" },
  primaryImageOfPage: "https://travelspirene.com/images/places/anini/Anini_10.JPG",
  datePublished: "2026-08-19",
  dateModified: "2026-10-16",
  inLanguage: "en-IN",
};

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: wayFaqSection.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

// BreadcrumbList is emitted by the visible <Breadcrumbs> in the hero.
const wayGraph = {
  "@context": "https://schema.org",
  "@graph": [webPageSchema, articleSchema, faqSchema],
};

// The numbers for each stretch — distances from Roing and published
// altitudes from the NH-313 profile, plus the bridge itself.
const stop = (name: string) => aniniRouteProfile.find((s) => s.name === name)!;
const at = (name: string) => [
  { label: "From Roing", value: `${stop(name).km} km` },
  { label: "Altitude", value: `${stop(name).elev.toLocaleString("en-IN")} m` },
];
const chapterFacts: ChapterFacts = {
  "02": [{ label: "Bridge length", value: "9.15 km" }],
  "04": [...at("Roing"), { label: "Ahead", value: "235 km to Anini" }],
  "05": at("Coffee House"),
  "06": at("Mayodia Pass"),
  "07": at("Hunli"),
  "08": at("Etalin"),
  "09": at("Anini"),
};

const toneDot: Record<string, string> = {
  good: "bg-positive",
  caution: "bg-caution",
  avoid: "bg-line-strong",
};

const sections = [
  { id: "chapters", label: "The road" },
  { id: "climb", label: "The climb" },
  { id: "timing", label: "How long" },
  { id: "rules", label: "Rules" },
  { id: "faq", label: "FAQ" },
  { id: "tours", label: "Go with us" },
];

export default function WayToAniniPage() {
  const planUrl = createTripPlanningURL({ destination: "Dibrugarh to Anini by road" });

  return (
    <>
      <StructuredData data={wayGraph} />

      <PlaceHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Dibang Valley", href: "/places/dibang-valley" },
          { label: "Dibrugarh to Anini", href: "/guides/dibrugarh-to-anini" },
        ]}
        eyebrow="Road guide · by the team that drives it every week"
        title={
          <>
            The way <Accent>to Anini</Accent>
          </>
        }
        lead="Nine chapters from Assam's tea flats, across one of India's longest river bridges, through the ILP gate and up 235 km of mountain road to the quietest district headquarters in the country — told the way we actually run it."
        facts={[
          { label: "Dibrugarh → Anini", value: "About 340 km", icon: IconRoute },
          { label: "Roing → Anini", value: "235 km · 6–10 hrs", icon: IconClock },
          { label: "High point", value: "Mayodia · 2,655 m", icon: IconMountain },
          { label: "Departure", value: "6:00 AM, always", icon: IconSunrise },
        ]}
        image={wayHeroImages.desktop.src}
        imageAlt={wayHeroImages.alt}
        primary={{ label: "Ride with us", href: "#tours" }}
        whatsappHref={planUrl}
      />

      <SectionNav items={sections} />

      <Section id="chapters" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="The road, chapter by chapter"
            title={
              <>
                Nine stretches, <Accent>one long day</Accent>
              </>
            }
            intro="Each chapter is one real stretch of the drive — what it looks like, the numbers, and exactly what we do there."
          />
          <div className="mt-12">
            <RoadChapters chapters={wayChapters} facts={chapterFacts} />
          </div>
        </Container>
      </Section>

      <Section id="climb" tone="subtle" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="The climb, in one line"
            title={
              <>
                2,265 metres up <Accent>in 56 kilometres</Accent>
              </>
            }
            intro="The mountain leg: 235 km from Roing over Mayodia Pass to the Anini plateau. The steep rise is the pass; the long valley after it is where the road earns its reputation."
          />
          <ElevationProfile className="mt-10" stops={aniniRouteProfile} />
        </Container>
      </Section>

      <Section id="timing" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="How long it takes"
            title={
              <>
                A window, <Accent>never a best case</Accent>
              </>
            }
            intro="Roing to Anini, by season. The season picks your number — the mountain doesn't negotiate."
          />
          <ul className="mt-10 grid gap-x-8 gap-y-8 font-ui md:grid-cols-3">
            {wayTiming.map((t) => (
              <li key={t.label} className="border-t border-line pt-5">
                <p className="flex items-center gap-2 text-small font-semibold text-fg">
                  <span aria-hidden className={cn("size-2.5 rounded-full", toneDot[t.tone])} />
                  {t.label}
                </p>
                <p className="mt-3 text-h2 text-fg">{t.window}</p>
                <p className="mt-2 text-body text-fg-muted">{t.note}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="rules" tone="subtle" className="scroll-mt-32">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeader
            className="md:grid-cols-1 lg:self-start"
            eyebrow="Non-negotiable"
            title={
              <>
                Six rules <Accent>that never change</Accent>
              </>
            }
            intro="Every itinerary, every season. The travellers who get into trouble on this road broke one of these."
          />
          <CheckList items={[...wayRules]} tone="neutral" className="[&_li]:text-body-lg" />
        </Container>
      </Section>

      <Section id="faq" className="scroll-mt-32">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeader className="md:grid-cols-1 lg:self-start" eyebrow="FAQ" title={wayFaqSection.title} intro={wayFaqSection.description} />
          <Accordion items={wayFaqSection.faqs} />
        </Container>
      </Section>

      <PlaceTours
        tone="subtle"
        slugs={["anini-pomo-grassland-expedition", "anini-expedition", "pomo-trek-expedition"]}
        title={
          <>
            We drive this road <Accent>every week</Accent>
          </>
        }
        intro="The vehicle, the driver, the permits, the buffer day, the named lunch stop — every protocol on this page comes with the trip. One message starts it."
      />

      <Section spacing="compact">
        <Container>
          <h2 className="font-ui text-h3 text-fg">Plan the rest</h2>
          <NextPlaces
            className="mt-6 lg:grid-cols-3"
            places={[
              {
                name: "Anini guide",
                blurb: "What to do on the plateau, where to stay, when to go.",
                href: "/places/anini",
                image: anini2026Src.benchBoardwalk,
              },
              {
                name: "Arunachal ILP",
                blurb: "The permit — and why it must say Dibang Valley.",
                href: "/permits/arunachal-pradesh-ilp",
                image: "/images/places/dong-new/dong-new-portrait-6.jpg",
              },
              {
                name: "Roing guide",
                blurb: "Kilometre zero, and what to do with a day there.",
                href: "/places/roing",
                image: "/images/places/anini-new/anini-new-portrait-2.jpg",
              },
            ]}
          />
        </Container>
      </Section>

      <PlanCta whatsappHref={planUrl} />
    </>
  );
}
