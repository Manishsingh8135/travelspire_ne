// data/tours/tour-data.ts
import { Tour } from "@/types/tours/tour";
import { mechukaDongAniniTour } from "@/data/expeditions/mechuka-dong-anini";

export const tawangExpedition: Tour = {
  id: "tawang-expedition",
  slug: "tawang-expedition",
  type: "Adventure",
  title: "Explore Tawang",
  subtitle: "5 Days in the Land of Monasteries",
  overview:
    "Experience the breathtaking beauty of Tawang, from mystical monasteries to snow-capped peaks. Journey through Bomdila pass, witness the majesty of Sela Pass, and immerse yourself in Buddhist culture.",
  duration: "5 Days / 4 Nights",
  location: "Tawang, Arunachal Pradesh",
  startDate: "Available Year Round",
  price: 16499,
  featured: true,
  trending: true,
  upcoming: false,
  tags: ["monastery", "buddhist-culture", "mountain-pass", "premium"],

  heroImage: "/images/places/tawang/Tawang_1.PNG",
  thumbnail: "/images/places/tawang/Tawang_1.PNG",
  gallery: [
    "/images/places/tawang/Tawang_9.JPG",
    "/images/places/tawang/Tawang_5.jpg",
    "/images/places/tawang/Tawang_3.JPG",
    "/images/places/tawang/Tawang_4.PNG",

    "/images/places/tawang/Tawang_6.PNG",
  ],

  highlights: [
    "Visit the majestic Tawang Monastery",
    "Experience Sela Pass at 13,700 ft",
    "Explore Jaswantgarh War Memorial",
    "Discover Jung Waterfall",
    "Traditional homestay experience",
    "Walk across historic Chakzam Bridge",
    "Visit the world's longest Sela Tunnel",
  ],

  itinerary: [
    {
      title: "Tezpur to Dirang",
      description:
        "Begin your journey from Tezpur towards Tawang with a scenic drive through Bomdila pass.",
      activities: [
        "Morning departure from Tezpur",
        "Drive through scenic Bomdila pass",
        "Evening arrival at Dirang homestay",
        "Experience hot water springs",
        "Visit apple orchards",
        "Overnight in Dirang",
      ],
    },
    {
      title: "Dirang to Tawang",
      description:
        "Travel through the magnificent Sela Pass and explore historical sites.",
      activities: [
        "Breakfast and departure for Tawang",
        "Tea break at Sela Pass (13,700 ft)",
        "Visit Jaswantgarh War Memorial",
        "Explore Jung Waterfall",
        "Evening arrival at Tawang homestay",
      ],
    },
    {
      title: "Tawang Exploration",
      description: "Full day exploring the wonders of Tawang.",
      activities: [
        "Morning walk in the hills",
        "Visit Chakzam Bridge",
        "Explore Sela Tunnel",
        "Evening bonfire and music",
        "Last night celebration in Tawang",
      ],
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
        "Final night in Dirang",
      ],
    },
  ],

  route: {
    points: [
      [27.0126, 92.5943], // Tezpur
      [27.341, 92.2463], // Dirang
      [27.5859, 91.8594], // Tawang
    ],
    stops: [
      {
        name: "Tezpur",
        location: [27.0126, 92.5943],
        description: "Starting point of our journey",
      },
      {
        name: "Dirang",
        location: [27.341, 92.2463],
        description:
          "Beautiful valley known for hot springs and apple orchards",
      },
      {
        name: "Tawang",
        location: [27.5859, 91.8594],
        description: "Final destination with monastery and stunning landscapes",
      },
    ],
  },

  inclusions: [
    "Daily breakfast",
    "Homestay accommodations",
    "Travelling expenses",
    "Inner line permits & passes",
    "Tour guide",
    "Sightseeing activities",
  ],

  exclusions: [
    "Lunch & Dinner",
    "Personal expenses",
    "Any personal expenses",
    "Anything not mentioned in inclusions",
  ],

  importantNote: "The complete package amount is paid securely at booking.",

  thingsToCarry: [
    "Warm clothes",
    "Comfortable walking shoes",
    "Valid ID proof",
    "Camera",
    "Personal medications",
  ],

  maxGroupSize: 12,
  difficulty: "Moderate",
  altitude: 13700,
  bestTimeToVisit: ["October", "November", "March", "April"],
};

