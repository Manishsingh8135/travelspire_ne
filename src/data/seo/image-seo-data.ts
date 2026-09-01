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
  category: 'landscape' | 'portrait' | 'cultural' | 'festival' | 'monastery' | 'valley' | 'village' | 'landmark';
}

const mechukaLocation = {
  name: 'Mechuka',
  state: 'Arunachal Pradesh',
  coordinates: {
    latitude: 28.7733,
    longitude: 94.2617,
  },
} as const;

const MECHUKA_2026_DIR = '/images/places/mechuka-new/Mechuka2026';

/** Canonical paths for the 2026 Mechuka field photographs. */
export const mechuka2026Src = {
  ridgeViewpoint: `${MECHUKA_2026_DIR}/mechuka-valley-ridge-viewpoint-town.jpg`,
  riverViewpoint: `${MECHUKA_2026_DIR}/mechuka-yargyap-chu-river-viewpoint.jpg`,
  winterSnow: `${MECHUKA_2026_DIR}/mechuka-valley-winter-snow-pine-forest.jpg`,
  goldenBuddha: `${MECHUKA_2026_DIR}/mechuka-golden-buddha-statue.jpg`,
  helicopterLandmark: `${MECHUKA_2026_DIR}/mechuka-helicopter-landmark-indian-flag.jpg`,
  homestayCabins: `${MECHUKA_2026_DIR}/mechuka-homestay-red-roof-cabins.jpg`,
  dorjeelingSignpost: `${MECHUKA_2026_DIR}/mechuka-dorjeeling-selfie-point-signpost.jpg`,
  salmanPoint: `${MECHUKA_2026_DIR}/mechuka-salman-point-distance-signpost.jpg`,
} as const;

