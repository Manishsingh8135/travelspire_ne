import Image from "next/image";
import {
  Accent,
  Breadcrumbs,
  ButtonLink,
  Container,
  Eyebrow,
  Heading,
  KeyFacts,
  Lead,
  Section,
  SectionHeader,
} from "@/components/ds";
import { IconArrowRight, IconClock, IconInstagram, IconPermit, IconPin, IconVehicle } from "@/components/icons";
import { Testimonials } from "@/components/company/testimonials";
import { PlanCta } from "@/components/site/content-blocks";
import { homeWhyPoints } from "@/data/home/homepage";
import { anini2026Src, mechuka2026Src } from "@/data/seo/image-seo-data";
import { teamMembers } from "@/data/team/team-data";
import { createTripPlanningURL } from "@/lib/whatsapp";

/* About: who we are, how we work, the founder, what travellers say. Only
   things we can stand behind — no milestones we can't document. */

const values = [
  {
    title: "Adventure, with judgement",
    body: "Remote roads and high passes are the point of travelling here. We plan them so the journey stretches you without putting you at risk.",
  },
  {
    title: "The valleys should gain from your visit",
    body: "We work with local homestays, drivers and guides, so the money a trip brings stays with the people who live along the route.",
  },
  {
    title: "Care for the land",
    body: "Responsible, sustainable travel that keeps the Northeast's landscapes the way we found them.",
  },
  {
    title: "Real places, real people",
    body: "Time in villages and homes rather than staged stops — the region as it is, met on its own terms.",
  },
];

const photos = [
  {
    src: mechuka2026Src.ridgeViewpoint,
    alt: "Travellers on a ridge above Mechuka town, Arunachal Pradesh",
    label: "Mechuka, from the ridge above town",
  },
  {
    src: anini2026Src.pomoRidgeTrail,
    alt: "Trekkers on the Pomo ridge trail near Anini, Dibang Valley",
    label: "The Pomo ridge trail, Anini",
  },
  {
    src: "/images/places/anini/Anini_10.JPG",
    alt: "The mountain road between Roing and Anini",
    label: "The NH-313 towards Anini",
  },
];

export default function AboutPage() {
  const founder = teamMembers[0];
  const planUrl = createTripPlanningURL();

  return (
    <>
      <Section spacing="none" className="pb-14 pt-6 md:pb-20 md:pt-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div className="space-y-6">
              <Eyebrow>About Travelspire</Eyebrow>
              <Heading as="h1" size="h1" className="max-w-[15ch]">
                A local team, on roads <Accent>we drive ourselves.</Accent>
              </Heading>
              <Lead className="max-w-[48ch]">
                Travelspire North-East is a small travel company in Dibrugarh, Assam. We plan and run tours across
                Arunachal Pradesh and the wider Northeast — in our own vehicles, with drivers who know the roads, and
                with your permits arranged before you arrive.
              </Lead>
              <KeyFacts
                layout="grid"
                items={[
                  { label: "Based in", value: "Dibrugarh, Assam", icon: IconPin },
                  { label: "On these roads", value: `${founder.yearsOfExperience}+ years`, icon: IconClock },
                  { label: "Vehicles", value: "Our own fleet", icon: IconVehicle },
                  { label: "Permits", value: "Arranged for you", icon: IconPermit },
                ]}
              />
            </div>
            <div className="relative -mx-5 aspect-[4/3] overflow-hidden bg-canvas-subtle sm:mx-0 sm:rounded-panel">
              <Image
                src={anini2026Src.rainbowGlamping}
                alt="Double rainbow over forested mountains and tents at Anini, Dibang Valley"
                fill
                priority
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeader
              stacked
              eyebrow="Our story"
              title={
                <>
                  Why a company <Accent>from Dibrugarh</Accent>
                </>
              }
            />
            <div className="mt-6 max-w-prose space-y-5 font-ui text-body-lg text-fg-muted">
              <p>
                Dibrugarh sits where the Brahmaputra plains meet the roads into eastern Arunachal. From here it is a
                day&apos;s drive to Dambuk, Roing, Anini or Walong, and two days to Mechuka. We know these routes
                first-hand, and Travelspire began as a way to share them properly — with the right vehicle, the right
                season and the paperwork done.
              </p>
              <p>
                One of our first group trips, in 2019, went to Dong Valley to watch India&apos;s first sunrise. We still
                run that journey, alongside the Dibang Valley circuit, Mechuka and the long road west to Tawang.
              </p>
              <p>
                We are not a marketplace or a reseller. When you book, the people who answer your messages are the
                people who plan your route and send the car.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3 self-center sm:gap-4">
            {photos.map((photo, i) => (
              <li key={photo.src} className={i === 0 ? "col-span-2" : undefined}>
                <div className={`relative overflow-hidden rounded-card bg-canvas ${i === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 320px, 50vw"}
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 font-ui text-caption text-fg-subtle">{photo.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="How we work"
            title={
              <>
                What you can <Accent>count on.</Accent>
              </>
            }
            intro="The practical promises behind every trip we run."
          />
          <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
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

      <Section tone="subtle">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
          <div className="relative mx-auto aspect-[1/1] w-full max-w-lg overflow-hidden rounded-panel bg-canvas lg:mx-0">
            <Image
              src={founder.image}
              alt={`${founder.name}, founder of Travelspire North-East, beside one of our vehicles`}
              fill
              sizes="(min-width: 1024px) 448px, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <Eyebrow>The founder</Eyebrow>
            <Heading className="mt-3">{founder.name}</Heading>
            <p className="mt-1 font-ui text-body text-fg-subtle">
              {founder.roles.join(" · ")} · {founder.location.city}, {founder.location.state}
            </p>
            <p className="mt-6 max-w-prose font-ui text-body-lg text-fg-muted">
              Native to Assam, Sandeep has more than {founder.yearsOfExperience} years of experience leading
              expeditions across Northeast India. He started Travelspire to show travellers the region properly, and
              to help keep its local traditions alive.
            </p>
            <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-line pt-6 font-ui sm:grid-cols-2">
              <div>
                <dt className="text-small text-fg-subtle">Languages</dt>
                <dd className="mt-0.5 text-body text-fg">{founder.languages.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-small text-fg-subtle">Knows best</dt>
                <dd className="mt-0.5 text-body text-fg">{founder.expertise.join(", ")}</dd>
              </div>
            </dl>
            {founder.social?.[0] ? (
              <a
                href={founder.social[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-ui text-small font-medium text-brand hover:underline hover:underline-offset-4"
              >
                <IconInstagram size={18} />
                {founder.social[0].handle}
              </a>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="What we care about"
            title={
              <>
                Four things <Accent>we won&apos;t trade.</Accent>
              </>
            }
          />
          <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {values.map((value, i) => (
              <li key={value.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line pt-5 font-ui">
                <span className="text-h4 font-semibold text-highlight tabular-nums">{i + 1}</span>
                <div>
                  <h3 className="text-h4 text-fg">{value.title}</h3>
                  <p className="mt-1.5 text-body text-fg-muted">{value.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container>
          <SectionHeader
            eyebrow="Traveller stories"
            title={
              <>
                Told by the people <Accent>who went.</Accent>
              </>
            }
            action={
              <ButtonLink href="/all-tours" variant="secondary" size="sm">
                See the tours
                <IconArrowRight />
              </ButtonLink>
            }
          />
        </Container>
        <div className="mt-10">
          <Testimonials />
        </div>
      </Section>

      <PlanCta whatsappHref={planUrl} />
    </>
  );
}
