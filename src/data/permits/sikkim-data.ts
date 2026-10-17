// Sikkim Permit Complete Data
// SEO-optimized content for state-specific permit page

export const sikkimPermitData = {
  state: "Sikkim",
  slug: "sikkim-permit",
  title: "Sikkim Permit Guide 2026",
  tagline: "Complete Guide to Protected Area Permits for the Land of Kangchenjunga",
  
  seo: {
    title: "Sikkim Permit 2026: Nathula Pass, Gurudongmar Lake, North Sikkim | Complete Guide",
    description: "Sikkim permit guide 2026. Indians need no permit for Gangtok or Pelling; every tourist pays a ₹50 fee via the hotel. Nathula, North Sikkim and Gurudongmar need a PAP. Foreigners need a free Sikkim RAP to enter.",
    keywords: [
      "sikkim permit", "nathula pass permit", "gurudongmar lake permit", "north sikkim permit",
      "sikkim pap", "sikkim protected area permit", "tsomgo lake permit", "gangtok permit",
      "sikkim travel permit 2026", "foreigners sikkim permit",
    ],
    canonical: "https://travelspirene.com/permits/sikkim-permit",
  },

  quickStats: {
    generalAreas: "No permit for Indians",
    protectedAreas: "PAP Required",
    fee: { general: "No permit for Indians · ₹50 TSD fee per tourist (via hotel)", protectedAreas: "₹200-500 via Travel Agent" },
    processingTime: { protectedAreas: "1 day (through travel agent)" },
    foreignersNote: "Foreigners need a free Sikkim Restricted Area Permit (RAP) to enter the state. Nathula: no foreigners. Gurudongmar: foreigners only as far as Thangu.",
    officialPortal: "https://sikkimtourism.gov.in",
    lastUpdated: "August 2026",
  },

  permitZones: [
    {
      zone: "General Areas (No permit for Indians)",
      // Lachung is North Sikkim and needs a permit — listed under that zone.
      places: ["Gangtok", "Pelling", "Ravangla", "Namchi", "Yuksom"],
      indiansAllowed: true,
      foreignersAllowed: true,
      permitRequired: false,
      note: "Foreigners need a free Sikkim RAP to enter the state",
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
      note: "Indians only. Open Wednesday to Sunday; closed Monday and Tuesday.",
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
      "Gangtok, Pelling, Ravangla, Namchi - No permit for Indians",
      "Yuksom, Rinchenpong, Kaluk - No permit for Indians",
      "Most tourist areas in East and South Sikkim",
    ],
    permitRequired: [
      "Tsomgo Lake & Baba Mandir - PAP needed (Indians & Foreigners)",
      "Nathula Pass - PAP needed (Indians only, no foreigners)",
      "North Sikkim (Lachung, Lachen, Yumthang) - PAP needed",
      "Gurudongmar Lake - Indians only (foreigners till Thangu only)",
    ],
    foreignerRestrictions: [
      "A free Sikkim Restricted Area Permit (RAP) is needed to enter the state, Gangtok included — at Rangpo, Melli, Siliguri or online",
      "Nathula Pass - Completely restricted for foreigners",
      "Gurudongmar Lake - Foreigners allowed only till Thangu",
      "Some border areas have additional restrictions",
    ],
  },

  howToGet: {
    throughAgent: {
      title: "Through a registered travel agent (recommended)",
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
      title: "At the police check post (Tsomgo and Baba Mandir only)",
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
    { name: "Gangtok", highlight: "State capital, MG Marg, Rumtek Monastery", permitRequired: "None for Indians", foreignersAllowed: true, bestTime: "Mar-Jun, Sep-Dec", altitude: "1,650m" },
    { name: "Tsomgo Lake", highlight: "Sacred glacial lake, yak rides", permitRequired: "PAP", foreignersAllowed: true, bestTime: "Mar-Jun, Oct-Dec", altitude: "3,753m" },
    { name: "Nathula Pass", highlight: "Indo-China border, historic Silk Route", permitRequired: "PAP", foreignersAllowed: false, bestTime: "Mar-Jun, Sep-Nov", altitude: "4,310m" },
    { name: "Yumthang Valley", highlight: "Valley of Flowers, hot springs", permitRequired: "PAP", foreignersAllowed: true, bestTime: "Mar-Jun", altitude: "3,564m" },
    { name: "Gurudongmar Lake", highlight: "One of highest lakes, sacred", permitRequired: "PAP", foreignersAllowed: false, bestTime: "Mar-Jun, Oct-Nov", altitude: "5,183m" },
    { name: "Pelling", highlight: "Kanchenjunga views, monasteries", permitRequired: "None for Indians", foreignersAllowed: true, bestTime: "Mar-Jun, Sep-Dec", altitude: "2,150m" },
    { name: "Zero Point", highlight: "Highest point tourists can visit", permitRequired: "PAP", foreignersAllowed: true, bestTime: "Mar-May", altitude: "4,572m" },
    { name: "Lachung", highlight: "Gateway to Yumthang, scenic village", permitRequired: "PAP", foreignersAllowed: true, bestTime: "Mar-Jun, Sep-Dec", altitude: "2,700m" },
  ],

  faqs: [
    { question: "Do I need permit for Gangtok?", answer: "Indians need no permit for Gangtok, Pelling, Namchi or Ravangla. Foreigners need a free Sikkim Restricted Area Permit (Sikkim ILP) to enter the state, issued at Rangpo, Melli, Siliguri or online. Since March 2025 every tourist also pays a ₹50 Tourism Sustainable Development fee, collected by the hotel or homestay." },
    { question: "How to get Nathula Pass permit?", answer: "Nathula permit must be obtained through a registered travel agent in Gangtok. Provide 2 photos and ID proof. Open Wednesday to Sunday only. Indians only — foreigners are not allowed." },
    { question: "Can foreigners visit Nathula Pass?", answer: "No, Nathula Pass is strictly restricted for foreigners. Only Indian citizens can visit Nathula Pass. Foreigners can visit Tsomgo Lake but not proceed to Nathula." },
    { question: "What is Sikkim PAP?", answer: "Sikkim Protected Area Permit (PAP) is required for visiting protected/restricted areas like Nathula, North Sikkim, Tsomgo Lake. It's obtained through travel agents, not directly by tourists." },
    { question: "Can foreigners visit Gurudongmar Lake?", answer: "Foreigners are allowed only till Thangu village. They cannot proceed to Gurudongmar Lake due to its proximity to the China border. Only Indian citizens can visit Gurudongmar Lake." },
    { question: "How much does Sikkim permit cost?", answer: "General areas: no permit for Indians, but every tourist pays a ₹50 Tourism Sustainable Development fee (valid 30 days, collected by your hotel or homestay; children under 5 are exempt). Protected areas: about ₹200 per person in government fees, usually ₹200-500 through a travel agent (often included in the tour package)." },
    { question: "How to get North Sikkim permit?", answer: "North Sikkim permit (for Lachung, Yumthang, Lachen, Gurudongmar) must be obtained through a registered travel agent. Provide ID proof and photos. Processing takes 1 day." },
    { question: "Is Tsomgo Lake permit available on the spot?", answer: "Yes, for Tsomgo Lake and Baba Mandir, your vehicle driver can get permit at the police check post. Carry original ID proof. Most convenient option." },
    { question: "When is Nathula Pass open?", answer: "Nathula Pass is open Wednesday to Sunday, closed Monday and Tuesday. It may also close during heavy snowfall (December-February) or for security reasons." },
    { question: "Do I need ILP for Sikkim?", answer: "Indians don't need an ILP for Sikkim. Foreigners need a free Sikkim Restricted Area Permit (also called the Sikkim ILP) to enter the state. Protected areas such as Tsomgo Lake, Nathula and North Sikkim need a PAP." },
  ],

  tips: [
    { title: "Book through an agent", description: "All protected area permits must go through registered travel agents. You cannot apply directly.", icon: "Users" },
    { title: "Nathula: Indians only", description: "Nathula Pass is strictly for Indian citizens. Foreigners cannot visit under any circumstances.", icon: "AlertCircle" },
    { title: "Carry your original ID", description: "Original photo ID is mandatory at all checkpoints. No photocopies accepted.", icon: "CreditCard" },
    { title: "Check the weather", description: "High altitude areas may be closed due to snow in winter (Dec-Feb). Check conditions before booking.", icon: "Cloud" },
    { title: "Acclimatize", description: "Gurudongmar (5,183m) and Nathula (4,310m) are high altitude. Acclimatize in Gangtok first.", icon: "Mountain" },
    { title: "Book in advance", description: "Peak season (Oct-Nov, Mar-May) sees high demand. Book permits 2-3 days in advance.", icon: "Calendar" },
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
