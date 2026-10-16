import Image from "next/image";
import {
  Accent,
  Badge,
  Breadcrumbs,
  ButtonLink,
  Callout,
  Container,
  Heading,
  KeyFacts,
  Lead,
  PriceBar,
  Section,
  SectionHeader,
  TourCard,
  buttonVariants,
  formatInr,
} from "@/components/ds";
import {
  IconArrowRight,
  IconCalendar,
  IconCard,
  IconChat,
  IconClock,
  IconGauge,
  IconMountain,
  IconPermit,
  IconShield,
  IconUsers,
  IconWhatsApp,
} from "@/components/icons";
import { CardRail, CheckList, ContentSection, PlanCta } from "@/components/site/content-blocks";
import { Itinerary } from "@/components/site/itinerary";
import { PhotoGallery } from "@/components/site/photo-gallery";
import { SectionNav } from "@/components/site/section-nav";
import { getPlaceImageAlt } from "@/data/seo/image-seo-data";
import { createTourWhatsAppURL, createTripPlanningURL } from "@/lib/whatsapp";
import {
  isFestivalTour,
  isRegularTour,
  isSpecialActivityTour,
  type Tour,
  type TourPackageVariant,
} from "@/types/tours/tour";
import {
  relatedTours,
  tourCard,
  tourDurationLabel,
  tourHeroAlt,
  tourKindLabel,
  tourPrice,
  tourWhen,
} from "./tour-facts";

/* The tour template: every catalogue tour renders through this. Order is
   the order of questions people ask — what is it, what does it cost and
   when, what happens each day, what's included, what does it look like. */

