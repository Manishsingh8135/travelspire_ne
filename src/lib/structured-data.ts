// lib/structured-data.ts
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Travelspire North-East",
  "alternateName": "Travelspire NE",
  "description": "Authentic travel experiences in Northeast India with local expertise and cultural immersion",
  "url": "https://travelspirene.com",
  "logo": "https://travelspirene.com/images/logo/Travelspire_ne_logo_new.png",
  "foundingDate": "2019",
  "founder": {
    "@type": "Person",
    "name": "Sandeep Sonowal",
    "nationality": "Indian",
    "knowsAbout": ["Northeast India Travel", "Adventure Tourism", "Cultural Tours", "Local History"],
    "yearOfExperience": 8,
    "sameAs": ["https://instagram.com/travelspire_ne"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "HSR Layout",
    "addressLocality": "Dibrugarh",
    "addressRegion": "Assam",
    "postalCode": "786001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "27.4728",
    "longitude": "95.0170"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-9864141211",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi", "Assamese"]
    },
    {
      "@type": "ContactPoint", 
      "email": "info@travelspirene.com",
      "contactType": "customer service",
      "areaServed": "IN"
    }
  ],
  "telephone": "+91-9864141211",
  "email": "info@travelspirene.com",
  "sameAs": [
    "https://www.instagram.com/travelspire_ne",
    "https://wa.me/919864141211"
  ],
  "serviceArea": [
    "Arunachal Pradesh",
    "Assam", 
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Sikkim",
    "Tripura"
  ],
  "priceRange": "₹₹₹",
  "knowsAbout": [
    "Northeast India Travel",
    "Adventure Tourism",
    "Cultural Tours",
    "Festival Tours", 
    "Eco Tourism",
    "Heritage Tourism",
    "Trekking",
    "Wildlife Tours",
    "Photography Tours"
  ]
});

interface TourSchemaInput {
  title: string;
  description?: string;
  price: number;
  duration: string;
  difficulty?: string;
  heroImage: string;
  itinerary?: Array<{
    title: string;
    description: string;
  }>;
}

export const generateTourPackageSchema = (tour: TourSchemaInput) => ({
  "@context": "https://schema.org",
  "@type": "TourPackage",
  "name": tour.title,
  "description": tour.description,
  "provider": {
    "@type": "TravelAgency",
    "name": "Travelspire North-East"
  },
  "offers": {
    "@type": "Offer",
    "price": tour.price.toString(),
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "duration": tour.duration,
  "touristType": tour.difficulty,
  "image": tour.heroImage,
  "itinerary": tour.itinerary?.map((day, index: number) => ({
    "@type": "Action",
    "name": `Day ${index + 1}: ${day.title}`,
    "description": day.description
  }))
});

export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://travelspirene.com",
  "name": "Travelspire North-East",
  "alternateName": "Travelspire NE",
  "description": "Premier travel agency specializing in authentic Northeast India experiences with expert local guides",
  "url": "https://travelspirene.com",
  "telephone": "+91-9864141211",
  "email": "info@travelspirene.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "HSR Layout",
    "addressLocality": "Dibrugarh", 
    "addressRegion": "Assam",
    "postalCode": "786001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates", 
    "latitude": "27.4728",
    "longitude": "95.0170"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.instagram.com/travelspire_ne",
    "https://wa.me/919864141211"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "27.4728",
      "longitude": "95.0170"
    },
    "geoRadius": "1000000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Northeast India Travel Packages",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "TourPackage",
          "name": "Adventure Tours",
          "description": "Trekking and adventure experiences across Northeast India"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "TourPackage",
          "name": "Cultural Tours",
          "description": "Immersive cultural experiences with local tribes and communities"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "TourPackage", 
          "name": "Festival Tours",
          "description": "Experience major Northeast India festivals like Hornbill, Ziro, and Orange Festival"
        }
      }
    ]
  },
  "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "UPI", "Bank Transfer"],
  "currenciesAccepted": "INR"
});

// Enhanced Review Schema
export const generateReviewSchema = (reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "TravelAgency",
    "name": "Travelspire North-East"
  },
  "reviewBody": reviews.map(r => r.reviewBody).join(" "),
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length,
    "bestRating": 5
  },
  "author": reviews.map(r => ({
    "@type": "Person",
    "name": r.author
  })),
  "datePublished": reviews[0]?.datePublished
});

// WhatsApp Contact Schema
export const generateWhatsAppSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  "telephone": "+91-9864141211",
  "contactType": "customer support",
  "availableLanguage": ["English", "Hindi", "Assamese"],
  "serviceArea": "Northeast India",
  "hoursAvailable": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "09:00",
    "closes": "21:00"
  },
  "contactOption": "WhatsApp",
  "url": "https://wa.me/919864141211"
});