export const dongValleyExpedition: Tour = {
  id: "dong-valley-expedition",
  slug: "dong-valley-expedition",
  type: "Adventure",
  title: "Dong Valley Expedition",
  subtitle: "The Land of India's First Sunlight",
  overview:
    "Journey to the easternmost point of India where the sun rises first. Experience the untouched beauty of Dong Valley with its pristine landscapes and rich cultural heritage.",
  duration: "4 Days / 3 Nights",
  location: "Dong Valley, Arunachal Pradesh",
  startDate: "Available Year Round",
  price: 13499,
  upcoming: true,
  trending: false,
  tags: [
    "sunrise",
    "easternmost-india",
    "pristine-nature",
    "cultural-heritage",
  ],
  featured: false,

  heroImage: "/images/places/dong-new/dong-new-landscape-8.jpg",
  thumbnail: "/images/places/dong-new/dong-new-landscape-8.jpg",
  gallery: [
    // "/images/places/dong/Dong_1.JPG",
    "/images/places/dong/Dong_2.jpg",
    "/images/places/dong/Dong_3.jpg",
    "/images/places/dong/Dong_4.jpg",
    "/images/places/dong/Dong_5.jpg",
    "/images/places/dong-new/dong-new-portrait-1.jpg",
    "/images/places/dong-new/dong-new-portrait-2.jpg",
    "/images/places/dong-new/dong-new-portrait-3.jpg",
    "/images/places/dong-new/dong-new-portrait-4.jpg",
    "/images/places/dong-new/dong-new-portrait-6.jpg",
    "/images/places/dong-new/dong-new-portrait-7.jpg",
    "/images/places/dong-new/dong-new-portrait-9.jpg",
    "/images/places/dong-new/dong-new-portrait-10.jpg",
  ],

  highlights: [
    "Witness India's first sunrise at Dong Valley",
    "Visit the Golden Pagoda (Kongmu Kham)",
    "Explore Kibithu & Kaho villages",
    "Cross the historic Dong suspension bridge",
    "Experience Tilam Hotspring",
    "Visit Parshuram Kund",
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
        "Evening arrival at Walong",
      ],
    },
    {
      title: "Walong Exploration",
      description: "Explore the easternmost regions of India.",
      activities: [
        "Early morning start",
        "Explore Kaho & Kibithu",
        "Visit Dong suspension footbridge",
        "Early return for next day's sunrise",
      ],
    },
    {
      title: "Dong Valley Trek",
      description: "Trek to witness India's first sunrise.",
      activities: [
        "Trek to Dong Valley",
        "Visit Helmet Top",
        "Explore hidden gems & war memorial",
        "Lunch at Walong",
        "Evening at Tilam Hotspring",
      ],
    },
    {
      title: "Return to Dibrugarh",
      description: "Return journey with cultural stops.",
      activities: [
        "Morning departure from Walong",
        "Drive to Dibrugarh",
        "Lunch at Hayuliang",
        "Optional visit to Parshuram Kund",
        "Evening arrival in Dibrugarh",
      ],
    },
  ],

  route: {
    points: [
      [27.4728, 95.017], // Dibrugarh
      [27.8488, 96.3099], // Hayuliang
      [28.15, 97.1333], // Dong Valley
    ],
    stops: [
      {
        name: "Dibrugarh",
        location: [27.4728, 95.017],
        description: "Starting point of the journey",
      },
      {
        name: "Hayuliang",
        location: [27.8488, 96.3099],
        description: "Major stopover point",
      },
      {
        name: "Dong Valley",
        location: [28.15, 97.1333],
        description: "Easternmost point of India",
      },
    ],
  },

  inclusions: [
    "Stay with necessary accommodations",
    "Breakfast",
    "Travel expenses",
    "Guide charges",
    "Inner line permit",
  ],

  exclusions: [
    "Lunch & Dinner",
    "Railway & Airway tickets",
    "Tourist spots tickets",
  ],

  importantNote: "The complete package amount is paid securely at booking.",

  thingsToCarry: [
    "2 pairs of shoes (1 for trek)",
    "Warm clothes",
    "Stretchable/breathable bottoms for treks",
    "Mini flask for warm water",
    "Small backpack for essentials",
  ],

  maxGroupSize: 10,
  difficulty: "Moderate",
  altitude: 2800,
  bestTimeToVisit: ["October", "November", "March", "April"],
};

