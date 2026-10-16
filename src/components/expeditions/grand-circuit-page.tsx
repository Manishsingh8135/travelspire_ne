import {
  Accent,
  Accordion,
  ButtonLink,
  Callout,
  Container,
  PriceBar,
  Section,
  SectionHeader,
  TourCard,
  buttonVariants,
} from "@/components/ds";
import {
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconMountain,
  IconRoute,
  IconUsers,
} from "@/components/icons";
import { CheckList, ContentSection, PlanCta } from "@/components/site/content-blocks";
import { PhotoGallery } from "@/components/site/photo-gallery";
import { SectionNav } from "@/components/site/section-nav";
import { relatedTours, tourCard } from "@/components/tours/tour-facts";
import {
  circuitCarry,
  circuitChapters,
  circuitDays,
  circuitExcluded,
  circuitFaq,
  circuitHero,
  circuitIncluded,
  circuitIntro,
  circuitMechukaArchive,
  circuitMeta,
  circuitPomoExtension,
  circuitPricing,
  circuitStay,
  mechukaDongAniniTour,
} from "@/data/expeditions/mechuka-dong-anini";
import { getActiveTours } from "@/data/tours";
import { createGrandCircuitInquiryURL } from "@/lib/whatsapp";
import {
  ChapterHeader,
  ExpeditionBookingPanel,
  ExpeditionDays,
  ExpeditionHero,
  NamedList,
  PackList,
  PriceTiers,
  RouteLine,
  type ExpeditionTier,
} from "./expedition-blocks";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "prices", label: "Prices" },
  { id: "included", label: "What's included" },
  { id: "faq", label: "Questions" },
  { id: "photos", label: "Photos" },
];

