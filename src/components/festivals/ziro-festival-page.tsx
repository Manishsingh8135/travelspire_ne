// components/festivals/ziro-festival-page.tsx
import { motion } from "framer-motion";
import { ZiroHeroSSR } from "./hero";
import { FestivalFeatures } from "./features";
import { FestivalPackages } from "./packages";
import { ziroFestival2025 } from "@/data/tours/festival-data";
import { TourGallery } from "@/components/tours/tour-details/tour-gallery";
import { ContactMethods } from "@/components/contact/contact-methods";


export function ZiroFestivalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* SSR Hero Section */}
      <ZiroHeroSSR />

      {/* Festival Features Section */}
      <FestivalFeatures />

      {/* Festival Packages */}
      <FestivalPackages />

      {/* Gallery */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ziro Valley <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Gallery</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the breathtaking beauty of UNESCO Tentative World Heritage Site
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TourGallery images={ziroFestival2025.gallery} />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactMethods />
    </div>
  );
}