export const aniniExpedition: Tour = {
  id: "anini-expedition",
  slug: "anini-expedition",
  type: "Adventure",
  title: "Anini Dibang Valley",
  subtitle: "3 Days in the Heart of Dibang Valley",
  overview:
    "Experience the untouched beauty of Dibang Valley, featuring stunning waterfalls, the scenic Mayodia Pass, and pristine landscapes. Explore Acheso, witness the majestic Mawu ando & Mathu waterfalls, and immerse yourself in the natural splendor of Anini.",
  duration: "3 Days / 2 Nights",
  location: "Anini, Dibang Valley, Arunachal Pradesh",
  startDate: "Available Year Round",
  price: 12499,
  featured: false,

  // We'll need proper images later, using placeholders for now
  heroImage: "/images/places/anini-new/anini-new-landscape-11.jpeg", // Replace with actual Anini images
  thumbnail: "/images/places/anini-new/anini-new-landscape-11.jpeg",
  gallery: [
    "/images/places/anini-new/anini-new-portrait-1.jpg",
    "/images/places/anini-new/anini-new-portrait-2.jpg",
    "/images/places/anini-new/anini-new-portrait-3.jpg",
    "/images/places/anini-new/anini-new-portrait-4.jpg",
    "/images/places/anini-new/anini-new-portrait-5.jpg",
    "/images/places/anini-new/anini-new-portrait-6.jpg",
    "/images/places/anini-new/anini-new-portrait-7.jpg",
    "/images/places/anini-new/anini-new-portrait-8.jpg",
    "/images/places/anini-new/anini-new-portrait-9.jpg",
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
      description:
        "Early morning start for a scenic 480km journey to Anini Valley.",
      activities: [
        "04:00-05:00 Pickup from Dibrugarh",
        "Journey to Anini (480kms)",
        "Lunch stoppage en route",
        "Evening arrival and overnight stay at Anini Valley",
      ],
    },
    {
      title: "Anini Exploration",
      description: "Full day exploring the wonders of Dibang Valley.",
      activities: [
        "Good morning from Anini",
        "Explore Dibang Valley & Acheso",
        "Visit Mawu ando & Mathu waterfall",
        "Experience Chigu camp & Dree-afra",
        "Overnight stay in Anini",
      ],
    },
    {
      title: "Return to Dibrugarh",
      description: "Return journey with scenic stops.",
      activities: [
        "Morning departure from Anini",
        "Stoppage at Mayodia Pass",
        "Journey back to Dibrugarh",
        "Evening arrival in Dibrugarh",
      ],
    },
  ],

  route: {
    points: [
      [27.4728, 95.017], // Dibrugarh
      [28.8427, 95.8997], // Anini
    ],
    stops: [
      {
        name: "Dibrugarh",
        location: [27.4728, 95.017],
        description: "Starting point of the journey",
      },
      {
        name: "Anini",
        location: [28.8427, 95.8997],
        description: "Main destination in Dibang Valley",
      },
    ],
  },

  inclusions: [
    "Breakfast",
    "Vehicle charges",
    "Fuel charges and Driver",
    "Stay with necessary accommodation",
    "Guide charges",
    "Inner line permit",
  ],

  exclusions: [
    "Lunch & Dinner",
    "Extra activities like Rafting",
    "Tourist Spot tickets",
    "Railway & Airway tickets",
  ],

  importantNote: "The complete package amount is paid securely at booking.",

  thingsToCarry: [
    "Comfortable walking shoes",
    "Warm clothes",
    "Camera",
    "Personal medications",
    "Valid ID proof",
  ],

  maxGroupSize: 10, // Setting a reasonable number since not specified
  difficulty: "Moderate",
  altitude: 2000, // Approximate, should be verified
  bestTimeToVisit: ["October", "November", "March", "April"], // Standard Northeast season
};

export const dambukAniniOfamTour: Tour = {
  id: "dambuk-anini-ofam",
  slug: "dambuk-anini-ofam",
  type: "Adventure",
  title: "Dambuk to Anini Tour",
  subtitle: "Lets explore DAMBUK & ANINI",
  overview:
    "Experience the vibrant Orange Festival of Arunachal Meshes (OFAM) in Dambuk combined with the pristine landscapes of Anini. Journey through orange orchards, witness the Mawu ando & Mathu waterfalls, and explore the remote Dibang Valley with its stunning Mayodia Pass.",
  duration: "4 Days / 3 Nights",
  location: "Dambuk & Anini, Arunachal Pradesh",
  startDate: "December 2026", // During OFAM festival
  price: 18500,
  featured: false,

  heroImage: "/images/places/dambuk/Dambuk_4.JPG",
  thumbnail: "/images/places/dambuk/Dambuk_4.JPG",
  gallery: [
    "/images/places/dambuk/Dambuk_2.jpg",
    "/images/places/anini/Anini_1.JPG",
    "/images/places/dambuk/Dambuk_3.jpg",
    "/images/places/anini/Anini_2.JPG",
  ],

  highlights: [
    "Dambuk OFAM & Sikang Boggo",
    "Mayodia Pass exploration",
    "Chigu camp & Dree-afra experience",
    "Mawu ando & Mathu waterfall visit",
    "Dibang Valley & Acheso exploration",
    "Traditional homestay and camping experience",
  ],

  itinerary: [
    {
      title: "Dibrugarh to Dambuk",
      description:
        "Begin your journey with the Orange Festival experience in Dambuk.",
      activities: [
        "Pickup from Dibrugarh",
        "Lunch stoppage at Shantipur gate",
        "Enjoy the Dambuk OFAM festival",
        "Overnight at Dambuk Campsite",
      ],
    },
    {
      title: "Dambuk to Anini",
      description: "Journey through scenic mountain roads to reach Anini.",
      activities: [
        "Morning departure from Dambuk",
        "Explore Dibang Valley & Acheso",
        "Stoppage at Mayodia Pass",
        "Night stay at Anini homestay",
      ],
    },
    {
      title: "Anini Exploration",
      description: "Full day exploring the wonders of Anini region.",
      activities: [
        "Morning start in Anini",
        "Visit Mawu ando & Mathu waterfall",
        "Experience Chigu camp & Dree-afra",
        "Overnight at Dree-afra/Anini homestay",
      ],
    },
    {
      title: "Return to Dibrugarh",
      description: "Return journey with scenic stops.",
      activities: [
        "Morning departure from Anini",
        "Lunch stoppage at Roing",
        "Evening arrival in Dibrugarh",
      ],
    },
  ],

  route: {
    points: [
      [27.4728, 95.017], // Dibrugarh
      [28.3582, 95.3665], // Dambuk
      [28.8427, 95.8997], // Anini
    ],
    stops: [
      {
        name: "Dibrugarh",
        location: [27.4728, 95.017],
        description: "Starting point of the journey",
      },
      {
        name: "Dambuk",
        location: [28.3582, 95.3665],
        description: "Orange Festival location and first stop",
      },
      {
        name: "Anini",
        location: [28.8427, 95.8997],
        description: "Final destination in Dibang Valley",
      },
    ],
  },

  inclusions: [
    "Homestay & Camping accommodations",
    "Healthy Breakfast",
    "Transportation cost",
    "Tour Guide",
    "Inner line permits",
  ],

  exclusions: [
    "Lunch & Dinner",
    "Railway & Airway tickets",
    "Tourist spot tickets",
    "Personal expenses",
  ],

  importantNote:
    "The complete package amount is paid securely at booking. Minimum 4 persons required in a group.",

  thingsToCarry: [
    "Warm clothes",
    "Comfortable trekking shoes",
    "Valid ID proof",
    "Camera",
    "Personal medications",
    "Light backpack for day trips",
  ],

  maxGroupSize: 12,
  difficulty: "Moderate",
  altitude: 2500, // Approximate altitude for Anini area
  bestTimeToVisit: ["December"], // During OFAM festival
};

