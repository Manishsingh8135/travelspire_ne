import Image from "next/image";
import Link from "next/link";
import {
  Accent,
  Badge,
  Breadcrumbs,
  ButtonLink,
  Callout,
  Container,
  KeyFacts,
  Section,
  SectionHeader,
  TourCard,
  buttonVariants,
  type KeyFact,
} from "@/components/ds";
import { IconArrowRight, IconArrowUpRight, IconWhatsApp } from "@/components/icons";
import { tourCard } from "@/components/tours/tour-facts";
import { getActiveTours } from "@/data/tours";

/* Building blocks for past-festival pages. A finished edition keeps its URL
   and search history; the page becomes an honest recap that sends people to
   what is open now. */

export function RecapHero({
  crumbs,
  eyebrow,
  title,
  accent,
  lead,
  image,
  imageAlt,
  primary,
  whatsappHref,
}: {
  crumbs: { label: string; href: string }[];
  eyebrow: string;
  title: string;
  accent: string;
  lead: string;
  image: string;
  imageAlt: string;
  primary: { label: string; href: string };
  whatsappHref: string;
}) {
  return (
    <>
      <Container className="pt-6 md:pt-8">
        <Breadcrumbs items={crumbs} />
      </Container>
      <section className="relative isolate mt-6 overflow-hidden bg-inverse text-white md:mx-auto md:mt-8 md:w-[calc(100%-4rem)] md:max-w-wide md:rounded-panel lg:w-[calc(100%-5rem)]">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/10 md:bg-gradient-to-r md:from-black/75 md:via-black/35 md:to-black/0"
        />
        <div className="flex min-h-[70svh] flex-col justify-end px-5 pb-10 pt-24 sm:px-8 md:min-h-[34rem] md:px-12 md:pb-14">
          <p className="font-ui text-eyebrow uppercase text-white/80">{eyebrow}</p>
          <h1 className="mt-4 max-w-[16ch] font-ui text-h1 text-white">
            {title} <Accent className="text-white">{accent}</Accent>
          </h1>
          <p className="mt-4 max-w-[52ch] font-ui text-lead text-white/85">{lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={primary.href} size="lg">
              {primary.label}
              <IconArrowRight />
            </ButtonLink>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                size: "lg",
                variant: "ghost",
                className: "border border-white/35 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
              })}
            >
              <IconWhatsApp />
              Plan a trip
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function EndedNotice({ title, children, facts }: { title: string; children: React.ReactNode; facts: KeyFact[] }) {
  return (
    <Section spacing="compact">
      <Container className="space-y-8">
        <Callout tone="caution" title={title} className="max-w-3xl">
          {children}
        </Callout>
        <KeyFacts items={facts} />
      </Container>
    </Section>
  );
}

export type LineupArtist = { name: string; detail: string; group: string; headliner?: boolean; image?: string; imageAlt?: string };

/* Who played, grouped (by day or by scene). Rows, not cards. */
export function Lineup({ artists, groups }: { artists: LineupArtist[]; groups: string[] }) {
  return (
    <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
      {groups.map((group) => {
        const rows = artists.filter((a) => a.group === group);
        if (!rows.length) return null;
        return (
          <div key={group}>
            <h3 className="font-ui text-h4 text-fg">{group}</h3>
            <ul className="mt-3 border-t border-line font-ui">
              {rows.map((a) => (
                <li key={a.name} className="flex items-center gap-4 border-b border-line py-3.5">
                  {a.image ? (
                    <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-canvas-subtle">
                      <Image src={a.image} alt={a.imageAlt ?? a.name} fill sizes="44px" className="object-cover" />
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="block text-body font-semibold text-fg">{a.name}</span>
                    <span className="block truncate text-small text-fg-muted">{a.detail}</span>
                  </span>
                  {a.headliner ? <Badge tone="brand">Headliner</Badge> : null}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* Where to go instead: open tours plus evergreen guides. */
export function OpenNow({
  title,
  accent,
  intro,
  tourSlugs,
  guides = [],
}: {
  title: string;
  accent: string;
  intro: string;
  tourSlugs: string[];
  guides?: { name: string; blurb: string; href: string; image: string; imageAlt?: string }[];
}) {
  const active = getActiveTours();
  const tours = tourSlugs
    .map((slug) => active.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .slice(0, 3);

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Open now"
          title={
            <>
              {title} <Accent>{accent}</Accent>
            </>
          }
          intro={intro}
          action={
            <ButtonLink href="/all-tours" variant="secondary" size="sm">
              All tours
              <IconArrowRight />
            </ButtonLink>
          }
        />
        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} {...tourCard(tour)} />
          ))}
        </div>
        {guides.length ? (
          <ul className="mt-14 grid gap-px overflow-hidden rounded-panel border border-line bg-line md:grid-cols-3">
            {guides.map((g) => (
              <li key={g.href} className="bg-canvas">
                <Link href={g.href} className="group flex h-full items-center gap-4 p-4 font-ui transition-colors hover:bg-canvas-subtle sm:p-5">
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-card bg-canvas-subtle">
                    <Image src={g.image} alt={g.imageAlt ?? ""} fill sizes="64px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-body font-semibold text-fg group-hover:text-brand">{g.name}</span>
                    <span className="mt-0.5 block text-small text-fg-muted">{g.blurb}</span>
                  </span>
                  <IconArrowUpRight size={18} className="shrink-0 text-fg-subtle" />
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </Section>
  );
}
