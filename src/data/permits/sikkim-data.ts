// Sikkim Permit Complete Data
// SEO-optimized content for state-specific permit page

export const sikkimPermitData = {
  state: "Sikkim",
  slug: "sikkim-permit",
  title: "Sikkim Permit Guide 2025",
  tagline: "Complete Guide to Protected Area Permits for the Land of Kangchenjunga",
  
  seo: {
    title: "Sikkim Permit 2025: Nathula Pass, Gurudongmar Lake, North Sikkim | Complete Guide",
    description: "Sikkim permit guide 2025. General areas: No permit needed. Nathula Pass, North Sikkim, Gurudongmar require PAP. Indians only at Nathula. Foreigners restrictions apply.",
    keywords: [
      "sikkim permit", "nathula pass permit", "gurudongmar lake permit", "north sikkim permit",
      "sikkim pap", "sikkim protected area permit", "tsomgo lake permit", "gangtok permit",
      "sikkim travel permit 2025", "foreigners sikkim permit",
    ],
    canonical: "https://travelspirene.com/permits/sikkim-permit",
  },

  quickStats: {
    generalAreas: "No Permit Required",
    protectedAreas: "PAP Required",
    fee: { general: "Free", protectedAreas: "₹200-500 via Travel Agent" },
    processingTime: { protectedAreas: "1 day (through travel agent)" },
    foreignersNote: "Nathula: NO foreigners allowed. Gurudongmar: Only till Thangu.",
    officialPortal: "https://sikkimtourism.gov.in",
    lastUpdated: "January 2025",
  },

  permitZones: [
    {
      zone: "General Areas (No Permit)",
      places: ["Gangtok", "Pelling", "Ravangla", "Namchi", "Yuksom", "Lachung"],
      indiansAllowed: true,
      foreignersAllowed: true,
      permitRequired: false,
    },
    {
      zone: "Tsomgo Lake & Baba Mandir",
      places: ["Tsomgo Lake (Changu)", "Baba Harbhajan Singh Mandir"],
      indiansAllowed: true,
      foreignersAllowed: true,
      permitRequired: true,
      note: "Permit at Police Check Post or through agent",
    },
    {
      zone: "Nathula Pass",
      places: ["Nathula Pass (Indo-China Border)"],
      indiansAllowed: true,
      foreignersAllowed: false,
      permitRequired: true,
      note: "INDIANS ONLY. Open Wed-Sun. Closed Mon-Tue.",
    },
    {
      zone: "North Sikkim",
      places: ["Lachung", "Yumthang Valley", "Zero Point", "Lachen", "Gurudongmar Lake"],
      indiansAllowed: true,
      foreignersAllowed: true,
      permitRequired: true,
      note: "Foreigners allowed only till Thangu (not Gurudongmar)",
    },
  ],

  whoNeeds: {
    noPermitRequired: [
      "Gangtok, Pelling, Ravangla, Namchi - Open to all",
      "Yuksom, Rinchenpong, Kaluk - No restrictions",
      "Most tourist areas in East and South Sikkim",
    ],
    permitRequired: [
      "Tsomgo Lake & Baba Mandir - PAP needed (Indians & Foreigners)",
      "Nathula Pass - PAP needed (Indians ONLY, no foreigners)",
      "North Sikkim (Lachung, Lachen, Yumthang) - PAP needed",
      "Gurudongmar Lake - Indians only (foreigners till Thangu only)",
    ],
    foreignerRestrictions: [
      "Nathula Pass - Completely restricted for foreigners",
      "Gurudongmar Lake - Foreigners allowed only till Thangu",
      "Some border areas have additional restrictions",
    ],
  },

  howToGet: {
    throughAgent: {
      title: "Through Registered Travel Agent (Recommended)",
      steps: [
        "Book through a Sikkim Tourism registered travel agent",
        "Provide: 2 passport photos, ID proof copy, vehicle details",
        "Agent applies on your behalf",
        "Permit issued within 1 day",
        "Agent handles all paperwork",
      ],
      cost: "₹200-500 (included in tour package usually)",
    },
    atCheckPost: {
      title: "At Police Check Post (Tsomgo/Baba Mandir only)",
      steps: [
        "Reach Gangtok and hire a vehicle",
        "Driver applies for permit at check post",
        "Carry original ID proof",
        "Permit issued on the spot",
      ],
      note: "Only for Tsomgo Lake and Baba Mandir route",
    },
  },

  destinations: [
    { name: "Gangtok", highlight: "State capital, MG Marg, Rumtek Monastery", permitRequired: "None", foreignersAllowed: true, bestTime: "Mar-Jun, Sep-Dec", altitude: "1,650m" },
    { name: "Tsomgo Lake", highlight: "Sacred glacial lake, yak rides", permitRequired: "PAP", foreignersAllowed: true, bestTime: "Mar-Jun, Oct-Dec", altitude: "3,753m" },
    { name: "Nathula Pass", highlight: "Indo-China border, historic Silk Route", permitRequired: "PAP", foreignersAllowed: false, bestTime: "Mar-Jun, Sep-Nov", altitude: "4,310m" },
    { name: "Yumthang Valley", highlight: "Valley of Flowers, hot springs", permitRequired: "PAP", foreignersAllowed: true, bestTime: "Mar-Jun", altitude: "3,564m" },
    { name: "Gurudongmar Lake", highlight: "One of highest lakes, sacred", permitRequired: "PAP", foreignersAllowed: false, bestTime: "Mar-Jun, Oct-Nov", altitude: "5,183m" },
    { name: "Pelling", highlight: "Kanchenjunga views, monasteries", permitRequired: "None", foreignersAllowed: true, bestTime: "Mar-Jun, Sep-Dec", altitude: "2,150m" },
    { name: "Zero Point", highlight: "Highest point tourists can visit", permitRequired: "PAP", foreignersAllowed: true, bestTime: "Mar-May", altitude: "4,572m" },
    { name: "Lachung", highlight: "Gateway to Yumthang, scenic village", permitRequired: "PAP", foreignersAllowed: true, bestTime: "Mar-Jun, Sep-Dec", altitude: "2,700m" },
  ],

  faqs: [
    { question: "Do I need permit for Gangtok?", answer: "No, Gangtok and most general tourist areas in Sikkim do not require any permit for Indians or foreigners. You can freely visit Gangtok, Pelling, Namchi, Ravangla, and similar areas." },
    { question: "How to get Nathula Pass permit?", answer: "Nathula permit must be obtained through a registered travel agent in Gangtok. Provide 2 photos and ID proof. Open only Wednesday to Sunday. INDIANS ONLY - foreigners are not allowed." },
    { question: "Can foreigners visit Nathula Pass?", answer: "No, Nathula Pass is strictly restricted for foreigners. Only Indian citizens can visit Nathula Pass. Foreigners can visit Tsomgo Lake but not proceed to Nathula." },
    { question: "What is Sikkim PAP?", answer: "Sikkim Protected Area Permit (PAP) is required for visiting protected/restricted areas like Nathula, North Sikkim, Tsomgo Lake. It's obtained through travel agents, not directly by tourists." },
    { question: "Can foreigners visit Gurudongmar Lake?", answer: "Foreigners are allowed only till Thangu village. They cannot proceed to Gurudongmar Lake due to its proximity to the China border. Only Indian citizens can visit Gurudongmar Lake." },
    { question: "How much does Sikkim permit cost?", answer: "General areas: Free. Protected areas: ₹200-500 through travel agent (often included in tour package). The permit fee varies by destination and agent." },
    { question: "How to get North Sikkim permit?", answer: "North Sikkim permit (for Lachung, Yumthang, Lachen, Gurudongmar) must be obtained through a registered travel agent. Provide ID proof and photos. Processing takes 1 day." },
    { question: "Is Tsomgo Lake permit available on the spot?", answer: "Yes, for Tsomgo Lake and Baba Mandir, your vehicle driver can get permit at the police check post. Carry original ID proof. Most convenient option." },
    { question: "When is Nathula Pass open?", answer: "Nathula Pass is open Wednesday to Sunday, closed Monday and Tuesday. It may also close during heavy snowfall (December-February) or for security reasons." },
    { question: "Do I need ILP for Sikkim?", answer: "No, Sikkim does not require Inner Line Permit (ILP). It requires Protected Area Permit (PAP) only for specific restricted areas. General areas are permit-free." },
  ],

  tips: [
    { title: "Book Through Agent", description: "All protected area permits must go through registered travel agents. You cannot apply directly.", icon: "Users" },
    { title: "Nathula: Indians Only", description: "Nathula Pass is strictly for Indian citizens. Foreigners cannot visit under any circumstances.", icon: "AlertCircle" },
    { title: "Carry Original ID", description: "Original photo ID is mandatory at all checkpoints. No photocopies accepted.", icon: "CreditCard" },
    { title: "Check Weather", description: "High altitude areas may be closed due to snow in winter (Dec-Feb). Check conditions before booking.", icon: "Cloud" },
    { title: "Acclimatize", description: "Gurudongmar (5,183m) and Nathula (4,310m) are high altitude. Acclimatize in Gangtok first.", icon: "Mountain" },
    { title: "Book in Advance", description: "Peak season (Oct-Nov, Mar-May) sees high demand. Book permits 2-3 days in advance.", icon: "Calendar" },
  ],

  contact: {
    officialPortal: "https://sikkimtourism.gov.in",
    tourismOffice: "Sikkim Tourism, MG Marg, Gangtok",
    helpline: "Tourism Information Centre, Gangtok",
  },

  relatedPages: [
    { name: "Arunachal Pradesh ILP", slug: "arunachal-pradesh-ilp" },
    { name: "Nagaland ILP", slug: "nagaland-ilp" },
    { name: "Mizoram ILP", slug: "mizoram-ilp" },
    { name: "Manipur ILP", slug: "manipur-ilp" },
  ],
};

export type SikkimPermitData = typeof sikkimPermitData;