export const dambukGoldenPagodaTour: Tour = {
  id: "dambuk-golden-pagoda-ofam",
  slug: "dambuk-golden-pagoda-ofam",
  type: "Adventure",
  title: "Dambuk to Golden Pagoda Tour",
  subtitle: "Lets explore DAMBUK & GOLDEN PAGODA",
  overview:
    "Experience the vibrant Orange Festival of Arunachal Meshes (OFAM) in Dambuk combined with a spiritual journey to the majestic Golden Pagoda in Namsai. Enjoy riverside camping, explore sacred Buddhist sites, and immerse yourself in the cultural heritage of Arunachal Pradesh.",
  duration: "3 Days / 2 Nights",
  location: "Dambuk & Namsai, Arunachal Pradesh",
  startDate: "December 2026", // During OFAM festival
  price: 12999,
  featured: false,

  heroImage: "/images/places/dambuk/Dambuk_5.jpg",
  thumbnail: "/images/places/dambuk/Dambuk_5.jpg",
  gallery: [
    "/images/places/dambuk/Dambuk_2.jpg",
    "/images/places/dambuk/Dambuk_3.jpg",
    "/images/places/dambuk/Dambuk_4.JPG",
    "/images/places/dambuk/Dambuk_5.jpg",
  ],

  highlights: [
    "Dambuk OFAM & Sikang Boggo",
    "Golden Pagoda exploration",
    "Parsuram Kund visit",
    "River resort experience",
    "Buddhist cultural immersion",
    "Orange orchards and local cuisine",
  ],

  itinerary: [
    {
      title: "Dibrugarh to Dambuk",
      description:
        "Begin your journey with the Orange Festival experience in Dambuk.",
      activities: [
        "Pickup from Dibrugarh",
        "Lunch stoppage at Shantipur gate",
        "Enjoy the Dambuk OFAM",
        "Overnight at Dambuk Campsite",
      ],
    },
    {
      title: "Dambuk to Namsai",
      description: "Explore Namsai and its spiritual landmarks.",
      activities: [
        "Good morning from Dambuk",
        "Explore Namsai",
        "Lunch & Break time at resort",
        "Night stay at Namsai resort",
      ],
    },
    {
      title: "Return to Dibrugarh",
      description: "Visit final attractions before return.",
      activities: [
        "Morning visit to Golden Pagoda",
        "Visit Parsuram Kund",
        "Lunch near Namsai",
        "Evening return to Dibrugarh",
      ],
    },
  ],

  route: {
    points: [
      [27.4728, 95.017], // Dibrugarh
      [28.3582, 95.3665], // Dambuk
      [27.6667, 95.8667], // Namsai
    ],
    stops: [
      {
        name: "Dibrugarh",
        location: [27.4728, 95.017],
        description: "Starting point of the journey",
      },
      {
        name: "Dambuk",
        location: [28.3582, 95.3665],
        description: "Orange Festival location",
      },
      {
        name: "Namsai",
        location: [27.6667, 95.8667],
        description: "Golden Pagoda and cultural sites",
      },
    ],
  },

  inclusions: [
    "Homestay & Camping accommodations",
    "Healthy Breakfast",
    "Transportation cost",
    "Tour Guide",
    "Inner line permits",
  ],

  exclusions: [
    "Lunch & Dinner",
    "Railway & Airway tickets",
    "Tourist spot tickets",
    "Personal expenses",
  ],

  importantNote:
    "The complete package amount is paid securely at booking. Minimum 4 persons required in a group.",

  thingsToCarry: [
    "Comfortable walking shoes",
    "Modest clothing for temple visits",
    "Camera",
    "Personal medications",
    "Valid ID proof",
    "Light jacket or shawl",
  ],

  maxGroupSize: 12,
  difficulty: "Easy",
  altitude: 500, // Approximate for Namsai region
  bestTimeToVisit: ["December"], // During OFAM festival
};

