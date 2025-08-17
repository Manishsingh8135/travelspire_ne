// Image SEO Component for adding structured data
"use client";

import { StructuredData } from '@/components/seo/structured-data';
import { placeImagesData, generateImageStructuredData, type PlaceImage } from '@/data/seo/image-seo-data';

interface ImageSEOProps {
  location?: keyof typeof placeImagesData;
  images?: PlaceImage[];
  limit?: number;
}

export function ImageSEO({ location, images, limit = 5 }: ImageSEOProps) {
  let targetImages: PlaceImage[] = [];

  if (images) {
    targetImages = images;
  } else if (location && placeImagesData[location]) {
    targetImages = placeImagesData[location];
  }

  // Limit the number of images for performance
  if (limit > 0) {
    targetImages = targetImages.slice(0, limit);
  }

  if (targetImages.length === 0) {
    return null;
  }

  const structuredDataArray = generateImageStructuredData(targetImages);

  return (
    <>
      {structuredDataArray.map((data, index) => (
        <StructuredData 
          key={`image-seo-${index}`} 
          data={data} 
        />
      ))}
    </>
  );
}

// Component for gallery structured data
export function GalleryStructuredData({ 
  images, 
  galleryName, 
  galleryDescription 
}: {
  images: PlaceImage[];
  galleryName: string;
  galleryDescription: string;
}) {
  const galleryData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": galleryName,
    "description": galleryDescription,
    "image": images.map(image => ({
      "@type": "ImageObject",
      "contentUrl": `https://travelspirene.com${image.src}`,
      "name": image.title,
      "description": image.alt,
      "caption": image.caption
    }))
  };

  return <StructuredData data={galleryData} />;
}
