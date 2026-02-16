"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  FileCheck,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  MessageCircle,
  Phone,
  FileText,
  Users,
  Calendar,
  Globe,
  BadgeCheck,
  Sparkles,
  ArrowRight,
  HelpCircle,
  IndianRupee,
  Timer,
  Building2,
  Plane,
  Camera,
  Mountain,
} from "lucide-react";
import { DotPattern, GlowEffect } from "@/components/ui/background-patterns";
import { cn } from "@/lib/utils";

// ============================================================================
// DATA - Well-Researched Permit Information
// ============================================================================

const permitTypes = [
  {
    id: "ilp",
    name: "Inner Line Permit (ILP)",
    shortName: "ILP",
    description: "Required for Indian citizens to enter protected areas in select northeastern states. Based on Bengal Eastern Frontier Regulation, 1873.",
    icon: FileCheck,
    color: "primary",
    applicableFor: "Indian Citizens",
    states: ["Arunachal Pradesh", "Nagaland", "Mizoram", "Manipur"],
    validity: "15-30 days (extendable up to 1 year for workers)",
    processingTime: "Instant to 24 hours online",
    cost: "₹100 (Tourist) | ₹400 (Instant)",
    onlineAvailable: true,
    onArrival: "Mizoram only (at Lengpui Airport)",
    officialPortal: "State-specific portals",
    documents: [
      "Valid photo ID (Aadhaar/Voter ID/Driving License/Passport)",
      "Recent passport-size photograph (35x45mm, 20-50KB, JPEG)",
      "For minors: Parent/guardian's documents",
      "Documents in English or Hindi only",
    ],
    importantNotes: [
      "Must be obtained BEFORE entering the protected state",
      "Carry original permit + ID proof at all checkpoints",
      "ILP fee once paid is non-refundable",
      "Can apply via DigiLocker for document submission",
      "Extension available at DC offices within the state",
    ],
  },
  {
    id: "pap",
    name: "Protected Area Permit (PAP)",
    shortName: "PAP",
    description: "Required for foreign nationals to visit protected areas in Northeast India. Issued under Foreigners (Protected Areas) Order, 1958.",
    icon: Shield,
    color: "secondary",
    applicableFor: "Foreign Nationals",
    states: ["Arunachal Pradesh", "Nagaland", "Manipur", "Mizoram", "Parts of Sikkim"],
    validity: "30 days (non-extendable)",
    processingTime: "15-30 days (apply 30 days in advance)",
    cost: "USD $50 (Arunachal) | $30 (Other states)",
    onlineAvailable: true,
    onArrival: "Not available - must apply in advance",
    officialPortal: "https://indianfrro.gov.in/eservices/",
    documents: [
      "Valid passport with 6+ months validity",
      "Valid Indian visa",
      "4 passport-size photographs",
      "Detailed travel itinerary with dates",
      "Hotel/accommodation booking confirmations",
      "Letter from MHA-registered tour operator (mandatory)",
    ],
    importantNotes: [
      "Must travel in group of 2+ with registered tour operator",
      "Apply via e-FRRO portal at least 15-30 days before travel",
      "All PAP/RAP now issued ONLY through e-FRRO portal",
      "No physical permits issued anymore",
      "Register with FRO within 24 hours of arrival in Mizoram",
    ],
  },
  {
    id: "rap",
    name: "Restricted Area Permit (RAP)",
    shortName: "RAP",
    description: "Special permit for visiting highly sensitive border areas and military zones near international borders.",
    icon: Globe,
    color: "accent",
    applicableFor: "Indian & Foreign Nationals",
    states: ["Bum La & PTSO Lake (Tawang)", "Kibithoo (Anjaw)", "Pangsau Pass (Changlang)", "Nathula Pass (Sikkim)"],
    validity: "1-7 days (specific dates only)",
    processingTime: "7-15 working days",
    cost: "₹200-500 (Indians) | Additional fees for foreigners",
    onlineAvailable: false,
    onArrival: "Not available",
    officialPortal: "Apply via DC Office or Tour Operator",
    documents: [
      "Valid ILP (for Indians) or PAP (for foreigners)",
      "2 additional passport photographs",
      "Vehicle registration details",
      "Security clearance from DC office",
    ],
    importantNotes: [
      "Nathula: Indians only, foreigners NOT allowed",
      "Gurudongmar Lake: Foreigners allowed only till Thangu",
      "Fixed entry/exit timings enforced by military",
      "Some areas closed during certain months",
      "Photography may be restricted at border points",
    ],
  },
];

