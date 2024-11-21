"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';



interface FooterProps {
  data: typeof import('@/data/footer/footer-data').footerData;
  className?: string;
}

function GradientCard({ 
  children,
  className,
  interactive = false 
}: { 
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const Component = interactive ? motion.div : 'div';

  return (
    <Component
      initial={interactive ? { opacity: 0, y: 20 } : undefined}
      whileInView={interactive ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      whileHover={interactive ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden",
        "border border-primary-100/20 dark:border-white/10",
        "bg-gradient-to-b from-white/90 via-white/90 to-white/90",
        "dark:from-accent-900/90 dark:via-accent-900/90 dark:to-accent-900/90",
        "shadow-2xl shadow-primary-500/10 dark:shadow-black/20",
        "backdrop-blur-xl",
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(
              rgb(var(--primary-400) / 0.15) 1px, 
              transparent 1px
            )`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative">
        {children}
      </div>

      {/* Glow effects */}
      <div className="absolute -right-[40%] top-0 h-[500px] w-[500px] rounded-full bg-primary-500/20 dark:bg-primary-400/10 blur-[120px] animate-pulse" />
      <div className="absolute -left-[40%] bottom-0 h-[500px] w-[500px] rounded-full bg-secondary-500/20 dark:bg-secondary-400/10 blur-[120px] animate-pulse" />
    </Component>
  );
}

function MainSection({ data }: { data: FooterProps['data']['mainSection'] }) {
  return (
    <GradientCard className="p-8 md:p-12 lg:p-16" interactive>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <h2 className="heading-2 md:heading-1">
          <span className="block text-center md:text-left text-foreground dark:text-white">
            {data.title}
          </span>
          <span className="block text-center md:text-left bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 dark:from-primary-400 dark:via-primary-500 dark:to-secondary-400 bg-clip-text text-transparent">
            {data.highlightedTitle}
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-center md:text-left text-muted-foreground dark:text-neutral-300 max-w-3xl">
          {data.description}
        </p>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block flex justify-center md:justify-start"
        >
          <Link
            href={data.ctaButton.href}
            className={cn(
              "group relative inline-flex items-center justify-center gap-2",
              "px-4 py-2 text-sm rounded-lg", // Default (mobile) size
              "md:px-8 md:py-4 md:text-xl md:rounded-full", // Desktop size
              "bg-gradient-to-r from-primary-500 to-secondary-500",
              "hover:from-primary-400 hover:to-secondary-400",
              "text-white font-medium",
              "shadow-xl shadow-primary-500/25 dark:shadow-primary-500/10",
              "transition-all duration-300"
            )}
          >
            {data.ctaButton.text}
            <ArrowUpRight className="w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>


      </motion.div>
    </GradientCard>
  );
}

function QuickLinks({ data }: { data: FooterProps['data']['quickLinks'] }) {
  return (
    <div className="px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {data.map((section) => (
            <div 
              key={section.title} 
              className="flex flex-col items-center md:items-start text-center md:text-left space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-bold text-foreground dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-4 w-full max-w-xs">
                {section.links.map((link) => (
                  <motion.li 
                    key={link.text}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex justify-center md:justify-start"
                  >
                    <Link 
                      href={link.href}
                      className={cn(
                        "group inline-flex items-center gap-2",
                        "text-lg text-muted-foreground hover:text-foreground",
                        "dark:text-neutral-400 dark:hover:text-white",
                        "transition-colors duration-200",
                        "px-4 py-2 rounded-lg",
                        "hover:bg-primary-50 dark:hover:bg-white/5"
                      )}
                    >
                      <span>{link.text}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function Newsletter({ data }: { data: { title: string; description: string; placeholder: string; buttonText: string; } }) {
  return (
    <div className={cn(
      "relative p-8 md:p-10 rounded-[2.5rem] overflow-hidden",
      "border border-primary-100/20 dark:border-white/10",
      "bg-gradient-to-b from-white/90 via-white/90 to-white/90",
      "dark:from-accent-900/90 dark:via-accent-900/90 dark:to-accent-900/90",
      "shadow-2xl shadow-primary-500/10 dark:shadow-black/20",
      "backdrop-blur-xl",
      "hover:scale-[1.01] hover:shadow-primary-500/20",
      "transition-all duration-300"
    )}>
      {/* Background pattern with lower z-index */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(
              rgb(var(--primary-400) / 0.15) 1px, 
              transparent 1px
            )`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10 space-y-4 text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white">
          {data.title}
        </h3>
        <p className="text-lg text-muted-foreground dark:text-neutral-300">
          {data.description}
        </p>
        <form className="flex flex-col md:flex-row gap-4 mt-6">
          <input
            type="email"
            placeholder={data.placeholder}
            className={cn(
              "w-full rounded-xl px-6 py-4",
              "bg-white/50 dark:bg-white/5",
              "border border-primary-200/50 dark:border-white/10",
              "text-foreground dark:text-white",
              "placeholder:text-muted-foreground dark:placeholder:text-neutral-500",
              "focus:outline-none focus:ring-2 focus:ring-primary-500",
              "hover:border-primary-300 dark:hover:border-white/20",
              "relative z-10", // Ensure input is above background
              "transition-all duration-300"
            )}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full md:w-auto px-6 py-4 rounded-xl whitespace-nowrap",
              "bg-gradient-to-r from-primary-500 to-secondary-500",
              "text-white font-medium",
              "shadow-lg shadow-primary-500/25",
              "hover:shadow-xl hover:shadow-primary-500/30",
              "hover:from-primary-400 hover:to-secondary-400",
              "relative z-10",
              "cursor-pointer", // Ensure button is above background
              "transition-all duration-300"
            )}
            type="submit"
          >
            {data.buttonText}
          </motion.button>
        </form>
      </div>

      {/* Glow effects */}
      <div className="absolute -right-[40%] top-0 h-[500px] w-[500px] rounded-full bg-primary-500/20 dark:bg-primary-400/10 blur-[120px] animate-pulse -z-10" />
      <div className="absolute -left-[40%] bottom-0 h-[500px] w-[500px] rounded-full bg-secondary-500/20 dark:bg-secondary-400/10 blur-[120px] animate-pulse -z-10" />
    </div>
  );
}



function SocialLinks({ links }: { links: FooterProps['data']['socialLinks'] }) {
  const socialIcons = {
    Twitter,
    Instagram,
    LinkedIn: Linkedin
  };

  return (
    <div className="flex gap-6">
      {links.map((link) => {
        const Icon = socialIcons[link.icon as keyof typeof socialIcons];
        return (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative p-4 rounded-xl group overflow-hidden",
              "bg-gradient-to-br from-primary-50/80 to-primary-100/80",
              "dark:from-accent-800/80 dark:to-accent-900/80",
              "hover:from-primary-500 hover:to-secondary-500",
              "text-primary-600 hover:text-white dark:text-white",
              "shadow-lg shadow-primary-500/10 dark:shadow-black/20",
              "transition-all duration-300"
            )}
          >
            {/* Gradient glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-400/20 blur-xl" />
            </div>

            {/* Icon */}
            <Icon className="relative z-10 w-6 h-6" />
          </motion.a>
        );
      })}
    </div>
  );
}

