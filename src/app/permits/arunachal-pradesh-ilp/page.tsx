"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  FileText, 
  Clock, 
  IndianRupee, 
  Calendar,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Download,
  Phone,
  Mail,
  ExternalLink,
  Users,
  CreditCard,
  Printer,
  HelpCircle,
  Plane,
  Train,
  Car,
  Mountain,
  Shield,
  Sparkles,
  MessageCircle,
  ArrowRight,
  Info,
  AlertTriangle,
  CheckCheck,
  Copy,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DotPattern, GlowEffect } from "@/components/ui/background-patterns";
import { arunachalPermitData } from "@/data/permits/arunachal-data";

const data = arunachalPermitData;

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

const Breadcrumb = () => (
  <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
    <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
    <ChevronRight className="w-4 h-4" />
    <Link href="/permits" className="hover:text-primary-600 transition-colors">Permits</Link>
    <ChevronRight className="w-4 h-4" />
    <span className="text-foreground font-medium">Arunachal Pradesh ILP</span>
  </nav>
);

const QuickStatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  highlight = false,
  subtext 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string; 
  highlight?: boolean;
  subtext?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn(
      "p-5 rounded-2xl border transition-all duration-300",
      highlight 
        ? "bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/50 dark:to-secondary-950/50 border-primary-200 dark:border-primary-800" 
        : "bg-white/80 dark:bg-accent-800/80 border-primary-100/30 dark:border-primary-900/30"
    )}
  >
    <div className="flex items-start gap-4">
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
        highlight 
          ? "bg-gradient-to-r from-primary-500 to-secondary-500" 
          : "bg-primary-100 dark:bg-primary-900/50"
      )}>
        <Icon className={cn("w-6 h-6", highlight ? "text-white" : "text-primary-600 dark:text-primary-400")} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className={cn(
          "font-bold",
          highlight ? "text-xl text-primary-700 dark:text-primary-300" : "text-lg text-foreground dark:text-white"
        )}>
          {value}
        </p>
        {subtext && (
          <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
        )}
      </div>
    </div>
  </motion.div>
);

