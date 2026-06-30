import Image from "next/image";
import { cn } from "@/lib/cn";
import { mediaPublicUrl, type HeroMedia } from "@/lib/media";

/** Renders a media row with next/image (AVIF/WebP, responsive). Use inside a
 *  positioned, sized container (it fills the parent). */
export function MediaImage({
  media,
  sizes,
  priority = false,
  className,
}: {
  media: HeroMedia;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={mediaPublicUrl(media.storage_path)}
      alt={media.alt ?? ""}
      fill
      sizes={sizes ?? "100vw"}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
