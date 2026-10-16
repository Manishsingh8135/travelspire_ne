import Image from "next/image";
import Link from "next/link";
import {
  Accent,
  Badge,
  ButtonLink,
  Container,
  Eyebrow,
  Heading,
  Section,
  SectionHeader,
  TourCard,
  buttonVariants,
} from "@/components/ds";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconCheck,
  IconChevronRight,
  IconLock,
  IconPermit,
  IconPin,
  IconQuote,
  IconVehicle,
  IconWhatsApp,
} from "@/components/icons";
import { PlanCta, Steps } from "@/components/site/content-blocks";
import { StructuredData } from "@/components/seo/structured-data";
import { tourCard } from "@/components/tours/tour-facts";
import {
  homeAtlasAnchor,
  homeAtlasArunachal,
  homeAtlasCluster,
  homeBooking,
  homeGuides,
  homeHero,
  homePermitLinks,
  homeStories,
  homeWhyPhotos,
  homeWhyPoints,
} from "@/data/home/homepage";
import { getActiveDepartures, getSeasonalFeature } from "@/data/home/homepage-season";
import { allTours } from "@/data/tours";
import { createTripPlanningURL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const siteUrl = "https://travelspirene.com";

const featuredSlugs = [
  "mechuka-dong-anini-tour-package",
  "anini-pomo-grassland-expedition",
  "tawang-expedition",
  "mechuka-expedition",
  "dong-valley-expedition",
  "pomo-trek-expedition",
];

/* Homepage, in the order a first-time visitor decides: who are you → what's
   on now → which trip → where → why you → what about permits → how do I
   pay → who has done it. Seasonal parts are date-driven (page revalidates). */
export function HomePage() {
  const featured = featuredSlugs
    .map((slug) => allTours.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const planUrl = createTripPlanningURL();

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${siteUrl}/#featured-journeys`,
          name: "Featured Northeast India journeys",
          itemListElement: featured.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteUrl}/tours/${t.slug}`,
            name: t.title,
          })),
        }}
      />
      <Hero planUrl={planUrl} />
      <TrustStrip />
      <ThisSeason />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Featured journeys"
            title={
              <>
                Six we&apos;d <Accent>put you on first.</Accent>
              </>
            }
            intro="Routes we drive every season, priced per person with permits handled. Each page has the full itinerary."
            action={
              <ButtonLink href="/all-tours" variant="secondary" size="sm">
                All tours
                <IconArrowRight />
              </ButtonLink>
            }
          />
          <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((tour) => (
              <TourCard key={tour.id} {...tourCard(tour)} />
            ))}
          </div>
        </Container>
      </Section>

      <Destinations />
      <WhyUs />
      <PlanAhead />
      <Booking planUrl={planUrl} />
      <Stories />
      <PlanCta whatsappHref={planUrl} />
    </>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────── */

function Hero({ planUrl }: { planUrl: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-inverse text-white">
      <Image
        src={homeHero.images.desktop.src}
        alt={homeHero.images.alt}
        fill
        priority
        sizes="100vw"
        className="hidden object-cover md:block"
      />
      <Image
        src={homeHero.images.mobile.src}
        alt={homeHero.images.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover md:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-black/0"
      />
      <Container className="relative flex min-h-[80svh] flex-col justify-end pb-10 pt-24 md:min-h-[min(84vh,780px)] md:pb-16">
        <p className="font-ui text-eyebrow uppercase text-white/80">{homeHero.eyebrow}</p>
        <h1 className="mt-4 max-w-[15ch] font-ui text-display text-white">
          {homeHero.title} <Accent className="text-white">{homeHero.highlightedTitle}</Accent>
        </h1>
        <p className="mt-5 max-w-[46ch] font-ui text-lead text-white/85">{homeHero.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/all-tours" size="lg">
            Browse tours
            <IconArrowRight />
          </ButtonLink>
          <a
            href={planUrl}
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
        <p className="mt-10 hidden font-ui text-caption text-white/65 md:block">{homeHero.imageCaption}</p>
      </Container>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { Icon: IconPin, title: "Based in Dibrugarh", body: "A local team, at the start of the Arunachal roads" },
    { Icon: IconVehicle, title: "Our own vehicles", body: "Drivers who know the slide zones and the passes" },
    { Icon: IconPermit, title: "Permits arranged", body: "Inner Line Permits sorted before you travel" },
    { Icon: IconLock, title: "Secure online booking", body: "Pay through PayU, receipt by email" },
  ];
  return (
    <div className="border-b border-line">
      <Container>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-5 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, title, body }) => (
            <li key={title} className="flex gap-3.5 font-ui">
              <Icon size={22} className="mt-0.5 shrink-0 text-brand" />
              <div>
                <p className="text-body font-semibold text-fg">{title}</p>
                <p className="text-small text-fg-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

/* ── This season ──────────────────────────────────────────────────────── */

function ThisSeason() {
  const feature = getSeasonalFeature();
  const departures = getActiveDepartures().slice(0, 6);
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={feature.label}
          title={
            <>
              {feature.headline} {feature.highlightedHeadline ? <Accent>{feature.highlightedHeadline}</Accent> : null}
            </>
          }
          intro={feature.body}
          action={
            <ButtonLink href={feature.href} size="sm">
              {feature.ctaLabel}
              <IconArrowRight />
            </ButtonLink>
          }
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <Link
            href={feature.href}
            className="group relative block aspect-[4/3] overflow-hidden rounded-panel bg-canvas-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <Image
              src={feature.image}
              alt={feature.imageAlt}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </Link>
          <div>
            <h3 className="font-ui text-h4 text-fg">Departures on the calendar</h3>
            <ul className="mt-4 border-t border-line">
              {departures.map((d) => (
                <li key={d.id} className="border-b border-line">
                  <Link
                    href={d.href}
                    className="group grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-4 py-4 font-ui focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  >
                    <span className="relative size-14 overflow-hidden rounded-control bg-canvas-subtle">
                      <Image src={d.image} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-body font-semibold text-fg group-hover:text-brand">{d.title}</span>
                      <span className="block truncate text-small text-fg-muted">
                        {d.location} · {d.duration}
                      </span>
                    </span>
                    <span className="text-right">
                      <span
                        className={cn(
                          "block text-small font-medium",
                          d.expiresOn ? "text-seasonal" : "text-fg-subtle",
                        )}
                      >
                        {d.windowLabel}
                      </span>
                      <span className="block text-small text-fg tabular-nums">{d.priceHook}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── Destinations ─────────────────────────────────────────────────────── */

type Tile = { name: string; whyGo: string; href: string; image: string; imageAlt: string };

function DestinationTile({ tile, className, sizes, large }: { tile: Tile; className?: string; sizes: string; large?: boolean }) {
  return (
    <Link
      href={tile.href}
      className={cn(
        "group relative isolate flex min-h-56 flex-col justify-end overflow-hidden rounded-card bg-canvas-subtle p-5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        className,
      )}
    >
      <Image src={tile.image} alt={tile.imageAlt} fill sizes={sizes} className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <span className={cn("font-ui font-semibold", large ? "text-h2" : "text-h3")}>{tile.name}</span>
      <span className={cn("mt-1 max-w-[40ch] font-ui text-white/85", large ? "text-body" : "text-small")}>{tile.whyGo}</span>
    </Link>
  );
}

function Destinations() {
  const [dong, tawang] = homeAtlasArunachal.slice(1);
  const singles = [...homeAtlasCluster, homeAtlasArunachal[0]];
  return (
    <Section tone="subtle">
      <Container size="wide">
        <SectionHeader
          eyebrow="Where we go"
          title={
            <>
              Dibang Valley is home. <Accent>Arunachal is the map.</Accent>
            </>
          }
          intro="We know the far east best — Anini, Dambuk and Roing — and drive the long roads to Mechuka, Dong and Tawang every season."
        />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <DestinationTile
            tile={homeAtlasAnchor}
            large
            className="col-span-2 min-h-80 md:row-span-2 md:min-h-[32rem]"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          {singles.map((tile) => (
            <DestinationTile key={tile.href} tile={tile} sizes="(min-width: 768px) 25vw, 50vw" />
          ))}
          {[dong, tawang].map((tile) => (
            <DestinationTile key={tile.href} tile={tile} className="col-span-2 min-h-56" sizes="(min-width: 768px) 50vw, 100vw" />
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── Why us ───────────────────────────────────────────────────────────── */

function WhyUs() {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
        <div>
          <Eyebrow>Why Travelspire</Eyebrow>
          <Heading className="mt-3 max-w-[16ch]">
            A company you can <Accent>actually reach.</Accent>
          </Heading>
          <p className="mt-5 max-w-[46ch] font-ui text-body text-fg-muted">
            Not a marketplace and not a reseller. A small team in Dibrugarh with its own vehicles, its own routes and its
            own name on the line.
          </p>
          <ul className="mt-8 grid grid-cols-3 gap-3">
            {homeWhyPhotos.map((photo) => (
              <li key={photo.src}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-canvas-subtle">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 180px, 33vw" className="object-cover" />
                </div>
                <p className="mt-2 font-ui text-caption text-fg-subtle">{photo.label}</p>
              </li>
            ))}
          </ul>
        </div>
        <ol className="grid gap-x-10 gap-y-8 self-center sm:grid-cols-2">
          {homeWhyPoints.map((point, i) => (
            <li key={point.title} className="border-t border-line pt-5 font-ui">
              <span className="text-small font-semibold text-highlight tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-h4 text-fg">{point.title}</h3>
              <p className="mt-1.5 text-body text-fg-muted">{point.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ── Permits + guides ─────────────────────────────────────────────────── */

function PlanAhead() {
  const permits = homePermitLinks.filter((p) => p.kind !== "Route");
  return (
    <Section tone="subtle">
      <Container>
        <SectionHeader
          eyebrow="Before you go"
          title={
            <>
              The paperwork, <Accent>plainly explained.</Accent>
            </>
          }
          intro="Four Northeast states need an Inner Line Permit and Sikkim restricts its border zones. On our trips we arrange them; if you travel on your own, these guides walk you through it."
        />
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-14">
          <div>
            <h3 className="font-ui text-h4 text-fg">Permit guides</h3>
            <ul className="mt-4 border-t border-line">
              {permits.map((p) => (
                <li key={p.href} className="border-b border-line">
                  <Link href={p.href} className="group flex items-center gap-4 py-4 font-ui">
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-body font-semibold text-fg group-hover:text-brand">{p.name}</span>
                        <Badge tone={p.kind === "PAP" ? "notice" : "neutral"}>{p.kind}</Badge>
                      </span>
                      <span className="mt-0.5 block text-small text-fg-muted">{p.note}</span>
                    </span>
                    <IconChevronRight size={18} className="shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/permits" variant="link" className="mt-5">
              Which permit do I need?
              <IconArrowRight />
            </ButtonLink>
          </div>
          <div>
            <h3 className="font-ui text-h4 text-fg">Travel guides</h3>
            <ul className="mt-4 grid gap-6 sm:grid-cols-2">
              {homeGuides.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="group block font-ui">
                    <span className="relative block aspect-[16/10] overflow-hidden rounded-card bg-canvas">
                      <Image src={g.image} alt={g.imageAlt} fill sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    </span>
                    <span className="mt-3 flex items-start justify-between gap-3">
                      <span className="text-h4 text-fg group-hover:text-brand">{g.title}</span>
                      <IconArrowUpRight size={18} className="mt-1 shrink-0 text-fg-subtle" />
                    </span>
                    <span className="mt-1 block text-small text-fg-muted">{g.value}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── Booking ──────────────────────────────────────────────────────────── */

function Booking({ planUrl }: { planUrl: string }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="How booking works"
          title={
            <>
              Two ways to book. <Accent>Both end securely.</Accent>
            </>
          }
        />
        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
          {homeBooking.models.map((model) => (
            <div key={model.title} className="border-t border-line pt-6">
              <h3 className="font-ui text-h3 text-fg">{model.title}</h3>
              <Steps className="mt-6" items={model.steps.map((s) => ({ title: s, body: null }))} />
              {model.cta.href === "whatsapp" ? (
                <a href={planUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "secondary", className: "mt-8" })}>
                  <IconWhatsApp />
                  {model.cta.label}
                </a>
              ) : (
                <ButtonLink href={model.cta.href} variant="secondary" className="mt-8">
                  {model.cta.label}
                  <IconArrowRight />
                </ButtonLink>
              )}
            </div>
          ))}
        </div>
        <ul className="mt-12 grid gap-3 rounded-panel bg-canvas-subtle p-5 font-ui sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
          {homeBooking.assurances.map((a) => (
            <li key={a} className="flex gap-2.5 text-small text-fg-muted">
              <IconCheck size={18} strokeWidth={2} className="mt-px shrink-0 text-positive" />
              {a}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ── Stories ──────────────────────────────────────────────────────────── */

function Stories() {
  return (
    <Section tone="subtle">
      <Container>
        <SectionHeader
          eyebrow="Traveller stories"
          title={
            <>
              Told by the people <Accent>who went.</Accent>
            </>
          }
          intro="Unedited accounts from travellers who booked these routes with us."
        />
      </Container>
      <ul className="mx-auto mt-10 flex w-full max-w-page snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:px-8 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible lg:px-10 [&::-webkit-scrollbar]:hidden">
        {homeStories.slice(0, 3).map((story) => (
          <li key={story.id} className="w-[85%] shrink-0 snap-start md:w-auto">
            <figure className="flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface font-ui">
              {story.image ? (
                <div className="relative aspect-[16/10]">
                  <Image src={story.image} alt={story.imageAlt || story.destination} fill sizes="(min-width: 768px) 33vw, 85vw" className="object-cover" />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <IconQuote size={22} className="text-highlight" />
                <blockquote className="mt-3 line-clamp-6 text-body text-fg-muted">{story.quote}</blockquote>
                <figcaption className="mt-auto border-t border-line pt-4">
                  <span className="block pt-0 text-body font-semibold text-fg">{story.name}</span>
                  <span className="block text-small text-fg-subtle">
                    {story.origin} · {story.tourName}
                  </span>
                </figcaption>
              </div>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