export const dambukDongValleyTour: Tour = {
  id: "dambuk-dong-valley-ofam",
  slug: "dambuk-dong-valley-ofam",
  type: "Adventure",
  title: "Dambuk to Dong Valley Tour",
  subtitle: "Lets explore DAMBUK & DONG VALLEY",
  overview:
    "Experience the vibrant Orange Festival of Arunachal Meshes (OFAM) in Dambuk combined with an expedition to India's easternmost valley. Journey from the orange orchards of Dambuk to the historic Dong Valley, enjoying hot springs, trek experiences, and visiting India's easternmost villages.",
  duration: "4 Days / 3 Nights",
  location: "Dambuk & Dong Valley, Arunachal Pradesh",
  startDate: "December 2026", // During OFAM festival
  price: 18500,
  featured: false,

  heroImage: "/images/places/dong/Dong_2.jpg",
  thumbnail: "/images/places/dong/Dong_3.jpg",
  gallery: [
    "/images/places/dambuk/Dambuk_2.jpg",
    "/images/places/dong/Dong_1.JPG",
    "/images/places/dong/Dong_3.jpg",
    "/images/places/dong/Dong_5.jpg",
  ],

  highlights: [
    "Dambuk OFAM & Sikang Boggo",
    "Tilam Hotspring experience",
    "War memorial visit",
    "Dong Valley trek",
    "Explore Kaho & Kibithoo villages",
    "India's easternmost point",
  ],

  itinerary: [
    {
      title: "Dibrugarh to Dambuk",
      description: "Begin your journey with OFAM festival experience.",
      activities: [
        "Pickup from Dibrugarh",
        "Lunch stoppage at Shantipur gate",
        "Enjoy the Dambuk OFAM",
        "Overnight at Dambuk Campsite",
      ],
    },
    {
      title: "Dambuk to Walong",
      description: "Journey to Walong with cultural stops.",
      activities: [
        "Morning departure from Dambuk",
        "Explore Walong region",
        "Stoppage at Parsuram Kund",
        "Lunch at Hayuliang",
        "Evening rest at Tilam Hotspring",
      ],
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
        "Night at TILAM HOTSPRING",
      ],
    },
    {
      title: "Return to Dibrugarh",
      description: "Return journey with scenic stops.",
      activities: [
        "Morning departure from Walong",
        "Lunch stoppage at Hayuliang",
        "Evening arrival in Dibrugarh",
      ],
    },
  ],

  route: {
    points: [
      [27.4728, 95.017], // Dibrugarh
      [28.3582, 95.3665], // Dambuk
      [28.15, 97.1333], // Dong Valley
    ],
    stops: [
      {
        name: "Dibrugarh",
        location: [27.4728, 95.017],
        description: "Starting point of the journey",
      },
      {
        name: "Dambuk",
        location: [28.3582, 95.3665],
        description: "Orange Festival location",
      },
      {
        name: "Dong Valley",
        location: [28.15, 97.1333],
        description: "India's easternmost valley",
      },
    ],
  },

  inclusions: [
    "Homestay & Camping accommodations",
    "Healthy Breakfast",
    "Transportation cost",
    "Tour Guide",
    "Inner line permits",
  ],

  exclusions: [
    "Lunch & Dinner",
    "Railway & Airway tickets",
    "Tourist spot tickets",
    "Personal expenses",
  ],

  importantNote:
    "The complete package amount is paid securely at booking. Minimum 4 persons required in a group.",

  thingsToCarry: [
    "Warm clothes",
    "Trekking/comfortable shoes",
    "Valid ID proof",
    "Camera",
    "Personal medications",
    "Mini flask for water",
  ],

  maxGroupSize: 12,
  difficulty: "Moderate",
  altitude: 3500, // Approximate for Dong Valley region
  bestTimeToVisit: ["December"], // During OFAM festival
};

