import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TourGalleryGridProps {
  images: string[];
  onImageClick: (index: number) => void;
}

export function TourGalleryGrid({
  images,
  onImageClick,
}: TourGalleryGridProps) {
  return (
    <div className="grid auto-rows-[15rem] grid-cols-1 gap-3 sm:auto-rows-[18rem] md:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <button
          type="button"
          key={`${image}-${index}`}
          onClick={() => onImageClick(index)}
          aria-label={`Open gallery image ${index + 1} of ${images.length}`}
          className={cn(
            "group relative overflow-hidden rounded-[14px] bg-[#d7cebe] shadow-[7px_14px_30px_-24px_rgba(25,35,29,0.68)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87543a] focus-visible:ring-offset-3 focus-visible:ring-offset-[#f1ebdf]",
            index === 0 && images.length > 2 && "md:col-span-2 md:row-span-2",
          )}
        >
          <Image
            src={image}
            alt={`Landscape from this journey, photograph ${index + 1}`}
            fill
            sizes={
              index === 0
                ? "(min-width: 1024px) 58vw, (min-width: 768px) 88vw, 100vw"
                : "(min-width: 1024px) 28vw, (min-width: 768px) 44vw, 100vw"
            }
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/[0.08]" />
          <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-[9px] bg-[#111a15]/[0.8] text-white opacity-100 shadow-[5px_9px_20px_-13px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
            <Maximize2 aria-hidden="true" className="h-4 w-4" />
          </span>
        </button>
      ))}
    </div>
  );
}
