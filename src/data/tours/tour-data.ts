// data/tours/tour-data.ts
import { Tour } from "@/types/tours/tour";


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
    "/images/places/anini/Anini_9.jpg",
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

export const dambukAniniOfamTour: Tour = {
  id: "dambuk-anini-ofam",
  slug: "dambuk-anini-ofam",
  type: "Adventure",
  title: "OFAM Tour Package",
  subtitle: "Lets explore DAMBUK & ANINI",
  overview: "Experience the vibrant Orange Festival of Arunachal Meshes (OFAM) in Dambuk combined with the pristine landscapes of Anini. Journey through orange orchards, witness the Mawu ando & Mathu waterfalls, and explore the remote Dibang Valley with its stunning Mayodia Pass.",
  duration: "4 Days / 3 Nights",
  location: "Dambuk & Anini, Arunachal Pradesh",
  startDate: "December 2024", // During OFAM festival
  price: 18500,
  featured: true,

  heroImage: "/images/places/dambuk/Dambuk_4.jpg",
  thumbnail: "/images/places/dambuk/Dambuk_4.jpg",
  gallery: [
    "/images/places/dambuk/Dambuk_2.jpg",
    "/images/places/anini/Anini_1.jpg",
    "/images/places/dambuk/Dambuk_3.jpg",
    "/images/places/anini/Anini_2.jpg"
  ],

  highlights: [
    "Dambuk OFAM & Sikang Boggo",
    "Mayodia Pass exploration",
    "Chigu camp & Dree-afra experience",
    "Mawu ando & Mathu waterfall visit",
    "Dibang Valley & Acheso exploration",
    "Traditional homestay and camping experience"
  ],

  itinerary: [
    {
      title: "Dibrugarh to Dambuk",
      description: "Begin your journey with the Orange Festival experience in Dambuk.",
      activities: [
        "Pickup from Dibrugarh",
        "Lunch stoppage at Shantipur gate",
        "Enjoy the Dambuk OFAM festival",
        "Overnight at Dambuk Campsite"
      ]
    },
    {
      title: "Dambuk to Anini",
      description: "Journey through scenic mountain roads to reach Anini.",
      activities: [
        "Morning departure from Dambuk",
        "Explore Dibang Valley & Acheso",
        "Stoppage at Mayodia Pass",
        "Night stay at Anini homestay"
      ]
    },
    {
      title: "Anini Exploration",
      description: "Full day exploring the wonders of Anini region.",
      activities: [
        "Morning start in Anini",
        "Visit Mawu ando & Mathu waterfall",
        "Experience Chigu camp & Dree-afra",
        "Overnight at Dree-afra/Anini homestay"
      ]
    },
    {
      title: "Return to Dibrugarh",
      description: "Return journey with scenic stops.",
      activities: [
        "Morning departure from Anini",
        "Lunch stoppage at Roing",
        "Evening arrival in Dibrugarh"
      ]
    }
  ],

  route: {
    points: [
      [27.4728, 95.0170], // Dibrugarh
      [28.3582, 95.3665], // Dambuk
      [28.8427, 95.8997]  // Anini
    ],
    stops: [
      {
        name: "Dibrugarh",
        location: [27.4728, 95.0170],
        description: "Starting point of the journey"
      },
      {
        name: "Dambuk",
        location: [28.3582, 95.3665],
        description: "Orange Festival location and first stop"
      },
      {
        name: "Anini",
        location: [28.8427, 95.8997],
        description: "Final destination in Dibang Valley"
      }
    ]
  },

  inclusions: [
    "Homestay & Camping accommodations",
    "Healthy Breakfast",
    "Transportation cost",
    "Tour Guide",
    "Inner line permits"
  ],

  exclusions: [
    "Lunch & Dinner",
    "Railway & Airway tickets",
    "Tourist spot tickets",
    "Personal expenses"
  ],

  importantNote: "To confirm this trip please pay 50% of the total package cost. Minimum 4 persons required in a group.",

  thingsToCarry: [
    "Warm clothes",
    "Comfortable trekking shoes",
    "Valid ID proof",
    "Camera",
    "Personal medications",
    "Light backpack for day trips"
  ],

  maxGroupSize: 12,
  difficulty: "Moderate",
  altitude: 2500, // Approximate altitude for Anini area
  bestTimeToVisit: ["December"] // During OFAM festival
};