export const pomoTrekExpedition: Tour = {
  id: "pomo-trek-expedition",
  slug: "pomo-trek-expedition",
  type: "Adventure",
  title: "Anini Pomo Trek Expedition",
  subtitle: "3 Nights / 4 Days Trekking Adventure",
  overview:
    "Embark on a thrilling trek to Pomo, near Anini, in the heart of Dibang Valley.  Experience stunning waterfalls, pristine landscapes, and the unique culture of the region. This trek includes visits to Mayudia Pass, Mawu Ando & Mathu waterfalls, and Chigu and Dree-afra camps.",
  duration: "4 Days / 3 Nights",
  location: "Anini, Dibang Valley, Arunachal Pradesh",
  startDate: "Available Year Round",
  price: 19999,
  featured: false,

  heroImage: "/images/places/pomo/pomo1.JPG",
  thumbnail: "/images/places/pomo/pomo1.JPG",
  gallery: [
    "/images/places/pomo/pomo1.JPG",
    "/images/places/pomo/pomo2.JPG",
    "/images/places/pomo/pomo3.JPG",
    "/images/places/pomo/pomo4.jpg",
    "/images/places/pomo/pomo5.jpg",
    "/images/places/pomo/pomo6.jpg",
  ],

  highlights: [
    "Trek to the scenic Pomo region",
    "Explore Mayudia Pass",
    "Visit Mawu Ando & Mathu waterfalls",
    "Experience Chigu and Dree-afra camps",
    "Discover hidden waterfalls and lakes",
    "Immerse yourself in the local culture",
  ],

  itinerary: [
    {
      title: "Dibrugarh to Anini",
      description:
        "Drive from Dibrugarh to Anini, with sightseeing and a stop at Mayudia Pass.",
      activities: [
        "Pickup from Dibrugarh",
        "Scenic drive to Anini",
        "Sightseeing along the way",
        "Viewpoint and stoppage at Mayudia Pass",
        "Overnight stay at Anini",
      ],
    },
    {
      title: "Anini Exploration",
      description: "Explore the waterfalls and camps around Anini.",
      activities: [
        "Morning departure from Anini",
        "Visit Mawu Ando & Mathu waterfalls",
        "Explore Chigu and Dree-afra camps",
        "Overnight stay at Anini",
      ],
    },
    {
      title: "Pomo Trek",
      description:
        "Embark on the Pomo trek, experiencing the natural beauty of the region.",
      activities: [
        "Good morning from Anini",
        "Start the Pomo trek",
        "Explore scenic views, waterfalls, and lakes",
        "Overnight stay at Pomo or Anini (depending on trek progress and preference)",
      ],
    },
    {
      title: "Anini to Dibrugarh",
      description:
        "Return journey to Dibrugarh with a lunch break near Mayudia Pass.",
      activities: [
        "Morning departure from Anini/Pomo",
        "Lunch break near Mayudia Pass",
        "Return to Dibrugarh",
        "Trip completion",
      ],
    },
  ],

  route: {
    points: [
      [27.4728, 95.017],
      [28.8427, 95.8997],
    ],
    stops: [
      {
        name: "Dibrugarh",
        location: [27.4728, 95.017],
        description: "Starting point of the journey",
      },
      {
        name: "Anini",
        location: [28.8427, 95.8997],
        description: "Base for the trek and exploration",
      },
    ],
  },

  inclusions: [
    "Stay (Homestay/Camping)",
    "Breakfast & Evening Snacks",
    "Trip Guide",
    "Trekking Guide",
    "Sightseeing",
    "Travel Expenses",
    "Inner Line Permits",
  ],

  exclusions: [
    "Airway Tickets & Railway Tickets",
    "Anything not mentioned above",
    "Lunch",
    "Dinner",
  ],

  importantNote: "The complete package amount is paid securely at booking.",

  thingsToCarry: [
    "2 pairs of shoes (1 for trek)",
    "Warm clothes",
    "Raincoats, Umbrella & Gumboots for the trek",
    "Stretchable or breathable bottoms (jeans won't help for treks)",
    "Mini flask for warm water",
    "Small backpack for essential items during the Pomo trek",
  ],

  maxGroupSize: 10,
  difficulty: "Moderate",
  altitude: 2200,
  bestTimeToVisit: ["October", "November", "March", "April"],
};

