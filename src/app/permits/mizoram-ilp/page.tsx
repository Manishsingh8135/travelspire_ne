"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, FileText, Clock, IndianRupee, Calendar, MapPin, CheckCircle2, AlertCircle,
  ChevronDown, ChevronRight, Download, Phone, ExternalLink, CreditCard, Printer,
  Plane, Train, Car, Mountain, Sparkles, MessageCircle, ArrowRight, Info, CheckCheck, Copy, Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DotPattern, GlowEffect } from "@/components/ui/background-patterns";
import { mizoramPermitData } from "@/data/permits/mizoram-data";

const data = mizoramPermitData;

const Breadcrumb = () => (
  <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
    <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
    <ChevronRight className="w-4 h-4" />
    <Link href="/permits" className="hover:text-primary-600 transition-colors">Permits</Link>
    <ChevronRight className="w-4 h-4" />
    <span className="text-foreground font-medium">Mizoram ILP</span>
  </nav>
);

const QuickStatCard = ({ icon: Icon, label, value, highlight = false, subtext }: { icon: React.ElementType; label: string; value: string; highlight?: boolean; subtext?: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className={cn("p-5 rounded-2xl border transition-all duration-300", highlight ? "bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/50 dark:to-secondary-950/50 border-primary-200 dark:border-primary-800" : "bg-white/80 dark:bg-accent-800/80 border-primary-100/30 dark:border-primary-900/30")}>
    <div className="flex items-start gap-4">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", highlight ? "bg-gradient-to-r from-primary-500 to-secondary-500" : "bg-primary-100 dark:bg-primary-900/50")}>
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
  const iconMap: Record<string, React.ElementType> = { Globe, FileText, CreditCard, Download };
  const Icon = iconMap[step.icon] || FileText;
  
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative">
      {index < data.applicationSteps.length - 1 && <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 to-primary-100 dark:from-primary-700 dark:to-primary-900" />}
      <div className={cn("relative p-5 rounded-2xl cursor-pointer transition-all duration-300 bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm border border-primary-100/30 dark:border-primary-900/30 hover:border-primary-300 dark:hover:border-primary-700", isExpanded && "ring-2 ring-primary-500/30")} onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">{step.step}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground dark:text-white">{step.title}</h3>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">{step.duration}</span>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}><ChevronDown className="w-5 h-5 text-muted-foreground" /></motion.div>
              </div>
            </div>
            <p className="text-muted-foreground mt-1">{step.description}</p>
            <AnimatePresence>
              {isExpanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <ul className="mt-4 space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />{detail}
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

export default function MizoramILPPage() {
  const [copiedPortal, setCopiedPortal] = useState(false);
  const copyPortalLink = () => { navigator.clipboard.writeText(data.quickStats.officialPortal); setCopiedPortal(true); setTimeout(() => setCopiedPortal(false), 2000); };

  return (
    <main className="relative w-full overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-20">
        <DotPattern className="opacity-10" />
        <GlowEffect color="primary" size="lg" className="absolute -top-40 -right-40 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
          <Breadcrumb />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 dark:bg-green-900/50 border border-green-200 dark:border-green-800">
              <Plane className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">✅ ILP Available On Arrival at Lengpui Airport!</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-foreground dark:text-white">Mizoram</span><br />
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent">Inner Line Permit (ILP)</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">{data.tagline}. The only NE state offering ILP on arrival at airport!</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href={data.quickStats.officialPortal} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium hover:scale-105 transition-transform shadow-lg">
                <Globe className="w-5 h-5" />Apply Online<ExternalLink className="w-4 h-4" />
              </Link>
              <Link href="https://wa.me/919864141211?text=Hi%20TravelSpire%20NE!%20%F0%9F%8C%B8%0A%0AI%20need%20help%20with%20Mizoram%20ILP.%0A%0APlease%20assist%20me!" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition-colors">
                <MessageCircle className="w-5 h-5" />Get Help on WhatsApp
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickStatCard icon={IndianRupee} label="Total Fee" value={data.quickStats.fee.total} highlight={true} subtext="Form + Processing" />
            <QuickStatCard icon={Clock} label="Processing" value="Instant" subtext="On arrival at Lengpui Airport" />
            <QuickStatCard icon={Calendar} label="Validity" value="15 Days" subtext="Temporary ILP" />
            <QuickStatCard icon={Plane} label="On Arrival" value="✅ Available" subtext="Only at Lengpui Airport!" />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"><Plane className="w-7 h-7 text-white" /></div>
                <div>
                  <h3 className="font-bold text-lg text-foreground dark:text-white">🎉 Unique: ILP On Arrival!</h3>
                  <p className="text-green-700 dark:text-green-300 text-sm">Get ILP instantly at Lengpui Airport Security Officer desk</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={copyPortalLink} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-accent-800 border border-green-200 dark:border-green-700 text-sm font-medium">
                  {copiedPortal ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}{copiedPortal ? "Copied!" : "Copy Portal Link"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Steps */}
      <section className="relative py-12 md:py-16 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">How to Get Mizoram ILP</h2>
            <p className="text-muted-foreground">Choose online application OR get it on arrival at Lengpui Airport!</p>
          </motion.div>
          <div className="space-y-4">{data.applicationSteps.map((step, index) => <StepCard key={step.step} step={step} index={index} />)}</div>
        </div>
      </section>

      {/* Entry Points */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">Entry Points to Mizoram</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.entryPoints.map((point, index) => (
              <motion.div key={point.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="p-5 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                    {point.type === "Air" ? <Plane className="w-5 h-5 text-primary-600" /> : point.type.includes("Rail") ? <Train className="w-5 h-5 text-primary-600" /> : <Car className="w-5 h-5 text-primary-600" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-white">{point.name}</h4>
                    <p className="text-sm text-muted-foreground">{point.from}</p>
                    <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">{point.note}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="relative py-12 md:py-16 bg-primary-50/30 dark:bg-accent-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">Popular Destinations in Mizoram</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.destinations.map((dest, index) => (
              <motion.div key={dest.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="p-4 rounded-xl bg-white/60 dark:bg-accent-800/60 border border-primary-100/20 dark:border-primary-900/20">
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

      {/* Tips */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">Important Tips for Mizoram</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.tips.map((tip, index) => {
              const iconMap: Record<string, React.ElementType> = { Plane, Calendar, CreditCard, Users, Clock, FileText };
              const Icon = iconMap[tip.icon] || Info;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="p-5 rounded-2xl bg-white/80 dark:bg-accent-800/80 border border-primary-100/30 dark:border-primary-900/30">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center flex-shrink-0"><Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" /></div>
                    <div><h4 className="font-bold text-foreground dark:text-white mb-1">{tip.title}</h4><p className="text-sm text-muted-foreground">{tip.description}</p></div>
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
            <h3 className="font-bold text-2xl mb-4">Need Help with Mizoram ILP?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">Our local experts can help you plan your Mizoram trip with permit assistance, accommodation, and complete tour packages.</p>
            <Link href="https://wa.me/919864141211?text=Hi%20TravelSpire%20NE!%20%F0%9F%8C%B8%0A%0AI%20need%20help%20with%20Mizoram%20travel.%0A%0APlease%20assist%20me!" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-green-600 font-bold hover:bg-green-50 transition-colors shadow-lg">
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