const stateWiseRequirements = [
  {
    state: "Arunachal Pradesh",
    flag: "🏔️",
    capital: "Itanagar",
    indianPermit: "ILP (Mandatory)",
    foreignerPermit: "PAP (Mandatory)",
    keyDestinations: ["Tawang", "Ziro Valley", "Mechuka", "Dong Valley", "Anini", "Pasighat"],
    fee: "₹100 (15/30 days) | ₹400 (Instant) | ₹200 (1 year)",
    specialNotes: "India's most restricted state. All visitors need permits. Border areas (Bum La, PTSO, Kibithoo) need additional RAP from DC office.",
    processingTime: "Online: Few hours to 24 hours | Offline: Same day if before 12 PM",
    entryPoints: ["Bhalukpong", "Banderdewa", "Gumto Railway Station", "Naharlagun Railway Station"],
    onArrival: "❌ Not Available - Must apply before travel",
    officialPortal: "https://eilp.arunachal.gov.in",
    helpline: "1800 345 3605 (Toll Free)",
    bestTimeToVisit: "October to April",
  },
  {
    state: "Nagaland",
    flag: "🦅",
    capital: "Kohima",
    indianPermit: "ILP (Mandatory)",
    foreignerPermit: "PAP (Mandatory)", 
    keyDestinations: ["Kohima", "Dimapur", "Mon", "Khonoma", "Dzukou Valley"],
    fee: "₹200 (Tourist - 30 days) | ₹300 (Student - 5 years) | ₹5000 (Business)",
    specialNotes: "Online applications mandatory from Dec 31, 2024. Offline applications no longer accepted. Guarantor required for most categories (except tourists & students).",
    processingTime: "Online: 1-2 working days",
    entryPoints: ["Dimapur (main entry)", "Via Manipur", "Via Assam"],
    onArrival: "❌ Not Available - Apply online only",
    officialPortal: "https://ilp.nagaland.gov.in",
    helpline: "ilphelpdesk.nagaland.gov.in",
    bestTimeToVisit: "October to May (Hornbill Festival: Dec 1-10)",
  },
  {
    state: "Mizoram",
    flag: "🌸",
    capital: "Aizawl",
    indianPermit: "ILP (Mandatory)",
    foreignerPermit: "Registration with FRO within 24 hrs",
    keyDestinations: ["Aizawl", "Champhai", "Lunglei", "Phawngpui (Blue Mountain)"],
    fee: "₹20 (Form) + ₹100 (Processing) = ₹120 total",
    specialNotes: "Temporary ILP valid for 15 days. One of India's cleanest states. Sunday strictly observed - most shops closed.",
    processingTime: "Online: Same day | Airport: On arrival",
    entryPoints: ["Lengpui Airport", "Vairengte (from Assam)", "Kanhmun (from Tripura)", "Bairabi"],
    onArrival: "✅ Available at Lengpui Airport from Security Officer",
    officialPortal: "https://ilp.mizoram.gov.in",
    helpline: "Liaison Officers in Guwahati, Kolkata, Shillong, Delhi",
    bestTimeToVisit: "October to March",
  },
  {
    state: "Manipur",
    flag: "💃",
    capital: "Imphal",
    indianPermit: "ILP (Mandatory since Dec 2019)",
    foreignerPermit: "PAP (Mandatory)",
    keyDestinations: ["Imphal", "Loktak Lake", "Kangla Fort", "Ukhrul", "Tamenglong"],
    fee: "₹100 (Temporary - 30 days) | ₹500 (Regular - 3 months) | ₹5000 (Special - 3 years)",
    specialNotes: "ILP required for all non-indigenous Indian visitors. Known for Sangai Festival (November). Foreigners governed by Foreigners Act, 1946.",
    processingTime: "Online: 1-2 working days",
    entryPoints: ["Imphal Airport", "Mao (from Nagaland)", "Jiribam (from Assam)"],
    onArrival: "❌ Not Available - Apply online before travel",
    officialPortal: "https://manipurilponline.mn.gov.in",
    helpline: "Home Department, Govt of Manipur",
    bestTimeToVisit: "October to February (Sangai Festival: November)",
  },
  {
    state: "Meghalaya",
    flag: "☁️",
    capital: "Shillong",
    indianPermit: "✅ Not Required",
    foreignerPermit: "✅ Not Required",
    keyDestinations: ["Shillong", "Cherrapunji", "Dawki", "Living Root Bridges", "Mawlynnong"],
    fee: "Free entry - No permits needed",
    specialNotes: "Most accessible northeastern state! Direct connectivity from Guwahati (100 km). No restrictions for any tourist.",
    processingTime: "N/A",
    entryPoints: ["Umroi Airport (Shillong)", "Guwahati Airport (100 km)", "Road from Guwahati"],
    onArrival: "✅ No permit needed",
    officialPortal: "https://megtourism.gov.in",
    helpline: "N/A",
    bestTimeToVisit: "September to May",
  },
  {
    state: "Assam",
    flag: "🦏",
    capital: "Dispur (Guwahati)",
    indianPermit: "✅ Not Required",
    foreignerPermit: "✅ Not Required",
    keyDestinations: ["Kaziranga", "Majuli Island", "Guwahati", "Jorhat", "Sivasagar"],
    fee: "Free entry - No permits needed (Park fees separate)",
    specialNotes: "Gateway to Northeast India. Hub for all NE travel. Kaziranga has separate park entry fees (₹50-500 Indians, $40 foreigners).",
    processingTime: "N/A",
    entryPoints: ["Guwahati Airport", "Dibrugarh Airport", "Jorhat Airport", "Rail connections"],
    onArrival: "✅ No permit needed",
    officialPortal: "https://tourism.assam.gov.in",
    helpline: "N/A",
    bestTimeToVisit: "October to April (Kaziranga: Nov-Apr)",
  },
  {
    state: "Tripura",
    flag: "🏛️",
    capital: "Agartala",
    indianPermit: "✅ Not Required",
    foreignerPermit: "✅ Not Required",
    keyDestinations: ["Agartala", "Ujjayanta Palace", "Neermahal", "Unakoti", "Jampui Hills"],
    fee: "Free entry - No permits needed",
    specialNotes: "No permits required! Rich in royal heritage and ancient temples. Shares border with Bangladesh.",
    processingTime: "N/A",
    entryPoints: ["Agartala Airport", "Rail from Kolkata/Guwahati", "Road from Assam"],
    onArrival: "✅ No permit needed",
    officialPortal: "https://tripuratourism.gov.in",
    helpline: "N/A",
    bestTimeToVisit: "October to March",
  },
  {
    state: "Sikkim",
    flag: "🏯",
    capital: "Gangtok",
    indianPermit: "PAP for restricted areas (Nathula, North Sikkim)",
    foreignerPermit: "PAP required for protected areas",
    keyDestinations: ["Gangtok", "Nathula Pass", "Pelling", "Lachung", "Gurudongmar Lake"],
    fee: "General Sikkim: Free | Protected Areas: ₹200-500 via Travel Agent",
    specialNotes: "Gangtok & general areas: No permit. Nathula: Indians only (NO foreigners). Gurudongmar: Foreigners allowed only till Thangu. All protected area permits via registered Travel Agents only.",
    processingTime: "Protected areas: 1 day (through travel agent)",
    entryPoints: ["Bagdogra Airport (124 km)", "NJP Railway Station", "Road from Siliguri"],
    onArrival: "Tsomgo-Baba Mandir: Permit at Police Check Post",
    officialPortal: "https://sikkimtourism.gov.in",
    helpline: "Tourism Information Centre, Gangtok",
    bestTimeToVisit: "March to June, September to December",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Share Your Travel Plans",
    description: "Tell us your destinations, travel dates, and group details via WhatsApp or email.",
    icon: MessageCircle,
    duration: "5 minutes",
  },
  {
    step: 2,
    title: "Document Submission",
    description: "Share required documents - we'll guide you on exactly what's needed for your specific trip.",
    icon: FileText,
    duration: "10 minutes",
  },
  {
    step: 3,
    title: "We Handle Everything",
    description: "Our team processes your application with the concerned authorities. You relax!",
    icon: BadgeCheck,
    duration: "1-15 days",
  },
  {
    step: 4,
    title: "Receive Your Permits",
    description: "Get your approved permits via email/WhatsApp - ready for your adventure!",
    icon: CheckCircle2,
    duration: "Instant delivery",
  },
];