export const mechukaExpedition: Tour = {
  id: "mechuka-expedition",
  slug: "mechuka-expedition",
  type: "Adventure",
  title: "Mechuka Expedition",
  subtitle: "5 Nights 6 Days in the Hidden Valley of Arunachal",
  overview:
    "Discover the untouched charm of Mechuka Valley — a serene land of scenic beauty, exotic tribes, gentle hills, and snow-capped mountains. Journey through Aalo, cross the Bogibeel and Yorlung bridges, and immerse yourself in a mix of spirituality, nature, and thrill.",
  duration: "6 Days / 5 Nights",
  location: "Mechuka Valley, Arunachal Pradesh",
  startDate: "Available Year Round",
  price: 19999,
  featured: true,
  trending: true,
  upcoming: false,
  tags: [
    "tribal-culture",
    "hidden-gem",
    "monasteries",
    "zipline",
    "valley-tour",
  ],

  heroImage: "/images/places/mechuka-new/mechuka-new-landscape-16.JPG",
  thumbnail: "/images/places/mechuka-new/mechuka-new-landscape-16.JPG",
  gallery: [
    "/images/places/mechuka-new/mechuka-new-landscape-16.JPG",
    "/images/places/mechuka-new/mechuka-new-portrait-2.jpg",
    "/images/places/mechuka-new/mechuka-new-portrait-3.jpg",
    "/images/places/mechuka-new/mechuka-new-portrait-8.jpg",
    "/images/places/mechuka-new/mechuka-new-portrait-15.jpg",
    "/images/places/mechuka-new/mechuka-new-portrait-21.jpg",
  ],

  highlights: [
    "Cross India’s longest railroad bridge – Bogibeel Bridge",
    "Explore the scenic Mechuka Valley",
    "Visit 400-year-old Mechuka Monastery",
    "See the rock face of Hanuman",
    "Gurudwara maintained by Indian Army",
    "Sacred meditation cave of Guru Rinpoche",
    "Ziplining adventure at Dorjeeling",
    "Oldest monastery in Dorjeeling (older than Tawang)",
  ],

  itinerary: [
    {
      title: "Dibrugarh to Aalo (Along)",
      description:
        "Begin your journey with a scenic drive to Aalo crossing Bogibeel bridge.",
      activities: [
        "Early morning departure from Dibrugarh",
        "Cross Bogibeel Bridge – India’s longest railroad bridge",
        "Drive through West Siang region",
        "Reach Aalo by evening",
        "Overnight stay in Aalo",
      ],
    },
    {
      title: "Aalo to Mechuka",
      description:
        "Enter the magical Mechuka Valley crossing the Yorlung Bridge.",
      activities: [
        "Drive to Mechuka (190 km, approx. 6 hours)",
        "Cross the Yorlung Bridge",
        "Check into homestay or hotel",
        "Explore Mechuka town and local market",
        "Overnight stay in Mechuka",
      ],
    },
    {
      title: "Mechuka Exploration - Part 1",
      description:
        "Spiritual and cultural exploration of sacred landmarks in Mechuka.",
      activities: [
        "Visit ancient 400-year-old Mechuka Monastery",
        "See Hanuman face engraved on mountain",
        "Visit the Indian Army-maintained Gurudwara",
        "Visit Neh-Bechag Shingri (sacred cave of Guru Rinpoche)",
        "Understand history of the sacred tiger imprint",
        "Overnight stay in Mechuka",
      ],
    },
    {
      title: "Dorjeeling Visit and Zipline",
      description:
        "Trek to viewpoint and explore Dorjeeling’s monastery and zipline thrills.",
      activities: [
        "Morning trek to a mountain viewpoint near Mechuka",
        "Drive to Dorjeeling",
        "Ziplining experience with breathtaking views",
        "Visit the oldest monastery in Dorjeeling (older than Tawang Monastery)",
        "Drive back to Mechuka",
        "Overnight stay in Mechuka",
      ],
    },
    {
      title: "Mechuka to Aalo",
      description: "Return journey from Mechuka to Aalo through scenic roads.",
      activities: [
        "Breakfast in Mechuka",
        "Drive back to Aalo",
        "Scenic drive through hills and valleys",
        "Overnight stay in Aalo",
      ],
    },
    {
      title: "Aalo to Dibrugarh",
      description: "Final leg of the journey back to Dibrugarh.",
      activities: [
        "Early morning departure from Aalo",
        "Drive back to Dibrugarh",
        "End of trip",
      ],
    },
  ],

  route: {
    points: [
      [27.4728, 95.017], // Dibrugarh
      [28.17, 94.8], // Aalo (Along)
      [28.6, 94.15], // Mechuka
    ],
    stops: [
      {
        name: "Dibrugarh",
        location: [27.4728, 95.017],
        description: "Starting point via Bogibeel Bridge",
      },
      {
        name: "Aalo",
        location: [28.17, 94.8],
        description: "District headquarters of West Siang",
      },
      {
        name: "Mechuka",
        location: [28.6, 94.15],
        description: "Remote valley with monasteries, history, and adventure",
      },
    ],
  },

  inclusions: [
    "Stay with necessary accommodations",
    "Breakfast & evening snacks",
    "Travel expenses",
    "Guide charges",
    "Tourist spot tickets",
    "Inner Line Permit",
  ],

  exclusions: ["Lunch & Dinner", "Railway & Airway tickets"],

  importantNote: "The complete package amount is paid securely at booking.",

  thingsToCarry: [
    "Warm clothes",
    "Chargers & Powerbanks",
    "Mini flask for warm water",
    "Small backpack for essentials during sightseeing",
  ],

  maxGroupSize: 12,
  difficulty: "Moderate",
  altitude: 1829, // Approx altitude of Mechuka in meters
  bestTimeToVisit: ["October", "November", "March", "April"],
};