function ContactCard({ data }: { data: FooterProps['data']['contactInfo'] }) {
  return (
    <GradientCard className="p-8 md:p-10" interactive>
      <div className="space-y-4 text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white">
          Get in touch
        </h3>
        <address className="not-italic text-lg space-y-2 text-muted-foreground dark:text-neutral-300 mx-auto md:mx-0">
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p className="text-muted-foreground dark:text-neutral-400">{data.address}</p>
        </address>
      </div>
    </GradientCard>
  );
 }

function BottomSection({ data, className }: Pick<FooterProps, 'data' | 'className'>) {
  return (
    <div className={cn("mt-20 pt-8 border-t border-primary-100/20 dark:border-white/10", className)}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <span className="text-muted-foreground dark:text-neutral-400">
            {data.bottomSection.copyright}
          </span>
          <nav className="flex gap-8">
            {data.bottomSection.legalLinks.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="text-muted-foreground hover:text-foreground dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
        <SocialLinks links={data.socialLinks} />
      </div>
    </div>
  );
}

export function Footer({ data, className }: FooterProps) {
  return (
    <footer className={cn(
      "relative w-full overflow-hidden",
      "bg-gradient-to-b from-white via-primary-50/50 to-white",
      "dark:from-black dark:via-accent-900 dark:to-black",
      className
    )}>
      {/* Background pattern */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(
              rgb(var(--primary-400) / 0.1) 1px, 
              transparent 1px
            )`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 space-y-20">
        <MainSection data={data.mainSection} />
        
        <div className="space-y-20">
          <QuickLinks data={data.quickLinks} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Newsletter data={data.newsletter} />
            <ContactCard data={data.contactInfo} />
          </div>
        </div>

        <BottomSection data={data} />
      </div>
    </footer>
  );
}