export const mechuka2026Images: PlaceImage[] = [
  {
    src: mechuka2026Src.ridgeViewpoint,
    alt: 'Travellers on a mountain ridge overlooking Mechuka town, the Yargyap Chu valley and cloud-covered hills in Arunachal Pradesh',
    title: 'Mechuka Valley Ridge Viewpoint, Shi Yomi',
    caption: 'A high ridge above Mechuka town, looking across the Yargyap Chu valley towards the Eastern Himalaya in Shi Yomi district.',
    location: mechukaLocation,
    keywords: [
      'mechuka valley viewpoint',
      'mechuka town arunachal pradesh',
      'yargyap chu valley',
      'shi yomi district',
      'mechuka tour package',
      'menchukha landscape',
    ],
    category: 'landscape',
  },
  {
    src: mechuka2026Src.riverViewpoint,
    alt: 'Traveller at a riverside railing overlooking the Yargyap Chu river and mist-covered mountains in Mechuka Valley, Arunachal Pradesh',
    title: 'Yargyap Chu River Viewpoint, Mechuka',
    caption: 'A quiet riverside viewpoint over the Yargyap Chu, with low cloud sitting on the green hills around Mechuka.',
    location: mechukaLocation,
    keywords: [
      'yargyap chu river',
      'mechuka river view',
      'mechuka valley arunachal',
      'menchukha tourism',
      'shi yomi river',
    ],
    category: 'landscape',
  },
  {
    src: mechuka2026Src.winterSnow,
    alt: 'Snow-covered pine forest and misty mountain slopes in Mechuka Valley during winter, Shi Yomi, Arunachal Pradesh',
    title: 'Winter Snow in Mechuka Valley',
    caption: 'A rare winter covering of snow on the pine forest and ridgelines above Mechuka, one of Arunachal Pradesh’s high western valleys.',
    location: mechukaLocation,
    keywords: [
      'mechuka winter',
      'mechuka snow',
      'snow in arunachal pradesh',
      'mechuka pine forest',
      'shi yomi winter travel',
      'mechukha snowfall',
    ],
    category: 'landscape',
  },
  {
    src: mechuka2026Src.goldenBuddha,
    alt: 'Golden seated Buddha statue on an ornate red and gold pedestal at dusk in Mechuka, Arunachal Pradesh',
    title: 'Golden Buddha Statue in Mechuka',
    caption: 'The large golden Buddha in Mechuka, lit at dusk on a carved red-and-gold pedestal with the valley hills behind it.',
    location: mechukaLocation,
    keywords: [
      'mechuka buddha statue',
      'golden buddha arunachal pradesh',
      'buddhist sites mechuka',
      'mechuka monastery valley',
      'shi yomi buddhism',
    ],
    category: 'monastery',
  },
  {
    src: mechuka2026Src.helicopterLandmark,
    alt: 'Weathered Indian military helicopter with the national flag, a well-known landmark in Mechuka Valley, Arunachal Pradesh',
    title: 'Mechuka Helicopter Landmark',
    caption: 'The retired military helicopter in Mechuka, kept as a valley landmark beneath misted conifer slopes, with the Indian flag on the rotor hub.',
    location: mechukaLocation,
    keywords: [
      'mechuka helicopter',
      'mechuka helicopter crash site',
      'mechuka landmark',
      'mechuka sightseeing',
      'arunachal pradesh offbeat',
    ],
    category: 'landmark',
  },
  {
    src: mechuka2026Src.homestayCabins,
    alt: 'Wooden A-frame homestay cabins with red roofs and a road-trip SUV against the hills of Mechuka, Arunachal Pradesh',
    title: 'Mechuka Homestay Cabins',
    caption: 'Red-roof A-frame cabins used as valley stays in Mechuka, with a dusty expedition SUV parked on the grass below the hills.',
    location: mechukaLocation,
    keywords: [
      'mechuka homestay',
      'mechuka accommodation',
      'arunachal pradesh cabins',
      'mechuka road trip',
      'shi yomi stay',
    ],
    category: 'village',
  },
  {
    src: mechuka2026Src.dorjeelingSignpost,
    alt: 'Mechuka distance signpost at Dorjeeling Resorts selfie point with expedition SUVs and Himalayan mountains, Arunachal Pradesh',
    title: 'Dorjeeling Selfie Point Signpost, Mechuka',
    caption: 'The Mechuka signpost at Dorjeeling Resorts, a popular selfie stop showing distances to cities worldwide, with the valley mountains behind.',
    location: mechukaLocation,
    keywords: [
      'dorjeeling mechuka',
      'mechuka selfie point',
      'mechuka signboard',
      'dorjeeling resorts',
      'mechuka tourism spot',
    ],
    category: 'landmark',
  },
  {
    src: mechuka2026Src.salmanPoint,
    alt: 'Travellers at the Mechukha distance signpost at Salman Point, Dorjeeling, with red-roof cabins and misty mountains in Mechuka',
    title: 'Salman Point Distance Signpost, Mechuka',
    caption: 'Salman Point at Dorjeeling, where the Mechukha distance sign stands in front of red-roof cabins and clouded hills.',
    location: mechukaLocation,
    keywords: [
      'salman point mechuka',
      'mechukha signpost',
      'dorjeeling mechuka',
      'mechuka photo point',
      'menchukha landmark',
    ],
    category: 'landmark',
  },
];

const aniniLocation = {
  name: 'Anini',
  state: 'Arunachal Pradesh',
  coordinates: {
    latitude: 28.79806,
    longitude: 95.90361,
  },
} as const;

const ANINI_2026_DIR = '/images/places/anini/anini2026';

