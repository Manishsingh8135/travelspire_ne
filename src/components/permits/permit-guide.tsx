import Link from "next/link";
import * as React from "react";
import {
  Accordion,
  Badge,
  Breadcrumbs,
  ButtonLink,
  Callout,
  Container,
  Heading,
  KeyFacts,
  Lead,
  Section,
  buttonVariants,
  type FaqItem,
  type KeyFact,
} from "@/components/ds";
import {
  IconArrowRight,
  IconChevronRight,
  IconExternal,
  IconMail,
  IconPermit,
  IconPhone,
  IconWhatsApp,
} from "@/components/icons";
import { CheckList, ContentSection, PlanCta, Steps } from "@/components/site/content-blocks";
import { SectionNav, type SectionNavItem } from "@/components/site/section-nav";
import { contactInfo } from "@/data/social/social-links";
import { createWhatsAppURL } from "@/lib/whatsapp";
import { DataTable } from "./data-table";

/* One template for every state permit guide. The page answers the question
   first (who needs it, cost, time, where to apply), then walks the process
   in the order people do it. Sections are optional; the in-page nav lists
   only the ones a state actually has. */

export type PermitStep = { title: string; description: string; details: string[]; duration?: string };
export type PermitDocument = { name: string; description: string; options?: string[]; specifications?: string; note?: string };
export type PermitDocGroup = { title: string; items: { name: string; description: string }[] };
export type PermitEntryPoint = { name: string; type: string; from: string; note: string };
export type PermitDestination = { name: string; highlight: string; district?: string; permitRequired: string; bestTime: string; altitude: string };
export type PermitSeason = { name: string; description: string; temperature?: string; ideal: boolean; note?: string };
export type PermitOffice = { city: string; address: string; phone?: string };
export type PermitFeeRow = { category: string; fee: string; validity: string };

export type PermitGuideModel = {
  state: string;
  slug: string;
  permit: string;
  shortName: string;
  lastChecked: string;
  summary: string;
  facts: KeyFact[];
  portal?: { url: string; label: string; cta?: string; note?: string };
  helpline?: string;
  email?: string;
  whoNeeds?: { required: string[]; notRequired: string[]; foreigners?: string };
  /** Replaces whoNeeds and steps for zone-based states (Sikkim). */
  custom?: { id: string; label: string; title: string; intro?: string; content: React.ReactNode }[];
  steps?: PermitStep[];
  documents?: { mandatory: PermitDocument[]; groups?: PermitDocGroup[]; tips: string[] };
  fees?: PermitFeeRow[];
  entryPoints?: PermitEntryPoint[];
  border?: {
    title: string;
    description: string;
    areas: { name: string; location: string; nearBorder: string; note: string; indiansAllowed: boolean; foreignersAllowed: boolean }[];
    howToApply: string;
  };
  festival?: {
    name: string;
    dates: string;
    venue: string;
    description: string;
    tips: string[];
    highlights?: string[];
    link?: { label: string; href: string };
  };
  destinations?: PermitDestination[];
  tips?: { title: string; description: string }[];
  seasons?: { recommended: string; seasons: PermitSeason[] };
  offices?: { label: string; list: PermitOffice[] };
  faqs: FaqItem[];
  related: { name: string; slug: string }[];
};