const faqs = [
  {
    question: "How early should I apply for permits?",
    answer: "For Indian citizens, apply at least 5-7 days before travel to be safe. For foreign nationals, we recommend applying 3-4 weeks in advance as PAP processing takes longer and requires additional verifications.",
  },
  {
    question: "Can I extend my permit while traveling?",
    answer: "Yes! ILP can be extended at the district headquarters of the state you're visiting. Extensions are usually granted for valid reasons. We can guide you through the extension process remotely.",
  },
  {
    question: "What happens if I travel without a permit?",
    answer: "Traveling without required permits is a serious offense. You can be detained, fined heavily, and deported from the protected area. There are checkpoints at all entry points - it's impossible to enter without valid permits.",
  },
  {
    question: "Do children need separate permits?",
    answer: "Yes, everyone including children requires their own permit. For minors, the parent/guardian's details are included in the application along with the child's identity proof (Aadhaar for Indians).",
  },
  {
    question: "Can foreign nationals visit Arunachal Pradesh solo?",
    answer: "No, foreign nationals must travel in groups of minimum 2 people and must book through a registered tour operator. This is a government requirement for Protected Area Permits.",
  },
  {
    question: "Is there an online portal for ILP?",
    answer: "Yes! Arunachal Pradesh and Nagaland have online ILP portals. However, the process can be confusing and rejection rates are high for first-timers. We recommend using our assistance for a hassle-free experience.",
  },
  {
    question: "What if my permit application is rejected?",
    answer: "Rejections are rare when applications are properly filed. Common reasons include incomplete documents or incorrect information. If rejection happens, we reapply immediately with corrections at no extra charge.",
  },
  {
    question: "Do I need permits for transit through a state?",
    answer: "If you're just transiting (e.g., driving through Nagaland to reach Manipur), you still need transit permits. These are easier to obtain but still mandatory. We handle transit permits as part of our service.",
  },
];

