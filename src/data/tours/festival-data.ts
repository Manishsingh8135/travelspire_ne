// data/tours/festival-data.ts
import { FestivalTour } from "@/types/tours/tour";

export const hornbillFestival: FestivalTour = {
  id: "hornbill-festival-2025",
  slug: "hornbill-festival-2025",
  type: "Festival",
  festivalName: "Hornbill Festival",
  title: "Hornbill Festival 2025",
  subtitle: "The biggest festival of Nagaland",
  overview: "Experience the cultural extravaganza of Northeast India at the Hornbill Festival, combined with the breathtaking beauty of Dzukou Valley. This festival celebrates the rich heritage of Nagaland's 16 major tribes with traditional dances, music, local cuisine, and handicrafts.",
  location: "Kisama Heritage Village, Nagaland",
  featured: true,
  upcoming: true,
  trending: true,
  tags: ["festival", "cultural", "nagaland", "tribal-heritage", "dzukou-valley"],

  eventDates: {
    start: "2025-12-01",
    end: "2025-12-10",
    year: 2025
  },

  heroImage: "/images/places/hornbill/Hornbill_3.PNG",
  thumbnail: "/images/places/hornbill/Hornbill_3.PNG",
  gallery: [
    // "/images/places/hornbill/Hornbill_1.PNG",
     "/images/places/hornbill/Hornbill_6.JPG",
    "/images/places/hornbill/Dzoku_3.jpg",
    "/images/places/hornbill/Hornbill_2.WEBP",
    "/images/places/hornbill/Dzoku_2.jpg",
    "/images/places/hornbill/Hornbill_3.PNG",
    "/images/places/hornbill/Hornbill_4.PNG"
  ],

  highlights: [
    "Hornbill Festival- The biggest festival of Nagaland",
    "Dzukou Valley- The Valley of flower of Northeast",
    "Explore & Experience the Naga lifestyle and culture",
    "Local Naga Cuisines"
  ],

  culturalHighlights: [
    "Traditional dance performances",
    "Naga wrestling championships",
    "Indigenous games demonstrations",
    "Local handicraft exhibitions"
  ],

  variants: [
    {
      id: "hornbill-basic",
      name: "Hornbill Camping",
      duration: {
        days: 2,
        nights: 1
      },
      price: 1799,
      description: "Basic camping experience at the festival",
      inclusions: [
        "Camping stay",
        "Breakfast & Dinner",
        "Basic amenities"
      ]
    },
    {
      id: "hornbill-dzukou-2d",
      name: "Hornbill x Dzukou Valley",
      duration: {
        days: 3,
        nights: 2
      },
      price: 7299,
      description: "Festival plus Dzukou Valley trek experience",
      inclusions: [
        "Camping stays",
        "Breakfast & Dinner",
        "Dzukou trek",
        "Ex-Dimapur transport",
        "Hornbill festival entry"
      ],
      additionalActivities: ["Dzukou Valley Trek", "Cultural Workshops"]
    },
    {
      id: "hornbill-premium",
      name: "Hornbill Premium Experience",
      duration: {
        days: 4,
        nights: 3
      },
      price: 9299,
      description: "Complete Hornbill and Dzukou Valley experience",
      inclusions: [
        "Camping stays",
        "All meals",
        "Dzukou trek",
        "Ex-Dimapur transport",
        "Extended festival access",
        "Cultural workshops"
      ]
    }
  ],

  baseInclusions: [
    "Stay on twin/triple sharing basis",
    "Breakfast",
    "Dinner",
    "Trip leader and Local guide",
    "Tents & Blankets",
    "Guide fees",
    "Permits"
  ],

  baseExclusions: [
    "Flight/Train tickets",
    "Personal Expenses",
    "Camera fees",
    "Lunch",
    "Any other food or beverage charges not mentioned",
    "Festival entry fees",
    "Costs due to natural calamities"
  ],

  thingsToCarry: [
    "Comfortable walking shoes",
    "Warm clothes",
    "Camera",
    "Valid ID proof",
    "Cash for personal expenses",
    "Basic medications"
  ],

  importantNote: "50% advance payment required for booking confirmation. Festival entry tickets to be purchased separately at the venue.",
  difficulty: "Easy"
};

