// app/gallery/page.tsx
import type { Metadata } from "next";
import { Accent, Breadcrumbs, ButtonLink, Container, Heading, Lead, Section, SectionHeader } from "@/components/ds";
import { IconArrowRight } from "@/components/icons";
import { GalleryGrid } from "@/components/company/gallery-grid";
import { PlanCta } from "@/components/site/content-blocks";
import { GalleryStructuredData, ImageSEO } from "@/components/seo/image-seo";
import { getAllPlaceImages, placeImagesData, type PlaceImage } from "@/data/seo/image-seo-data";
import { createTripPlanningURL } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Northeast India Photo Gallery | TravelSpire NE - Stunning Destinations",
  description:
    "Explore breathtaking photos of Northeast India's most beautiful destinations. Tawang Monastery, Ziro Valley, Anini, Mechuka, Hornbill Festival and more. Plan your Northeast adventure with authentic travel photography.",
  keywords:
    "northeast india photos, travel photography, tawang monastery, ziro valley, anini valley, mechuka village, hornbill festival, arunachal pradesh images, nagaland photos, buddhist monasteries, himalayan valleys",
  openGraph: {
    title: "Northeast India Photo Gallery | TravelSpire NE",
    description: "Photographs from our own trips across Arunachal Pradesh and Nagaland",
    images: ["/images/places/tawang/Tawang_1.PNG"],
    url: "https://travelspirene.com/gallery",
    type: "website",
  },
  alternates: {
    canonical: "https://travelspirene.com/gallery",
  },
};

/* Each photograph appears once, under its place. Groups run from the
   valley we know best outwards; every group links to where you can go. */
const groups = [
  {
    id: "anini",
    key: "anini-new",
    title: "Anini & Dibang Valley",
    intro:
      "The Seven Lakes trek, Emuli Grassland, the Pomo ridge trail, waterfall country, A-frame stays and a double rainbow over the plateau.",
    link: { label: "Anini travel guide", href: "/places/anini" },
  },
  {
    id: "mechuka",
    key: "mechuka-new",
    title: "Mechuka Valley, Shi Yomi",
    intro:
      "The Yargyap Chu river, Samten Yongcha monastery, the golden Buddha, the helicopter landmark, winter snow and the high ridge above town.",
    link: { label: "Mechuka expedition", href: "/tours/mechuka-expedition" },
  },
  {
    id: "tawang",
    key: "tawang",
    title: "Tawang",
    intro: "Tawang Monastery, the valley under snow and Monpa architecture on the road west.",
    link: { label: "Tawang & Sela Pass tour", href: "/tours/tawang-expedition" },
  },
  {
    id: "ziro",
    key: "ziro-new",
    title: "Ziro Valley",
    intro: "Apatani country — rice fields, pine ridges and the festival ground of the Ziro Festival of Music.",
    link: { label: "Ziro Festival", href: "/ziro-music-festival-2026" },
  },
  {
    id: "hornbill",
    key: "hornbill",
    title: "Hornbill Festival & Dzükou Valley",
    intro: "Nagaland in December: the Hornbill Festival at Kisama and the Dzükou Valley trek.",
    link: { label: "Hornbill Festival 2026", href: "/tours/hornbill-festival-2026" },
  },
] as const;

/* Hornbill_1.PNG is a screenshot with carousel arrows baked in (the tour
   data already comments it out); show the real festival photograph here. */
const substitutes: Record<string, PlaceImage> = {
  "/images/places/hornbill/Hornbill_1.PNG": {
    src: "/images/places/hornbill/Hornbill_3.PNG",
    alt: "Naga dancers in full regalia at the Hornbill Festival, Kisama, Nagaland",
    title: "Hornbill Festival - Kisama, Nagaland",
    caption: "Warriors of Nagaland's tribes dancing in the arena at Kisama Heritage Village during the Hornbill Festival",
    location: { name: "Kisama", state: "Nagaland" },
    keywords: ["hornbill festival", "naga dance", "kisama heritage village"],
    category: "festival",
  },
};

const toPhoto = (image: PlaceImage) => ({
  src: image.src,
  alt: image.alt,
  // Data titles run "Place - Tagline"; the place is the useful part.
  title: image.title.split(" - ")[0],
  caption: image.caption,
});

export default function GalleryPage() {
  const allImages = getAllPlaceImages();
  const sections = groups
    .map((g) => ({ ...g, images: (placeImagesData[g.key] ?? []).map((img) => substitutes[img.src] ?? img) }))
    .filter((g) => g.images.length > 0);

  return (
    <>
      <ImageSEO images={allImages} limit={20} />

      <Section spacing="none" className="pb-10 pt-6 md:pb-12 md:pt-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Gallery", href: "/gallery" },
            ]}
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <Heading as="h1" size="h1" className="max-w-[16ch]">
              Photographs from <Accent>our own trips</Accent>
            </Heading>
            <Lead>
              {allImages.length} frames from the roads we drive — Dibang Valley, Mechuka, Tawang, Ziro and Nagaland. Tap
              any photo to see it full size.
            </Lead>
          </div>
          <nav aria-label="Jump to a place" className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
            {sections.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 font-ui text-small font-medium text-fg-muted transition-colors hover:border-fg/40 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                {g.title}
                <span className="text-fg-subtle tabular-nums">{g.images.length}</span>
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {sections.map((g, i) => (
        <Section key={g.id} id={g.id} tone={i % 2 === 0 ? "subtle" : "default"} spacing="compact" className="scroll-mt-20">
          <GalleryStructuredData images={g.images} galleryName={g.title} galleryDescription={g.intro} />
          <Container>
            <SectionHeader
              title={g.title}
              intro={g.intro}
              size="h3"
              action={
                <ButtonLink href={g.link.href} variant="link">
                  {g.link.label}
                  <IconArrowRight />
                </ButtonLink>
              }
            />
            <div className="mt-8">
              <GalleryGrid photos={g.images.map(toPhoto)} label={g.title} />
            </div>
          </Container>
        </Section>
      ))}

      <PlanCta
        title="Want to stand in one of these frames?"
        body="Tell us which places caught your eye and roughly when you can travel — we'll suggest the route."
        whatsappHref={createTripPlanningURL()}
      />
    </>
  );
}