export function TourPage({ tour, isOver, pool }: { tour: Tour; isOver: boolean; pool: Tour[] }) {
  const regular = isRegularTour(tour);
  const price = tourPrice(tour);
  const whatsapp = createTourWhatsAppURL(tour);
  const bookHref = `/book/${tour.slug}`;
  const inclusions = regular ? tour.inclusions : tour.baseInclusions;
  const exclusions = regular ? tour.exclusions : tour.baseExclusions;
  const extraHighlights = isFestivalTour(tour)
    ? [...(tour.culturalHighlights ?? []), ...(tour.specialActivities ?? [])]
    : isSpecialActivityTour(tour)
      ? (tour.activityHighlights ?? [])
      : [];
  const highlights = Array.from(new Set([...tour.highlights, ...extraHighlights]));
  const groupSize = regular ? tour.maxGroupSize : Math.max(0, ...tour.variants.map((v) => v.maxGroupSize ?? 0));

  const facts = [
    { label: "Duration", value: tourDurationLabel(tour), icon: IconClock },
    { label: isFestivalTour(tour) ? "Festival dates" : "Best season", value: tourWhen(tour), icon: IconCalendar },
    groupSize
      ? { label: "Group size", value: `Up to ${groupSize}`, icon: IconUsers }
      : { label: "Packages", value: regular ? "1" : String(tour.variants.length), icon: IconUsers },
    regular && tour.altitude
      ? { label: "Highest point", value: `${tour.altitude.toLocaleString("en-IN")} m`, icon: IconMountain }
      : { label: "Difficulty", value: tour.difficulty, icon: IconGauge },
  ];

  const sections = [
    { id: "overview", label: "Overview" },
    regular ? { id: "itinerary", label: "Itinerary" } : { id: "packages", label: "Packages" },
    { id: "included", label: "What's included" },
    ...(tour.gallery.length ? [{ id: "gallery", label: "Photos" }] : []),
  ];

  const photos = tour.gallery.map((src) => ({ src, alt: getPlaceImageAlt(src, `${tour.title} — ${tour.location}`) }));
  const related = relatedTours(tour, pool);

  return (
    <>
      {/* Hero: name, promise and the facts, beside the best photograph. */}
      <Section spacing="none" className="pb-10 pt-6 md:pb-14 md:pt-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Tours", href: "/all-tours" },
              { label: tour.title, href: `/tours/${tour.slug}` },
            ]}
          />
          <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
            <div className="order-2 space-y-6 lg:order-1">
              <div className="flex flex-wrap gap-2">
                <Badge tone="brand">{tourKindLabel(tour)}</Badge>
                <Badge>{tour.difficulty}</Badge>
                {isOver ? <Badge tone="caution">This edition has ended</Badge> : null}
              </div>
              <div className="space-y-4">
                <Heading as="h1" size="h1">
                  {tour.title}
                </Heading>
                <Lead className="max-w-[44ch]">{tour.subtitle}</Lead>
              </div>
              <KeyFacts items={facts} layout="grid" />
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <p className="font-ui text-small text-fg-muted">
                  {regular ? "Per person" : "Packages from"}{" "}
                  <span className="block text-h2 font-semibold text-fg tabular-nums">{formatInr(price)}</span>
                </p>
                {!isOver ? (
                  <div className="flex flex-wrap gap-3">
                    <ButtonLink href={bookHref} size="lg">
                      Book online
                    </ButtonLink>
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                      <IconWhatsApp />
                      Ask a question
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="relative order-1 -mx-5 aspect-[4/3] overflow-hidden bg-canvas-subtle sm:mx-0 sm:rounded-panel lg:order-2 lg:aspect-[5/4]">
              <Image
                src={tour.heroImage}
                alt={tourHeroAlt(tour)}
                fill
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <SectionNav
        items={sections}
        action={
          !isOver ? (
            <ButtonLink href={bookHref} size="sm">
              Book · {formatInr(price)}
            </ButtonLink>
          ) : null
        }
      />

      <Container className="grid gap-14 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
        <div className="min-w-0 space-y-16 md:space-y-20">
          <ContentSection id="overview" title="Overview">
            <p className="max-w-prose font-ui text-lead text-fg-muted">{tour.overview}</p>
            <CheckList
              tone="neutral"
              items={highlights}
              className="mt-8 [&_ul]:grid [&_ul]:gap-x-8 [&_ul]:gap-y-3 [&_ul]:space-y-0 sm:[&_ul]:grid-cols-2"
            />
          </ContentSection>

          {regular ? (
            <ContentSection id="itinerary" title="Day by day" intro={`${tour.itinerary.length} days, starting and ending as listed below. Timings move with weather and road conditions.`}>
              <Itinerary days={tour.itinerary} />
            </ContentSection>
          ) : (
            <ContentSection
              id="packages"
              title="Choose a package"
              intro={isOver ? "This edition has ended. These were the packages we ran." : "Every package includes the base inclusions listed below."}
            >
              <div className="grid gap-4">
                {tour.variants.map((variant) => (
                  <PackageCard
                    key={variant.id}
                    variant={variant}
                    bookHref={isOver ? null : `${bookHref}?tier=${encodeURIComponent(variant.id)}`}
                  />
                ))}
              </div>
            </ContentSection>
          )}

          <ContentSection id="included" title="What's included">
            <div className="grid gap-10 md:grid-cols-2">
              <CheckList title="Included" items={inclusions} tone="include" />
              <CheckList title="Not included" items={exclusions} tone="exclude" />
            </div>
            {tour.thingsToCarry.length ? (
              <div className="mt-12">
                <h3 className="font-ui text-h4 text-fg">What to pack</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {tour.thingsToCarry.map((item) => (
                    <li key={item} className="rounded-control border border-line px-3 py-1.5 font-ui text-small text-fg-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {tour.importantNote ? (
              <Callout tone="note" title="Good to know" className="mt-10">
                {tour.importantNote}
              </Callout>
            ) : null}
          </ContentSection>
        </div>

        <aside aria-label="Booking" className="hidden lg:block">
          <div className="sticky top-36">
            <BookingPanel tour={tour} price={price} isOver={isOver} bookHref={bookHref} whatsapp={whatsapp} />
          </div>
        </aside>
      </Container>

      {photos.length ? (
        <Section id="gallery" tone="subtle" className="scroll-mt-28">
          <Container>
            <SectionHeader title="Photos from the route" intro="Taken on our own trips — the roads, stays and people you'll meet." />
            <PhotoGallery photos={photos} className="mt-10" />
          </Container>
        </Section>
      ) : null}

      {related.length ? (
        <Section>
          <Container>
            <SectionHeader
              title={
                <>
                  More journeys <Accent>worth taking</Accent>
                </>
              }
              action={
                <ButtonLink href="/all-tours" variant="secondary" size="sm">
                  All tours
                  <IconArrowRight />
                </ButtonLink>
              }
            />
            <CardRail className="mt-10">
              {related.map((t) => (
                <li key={t.id}>
                  <TourCard {...tourCard(t)} className="h-full" />
                </li>
              ))}
            </CardRail>
          </Container>
        </Section>
      ) : null}

      <PlanCta whatsappHref={createTripPlanningURL({ destination: tour.location })} />

      {!isOver ? (
        <PriceBar
          floating
          title={tour.title}
          price={price}
          unit={regular ? "per person" : "onwards"}
          bookHref={bookHref}
          bookLabel="Book"
          whatsappHref={whatsapp}
        />
      ) : null}
    </>
  );
}

function BookingPanel({
  tour,
  price,
  isOver,
  bookHref,
  whatsapp,
}: {
  tour: Tour;
  price: number;
  isOver: boolean;
  bookHref: string;
  whatsapp: string;
}) {
  if (isOver) {
    return (
      <div className="rounded-panel border border-line bg-surface p-6 font-ui shadow-e2">
        <p className="text-eyebrow uppercase text-caution">This edition has ended</p>
        <p className="mt-3 text-h3 text-fg">See you at the next one.</p>
        <p className="mt-2 text-body text-fg-muted">
          New dates come from the festival&apos;s official channels. Until then, the valleys are open — tell us when you
          can travel.
        </p>
        <ButtonLink href="/all-tours" className="mt-6 w-full" size="lg">
          See tours open now
        </ButtonLink>
        <a
          href={createTripPlanningURL({ destination: tour.location })}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "secondary", size: "lg", className: "mt-2 w-full" })}
        >
          <IconWhatsApp />
          Plan a trip with us
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-panel border border-line bg-surface p-6 font-ui shadow-e2">
      <p className="text-small text-fg-subtle">{isRegularTour(tour) ? "Price per person" : "Packages from"}</p>
      <p className="mt-1 text-h2 font-semibold text-fg tabular-nums">{formatInr(price)}</p>
      <p className="mt-1 text-small text-fg-muted">{tourDurationLabel(tour)} · {tourWhen(tour)}</p>
      <ButtonLink href={bookHref} size="lg" className="mt-6 w-full">
        <IconCard />
        Book and pay online
      </ButtonLink>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "secondary", size: "lg", className: "mt-2 w-full" })}
      >
        <IconWhatsApp />
        Ask before booking
      </a>
      <ul className="mt-6 space-y-3 border-t border-line pt-5 text-small text-fg-muted">
        <li className="flex items-center gap-2.5">
          <IconShield size={18} className="text-fg-subtle" />
          Secure payment through PayU
        </li>
        <li className="flex items-center gap-2.5">
          <IconPermit size={18} className="text-fg-subtle" />
          Permit help included
        </li>
        <li className="flex items-center gap-2.5">
          <IconChat size={18} className="text-fg-subtle" />
          A person replies within a few hours
        </li>
      </ul>
    </div>
  );
}

