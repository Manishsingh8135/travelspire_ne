"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight, IconClose } from "@/components/icons";
import { cn } from "@/lib/utils";

/* Photo grid for the gallery page. Rows always close: on three columns,
   one or two frames go wide so the count lands on a multiple of three; on
   two columns the leftover single goes full width. The viewer is a native
   <dialog> with arrow keys and swipe. */

export type GridPhoto = { src: string; alt: string; title: string; caption?: string };

function layout(count: number) {
  // Desktop (3 cols): +1 cell per wide frame until the total divides by 3.
  const wideDesktop = (3 - (count % 3)) % 3;
  const wide = new Set<number>();
  // Spread wide frames: the first one leads, a second sits mid-set.
  if (wideDesktop >= 1) wide.add(0);
  if (wideDesktop === 2) wide.add(Math.min(count - 1, Math.floor(count / 2) + (Math.floor(count / 2) % 2)));
  // Mobile (2 cols): wide frames are already full width; if the remaining
  // singles are odd, the last single goes full width too.
  const singles = count - wide.size;
  const lastSingle = [...Array(count).keys()].filter((i) => !wide.has(i)).pop();
  return { wide, fullOnMobile: singles % 2 === 1 ? lastSingle : undefined };
}

export function GalleryGrid({ photos, label }: { photos: GridPhoto[]; label: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const { wide, fullOnMobile } = layout(photos.length);

  const step = useCallback((d: number) => setIndex((i) => (i + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const current = photos[index];

  return (
    <>
      <ul aria-label={label} className="grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-2 sm:auto-rows-[14rem] sm:gap-3 md:grid-cols-3 lg:auto-rows-[16rem]">
        {photos.map((photo, i) => (
          <li
            key={photo.src}
            className={cn(
              (wide.has(i) || fullOnMobile === i) && "col-span-2",
              fullOnMobile === i && !wide.has(i) && "md:col-span-1",
            )}
          >
            <button
              type="button"
              onClick={() => {
                setIndex(i);
                dialogRef.current?.showModal();
              }}
              aria-label={`Open photo: ${photo.title}`}
              className="group relative block h-full w-full overflow-hidden rounded-card bg-canvas-subtle text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={wide.has(i) ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 font-ui text-caption text-white/90 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
              >
                <span className="line-clamp-1">{photo.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${label} — photo viewer`}
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
              aria-label="Close viewer"
              className="grid size-11 place-items-center rounded-control hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
              aria-label="Previous photo"
              className="grid size-11 shrink-0 place-items-center rounded-control hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <IconChevronLeft size={24} />
            </button>
            <div className="max-w-prose text-center font-ui">
              <p className="text-body font-semibold text-white">{current.title}</p>
              {current.caption ? <p className="mt-1 text-small text-white/75">{current.caption}</p> : null}
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="grid size-11 shrink-0 place-items-center rounded-control hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <IconChevronRight size={24} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