const StepCard = ({ step, index }: { step: typeof data.applicationSteps[0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const iconMap: Record<string, React.ElementType> = {
    Globe: Globe,
    FileText: FileText,
    CreditCard: CreditCard,
    Download: Download,
  };
  
  const Icon = iconMap[step.icon] || FileText;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Connector Line */}
      {index < data.applicationSteps.length - 1 && (
        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 to-primary-100 dark:from-primary-700 dark:to-primary-900" />
      )}
      
      <div 
        className={cn(
          "relative p-5 rounded-2xl cursor-pointer transition-all duration-300",
          "bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm",
          "border border-primary-100/30 dark:border-primary-900/30",
          "hover:border-primary-300 dark:hover:border-primary-700",
          isExpanded && "ring-2 ring-primary-500/30"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4">
          {/* Step Number */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {step.step}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground dark:text-white">
                {step.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
                  {step.duration}
                </span>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </div>
            </div>
            <p className="text-muted-foreground mt-1">{step.description}</p>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DocumentCard = ({ doc }: { doc: typeof data.documents.mandatory[0] }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="p-5 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30"
  >
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
        <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
      </div>
      <div>
        <h4 className="font-bold text-foreground dark:text-white">{doc.name}</h4>
        <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
        {"options" in doc && doc.options && (
          <div className="flex flex-wrap gap-2 mt-3">
            {doc.options.map((option) => (
              <span 
                key={option}
                className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300"
              >
                {option}
              </span>
            ))}
          </div>
        )}
        {"specifications" in doc && doc.specifications && (
          <p className="text-xs text-primary-600 dark:text-primary-400 mt-2 font-mono">
            {doc.specifications}
          </p>
        )}
        {doc.note && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {doc.note}
          </p>
        )}
      </div>
    </div>
  </motion.div>
);

const DestinationCard = ({ dest, index }: { dest: typeof data.destinations[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="p-4 rounded-xl bg-white/60 dark:bg-accent-800/60 border border-primary-100/20 dark:border-primary-900/20 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
  >
    <div className="flex items-start justify-between mb-2">
      <h4 className="font-bold text-foreground dark:text-white">{dest.name}</h4>
      <span className={cn(
        "px-2 py-0.5 text-xs rounded-full",
        dest.permitRequired === "ILP" 
          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
      )}>
        {dest.permitRequired}
      </span>
    </div>
    <p className="text-sm text-muted-foreground mb-2">{dest.highlight}</p>
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <span className="flex items-center gap-1">
        <Mountain className="w-3 h-3" />
        {dest.altitude}
      </span>
      <span className="flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        {dest.bestTime}
      </span>
    </div>
  </motion.div>
);

const FAQItem = ({ faq, index }: { faq: typeof data.faqs[0]; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="border-b border-primary-100 dark:border-primary-900/50 last:border-0"
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

const EntryPointIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "Air": return <Plane className="w-4 h-4" />;
    case "Rail": return <Train className="w-4 h-4" />;
    default: return <Car className="w-4 h-4" />;
  }
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ArunachalPradeshILPPage() {
  const [copiedPortal, setCopiedPortal] = useState(false);

  const copyPortalLink = () => {
    navigator.clipboard.writeText(data.quickStats.officialPortal);
    setCopiedPortal(true);
    setTimeout(() => setCopiedPortal(false), 2000);
  };

  return (
    <main className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-20">
        <DotPattern className="opacity-10" />
        <GlowEffect color="primary" size="lg" className="absolute -top-40 -right-40 opacity-20" />
        <GlowEffect color="secondary" size="lg" className="absolute -bottom-40 -left-40 opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
          <Breadcrumb />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-800"
            >
              <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Updated for 2025 • Official Information
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-foreground dark:text-white">Arunachal Pradesh</span>
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Inner Line Permit (ILP)
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
              {data.tagline}. Complete guide with step-by-step application process, 
              fee structure, required documents, and expert tips.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={data.quickStats.officialPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium hover:scale-105 transition-transform shadow-lg"
              >
                <Globe className="w-5 h-5" />
                Apply Now - Official Portal
                <ExternalLink className="w-4 h-4" />
              </Link>
              <Link
                href="https://wa.me/919864141211?text=Hi%20TravelSpire%20NE!%20%F0%9F%8F%94%EF%B8%8F%0A%0AI%20need%20help%20with%20Arunachal%20Pradesh%20ILP.%0A%0A%E2%80%A2%20Travel%20Dates%3A%20%0A%E2%80%A2%20Number%20of%20People%3A%20%0A%E2%80%A2%20Places%20to%20Visit%3A%20%0A%0APlease%20assist%20me!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Get Help on WhatsApp
              </Link>
            </div>

            {/* Last Updated */}
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Last updated: {data.quickStats.lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickStatCard 
              icon={IndianRupee} 
              label="Application Fee" 
              value={data.quickStats.fee.tourist15Days}
              highlight={true}
              subtext="15/30 days tourist permit"
            />
            <QuickStatCard 
              icon={Clock} 
              label="Processing Time" 
              value="24 Hours"
              subtext="Instant: ₹400"
            />
            <QuickStatCard 
              icon={Calendar} 
              label="Validity" 
              value="15-30 Days"
              subtext="Extendable at DC office"
            />
            <QuickStatCard 
              icon={Plane} 
              label="On Arrival" 
              value="Not Available"
              subtext="Apply online before travel"
            />
          </div>

          {/* Official Portal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950/50 dark:to-secondary-950/50 border border-primary-200 dark:border-primary-800"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground dark:text-white">Official e-ILP Portal</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-mono text-sm">{data.quickStats.officialPortal}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={copyPortalLink}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-accent-800 border border-primary-200 dark:border-primary-700 text-sm font-medium hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
                >
                  {copiedPortal ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copiedPortal ? "Copied!" : "Copy Link"}
                </button>
                <Link
                  href={data.quickStats.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
                >
                  Visit Portal
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>Helpline: <strong>{data.quickStats.helpline}</strong></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who Needs ILP */}
      <section className="relative py-12 md:py-16 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
              Who Needs Arunachal Pradesh ILP?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding permit requirements before planning your trip
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Required */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg text-amber-800 dark:text-amber-200">ILP Required</h3>
              </div>
              <ul className="space-y-3">
                {data.whoNeeds.required.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-300">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Not Required */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg text-green-800 dark:text-green-200">ILP Not Required</h3>
              </div>
              <ul className="space-y-3">
                {data.whoNeeds.notRequired.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Foreigners */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-secondary-50 dark:bg-secondary-950/30 border border-secondary-200 dark:border-secondary-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg text-secondary-800 dark:text-secondary-200">Foreign Nationals</h3>
              </div>
              <p className="text-sm text-secondary-700 dark:text-secondary-300">
                {data.whoNeeds.foreigners}
              </p>
              <Link
                href="https://indianfrro.gov.in/eservices/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-secondary-600 dark:text-secondary-400 hover:underline"
              >
                Apply for PAP on e-FRRO
                <ExternalLink className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Steps */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
              How to Apply for Arunachal Pradesh ILP Online
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Step-by-step guide to get your Inner Line Permit in under 30 minutes
            </p>
          </motion.div>

          <div className="space-y-4">
            {data.applicationSteps.map((step, index) => (
              <StepCard key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="relative py-12 md:py-16 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
              Documents Required for Arunachal Pradesh ILP
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Keep these documents ready before starting your application
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {data.documents.mandatory.map((doc, index) => (
              <DocumentCard key={index} doc={doc} />
            ))}
          </div>

          {/* Document Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800"
          >
            <h3 className="font-bold text-lg text-amber-800 dark:text-amber-200 flex items-center gap-2 mb-4">
              <Info className="w-5 h-5" />
              Important Tips for Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.documents.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-300">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {tip}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Entry Points */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
              Entry Points to Arunachal Pradesh
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              ILP checkpoints where your permit will be verified
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.entryPoints.map((point, index) => (
              <motion.div
                key={point.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-5 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                    <EntryPointIcon type={point.type} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-white">{point.name}</h4>
                    <p className="text-sm text-muted-foreground">{point.from}</p>
                    <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">{point.note}</p>
                  </div>
                </div>
                <span className="inline-block mt-3 px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
                  {point.type}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="relative py-12 md:py-16 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
              Popular Destinations in Arunachal Pradesh
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Places you can visit with your ILP
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.destinations.map((dest, index) => (
              <DestinationCard key={dest.name} dest={dest} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link
              href="/states/arunachal-pradesh"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              Explore all destinations in Arunachal Pradesh
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Special Permits (RAP) */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
              Restricted Area Permits (RAP)
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {data.specialPermits.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.specialPermits.areas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-foreground dark:text-white">{area.name}</h4>
                  <Shield className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{area.location}</p>
                <p className="text-xs text-red-600 dark:text-red-400 mb-3">{area.note}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className={cn(
                    "px-2 py-1 rounded-full",
                    area.indiansAllowed 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                  )}>
                    Indians: {area.indiansAllowed ? "✓" : "✗"}
                  </span>
                  <span className={cn(
                    "px-2 py-1 rounded-full",
                    area.foreignersAllowed 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                  )}>
                    Foreigners: {area.foreignersAllowed ? "✓" : "✗"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30"
          >
            <h3 className="font-bold text-lg text-foreground dark:text-white mb-2">How to Get RAP?</h3>
            <p className="text-muted-foreground">{data.specialPermits.howToApply}</p>
          </motion.div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="relative py-12 md:py-16 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
              Important Tips for Arunachal Pradesh ILP
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pro tips from experienced travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.tips.map((tip, index) => {
              const iconMap: Record<string, React.ElementType> = {
                Clock: Clock,
                Printer: Printer,
                CreditCard: CreditCard,
                Calendar: Calendar,
                MapPin: MapPin,
                Users: Users,
              };
              const Icon = iconMap[tip.icon] || Info;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground dark:text-white mb-1">{tip.title}</h4>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Arunachal Pradesh ILP
            </p>
          </motion.div>

          <div className="bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm rounded-2xl border border-primary-100/30 dark:border-primary-900/30 p-6 md:p-8">
            {data.faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Help */}
      <section className="relative py-12 md:py-16 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
              Need Help with Your ILP?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Official contacts and our expert assistance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Official Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30"
            >
              <h3 className="font-bold text-lg text-foreground dark:text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                Official Contacts
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-950/30">
                  <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">Toll-Free Helpline</p>
                    <p className="font-bold text-foreground dark:text-white">{data.contact.officialHelpline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-950/30">
                  <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-bold text-foreground dark:text-white">{data.contact.officialEmail}</p>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-foreground dark:text-white mt-6 mb-3">Arunachal Bhawan Offices</h4>
              <div className="space-y-2">
                {data.contact.arunachalBhawans.map((office) => (
                  <div key={office.city} className="text-sm p-2 rounded-lg bg-accent-50 dark:bg-accent-900/30">
                    <span className="font-medium text-foreground dark:text-white">{office.city}:</span>{" "}
                    <span className="text-muted-foreground">{office.phone}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Our Assistance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white"
            >
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                Let Us Handle It For You!
              </h3>
              <p className="text-white/90 mb-6">
                Don&apos;t want to deal with the hassle? Our local experts can help you get your ILP quickly and correctly. We&apos;ve helped 1000+ travelers!
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Quick processing assistance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Document verification support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  RAP arrangement for border areas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Complete tour packages available
                </li>
              </ul>

              <Link
                href="https://wa.me/919864141211?text=Hi%20TravelSpire%20NE!%20%F0%9F%8F%94%EF%B8%8F%0A%0AI%20need%20help%20with%20Arunachal%20Pradesh%20ILP.%0A%0A%E2%80%A2%20Travel%20Dates%3A%20%0A%E2%80%A2%20Number%20of%20People%3A%20%0A%E2%80%A2%20Places%20to%20Visit%3A%20%0A%0APlease%20assist%20me!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-green-600 font-bold hover:bg-green-50 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Get Help on WhatsApp
              </Link>

              <p className="text-white/80 text-sm mt-4">
                📞 +91 98641 41211 • Based in Dibrugarh, Assam
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Permits */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
              Explore Other State Permits
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Planning to visit multiple northeastern states? Check out our other guides.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.relatedPages.map((page, index) => (
              <motion.div
                key={page.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/permits/${page.slug}`}
                  className="block p-5 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-lg text-center"
                >
                  <h4 className="font-bold text-foreground dark:text-white">{page.name}</h4>
                  <span className="inline-flex items-center gap-1 mt-2 text-sm text-primary-600 dark:text-primary-400">
                    View Guide
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link
              href="/permits"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              View all permit guides
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
