import type { Metadata } from "next";
import { Accent, Accordion, ButtonLink, Callout, Container, Section, SectionHeader } from "@/components/ds";
import { IconArrowRight, IconCalendar, IconPermit, IconPin, IconTent } from "@/components/icons";
import { CrowdCalendar, PackageList, StatusBoard, TribeList } from "@/components/festivals/hornbill-blocks";
import { FactList, NumberedList, PlaceHero, SplitStory, StayList } from "@/components/places/place-kit";
import { ImageSEO } from "@/components/seo/image-seo";
import { StructuredData } from "@/components/seo/structured-data";
import { PlanCta, Steps } from "@/components/site/content-blocks";
import { SectionNav } from "@/components/site/section-nav";
import {
  hornbillDays,
  hornbillDzukou,
  hornbillFaqs,
  hornbillHappenings,
  hornbillImages,
  hornbillMeta,
  hornbillNearby,
  hornbillPermits,
  hornbillRoute,
  hornbillStatus,
  hornbillStays,
  hornbillWeather,
  nagaTribes,
} from "@/data/festivals/hornbill";
import { placeImagesData } from "@/data/seo/image-seo-data";
import { hornbillFestival } from "@/data/tours/festival-data";
import { SITE_URL } from "@/lib/site";
import { createTripPlanningURL } from "@/lib/whatsapp";

const pageUrl = `${SITE_URL}${hornbillMeta.url}`;
const heroUrl = `${SITE_URL}${hornbillImages.hero.src}`;
const title = "Hornbill Festival 2026: Dates, Tickets, ILP & How to Reach Kisama";
const description =
  "Hornbill Festival 2026 runs 1–10 December at Kisama, Nagaland. Confirmed dates, the ₹200 ILP, entry tickets, the quietest days to go, how to get there from Dimapur, where to stay and the Dzükou trek, from a Northeast ground team.";

export const metadata: Metadata = {
  title: { absolute: `${title} | Travelspire NE` },
  description,
  keywords: [
    "Hornbill Festival",
    "Hornbill Festival 2026",
    "Hornbill Festival dates",
    "Hornbill Festival 2026 date",
    "Hornbill Festival Nagaland",
    "Hornbill Festival tickets",
    "Hornbill Festival entry fee",
    "Hornbill Festival ILP",
    "how to reach Hornbill Festival",
    "Hornbill Festival Kisama",
    "Naga Heritage Village Kisama",
    "Hornbill Festival camping",
    "Hornbill Festival where to stay",
    "Hornbill Festival and Dzukou Valley",
    "Hornbill Festival schedule",
  ].join(", "),
  openGraph: {
    title: "Hornbill Festival 2026 — the complete guide",
    description:
      "1–10 December at Kisama, Nagaland. Dates, permits, tickets, the best days to go, stays and the Dzükou trek, checked and dated.",
    url: pageUrl,
    siteName: "Travelspire NE",
    images: [{ url: heroUrl, width: 1006, height: 704, alt: hornbillImages.hero.alt }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hornbill Festival 2026 — the complete guide",
    description: "1–10 December at Kisama, Nagaland. Dates, permits, tickets, the best days to go and where to stay.",
    images: [heroUrl],
    site: "@TravelSpireNE",
  },
  alternates: { canonical: pageUrl },
};

const eventSchema = {
  "@type": "Festival",
  "@id": `${pageUrl}#event`,
  name: `Hornbill Festival ${hornbillMeta.year}`,
  alternateName: [`${hornbillMeta.edition}th Hornbill Festival`, "Festival of Festivals"],
  description:
    "Nagaland's ten-day festival of its tribes: performances by every recognised tribe, the morungs and Naga food, crafts, the Hornbill Music Festival and the Kohima Night Carnival.",
  startDate: hornbillMeta.start,
  endDate: hornbillMeta.end,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [heroUrl, `${SITE_URL}${hornbillImages.dance.src}`],
  url: pageUrl,
  location: {
    "@type": "Place",
    name: "Naga Heritage Village, Kisama",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kisama, Kohima",
      addressRegion: "Nagaland",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: hornbillMeta.geo.lat, longitude: hornbillMeta.geo.lng },
  },
  organizer: {
    "@type": "GovernmentOrganization",
    name: "Department of Tourism, Government of Nagaland",
    url: "https://tourism.nagaland.gov.in/",
  },
  sameAs: ["https://en.wikipedia.org/wiki/Hornbill_Festival", "https://tourism.nagaland.gov.in/events/hornbill-festival/"],
};

