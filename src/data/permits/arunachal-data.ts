// Arunachal Pradesh ILP/PAP Complete Data
// SEO-optimized content for state-specific permit page
//
// Facts verified against the live official sources (eilp.arunachal.gov.in
// tourist application page, arunachaltourism.com ILP/PAP pages, MHA PAP FAQ)
// in July 2026 and re-checked in October 2026. The ₹100 15/30-day tiers and
// the ₹400 "instant" option that older guides quote no longer exist.
// Never link arunachalilp.com — it is a parked domain now.

export const arunachalPermitData = {
  // Basic Info
  state: "Arunachal Pradesh",
  slug: "arunachal-pradesh-ilp",
  title: "Arunachal Pradesh ILP 2026",
  tagline: "Complete Guide to Inner Line Permit for India's Land of Rising Sun",
  
  // SEO Meta
  seo: {
    title: "Arunachal Pradesh ILP 2026: Fee ₹300/₹500, Apply Online, Documents",
    description: "Arunachal Pradesh Inner Line Permit 2026: ₹300 for up to 3 days, ₹500 for 4–14 days, applied online at eilp.arunachal.gov.in. Documents, processing time, PAP for foreigners and Bum La permits — checked October 2026.",
    keywords: [
      "arunachal pradesh ilp",
      "arunachal ilp online apply",
      "arunachal pradesh inner line permit",
      "arunachal pradesh permit",
      "ilp arunachal pradesh 2026",
      "arunachal pradesh ilp fee",
      "arunachal pradesh ilp documents",
      "how to get ilp for arunachal pradesh",
      "arunachal pradesh travel permit",
      "arunachal pradesh entry permit",
      "eilp arunachal",
      "e-ilp arunachal pradesh",
    ],
    canonical: "https://travelspirene.com/permits/arunachal-pradesh-ilp",
  },

  // Quick Stats
  quickStats: {
    fee: {
      touristUpTo3Days: "₹300",
      tourist4To14Days: "₹500",
    },
    processingTime: {
      online: "Usually approved within a day",
    },
    validity: {
      tourist: "Up to 14 days (Tourist eILP)",
      provisional: "Up to 30 days (Provisional eILP, for longer stays)",
      regular: "Up to 365 days (Regular, non-tourist)",
    },
    onArrival: false,
    onArrivalNote: "Must apply online BEFORE entering Arunachal Pradesh",
    officialPortal: "https://eilp.arunachal.gov.in",
    helpline: "1800 345 3605 (Toll Free)",
    lastUpdated: "October 2026",
  },

  // Who Needs ILP
  whoNeeds: {
    required: [
      "All Indian citizens from other states",
      "Includes infants, children, and senior citizens",
      "Applies to all entry points (road, rail, air)",
    ],
    notRequired: [
      "Arunachal Pradesh domicile holders",
      "Central government employees on official duty (with valid ID)",
      "Armed forces personnel with movement orders",
    ],
    foreigners: "Foreign nationals need a Protected Area Permit (PAP), issued online through e-FRRO: groups of two or more through a registered tour operator, USD 30 royalty per head. Apply about 15 days ahead from within India, 30 days from abroad. NRI, PIO and OCI holders also need a PAP, not an ILP.",
  },

  // Entry Points
  entryPoints: [
    {
      name: "Bhalukpong",
      type: "Road",
      from: "Tezpur, Assam",
      note: "Most common entry for Tawang route",
    },
    {
      name: "Banderdewa",
      type: "Road", 
      from: "Guwahati/Itanagar",
      note: "Entry to capital Itanagar",
    },
    {
      name: "Gumto Railway Station",
      type: "Rail",
      from: "Naharlagun",
      note: "Nearest railway station",
    },
    {
      name: "Naharlagun Railway Station",
      type: "Rail",
      from: "Connected to Guwahati",
      note: "Main railway station",
    },
    {
      name: "Pasighat",
      type: "Road/Air",
      from: "Dibrugarh, Assam",
      note: "Entry to East Arunachal",
    },
    {
      name: "Donyi Polo Airport (Hollongi)",
      type: "Air",
      from: "Itanagar",
      note: "Nonstop flights from Delhi and Kolkata",
    },
  ],

  // Application Steps
  applicationSteps: [
    {
      step: 1,
      title: "Open the official portal",
      description: "Go to the official e-ILP portal: eilp.arunachal.gov.in",
      details: [
        "Click on 'Apply for ILP' button",
        "Choose 'Tourist' category for leisure travel",
        "Portal works 24/7 for online applications",
      ],
      duration: "2 minutes",
      icon: "Globe",
    },
    {
      step: 2,
      title: "Register and fill in the form",
      description: "Create account and fill the online application form",
      details: [
        "Enter personal details (name as per ID proof)",
        "Upload passport-size photo (35x45mm, 20-50KB, JPEG)",
        "Upload ID proof (Aadhaar/Voter ID/Passport)",
        "Specify places to visit and duration",
        "Add co-travelers if any",
      ],
      duration: "10-15 minutes",
      icon: "FileText",
    },
    {
      step: 3,
      title: "Pay the fee online",
      description: "Complete payment through secure gateway",
      details: [
        "₹300 for a stay of up to 3 days",
        "₹500 for 4 to 14 days (the tourist maximum)",
        "Payment via UPI, net banking or card",
        "Keep the payment receipt",
      ],
      duration: "2 minutes",
      icon: "CreditCard",
    },
    {
      step: 4,
      title: "Download the ILP",
      description: "Receive approved ILP via email and portal",
      details: [
        "Usually approved within a day",
        "Download the PDF from the portal",
        "Keep a copy offline and a colour printout — every gate checks it",
      ],
      duration: "Usually within a day",
      icon: "Download",
    },
  ],

  // Required Documents
  documents: {
    mandatory: [
      {
        name: "Valid Photo ID Proof",
        description: "Any one of the following government-issued ID",
        options: ["Aadhaar Card", "Voter ID Card", "Driving License", "Passport"],
        note: "Name on ID must match application exactly",
      },
      {
        name: "Recent Passport-Size Photo",
        description: "Digital photo for upload",
        specifications: "Size: 35x45mm, File: 20-50KB, Format: JPEG/JPG",
        note: "White background, face clearly visible",
      },
    ],
    forMinors: [
      {
        name: "Parent's ID Proof",
        description: "ID of parent/guardian accompanying the minor",
      },
      {
        name: "Birth Certificate",
        description: "For age verification (if no Aadhaar)",
      },
    ],
    forGroups: [
      {
        name: "All Members' ID Proofs",
        description: "Individual ID for each group member",
      },
      {
        name: "Group Leader Details",
        description: "One person designated as group coordinator",
      },
    ],
    tips: [
      "Scan documents in clear, readable quality",
      "File size should be under 500KB each",
      "Documents must be in English or Hindi only",
      "Keep original documents during travel for verification",
    ],
  },

  // Special Permits (RAP)
  specialPermits: {
    title: "Border day-permits",
    description: "A few points near the border need one more permission on top of your ILP. They are issued locally, for Indian citizens only.",
    areas: [
      {
        name: "Bum La Pass",
        location: "Tawang District",
        nearBorder: "China (Tibet)",
        note: "DC day-permit, army-countersigned. Tawang-registered taxis only",
        indiansAllowed: true,
        foreignersAllowed: false,
      },
      {
        name: "PT Tso Lake",
        location: "Tawang District",
        nearBorder: "On the Bum La road",
        note: "Covered by the same DC day-permit as Bum La",
        indiansAllowed: true,
        foreignersAllowed: false,
      },
      {
        name: "Sangetsar (Madhuri) Lake",
        location: "Tawang District",
        nearBorder: "On the Bum La road",
        note: "Covered by the same DC day-permit as Bum La",
        indiansAllowed: true,
        foreignersAllowed: false,
      },
      {
        name: "Lamang, beyond Mechuka",
        location: "Shi-Yomi District",
        nearBorder: "China (Tibet)",
        note: "Same-day Army/ITBP permit, arranged in Mechuka",
        indiansAllowed: true,
        foreignersAllowed: false,
      },
    ],
    howToApply: "Arranged a day ahead in Tawang (or on the day in Mechuka) through your hotel, homestay or driver — on our trips we handle it. Carry your ILP and original ID; the Bum La road closes by early afternoon. Dong and Walong need no extra civilian permit — just your ILP, checked at the Dirak gate.",
  },

  // Popular Destinations
  destinations: [
    {
      name: "Tawang",
      highlight: "India's largest monastery, over the Sela Tunnel road",
      district: "Tawang",
      permitRequired: "ILP (+ DC day-permit for Bum La)",
      bestTime: "March to October",
      altitude: "3,048m",
    },
    {
      name: "Ziro Valley",
      highlight: "Apatani country, on UNESCO's tentative list",
      district: "Lower Subansiri",
      permitRequired: "ILP",
      bestTime: "March to October, September (Ziro Festival)",
      altitude: "1,500m",
    },
    {
      name: "Mechuka",
      highlight: "Hidden Himalayan valley, Memba tribe",
      district: "Shi-Yomi",
      permitRequired: "ILP",
      bestTime: "March to June, September to November",
      altitude: "1,829m",
    },
    {
      name: "Bomdila",
      highlight: "Gateway to Tawang, Buddhist monasteries",
      district: "West Kameng",
      permitRequired: "ILP",
      bestTime: "March to October",
      altitude: "2,530m",
    },
    {
      name: "Pasighat",
      highlight: "Oldest town, Siang River adventures",
      district: "East Siang",
      permitRequired: "ILP",
      bestTime: "October to April",
      altitude: "155m",
    },
    {
      name: "Anini",
      highlight: "Remote paradise, Idu Mishmi tribe",
      district: "Dibang Valley",
      permitRequired: "ILP",
      bestTime: "October to April",
      altitude: "1,968m",
    },
    {
      name: "Dong Valley",
      highlight: "India's first sunrise point",
      district: "Anjaw",
      permitRequired: "ILP (checked at Dirak gate)",
      bestTime: "October to April",
      altitude: "1,240m",
    },
    {
      name: "Namdapha National Park",
      highlight: "Biodiversity hotspot, rare wildlife",
      district: "Changlang",
      permitRequired: "ILP + Park Entry",
      bestTime: "October to April",
      altitude: "200-4,500m",
    },
  ],

  // FAQs for SEO
  faqs: [
    {
      question: "How to apply for Arunachal Pradesh ILP online?",
      answer: "Apply on the official portal, eilp.arunachal.gov.in: choose the Tourist eILP, enter your details and trip dates, upload a photo ID and a passport-size photo, and pay ₹300 (up to 3 days) or ₹500 (4–14 days) online. Approval usually comes within a day; download the PDF and keep a printout. Avoid look-alike sites — arunachalilp.com is no longer an official portal.",
    },
    {
      question: "What is the fee for Arunachal Pradesh ILP in 2026?",
      answer: "The Tourist eILP costs ₹300 for a stay of up to 3 days and ₹500 for 4 to 14 days. Fourteen days is the tourist maximum; longer stays need a Provisional eILP (up to 30 days). The ₹100 15/30-day fee that older guides quote is out of date.",
    },
    {
      question: "How long does it take to get Arunachal Pradesh ILP?",
      answer: "Online applications are usually approved within a day. Apply two or three days before you travel anyway, in case the portal is slow — there is no permit on arrival.",
    },
    {
      question: "Can I get Arunachal Pradesh ILP on arrival?",
      answer: "No, Arunachal Pradesh does not issue ILP on arrival. You must apply online through eilp.arunachal.gov.in or at Arunachal Bhawan offices in Delhi, Kolkata, Guwahati, or Shillong BEFORE entering the state.",
    },
    {
      question: "What documents are required for Arunachal Pradesh ILP?",
      answer: "You need: 1) Valid photo ID proof (Aadhaar/Voter ID/Driving License/Passport), 2) Recent passport-size photograph (35x45mm, JPEG format, 20-50KB). For minors, parent's ID proof is also required.",
    },
    {
      question: "Is ILP required for Tawang?",
      answer: "Yes. The ILP covers Tawang town and the monastery. Bum La, PT Tso and Sangetsar (Madhuri) Lake need one extra day-permit from the DC office in Tawang, countersigned by the Army — for Indian citizens only, arranged a day ahead through your hotel or driver.",
    },
    {
      question: "Can foreigners visit Arunachal Pradesh?",
      answer: "Yes. Foreign nationals need a Protected Area Permit (PAP), issued online through e-FRRO, travelling in a group of two or more through a registered tour operator, with a royalty of USD 30 per person. Apply about 15 days ahead from within India or 30 days from abroad. Solo travel needs prior Home Ministry clearance, and some border points stay closed to foreigners.",
    },
    {
      question: "How long is Arunachal Pradesh ILP valid?",
      answer: "The Tourist eILP covers up to 14 days, matching the dates you apply for. For a longer stay, apply for a Provisional eILP (up to 30 days). Work and study permits (Regular ILP) run up to a year.",
    },
    {
      question: "Where can I apply for Arunachal Pradesh ILP offline?",
      answer: "The online eILP is the standard route for tourists. If you get stuck, the Arunachal Bhawan offices in New Delhi, Kolkata, Guwahati and Shillong can help — call ahead, and carry your original ID and two passport photos.",
    },
    {
      question: "Do children need ILP for Arunachal Pradesh?",
      answer: "Yes, ILP is required for all ages including infants and children. For minors, you need to provide parent/guardian's ID proof along with the child's details. Birth certificate may be needed if the child doesn't have Aadhaar.",
    },
    {
      question: "What is the difference between ILP and PAP?",
      answer: "The ILP is for Indian citizens: ₹300–₹500 online at eilp.arunachal.gov.in. The PAP is for foreign nationals (and NRI, PIO and OCI holders): issued through e-FRRO for groups of two or more via a registered operator, with a USD 30 royalty per person.",
    },
    {
      question: "Can I extend my Arunachal Pradesh ILP?",
      answer: "Plan the full stay up front: the Tourist eILP caps at 14 days, and a stay longer than that needs a Provisional eILP (up to 30 days). If plans change mid-trip, visit the Deputy Commissioner's office in the district you're in before your permit expires.",
    },
    {
      question: "Is ILP required for Itanagar?",
      answer: "Yes, ILP is required for Itanagar and all districts of Arunachal Pradesh without exception. You need a valid ILP before entering the state through any entry point - road, rail, or air.",
    },
    {
      question: "What happens if I enter Arunachal Pradesh without ILP?",
      answer: "Entering Arunachal Pradesh without a valid ILP is illegal. You may face fines, detention, or deportation. Checkpoints at all entry points verify ILPs. Always carry your ILP printout and original ID proof.",
    },
    {
      question: "Can I apply for ILP through DigiLocker?",
      answer: "You can use documents stored in DigiLocker for the application process, but the actual ILP application must be submitted through the official e-ILP portal (eilp.arunachal.gov.in). The approved ILP can be stored in DigiLocker for easy access.",
    },
  ],

  // Important Tips
  tips: [
    {
      title: "Apply in advance",
      description: "Apply at least 2-3 days before travel to avoid last-minute issues. Though processing is fast, technical glitches can occur.",
      icon: "Clock",
    },
    {
      title: "Print a colour copy",
      description: "Always carry a colored printout of your ILP. Digital copies may not be accepted at all checkpoints, especially in remote areas with no internet.",
      icon: "Printer",
    },
    {
      title: "Carry your original ID",
      description: "Keep your original ID proof (the one used in application) with you throughout the trip. Officials may verify it at checkpoints.",
      icon: "CreditCard",
    },
    {
      title: "Check the validity",
      description: "Ensure your ILP covers your entire trip duration. If extending stay, visit DC office before ILP expires.",
      icon: "Calendar",
    },
    {
      title: "Note your entry point",
      description: "Specify correct entry point in application. If plans change, it's usually accepted, but matching details is recommended.",
      icon: "MapPin",
    },
    {
      title: "Group applications",
      description: "For family/group travel, you can add all members in one application. Each person still needs their ID proof uploaded.",
      icon: "Users",
    },
  ],

  // Best Time to Visit
  bestTime: {
    recommended: "March to October",
    seasons: [
      {
        name: "Spring (March-April)",
        description: "Pleasant weather, rhododendrons in bloom, clear mountain views",
        temperature: "10-20°C",
        ideal: true,
      },
      {
        name: "Summer (May-June)",
        description: "Warm weather, pre-monsoon, good for high-altitude areas",
        temperature: "15-25°C",
        ideal: true,
      },
      {
        name: "Monsoon (July-September)",
        description: "Heavy rainfall, landslides possible, roads may be blocked",
        temperature: "15-22°C",
        ideal: false,
      },
      {
        name: "Autumn (October-November)",
        description: "Clear skies, post-monsoon freshness, festival season",
        temperature: "8-18°C",
        ideal: true,
      },
      {
        name: "Winter (December-February)",
        description: "Cold, snowfall in high areas, Tawang can be snow-covered",
        temperature: "-5 to 10°C",
        ideal: false,
        note: "Tawang stays reachable through the Sela Tunnel; pass-top viewpoints can snow out",
      },
    ],
  },

  // Contact & Help
  contact: {
    officialHelpline: "1800 345 3605 (Toll Free)",
    officialEmail: "eilp.arn@gmail.com",
    arunachalBhawans: [
      {
        city: "New Delhi",
        address: "Arunachal Bhawan, Kautilya Marg, Chanakyapuri",
        phone: "011-23013915",
      },
      {
        city: "Kolkata",
        address: "Arunachal Bhawan, CE Block, Sector 1, Salt Lake",
        phone: "033-23592325",
      },
      {
        city: "Guwahati",
        address: "Arunachal Bhawan, Beltola Chariali",
        phone: "0361-2301156",
      },
      {
        city: "Shillong",
        address: "Arunachal House, Nongrim Hills",
        phone: "0364-2224466",
      },
    ],
  },

  // Related Links
  relatedPages: [
    { name: "Nagaland ILP", slug: "nagaland-ilp" },
    { name: "Mizoram ILP", slug: "mizoram-ilp" },
    { name: "Manipur ILP", slug: "manipur-ilp" },
    { name: "Sikkim Permit", slug: "sikkim-permit" },
  ],
};

export type ArunachalPermitData = typeof arunachalPermitData;
