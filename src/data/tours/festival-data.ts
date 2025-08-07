// data/tours/festival-data.ts
import { FestivalTour } from "@/types/tours/tour";

export const hornbillFestival: FestivalTour = {
  id: "hornbill-festival-2024",
  slug: "hornbill-festival-2024",
  type: "Festival",
  festivalName: "Hornbill Festival",
  title: "Hornbill Festival 2024",
  subtitle: "The biggest festival of Nagaland",
  overview: "Experience the cultural extravaganza of Northeast India at the Hornbill Festival, combined with the breathtaking beauty of Dzukou Valley. This festival celebrates the rich heritage of Nagaland's 16 major tribes with traditional dances, music, local cuisine, and handicrafts.",
  location: "Kisama Heritage Village, Nagaland",
  featured: true,
  upcoming: true,
  trending: true,
  tags: ["festival", "cultural", "nagaland", "tribal-heritage", "dzukou-valley"],

  eventDates: {
    start: "2024-12-01",
    end: "2024-12-10",
    year: 2024
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
  id: "orange-festival-2024",
  slug: "orange-festival-2024",
  type: "Festival",
  festivalName: "OFAM (DAMBUK) 2024 ",
  title: "OFAM (DAMBUK) 2024",
  subtitle: "Where Adventure Meets Music in the Land of Oranges",
  overview: "Experience the unique blend of music, adventure, and nature at the Orange Festival of Adventure & Music in Dambuk. Set against the backdrop of orange orchards and mountains, this festival offers an unforgettable mix of live performances, adventure activities, and local culture.",
  location: "Dambuk, Arunachal Pradesh",
  featured: true,

  eventDates: {
    start: "2024-12-13", 
    end: "2024-12-15",
    year: 2024
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

export const festivalTours = [
  hornbillFestival,
  orangeFestival
] as const;