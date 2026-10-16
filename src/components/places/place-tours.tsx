import * as React from "react";
import { ButtonLink, Container, Section, SectionHeader, TourCard } from "@/components/ds";
import { IconArrowRight } from "@/components/icons";
import { tourCard } from "@/components/tours/tour-facts";
import { getActiveTours } from "@/data/tours";

/* Tours that go to this place, read from the canonical tour data so prices
   and durations never drift from the tour pages. Finished festivals drop
   out on their own. */
export function PlaceTours({
  slugs,
  title,
  intro,
  id = "tours",
  tone = "default",
}: {
  slugs: string[];
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  tone?: "default" | "subtle";
}) {
  const active = getActiveTours();
  const tours = slugs
    .map((slug) => active.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  if (!tours.length) return null;

  return (
    <Section id={id} tone={tone} className="scroll-mt-28">
      <Container>
        <SectionHeader
          eyebrow="Go with us"
          title={title}
          intro={intro}
          action={
            <ButtonLink href="/all-tours" variant="secondary" size="sm">
              All tours
              <IconArrowRight />
            </ButtonLink>
          }
        />
        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {tours.slice(0, 3).map((tour) => (
            <TourCard key={tour.id} {...tourCard(tour)} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
