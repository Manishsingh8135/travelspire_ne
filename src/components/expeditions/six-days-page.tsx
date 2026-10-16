import Image from "next/image";
import Link from "next/link";
import {
  Accent,
  Accordion,
  ButtonLink,
  Callout,
  Container,
  KeyFacts,
  PriceBar,
  Section,
  SectionHeader,
  buttonVariants,
} from "@/components/ds";
import {
  IconArrowUpRight,
  IconCalendar,
  IconClock,
  IconGauge,
  IconRoute,
  IconSunrise,
  IconUsers,
  IconMountain,
} from "@/components/icons";
import { CheckList, ContentSection, PlanCta } from "@/components/site/content-blocks";
import { PhotoGallery } from "@/components/site/photo-gallery";
import { SectionNav } from "@/components/site/section-nav";
import { FRAMES, sixArchive, sixNights, sixTierDetail } from "@/data/expeditions/anini-six-atlas";
import {
  sixCarry,
  sixDays,
  sixExcluded,
  sixFaqSection,
  sixGallery,
  sixHeroImages,
  sixIncluded,
  sixMeta,
  sixOverture,
  sixPricing,
  sixProfile,
  sixRelated,
  sixSeason,
  sixSummit,
  sixWater,
} from "@/data/expeditions/anini-six-days";
import { createAniniSixInquiryURL } from "@/lib/whatsapp";
import {
  ExpeditionBookingPanel,
  ExpeditionDays,
  ExpeditionHero,
  NamedList,
  PackList,
  PriceTiers,
  RouteLine,
  SeasonStrip,
  StayCard,
  Timeline,
  type ExpeditionTier,
} from "./expedition-blocks";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "trek", label: "Pomo trek day" },
  { id: "prices", label: "Prices" },
  { id: "included", label: "Stays & inclusions" },
  { id: "season", label: "When to go" },
  { id: "faq", label: "Questions" },
  { id: "photos", label: "Photos" },
];

const summitIcons = [IconGauge, IconClock, IconSunrise, IconUsers];

