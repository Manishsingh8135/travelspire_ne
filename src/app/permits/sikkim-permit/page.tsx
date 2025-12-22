"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Clock, Calendar, MapPin, CheckCircle2, AlertCircle, ChevronDown, ChevronRight, ExternalLink, CreditCard, Mountain, Sparkles, MessageCircle, ArrowRight, Info, Users, Cloud, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DotPattern, GlowEffect } from "@/components/ui/background-patterns";
import { sikkimPermitData } from "@/data/permits/sikkim-data";

const data = sikkimPermitData;

const Breadcrumb = () => (
  <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
    <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
    <ChevronRight className="w-4 h-4" />
    <Link href="/permits" className="hover:text-primary-600 transition-colors">Permits</Link>
    <ChevronRight className="w-4 h-4" />
    <span className="text-foreground font-medium">Sikkim Permit</span>
  </nav>
);

const PermitZoneCard = ({ zone, index }: { zone: typeof data.permitZones[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={cn(
      "p-5 rounded-2xl border",
      zone.permitRequired 
        ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800" 
        : "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
    )}
  >
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-bold text-foreground dark:text-white">{zone.zone}</h3>
      <span className={cn(
        "px-2 py-1 text-xs rounded-full font-medium",
        zone.permitRequired 
          ? "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200"
          : "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
      )}>
        {zone.permitRequired ? "PAP Required" : "No Permit"}
      </span>
    </div>
    <div className="flex flex-wrap gap-1 mb-3">
      {zone.places.map((place) => (
        <span key={place} className="px-2 py-0.5 text-xs rounded-full bg-white/50 dark:bg-black/20 text-muted-foreground">
          {place}
        </span>
      ))}
    </div>
    <div className="flex items-center gap-4 text-sm">
      <span className={cn("flex items-center gap-1", zone.indiansAllowed ? "text-green-600" : "text-red-600")}>
        {zone.indiansAllowed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
        Indians
      </span>
      <span className={cn("flex items-center gap-1", zone.foreignersAllowed ? "text-green-600" : "text-red-600")}>
        {zone.foreignersAllowed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
        Foreigners
      </span>
    </div>
    {zone.note && (
      <p className="mt-3 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-1">
        <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
        {zone.note}
      </p>
    )}
  </motion.div>
);

const FAQItem = ({ faq, index }: { faq: typeof data.faqs[0]; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03 }} className="border-b border-primary-100 dark:border-primary-900/50 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 flex items-start justify-between text-left">
        <span className="font-medium text-foreground dark:text-white pr-4">{faq.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="flex-shrink-0 mt-1"><ChevronDown className="w-5 h-5 text-primary-500" /></motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-5 text-muted-foreground dark:text-neutral-300">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function SikkimPermitPage() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-20">
        <DotPattern className="opacity-10" />
        <GlowEffect color="primary" size="lg" className="absolute -top-40 -right-40 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
          <Breadcrumb />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-800">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Updated 2025 • Nathula & North Sikkim Guide</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-foreground dark:text-white">Sikkim</span><br />
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent">Protected Area Permit Guide</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">{data.tagline}. General areas: No permit. Nathula, North Sikkim & Gurudongmar require PAP.</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href={data.quickStats.officialPortal} target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium hover:scale-105 transition-transform shadow-lg">
                <Globe className="w-5 h-5" />Sikkim Tourism Portal<ExternalLink className="w-4 h-4" />
              </Link>
              <Link href="https://wa.me/919864141211?text=Hi%20TravelSpire%20NE!%20%F0%9F%8F%AF%0AI%20need%20help%20with%20Sikkim%20permits%20for%20Nathula%2FNorth%20Sikkim.%0APlease%20assist!" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium">
                <MessageCircle className="w-5 h-5" />Get Help on WhatsApp
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Info Alert */}
      <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-5 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-green-800 dark:text-green-200">General Areas: No Permit!</h3>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">Gangtok, Pelling, Namchi, Ravangla, Yuksom - Open to all tourists without any permit. Just book and visit!</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="font-bold text-red-800 dark:text-red-200">Nathula: Indians Only!</h3>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300">Nathula Pass and Gurudongmar Lake are strictly restricted for foreigners. Only Indian citizens can visit these locations.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Permit Zones */}
      <section className="relative py-12 md:py-16 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">Sikkim Permit Zones</h2>
            <p className="text-muted-foreground">Understanding which areas need permits and who can visit</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.permitZones.map((zone, index) => (
              <PermitZoneCard key={zone.zone} zone={zone} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How to Get Permits */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">How to Get Sikkim Permits</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground dark:text-white">{data.howToGet.throughAgent.title}</h3>
                  <span className="text-sm text-green-600 dark:text-green-400">Recommended</span>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                {data.howToGet.throughAgent.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />{step}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400">Cost: {data.howToGet.throughAgent.cost}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground dark:text-white">{data.howToGet.atCheckPost.title}</h3>
                  <span className="text-sm text-amber-600 dark:text-amber-400">Limited Areas</span>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                {data.howToGet.atCheckPost.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />{step}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-amber-600 dark:text-amber-400 flex items-start gap-1">
                <Info className="w-4 h-4 mt-0.5" />{data.howToGet.atCheckPost.note}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="relative py-12 md:py-16 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">Popular Destinations in Sikkim</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.destinations.map((dest, index) => (
              <motion.div key={dest.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="p-4 rounded-xl bg-white/60 dark:bg-accent-800/60 border border-primary-100/20 dark:border-primary-900/20">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-foreground dark:text-white">{dest.name}</h4>
                  <span className={cn(
                    "px-2 py-0.5 text-xs rounded-full",
                    dest.permitRequired === "None" 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                  )}>
                    {dest.permitRequired === "None" ? "Free" : dest.permitRequired}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{dest.highlight}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className={cn("flex items-center gap-1", dest.foreignersAllowed ? "text-green-600" : "text-red-600")}>
                    {dest.foreignersAllowed ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    Foreigners
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><Mountain className="w-3 h-3" />{dest.altitude}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{dest.bestTime}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">Important Tips</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.tips.map((tip, index) => {
              const iconMap: Record<string, React.ElementType> = { Users, AlertCircle, CreditCard, Cloud, Mountain, Calendar };
              const Icon = iconMap[tip.icon] || Info;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="p-5 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30">
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

      {/* FAQ */}
      <section className="relative py-12 md:py-16 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">Frequently Asked Questions</h2>
          </motion.div>
          <div className="bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm rounded-2xl border border-primary-100/30 dark:border-primary-900/30 p-6 md:p-8">
            {data.faqs.map((faq, index) => <FAQItem key={index} faq={faq} index={index} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white text-center">
            <h3 className="font-bold text-2xl mb-4">Need Help with Sikkim Permits?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">Our team can arrange Nathula, North Sikkim, and Gurudongmar permits through registered agents. Complete Sikkim tour packages available!</p>
            <Link href="https://wa.me/919864141211?text=Hi%20TravelSpire%20NE!%20%F0%9F%8F%AF%0AI%20need%20help%20with%20Sikkim%20travel%20and%20permits.%0APlease%20assist!" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-green-600 font-bold hover:bg-green-50 shadow-lg">
              <MessageCircle className="w-5 h-5" />Get Help on WhatsApp
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related */}
      <section className="relative py-12 md:py-16 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground dark:text-white mb-4">Explore Other State Permits</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.relatedPages.map((page, index) => (
              <motion.div key={page.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
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
