import Image from "next/image";
import { blurFor, RADIUS, RATIO, type Frame } from "@/lib/media";
import { cn } from "@/lib/utils";

interface PlateImageProps {
  frame: Frame;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Photographs are large; 78 holds up at these sizes and halves the bytes. */
  quality?: number;
}

/**
 * A bare filled photograph. The parent owns the box — use this when the layout
 * dictates the crop (full-bleed panels, sticky panes, stacked frames).
 */
export function PlateImage({
  frame,
  sizes,
  priority = false,
  className,
  quality = 78,
}: PlateImageProps) {
  return (
    <Image
      src={frame.src}
      alt={frame.alt}
      fill
      sizes={sizes}
      quality={quality}
      priority={priority}
      placeholder="blur"
      blurDataURL={blurFor(frame.tone)}
      className={cn("object-cover", className)}
    />
  );
}

interface PlateProps extends PlateImageProps {
  /** Defaults to the tall standard. Only pass RATIO.wide for full-width frames. */
  ratio?: number;
  caption?: string;
  /** Small mono index printed opposite the caption, e.g. a plate number. */
  index?: string;
  captionTone?: "light" | "dark";
  figureClassName?: string;
  radiusClassName?: string;
}

/**
 * A captioned plate on the standard tall crop. Every photograph in the grid
 * shares this shape, so columns line up and nothing reads as an accident.
 */
export function Plate({
  frame,
  sizes,
  priority,
  quality,
  ratio = RATIO.tall,
  caption,
  index,
  captionTone = "dark",
  className,
  figureClassName,
  radiusClassName = RADIUS.media,
}: PlateProps) {
  const label = caption ?? frame.place;

  return (
    <figure className={figureClassName}>
      <div
        className={cn("relative overflow-hidden", radiusClassName)}
        style={{ aspectRatio: ratio }}
      >
        <PlateImage
          frame={frame}
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={className}
        />
      </div>
      {(label || index) && (
        <figcaption
          className={cn(
            "mt-2.5 flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em]",
            captionTone === "light" ? "text-[#F3EEE2]/45" : "text-[#9A5B36]",
          )}
        >
          <span>{label}</span>
          {index && <span className="flex-none opacity-70">{index}</span>}
        </figcaption>
      )}
    </figure>
  );
}