/** Canonical paths for the 2026 Anini / Dibang Valley field photographs. */
export const anini2026Src = {
  sevenLakesSign: `${ANINI_2026_DIR}/anini-seven-lakes-trek-trailhead-sign.jpg`,
  sevenLakesTarn: `${ANINI_2026_DIR}/anini-seven-lakes-alpine-tarn.jpg`,
  sevenLakesMeadow: `${ANINI_2026_DIR}/anini-seven-lakes-flooded-meadow.jpg`,
  pomoRidgeTrail: `${ANINI_2026_DIR}/pomo-trek-ridge-trail-dibang-valley.jpg`,
  emuliSign: `${ANINI_2026_DIR}/anini-emuli-grassland-sign.jpg`,
  cascadeFalls: `${ANINI_2026_DIR}/anini-cascade-waterfall-dibang-valley.jpg`,
  mistyFalls: `${ANINI_2026_DIR}/anini-misty-mountain-waterfall.jpg`,
  riverbankFalls: `${ANINI_2026_DIR}/anini-riverbank-waterfall-view.jpg`,
  trekkerFalls: `${ANINI_2026_DIR}/anini-trekker-riverside-waterfall.jpg`,
  aFrameCabins: `${ANINI_2026_DIR}/anini-a-frame-cabins-waterfall.jpg`,
  bambooWalk: `${ANINI_2026_DIR}/anini-bamboo-walkway-green-hills.jpg`,
  benchBoardwalk: `${ANINI_2026_DIR}/anini-wooden-bench-boardwalk-valley.jpg`,
  meadowRest: `${ANINI_2026_DIR}/anini-meadow-rest-blue-sky.jpg`,
  rainbowGlamping: `${ANINI_2026_DIR}/anini-double-rainbow-glamping-tents.jpg`,
} as const;

export const anini2026Size: Record<string, { width: number; height: number }> = {
  [anini2026Src.sevenLakesSign]: { width: 3024, height: 4032 },
  [anini2026Src.sevenLakesTarn]: { width: 3024, height: 4032 },
  [anini2026Src.sevenLakesMeadow]: { width: 3024, height: 4032 },
  [anini2026Src.pomoRidgeTrail]: { width: 3120, height: 4160 },
  [anini2026Src.emuliSign]: { width: 3024, height: 4032 },
  [anini2026Src.cascadeFalls]: { width: 3024, height: 4032 },
  [anini2026Src.mistyFalls]: { width: 4284, height: 5712 },
  [anini2026Src.riverbankFalls]: { width: 4284, height: 5712 },
  [anini2026Src.trekkerFalls]: { width: 4284, height: 5712 },
  [anini2026Src.aFrameCabins]: { width: 3024, height: 4032 },
  [anini2026Src.bambooWalk]: { width: 3024, height: 4032 },
  [anini2026Src.benchBoardwalk]: { width: 3024, height: 4032 },
  [anini2026Src.meadowRest]: { width: 3024, height: 4032 },
  [anini2026Src.rainbowGlamping]: { width: 4032, height: 3024 },
};