export const orangeFestival: FestivalTour = {
  id: "orange-festival-2025",
  slug: "orange-festival-2025",
  type: "Festival",
  festivalName: "OFAM (DAMBUK) 2024 ",
  title: "OFAM (DAMBUK) 2025",
  subtitle: "Where Adventure Meets Music in the Land of Oranges",
  overview: "Experience the unique blend of music, adventure, and nature at the Orange Festival of Adventure & Music in Dambuk. Set against the backdrop of orange orchards and mountains, this festival offers an unforgettable mix of live performances, adventure activities, and local culture.",
  location: "Dambuk, Arunachal Pradesh",
  featured: true,

  eventDates: {
    start: "2025-12-13", 
    end: "2025-12-15",
    year: 2025
  },

  heroImage: "/images/places/dambuk/Dambuk_3.jpg", 
  thumbnail: "/images/places/dambuk/Dambuk_3.jpg",
  gallery: [
   "/images/places/dambuk/Dambuk_4.JPG",
   "/images/places/dambuk/Dambuk_2.jpg",
   "/images/places/dambuk/Dambuk_5.jpg",
   "/images/places/dambuk/Dambuk_6.JPG",
   "/images/places/dambuk/Dambuk_7.jpg"
  ],

  highlights: [
    "Live Music Performances at Orange Festival",
    "Adventure Activities and Pool Parties",
    "Morning Instrumental Music Sessions",
    "Scenic Mountain Views and Orange Orchards",
    "Unique Camping Experience"
  ],

  culturalHighlights: [
    "Live music performances",
    "Local orange cultivation experience",
    "Cultural performances",
    "Adventure sports activities"
  ],

  specialActivities: [
    "Morning live instrumental music",
    "Day pool party",
    "After-party till 1:00 AM",
    "Sightseeing",
    "Jamming sessions"
  ],

  variants: [
    {
      id: "ofm-cottage-double-decker",
      name: "Double Decker Cottage",
      duration: {
        days: 3,
        nights: 2
      },
      price: 7500,
      description: "Luxurious double-decker cottage accommodation perfect for small groups",
      maxGroupSize: 3,
      inclusions: [
        "Breakfast included",
        "Pool party access",
        "Morning music session",
        "Comfortable cottage stay"
      ]
    },
    {
      id: "ofm-double-room",
      name: "Double Room",
      duration: {
        days: 3,
        nights: 2
      },
      price: 6500,
      description: "Comfortable double room accommodation for couples",
      maxGroupSize: 2,
      inclusions: [
        "Breakfast included",
        "Access to all festival areas",
        "Pool party access",
        "Morning music session"
      ]
    },
    {
      id: "ofm-xxl-tent",
      name: "XXL Elevated Tent",
      duration: {
        days: 3,
        nights: 2
      },
      price: 2250,
      description: "Spacious elevated tent for a unique camping experience",
      maxGroupSize: 1,
      inclusions: [
        "Breakfast included",
        "Access to all festival areas",
        "Pool party access",
        "Morning music session",
        "Elevated camping experience"
      ]
    },
    {
      id: "ofm-dome-tent",
      name: "Dome Tent",
      duration: {
        days: 3,
        nights: 2
      },
      price: 1899,
      description: "Cozy dome tent for the authentic festival camping experience",
      maxGroupSize: 1,
      inclusions: [
        "Breakfast included",
        "Access to all festival areas",
        "Pool party access",
        "Morning music session"
      ]
    }
  ],

  baseInclusions: [
    "Accommodation as per package",
    "Access to pool parties",
    "Access to morning music sessions",
    "Access to after-parties",
    "Basic amenities",
    "Daily breakfast",
  ],

  baseExclusions: [
    "Festival entry pass",
    "Travel to and from Dambuk",
    "Lunch and dinner",
    "Personal expenses",
    "Additional activities",
    "Travel insurance"
  ],

  thingsToCarry: [
    "Valid ID proof",
    "Comfortable clothing",
    "Swimming costume",
    "Sunscreen and hat",
    "Camera",
    "Warm clothes for evening",
    "Basic medicines",
    "Cash for additional expenses"
  ],

  importantNote: "The festival timings and activities may vary. Swimming pool and party access is subject to weather conditions. Accommodation is on a first-come, first-served basis.",
  
  difficulty: "Easy"
};