export function PermitGuide({ model }: { model: PermitGuideModel }) {
  const help = createWhatsAppURL({
    customMessage: `Hi Travelspire, I need help with the ${model.state} ${model.shortName}. Travel dates: \nNumber of people: \nNationality: Indian / foreign`,
  });

  const nav: SectionNavItem[] = [
    ...(model.whoNeeds ? [{ id: "who-needs-it", label: "Who needs it" }] : []),
    ...(model.custom ?? []).map((c) => ({ id: c.id, label: c.label })),
    ...(model.steps ? [{ id: "how-to-apply", label: "How to apply" }] : []),
    ...(model.documents ? [{ id: "documents", label: "Documents" }] : []),
    ...(model.fees ? [{ id: "fees", label: "Fees" }] : []),
    ...(model.border ? [{ id: "border-permits", label: "Border permits" }] : []),
    ...(model.festival ? [{ id: "festival", label: model.festival.name }] : []),
    ...(model.entryPoints ? [{ id: "entry-points", label: "Entry points" }] : []),
    ...(model.destinations ? [{ id: "destinations", label: "Places" }] : []),
    ...(model.tips || model.seasons ? [{ id: "tips", label: "Tips & seasons" }] : []),
    ...(model.offices || model.helpline ? [{ id: "contacts", label: "Contacts" }] : []),
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      <Section spacing="none" className="pb-10 pt-6 md:pb-14 md:pt-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Permits", href: "/permits" },
              { label: `${model.state} ${model.shortName}`, href: `/permits/${model.slug}` },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge tone="brand">{model.shortName}</Badge>
                <Badge>Last checked {model.lastChecked}</Badge>
              </div>
              <Heading as="h1" size="h1" className="max-w-[20ch]">
                {model.state} {model.permit}
              </Heading>
              <Lead className="max-w-[60ch]">{model.summary}</Lead>
              <KeyFacts items={model.facts} />
            </div>
            <aside aria-label="Where to apply" className="self-start rounded-panel border border-line bg-surface p-6 font-ui shadow-e1">
              <p className="text-eyebrow uppercase text-fg-subtle">Where to apply</p>
              {model.portal ? (
                <>
                  <p className="mt-2 text-h4 text-fg">{model.portal.label}</p>
                  <p className="mt-1 break-all text-small text-fg-muted">{model.portal.url.replace(/^https?:\/\//, "")}</p>
                  <a
                    href={model.portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ className: "mt-5 w-full" })}
                  >
                    {model.portal.cta ?? "Open the official portal"}
                    <IconExternal />
                  </a>
                </>
              ) : null}
              <a
                href={help}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "secondary", className: "mt-2 w-full" })}
              >
                <IconWhatsApp />
                Ask us to help
              </a>
              {model.helpline || model.email ? (
                <ul className="mt-5 space-y-2.5 border-t border-line pt-4 text-small text-fg-muted">
                  {model.helpline ? (
                    <li className="flex gap-2.5">
                      <IconPhone size={18} className="mt-px shrink-0 text-fg-subtle" />
                      <span>
                        <span className="block text-caption text-fg-subtle">Official helpline</span>
                        {model.helpline}
                      </span>
                    </li>
                  ) : null}
                  {model.email ? (
                    <li className="flex gap-2.5">
                      <IconMail size={18} className="mt-px shrink-0 text-fg-subtle" />
                      <span>
                        <span className="block text-caption text-fg-subtle">Official email</span>
                        {model.email}
                      </span>
                    </li>
                  ) : null}
                </ul>
              ) : null}
              <p className="mt-4 text-caption text-fg-subtle">
                {model.portal?.note ??
                  "Apply only on the government portal. Look-alike sites charge extra and some are not official."}
              </p>
            </aside>
          </div>
        </Container>
      </Section>

      <SectionNav items={nav} />

      <Container className="grid gap-14 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div className="min-w-0 space-y-16 md:space-y-20">
          {model.whoNeeds ? (
            <ContentSection id="who-needs-it" title="Who needs it">
              <div className="grid gap-10 md:grid-cols-2">
                <CheckList title={`${model.shortName} required`} items={model.whoNeeds.required} tone="include" />
                <CheckList title="Not required" items={model.whoNeeds.notRequired} tone="exclude" />
              </div>
              {model.whoNeeds.foreigners ? (
                <Callout tone="note" title="Foreign nationals" className="mt-10">
                  {model.whoNeeds.foreigners}
                </Callout>
              ) : null}
            </ContentSection>
          ) : null}

          {(model.custom ?? []).map((c) => (
            <ContentSection key={c.id} id={c.id} title={c.title} intro={c.intro}>
              {c.content}
            </ContentSection>
          ))}

          {model.steps ? (
            <ContentSection id="how-to-apply" title="How to apply">
              <Steps
                items={model.steps.map((s) => ({
                  title: s.title,
                  body: (
                    <div className="space-y-3">
                      <p>{s.description}</p>
                      <ul className="space-y-1.5">
                        {s.details.map((d) => (
                          <li key={d} className="flex gap-2.5 text-small">
                            <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-line-strong" />
                            {d}
                          </li>
                        ))}
                      </ul>
                      {s.duration ? <p className="text-caption text-fg-subtle">Takes: {s.duration}</p> : null}
                    </div>
                  ),
                }))}
              />
            </ContentSection>
          ) : null}

          {model.documents ? (
            <ContentSection id="documents" title="Documents you need">
              <ul className="border-t border-line">
                {model.documents.mandatory.map((doc) => (
                  <li key={doc.name} className="border-b border-line py-5 font-ui">
                    <div className="flex gap-3">
                      <IconPermit size={20} className="mt-0.5 shrink-0 text-brand" />
                      <div className="space-y-2">
                        <h3 className="text-h4 text-fg">{doc.name}</h3>
                        <p className="text-body text-fg-muted">{doc.description}</p>
                        {doc.options ? (
                          <ul className="flex flex-wrap gap-2">
                            {doc.options.map((o) => (
                              <li key={o} className="rounded-control border border-line px-2.5 py-1 text-small text-fg-muted">
                                {o}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {doc.specifications ? <p className="text-small text-fg-muted">{doc.specifications}</p> : null}
                        {doc.note ? <p className="text-small font-medium text-caution">{doc.note}</p> : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {model.documents.groups?.length ? (
                <div className="mt-10 grid gap-8 md:grid-cols-2">
                  {model.documents.groups.map((g) => (
                    <div key={g.title} className="font-ui">
                      <h3 className="text-h4 text-fg">{g.title}</h3>
                      <ul className="mt-3 space-y-3">
                        {g.items.map((i) => (
                          <li key={i.name} className="text-body">
                            <span className="font-medium text-fg">{i.name}</span>
                            <span className="block text-small text-fg-muted">{i.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
              {model.documents.tips.length ? (
                <div className="mt-10 rounded-panel bg-canvas-subtle p-5 sm:p-6">
                  <CheckList title="Before you upload" items={model.documents.tips} tone="neutral" />
                </div>
              ) : null}
            </ContentSection>
          ) : null}

          {model.fees ? (
            <ContentSection id="fees" title="Fees and validity" intro="Government fees, paid online on the portal. They are non-refundable.">
              <DataTable
                caption={`${model.state} ${model.shortName} fees`}
                rowKey={(r) => r.category}
                rows={model.fees}
                columns={[
                  { key: "category", label: "Category", primary: true, render: (r) => r.category },
                  { key: "fee", label: "Fee", render: (r) => <span className="font-semibold text-fg tabular-nums">{r.fee}</span> },
                  { key: "validity", label: "Valid for", render: (r) => r.validity },
                ]}
              />
            </ContentSection>
          ) : null}

          {model.border ? (
            <ContentSection id="border-permits" title={model.border.title} intro={model.border.description}>
              <DataTable
                caption="Border areas that need an extra permit"
                rowKey={(r) => r.name}
                rows={model.border.areas}
                columns={[
                  { key: "name", label: "Place", primary: true, render: (r) => r.name },
                  { key: "where", label: "District", render: (r) => r.location },
                  { key: "permit", label: "Permit", render: (r) => r.note },
                  {
                    key: "who",
                    label: "Open to",
                    render: (r) => (
                      <span className="flex flex-wrap gap-1.5">
                        <Badge tone={r.indiansAllowed ? "positive" : "critical"}>Indians {r.indiansAllowed ? "yes" : "no"}</Badge>
                        <Badge tone={r.foreignersAllowed ? "positive" : "critical"}>Foreigners {r.foreignersAllowed ? "yes" : "no"}</Badge>
                      </span>
                    ),
                  },
                ]}
              />
              <Callout tone="tip" title="How you get one" className="mt-8">
                {model.border.howToApply}
              </Callout>
            </ContentSection>
          ) : null}

          {model.festival ? (
            <ContentSection id="festival" title={`${model.festival.name} and your permit`}>
              <div className="rounded-panel border border-line bg-surface p-5 font-ui sm:p-7">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="seasonal">{model.festival.dates}</Badge>
                  <Badge>{model.festival.venue}</Badge>
                </div>
                <p className="mt-4 max-w-prose text-body text-fg-muted">{model.festival.description}</p>
                <div className="mt-6 grid gap-8 md:grid-cols-2">
                  <CheckList title="Permit tips for festival week" items={model.festival.tips} tone="neutral" />
                  {model.festival.highlights?.length ? (
                    <CheckList title="What you'll see" items={model.festival.highlights} tone="include" />
                  ) : null}
                </div>
                {model.festival.link ? (
                  <ButtonLink href={model.festival.link.href} variant="secondary" className="mt-8">
                    {model.festival.link.label}
                    <IconArrowRight />
                  </ButtonLink>
                ) : null}
              </div>
            </ContentSection>
          ) : null}

          {model.entryPoints ? (
            <ContentSection id="entry-points" title="Entry points" intro="Where your permit is checked on the way in. Carry a printout and the original ID you applied with.">
              <DataTable
                caption={`${model.state} entry points`}
                rowKey={(r) => r.name}
                rows={model.entryPoints}
                columns={[
                  { key: "name", label: "Entry point", primary: true, render: (r) => r.name },
                  { key: "type", label: "By", render: (r) => r.type },
                  { key: "from", label: "From", render: (r) => r.from },
                  { key: "note", label: "Note", render: (r) => r.note },
                ]}
              />
            </ContentSection>
          ) : null}

          {model.destinations ? (
            <ContentSection id="destinations" title={`Places your ${model.shortName} covers`}>
              <DataTable
                caption={`Destinations in ${model.state}`}
                rowKey={(r) => r.name}
                rows={model.destinations}
                columns={[
                  {
                    key: "name",
                    label: "Place",
                    primary: true,
                    render: (r) => (
                      <span>
                        {r.name}
                        <span className="block text-small font-normal text-fg-muted">{r.highlight}</span>
                      </span>
                    ),
                  },
                  ...(model.destinations.some((d) => d.district) ? [{ key: "district", label: "District", render: (r: PermitDestination) => r.district ?? "—" }] : []),
                  { key: "permit", label: "Permit", render: (r) => r.permitRequired },
                  { key: "best", label: "Best time", render: (r) => r.bestTime },
                  { key: "alt", label: "Altitude", render: (r) => <span className="tabular-nums">{r.altitude}</span> },
                ]}
              />
            </ContentSection>
          ) : null}

          {model.tips || model.seasons ? (
            <ContentSection id="tips" title="Tips and seasons">
              {model.tips ? (
                <ol className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                  {model.tips.map((t, i) => (
                    <li key={t.title} className="border-t border-line pt-4 font-ui">
                      <span className="text-small font-semibold text-highlight tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-1.5 text-h4 text-fg">{t.title}</h3>
                      <p className="mt-1 text-body text-fg-muted">{t.description}</p>
                    </li>
                  ))}
                </ol>
              ) : null}
              {model.seasons ? (
                <div className="mt-12">
                  <h3 className="font-ui text-h3 text-fg">When to go</h3>
                  <p className="mt-1 font-ui text-body text-fg-muted">Best overall: {model.seasons.recommended}.</p>
                  <ul className="mt-6 border-t border-line">
                    {model.seasons.seasons.map((s) => (
                      <li key={s.name} className="grid gap-2 border-b border-line py-4 font-ui sm:grid-cols-[14rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
                        <span className="text-body font-semibold text-fg">{s.name}</span>
                        <span className="text-small text-fg-muted">
                          {s.description}
                          {s.note ? <span className="block text-fg-subtle">{s.note}</span> : null}
                        </span>
                        <span className="flex items-center gap-2 sm:justify-end">
                          {s.temperature ? <span className="text-small text-fg-subtle tabular-nums">{s.temperature}</span> : null}
                          <Badge tone={s.ideal ? "positive" : "caution"}>{s.ideal ? "Good time" : "Go with care"}</Badge>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </ContentSection>
          ) : null}

          {model.offices || model.helpline ? (
            <ContentSection id="contacts" title="Official contacts">
              {model.helpline || model.email ? (
                <dl className="grid gap-6 border-y border-line py-5 font-ui sm:grid-cols-2">
                  {model.helpline ? (
                    <div>
                      <dt className="text-small text-fg-subtle">Helpline</dt>
                      <dd className="mt-1 text-body font-semibold text-fg">{model.helpline}</dd>
                    </div>
                  ) : null}
                  {model.email ? (
                    <div>
                      <dt className="text-small text-fg-subtle">Email</dt>
                      <dd className="mt-1 text-body font-semibold text-fg">{model.email}</dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}
              {model.offices ? (
                <div className="mt-8">
                  <h3 className="font-ui text-h4 text-fg">{model.offices.label}</h3>
                  <DataTable
                    className="mt-3"
                    caption={model.offices.label}
                    rowKey={(r) => r.city}
                    rows={model.offices.list}
                    columns={[
                      { key: "city", label: "City", primary: true, render: (r) => r.city },
                      { key: "address", label: "Address", render: (r) => r.address },
                      ...(model.offices.list.some((o) => o.phone)
                        ? [{ key: "phone", label: "Phone", render: (r: PermitOffice) => <span className="tabular-nums">{r.phone ?? "—"}</span> }]
                        : []),
                    ]}
                  />
                </div>
              ) : null}
            </ContentSection>
          ) : null}

          <ContentSection id="faq" title="Questions people ask">
            <Accordion items={model.faqs} />
          </ContentSection>

          <nav aria-label="Other permit guides" className="border-t border-line pt-8 font-ui">
            <h2 className="text-h4 text-fg">Other permit guides</h2>
            <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
              {[{ name: "All Northeast permits", slug: "" }, ...model.related].map((r) => (
                <li key={r.slug} className="border-b border-line">
                  <Link href={`/permits${r.slug ? `/${r.slug}` : ""}`} className="group flex items-center justify-between py-3.5 text-body text-fg hover:text-brand">
                    {r.name}
                    <IconChevronRight size={18} className="text-fg-subtle transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <aside aria-label="Permit help" className="hidden lg:block">
          <div className="sticky top-36 rounded-panel bg-canvas-subtle p-5 font-ui">
            <p className="text-h4 text-fg">Travelling with us?</p>
            <p className="mt-2 text-small text-fg-muted">
              On every Travelspire trip we file the permits for you. Travelling on your own? Send us your dates and we&apos;ll
              tell you exactly what to apply for.
            </p>
            <a
              href={help}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "sm", className: "mt-4 w-full" })}
            >
              <IconWhatsApp />
              Ask on WhatsApp
            </a>
            <a
              href={`tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`}
              className={buttonVariants({ variant: "ghost", size: "sm", className: "mt-1 w-full" })}
            >
              <IconPhone />
              {contactInfo.phone}
            </a>
          </div>
        </aside>
      </Container>

      <PlanCta
        title={`Going to ${model.state}? We'll sort the permit.`}
        body="Every Travelspire trip includes permit filing. If you're travelling independently, we'll tell you exactly what to apply for and when."
        whatsappHref={help}
        secondary={{ label: "Browse tours", href: "/all-tours" }}
      />
    </>
  );
}
