// Nagaland ILP/PAP Complete Data
// SEO-optimized content for state-specific permit page

export const nagalandPermitData = {
  // Basic Info
  state: "Nagaland",
  slug: "nagaland-ilp",
  title: "Nagaland ILP 2026",
  tagline: "Complete Guide to Inner Line Permit for the Land of Festivals",
  
  // SEO Meta
  seo: {
    title: "Nagaland ILP 2026: Online Apply, Fee ₹200, Hornbill Festival Permit | Complete Guide",
    description: "Apply for Nagaland Inner Line Permit (ILP) online in 2026. Tourist fee ₹200 for 30 days, processing 1-2 days. Step-by-step guide for Hornbill Festival, Kohima, Mon. Official portal link.",
    keywords: [
      "nagaland ilp",
      "nagaland ilp online apply",
      "nagaland inner line permit",
      "nagaland permit",
      "ilp nagaland 2026",
      "nagaland ilp fee",
      "hornbill festival permit",
      "kohima permit",
      "mon district permit",
      "nagaland travel permit",
      "nagaland entry permit",
      "ilp for hornbill festival",
    ],
    canonical: "https://travelspirene.com/permits/nagaland-ilp",
  },

  // Quick Stats
  quickStats: {
    // Per the official table at ilp.nagaland.gov.in/fees. Gateway charge extra.
    // Key names are read by the page, so only the values change.
    fee: {
      tourist30Days: "₹200",
      student5Years: "Free",
      business: "Trader ₹300 (90 days) or ₹1,000 (1 year) · Partner in Business ₹5,000",
      employment: "Professional / Consultant ₹1,000 · Labourer ₹300",
      foreigner30Days: "₹500",
    },
    processingTime: {
      online: "1-2 working days",
      offline: "No longer accepted (from Dec 31, 2024)",
    },
    validity: {
      tourist: "30 days",
      student: "5 years or the length of the course",
      business: "Trader 90 days or 1 year · Partner 3 years",
    },
    onArrival: false,
    onArrivalNote: "Online application mandatory from Dec 31, 2024. No offline applications accepted.",
    officialPortal: "https://ilp.nagaland.gov.in",
    helpline: "ilphelpdesk.nagaland.gov.in",
    lastUpdated: "August 2026",
  },

  // Who Needs ILP
  whoNeeds: {
    required: [
      "All Indian citizens from other states",
      "Includes tourists, students, workers, business visitors",
      "Required for all entry points (road, rail, air)",
      "Even for transit through Nagaland",
    ],
    notRequired: [
      "Nagaland domicile holders (Indigene Certificate holders)",
      "Persons with valid employment in Nagaland (different category)",
      "Central government employees on official duty",
    ],
    foreigners: "Foreign nationals need a Protected Area Permit (PAP). Apply through e-FRRO portal at least 30 days in advance. Must travel in group of 2+ with registered tour operator. The Nagaland ILP portal also lists a Foreigner ILP category (₹500, 30 days).",
  },

  // Entry Points
  entryPoints: [
    {
      name: "Dimapur",
      type: "Road/Rail/Air",
      from: "Guwahati, Assam",
      note: "Main gateway - only airport and railway station in Nagaland",
    },
    {
      name: "Kohima",
      type: "Road",
      from: "Via Dimapur (74 km)",
      note: "State capital, Hornbill Festival venue",
    },
    {
      name: "Medziphema",
      type: "Road",
      from: "Via Dimapur",
      note: "Entry point from Assam",
    },
    {
      name: "Pfutsero",
      type: "Road",
      from: "Via Kohima/Manipur",
      note: "Entry from Manipur side",
    },
  ],

  // Application Steps
  applicationSteps: [
    {
      step: 1,
      title: "Register on the official portal",
      description: "Create account on the official Nagaland ILP portal",
      details: [
        "Visit ilp.nagaland.gov.in",
        "Click 'Register' to create new account",
        "Enter mobile number and email for OTP verification",
        "Set up login credentials",
      ],
      duration: "5 minutes",
      icon: "Globe",
    },
    {
      step: 2,
      title: "Fill in the online application",
      description: "Complete the ILP application form with all required details",
      details: [
        "Select category: Domestic (tourist) / Student / Trader / Professional / Labourer / Partner in Business",
        "Enter personal details exactly as per ID proof",
        "Upload passport-size photo (JPEG, max 50KB)",
        "Upload ID proof (Aadhaar/Voter ID/Passport)",
        "Specify purpose, duration, and places to visit",
        "For non-tourist categories: Upload supporting documents + Guarantor details",
      ],
      duration: "15-20 minutes",
      icon: "FileText",
    },
    {
      step: 3,
      title: "Pay the fee",
      description: "Complete online payment through secure gateway",
      details: [
        "Tourist (30 days): ₹200",
        "Student: free",
        "Trader: ₹300 (90 days) or ₹1,000 (1 year)",
        "Professional / Consultant (1 year): ₹1,000",
        "Partner in Business (3 years): ₹5,000",
        "Gateway charge extra",
        "Payment via UPI, Net Banking, Debit/Credit Cards",
        "Download payment receipt",
      ],
      duration: "2 minutes",
      icon: "CreditCard",
    },
    {
      step: 4,
      title: "Track and download the ILP",
      description: "Wait for approval and download your e-ILP",
      details: [
        "Track application status on portal",
        "Approval typically within 1-2 working days",
        "Download approved e-ILP from portal",
        "Print colored copy for travel",
        "ILP will also be sent via email",
      ],
      duration: "1-2 working days",
      icon: "Download",
    },
  ],

  // Required Documents
  documents: {
    mandatory: [
      {
        name: "Valid Photo ID Proof",
        description: "Government-issued identity document",
        options: ["Aadhaar Card", "Voter ID Card", "Driving License", "Passport"],
        note: "Name must match exactly with application",
      },
      {
        name: "Recent Passport-Size Photo",
        description: "Digital photo for upload",
        specifications: "JPEG format, max 50KB, white background",
        note: "Face should be clearly visible",
      },
    ],
    forStudents: [
      {
        name: "Institution ID Card",
        description: "Valid student ID from recognized institution",
      },
      {
        name: "Bonafide Certificate",
        description: "Letter from institution confirming enrollment",
      },
    ],
    forBusiness: [
      {
        name: "Business Registration",
        description: "GST certificate or business license",
      },
      {
        name: "Guarantor Details",
        description: "Local Nagaland resident as guarantor (mandatory)",
      },
    ],
    forEmployment: [
      {
        name: "Appointment Letter",
        description: "From Nagaland-based employer",
      },
      {
        name: "Employer's Registration",
        description: "Company registration in Nagaland",
      },
    ],
    tips: [
      "Tourists and students don't need guarantor",
      "All other categories require local guarantor",
      "Offline applications no longer accepted from Dec 31, 2024",
      "Keep scanned copies ready before starting application",
      "Documents must be in English or Hindi",
    ],
  },

  // Popular Destinations
  destinations: [
    {
      name: "Kohima",
      highlight: "State capital, War Cemetery, Hornbill Festival venue",
      district: "Kohima",
      permitRequired: "ILP",
      bestTime: "October to May",
      altitude: "1,444m",
    },
    {
      name: "Dimapur",
      highlight: "Commercial hub, Kachari Ruins, gateway city",
      district: "Dimapur",
      permitRequired: "ILP",
      bestTime: "October to May",
      altitude: "260m",
    },
    {
      name: "Mon",
      highlight: "Land of Konyak tribe, headhunter history",
      district: "Mon",
      permitRequired: "ILP + Registration",
      bestTime: "November to March",
      altitude: "897m",
    },
    {
      name: "Khonoma",
      highlight: "India's first green village, Angami culture",
      district: "Kohima",
      permitRequired: "ILP",
      bestTime: "October to May",
      altitude: "1,500m",
    },
    {
      name: "Dzukou Valley",
      highlight: "Valley of flowers, trekking paradise",
      district: "Kohima",
      permitRequired: "ILP",
      bestTime: "June to September (flowers), October to May (trek)",
      altitude: "2,452m",
    },
    {
      name: "Mokokchung",
      highlight: "Ao Naga tribe, Longkhum village",
      district: "Mokokchung",
      permitRequired: "ILP",
      bestTime: "October to May",
      altitude: "1,325m",
    },
    {
      name: "Tuophema",
      highlight: "Tourist village, traditional Naga experience",
      district: "Kohima",
      permitRequired: "ILP",
      bestTime: "October to May",
      altitude: "1,600m",
    },
    {
      name: "Longleng",
      highlight: "Phom tribe, least explored district",
      district: "Longleng",
      permitRequired: "ILP",
      bestTime: "October to April",
      altitude: "1,200m",
    },
  ],

  // Hornbill Festival Special Section
  hornbillFestival: {
    name: "Hornbill Festival",
    dates: "December 1-10 (Every Year)",
    venue: "Kisama Heritage Village, Kohima",
    description: "Nagaland's biggest cultural extravaganza showcasing all 17 Naga tribes. Known as 'Festival of Festivals'.",
    ilpTips: [
      "Apply for ILP at least 7-10 days before festival dates",
      "High volume of applications during November - expect slight delays",
      "Choose the Tourist category and give your festival dates — there is no separate festival fast track",
      "Book accommodation in advance - gets fully booked",
      "A tourist ILP is valid for 30 days — enough for the whole festival",
    ],
    highlights: [
      "Traditional Naga music and dance performances",
      "Indigenous games and sports",
      "Local handicrafts and food stalls",
      "Kohima Night Carnival and the Hornbill Music Festival",
    ],
  },

  // FAQs for SEO
  faqs: [
    {
      question: "How to apply for Nagaland ILP online?",
      answer: "Visit the official portal ilp.nagaland.gov.in, register with your mobile number, fill the application form, upload required documents (ID proof and photo), pay ₹200 fee online, and wait 1-2 working days for approval. Download the approved e-ILP from the portal.",
    },
    {
      question: "What is the fee for Nagaland ILP in 2026?",
      answer: "A tourist (Domestic) ILP costs ₹200 for 30 days. Other categories: Student free; Trader ₹300 (90 days) or ₹1,000 (1 year); Professional/Consultant ₹1,000 (1 year); Labourer ₹300; Partner in Business ₹5,000 (3 years). Gateway charges are extra, and all payments are made online through the official portal.",
    },
    {
      question: "How long does it take to get Nagaland ILP?",
      answer: "Online applications are typically processed within 1-2 working days. During peak seasons like Hornbill Festival, it may take slightly longer. Apply at least 7-10 days before your travel date to be safe.",
    },
    {
      question: "Can I get Nagaland ILP on arrival?",
      answer: "No, Nagaland does not issue ILP on arrival. From December 31, 2024, all applications must be submitted online through ilp.nagaland.gov.in. Offline applications are no longer accepted.",
    },
    {
      question: "Do I need ILP for Hornbill Festival?",
      answer: "Yes, ILP is mandatory for visiting the Hornbill Festival in Kohima. Apply online at least 7-10 days before the festival (December 1-10), as applications peak in November.",
    },
    {
      question: "What documents are required for Nagaland ILP?",
      answer: "For tourists: Valid photo ID (Aadhaar/Voter ID/Passport) and passport-size photo. For students: Additional institution ID and bonafide certificate. For business/employment: Relevant registration documents and mandatory local guarantor.",
    },
    {
      question: "Is guarantor required for Nagaland ILP?",
      answer: "Tourists and students do NOT need a guarantor. However, for business, employment, and other categories, a local Nagaland resident guarantor is mandatory. The guarantor's details and documents must be provided during application.",
    },
    {
      question: "Can foreigners visit Nagaland?",
      answer: "Yes, foreign nationals can visit Nagaland but need a Protected Area Permit (PAP). Apply through e-FRRO portal (indianfrro.gov.in) at least 30 days in advance. Must travel in a group of 2+ with a registered tour operator. The Nagaland ILP portal also lists a Foreigner ILP category (₹500, 30 days).",
    },
    {
      question: "How long is Nagaland ILP valid?",
      answer: "Tourist ILP is valid for 30 days. Student ILP runs up to 5 years or the length of the course. Trader ILP is 90 days or 1 year, Professional/Consultant 1 year, and Partner in Business 3 years. Extensions can be requested at the appropriate government office before expiry.",
    },
    {
      question: "Do I need special permit for Mon district?",
      answer: "While ILP is sufficient to enter Mon district, you may need to register at the local police station upon arrival. This is due to the sensitive nature of the area (home of Konyak tribe near Myanmar border). Check current requirements before travel.",
    },
    {
      question: "Is Dimapur part of Nagaland? Do I need ILP?",
      answer: "Yes, Dimapur is in Nagaland and ILP is required. It's the only city with an airport and railway station in Nagaland, making it the main gateway. You need valid ILP before entering Dimapur.",
    },
    {
      question: "Can I apply for Nagaland ILP offline?",
      answer: "No, from December 31, 2024, all ILP applications for Nagaland must be submitted online through the official portal ilp.nagaland.gov.in. Physical/offline applications are no longer accepted.",
    },
    {
      question: "What is the best time to visit Nagaland?",
      answer: "October to May is the best time to visit Nagaland. December is peak season due to Hornbill Festival. Monsoon (June-September) sees heavy rainfall and landslides. Winter (November-February) is cold but ideal for festivals and trekking.",
    },
    {
      question: "How to reach Nagaland?",
      answer: "By Air: Dimapur Airport (only airport in Nagaland) with flights from Kolkata, Guwahati. By Train: Dimapur Railway Station connected to major cities. By Road: Well-connected via NH29 from Guwahati (270 km). All entry requires valid ILP.",
    },
  ],

  // Important Tips
  tips: [
    {
      title: "Apply online only",
      description: "From Dec 31, 2024, offline applications are not accepted. Apply only through ilp.nagaland.gov.in",
      icon: "Globe",
    },
    {
      title: "Plan ahead for Hornbill",
      description: "During Hornbill Festival (Dec 1-10), apply 7-10 days in advance due to high volume.",
      icon: "Calendar",
    },
    {
      title: "Print a colour copy",
      description: "Carry colored printout of your e-ILP. Some checkpoints may not accept digital copies.",
      icon: "Printer",
    },
    {
      title: "Carry your original ID",
      description: "Keep your original ID proof (used in application) for verification at checkpoints.",
      icon: "CreditCard",
    },
    {
      title: "Mon district",
      description: "Register at local police station when visiting Mon district near Myanmar border.",
      icon: "MapPin",
    },
    {
      title: "No guarantor for tourists",
      description: "Only tourists and students are exempt from guarantor requirement. Others need local guarantor.",
      icon: "Users",
    },
  ],

  // Best Time to Visit
  bestTime: {
    recommended: "October to May",
    seasons: [
      {
        name: "Post-Monsoon (October-November)",
        description: "Clear skies, pleasant weather, festival season begins",
        temperature: "12-22°C",
        ideal: true,
      },
      {
        name: "Winter (December-February)",
        description: "Peak tourist season, Hornbill Festival, cold but clear",
        temperature: "4-15°C",
        ideal: true,
      },
      {
        name: "Spring (March-April)",
        description: "Warming weather, flowers blooming, good for trekking",
        temperature: "15-25°C",
        ideal: true,
      },
      {
        name: "Summer (May-June)",
        description: "Warm weather, pre-monsoon showers begin late June",
        temperature: "20-30°C",
        ideal: false,
      },
      {
        name: "Monsoon (July-September)",
        description: "Heavy rainfall, landslides possible, avoid travel",
        temperature: "18-25°C",
        ideal: false,
      },
    ],
  },

  // Contact & Help
  contact: {
    officialHelpline: "ilphelpdesk.nagaland.gov.in",
    officialEmail: "ilp-ngl@gov.in",
    nagalandHouses: [
      {
        city: "New Delhi",
        address: "Nagaland House, 29 Aurangzeb Road",
        phone: "011-23792245",
      },
      {
        city: "Kolkata",
        address: "Nagaland House, 11 Shakespeare Sarani",
        phone: "033-22825522",
      },
      {
        city: "Guwahati",
        address: "Nagaland House, Six Mile",
        phone: "0361-2229315",
      },
    ],
  },

  // Related Links
  relatedPages: [
    { name: "Arunachal Pradesh ILP", slug: "arunachal-pradesh-ilp" },
    { name: "Mizoram ILP", slug: "mizoram-ilp" },
    { name: "Manipur ILP", slug: "manipur-ilp" },
    { name: "Sikkim Permit", slug: "sikkim-permit" },
  ],
};

export type NagalandPermitData = typeof nagalandPermitData;