export const ziroFestival2025: FestivalTour = {
  id: "ziro-festival-2025",
  slug: "ziro-festival-2025",
  type: "Festival",
  festivalName: "Ziro Festival of Music 2025",
  title: "Ziro Festival of Music 2025",
  subtitle: "India's Greatest Eco-Friendly Outdoor Music Festival",
  overview: "Experience India's premier eco-friendly outdoor music festival in the UNESCO Tentative World Heritage Site of Ziro Valley. Founded in 2012, this 4-day celebration features 33+ artists from India and around the world, hosted by the indigenous Apatani tribe with sustainable bamboo infrastructure and zero-waste practices.",
  location: "Ziro Valley, Arunachal Pradesh",
  featured: true,
  upcoming: true,
  trending: true,
  tags: ["festival", "music", "ziro-valley", "eco-friendly", "unesco", "apatani-culture", "indie-music"],

  eventDates: {
    start: "2025-09-25",
    end: "2025-09-28",
    year: 2025
  },

  heroImage: "/images/places/ziro-new/ziro-new-landscape-1.jpeg",
  thumbnail: "/images/places/ziro-new/ziro-new-landscape-1.jpeg",
  gallery: [
    "/images/places/ziro-new/ziro-new-landscape-2.JPG",
    "/images/places/ziro-new/ziro-new-landscape-3.JPG",
    "/images/places/ziro-new/ziro-new-landscape-4.JPG",
    "/images/places/ziro-new/ziro-new-portrait-5.JPG",
    "/images/places/ziro-new/ziro-new-portrait-6.JPG",
    "/images/places/ziro-new/ziro-new-portrait-8.jpg",
    "/images/places/ziro-new/ziro-new-portrait-9.jpg",
    "/images/places/ziro-new/ziro-new-portrait-10.jpg",
    "/images/places/ziro-new/ziro-new-portrait-11.jpg",
    "/images/places/ziro-new/ziro-new-portrait-12.jpg",
    "/images/places/ziro-new/ziro-new-portrait-13.jpeg",
    "/images/places/ziro-new/ziro-new-portrait-14.jpeg",
    "/images/places/ziro-new/ziro-new-portrait-15.JPG",


  ],

  highlights: [
    "33+ artists including Shilpa Rao, Anna Erhard, Soumik Datta & international performers",
    "UNESCO Tentative World Heritage Site - Ziro Valley setting",
    "Sustainable bamboo infrastructure by local Apatani artisans",
    "Zero-waste eco-friendly festival practices",
    "4-day outdoor music celebration with indie, folk & world music",
    "Premium homestays and camping experiences",
    "Cultural workshops and Ziro Literary Festival"
  ],

  culturalHighlights: [
    "Hosted by indigenous Apatani tribe with 1000+ years of heritage",
    "Traditional wet rice cultivation and sustainable farming practices",
    "Local bamboo craftsmanship and artisan workshops",
    "Authentic Apatani cuisine and cultural immersion",
    "Community-based tourism supporting local economy",
    "Traditional Apatani architecture and lifestyle experience"
  ],

  variants: [
    {
      id: "ziro-dome-basic",
      name: "1N Dome Tent (Standard)",
      duration: {
        days: 2,
        nights: 1
      },
      price: 1999,
      description: "Standard dome tent with shared accommodation and campsite access",
      inclusions: [
        "1-night dome tent stay",
        "1 breakfast",
        "Campsite amenities"
      ]
    },
    {
      id: "ziro-dome-premium-1n",
      name: "1N Dome Tent with Platform (Premium)",
      duration: {
        days: 2,
        nights: 1
      },
      price: 2499,
      description: "Premium dome tent with elevated platform for extra comfort",
      inclusions: [
        "1-night premium dome tent stay",
        "1 breakfast",
        "Platform tent",
        "Campsite amenities"
      ]
    },
    {
      id: "ziro-dome-premium-2n",
      name: "2N Dome Tent with Platform (Premium)",
      duration: {
        days: 3,
        nights: 2
      },
      price: 4999,
      description: "Extended stay in premium dome tent with elevated platform",
      inclusions: [
        "2-night premium dome tent stay",
        "2 breakfasts",
        "Platform tent",
        "Campsite amenities"
      ]
    },
    {
      id: "ziro-alpine-2n",
      name: "2N Alpine Tent (Premium)",
      duration: {
        days: 3,
        nights: 2
      },
      price: 5999,
      description: "Spacious alpine tent for premium camping experience",
      inclusions: [
        "2-night alpine tent stay",
        "2 breakfasts",
        "Campsite amenities"
      ]
    },
    {
      id: "ziro-alpine-3n",
      name: "3N Alpine Tent (Premium)",
      duration: {
        days: 4,
        nights: 3
      },
      price: 8999,
      description: "Comfortable alpine tent stay with extended access to Ziro festival",
      inclusions: [
        "3-night alpine tent stay",
        "3 breakfasts",
        "Campsite amenities"
      ]
    },
    {
      id: "ziro-alpine-4n",
      name: "4N Alpine Tent (Premium)",
      duration: {
        days: 5,
        nights: 4
      },
      price: 11999,
      description: "Ultimate full-duration experience in premium alpine tent",
      inclusions: [
        "4-night alpine tent stay",
        "4 breakfasts",
        "Campsite amenities"
      ]
    },
    {
      id: "ziro-all-inclusive-dome",
      name: "All Inclusive Package - Dome Tent",
      duration: {
        days: 5,
        nights: 4
      },
      price: 15699,
      description: "4N/5D complete package with travel, safari, village tour, and dome tent stay",
      inclusions: [
        "Round-trip train tickets (Guwahati-Harmuti/NHLN)",
        "Pickup/drop from Harmuti/NHLN to Ziro",
        "4 nights stay in Dome Tent",
        "5 breakfasts",
        "Ziro safari & village tour",
        "Inner Line Permit"
      ]
    },
    {
      id: "ziro-all-inclusive-alpine",
      name: "All Inclusive Package - Alpine Tent",
      duration: {
        days: 5,
        nights: 4
      },
      price: 17699,
      description: "4N/5D premium package with travel, safari, village tour, and alpine tent stay",
      inclusions: [
        "Round-trip train tickets (Guwahati-Harmuti/NHLN)",
        "Pickup/drop from Harmuti/NHLN to Ziro",
        "4 nights stay in Alpine Tent",
        "5 breakfasts",
        "Ziro safari & village tour",
        "Inner Line Permit"
      ]
    }
  ],

  baseInclusions: [
    "Stay in tent as per selection",
    "Daily breakfast",
    "Access to campsite amenities",
    "After-parties",
    "Bar access",
    "Hygienic washrooms",
    "Charging ports",
    "Parking",
    "BBQ access"
  ],

  baseExclusions: [
    "Festival entry passes",
    "Travel to Guwahati or Harmuti/NHLN",
    "Lunch and dinner",
    "Personal expenses",
    "Travel insurance"
  ],

  thingsToCarry: [
    "Valid ID proof",
    "Warm clothing for evenings",
    "Comfortable footwear",
    "Powerbank and chargers",
    "Camera",
    "Basic medication",
    "Cash for local purchases"
  ],

  importantNote: "Festival passes not included in the package. Train tickets are included only in all-inclusive packages. Accommodation availability is on first-come, first-served basis.",
  
  difficulty: "Easy"
};


export const festivalTours = [
  ziroFestival2025,
  hornbillFestival,
  orangeFestival,
  
] as const;