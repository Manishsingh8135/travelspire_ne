import { Photo } from "@/components/ui/photo";
import { cn } from "@/lib/cn";

export type MosaicImage = { src: string; alt: string; caption?: string };

// Varied aspect rhythm so the mosaic breathes — pattern, not randomness.
const ASPECTS = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]"] as const;

/**
 * Credited photo mosaic (docs-new/07-pages/10 §16) — CSS-columns masonry,
 * varied aspects, caption line per image. Hides itself below 3 images
 * (graceful degradation, never a lonely grid).
 */
export function GalleryMosaic({
  images,
  title = "From the road",
  className,
}: {
  images: MosaicImage[];
  title?: string;
  className?: string;
}) {
  if (images.length < 3) return null;
  return (
    <section className={className} aria-label={title}>
      <h2 className="font-display text-2xl font-medium sm:text-3xl">{title}</h2>
      <div className="mt-6 columns-2 gap-3 md:columns-3 md:gap-4">
        {images.map((img, i) => (
          <figure key={img.src} className="mb-3 break-inside-avoid md:mb-4">
            <div
              className={cn(
                "relative overflow-hidden rounded-xl bg-muted shadow-panel",
                ASPECTS[i % ASPECTS.length],
              )}
            >
              <Photo
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
            {img.caption ? (
              <figcaption className="mt-1.5 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                {img.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
