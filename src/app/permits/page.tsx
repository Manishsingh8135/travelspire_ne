import type { Metadata } from "next";
import Link from "next/link";
import {
  Accent,
  Accordion,
  Badge,
  Breadcrumbs,
  Container,
  Heading,
  Lead,
  Section,
  buttonVariants,
} from "@/components/ds";
import { IconArrowDown, IconChevronRight, IconExternal, IconGlobe, IconIdCard, IconPermit, IconWhatsApp } from "@/components/icons";
import { DataTable } from "@/components/permits/data-table";
import { CheckList, ContentSection, PlanCta, Steps } from "@/components/site/content-blocks";
import { SectionNav } from "@/components/site/section-nav";
import { StructuredData } from "@/components/seo/structured-data";
import {
  helpSteps,
  officialPortals,
  permitTypes,
  permitsHubFaqs,
  permitsHubSeo,
  stateRequirements,
  whyPermits,
  type StateRequirement,
} from "@/data/permits/hub-data";
import { createWhatsAppURL } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: permitsHubSeo.title,
  description: permitsHubSeo.description,
  keywords: [
    "Inner Line Permit",
    "ILP Arunachal Pradesh",
    "ILP Nagaland",
    "ILP Mizoram",
    "ILP Manipur",
    "Protected Area Permit",
    "PAP Northeast India",
    "travel permit Northeast India",
    "Tawang permit",
    "Sikkim permit",
    "Nathula Pass permit",
    "PAP for foreigners",
    "ILP online application",
  ],
  alternates: { canonical: permitsHubSeo.canonical },
  openGraph: {
    title: "Northeast India permits, plainly explained | Travelspire NE",
    description: permitsHubSeo.description,
    url: permitsHubSeo.canonical,
    type: "website",
    images: [{ url: "/images/og/permits-og.jpg", width: 1200, height: 630, alt: "Northeast India permit guide — Travelspire NE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Northeast India permits, plainly explained | Travelspire NE",
    description: permitsHubSeo.description,
    images: ["/images/og/permits-og.jpg"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Northeast India travel permit assistance",
  description:
    "Help with Inner Line Permits (ILP) and Protected Area Permits (PAP) for Arunachal Pradesh, Nagaland, Mizoram, Manipur and Sikkim — filed for every Travelspire trip.",
  provider: {
    "@type": "TravelAgency",
    name: "Travelspire North-East",
    url: "https://travelspirene.com",
    telephone: "+91-9864141211",
    email: "info@travelspirene.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "HSR Layout",
      addressLocality: "Dibrugarh",
      addressRegion: "Assam",
      postalCode: "786001",
      addressCountry: "IN",
    },
  },
  serviceType: "Travel permit processing",
  areaServed: ["Arunachal Pradesh", "Nagaland", "Mizoram", "Manipur", "Sikkim"].map((name) => ({
    "@type": "State",
    name,
    containedInPlace: { "@type": "Country", name: "India" },
  })),
};

const helpUrl = createWhatsAppURL({
  customMessage:
    "Hi Travelspire, I need help with Northeast permits.\nDestination: \nTravel dates: \nNumber of people: \nNationality: Indian / foreign",
});

function StateCell({ row }: { row: StateRequirement }) {
  return row.slug ? (
    <Link href={`/permits/${row.slug}`} className="group inline-flex items-center gap-1 text-fg hover:text-brand">
      {row.state}
      <IconChevronRight size={16} className="text-fg-subtle transition-transform group-hover:translate-x-0.5" />
    </Link>
  ) : (
    <span>{row.state}</span>
  );
}

const permitBadge = (value: string) => {
  if (value === "None") return <Badge tone="positive">No permit</Badge>;
  if (value === "ILP" || value === "PAP") return <Badge tone="brand">{value}</Badge>;
  return <span className="text-fg">{value}</span>;
};

export default function PermitsPage() {
  return (
    <>
      <StructuredData data={serviceSchema} />

      <Section spacing="none" className="pb-10 pt-6 md:pb-14 md:pt-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Permits", href: "/permits" },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end lg:gap-14">
            <div className="space-y-6">
              <Badge>Last checked {permitsHubSeo.lastChecked}</Badge>
              <Heading as="h1" size="h1" className="max-w-[18ch]">
                Northeast India permits, <Accent>plainly explained.</Accent>
              </Heading>
              <Lead className="max-w-[58ch]">
                Four states need an Inner Line Permit for Indian visitors, foreign nationals need a Protected Area
                Permit, and a few border points need one more. Here is which one you need, what it costs and where to
                apply.
              </Lead>
              <div className="flex flex-wrap gap-3">
                <a href="#by-state" className={buttonVariants({ size: "lg" })}>
                  Find your state
                  <IconArrowDown />
                </a>
                <a href={helpUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                  <IconWhatsApp />
                  Ask us to help
                </a>
              </div>
            </div>
            <aside aria-label="Quick answer" className="rounded-panel border border-line bg-surface p-6 font-ui shadow-e1">
              <p className="text-eyebrow uppercase text-fg-subtle">Quick answer</p>
              <ul className="mt-4 space-y-4">
                {[
                  { Icon: IconIdCard, title: "Indian citizens", body: "ILP for Arunachal, Nagaland, Mizoram and Manipur — online, ₹100–₹500." },
                  { Icon: IconGlobe, title: "Foreign nationals", body: "PAP through e-FRRO, in a group of two or more via a registered operator." },
                  { Icon: IconPermit, title: "Sikkim & border points", body: "Zone permits through an agent; Bum La and Nathula are Indians only." },
                ].map(({ Icon, title, body }) => (
                  <li key={title} className="flex gap-3">
                    <Icon size={20} className="mt-0.5 shrink-0 text-brand" />
                    <span>
                      <span className="block text-body font-semibold text-fg">{title}</span>
                      <span className="block text-small text-fg-muted">{body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>

      <SectionNav
        items={[
          { id: "by-state", label: "By state" },
          { id: "permit-types", label: "Permit types" },
          { id: "portals", label: "Official portals" },
          { id: "how-we-help", label: "How we help" },
          { id: "why", label: "Why permits exist" },
          { id: "faq", label: "FAQ" },
        ]}
      />

      <Container className="space-y-20 py-14 md:space-y-24 md:py-20">
        <ContentSection
          id="by-state"
          title="Which permit, state by state"
          intro="Tap a state for the full guide: documents, step-by-step application, entry points and official contacts."
        >
          <DataTable
            caption="Permit requirements for the eight Northeast states"
            rowKey={(r) => r.state}
            rows={stateRequirements}
            columns={[
              { key: "state", label: "State", primary: true, render: (r) => <StateCell row={r} /> },
              { key: "indians", label: "Indian citizens", render: (r) => permitBadge(r.indians) },
              { key: "foreigners", label: "Foreign nationals", render: (r) => permitBadge(r.foreigners) },
              { key: "fee", label: "Tourist fee", render: (r) => r.fee },
              { key: "apply", label: "How to apply", render: (r) => r.apply },
              { key: "note", label: "Worth knowing", render: (r) => r.note, className: "md:max-w-[18rem]" },
            ]}
          />
        </ContentSection>

        <ContentSection id="permit-types" title="Three kinds of permit">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            {permitTypes.map((t) => (
              <article key={t.id} className="border-t-2 border-fg pt-5 font-ui">
                <div className="flex items-center gap-2">
                  <h3 className="text-h3 text-fg">{t.name}</h3>
                  <Badge tone="brand">{t.shortName}</Badge>
                </div>
                <p className="mt-2 text-body text-fg-muted">{t.who}.</p>
                <dl className="mt-5 space-y-3 border-y border-line py-4 text-small">
                  {[
                    ["Where", t.states],
                    ["Valid for", t.validity],
                    ["Processing", t.processing],
                    ["Cost", t.cost],
                    ["On arrival", t.onArrival],
                    ["Legal basis", t.basis],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3">
                      <dt className="text-fg-subtle">{k}</dt>
                      <dd className="text-fg">{v}</dd>
                    </div>
                  ))}
                </dl>
                <CheckList title="Documents" items={t.documents} tone="neutral" className="mt-6 [&_h3]:text-body [&_h3]:font-semibold [&_li]:text-small" />
                <CheckList title="Good to know" items={t.notes} tone="include" className="mt-6 [&_h3]:text-body [&_h3]:font-semibold [&_li]:text-small" />
              </article>
            ))}
          </div>
        </ContentSection>

        <ContentSection
          id="portals"
          title="Apply on the official portals"
          intro="These are the government sites. Look-alike domains charge extra, and at least one old Arunachal address is now a parked domain."
        >
          <ul className="border-t border-line">
            {officialPortals.map((p) => (
              <li key={p.url} className="border-b border-line">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-1 py-4 font-ui sm:grid-cols-[12rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6"
                >
                  <span className="text-body font-semibold text-fg">{p.state}</span>
                  <span className="text-small text-fg-muted">
                    <span className="font-medium text-brand group-hover:underline group-hover:underline-offset-4">
                      {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </span>
                    <span className="block text-fg-subtle sm:inline sm:before:mx-2 sm:before:content-['·']">{p.contact}</span>
                  </span>
                  <IconExternal size={18} className="hidden text-fg-subtle sm:block" />
                </a>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection
          id="how-we-help"
          title="How we help"
          intro="Permits are filed for you on every Travelspire trip. Travelling independently? We can still tell you what to apply for, or file it for you."
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
            <Steps items={helpSteps} />
            <div className="self-start rounded-panel bg-canvas-subtle p-6 font-ui">
              <p className="text-h4 text-fg">Send us your route</p>
              <p className="mt-2 text-body text-fg-muted">
                Tell us where you&apos;re going, when, and who is travelling. A person in Dibrugarh replies, usually
                within a few hours.
              </p>
              <a href={helpUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: "mt-5" })}>
                <IconWhatsApp />
                Get permit help on WhatsApp
              </a>
            </div>
          </div>
        </ContentSection>

        <ContentSection id="why" title="Why the permits exist">
          <ol className="grid gap-x-10 gap-y-8 md:grid-cols-3">
            {whyPermits.map((w, i) => (
              <li key={w.title} className="border-t border-line pt-4 font-ui">
                <span className="text-small font-semibold text-highlight tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1.5 text-h4 text-fg">{w.title}</h3>
                <p className="mt-1 text-body text-fg-muted">{w.body}</p>
              </li>
            ))}
          </ol>
        </ContentSection>

        <ContentSection id="faq" title="Questions people ask">
          <Accordion items={permitsHubFaqs} schema className="max-w-4xl" />
        </ContentSection>
      </Container>

      <PlanCta
        title="Let us handle the paperwork."
        body="Every Travelspire trip includes permit filing. Send us your route and dates, and we'll tell you exactly what's needed."
        whatsappHref={helpUrl}
        secondary={{ label: "Browse tours", href: "/all-tours" }}
      />
    </>
  );
}