export const dambukGoldenPagodaTour: Tour = {
  id: "dambuk-golden-pagoda-ofam",
  slug: "dambuk-golden-pagoda-ofam",
  type: "Adventure",
  title: "OFAM Tour Package",
  subtitle: "Lets explore DAMBUK & GOLDEN PAGODA",
  overview: "Experience the vibrant Orange Festival of Arunachal Meshes (OFAM) in Dambuk combined with a spiritual journey to the majestic Golden Pagoda in Namsai. Enjoy riverside camping, explore sacred Buddhist sites, and immerse yourself in the cultural heritage of Arunachal Pradesh.",
  duration: "3 Days / 2 Nights",
  location: "Dambuk & Namsai, Arunachal Pradesh",
  startDate: "December 2024", // During OFAM festival
  price: 12999,
  featured: true,

  heroImage: "/images/places/dambuk/Dambuk_5.jpg",
  thumbnail: "/images/places/dambuk/Dambuk_5.jpg",
  gallery: [
    "/images/places/dambuk/Dambuk_2.jpg",
    "/images/places/dambuk/Dambuk_3.jpg",
    "/images/places/dambuk/Dambuk_4.jpg",
    "/images/places/dambuk/Dambuk_5.jpg"
  ],

  highlights: [
    "Dambuk OFAM & Sikang Boggo",
    "Golden Pagoda exploration",
    "Parsuram Kund visit",
    "River resort experience",
    "Buddhist cultural immersion",
    "Orange orchards and local cuisine"
  ],

  itinerary: [
    {
      title: "Dibrugarh to Dambuk",
      description: "Begin your journey with the Orange Festival experience in Dambuk.",
      activities: [
        "Pickup from Dibrugarh",
        "Lunch stoppage at Shantipur gate",
        "Enjoy the Dambuk OFAM",
        "Overnight at Dambuk Campsite"
      ]
    },
    {
      title: "Dambuk to Namsai",
      description: "Explore Namsai and its spiritual landmarks.",
      activities: [
        "Good morning from Dambuk",
        "Explore Namsai",
        "Lunch & Break time at resort",
        "Night stay at Namsai resort"
      ]
    },
    {
      title: "Return to Dibrugarh",
      description: "Visit final attractions before return.",
      activities: [
        "Morning visit to Golden Pagoda",
        "Visit Parsuram Kund",
        "Lunch near Namsai",
        "Evening return to Dibrugarh"
      ]
    }
  ],

  route: {
    points: [
      [27.4728, 95.0170], // Dibrugarh
      [28.3582, 95.3665], // Dambuk
      [27.6667, 95.8667]  // Namsai
    ],
    stops: [
      {
        name: "Dibrugarh",
        location: [27.4728, 95.0170],
        description: "Starting point of the journey"
      },
      {
        name: "Dambuk",
        location: [28.3582, 95.3665],
        description: "Orange Festival location"
      },
      {
        name: "Namsai",
        location: [27.6667, 95.8667],
        description: "Golden Pagoda and cultural sites"
      }
    ]
  },

  inclusions: [
    "Homestay & Camping accommodations",
    "Healthy Breakfast",
    "Transportation cost",
    "Tour Guide",
    "Inner line permits"
  ],

  exclusions: [
    "Lunch & Dinner",
    "Railway & Airway tickets",
    "Tourist spot tickets",
    "Personal expenses"
  ],

  importantNote: "To confirm this trip please pay 50% of the total package cost. Minimum 4 persons required in a group.",

  thingsToCarry: [
    "Comfortable walking shoes",
    "Modest clothing for temple visits",
    "Camera",
    "Personal medications",
    "Valid ID proof",
    "Light jacket or shawl"
  ],

  maxGroupSize: 12,
  difficulty: "Easy",
  altitude: 500, // Approximate for Namsai region
  bestTimeToVisit: ["December"] // During OFAM festival
};