// Service Schema for SEO
export const generateServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Northeast India Travel Planning",
  "description": "Complete travel planning and booking services for authentic Northeast India experiences",
  "provider": {
    "@type": "TravelAgency",
    "name": "Travelspire North-East"
  },
  "areaServed": [
    "Arunachal Pradesh",
    "Assam",
    "Manipur", 
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Sikkim",
    "Tripura"
  ],
  "serviceType": "Travel Planning",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "INR",
    "priceRange": "₹10,999-₹19,999"
  }
});

// Enhanced Ziro Festival 2025 Event Schema
export const generateZiroFestival2025Schema = () => ({
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  "name": "Ziro Festival of Music 2025",
  "alternateName": "Ziro Music Festival 2025",
  "description": "India's premier eco-friendly outdoor music festival featuring 35+ international and Indian artists in the UNESCO Tentative World Heritage Site of Ziro Valley, Arunachal Pradesh.",
  "startDate": "2025-09-25T15:00:00+05:30",
  "endDate": "2025-09-28T23:00:00+05:30",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Ziro Valley",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ziro",
      "addressRegion": "Arunachal Pradesh", 
      "addressCountry": "IN",
      "postalCode": "791120"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "27.5453",
      "longitude": "93.8287"
    },
    "description": "UNESCO Tentative World Heritage Site in the heart of Apatani cultural landscape"
  },
  "organizer": {
    "@type": "TravelAgency",
    "name": "Travelspire North-East",
    "url": "https://travelspirene.com",
    "telephone": "+91-9864141211",
    "email": "info@travelspirene.com"
  },
  "performer": [
    {
      "@type": "MusicGroup",
      "name": "Shilpa Rao",
      "genre": "Bollywood, Playback"
    },
    {
      "@type": "MusicGroup", 
      "name": "Anna Erhard",
      "genre": "Folk, Indie"
    },
    {
      "@type": "MusicGroup",
      "name": "Soumik Datta", 
      "genre": "World Music, Sarod"
    },
    {
      "@type": "MusicGroup",
      "name": "Susheela Raman",
      "genre": "World Music, Tamil"
    },
    {
      "@type": "MusicGroup",
      "name": "Swarathma",
      "genre": "Folk Rock, Indie"
    },
    {
      "@type": "MusicGroup",
      "name": "Parvaaz",
      "genre": "Progressive Rock"
    },
    {
      "@type": "MusicGroup",
      "name": "The Local Train",
      "genre": "Indie Rock, Hindi"
    },
    {
      "@type": "MusicGroup",
      "name": "Dualist Inquiry",
      "genre": "Electronic, Ambient"
    }
  ],
  "offers": [
    {
      "@type": "Offer",
      "name": "Dome Tent Package", 
      "price": "1999",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-12-01",
      "validThrough": "2025-09-20",
      "description": "1 night dome tent accommodation with breakfast and campsite amenities"
    },
    {
      "@type": "Offer",
      "name": "Alpine Tent Premium Package",
      "price": "8999", 
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-12-01",
      "validThrough": "2025-09-20",
      "description": "3 nights alpine tent accommodation with all amenities and festival access"
    },
    {
      "@type": "Offer",
      "name": "All Inclusive Package",
      "price": "17699",
      "priceCurrency": "INR", 
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-12-01",
      "validThrough": "2025-09-20", 
      "description": "Complete 4N/5D package with train tickets, alpine tent, safari, and village tour"
    }
  ],
  "image": [
    "https://travelspirene.com/images/places/ziro-new/ziro-new-landscape-1.jpeg",
    "https://travelspirene.com/images/places/ziro-new/ziro-new-landscape-2.JPG"
  ],
  "url": "https://travelspirene.com/ziro-music-festival-2025",
  "maximumAttendeeCapacity": 8000,
  "typicalAgeRange": "18-65",
  "inLanguage": "en",
  "keywords": "music festival, eco-friendly, UNESCO heritage, Apatani culture, indie music, outdoor festival, Arunachal Pradesh",
  "audience": {
    "@type": "Audience",
    "audienceType": "Music lovers, adventure travelers, cultural enthusiasts"
  },
  "isAccessibleForFree": false,
  "subEvent": [
    {
      "@type": "MusicEvent",
      "name": "Opening Concert",
      "startDate": "2025-09-25T15:00:00+05:30"
    },
    {
      "@type": "Event", 
      "name": "Cultural Workshop",
      "description": "Apatani cultural immersion experience"
    }
  ]
});