const webPageSchema = {
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: title,
  description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${pageUrl}#event` },
  primaryImageOfPage: heroUrl,
  datePublished: "2026-10-16",
  dateModified: hornbillMeta.checkedIso,
  inLanguage: "en-IN",
};

const faqSchema = {
  "@type": "FAQPage",
  "@id": `${pageUrl}#faq`,
  mainEntity: hornbillFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

// BreadcrumbList is emitted by the visible <Breadcrumbs> in the hero.
const graph = { "@context": "https://schema.org", "@graph": [webPageSchema, eventSchema, faqSchema] };

const sections = [
  { id: "status", label: "2026 at a glance" },
  { id: "best-days", label: "Best days" },
  { id: "whats-on", label: "What's on" },
  { id: "getting-there", label: "Getting there" },
  { id: "permits", label: "ILP & tickets" },
  { id: "stays", label: "Where to stay" },
  { id: "dzukou", label: "Dzükou" },
  { id: "packages", label: "Packages" },
  { id: "faq", label: "FAQ" },
];

export default function HornbillFestivalPage() {
  const planUrl = createTripPlanningURL({ destination: "Hornbill Festival, Nagaland" });
  const lowest = Math.min(...hornbillFestival.variants.map((v) => v.price));

  return (
    <>
      <StructuredData data={graph} />
      <ImageSEO images={placeImagesData.hornbill} limit={6} />

      <PlaceHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Hornbill Festival", href: hornbillMeta.url },
        ]}
        eyebrow={`${hornbillMeta.edition}th edition · Kisama, Nagaland`}
        title={
          <>
            Hornbill Festival 2026, <Accent>the festival of festivals</Accent>
          </>
        }
        lead="Ten days in December when all of Nagaland's tribes gather at one heritage village above Kohima, to dance, cook, compete and play. Here is what is confirmed for 2026, how to get there, and how to see it without the crush."
        facts={[
          { label: "Dates", value: hornbillMeta.datesLabel, icon: IconCalendar },
          { label: "Venue", value: "Kisama · 12 km from Kohima", icon: IconPin },
          { label: "Permit", value: "Nagaland ILP · ₹200", icon: IconPermit },
          { label: "Our packages", value: `From ₹${lowest.toLocaleString("en-IN")}`, icon: IconTent },
        ]}
        image={hornbillImages.hero.src}
        imageAlt={hornbillImages.hero.alt}
        primary={{ label: "See Hornbill packages", href: hornbillMeta.packagesHref }}
        whatsappHref={planUrl}
      />

      <SectionNav items={sections} />

      <Section id="status" spacing="compact" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="2026 at a glance"
            title={
              <>
                What&apos;s confirmed, <Accent>what&apos;s awaited</Accent>
              </>
            }
            intro="The state confirmed the 27th edition for 1–10 December in October. Ticket prices, partner countries and the day-by-day programme come later, and we update this list when they do."
          />
          <StatusBoard className="mt-10" items={hornbillStatus} checked={hornbillMeta.checked} />
        </Container>
      </Section>

      <Section id="best-days" tone="subtle" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="Which days to go"
            title={
              <>
                Ten days, <Accent>not all equal</Accent>
              </>
            }
            intro={
              <>
                More than 2.1 lakh people came in 2025, three in four of them from Nagaland. Crowds peak on the opening
                day, the weekend and the closing day. Our forecast for 2026 is read from the Tourism Department&apos;s
                daily counts. For room to breathe, pick{" "}
                <strong className="font-semibold text-fg">3, 7 or 8 December</strong>.
              </>
            }
          />
          <CrowdCalendar className="mt-10" days={hornbillDays} month="December 2026" />
        </Container>
      </Section>

      <Section id="whats-on" className="scroll-mt-32">
        <Container>
          <SplitStory
            eyebrow="Why Hornbill"
            title={
              <>
                Every tribe&apos;s festival, <Accent>in one village</Accent>
              </>
            }
            paragraphs={[
              "Nagaland began the festival in December 2000 to bring each tribe's own celebrations to one place and one season. It opens every year on 1 December, Statehood Day, at the Naga Heritage Village in Kisama, where each tribe keeps a morung of its own.",
              "It is named for the great hornbill, the bird that runs through Naga folklore and whose feathers crown the headgear you'll see in the arena.",
            ]}
            image={hornbillImages.dance.src}
            imageAlt={hornbillImages.dance.alt}
          />

          <SectionHeader
            className="mt-20"
            eyebrow="What's on"
            title="A day at Kisama, and the evenings after"
            intro="The official programme comes out close to the festival. This is the rhythm it has kept, edition after edition."
          />
          <NumberedList className="mt-10" items={hornbillHappenings} />

          <div className="mt-20 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <SectionHeader
              stacked className="lg:self-start"
              eyebrow="The tribes"
              title="Seventeen tribes, one arena"
              intro="These are Nagaland's recognised tribes; the Tikhir became the seventeenth in 2022. In 2025, 18 cultural troupes performed, including the Garo."
            />
            <TribeList tribes={nagaTribes} />
          </div>
        </Container>
      </Section>

      <Section id="getting-there" tone="subtle" className="scroll-mt-32">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeader
              stacked
              eyebrow="Getting there"
              title={
                <>
                  Dimapur, Kohima, <Accent>then Kisama</Accent>
                </>
              }
              intro="Everyone arrives the same way: into Dimapur, up the hill to Kohima, then down the Imphal road to the heritage village."
            />
            <Callout tone="caution" title="Road watch for 2026" className="mt-8">
              An August 2026 landslide damaged the highway between Kisama and Phesama. The state expects the stretch to be
              motorable by late November and has promised access to the venue. We will post any change here.
            </Callout>
          </div>
          <Steps items={hornbillRoute} />
        </Container>
      </Section>

      <Section id="permits" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="ILP & tickets"
            title={
              <>
                The permit first, <Accent>the ticket at the gate</Accent>
              </>
            }
            intro="Nagaland raised the tourist ILP to ₹200 in September 2025. Many sites still quote the old ₹50 and ₹100 rates."
            action={
              <ButtonLink href="/permits/nagaland-ilp" variant="secondary" size="sm">
                Full Nagaland ILP guide
                <IconArrowRight />
              </ButtonLink>
            }
          />
          <FactList className="mt-10" items={hornbillPermits} />
        </Container>
      </Section>

      <Section id="stays" tone="subtle" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="Where to stay"
            title={
              <>
                Town, village <Accent>or tent</Accent>
              </>
            }
            intro="Festival week fills Kohima and the villages around Kisama, and prices rise with it. Fix your bed as soon as you fix your dates."
          />
          <StayList className="mt-10" items={hornbillStays} />

          <h3 className="mt-16 font-ui text-h3 text-fg">Weather, money and manners</h3>
          <FactList className="mt-5" items={hornbillWeather} />
        </Container>
      </Section>

      <Section id="dzukou" className="scroll-mt-32">
        <Container>
          <SplitStory
            eyebrow="Add Dzükou Valley"
            title={
              <>
                Two days in the hills <Accent>after the crowds</Accent>
              </>
            }
            paragraphs={hornbillDzukou.paragraphs}
            image={hornbillImages.dzukou.src}
            imageAlt={hornbillImages.dzukou.alt}
            reverse
          />

          <h3 className="mt-20 font-ui text-h3 text-fg">Also near Kohima</h3>
          <NumberedList className="mt-8" items={hornbillNearby} />
        </Container>
      </Section>

      <Section id="packages" tone="subtle" className="scroll-mt-32">
        <Container>
          <SectionHeader
            eyebrow="Go with us"
            title={
              <>
                Hornbill, <Accent>from a ground team</Accent>
              </>
            }
            intro="Join at Dimapur or Kohima. Stays, local transport, permits and a trip leader are arranged; you buy your festival ticket at the gate."
          />
          <PackageList
            className="mt-10"
            variants={hornbillFestival.variants}
            tourHref={hornbillMeta.packagesHref}
            bookHref={`/book/${hornbillFestival.slug}`}
          />
        </Container>
      </Section>

      <Section id="faq" className="scroll-mt-32">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeader
            stacked className="lg:self-start"
            eyebrow="FAQ"
            title="Hornbill Festival, answered"
            intro={`Checked against Nagaland government sources on ${hornbillMeta.checked}.`}
          />
          <Accordion items={hornbillFaqs} />
        </Container>
      </Section>

      <PlanCta
        title="Tell us your Hornbill dates. We'll handle the rest."
        whatsappHref={planUrl}
        secondary={{ label: "See Hornbill packages", href: hornbillMeta.packagesHref }}
      />
    </>
  );
}