export const dambukDongValleyTour: Tour = {
  id: "dambuk-dong-valley-ofam",
  slug: "dambuk-dong-valley-ofam",
  type: "Adventure",
  title: "OFAM Tour Package",
  subtitle: "Lets explore DAMBUK & DONG VALLEY",
  overview: "Experience the vibrant Orange Festival of Arunachal Meshes (OFAM) in Dambuk combined with an expedition to India's easternmost valley. Journey from the orange orchards of Dambuk to the historic Dong Valley, enjoying hot springs, trek experiences, and visiting India's easternmost villages.",
  duration: "4 Days / 3 Nights",
  location: "Dambuk & Dong Valley, Arunachal Pradesh",
  startDate: "December 2024", // During OFAM festival
  price: 18500,
  featured: true,

  heroImage: "/images/places/dong/Dong_2.jpg",
  thumbnail: "/images/places/dong/Dong_3.jpg",
  gallery: [
    "/images/places/dambuk/Dambuk_2.jpg",
    "/images/places/dong/Dong_1.jpg",
    "/images/places/dong/Dong_3.jpg",
    "/images/places/dong/Dong_5.jpg"
  ],

  highlights: [
    "Dambuk OFAM & Sikang Boggo",
    "Tilam Hotspring experience",
    "War memorial visit",
    "Dong Valley trek",
    "Explore Kaho & Kibithoo villages",
    "India's easternmost point"
  ],

  itinerary: [
    {
      title: "Dibrugarh to Dambuk",
      description: "Begin your journey with OFAM festival experience.",
      activities: [
        "Pickup from Dibrugarh",
        "Lunch stoppage at Shantipur gate",
        "Enjoy the Dambuk OFAM",
        "Overnight at Dambuk Campsite"
      ]
    },
    {
      title: "Dambuk to Walong",
      description: "Journey to Walong with cultural stops.",
      activities: [
        "Morning departure from Dambuk",
        "Explore Walong region",
        "Stoppage at Parsuram Kund",
        "Lunch at Hayuliang",
        "Evening rest at Tilam Hotspring"
      ]
    },
    {
      title: "Dong Valley Exploration",
      description: "Trek to India's easternmost valley.",
      activities: [
        "Morning start from Tilam Hotspring",
        "DONG VALLEY trek",
        "Visit India's most eastern village KAHO",
        "Explore KIBITHOO & War memorial",
        "Lunch at Walong Cafe",
        "Night at TILAM HOTSPRING"
      ]
    },
    {
      title: "Return to Dibrugarh",
      description: "Return journey with scenic stops.",
      activities: [
        "Morning departure from Walong",
        "Lunch stoppage at Hayuliang",
        "Evening arrival in Dibrugarh"
      ]
    }
  ],

  route: {
    points: [
      [27.4728, 95.0170], // Dibrugarh
      [28.3582, 95.3665], // Dambuk
      [28.1500, 97.1333]  // Dong Valley
    ],
    stops: [
      {
        name: "Dibrugarh",
        location: [27.4728, 95.0170],
        description: "Starting point of the journey"
      },
      {
        name: "Dambuk",
        location: [28.3582, 95.3665],
        description: "Orange Festival location"
      },
      {
        name: "Dong Valley",
        location: [28.1500, 97.1333],
        description: "India's easternmost valley"
      }
    ]
  },

  inclusions: [
    "Homestay & Camping accommodations",
    "Healthy Breakfast",
    "Transportation cost",
    "Tour Guide",
    "Inner line permits"
  ],

  exclusions: [
    "Lunch & Dinner",
    "Railway & Airway tickets",
    "Tourist spot tickets",
    "Personal expenses"
  ],

  importantNote: "To confirm this trip please pay 50% of the total package cost. Minimum 4 persons required in a group.",

  thingsToCarry: [
    "Warm clothes",
    "Trekking/comfortable shoes",
    "Valid ID proof",
    "Camera",
    "Personal medications",
    "Mini flask for water"
  ],

  maxGroupSize: 12,
  difficulty: "Moderate",
  altitude: 3500, // Approximate for Dong Valley region
  bestTimeToVisit: ["December"] // During OFAM festival
};

export const regularTours = [
  tawangExpedition,
  dongValleyExpedition,
  aniniExpedition,
  dambukAniniOfamTour,
  dambukGoldenPagodaTour,
  dambukDongValleyTour
];