function PackageCard({ variant, bookHref }: { variant: TourPackageVariant; bookHref: string | null }) {
  const { days, nights } = variant.duration;
  return (
    <article className="rounded-panel border border-line bg-surface p-5 font-ui sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-h3 text-fg">{variant.name}</h3>
          <p className="text-small text-fg-subtle">
            {days} {days === 1 ? "day" : "days"}
            {nights ? ` · ${nights} ${nights === 1 ? "night" : "nights"}` : ""}
            {variant.maxGroupSize ? ` · up to ${variant.maxGroupSize} people` : ""}
          </p>
        </div>
        <p className="text-right text-small text-fg-subtle">
          <span className="block text-h3 font-semibold text-fg tabular-nums">{formatInr(variant.price)}</span>
          per person
        </p>
      </div>
      {variant.description ? <p className="mt-3 text-body text-fg-muted">{variant.description}</p> : null}
      <CheckList
        items={[...variant.inclusions, ...(variant.additionalActivities ?? [])]}
        tone="include"
        className="mt-5 [&_ul]:grid [&_ul]:gap-x-6 [&_ul]:gap-y-2.5 [&_ul]:space-y-0 sm:[&_ul]:grid-cols-2 [&_li]:text-small"
      />
      {bookHref ? (
        <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
          <ButtonLink href={bookHref}>Book this package</ButtonLink>
        </div>
      ) : null}
    </article>
  );
}