export const anini2026Images: PlaceImage[] = [
  {
    src: anini2026Src.sevenLakesSign,
    alt: 'Travellers at the official Anini Seven Lakes Trek trailhead sign on a grassy ridge in Dibang Valley, Arunachal Pradesh',
    title: 'Anini Seven Lakes Trek Trailhead, Dibang Valley',
    caption: 'The marked start of the Seven Lakes trek above Anini, with the green ridges of Dibang Valley behind the sign.',
    location: aniniLocation,
    keywords: [
      'anini seven lakes trek',
      'seven lakes anini',
      'dibang valley trekking',
      'anini trek trailhead',
      'arunachal pradesh lakes trek',
    ],
    category: 'landmark',
  },
  {
    src: anini2026Src.sevenLakesTarn,
    alt: 'Trekkers in rain gear beside a small alpine tarn on the Seven Lakes route near Anini, Dibang Valley',
    title: 'Alpine Tarn on the Anini Seven Lakes Trek',
    caption: 'A still, reed-rimmed tarn in mist and pine forest on the Seven Lakes walk out of Anini.',
    location: aniniLocation,
    keywords: [
      'anini seven lakes',
      'alpine lake dibang valley',
      'anini lakes trek',
      'high altitude tarn arunachal',
    ],
    category: 'landscape',
  },
  {
    src: anini2026Src.sevenLakesMeadow,
    alt: 'Two trekkers in raincoats wading a flooded grassy meadow on the Seven Lakes trek near Anini, Dibang Valley',
    title: 'Flooded Meadow on the Seven Lakes Trek, Anini',
    caption: 'Knee-deep water across a pine-edged meadow — typical of the Seven Lakes route after rain in Dibang Valley.',
    location: aniniLocation,
    keywords: [
      'seven lakes trek anini',
      'monsoon trekking arunachal',
      'dibang valley hike',
      'anini adventure trek',
    ],
    category: 'landscape',
  },
  {
    src: anini2026Src.pomoRidgeTrail,
    alt: 'Trekkers descending a grassy ridge trail above a river valley on the Pomo route near Anini, Dibang Valley',
    title: 'Pomo Trek Ridge Trail, Dibang Valley',
    caption: 'A dirt path through high grass on the Pomo approach, looking down a clouded river valley outside Anini.',
    location: aniniLocation,
    keywords: [
      'pomo trek anini',
      'pomo grassland trek',
      'dibang valley trekking',
      'anini pomo trail',
      'arunachal pradesh trek',
    ],
    category: 'landscape',
  },
  {
    src: anini2026Src.emuliSign,
    alt: 'Travellers at the red Emuli Grassland sign above Anini, with green mountain ridges and a river valley in Dibang Valley',
    title: 'Emuli Grassland Sign, Anini',
    caption: 'The official Emuli Grassland marker above Anini — a drive-to meadow on the Six Days in the Dibang itinerary.',
    location: aniniLocation,
    keywords: [
      'emuli grassland anini',
      'emuli anini',
      'dibang valley grassland',
      'anini viewpoint',
      'karu emuli',
    ],
    category: 'landmark',
  },
  {
    src: anini2026Src.cascadeFalls,
    alt: 'Trekkers in raincoats posing in front of a wide cascade waterfall near Anini in Dibang Valley, Arunachal Pradesh',
    title: 'Cascade Waterfall near Anini, Dibang Valley',
    caption: 'A broad, fan-shaped fall on the waterfall circuit below the Anini plateau — the kind of stop that fills Day 2 of the six-day expedition.',
    location: aniniLocation,
    keywords: [
      'anini waterfall',
      'dibang valley waterfall',
      'anini cascade',
      'mawu mathu waterfall',
      'anini sightseeing',
    ],
    category: 'landscape',
  },
  {
    src: anini2026Src.mistyFalls,
    alt: 'Multi-tiered waterfall dropping through mist and forest on a steep mountainside near Anini, Dibang Valley',
    title: 'Misty Mountain Waterfall, Anini',
    caption: 'A high, staged fall coming out of cloud on the forested slopes around Anini in Dibang Valley.',
    location: aniniLocation,
    keywords: [
      'anini waterfall',
      'dibang valley falls',
      'misty waterfall arunachal',
      'anini nature',
    ],
    category: 'landscape',
  },
  {
    src: anini2026Src.riverbankFalls,
    alt: 'Travellers sitting on a riverbank looking toward a large forested waterfall near Anini, Dibang Valley',
    title: 'Riverbank Waterfall View, Anini',
    caption: 'A wide river and a multi-drop waterfall in forest below Anini — waterfall country on the Dibang Valley floor.',
    location: aniniLocation,
    keywords: [
      'anini waterfall',
      'dibang valley river',
      'anini trek waterfall',
      'arunachal pradesh waterfall',
    ],
    category: 'landscape',
  },
  {
    src: anini2026Src.trekkerFalls,
    alt: 'A trekker sitting on river stones facing a tall forest waterfall near Anini, Dibang Valley, Arunachal Pradesh',
    title: 'Trekker at a Riverside Waterfall, Anini',
    caption: 'Quiet time on the stone bank of a fast Dibang tributary, with a tall fall in the forest behind.',
    location: aniniLocation,
    keywords: [
      'anini trek',
      'dibang valley waterfall',
      'anini river',
      'arunachal adventure',
    ],
    category: 'landscape',
  },
  {
    src: anini2026Src.aFrameCabins,
    alt: 'Row of red and blue A-frame cabins beneath a misty forested mountain and waterfall in Anini, Dibang Valley',
    title: 'A-Frame Cabins in Anini, Dibang Valley',
    caption: 'Wooden A-frame cottages under pine and mist at Anini, with a thin waterfall on the slope behind.',
    location: aniniLocation,
    keywords: [
      'anini stay',
      'anini cabins',
      'anini homestay',
      'dibang valley accommodation',
      'anini camping',
    ],
    category: 'village',
  },
  {
    src: anini2026Src.bambooWalk,
    alt: 'Travellers on a bamboo boardwalk through green meadows and hills at Anini, Dibang Valley, Arunachal Pradesh',
    title: 'Bamboo Walkway, Anini',
    caption: 'A traditional bamboo path across the meadow floor around Anini, with clear-sky hills behind.',
    location: aniniLocation,
    keywords: [
      'anini boardwalk',
      'anini meadow',
      'dibang valley landscape',
      'anini tourism',
    ],
    category: 'landscape',
  },
  {
    src: anini2026Src.benchBoardwalk,
    alt: 'Traveller resting on a wooden bench above a boardwalk meadow and mountain ridges at Anini, Dibang Valley',
    title: 'Valley Bench and Boardwalk, Anini',
    caption: 'A log bench looking over marsh meadow, a winding boardwalk and the ridges around Anini.',
    location: aniniLocation,
    keywords: [
      'anini viewpoint',
      'anini meadow',
      'dibang valley view',
      'anini plateau',
    ],
    category: 'landscape',
  },
  {
    src: anini2026Src.meadowRest,
    alt: 'Traveller lying in a sunlit meadow under a blue sky and rolling hills at Anini, Dibang Valley, Arunachal Pradesh',
    title: 'Meadow Rest, Anini Dibang Valley',
    caption: 'Open grass and a big sky on the Anini plateau — the unhurried side of a Dibang Valley trek day.',
    location: aniniLocation,
    keywords: [
      'anini grassland',
      'dibang valley meadow',
      'anini trek rest',
      'arunachal pradesh landscape',
    ],
    category: 'landscape',
  },
  {
    src: anini2026Src.rainbowGlamping,
    alt: 'Double rainbow over forested mountains, sunflowers and white glamping tents at Anini, Dibang Valley, Arunachal Pradesh',
    title: 'Double Rainbow over Anini Glamping Tents',
    caption: 'A bright double rainbow after rain above the Anini valley, with sunflowers and dome tents on the grass.',
    location: aniniLocation,
    keywords: [
      'anini rainbow',
      'anini glamping',
      'dibang valley camping',
      'anini landscape',
      'arunachal pradesh rainbow',
    ],
    category: 'landscape',
  },
];

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
    },
    ...anini2026Images,
  ],

  'mechuka-new': [
    {
      src: '/images/places/mechuka-new/mechuka-new-landscape-16.JPG',
      alt: 'Mechuka Valley - Last village of India near China border, Arunachal Pradesh',
      title: 'Mechuka Valley - India\'s Last Village',
      caption: 'The breathtaking Mechuka Valley, known as India\'s last village near the China border',
      location: mechukaLocation,
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
    },
    ...mechuka2026Images,
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

const placeImageBySrc = new Map(
  getAllPlaceImages().map((image) => [image.src, image] as const),
);

export function getPlaceImageBySrc(src: string): PlaceImage | undefined {
  return placeImageBySrc.get(src);
}

export function getPlaceImageAlt(
  src: string,
  fallback?: string,
): string {
  return getPlaceImageBySrc(src)?.alt ?? fallback ?? '';
}

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
