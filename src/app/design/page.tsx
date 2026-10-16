import { CalendarDays, Clock, Mountain, Users } from "lucide-react";
import {
  Accent,
  Accordion,
  Badge,
  Breadcrumbs,
  Button,
  ButtonLink,
  Callout,
  Container,
  Eyebrow,
  Field,
  Heading,
  Input,
  KeyFacts,
  Lead,
  PriceBar,
  Section,
  SectionHeader,
  Select,
  Textarea,
  TourCard,
} from "@/components/ds";
import { icons } from "@/components/icons";

/* Field Guide specimen. Renders the whole system in one mode per request:
   /design (light) and /design?theme=dark. Internal; noindex via layout. */

const swatches = [
  ["canvas", "bg-canvas"],
  ["canvas-subtle", "bg-canvas-subtle"],
  ["surface", "bg-surface"],
  ["inverse", "bg-inverse"],
  ["fg", "bg-fg"],
  ["fg-muted", "bg-fg-muted"],
  ["fg-subtle", "bg-fg-subtle"],
  ["line-strong", "bg-line-strong"],
  ["brand", "bg-brand"],
  ["highlight", "bg-highlight"],
  ["seasonal", "bg-seasonal"],
  ["positive", "bg-positive"],
  ["caution", "bg-caution"],
  ["critical", "bg-critical"],
  ["notice", "bg-notice"],
] as const;

const typeScale = [
  ["display", "40 → 72", "text-display", "Arunachal, travelled properly"],
  ["h1", "34 → 56", "text-h1", "Mechuka, Dong & Anini"],
  ["h2", "28 → 40", "text-h2", "Choose your departure"],
  ["h3", "20 → 24", "text-h3", "Day 4 · Dong before sunrise"],
  ["h4", "18", "text-h4", "What the price includes"],
  ["lead", "17 → 20", "text-lead text-fg-muted", "Thirteen days from monastery valley to India’s far east, with one vehicle and enough time to stay."],
  ["body", "16", "text-body text-fg-muted", "Leave Roing by 6 AM. The Mayodia road is slow after rain, and the driver decides the pace on the slide zones."],
  ["small", "14", "text-small text-fg-muted", "Prices are per person on twin sharing."],
  ["caption", "13", "text-caption text-fg-subtle", "Photographed on the Seven Lakes trail, October 2025."],
  ["eyebrow", "12", "text-eyebrow uppercase text-highlight", "Seasonal departures"],
] as const;

const tours = [
  {
    href: "/tours/mechuka-dong-anini-tour-package",
    image: "/images/places/mechuka-new/mechuka-new-landscape-16.JPG",
    imageAlt: "Red-roofed house below the ridges of Mechuka valley",
    place: "Mechuka · Dong · Anini",
    title: "The Grand Arunachal Circuit",
    duration: "13 days",
    season: "Oct – Apr",
    price: 37499,
  },
  {
    href: "/tours/hornbill-festival-2026",
    image: "/images/places/hornbill/Hornbill_3.PNG",
    imageAlt: "Naga dancers in full regalia at the Hornbill Festival arena",
    place: "Kisama, Nagaland",
    title: "Hornbill Festival 2026",
    duration: "2 – 4 days",
    season: "1 – 10 Dec",
    price: 1799,
    badge: { label: "1–10 Dec · Booking open", tone: "seasonal" as const },
  },
  {
    href: "/tours/tawang-expedition",
    image: "/images/places/tawang/Tawang_3.JPG",
    imageAlt: "Tawang monastery above the valley under winter cloud",
    place: "Tawang, Arunachal Pradesh",
    title: "Tawang & Sela Pass",
    duration: "5 days",
    season: "Oct – Apr",
    price: 16499,
  },
];

const days = [
  ["01", "Dibrugarh → Aalo", "Cross the Brahmaputra on the Bogibeel bridge and climb into the Siang foothills. About 8 hours."],
  ["02", "Aalo → Mechuka", "The Yorlung road into the valley; arrive with daylight to walk through town."],
  ["03", "Mechuka", "Samten Yongcha monastery in the morning, the river flats and the high ridge in the afternoon."],
];

const faqs = [
  {
    question: "Are Arunachal permits included?",
    answer: "Yes. We apply for your Inner Line Permit once you book and send it to you before travel. Foreign nationals need a Protected Area Permit, which we also arrange.",
  },
  {
    question: "Is the Dong sunrise guaranteed?",
    answer: "No one can promise the weather. We plan the walk for the clearest month and keep a spare morning so you get two chances.",
  },
  {
    question: "Can I book a flight or train on the last day?",
    answer: "Book onward travel for the following day. Mountain roads can lose hours to landslides on the way back to Dibrugarh.",
  },
];

