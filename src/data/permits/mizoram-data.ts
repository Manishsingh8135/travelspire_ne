// Mizoram ILP/PAP Complete Data
// SEO-optimized content for state-specific permit page

export const mizoramPermitData = {
  state: "Mizoram",
  slug: "mizoram-ilp",
  title: "Mizoram ILP 2026",
  tagline: "Complete Guide to Inner Line Permit for the Land of Blue Mountains",
  
  seo: {
    title: "Mizoram ILP 2026: Online Apply, Fees, On Arrival at Lengpui | Complete Guide",
    description: "Apply for Mizoram Inner Line Permit (ILP) online or get it on arrival at Lengpui Airport. Temporary ILP about ₹300–350, valid 7 days, approved after document verification. Step-by-step guide, documents, Aizawl travel tips.",
    keywords: [
      "mizoram ilp",
      "mizoram ilp online apply",
      "mizoram inner line permit",
      "mizoram permit",
      "ilp mizoram 2026",
      "mizoram ilp fee",
      "mizoram ilp on arrival",
      "lengpui airport ilp",
      "aizawl permit",
      "mizoram travel permit",
      "mizoram entry permit",
    ],
    canonical: "https://travelspirene.com/permits/mizoram-ilp",
  },

  quickStats: {
    fee: {
      // The portal works out the fee after verification (form fee + temporary
      // ILP fee + administration fee); the old ₹20 + ₹100 split no longer applies.
      formFee: "Included in the total",
      processingFee: "Included in the total",
      total: "About ₹300–350",
    },
    processingTime: {
      online: "After verification, in office hours",
      airport: "On arrival, at the counter",
    },
    validity: {
      temporary: "7 days",
      regular: "6 months (for workers)",
    },
    onArrival: true,
    onArrivalNote: "Available at Lengpui Airport from the Security Officer — the only Northeast state that issues an ILP on arrival.",
    officialPortal: "https://ilp.mizoram.gov.in",
    helpline: "Liaison Officers in Guwahati, Kolkata, Shillong, Delhi",
    lastUpdated: "August 2026",
  },

  whoNeeds: {
    required: [
      "All Indian citizens from other states",
      "Tourists, students, workers, business visitors",
      "Required for all entry points",
    ],
    notRequired: [
      "Mizoram domicile holders",
      "Central government employees on official duty",
      "Armed forces personnel with movement orders",
    ],
    foreigners: "Foreign nationals must register with the Foreigner Registration Officer (FRO) within 24 hours of arrival. Apply through e-FRRO portal before travel.",
  },

  entryPoints: [
    {
      name: "Lengpui Airport (Aizawl)",
      type: "Air",
      from: "Kolkata, Guwahati, Imphal",
      note: "ILP available on arrival from Security Officer",
    },
    {
      name: "Vairengte",
      type: "Road",
      from: "Silchar, Assam",
      note: "Main entry point from Assam via NH 306",
    },
    {
      name: "Kanhmun",
      type: "Road",
      from: "Tripura",
      note: "Entry point from Tripura",
    },
    {
      name: "Bairabi",
      type: "Road/Rail",
      from: "Assam",
      note: "Railway station and road entry",
    },
  ],

  applicationSteps: [
    {
      step: 1,
      title: "Apply online or at the airport",
      description: "Choose online application or get ILP on arrival at Lengpui Airport",
      details: [
        "Online: Visit ilp.mizoram.gov.in",
        "Airport: Approach Security Officer at Lengpui",
        "Liaison Offices: Guwahati, Kolkata, Shillong, Delhi",
        "On arrival option available ONLY at Lengpui Airport",
      ],
      duration: "5 minutes",
      icon: "Globe",
    },
    {
      step: 2,
      title: "Fill in the application",
      description: "Complete the ILP application with personal details",
      details: [
        "Enter personal details as per ID proof",
        "Upload passport-size photograph",
        "Upload ID proof (Aadhaar/Voter ID/Passport)",
        "Specify purpose and duration of visit",
        "Mention places to visit in Mizoram",
      ],
      duration: "10 minutes",
      icon: "FileText",
    },
    {
      step: 3,
      title: "Pay the fee",
      description: "Pay the ILP fee online once approved, or in person",
      details: [
        "Fee shown on the portal after verification (about ₹300–350)",
        "Gateway charges extra; the fee is non-refundable",
        "Online: UPI, Net Banking, Cards",
        "At airport: Cash payment accepted",
      ],
      duration: "2 minutes",
      icon: "CreditCard",
    },
    {
      step: 4,
      title: "Receive the ILP",
      description: "Pay and download after verification (office hours)",
      details: [
        "Online: download from the portal once paid",
        "Airport: issued at the Security Officer's counter",
        "Print colored copy for checkpoints",
        "Temporary ILP valid for 7 days",
      ],
      duration: "Within office hours",
      icon: "Download",
    },
  ],

  documents: {
    mandatory: [
      {
        name: "Valid Photo ID Proof",
        description: "Government-issued identity document",
        options: ["Aadhaar Card", "Voter ID Card", "Driving License", "Passport"],
        note: "Original required for verification",
      },
      {
        name: "Passport-Size Photographs",
        description: "Recent photographs for application",
        specifications: "2 photos, white background",
        note: "Carry extra copies for airport application",
      },
    ],
    tips: [
      "For airport application, carry 2 physical passport photos",
      "Temporary ILP valid for 7 days only",
      "Register with FRO within 24 hours if foreigner",
      "Sunday is strictly observed - plan accordingly",
      "Keep original ID proof during entire trip",
    ],
  },

  destinations: [
    {
      name: "Aizawl",
      highlight: "State capital, Bara Bazar, churches",
      district: "Aizawl",
      permitRequired: "ILP",
      bestTime: "October to March",
      altitude: "1,132m",
    },
    {
      name: "Champhai",
      highlight: "Rice bowl of Mizoram, Myanmar border",
      district: "Champhai",
      permitRequired: "ILP",
      bestTime: "October to March",
      altitude: "1,678m",
    },
    {
      name: "Lunglei",
      highlight: "Second largest town, Thorang tlang",
      district: "Lunglei",
      permitRequired: "ILP",
      bestTime: "October to March",
      altitude: "1,150m",
    },
    {
      name: "Phawngpui (Blue Mountain)",
      highlight: "Highest peak of Mizoram, rhododendrons",
      district: "Lawngtlai",
      permitRequired: "ILP",
      bestTime: "March to May (flowers)",
      altitude: "2,157m",
    },
    {
      name: "Reiek",
      highlight: "Mountain peak with panoramic views",
      district: "Mamit",
      permitRequired: "ILP",
      bestTime: "October to March",
      altitude: "1,548m",
    },
    {
      name: "Tam Dil",
      highlight: "Beautiful lake surrounded by forests",
      district: "Aizawl",
      permitRequired: "ILP",
      bestTime: "October to March",
      altitude: "900m",
    },
  ],

  faqs: [
    {
      question: "Can I get Mizoram ILP on arrival at airport?",
      answer: "Yes. Mizoram is the only northeastern state that offers ILP on arrival. You can get it at Lengpui Airport from the Security Officer immediately upon arrival. Carry 2 passport-size photos, ID proof, and the fee in cash (about ₹300–350).",
    },
    {
      question: "What is the fee for Mizoram ILP?",
      answer: "The Temporary ILP fee was raised from ₹120 to ₹300 in 2020. Online it now comes to about ₹300–350 including the administration fee, shown on ilp.mizoram.gov.in after your application is verified. Gateway charges are extra, and the fee is non-refundable.",
    },
    {
      question: "How long is Mizoram ILP valid?",
      answer: "The Temporary ILP for tourists is valid for 7 days. A 30-day Tourist ILP was announced in September 2026 but is not yet on the portal. For workers and longer stays, a Regular ILP of up to 6 months needs a local sponsor and supporting documents.",
    },
    {
      question: "How to apply for Mizoram ILP online?",
      answer: "Visit the official portal ilp.mizoram.gov.in, register and fill the application form, upload ID proof and photo, wait for verification (office hours), then pay the fee online and download the ILP.",
    },
    {
      question: "Do foreigners need ILP for Mizoram?",
      answer: "Foreigners don't need ILP but must register with the Foreigner Registration Officer (FRO) within 24 hours of arrival. They should apply for PAP through e-FRRO portal before travel.",
    },
    {
      question: "What documents are needed for Mizoram ILP at airport?",
      answer: "For airport ILP, carry: Valid photo ID proof (original), 2 passport-size photographs, and the fee in cash (about ₹300–350). The process takes just a few minutes at the Security Officer's desk.",
    },
    {
      question: "Is Mizoram safe for tourists?",
      answer: "Yes, Mizoram is one of the safest and cleanest states in India. It has very low crime rates and friendly locals. However, note that Sunday is strictly observed - most shops and restaurants are closed.",
    },
    {
      question: "What is the best time to visit Mizoram?",
      answer: "October to March is the best time to visit Mizoram. The weather is pleasant with clear skies. Avoid monsoon (June-September) due to heavy rainfall. March-May is good for Phawngpui to see rhododendrons.",
    },
    {
      question: "How to reach Mizoram?",
      answer: "By Air: Lengpui Airport near Aizawl with flights from Kolkata, Guwahati, Imphal. By Road: Via Silchar (Assam) or Tripura. By Rail: Bairabi is the nearest railway station. ILP is needed for all entry points.",
    },
    {
      question: "Can I extend Mizoram ILP?",
      answer: "Yes, temporary ILP can be extended at the Superintendent of Police office in Aizawl. Apply before your current ILP expires with valid reasons for extension. Additional fee may apply.",
    },
  ],

  tips: [
    {
      title: "Get the ILP at the airport",
      description: "Mizoram is the only NE state offering ILP on arrival at Lengpui Airport. Carry photos and cash.",
      icon: "Plane",
    },
    {
      title: "Sunday closure",
      description: "Sunday is strictly observed in Mizoram. Most shops, restaurants, and services are closed. Plan accordingly.",
      icon: "Calendar",
    },
    {
      title: "Carry cash",
      description: "ATMs are limited outside Aizawl. Carry sufficient cash, especially for remote areas.",
      icon: "CreditCard",
    },
    {
      title: "Respect local custom",
      description: "Mizoram is predominantly Christian. Dress modestly and respect local customs and church timings.",
      icon: "Users",
    },
    {
      title: "7-day validity",
      description: "Temporary ILP is valid for 7 days only. Plan your trip accordingly or apply for extension.",
      icon: "Clock",
    },
    {
      title: "FRO registration",
      description: "Foreigners must register with FRO within 24 hours of arrival. Carry copies of passport and visa.",
      icon: "FileText",
    },
  ],

  bestTime: {
    recommended: "October to March",
    seasons: [
      {
        name: "Winter (October-February)",
        description: "Best time, pleasant weather, clear skies, festivals",
        temperature: "8-20°C",
        ideal: true,
      },
      {
        name: "Spring (March-May)",
        description: "Warming weather, rhododendrons bloom at Phawngpui",
        temperature: "15-28°C",
        ideal: true,
      },
      {
        name: "Monsoon (June-September)",
        description: "Heavy rainfall, landslides possible, avoid travel",
        temperature: "18-25°C",
        ideal: false,
      },
    ],
  },

  contact: {
    officialPortal: "https://ilp.mizoram.gov.in",
    liaisonOffices: [
      { city: "Guwahati", address: "Mizoram House, Ulubari" },
      { city: "Kolkata", address: "Mizoram House, Salt Lake" },
      { city: "New Delhi", address: "Mizoram House, Chanakyapuri" },
      { city: "Shillong", address: "Mizoram House, Laitumkhrah" },
    ],
  },

  relatedPages: [
    { name: "Arunachal Pradesh ILP", slug: "arunachal-pradesh-ilp" },
    { name: "Nagaland ILP", slug: "nagaland-ilp" },
    { name: "Manipur ILP", slug: "manipur-ilp" },
    { name: "Sikkim Permit", slug: "sikkim-permit" },
  ],
};

export type MizoramPermitData = typeof mizoramPermitData;