/* Mechuka · Dong · Anini — the 12N/13D grand circuit. */
export function GrandCircuitPage() {
  const tiers: ExpeditionTier[] = circuitPricing.tiers.map((t) => ({ ...t }));
  const generalAsk = createGrandCircuitInquiryURL();
  const datesAsk = createGrandCircuitInquiryURL({ kind: "dates" });
  const stops = circuitMeta.route.split(" · ");
  const related = relatedTours(mechukaDongAniniTour, getActiveTours());
  const photos = [
    ...circuitChapters.map((c) => ({ src: c.frame.src, alt: c.frame.alt, caption: c.place })),
    ...circuitMechukaArchive.map((f) => ({ src: f.src, alt: f.alt, caption: f.place })),
  ].filter((p, i, list) => list.findIndex((q) => q.src === p.src) === i);

  return (
    <>
      <ExpeditionHero
        slug={circuitMeta.slug}
        crumb="Mechuka, Dong & Anini"
        badges={[{ label: "Signature expedition", tone: "brand" }, { label: "Private circuit" }, { label: "Moderate" }]}
        title={
          <>
            Mechuka, Dong <Accent>&amp; Anini</Accent>
          </>
        }
        lead="Thirteen days from Dibrugarh across Arunachal: Mechuka's monastery valley, the Dong sunrise in the far east, and three unhurried nights in Anini."
        facts={[
          { label: "Duration", value: "13 days · 12 nights", icon: IconClock },
          { label: "Season", value: "Oct – Apr", icon: IconCalendar },
          { label: "Group", value: "2 – 6 travellers", icon: IconUsers },
          { label: "Highest point", value: "Mayodia, 2,655 m", icon: IconMountain },
        ]}
        from={circuitMeta.fromPrice}
        fromNote="per person, group of 6"
        defaultTier={tiers[0].id}
        askHref={generalAsk}
        image={{ src: circuitHero.desktop.src, alt: circuitHero.desktop.alt }}
      />

      <SectionNav
        items={sections}
        action={
          <ButtonLink href="#prices" size="sm">
            See prices
          </ButtonLink>
        }
      />

      <Container className="grid gap-14 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
        <div className="min-w-0 space-y-16 md:space-y-20">
          <ContentSection id="overview" title={circuitIntro.title}>
            <p className="max-w-prose font-ui text-lead text-fg-muted">{circuitIntro.lead}</p>
            <div className="mt-5 max-w-prose space-y-4 font-ui text-body text-fg-muted">
              {circuitIntro.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <p className="flex items-center gap-2 font-ui text-small font-semibold text-fg">
                <IconRoute size={18} className="text-brand" />
                The route, Dibrugarh to Dibrugarh
              </p>
              <RouteLine stops={stops} className="mt-3" />
            </div>
            <CheckList
              title="What to expect"
              tone="neutral"
              items={[...circuitIntro.truths]}
              className="mt-10 [&_ul]:grid [&_ul]:gap-x-8 [&_ul]:gap-y-3 [&_ul]:space-y-0 sm:[&_ul]:grid-cols-2"
            />
          </ContentSection>

          <ContentSection
            id="itinerary"
            title="Thirteen days, three regions"
            intro="Aalo, Namsai, Roing and Walong are real staging nights, not invisible transfers — that keeps the drives readable and makes the 02:00 Dong start possible."
          >
            <div className="space-y-12">
              {circuitChapters.map((chapter) => (
                <div key={chapter.id}>
                  <ChapterHeader
                    days={chapter.days}
                    place={chapter.place}
                    title={chapter.title}
                    description={chapter.description}
                    image={{ src: chapter.frame.src, alt: chapter.frame.alt }}
                  />
                  <ExpeditionDays
                    className="mt-6"
                    days={circuitDays
                      .filter((d) => d.chapter === chapter.id)
                      .map((d) => ({
                        day: d.day,
                        title: d.title,
                        meta: [
                          `${d.from} → ${d.to}`,
                          ...(d.journey ? [d.journey] : []),
                          ...(d.departure ? [`Departs ${d.departure}`] : []),
                          `Overnight: ${d.stay}`,
                        ],
                        paragraphs: [d.summary],
                        stops: d.stops.map((name) => ({ name })),
                        note: d.note,
                      }))}
                  />
                </div>
              ))}
            </div>
          </ContentSection>

          <ContentSection id="prices" title={circuitPricing.title} intro={circuitPricing.standfirst}>
            <PriceTiers
              slug={circuitMeta.slug}
              tiers={tiers}
              days={13}
              askHref={(t) => createGrandCircuitInquiryURL({ kind: "tier", label: t.label, size: t.size, price: t.price })}
              fineprint={circuitPricing.fineprint}
            />
          </ContentSection>

          <ContentSection id="included" title="What's included">
            <div className="grid gap-10 md:grid-cols-2">
              <NamedList title="Included" items={circuitIncluded} tone="include" />
              <NamedList title="Not included" items={circuitExcluded} tone="exclude" />
            </div>

            <div className="mt-12 border-t border-line pt-10">
              <h3 className="font-ui text-h3 text-fg">{circuitStay.title}</h3>
              <p className="mt-2 max-w-prose font-ui text-body text-fg-muted">{circuitStay.body}</p>
              <CheckList tone="neutral" items={[...circuitStay.items]} className="mt-5" />
            </div>

            <Callout tone="caution" title={circuitPomoExtension.title} className="mt-10">
              <p>{circuitPomoExtension.body}</p>
              <span className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                <ButtonLink href={circuitPomoExtension.href} variant="link" size="sm">
                  {circuitPomoExtension.linkLabel}
                  <IconArrowRight />
                </ButtonLink>
                <a
                  href={createGrandCircuitInquiryURL({ kind: "pomo-extension" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "link", size: "sm" })}
                >
                  Ask for an extension quote
                </a>
              </span>
            </Callout>

            <div className="mt-12">
              <h3 className="font-ui text-h4 text-fg">What to pack</h3>
              <div className="mt-4">
                <PackList items={circuitCarry} />
              </div>
            </div>
          </ContentSection>

          <ContentSection id="faq" title={circuitFaq.title} intro={circuitFaq.description}>
            {/* FAQPage JSON-LD is emitted in the page graph, so no schema here. */}
            <Accordion items={circuitFaq.faqs.map(({ question, answer }) => ({ question, answer }))} />
          </ContentSection>
        </div>

        <aside aria-label="Booking" className="hidden lg:block">
          <div className="sticky top-36">
            <ExpeditionBookingPanel
              slug={circuitMeta.slug}
              tiers={tiers}
              summary="12 nights · 13 days · ex-Dibrugarh"
              askHref={datesAsk}
            />
          </div>
        </aside>
      </Container>

      <Section id="photos" tone="subtle" className="scroll-mt-28">
        <Container>
          <SectionHeader
            title="Photos from the circuit"
            intro="Mechuka, the far east and the Dibang finish — all from our own trips on this route."
          />
          <PhotoGallery photos={photos} className="mt-10" />
        </Container>
      </Section>

      {related.length ? (
        <Section>
          <Container>
            <SectionHeader
              title={
                <>
                  Shorter ways <Accent>into Arunachal</Accent>
                </>
              }
              action={
                <ButtonLink href="/all-tours" variant="secondary" size="sm">
                  All tours
                  <IconArrowRight />
                </ButtonLink>
              }
            />
            <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <TourCard key={t.id} {...tourCard(t)} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <PlanCta
        title="Thirteen days is a big trip. Ask us anything first."
        body="Dates, room mix, the vehicle, what the Dong morning really involves — a person in Dibrugarh answers before you pay anything."
        whatsappHref={datesAsk}
      />

      <PriceBar
        floating
        title="Mechuka · Dong · Anini, 13 days"
        price={tiers[0].price}
        unit="per person"
        bookHref={`/book/${circuitMeta.slug}?tier=${tiers[0].id}`}
        bookLabel="Book"
        whatsappHref={generalAsk}
      />
    </>
  );
}

