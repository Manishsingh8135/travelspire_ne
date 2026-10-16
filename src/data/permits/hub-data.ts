// Permits hub — which permit, for whom, in which state.
//
// Facts mirror the state data files (checked August–October 2026). Marketing
// claims the old page made ("100% success rate", "1000+ travellers",
// "same-day processing", "rejection rates are high") were removed: none of
// them could be backed up.

export const permitsHubSeo = {
  title: "Northeast India Permits: ILP, PAP & Border Permits by State",
  description:
    "Which permit you need for Arunachal Pradesh, Nagaland, Mizoram, Manipur and Sikkim — Inner Line Permits for Indians, Protected Area Permits for foreigners, fees, processing time and the official portals.",
  canonical: "https://travelspirene.com/permits",
  lastChecked: "October 2026",
};

export type StateRequirement = {
  state: string;
  slug?: string;
  indians: string;
  foreigners: string;
  fee: string;
  apply: string;
  portal?: string;
  note: string;
  needsPermit: boolean;
};

export const stateRequirements: StateRequirement[] = [
  {
    state: "Arunachal Pradesh",
    slug: "arunachal-pradesh-ilp",
    indians: "ILP",
    foreigners: "PAP",
    fee: "₹300 (up to 3 days) · ₹500 (4–14 days)",
    apply: "Online, usually approved within a day",
    portal: "https://eilp.arunachal.gov.in",
    note: "No permit on arrival. Bum La, PT Tso and Sangetsar Lake need an extra DC day-permit, Indians only.",
    needsPermit: true,
  },
  {
    state: "Nagaland",
    slug: "nagaland-ilp",
    indians: "ILP",
    foreigners: "PAP",
    fee: "₹200 tourist (30 days)",
    apply: "Online only, 1–2 working days",
    portal: "https://ilp.nagaland.gov.in",
    note: "Needed even to drive through. Offline applications stopped on 31 Dec 2024.",
    needsPermit: true,
  },
  {
    state: "Mizoram",
    slug: "mizoram-ilp",
    indians: "ILP",
    foreigners: "Register with the FRO within 24 hours",
    fee: "₹120 (15 days)",
    apply: "Online the same day, or on arrival at Lengpui Airport",
    portal: "https://ilp.mizoram.gov.in",
    note: "The only Northeast state that issues an ILP on arrival. Sundays are strictly observed.",
    needsPermit: true,
  },
  {
    state: "Manipur",
    slug: "manipur-ilp",
    indians: "ILP",
    foreigners: "PAP",
    fee: "₹100 temporary (30 days)",
    apply: "Online, 1–2 working days",
    portal: "https://manipurilponline.mn.gov.in",
    note: "Required for non-indigenous visitors since December 2019.",
    needsPermit: true,
  },
  {
    state: "Sikkim",
    slug: "sikkim-permit",
    indians: "Permit for protected zones only",
    foreigners: "PAP for protected zones; some closed",
    fee: "Free · ₹200–500 for protected zones",
    apply: "Through a registered agent, about a day",
    portal: "https://sikkimtourism.gov.in",
    note: "Gangtok and Pelling are open. Nathula is Indians only; foreigners stop at Thangu, short of Gurudongmar.",
    needsPermit: true,
  },
  {
    state: "Meghalaya",
    indians: "None",
    foreigners: "None",
    fee: "Free",
    apply: "—",
    note: "No permits. About 100 km from Guwahati by road.",
    needsPermit: false,
  },
  {
    state: "Assam",
    indians: "None",
    foreigners: "None",
    fee: "Free (park fees separate)",
    apply: "—",
    note: "The gateway state. Kaziranga charges its own park entry fees.",
    needsPermit: false,
  },
  {
    state: "Tripura",
    indians: "None",
    foreigners: "None",
    fee: "Free",
    apply: "—",
    note: "No permits. Borders Bangladesh.",
    needsPermit: false,
  },
];

export const permitTypes = [
  {
    id: "ilp",
    name: "Inner Line Permit",
    shortName: "ILP",
    who: "Indian citizens from outside the state",
    basis: "Bengal Eastern Frontier Regulation, 1873",
    states: "Arunachal Pradesh, Nagaland, Mizoram, Manipur",
    validity: "Varies by state — Arunachal tourist eILP up to 14 days",
    processing: "Usually within a day to two working days, online",
    cost: "₹100 – ₹500 for tourists, by state",
    onArrival: "Mizoram only, at Lengpui Airport",
    documents: [
      "A valid photo ID — Aadhaar, Voter ID, driving licence or passport",
      "A recent passport-size photograph (Arunachal: 35×45 mm, 20–50 KB JPEG)",
      "For minors: a parent or guardian's documents",
      "Documents in English or Hindi",
    ],
    notes: [
      "Get it before you enter the state",
      "Carry the permit and the original ID you applied with to every checkpoint",
      "Fees are non-refundable",
      "Arunachal accepts documents from DigiLocker",
      "Extensions are handled by the district office inside the state",
    ],
  },
  {
    id: "pap",
    name: "Protected Area Permit",
    shortName: "PAP",
    who: "Foreign nationals, including NRI, PIO and OCI holders",
    basis: "Foreigners (Protected Areas) Order, 1958",
    states: "Arunachal Pradesh, Nagaland, Manipur and parts of Sikkim",
    validity: "Up to 30 days",
    processing: "Apply 15–30 days ahead on e-FRRO",
    cost: "Arunachal: USD 30 royalty per person · other states: check current rules",
    onArrival: "Not available",
    documents: [
      "Passport valid for six months or more",
      "A valid Indian visa",
      "Passport-size photographs",
      "A day-by-day itinerary with dates",
      "Accommodation confirmations",
      "A letter from a registered tour operator",
    ],
    notes: [
      "Travel in a group of two or more through a registered tour operator",
      "Issued only through the e-FRRO portal — no paper permits",
      "Solo travel needs prior Home Ministry clearance",
      "In Mizoram, register with the FRO within 24 hours of arrival",
    ],
  },
  {
    id: "border",
    name: "Border-area permits",
    shortName: "Border",
    who: "Anyone going to specific points near the international border",
    basis: "Issued locally by the district or the army",
    states: "Bum La, PT Tso and Sangetsar Lake (Tawang) · Lamang beyond Mechuka · Nathula and North Sikkim",
    validity: "The day or dates you are permitted",
    processing: "A day ahead in Tawang; same day in Mechuka; about a day in Sikkim",
    cost: "Small local fees; Sikkim ₹200–500 through an agent",
    onArrival: "Arranged locally — not online",
    documents: [
      "Your ILP (Indians) or PAP (foreigners)",
      "Original photo ID and spare passport photos",
      "Vehicle details — the permit is usually issued with the vehicle",
    ],
    notes: [
      "Bum La, PT Tso, Sangetsar and Nathula are for Indian citizens only",
      "Foreigners may go only as far as Thangu in North Sikkim",
      "Entry and exit times are fixed; the Bum La road closes by early afternoon",
      "Photography can be restricted at border points",
    ],
  },
];