const whyChooseUs = [
  {
    icon: Timer,
    title: "Same-Day Processing",
    description: "For urgent requirements, we offer expedited processing for ILP applications.",
  },
  {
    icon: Shield,
    title: "100% Success Rate",
    description: "Our expertise ensures your application is complete and accurate - no rejections.",
  },
  {
    icon: Users,
    title: "Personal Assistance",
    description: "Dedicated support throughout the process - we're just a WhatsApp message away.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    description: "No hidden charges. Government fees + our service fee - that's all you pay.",
  },
  {
    icon: FileCheck,
    title: "All Documentation",
    description: "We handle everything - from form filling to submission to delivery.",
  },
  {
    icon: Globe,
    title: "All States Covered",
    description: "Whether it's Tawang or Kohima, we process permits for all northeastern states.",
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

const FloatingCard = ({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(var(--primary-500), 0.2)" }}
    className={cn(
      "relative p-6 md:p-8 rounded-2xl",
      "bg-white/80 dark:bg-accent-800/80",
      "backdrop-blur-sm",
      "border border-primary-100/20 dark:border-primary-900/20",
      "transition-all duration-500",
      className
    )}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ 
  title, 
  subtitle, 
  description, 
  align = "center" 
}: {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "center" | "left";
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className={cn(
      "max-w-3xl mb-12 md:mb-16",
      align === "center" ? "mx-auto text-center" : "text-left"
    )}
  >
    {subtitle && (
      <span className="inline-block mb-4 text-sm font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
      <span className="block text-foreground dark:text-white">
        {title}
      </span>
    </h2>
    {description && (
      <p className="text-base md:text-lg text-muted-foreground dark:text-neutral-300">
        {description}
      </p>
    )}
  </motion.div>
);

const PermitTypeCard = ({ permit, index }: { permit: typeof permitTypes[0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = permit.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <div 
        className={cn(
          "relative p-6 md:p-8 rounded-2xl cursor-pointer",
          "bg-white/90 dark:bg-accent-800/90",
          "backdrop-blur-sm",
          "border-2 transition-all duration-300",
          isExpanded 
            ? "border-primary-500 dark:border-primary-400 shadow-xl shadow-primary-500/10" 
            : "border-primary-100/30 dark:border-primary-900/30 hover:border-primary-300 dark:hover:border-primary-700"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={cn(
              "p-3 rounded-xl",
              permit.color === "primary" && "bg-primary-100 dark:bg-primary-900/50",
              permit.color === "secondary" && "bg-secondary-100 dark:bg-secondary-900/50",
              permit.color === "accent" && "bg-accent-100 dark:bg-accent-700/50",
            )}>
              <Icon className={cn(
                "w-6 h-6",
                permit.color === "primary" && "text-primary-600 dark:text-primary-400",
                permit.color === "secondary" && "text-secondary-600 dark:text-secondary-400",
                permit.color === "accent" && "text-accent-600 dark:text-accent-300",
              )} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-foreground dark:text-white">
                  {permit.shortName}
                </h3>
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                  {permit.applicableFor}
                </span>
              </div>
              <p className="text-sm text-muted-foreground dark:text-neutral-400">
                {permit.name}
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </div>

        <p className="text-muted-foreground dark:text-neutral-300 mb-4">
          {permit.description}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="p-3 rounded-lg bg-primary-50/50 dark:bg-primary-950/30">
            <div className="text-xs text-muted-foreground dark:text-neutral-400 mb-1">Validity</div>
            <div className="text-sm font-medium text-foreground dark:text-white">{permit.validity}</div>
          </div>
          <div className="p-3 rounded-lg bg-primary-50/50 dark:bg-primary-950/30">
            <div className="text-xs text-muted-foreground dark:text-neutral-400 mb-1">Processing</div>
            <div className="text-sm font-medium text-foreground dark:text-white">{permit.processingTime}</div>
          </div>
          <div className="p-3 rounded-lg bg-primary-50/50 dark:bg-primary-950/30">
            <div className="text-xs text-muted-foreground dark:text-neutral-400 mb-1">Cost</div>
            <div className="text-sm font-medium text-foreground dark:text-white">{permit.cost}</div>
          </div>
          <div className="p-3 rounded-lg bg-primary-50/50 dark:bg-primary-950/30">
            <div className="text-xs text-muted-foreground dark:text-neutral-400 mb-1">Online</div>
            <div className="text-sm font-medium text-foreground dark:text-white">
              {permit.onlineAvailable ? "✓ Available" : "✗ Not Available"}
            </div>
          </div>
        </div>

        {/* Applicable States */}
        <div className="flex flex-wrap gap-2 mb-4">
          {permit.states.map((state) => (
            <span 
              key={state}
              className="px-3 py-1 text-xs rounded-full bg-accent-100 dark:bg-accent-800 text-accent-700 dark:text-accent-300"
            >
              {state}
            </span>
          ))}
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-primary-100 dark:border-primary-900/50 space-y-6">
                {/* Documents Required */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground dark:text-white mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary-500" />
                    Documents Required
                  </h4>
                  <ul className="space-y-2">
                    {permit.documents.map((doc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Important Notes */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground dark:text-white mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    Important Notes
                  </h4>
                  <ul className="space-y-2">
                    {permit.importantNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-neutral-300">
                        <span className="text-amber-500">•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-xs text-center text-muted-foreground mt-4">
          {isExpanded ? "Click to collapse" : "Click to see full details"}
        </p>
      </div>
    </motion.div>
  );
};

const StateCard = ({ state, index }: { state: typeof stateWiseRequirements[0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const needsPermit = state.indianPermit !== "Not Required";
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={cn(
        "relative p-5 rounded-2xl cursor-pointer transition-all duration-300",
        "bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm",
        "border-2",
        needsPermit 
          ? "border-amber-200/50 dark:border-amber-800/50" 
          : "border-green-200/50 dark:border-green-800/50",
        isExpanded && "ring-2 ring-primary-500/50"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{state.flag}</span>
          <div>
            <h3 className="font-bold text-foreground dark:text-white">{state.state}</h3>
            <p className="text-xs text-muted-foreground">{state.capital}</p>
          </div>
        </div>
        <div className={cn(
          "px-2 py-1 text-xs font-medium rounded-full",
          needsPermit 
            ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300" 
            : "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
        )}>
          {needsPermit ? "Permit Required" : "No Permit"}
        </div>
      </div>

      {/* Quick Info */}
      <div className="space-y-2 text-sm mb-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Indian Citizens:</span>
          <span className={cn(
            "font-medium",
            state.indianPermit === "Not Required" ? "text-green-600 dark:text-green-400" : "text-foreground dark:text-white"
          )}>
            {state.indianPermit}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Foreign Nationals:</span>
          <span className={cn(
            "font-medium",
            state.foreignerPermit === "Not Required" ? "text-green-600 dark:text-green-400" : "text-foreground dark:text-white"
          )}>
            {state.foreignerPermit}
          </span>
        </div>
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-primary-100 dark:border-primary-900/50 space-y-3">
              {/* Key Destinations */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Key Destinations</p>
                <div className="flex flex-wrap gap-1">
                  {state.keyDestinations.map((dest) => (
                    <span key={dest} className="px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
                      {dest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fee */}
              {state.fee && (
                <div className="flex items-start gap-2 text-sm">
                  <IndianRupee className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <span className="text-muted-foreground">Fee: </span>
                    <span className="text-foreground dark:text-white font-medium">{state.fee}</span>
                  </div>
                </div>
              )}

              {/* On Arrival */}
              {state.onArrival && (
                <div className="flex items-start gap-2 text-sm">
                  <Plane className="w-4 h-4 text-primary-500 mt-0.5" />
                  <div>
                    <span className="text-muted-foreground">On Arrival: </span>
                    <span className="text-foreground dark:text-white">{state.onArrival}</span>
                  </div>
                </div>
              )}

              {/* Processing Time */}
              {state.processingTime !== "N/A" && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary-500" />
                  <span className="text-muted-foreground">Processing:</span>
                  <span className="text-foreground dark:text-white">{state.processingTime}</span>
                </div>
              )}

              {/* Best Time */}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary-500" />
                <span className="text-muted-foreground">Best Time:</span>
                <span className="text-foreground dark:text-white">{state.bestTimeToVisit}</span>
              </div>

              {/* Entry Points */}
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary-500 mt-0.5" />
                <div>
                  <span className="text-muted-foreground">Entry Points: </span>
                  <span className="text-foreground dark:text-white">{state.entryPoints.join(", ")}</span>
                </div>
              </div>

              {/* Official Portal */}
              {state.officialPortal && state.officialPortal !== "N/A" && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-secondary-500" />
                  <span className="text-muted-foreground">Official Portal: </span>
                  <Link 
                    href={state.officialPortal.startsWith("http") ? state.officialPortal : `https://${state.officialPortal}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-secondary-600 dark:text-secondary-400 hover:underline truncate"
                  >
                    {state.officialPortal.replace("https://", "")}
                  </Link>
                </div>
              )}

              {/* Special Notes */}
              <div className="p-3 rounded-lg bg-primary-50/50 dark:bg-primary-950/30 text-sm">
                <p className="text-muted-foreground dark:text-neutral-300">
                  <span className="font-medium text-primary-600 dark:text-primary-400">Note: </span>
                  {state.specialNotes}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center gap-1 mt-3 text-xs text-muted-foreground">
        <span>{isExpanded ? "Less" : "More"} details</span>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
          <ChevronDown className="w-3 h-3" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const FAQItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "border-b border-primary-100 dark:border-primary-900/50 last:border-0",
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-start justify-between text-left"
      >
        <span className="font-medium text-foreground dark:text-white pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown className="w-5 h-5 text-primary-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground dark:text-neutral-300">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function PermitsPage() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center pt-20">
        <DotPattern className="opacity-10" />
        
        {/* Glow Effects */}
        <GlowEffect color="primary" size="lg" className="absolute -top-40 -right-40 opacity-20" />
        <GlowEffect color="secondary" size="lg" className="absolute -bottom-40 -left-40 opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-800"
            >
              <Shield className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Your Trusted Permit Partner
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-foreground dark:text-white mb-2">
                Northeast India
              </span>
              <span className="block bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500 bg-clip-text text-transparent">
                Permit Assistance
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground dark:text-neutral-300">
              Don&apos;t let paperwork stop your adventure. We handle ILP, PAP, and all travel permits 
              so you can focus on the experience of a lifetime.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Link
                href="https://wa.me/919864141211?text=Hi%20TravelSpire%20NE!%20%F0%9F%8E%AB%0A%0AI%20need%20help%20with%20travel%20permits%20for%20Northeast%20India.%20Can%20you%20assist%20with%3A%0A%E2%80%A2%20ILP%20%2F%20PAP%20processing%0A%E2%80%A2%20Documentation%20requirements%0A%E2%80%A2%20Processing%20timeline%0A%0AThank%20you!"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-6 py-3 rounded-full",
                  "text-base font-medium",
                  "bg-gradient-to-r from-green-600 to-green-700",
                  "hover:from-green-500 hover:to-green-600",
                  "text-white shadow-xl shadow-green-500/25",
                  "transition-all duration-300 hover:scale-105"
                )}
              >
                <MessageCircle className="w-5 h-5" />
                Get Permit Help on WhatsApp
              </Link>
              <Link
                href="tel:+919864141211"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-6 py-3 rounded-full",
                  "text-base font-medium",
                  "border-2 border-primary-500/50",
                  "text-primary-600 dark:text-primary-400",
                  "hover:bg-primary-50 dark:hover:bg-primary-950/50",
                  "transition-all duration-300"
                )}
              >
                <Phone className="w-5 h-5" />
                Call: +91 98641 41211
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 pt-8"
            >
              {[
                { icon: CheckCircle2, text: "100% Success Rate" },
                { icon: Clock, text: "Fast Processing" },
                { icon: Shield, text: "Official Channels" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="w-4 h-4 text-green-500" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Overview - Why Permits? */}
      <section className="relative py-16 md:py-24 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Why Do You Need Permits?"
            subtitle="Understanding Northeast India"
            description="Parts of Northeast India are protected due to their sensitive borders, unique tribal cultures, and ecological importance. Here's what you need to know."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: "Strategic Location",
                description: "Northeast India shares international borders with China, Myanmar, Bangladesh, and Bhutan. Many areas are militarily sensitive.",
                color: "text-red-500",
              },
              {
                icon: Users,
                title: "Tribal Protection",
                description: "Home to 200+ indigenous tribes with unique cultures. Permits help regulate tourism and protect traditional ways of life.",
                color: "text-amber-500",
              },
              {
                icon: Mountain,
                title: "Ecological Sensitivity",
                description: "One of the world's biodiversity hotspots. Restricted access helps preserve pristine ecosystems and wildlife.",
                color: "text-green-500",
              },
            ].map((item, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
                <div className="space-y-4">
                  <item.icon className={cn("w-10 h-10", item.color)} />
                  <h3 className="text-xl font-bold text-foreground dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground dark:text-neutral-300">
                    {item.description}
                  </p>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Permit Types Section */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Types of Permits"
            subtitle="Complete Guide"
            description="Different permits for different travelers. Click each card to learn about documents, costs, and processing times."
          />

          <div className="space-y-6">
            {permitTypes.map((permit, index) => (
              <PermitTypeCard key={permit.id} permit={permit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* State-wise Requirements */}
      <section className="relative py-16 md:py-24 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="State-wise Requirements"
            subtitle="Know Before You Go"
            description="Quick reference for all 8 northeastern states. Click any state to see detailed requirements."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stateWiseRequirements.map((state, index) => (
              <StateCard key={state.state} state={state} index={index} />
            ))}
          </div>

          {/* Quick Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="text-muted-foreground">Permit Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-muted-foreground">No Permit Needed</span>
            </div>
          </div>
        </div>
      </section>

      {/* State-Specific Detailed Guides */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Detailed State Permit Guides"
            subtitle="Complete Information"
            description="In-depth guides for each state with step-by-step application process, FAQs, and expert tips."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { state: "Arunachal Pradesh", slug: "arunachal-pradesh-ilp", type: "ILP", highlight: "₹100 fee, 24hr processing", color: "from-blue-500 to-indigo-600" },
              { state: "Nagaland", slug: "nagaland-ilp", type: "ILP", highlight: "Hornbill Festival ready", color: "from-orange-500 to-red-600" },
              { state: "Mizoram", slug: "mizoram-ilp", type: "ILP", highlight: "On arrival at airport!", color: "from-green-500 to-emerald-600" },
              { state: "Manipur", slug: "manipur-ilp", type: "ILP", highlight: "Sangai Festival ready", color: "from-purple-500 to-pink-600" },
              { state: "Sikkim", slug: "sikkim-permit", type: "PAP", highlight: "Nathula & North Sikkim", color: "from-cyan-500 to-blue-600" },
            ].map((item, index) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/permits/${item.slug}`}
                  className="block p-5 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-xl hover:scale-[1.02] group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <FileCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground dark:text-white mb-1">{item.state}</h3>
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 mb-2">
                    {item.type}
                  </span>
                  <p className="text-sm text-muted-foreground mb-3">{item.highlight}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
                    Read Full Guide
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Government Portals */}
      <section className="relative py-16 md:py-24 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Official Government Portals"
            subtitle="Apply Directly"
            description="Direct links to official state government ILP portals. We recommend using our assistance for hassle-free processing."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                state: "Arunachal Pradesh", 
                url: "https://eilp.arunachal.gov.in", 
                fee: "₹100-400",
                helpline: "1800 345 3605"
              },
              { 
                state: "Nagaland", 
                url: "https://ilp.nagaland.gov.in", 
                fee: "₹200-5000",
                helpline: "ilphelpdesk.nagaland.gov.in"
              },
              { 
                state: "Mizoram", 
                url: "https://ilp.mizoram.gov.in", 
                fee: "₹120",
                helpline: "On arrival at Lengpui Airport"
              },
              { 
                state: "Manipur", 
                url: "https://manipurilponline.mn.gov.in", 
                fee: "₹100-5000",
                helpline: "Home Department"
              },
            ].map((portal, index) => (
              <motion.div
                key={portal.state}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-5 rounded-2xl bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm border border-primary-100/30 dark:border-primary-900/30"
              >
                <h3 className="font-bold text-foreground dark:text-white mb-2">{portal.state}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-green-500" />
                    <span className="text-muted-foreground">Fee: {portal.fee}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary-500" />
                    <span className="text-muted-foreground text-xs">{portal.helpline}</span>
                  </div>
                </div>
                <Link
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-secondary-600 dark:text-secondary-400 hover:underline"
                >
                  <Globe className="w-4 h-4" />
                  Visit Official Portal
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* PAP Portal for Foreigners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-secondary-50 to-primary-50 dark:from-secondary-950/50 dark:to-primary-950/50 border border-secondary-200 dark:border-secondary-800"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-foreground dark:text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary-500" />
                  For Foreign Nationals (PAP)
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  All Protected Area Permits for foreigners are now issued exclusively through the e-FRRO portal.
                  Must apply 15-30 days in advance. Group of 2+ with registered tour operator required.
                </p>
              </div>
              <Link
                href="https://indianfrro.gov.in/eservices/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary-600 hover:bg-secondary-700 text-white text-sm font-medium transition-colors whitespace-nowrap"
              >
                <Globe className="w-4 h-4" />
                e-FRRO Portal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Help CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center"
          >
            <h3 className="font-bold text-xl mb-2">🤔 Confused by the Process?</h3>
            <p className="text-white/90 mb-4">
              Let us handle everything! We&apos;ll get your permits sorted while you plan your adventure.
            </p>
            <Link
              href="https://wa.me/919864141211?text=Hi%20TravelSpire%20NE!%20%F0%9F%8E%AB%0A%0AI%20need%20help%20with%20travel%20permits.%0A%0A%E2%80%A2%20Destination%3A%20%0A%E2%80%A2%20Travel%20Dates%3A%20%0A%E2%80%A2%20Number%20of%20People%3A%20%0A%E2%80%A2%20Nationality%3A%20Indian%20%2F%20Foreign%0A%0APlease%20help%20me%20get%20my%20permits!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-green-600 font-bold hover:bg-green-50 transition-colors shadow-lg hover:scale-105 transform duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              Get Permit Help on WhatsApp
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="How We Help"
            subtitle="Simple 4-Step Process"
            description="We've helped 1000+ travelers get their permits hassle-free. Here's how it works."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary-300 to-primary-100 dark:from-primary-700 dark:to-primary-900" />
                  )}
                  
                  <div className="relative p-6 rounded-2xl bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm border border-primary-100/30 dark:border-primary-900/30 text-center">
                    {/* Step Number */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                    
                    <div className="pt-4 space-y-4">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground dark:text-neutral-300">
                        {step.description}
                      </p>
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-xs font-medium text-primary-600 dark:text-primary-400">
                        <Timer className="w-3 h-3" />
                        {step.duration}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-16 md:py-24 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Why Choose TravelSpire NE?"
            subtitle="Our Promise"
            description="We're not just a travel company - we're locals who know the system inside out."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <FloatingCard key={index} delay={index * 0.1}>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground dark:text-neutral-300">
                      {item.description}
                    </p>
                  </div>
                </FloatingCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Got Questions?"
            description="Everything you need to know about travel permits for Northeast India."
          />

          <div className="bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm rounded-2xl border border-primary-100/30 dark:border-primary-900/30 p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>

          {/* More Questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-muted-foreground mb-4">
              Still have questions? We&apos;re here to help!
            </p>
            <Link
              href="https://wa.me/919864141211?text=Hi!%20I%20have%20a%20question%20about%20travel%20permits%20for%20Northeast%20India."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              <HelpCircle className="w-4 h-4" />
              Ask us on WhatsApp
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative rounded-[2rem] overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500" />
            <DotPattern className="opacity-20" />
            
            {/* Content */}
            <div className="relative px-6 py-16 md:px-12 md:py-24 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    Ready to Start Your Adventure?
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  Let Us Handle Your Permits
                </h2>
                
                <p className="text-lg md:text-xl text-white/90">
                  Focus on packing your bags - we&apos;ll take care of the paperwork. 
                  Get your permits sorted in minutes, not days.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link
                    href="https://wa.me/919864141211?text=Hi%20TravelSpire%20NE!%20%F0%9F%8E%AB%0A%0AI%20need%20permit%20assistance%20for%20my%20upcoming%20trip%20to%20Northeast%20India.%0A%0AMy%20details%3A%0A%E2%80%A2%20Destination%3A%20%0A%E2%80%A2%20Travel%20Dates%3A%20%0A%E2%80%A2%20Number%20of%20People%3A%20%0A%E2%80%A2%20Nationality%3A%20Indian%20%2F%20Foreign%0A%0APlease%20guide%20me%20through%20the%20permit%20process.%20Thank%20you!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary-600 hover:bg-primary-50 text-lg font-medium transition-all duration-300 shadow-xl hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Get Started on WhatsApp
                  </Link>
                  <Link
                    href="/all-tours"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 text-lg font-medium transition-all duration-300"
                  >
                    <Camera className="w-5 h-5" />
                    Explore Our Tours
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap justify-center gap-6 pt-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+91 98641 41211</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Dibrugarh, Assam</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
