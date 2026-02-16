// Image SEO and Structured Data for Northeast India Places
// This file contains optimized image data for better search engine visibility

export interface PlaceImage {
  src: string;
  alt: string;
  title: string;
  caption?: string;
  location: {
    name: string;
    state: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  keywords: string[];
  category: 'landscape' | 'portrait' | 'cultural' | 'festival' | 'monastery' | 'valley' | 'village';
}

export const placeImagesData: Record<string, PlaceImage[]> = {
  tawang: [
    {
      src: '/images/places/tawang/Tawang_1.PNG',
      alt: 'Tawang Monastery - Largest Buddhist monastery in India, Arunachal Pradesh',
      title: 'Tawang Monastery - Sacred Buddhist Heritage Site',
      caption: 'The magnificent Tawang Monastery, also known as Galden Namgey Lhatse, perched at 10,000 feet in Arunachal Pradesh',
      location: {
        name: 'Tawang',
        state: 'Arunachal Pradesh',
        coordinates: {
          latitude: 27.5856,
          longitude: 91.8573
        }
      },
      keywords: ['tawang monastery', 'buddhist monastery india', 'arunachal pradesh tourism', 'largest monastery india', 'himalayan monastery', 'tawang tourism'],
      category: 'monastery'
    },
    {
      src: '/images/places/tawang/Tawang_2.JPG',
      alt: 'Tawang Valley panoramic view with snow-capped Himalayan mountains',
      title: 'Tawang Valley - Breathtaking Himalayan Landscape',
      caption: 'Panoramic view of the pristine Tawang Valley surrounded by majestic Himalayan peaks',
      location: {
        name: 'Tawang Valley',
        state: 'Arunachal Pradesh',
        coordinates: {
          latitude: 27.5856,
          longitude: 91.8573
        }
      },
      keywords: ['tawang valley', 'himalayan valley', 'arunachal pradesh landscape', 'mountain valley india', 'himalayan tourism'],
      category: 'landscape'
    },
    {
      src: '/images/places/tawang/Tawang_3.JPG',
      alt: 'Traditional Monpa architecture and prayer flags in Tawang',
      title: 'Monpa Culture - Traditional Architecture in Tawang',
      caption: 'Traditional Monpa tribal architecture with colorful prayer flags fluttering in the Himalayan breeze',
      location: {
        name: 'Tawang',
        state: 'Arunachal Pradesh'
      },
      keywords: ['monpa culture', 'prayer flags', 'traditional architecture', 'tibetan buddhism', 'arunachal pradesh culture'],
      category: 'cultural'
    }
  ],

  'ziro-new': [
    {
      src: '/images/places/ziro-new/ziro-new-landscape-1.jpeg',
      alt: 'Ziro Valley UNESCO World Heritage Site - Pristine rice fields and tribal villages',
      title: 'Ziro Valley - UNESCO World Heritage Site in Arunachal Pradesh',
      caption: 'The stunning Ziro Valley, home to the Apatani tribe and famous Ziro Music Festival',
      location: {
        name: 'Ziro Valley',
        state: 'Arunachal Pradesh',
        coordinates: {
          latitude: 27.5464,
          longitude: 93.8299
        }
      },
      keywords: ['ziro valley', 'unesco world heritage', 'apatani tribe', 'ziro music festival', 'rice fields', 'tribal culture'],
      category: 'landscape'
    },
    {
      src: '/images/places/ziro-new/ziro-new-landscape-2.JPG',
      alt: 'Apatani tribal village with traditional bamboo houses in Ziro Valley',
      title: 'Apatani Village - Traditional Tribal Life in Ziro',
      caption: 'Traditional Apatani tribal village showcasing sustainable living and unique architectural style',
      location: {
        name: 'Ziro Valley',
        state: 'Arunachal Pradesh'
      },
      keywords: ['apatani village', 'tribal village india', 'bamboo architecture', 'sustainable living', 'indigenous culture'],
      category: 'village'
    },
    {
      src: '/images/places/ziro-new/ziro-new-portrait-5.JPG',
      alt: 'Ziro Music Festival 2026 venue - Open-air amphitheater surrounded by pine forests',
      title: 'Ziro Music Festival Venue - Natural Amphitheater',
      caption: 'The iconic Ziro Music Festival venue nestled in the heart of pine forests',
      location: {
        name: 'Ziro Valley',
        state: 'Arunachal Pradesh'
      },
      keywords: ['ziro music festival', 'outdoor music festival', 'pine forest venue', 'indie music festival', 'northeast music'],
      category: 'festival'
    }
  ],

  'anini-new': [
    {
      src: '/images/places/anini-new/anini-new-landscape-11.jpeg',
      alt: 'Anini Valley - Remote Himalayan paradise in Dibang Valley, Arunachal Pradesh',
      title: 'Anini Valley - Hidden Gem of Dibang Valley',
      caption: 'The pristine and remote Anini Valley, one of the least explored destinations in Northeast India',
      location: {
        name: 'Anini',
        state: 'Arunachal Pradesh',
        coordinates: {
          latitude: 28.8203,
          longitude: 95.9285
        }
      },
      keywords: ['anini valley', 'dibang valley', 'remote himalaya', 'unexplored india', 'pristine nature', 'offbeat destination'],
      category: 'landscape'
    },
    {
      src: '/images/places/anini-new/anini-new-portrait-1.jpg',
      alt: 'Traditional Idu Mishmi tribal house in Anini with mountain backdrop',
      title: 'Idu Mishmi Tribal Heritage in Anini',
      caption: 'Traditional Idu Mishmi tribal architecture against the stunning Himalayan backdrop',
      location: {
        name: 'Anini',
        state: 'Arunachal Pradesh'
      },
      keywords: ['idu mishmi tribe', 'tribal architecture', 'anini culture', 'indigenous communities', 'himalayan tribes'],
      category: 'cultural'
    }
  ],

  'mechuka-new': [
    {
      src: '/images/places/mechuka-new/mechuka-new-landscape-16.JPG',
      alt: 'Mechuka Valley - Last village of India near China border, Arunachal Pradesh',
      title: 'Mechuka Valley - India\'s Last Village',
      caption: 'The breathtaking Mechuka Valley, known as India\'s last village near the China border',
      location: {
        name: 'Mechuka',
        state: 'Arunachal Pradesh',
        coordinates: {
          latitude: 28.7733,
          longitude: 94.2617
        }
      },
      keywords: ['mechuka valley', 'last village india', 'china border', 'mechuka tourism', 'remote village', 'border tourism'],
      category: 'landscape'
    },
    {
      src: '/images/places/mechuka-new/Mechuka-new-portrait-1.jpg',
      alt: 'Samten Yongcha Monastery in Mechuka Valley with prayer wheels',
      title: 'Samten Yongcha Monastery - Buddhist Heritage in Mechuka',
      caption: 'The serene Samten Yongcha Monastery in Mechuka Valley, a center of Tibetan Buddhism',
      location: {
        name: 'Mechuka',
        state: 'Arunachal Pradesh'
      },
      keywords: ['samten yongcha monastery', 'mechuka monastery', 'tibetan buddhism', 'prayer wheels', 'buddhist heritage'],
      category: 'monastery'
    }
  ],

  hornbill: [
    {
      src: '/images/places/hornbill/Hornbill_1.PNG',
      alt: 'Hornbill Festival Nagaland - Festival of Festivals showcasing Naga tribal culture',
      title: 'Hornbill Festival - Festival of Festivals, Nagaland',
      caption: 'The spectacular Hornbill Festival celebrating the rich cultural heritage of Naga tribes',
      location: {
        name: 'Kohima',
        state: 'Nagaland',
        coordinates: {
          latitude: 25.6751,
          longitude: 94.1086
        }
      },
      keywords: ['hornbill festival', 'nagaland festival', 'naga tribes', 'festival of festivals', 'tribal culture', 'northeast festivals'],
      category: 'festival'
    },
    {
      src: '/images/places/hornbill/Dzoku_1.webp',
      alt: 'Dzükou Valley - Valley of flowers on Nagaland-Manipur border',
      title: 'Dzükou Valley - Valley of Flowers',
      caption: 'The enchanting Dzükou Valley, known as the Valley of Flowers on the Nagaland-Manipur border',
      location: {
        name: 'Dzükou Valley',
        state: 'Nagaland',
        coordinates: {
          latitude: 25.5506,
          longitude: 94.1375
        }
      },
      keywords: ['dzukou valley', 'valley of flowers', 'nagaland manipur border', 'dzukou lilies', 'trekking nagaland'],
      category: 'landscape'
    }
  ]
};

// Generate structured data for images
export const generateImageStructuredData = (images: PlaceImage[]) => {
  return images.map((image) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": `https://travelspirene.com${image.src}`,
    "url": `https://travelspirene.com${image.src}`,
    "name": image.title,
    "description": image.alt,
    "caption": image.caption,
    "keywords": image.keywords.join(', '),
    "contentLocation": {
      "@type": "Place",
      "name": image.location.name,
      "address": {
        "@type": "PostalAddress",
        "addressRegion": image.location.state,
        "addressCountry": "India"
      },
      ...(image.location.coordinates && {
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": image.location.coordinates.latitude,
          "longitude": image.location.coordinates.longitude
        }
      })
    },
    "creator": {
      "@type": "Organization",
      "name": "TravelSpire NE",
      "url": "https://travelspirene.com"
    },
    "copyrightHolder": {
      "@type": "Organization",
      "name": "TravelSpire NE"
    },
    "license": "https://travelspirene.com/terms-and-conditions"
  }));
};

// Get all images for sitemap generation
export const getAllPlaceImages = (): PlaceImage[] => {
  return Object.values(placeImagesData).flat();
};

// Get images by category
export const getImagesByCategory = (category: PlaceImage['category']): PlaceImage[] => {
  return getAllPlaceImages().filter(image => image.category === category);
};

// Get images by location
export const getImagesByLocation = (locationName: string): PlaceImage[] => {
  return getAllPlaceImages().filter(image => 
    image.location.name.toLowerCase().includes(locationName.toLowerCase())
  );
};