export const whyPermits = [
  {
    title: "Borders",
    body: "Northeast India borders China, Myanmar, Bangladesh and Bhutan, and several areas near those borders are militarily sensitive.",
  },
  {
    title: "Tribal land",
    body: "The permit system protects land and livelihoods of the indigenous communities that live here, and regulates how many outsiders arrive.",
  },
  {
    title: "Fragile country",
    body: "Much of the region is forest and high mountain. Controlled access limits pressure on places that have few roads and little infrastructure.",
  },
];

export const officialPortals = [
  { state: "Arunachal Pradesh", label: "eILP portal", url: "https://eilp.arunachal.gov.in", contact: "1800 345 3605 (toll free)" },
  { state: "Nagaland", label: "ILP portal", url: "https://ilp.nagaland.gov.in", contact: "ilphelpdesk.nagaland.gov.in" },
  { state: "Mizoram", label: "ILP portal", url: "https://ilp.mizoram.gov.in", contact: "Or on arrival at Lengpui Airport" },
  { state: "Manipur", label: "ILP portal", url: "https://manipurilponline.mn.gov.in", contact: "Home Department, Govt of Manipur" },
  { state: "Foreign nationals", label: "e-FRRO (PAP)", url: "https://indianfrro.gov.in/eservices/", contact: "Apply 15–30 days ahead" },
];

export const helpSteps = [
  { title: "Tell us the trip", body: "Destinations, dates, group size and nationality — on WhatsApp or email." },
  { title: "Send the documents", body: "We tell you exactly what each state needs for your route, and check them before filing." },
  { title: "We file with the authorities", body: "On the official portals, or locally for border permits. An ILP usually takes one or two days; a PAP two to four weeks." },
  { title: "You receive the permits", body: "Approved permits come to you by email or WhatsApp, with a note on what to print and carry." },
];

export const permitsHubFaqs = [
  {
    question: "Which Northeast Indian states require travel permits?",
    answer:
      "Arunachal Pradesh, Nagaland, Mizoram and Manipur need an Inner Line Permit for Indian citizens from outside the state. Meghalaya, Assam and Tripura need none. Sikkim has no ILP but requires a permit for protected zones like Tsomgo Lake, Nathula and North Sikkim.",
  },
  {
    question: "How early should I apply for permits?",
    answer:
      "Indian citizens should apply five to seven days before travel, and earlier in festival season. Foreign nationals should apply three to four weeks ahead, because the PAP goes through e-FRRO and needs a registered tour operator.",
  },
  {
    question: "Is there an online portal for the ILP?",
    answer:
      "Yes. Arunachal Pradesh (eilp.arunachal.gov.in), Nagaland (ilp.nagaland.gov.in), Mizoram (ilp.mizoram.gov.in) and Manipur (manipurilponline.mn.gov.in) all take applications online. The forms are straightforward; if you book a trip with us, we file them for you.",
  },
  {
    question: "Can I extend my permit while travelling?",
    answer:
      "Usually, yes — at the district office of the state you are in, before the permit expires. Extensions are at the office's discretion, so plan the full stay up front where you can.",
  },
  {
    question: "What happens if I travel without a permit?",
    answer:
      "Travelling without a required permit is an offence. You can be fined, detained or turned back, and every entry point has a checkpoint.",
  },
  {
    question: "Do children need separate permits?",
    answer:
      "Yes, everyone needs a permit, including infants. For minors, the parent or guardian's details go into the application with the child's ID.",
  },
  {
    question: "Can foreign nationals visit Arunachal Pradesh solo?",
    answer:
      "Not without prior clearance. A Protected Area Permit is issued to groups of two or more travelling through a registered tour operator; solo travel needs Home Ministry approval.",
  },
  {
    question: "What if my application is rejected?",
    answer:
      "Rejections usually come from a name that doesn't match the ID, an unreadable scan or a photo outside the size limits. Correct the detail and apply again. On our trips we handle any resubmission.",
  },
  {
    question: "Do I need a permit just to pass through a state?",
    answer:
      "In Nagaland, yes — the ILP is required even for transit. Check the state guide for any state on your route.",
  },
];
