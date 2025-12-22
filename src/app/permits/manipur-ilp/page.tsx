"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, FileText, Clock, IndianRupee, Calendar, MapPin, CheckCircle2, AlertCircle, ChevronDown, ChevronRight, Download, ExternalLink, CreditCard, Printer, Plane, Train, Car, Mountain, Sparkles, MessageCircle, ArrowRight, Info, CheckCheck, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { DotPattern, GlowEffect } from "@/components/ui/background-patterns";
import { manipurPermitData } from "@/data/permits/manipur-data";

const data = manipurPermitData;

const Breadcrumb = () => (
  <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
    <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
    <ChevronRight className="w-4 h-4" />
    <Link href="/permits" className="hover:text-primary-600 transition-colors">Permits</Link>
    <ChevronRight className="w-4 h-4" />
    <span className="text-foreground font-medium">Manipur ILP</span>
  </nav>
);

const QuickStatCard = ({ icon: Icon, label, value, highlight = false, subtext }: { icon: React.ElementType; label: string; value: string; highlight?: boolean; subtext?: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className={cn("p-5 rounded-2xl border", highlight ? "bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/50 dark:to-secondary-950/50 border-primary-200 dark:border-primary-800" : "bg-white/80 dark:bg-accent-800/80 border-primary-100/30 dark:border-primary-900/30")}>
    <div className="flex items-start gap-4">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", highlight ? "bg-gradient-to-r from-primary-500 to-secondary-500" : "bg-primary-100 dark:bg-primary-900/50")}>
        <Icon className={cn("w-6 h-6", highlight ? "text-white" : "text-primary-600 dark:text-primary-400")} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className={cn("font-bold", highlight ? "text-xl text-primary-700 dark:text-primary-300" : "text-lg text-foreground dark:text-white")}>{value}</p>
        {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
      </div>
    </div>
  </motion.div>
);

const StepCard = ({ step, index }: { step: typeof data.applicationSteps[0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative">
      {index < data.applicationSteps.length - 1 && <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 to-primary-100 dark:from-primary-700 dark:to-primary-900" />}
      <div className={cn("relative p-5 rounded-2xl cursor-pointer bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30", isExpanded && "ring-2 ring-primary-500/30")} onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg">{step.step}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground dark:text-white">{step.title}</h3>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">{step.duration}</span>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}><ChevronDown className="w-5 h-5 text-muted-foreground" /></motion.div>
              </div>
            </div>
            <p className="text-muted-foreground mt-1">{step.description}</p>
            <AnimatePresence>{isExpanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <ul className="mt-4 space-y-2">
                  {step.details.map((d, i) => <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />{d}</li>)}
                </ul>
              </motion.div>
            )}</AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FAQItem = ({ faq, index }: { faq: typeof data.faqs[0]; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-b border-primary-100 dark:border-primary-900/50 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 flex items-start justify-between text-left">
        <span className="font-medium text-foreground dark:text-white pr-4">{faq.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown className="w-5 h-5 text-primary-500" /></motion.div>
      </button>
      <AnimatePresence>{isOpen && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-5 text-muted-foreground overflow-hidden">{faq.answer}</motion.p>}</AnimatePresence>
    </motion.div>
  );
};

export default function ManipurILPPage() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(data.quickStats.officialPortal); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <main className="relative w-full overflow-hidden">
      <section className="relative min-h-[60vh] flex items-center pt-20">
        <DotPattern className="opacity-10" />
        <GlowEffect color="primary" size="lg" className="absolute -top-40 -right-40 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
          <Breadcrumb />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-800">
              <Sparkles className="w-4 h-4 text-primary-600" /><span className="text-sm font-medium text-primary-700 dark:text-primary-300">Updated 2025 • Sangai Festival Ready</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold"><span className="text-foreground dark:text-white">Manipur</span><br /><span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Inner Line Permit (ILP)</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">{data.tagline}. Complete guide for Imphal, Loktak Lake, and Sangai Festival.</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href={data.quickStats.officialPortal} target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium hover:scale-105 transition-transform shadow-lg"><Globe className="w-5 h-5" />Apply Online<ExternalLink className="w-4 h-4" /></Link>
              <Link href="https://wa.me/919864141211?text=Hi%20TravelSpire%20NE!%20%F0%9F%92%83%0AI%20need%20help%20with%20Manipur%20ILP.%0APlease%20assist!" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium"><MessageCircle className="w-5 h-5" />Get Help on WhatsApp</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickStatCard icon={IndianRupee} label="Temporary Fee" value={data.quickStats.fee.temporary30Days} highlight subtext="30 days" />
            <QuickStatCard icon={Clock} label="Processing" value="1-2 Days" subtext="Online application" />
            <QuickStatCard icon={Calendar} label="Validity" value="30 Days" subtext="Up to 3 years available" />
            <QuickStatCard icon={Plane} label="On Arrival" value="Not Available" subtext="Apply online before travel" />
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950/50 dark:to-secondary-950/50 border border-primary-200 dark:border-primary-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center"><Globe className="w-7 h-7 text-white" /></div>
                <div><h3 className="font-bold text-lg text-foreground dark:text-white">Official ILP Portal</h3><p className="text-primary-600 dark:text-primary-400 font-mono text-sm">{data.quickStats.officialPortal}</p></div>
              </div>
              <button onClick={copy} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-accent-800 border border-primary-200 dark:border-primary-700 text-sm font-medium">{copied ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}{copied ? "Copied!" : "Copy Link"}</button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-12 md:py-16 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-orange-200 dark:border-orange-800">
            <h3 className="font-bold text-xl text-foreground dark:text-white mb-2">🦌 {data.sangaiFestival.name}</h3>
            <p className="text-orange-600 dark:text-orange-400 font-medium mb-2">{data.sangaiFestival.dates} • {data.sangaiFestival.venue}</p>
            <p className="text-muted-foreground">{data.sangaiFestival.description}</p>
            <Link href="https://wa.me/919864141211?text=Hi!%20I%20want%20to%20attend%20Sangai%20Festival%20in%20Manipur.%20Please%20help%20with%20ILP%20and%20tour!" target="_blank" className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-medium"><MessageCircle className="w-4 h-4" />Book Sangai Festival Package</Link>
          </motion.div>
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">How to Apply for Manipur ILP Online</h2>
          </motion.div>
          <div className="space-y-4">{data.applicationSteps.map((step, i) => <StepCard key={step.step} step={step} index={i} />)}</div>
        </div>
      </section>

      <section className="relative py-12 md:py-16 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">Popular Destinations in Manipur</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.destinations.map((dest, i) => (
              <motion.div key={dest.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-4 rounded-xl bg-white/60 dark:bg-accent-800/60 border border-primary-100/20 dark:border-primary-900/20">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-foreground dark:text-white">{dest.name}</h4>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">{dest.permitRequired}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{dest.highlight}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Mountain className="w-3 h-3" />{dest.altitude}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{dest.bestTime}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">Frequently Asked Questions</h2>
          </motion.div>
          <div className="bg-white/80 dark:bg-accent-800/80 rounded-2xl border border-primary-100/30 dark:border-primary-900/30 p-6 md:p-8">
            {data.faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-16 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white text-center">
            <h3 className="font-bold text-2xl mb-4">Need Help with Manipur ILP?</h3>
            <p className="text-white/90 mb-6">Our experts can help with permits, Sangai Festival packages, and complete Manipur tours.</p>
            <Link href="https://wa.me/919864141211?text=Hi%20TravelSpire%20NE!%20%F0%9F%92%83%0AI%20need%20help%20with%20Manipur%20travel.%0APlease%20assist!" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-green-600 font-bold hover:bg-green-50 shadow-lg"><MessageCircle className="w-5 h-5" />Get Help on WhatsApp</Link>
          </motion.div>
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground dark:text-white mb-4">Explore Other State Permits</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.relatedPages.map((page, i) => (
              <motion.div key={page.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={`/permits/${page.slug}`} className="block p-5 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-lg text-center">
                  <h4 className="font-bold text-foreground dark:text-white">{page.name}</h4>
                  <span className="inline-flex items-center gap-1 mt-2 text-sm text-primary-600 dark:text-primary-400">View Guide<ArrowRight className="w-3 h-3" /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