/* Six Days in the Dibang — Anini + Pomo Grassland, 5N/6D. */
export function SixDaysPage() {
  const tiers: ExpeditionTier[] = sixPricing.tiers.map((t) => {
    const detail = sixTierDetail.find((d) => d.id === t.id);
    return {
      id: t.id,
      label: t.label,
      size: t.size,
      price: t.price,
      badge: t.badge,
      note: t.note,
      details: detail
        ? [
            { label: "Vehicle", value: detail.vehicle },
            { label: "Rooms", value: detail.room },
            { label: "Best for", value: detail.bestFor },
          ]
        : undefined,
    };
  });
  const generalAsk = createAniniSixInquiryURL();
  const datesAsk = createAniniSixInquiryURL({ kind: "dates" });

  const days = sixDays.map((d) => ({
    day: d.day,
    title: d.title,
    meta: [
      `Departs ${d.departs}`,
      `From ${d.from}`,
      d.sleeps === "—" ? "Ends in Dibrugarh" : `Sleeps ${d.sleeps}`,
    ],
    paragraphs: [d.lede, d.story, d.closing],
    // Day two is the water day: list every stop with its own note.
    stops:
      d.day === 2
        ? sixWater.entries.map((e) => ({ name: e.name, note: e.note }))
        : d.waypoints.map((w) => ({ name: w.name, note: w.note })),
  }));

  const photos = [
    ...sixArchive.map((f) => ({ src: f.src, alt: f.alt, caption: f.place })),
    ...sixGallery.map((g) => ({ src: g.src, alt: g.alt, caption: g.caption })),
  ].filter((p, i, list) => list.findIndex((q) => q.src === p.src) === i);

  return (
    <>
      <ExpeditionHero
        slug={sixMeta.slug}
        crumb={sixMeta.title}
        badges={[
          { label: "Signature expedition", tone: "brand" },
          { label: "Includes a hard trek day", tone: "caution" },
        ]}
        title={
          <>
            Six Days <Accent>in the Dibang</Accent>
          </>
        }
        lead="Five nights inside Dibang Valley, built around one 3 AM start onto Pomo grassland — with easing days before it, recovery days after, and every long drive in daylight."
        facts={[
          { label: "Duration", value: "6 days · 5 nights", icon: IconClock },
          { label: "Season", value: "Oct – Apr", icon: IconCalendar },
          { label: "Group", value: "4 – 6, or private for 2", icon: IconUsers },
          { label: "Highest road", value: "Mayodia, 2,655 m", icon: IconMountain },
        ]}
        from={sixMeta.fromPrice}
        fromNote="per person, group of 6"
        defaultTier={tiers[0].id}
        askHref={generalAsk}
        image={{ src: sixHeroImages.desktop.src, alt: sixHeroImages.alt }}
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
          <ContentSection id="overview" title="Above the town most people turn back from">
            <p className="max-w-prose font-ui text-lead text-fg-muted">{sixOverture.lead}</p>
            <div className="mt-5 max-w-prose space-y-4 font-ui text-body text-fg-muted">
              {sixOverture.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <p className="flex items-center gap-2 font-ui text-small font-semibold text-fg">
                <IconRoute size={18} className="text-brand" />
                The route
              </p>
              <RouteLine stops={[...sixMeta.route.split(" · "), "Dibrugarh"]} className="mt-3" />
            </div>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <CheckList title={sixOverture.truths[0].label} items={[...sixOverture.truths[0].items]} tone="include" />
              <CheckList title={sixOverture.truths[1].label} items={[...sixOverture.truths[1].items]} tone="exclude" />
            </div>
          </ContentSection>

          <ContentSection
            id="itinerary"
            title="Day by day"
            intro="One long drive at the front, the trek in the middle, and the gentle days after it. Timings move with Mayodia's weather."
          >
            <ExpeditionDays days={days} />

            <div className="mt-12">
              <h3 className="font-ui text-h4 text-fg">Day one, in kilometres and metres</h3>
              <p className="mt-1 max-w-prose font-ui text-small text-fg-muted">{sixProfile.note}</p>
              <div className="mt-5">
                <table className="w-full border-t border-line font-ui text-small">
                  <thead>
                    <tr className="text-left text-fg-subtle">
                      <th scope="col" className="py-3 pr-4 font-medium">Km</th>
                      <th scope="col" className="py-3 pr-4 font-medium">Place</th>
                      <th scope="col" className="py-3 pr-4 text-right font-medium">Elevation</th>
                      <th scope="col" className="hidden py-3 font-medium sm:table-cell">On the road</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sixProfile.nodes.map((n) => (
                      <tr key={n.name} className="border-t border-line align-top">
                        <td className="py-3 pr-4 text-fg-subtle tabular-nums">{n.km}</td>
                        <td className="py-3 pr-4">
                          <span className="font-medium text-fg">{n.name}</span>
                          <span className="mt-0.5 block text-fg-muted sm:hidden">{n.note}</span>
                        </td>
                        <td
                          className={
                            n.elev === sixProfile.maxElev
                              ? "py-3 pr-4 text-right font-semibold text-highlight tabular-nums"
                              : "py-3 pr-4 text-right text-fg tabular-nums"
                          }
                        >
                          {n.elev.toLocaleString("en-IN")} m
                        </td>
                        <td className="hidden py-3 text-fg-muted sm:table-cell">{n.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ContentSection>

          <ContentSection id="trek" title={sixSummit.title} intro={sixSummit.standfirst}>
            <KeyFacts
              items={sixSummit.brief.map((b, i) => ({ label: b.label, value: b.value, icon: summitIcons[i] }))}
            />
            <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-12">
              <Timeline segments={sixSummit.segments} />
              <figure className="hidden md:block">
                <div className="sticky top-40">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-canvas-subtle">
                    <Image
                      src={FRAMES.pomoHorizon.src}
                      alt={FRAMES.pomoHorizon.alt}
                      fill
                      sizes="256px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 font-ui text-caption text-fg-subtle">{FRAMES.pomoHorizon.place}</figcaption>
                </div>
              </figure>
            </div>
            <Callout tone="caution" title="One shot at the summit" className="mt-10">
              {sixSummit.warning}
            </Callout>
            <a
              href={createAniniSixInquiryURL({ kind: "trek" })}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "link", className: "mt-5" })}
            >
              Not sure the trek day suits you? Ask us honestly
              <IconArrowUpRight />
            </a>
          </ContentSection>

          <ContentSection id="prices" title="What it costs" intro={sixPricing.standfirst}>
            <PriceTiers
              slug={sixMeta.slug}
              tiers={tiers}
              days={6}
              askHref={(t) => createAniniSixInquiryURL({ kind: "tier", label: t.label, size: t.size, price: t.price })}
              fineprint={sixPricing.fineprint}
            />
          </ContentSection>

          <ContentSection id="included" title="Where you sleep, what's included">
            <div className="grid gap-6 md:grid-cols-2">
              {sixNights.map((n) => (
                <StayCard
                  key={n.id}
                  label={n.label}
                  title={`${n.title} — ${n.serif}`}
                  body={n.body}
                  facts={n.facts}
                  image={{ src: n.frame.src, alt: n.frame.alt }}
                />
              ))}
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <NamedList title="Included" items={sixIncluded} tone="include" />
              <NamedList title="Not included" items={sixExcluded} tone="exclude" />
            </div>
            <div className="mt-12">
              <h3 className="font-ui text-h4 text-fg">What to pack</h3>
              <div className="mt-4">
                <PackList items={sixCarry} />
              </div>
            </div>
          </ContentSection>

          <ContentSection id="season" title="When to go" intro={sixSeason.standfirst}>
            <SeasonStrip months={sixSeason.months} />
          </ContentSection>

          <ContentSection id="faq" title="Your questions" intro={sixFaqSection.description}>
            {/* FAQPage JSON-LD is emitted in the page graph, so no schema here. */}
            <Accordion items={sixFaqSection.faqs.map(({ question, answer }) => ({ question, answer }))} />
          </ContentSection>
        </div>

        <aside aria-label="Booking" className="hidden lg:block">
          <div className="sticky top-36">
            <ExpeditionBookingPanel
              slug={sixMeta.slug}
              tiers={tiers}
              summary="5 nights · 6 days · ex-Dibrugarh"
              askHref={datesAsk}
            />
          </div>
        </aside>
      </Container>

      <Section id="photos" tone="subtle" className="scroll-mt-28">
        <Container>
          <SectionHeader
            title="Photos from the valley"
            intro="Only frames whose location we can stand behind — Pomo, the plateau, the falls and the meadows."
          />
          <PhotoGallery photos={photos} className="mt-10" />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            title={
              <>
                Read before <Accent>you go</Accent>
              </>
            }
            intro="The road, the town, the valley and the permit — the guides this trip is built on."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sixRelated.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="group block font-ui">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-card bg-canvas-subtle">
                    <Image
                      src={r.image}
                      alt={`${r.name} — ${r.kind.toLowerCase()}`}
                      fill
                      sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="mt-3 block text-small text-fg-subtle">{r.kind}</span>
                  <span className="mt-0.5 flex items-start justify-between gap-3">
                    <span className="text-h4 text-fg group-hover:text-brand">{r.name}</span>
                    <IconArrowUpRight size={18} className="mt-1 shrink-0 text-fg-subtle" />
                  </span>
                  <span className="mt-1 block text-small text-fg-muted">{r.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <PlanCta
        title="Tell us your month. We'll tell you honestly."
        body="Which departures still have space, whether the trek day suits your group, and what the weather usually does that week."
        whatsappHref={datesAsk}
      />

      <PriceBar
        floating
        title="Six Days in the Dibang"
        price={tiers[0].price}
        unit="per person"
        bookHref={`/book/${sixMeta.slug}?tier=${tiers[0].id}`}
        bookLabel="Book"
        whatsappHref={generalAsk}
      />
    </>
  );
}
