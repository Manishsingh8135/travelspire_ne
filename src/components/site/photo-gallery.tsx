"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight, IconClose, IconExpand } from "@/components/icons";
import { cn } from "@/lib/utils";

/* Photo mosaic with a full-screen viewer. The first frame leads at double
   size; the rest fill a tidy grid. The viewer is a native <dialog> (focus
   trap and Escape for free) with arrow-key and swipe navigation. */
export type GalleryPhoto = { src: string; alt: string; caption?: string };

export function PhotoGallery({ photos, limit = 7, className }: { photos: GalleryPhoto[]; limit?: number; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const shown = photos.slice(0, limit);
  const hidden = photos.length - shown.length;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = useCallback((d: number) => setIndex((i) => (i + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  if (!photos.length) return null;
  const current = photos[index];

  return (
    <div className={className}>
      <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        {shown.map((photo, i) => (
          <li key={photo.src} className={cn(i === 0 && "col-span-2 row-span-2")}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-card bg-canvas-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              aria-label={`Open photo: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              {i === shown.length - 1 && hidden > 0 ? (
                <span className="absolute inset-0 grid place-items-center bg-black/55 font-ui text-h4 text-white">
                  +{hidden} photos
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      >
        <div
          className="relative flex h-full flex-col"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 font-ui text-small text-white/70">
            <span className="tabular-nums">
              {index + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="grid size-11 place-items-center rounded-control hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close viewer"
            >
              <IconClose size={22} />
            </button>
          </div>
          <div className="relative flex-1">
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <button
              type="button"
              onClick={() => step(-1)}
              className="grid size-11 shrink-0 place-items-center rounded-control hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous photo"
            >
              <IconChevronLeft size={24} />
            </button>
            <p className="text-center font-ui text-small text-white/80">{current.caption ?? current.alt}</p>
            <button
              type="button"
              onClick={() => step(1)}
              className="grid size-11 shrink-0 place-items-center rounded-control hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next photo"
            >
              <IconChevronRight size={24} />
            </button>
          </div>
        </div>
      </dialog>
      {photos.length > 1 ? (
        <button
          type="button"
          onClick={() => open(0)}
          className="mt-4 inline-flex items-center gap-2 font-ui text-small font-semibold text-brand hover:underline hover:underline-offset-4"
        >
          <IconExpand size={16} />
          View all {photos.length} photos
        </button>
      ) : null}
    </div>
  );
}