export const aniniPomoSixExpedition: Tour = {
  id: "anini-pomo-grassland-expedition",
  slug: "anini-pomo-grassland-expedition",
  type: "Adventure",
  title: "Six Days in the Dibang",
  subtitle: "Anini + Pomo Grassland · 5 Nights / 6 Days",
  overview:
    "Five nights inside Dibang Valley, built around a 3 AM Pomo Grassland trek. Mayodia Pass, waterfall country and Chigu camp, Gipulin's glass bridge, Emuli and Karu meadows, a last-night bonfire in Anini. Small groups of 4–6, or private for two.",
  duration: "6 Days / 5 Nights",
  location: "Anini, Dibang Valley, Arunachal Pradesh",
  startDate: "October – April",
  price: 18999,
  featured: true,
  trending: true,
  upcoming: false,
  tags: ["anini", "pomo", "trek", "dibang-valley", "premium"],

  heroImage: "/images/places/pomo/pomo1.JPG",
  thumbnail: "/images/places/pomo/pomo1.JPG",
  gallery: [
    "/images/places/pomo/pomo1.JPG",
    "/images/places/pomo/pomo3.JPG",
    "/images/places/anini-new/anini-new-landscape-13.jpeg",
    "/images/places/pomo/pomo4.jpg",
    "/images/places/anini-new/anini-new-portrait-8.jpg",
    "/images/places/pomo/pomo5.jpg",
  ],

  highlights: [
    "Pomo Grassland trek — 12 hours, 03:00 start",
    "Overnight at Chigu camp on the Dri flats",
    "Mayodia Pass at 2,655 m",
    "Waterfall country: Deccan, Ahi, Bruni",
    "Gipulin, Matu valley and the glass bridge",
    "Emuli & Karu grasslands",
    "Last-night bonfire at an Anini homestay",
    "Inner Line Permit and forest pass included",
  ],

  itinerary: [
    {
      title: "Dibrugarh to Anini via Mayodia",
      description:
        "05:00–06:30 pickup. 385 km over the Bhupen Hazarika Setu, Roing and Mayodia Pass (2,655 m). Overnight Anini.",
      activities: [
        "Morning pickup from Dibrugarh or Tinsukia",
        "Dr. Bhupen Hazarika Setu — India's longest bridge",
        "Mayodia Pass at 2,655 m",
        "Overnight stay at Anini",
      ],
    },
    {
      title: "Waterfall country to Chigu camp",
      description:
        "08:00–09:00 start. Dree Afra, Mawuando, the Dri, Deccan, Ahi and Bruni falls. Overnight at Chigu camp.",
      activities: [
        "Dree Afra, Chigu camp, Mawuando",
        "Dri river",
        "Deccan, Ahi and Bruni falls",
        "Overnight stay at Chigu camp",
      ],
    },
    {
      title: "Pomo Grassland trek",
      description:
        "03:00 headlamp start. Twelve hours on foot. Grassland by late morning, down by 15:00. Overnight Anini.",
      activities: [
        "03:00 start from Chigu camp",
        "Forest climb to the tree line",
        "Pomo Grassland",
        "Transfer back to Anini by evening",
      ],
    },
    {
      title: "Gipulin, Matu and the glass bridge",
      description:
        "Recovery day. Matu valley, Matu waterfall, the glass bridge, valley viewpoints. Overnight Anini.",
      activities: [
        "Matu valley and waterfall",
        "Glass bridge over the gorge",
        "Unhurried valley viewpoints",
        "Overnight stay at Anini",
      ],
    },
    {
      title: "Emuli, Karu and the last fire",
      description:
        "09:00 start. Emuli grassland, Karu viewpoint and grassland, Anini market walk, bonfire at the homestay.",
      activities: [
        "Emuli grassland",
        "Karu viewpoint and grassland",
        "Evening market walk in Anini",
        "Bonfire at the homestay",
      ],
    },
    {
      title: "Anini to Dibrugarh",
      description:
        "06:00–07:00 departure via Hunli and Mayodia. Bhupen Hazarika Setu. Dibrugarh drop 17:00–18:00.",
      activities: [
        "Early departure via Hunli–Mayodia",
        "Dr. Bhupen Hazarika Setu",
        "Drop-off in Dibrugarh by evening",
      ],
    },
  ],

  route: {
    points: [
      [27.4728, 95.017],
      [28.8427, 95.8997],
    ],
    stops: [
      {
        name: "Dibrugarh",
        location: [27.4728, 95.017],
        description: "Pickup 05:00–06:30",
      },
      {
        name: "Anini",
        location: [28.8427, 95.8997],
        description: "Five nights in Dibang Valley — homestay and Chigu camp",
      },
    ],
  },

  inclusions: [
    "Accommodation — 4 nights Anini homestay, 1 night Chigu camp",
    "Private transportation",
    "Expedition guide",
    "Pomo grassland trek and trek transport",
    "Breakfast and dinner",
    "Inner Line Permit",
    "Forest pass",
  ],

  exclusions: [
    "Lunch",
    "Flights and trains to Dibrugarh",
    "Personal expenses",
    "Anything not listed in inclusions",
  ],

  importantNote:
    "The complete package amount is paid securely at booking. October to April only — we do not run this route in monsoon. Book onward travel from Dibrugarh for the morning after day six, never the same evening.",

  thingsToCarry: [
    "Dedicated trekking shoes for the summit day",
    "Warm jacket — Mayodia is 2,655 m",
    "Headlamp with fresh batteries",
    "Rain shell and a small day pack",
    "Government photo ID for the Inner Line Permit",
  ],

  maxGroupSize: 6,
  difficulty: "Challenging",
  altitude: 2655,
  bestTimeToVisit: ["October", "November", "March", "April"],
};

export const regularTours = [
  mechukaDongAniniTour,
  aniniPomoSixExpedition,
  tawangExpedition,
  dongValleyExpedition,
  aniniExpedition,
  dambukAniniOfamTour,
  dambukGoldenPagodaTour,
  dambukDongValleyTour,
  pomoTrekExpedition,
  mechukaExpedition,
];