function Specimen() {
  return (
    <div className="font-ui">
      {/* Intro */}
      <Section spacing="compact" className="border-b border-line">
        <Container className="space-y-5">
          <Eyebrow>Field Guide · design system</Eyebrow>
          <Heading as="h1" size="h1">
            One system, <Accent>two lights.</Accent>
          </Heading>
          <Lead className="max-w-[58ch]">
            Every colour below is a token with a light and a dark value. Every size is one of eleven
            steps. Nothing on the site should need anything else.
          </Lead>
        </Container>
      </Section>

      {/* Colour */}
      <Section spacing="compact">
        <Container>
          <SectionHeader eyebrow="Colour" title="Tokens, not hex" size="h3" as="h2" />
          <ul className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-8">
            {swatches.map(([name, cls]) => (
              <li key={name} className="space-y-2">
                <div className={`h-14 rounded-control border border-line ${cls}`} />
                <p className="text-caption text-fg-muted">{name}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Icons */}
      <Section spacing="compact">
        <Container>
          <SectionHeader
            eyebrow="Iconography"
            title="Our own icons"
            intro="Drawn for Travelspire on a 24px grid: 1.6 stroke, round joins, no fills. Travel glyphs carry the region — monastery, prayer flags, first sunrise, the 4×4."
            size="h3"
          />
          <ul className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-6 lg:grid-cols-10">
            {Object.entries(icons).map(([name, Glyph]) => (
              <li key={name} className="flex flex-col items-center gap-2 bg-canvas px-2 py-5">
                <Glyph size={28} className="text-fg" />
                <span className="text-caption text-fg-subtle">{name}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Type */}
      <Section spacing="compact" tone="subtle">
        <Container>
          <SectionHeader
            eyebrow="Typography"
            title="Eleven steps, nothing under 12px"
            intro="Instrument Sans carries everything. Instrument Serif italic appears once per heading, as an accent."
            size="h3"
          />
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {typeScale.map(([name, px, cls, sample]) => (
              <div key={name} className="grid gap-2 py-5 md:grid-cols-[10rem_1fr] md:items-baseline md:gap-8">
                <dt className="text-small text-fg-subtle">
                  <span className="font-semibold text-fg">{name}</span> · {px}px
                </dt>
                <dd className={`${cls} font-ui`}>{sample}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Controls */}
      <Section spacing="compact">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <SectionHeader eyebrow="Actions" title="Buttons" size="h3" />
            <div className="flex flex-wrap items-center gap-3">
              <Button>Book this tour</Button>
              <Button variant="secondary">Check dates</Button>
              <Button variant="ghost">Compare</Button>
              <Button variant="link">Read the permit guide</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg">Plan my trip</Button>
              <Button size="sm" variant="secondary">
                Filter
              </Button>
              <Button disabled>Sold out</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="seasonal">1–10 Dec</Badge>
              <Badge tone="positive">Seats available</Badge>
              <Badge tone="caution">4 seats left</Badge>
              <Badge tone="critical">ILP required</Badge>
              <Badge tone="notice">Online permit</Badge>
              <Badge tone="brand">Fixed departure</Badge>
              <Badge>Moderate</Badge>
            </div>
          </div>
          <div className="space-y-4">
            <SectionHeader eyebrow="Notes" title="Callouts" size="h3" />
            <Callout tone="note" title="Permits are checked at Bhalukpong">
              Carry a printed copy of your ILP and the ID you applied with. Phones lose signal after Tenga.
            </Callout>
            <Callout tone="tip" title="Best month">
              Late October to November: clear mornings, harvested fields, cold nights.
            </Callout>
            <Callout tone="caution" title="Monsoon closures">
              June to August, the Mayodia road closes for days at a time. We don’t run leisure trips then.
            </Callout>
          </div>
        </Container>
      </Section>

      {/* Product page head */}
      <Section spacing="compact" tone="subtle">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Tours", href: "/all-tours" },
              { label: "Mechuka, Dong & Anini", href: "/tours/mechuka-dong-anini-tour-package" },
            ]}
          />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-end">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                <Badge tone="brand">Private circuit</Badge>
                <Badge>Moderate</Badge>
              </div>
              <Heading as="h2" size="h1">
                Mechuka, Dong <Accent>&amp; Anini</Accent>
              </Heading>
              <Lead className="max-w-[56ch]">
                Thirteen days from monastery valley to India’s far east, then across Mayodia into
                Dibang country. One vehicle, twelve nights, time to stay.
              </Lead>
            </div>
            <PriceBar
              title="13 days · Group of 6"
              price={37499}
              bookHref="/book/mechuka-dong-anini-tour-package"
              whatsappHref="https://wa.me/919864141211"
            />
          </div>
          <KeyFacts
            items={[
              { label: "Duration", value: "13 days / 12 nights", icon: Clock },
              { label: "Best season", value: "Oct – Apr", icon: CalendarDays },
              { label: "Highest point", value: "2,655 m", icon: Mountain },
              { label: "Group size", value: "4 – 6 travellers", icon: Users },
            ]}
          />
        </Container>
      </Section>

      {/* Cards */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Featured journeys"
            title={
              <>
                The three we’d <Accent>put you on first.</Accent>
              </>
            }
            intro="Fixed departures and private circuits, run by the team that drives these roads every week."
            action={
              <ButtonLink href="/all-tours" variant="secondary" size="sm">
                See all 12 tours
              </ButtonLink>
            }
          />
          <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.href} {...tour} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Itinerary + FAQ */}
      <Section tone="subtle">
        <Container className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Day by day" title="Itinerary, without boxes" size="h3" />
            <ol className="mt-8 border-t border-line">
              {days.map(([n, title, text]) => (
                <li key={n} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6">
                  <span className="font-display text-h3 italic text-highlight tabular-nums">{n}</span>
                  <div className="space-y-1.5">
                    <h3 className="text-h4 text-fg">{title}</h3>
                    <p className="text-body text-fg-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeader eyebrow="Before you book" title="Questions" size="h3" />
            <Accordion className="mt-8" items={faqs} />
          </div>
        </Container>
      </Section>

      {/* Form */}
      <Section>
        <Container size="prose">
          <SectionHeader eyebrow="Enquiry" title="Plan a trip with us" size="h3" />
          <form className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="Your name" htmlFor="ds-name">
              <Input id="ds-name" autoComplete="name" placeholder="Asha Rao" />
            </Field>
            <Field label="Phone" htmlFor="ds-phone" hint="We reply on WhatsApp within a few hours.">
              <Input id="ds-phone" type="tel" autoComplete="tel" placeholder="+91" />
            </Field>
            <Field label="Trip" htmlFor="ds-trip">
              <Select id="ds-trip" defaultValue="mda">
                <option value="mda">Mechuka, Dong & Anini</option>
                <option value="hornbill">Hornbill Festival</option>
                <option value="custom">Something custom</option>
              </Select>
            </Field>
            <Field label="Email" htmlFor="ds-email" error="Enter an email like name@example.com">
              <Input id="ds-email" type="email" aria-invalid defaultValue="asha@" />
            </Field>
            <Field label="Anything we should know" htmlFor="ds-notes" optional className="sm:col-span-2">
              <Textarea id="ds-notes" placeholder="Dates, group size, who's travelling…" />
            </Field>
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Send enquiry
              </Button>
            </div>
          </form>
        </Container>
      </Section>

      {/* Inverse band */}
      <Section tone="inverse">
        <Container className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-end">
          <div className="space-y-4">
            <Eyebrow>Plan with us</Eyebrow>
            <Heading size="h2">
              Tell us your dates. <Accent>We’ll build the road.</Accent>
            </Heading>
          </div>
          <div className="space-y-5 md:justify-self-end">
            <p className="max-w-[40ch] text-body text-fg-muted">
              A real person in Dibrugarh answers — usually within a few hours, always before you pay.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">Plan my trip</ButtonLink>
              <ButtonLink href="/all-tours" variant="secondary">
                Browse tours
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function Switcher({ items }: { items: { label: string; href: string; active: boolean }[] }) {
  return (
    <div className="flex rounded-control border border-line p-0.5 text-small">
      {items.map(({ label, href, active }) => (
        <a
          key={label}
          href={href}
          aria-current={active ? "page" : undefined}
          className={
            active
              ? "rounded-[0.375rem] bg-fg px-3 py-1 font-medium text-canvas"
              : "rounded-[0.375rem] px-3 py-1 text-fg-muted transition-colors hover:text-fg"
          }
        >
          {label}
        </a>
      ))}
    </div>
  );
}

export default async function DesignPage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string }>;
}) {
  const { theme } = await searchParams;
  const dark = theme === "dark";
  return (
    <div data-ds-specimen data-theme={dark ? "dark" : "light"} className="min-h-screen">
      <div className="sticky top-16 z-30 border-b border-line bg-canvas/85 backdrop-blur">
        <Container className="flex h-14 items-center justify-between font-ui">
          <p className="text-small font-semibold text-fg">Travelspire · Evergreen design system</p>
          <Switcher
            items={[
              { label: "Light", href: "/design", active: !dark },
              { label: "Dark", href: "/design?theme=dark", active: dark },
            ]}
          />
        </Container>
      </div>
      <Specimen />
    </div>
  );
}
