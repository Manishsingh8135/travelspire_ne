// data/tours/tour-data.ts
import { Tour } from "@/types/tours/tour";





const imageLinks = [
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1435732960391-11053ee5e6b6?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1626761627604-f27d98885f4b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

export const tawangExpedition: Tour = {
  id: "tawang-expedition",
  slug: "tawang-expedition",
  type: "Adventure",
  title: "Explore Tawang",
  subtitle: "5 Days in the Land of Monasteries",
  overview: "Experience the breathtaking beauty of Tawang, from mystical monasteries to snow-capped peaks. Journey through Bomdila pass, witness the majesty of Sela Pass, and immerse yourself in Buddhist culture.",
  duration: "5 Days / 4 Nights",
  location: "Tawang, Arunachal Pradesh",
  startDate: "Available Year Round",
  price: 16499,
  featured: true,

  heroImage: "/images/places/tawang/Tawang_1.PNG",
  thumbnail: "/images/places/tawang/Tawang_1.PNG",
  gallery: [
    "/images/places/tawang/Tawang_9.JPG",
    "/images/places/tawang/Tawang_5.jpg",
    "/images/places/tawang/Tawang_3.JPG",
    "/images/places/tawang/Tawang_4.PNG",
   
    "/images/places/tawang/Tawang_6.PNG"
  ],

  highlights: [
    "Visit the majestic Tawang Monastery",
    "Experience Sela Pass at 13,700 ft",
    "Explore Jaswantgarh War Memorial",
    "Discover Jung Waterfall",
    "Traditional homestay experience",
    "Walk across historic Chakzam Bridge",
    "Visit the world's longest Sela Tunnel"
  ],

  itinerary: [
    {
      title: "Tezpur to Dirang",
      description: "Begin your journey from Tezpur towards Tawang with a scenic drive through Bomdila pass.",
      activities: [
        "Morning departure from Tezpur",
        "Drive through scenic Bomdila pass",
        "Evening arrival at Dirang homestay",
        "Experience hot water springs",
        "Visit apple orchards",
        "Overnight in Dirang"
      ]
    },
    {
      title: "Dirang to Tawang",
      description: "Travel through the magnificent Sela Pass and explore historical sites.",
      activities: [
        "Breakfast and departure for Tawang",
        "Tea break at Sela Pass (13,700 ft)",
        "Visit Jaswantgarh War Memorial",
        "Explore Jung Waterfall",
        "Evening arrival at Tawang homestay"
      ]
    },
    {
      title: "Tawang Exploration",
      description: "Full day exploring the wonders of Tawang.",
      activities: [
        "Morning walk in the hills",
        "Visit Chakzam Bridge",
        "Explore Sela Tunnel",
        "Evening bonfire and music",
        "Last night celebration in Tawang"
      ]
    },
    {
      title: "Tawang to Dirang",
      description: "Return journey with market exploration.",
      activities: [
        "Morning stroll in Tawang market",
        "Souvenir shopping",
        "Visit Sangti Valley",
        "River walks and scenic hikes",
        "Peaceful fishing spots experience",
        "Final night in Dirang"
      ]
    }
  ],

  route: {
    points: [
      [27.0126, 92.5943], // Tezpur
      [27.3410, 92.2463], // Dirang
      [27.5859, 91.8594]  // Tawang
    ],
    stops: [
      {
        name: "Tezpur",
        location: [27.0126, 92.5943],
        description: "Starting point of our journey"
      },
      {
        name: "Dirang",
        location: [27.3410, 92.2463],
        description: "Beautiful valley known for hot springs and apple orchards"
      },
      {
        name: "Tawang",
        location: [27.5859, 91.8594],
        description: "Final destination with monastery and stunning landscapes"
      }
    ]
  },

  inclusions: [
    "Daily breakfast",
    "Homestay accommodations",
    "Travelling expenses",
    "Inner line permits & passes",
    "Tour guide",
    "Sightseeing activities"
  ],

  exclusions: [
    "Lunch & Dinner",
    "Personal expenses",
    "Any personal expenses",
    "Anything not mentioned in inclusions"
  ],

  importantNote: "To confirm your trip please pay 50% of the total package cost i.e., ₹16499/- per person",
  
  thingsToCarry: [
    "Warm clothes",
    "Comfortable walking shoes",
    "Valid ID proof",
    "Camera",
    "Personal medications"
  ],

  maxGroupSize: 12,
  difficulty: "Moderate",
  altitude: 13700,
  bestTimeToVisit: ["October", "November", "March", "April"]
};



export const dongValleyExpedition: Tour = {
  id: "dong-valley-expedition",
  slug: "dong-valley-expedition",
  type: "Adventure",
  title: "Dong Valley Expedition",
  subtitle: "The Land of India's First Sunlight",
  overview: "Journey to the easternmost point of India where the sun rises first. Experience the untouched beauty of Dong Valley with its pristine landscapes and rich cultural heritage.",
  duration: "4 Days / 3 Nights",
  location: "Dong Valley, Arunachal Pradesh",
  startDate: "Available Year Round",
  price: 9999,
  featured: false,

  heroImage: "/images/places/dong/Dong_1.JPG",
  thumbnail: "/images/places/dong/Dong_1.JPG",
  gallery: [
    "/images/places/dong/Dong_2.jpg",
    "/images/places/dong/Dong_3.jpg",
    "/images/places/dong/Dong_4.jpg",
    "/images/places/dong/Dong_5.jpg"
  ],

  highlights: [
    "Witness India's first sunrise at Dong Valley",
    "Visit the Golden Pagoda (Kongmu Kham)",
    "Explore Kibithu & Kaho villages",
    "Cross the historic Dong suspension bridge",
    "Experience Tilam Hotspring",
    "Visit Parshuram Kund"
  ],

  itinerary: [
    {
      title: "Dibrugarh to Walong",
      description: "Long scenic drive to Walong through beautiful landscapes.",
      activities: [
        "Morning departure from Dibrugarh",
        "Breakfast at Dirak gate",
        "Visit Golden Pagoda (Kongmu Kham)",
        "Lunch break at Hayuliang",
        "Evening arrival at Walong"
      ]
    },
    {
      title: "Walong Exploration",
      description: "Explore the easternmost regions of India.",
      activities: [
        "Early morning start",
        "Explore Kaho & Kibithu",
        "Visit Dong suspension footbridge",
        "Early return for next day's sunrise"
      ]
    },
    {
      title: "Dong Valley Trek",
      description: "Trek to witness India's first sunrise.",
      activities: [
        "Trek to Dong Valley",
        "Visit Helmet Top",
        "Explore hidden gems & war memorial",
        "Lunch at Walong",
        "Evening at Tilam Hotspring"
      ]
    },
    {
      title: "Return to Dibrugarh",
      description: "Return journey with cultural stops.",
      activities: [
        "Morning departure from Walong",
        "Drive to Dibrugarh",
        "Lunch at Hayuliang",
        "Optional visit to Parshuram Kund",
        "Evening arrival in Dibrugarh"
      ]
    }
  ],

  route: {
    points: [
      [27.4728, 95.0170], // Dibrugarh
      [27.8488, 96.3099], // Hayuliang
      [28.1500, 97.1333]  // Dong Valley
    ],
    stops: [
      {
        name: "Dibrugarh",
        location: [27.4728, 95.0170],
        description: "Starting point of the journey"
      },
      {
        name: "Hayuliang",
        location: [27.8488, 96.3099],
        description: "Major stopover point"
      },
      {
        name: "Dong Valley",
        location: [28.1500, 97.1333],
        description: "Easternmost point of India"
      }
    ]
  },

  inclusions: [
    "Stay with necessary accommodations",
    "Breakfast",
    "Travel expenses",
    "Guide charges",
    "Inner line permit"
  ],

  exclusions: [
    "Lunch & Dinner",
    "Railway & Airway tickets",
    "Tourist spots tickets"
  ],

  importantNote: "To confirm this trip please pay 50% of the total package cost i.e., ₹9999/- per person",

  thingsToCarry: [
    "2 pairs of shoes (1 for trek)",
    "Warm clothes",
    "Stretchable/breathable bottoms for treks",
    "Mini flask for warm water",
    "Small backpack for essentials"
  ],

  maxGroupSize: 10,
  difficulty: "Moderate",
  altitude: 2800,
  bestTimeToVisit: ["October", "November", "March", "April"]
};


export const aniniExpedition: Tour = {
  id: "anini-expedition",
  slug: "anini-expedition",
  type: "Adventure",
  title: "Anini Dibang Valley",
  subtitle: "3 Days in the Heart of Dibang Valley",
  overview: "Experience the untouched beauty of Dibang Valley, featuring stunning waterfalls, the scenic Mayodia Pass, and pristine landscapes. Explore Acheso, witness the majestic Mawu ando & Mathu waterfalls, and immerse yourself in the natural splendor of Anini.",
  duration: "3 Days / 2 Nights",
  location: "Anini, Dibang Valley, Arunachal Pradesh",
  startDate: "Available Year Round",
  price: 10999,
  featured: false,

  // We'll need proper images later, using placeholders for now
  heroImage: "/images/places/anini/Anini_1.JPG", // Replace with actual Anini images
  thumbnail: "/images/places/anini/Anini_1.JPG",
  gallery: [
    "/images/places/anini/Anini_9.JPG",
    "/images/places/anini/Anini_10.JPG",
    "/images/places/anini/Anini_4.JPG",
    "/images/places/anini/Anini_6.jpg",
    "/images/places/anini/Anini_8.jpg"
  ],

  highlights: [
    "Explore Dibang Valley & Acheso",
    "Visit Mawu ando & Mathu waterfall",
    "Experience Chigu camp & Dree-afra",
    "Journey through Mayodia Pass",
    "Scenic 480km journey from Dibrugarh",
  ],

  itinerary: [
    {
      title: "Dibrugarh to Anini",
      description: "Early morning start for a scenic 480km journey to Anini Valley.",
      activities: [
        "04:00-05:00 Pickup from Dibrugarh",
        "Journey to Anini (480kms)",
        "Lunch stoppage en route",
        "Evening arrival and overnight stay at Anini Valley"
      ]
    },
    {
      title: "Anini Exploration",
      description: "Full day exploring the wonders of Dibang Valley.",
      activities: [
        "Good morning from Anini",
        "Explore Dibang Valley & Acheso",
        "Visit Mawu ando & Mathu waterfall",
        "Experience Chigu camp & Dree-afra",
        "Overnight stay in Anini"
      ]
    },
    {
      title: "Return to Dibrugarh",
      description: "Return journey with scenic stops.",
      activities: [
        "Morning departure from Anini",
        "Stoppage at Mayodia Pass",
        "Journey back to Dibrugarh",
        "Evening arrival in Dibrugarh"
      ]
    }
  ],

  route: {
    points: [
      [27.4728, 95.0170], // Dibrugarh
      [28.8427, 95.8997], // Anini
    ],
    stops: [
      {
        name: "Dibrugarh",
        location: [27.4728, 95.0170],
        description: "Starting point of the journey"
      },
      {
        name: "Anini",
        location: [28.8427, 95.8997],
        description: "Main destination in Dibang Valley"
      }
    ]
  },

  inclusions: [
    "Breakfast",
    "Vehicle charges",
    "Fuel charges and Driver",
    "Stay with necessary accommodation",
    "Guide charges",
    "Inner line permit"
  ],

  exclusions: [
    "Lunch & Dinner",
    "Extra activities like Rafting",
    "Tourist Spot tickets",
    "Railway & Airway tickets"
  ],

  importantNote: "To confirm this trip please pay 50% of the total package cost i.e., ₹10999/- per person",

  thingsToCarry: [
    "Comfortable walking shoes",
    "Warm clothes",
    "Camera",
    "Personal medications",
    "Valid ID proof"
  ],

  maxGroupSize: 10, // Setting a reasonable number since not specified
  difficulty: "Moderate",
  altitude: 2000, // Approximate, should be verified
  bestTimeToVisit: ["October", "November", "March", "April"] // Standard Northeast season
};


export const regularTours = [
  tawangExpedition,
  dongValleyExpedition,
  aniniExpedition
];




