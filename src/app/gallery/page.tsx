// app/gallery/page.tsx - Main Image Gallery Page
import { Metadata } from "next";
import Link from "next/link";
import { SEOImageGallery } from "@/components/gallery/seo-image-gallery";
import { getAllPlaceImages, placeImagesData } from "@/data/seo/image-seo-data";
import { ImageSEO } from "@/components/seo/image-seo";

export const metadata: Metadata = {
  title: "Northeast India Photo Gallery | TravelSpire NE - Stunning Destinations",
  description: "Explore breathtaking photos of Northeast India's most beautiful destinations. Tawang Monastery, Ziro Valley, Anini, Mechuka, Hornbill Festival and more. Plan your Northeast adventure with authentic travel photography.",
  keywords: "northeast india photos, travel photography, tawang monastery, ziro valley, anini valley, mechuka village, hornbill festival, arunachal pradesh images, nagaland photos, buddhist monasteries, himalayan valleys",
  openGraph: {
    title: "Northeast India Photo Gallery | TravelSpire NE",
    description: "Stunning photography showcasing the untouched beauty of Northeast India's destinations",
    images: ["/images/places/tawang/Tawang_1.PNG"],
    url: "https://travelspirene.com/gallery",
    type: "website",
  },
  alternates: {
    canonical: "https://travelspirene.com/gallery",
  },
};

export default function GalleryPage() {
  const allImages = getAllPlaceImages();
  const tawangImages = placeImagesData.tawang || [];
  const ziroImages = placeImagesData['ziro-new'] || [];
  const aniniImages = placeImagesData['anini-new'] || [];
  const mechukImages = placeImagesData['mechuka-new'] || [];
  const hornbillImages = placeImagesData.hornbill || [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* SEO for all gallery images */}
      <ImageSEO images={allImages} limit={20} />
      
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Northeast India Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the untouched beauty of Northeast India through our curated collection of travel photography. 
            From ancient monasteries to pristine valleys, experience the magic before you visit.
          </p>
        </div>

        {/* Featured Gallery - All Destinations */}
        <SEOImageGallery
          images={allImages}
          galleryTitle="Northeast India Highlights"
          galleryDescription="A stunning collection showcasing the diverse beauty and rich culture of all eight Northeast Indian states"
          className="mb-20"
        />

        {/* Individual Location Galleries */}
        {tawangImages.length > 0 && (
          <SEOImageGallery
            images={tawangImages}
            galleryTitle="Tawang - Sacred Himalayan Heritage"
            galleryDescription="Explore Tawang Monastery, the largest Buddhist monastery in India, and the breathtaking Himalayan landscapes of Arunachal Pradesh"
          />
        )}

        {ziroImages.length > 0 && (
          <SEOImageGallery
            images={ziroImages}
            galleryTitle="Ziro Valley - UNESCO World Heritage Beauty"
            galleryDescription="Immerse yourself in the pristine Ziro Valley, home to the Apatani tribe and the famous Ziro Music Festival"
            className="mt-16"
          />
        )}

        {aniniImages.length > 0 && (
          <SEOImageGallery
            images={aniniImages}
            galleryTitle="Anini - Remote Himalayan Paradise"
            galleryDescription="Discover the untouched wilderness of Anini in Dibang Valley, one of India's most remote and pristine destinations"
            className="mt-16"
          />
        )}

        {mechukImages.length > 0 && (
          <SEOImageGallery
            images={mechukImages}
            galleryTitle="Mechuka - India's Last Village"
            galleryDescription="Journey to Mechuka, India's last village near the China border, where traditional culture meets stunning natural beauty"
            className="mt-16"
          />
        )}

        {hornbillImages.length > 0 && (
          <SEOImageGallery
            images={hornbillImages}
            galleryTitle="Hornbill Festival & Dzükou Valley"
            galleryDescription="Experience Nagaland's vibrant Hornbill Festival and the enchanting Valley of Flowers - Dzükou Valley"
            className="mt-16"
          />
        )}

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 mt-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Experience These Places?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Let our expert local guides take you to these incredible destinations. 
            Custom tours, authentic experiences, and unforgettable memories await.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors"
            >
              Explore Tours
            </Link>
            <a
              href="https://wa.me/919864141211?text=Hi! I'm interested in Northeast India tours after seeing your gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors"
            >
              📱 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
