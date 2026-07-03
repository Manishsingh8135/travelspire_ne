import Image, { type ImageProps } from "next/image";
import { IMAGE_BLUR } from "@/lib/image-blur";

/**
 * next/image with an automatic warm blur placeholder for known local marketing
 * photos — no per-call `blurDataURL` needed (image-seo doctrine: warm shimmer,
 * never a blank/spinner). The blur map is `server-only`, so use Photo in server
 * components; the two client rails (Dream feed, map place-rail) and the LCP hero
 * keep their own setup.
 */
export function Photo({ alt, ...props }: ImageProps) {
  const blur = typeof props.src === "string" ? IMAGE_BLUR[props.src] : undefined;
  if (blur && props.placeholder === undefined) {
    return <Image alt={alt} {...props} placeholder="blur" blurDataURL={blur} />;
  }
  return <Image alt={alt} {...props} />;
}
