"use client"
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import {
    Mountain,
    MapPin,
    HandHeart,
    TreePine,
    ScrollText,
    Star,
    Instagram
} from 'lucide-react';
import { DotPattern, GlowEffect } from '@/components/ui/background-patterns';
import { teamSectionData } from '@/data/team/team-data';
import type { TeamMember } from '@/types/team/team';
import { cn } from '@/lib/utils';

// Reusable Components

interface FloatingCardProps {
    children: React.ReactNode;
    className?: string;
  }
  
  const FloatingCard = ({ children, className = "" }: FloatingCardProps) => (
      <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(var(--primary-500), 0.3)" }}
          className={cn(
              "relative p-8 rounded-2xl",
              "bg-white/80 dark:bg-accent-800/80",
              "backdrop-blur-sm",
              "border border-primary-100/20 dark:border-primary-900/20",
              "transition-shadow duration-500",
              className
          )}
      >
          {children}
      </motion.div>
  );

  interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    align?: 'center' | 'left' | 'right';
  }
  
  const SectionHeader = ({ 
    title, 
    subtitle, 
    description, 
    align = "center" 
  }: SectionHeaderProps) => (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={cn(
              "max-w-3xl mb-16",
              align === "center" ? "mx-auto text-center" : "text-left"
          )}
      >
          {subtitle && (
              <span className="inline-block mb-4 text-sm font-semibold tracking-wider uppercase text-primary-600 dark:text-primary-400">
                  {subtitle}
              </span>
          )}
          <h2 className="heading-2 mb-6">
              <span className="block text-foreground dark:text-white">
                  {title}
              </span>
          </h2>
          {description && (
              <p className="text-lg md:text-xl text-muted-foreground dark:text-neutral-300">
                  {description}
              </p>
          )}
      </motion.div>
  );

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative overflow-hidden rounded-2xl h-full bg-gradient-to-b from-white/90 via-white/80 to-white/90 dark:from-accent-800/90 dark:via-accent-800/80 dark:to-accent-800/90 backdrop-blur-sm border border-primary-100/20 dark:border-primary-900/20"
        >
            {/* Image Section */}
            <div className="relative h-72 overflow-hidden">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Quick Info Overlay */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 p-4 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                >
                    {member.achievements && member.achievements[0] && (
                        <div className="text-sm">
                            <span className="text-primary-300">Latest Achievement:</span>
                            <p className="mt-1 text-white/90">{member.achievements[0].title}</p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                    <h3 className="text-xl font-semibold text-foreground dark:text-white">
                        {member.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {member.roles.map((role) => (
                            <span
                                key={role}
                                className="text-sm text-primary-600 dark:text-primary-400"
                            >
                                {role}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground dark:text-neutral-300">
                        <MapPin className="w-4 h-4 text-primary-500" />
                        <span>{member.location.city}, {member.location.state}</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground dark:text-neutral-300">
                        <ScrollText className="w-4 h-4 text-primary-500" />
                        <span>{member.yearsOfExperience}+ years of experience</span>
                    </div>

                    {/* Languages */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-foreground dark:text-white">
                            Languages
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {member.languages.map((lang) => (
                                <span
                                    key={lang}
                                    className="px-2 py-1 text-xs rounded-full bg-primary-100/50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300"
                                >
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                {member.social && (
                    <div className="pt-4 border-t border-primary-100/20 dark:border-primary-900/20">
                        <h4 className="text-sm font-medium text-foreground dark:text-white mb-3">
                            Connect
                        </h4>
                        <div className="flex gap-3">
                            {member.social.map((social) => (
                                <motion.a
                                    key={social.platform}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full 
                             bg-primary-100/50 dark:bg-primary-900/50 
                             hover:bg-primary-200/50 dark:hover:bg-primary-800/50 
                             text-primary-600 dark:text-primary-300
                             transition-all duration-300 cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Instagram className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                                    <span className="text-xs font-medium">{social.handle}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Expertise */}
                <div className="pt-4 border-t border-primary-100/20 dark:border-primary-900/20">
                    <h4 className="text-sm font-medium text-foreground dark:text-white mb-2">
                        Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {member.expertise.map((exp) => (
                            <span
                                key={exp}
                                className="px-2 py-1 text-xs rounded-full bg-secondary-100/50 dark:bg-secondary-900/50 text-secondary-700 dark:text-secondary-300"
                            >
                                {exp}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
// Data
const valuesData = [
    {
        icon: Mountain,
        title: "Adventure & Discovery",
        description: "We believe every journey should be an adventure that pushes boundaries and creates unforgettable memories."
    },
    {
        icon: HandHeart,
        title: "Community Impact",
        description: "Supporting local communities through sustainable tourism, ensuring your travels benefit the region's people."
    },
    {
        icon: TreePine,
        title: "Environmental Care",
        description: "Preserving Northeast India's pristine landscapes through responsible and sustainable travel practices."
    },
    {
        icon: Star,
        title: "Authentic Experiences",
        description: "Creating genuine connections with local cultures, traditions, and people beyond tourist facades."
    }
];

const milestones = [
    {
        year: "2018",
        title: "The Beginning",
        description: "Started with a dream to showcase Northeast India's hidden treasures"
    },
    {
        year: "2019",
        title: "First Expedition",
        description: "Led our first group to witness India's first sunrise in Dong Valley"
    },
    {
        year: "2020",
        title: "Community Focus",
        description: "Launched initiatives to support local artisans and homestays"
    },
    {
        year: "2021",
        title: "Expansion",
        description: "Extended operations to all Seven Sister States"
    },
    {
        year: "2022",
        title: "Recognition",
        description: "Received award for sustainable tourism practices"
    },
    {
        year: "2023",
        title: "Digital Growth",
        description: "Launched our digital platform for seamless travel experiences"
    }
];

export default function AboutUs() {
    const { scrollYProgress } = useScroll();
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    return (
        <main className="relative w-full overflow-hidden">
            {/* Hero Section with Parallax */}
            <section className="relative min-h-[80vh] flex items-center">
                <DotPattern className="opacity-10" />
                <motion.div
                    style={{
                        scale: scaleProgress,
                        opacity: opacityProgress
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="space-y-6"
                        >
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                                <span className="block text-foreground dark:text-white">
                                    Your Gateway to
                                </span>
                                <span className="block text-gradient-primary">
                                    Northeast India
                                </span>
                            </h1>
                            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground dark:text-neutral-300">
                                Founded by local explorers, we curate authentic experiences that showcase
                                the untold stories of India&apos;s most enchanting region.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Floating Elements */}
                <GlowEffect
                    color="primary"
                    size="lg"
                    className="absolute -top-40 -right-40 opacity-20"
                />
                <GlowEffect
                    color="secondary"
                    size="lg"
                    className="absolute -bottom-40 -left-40 opacity-20"
                />
            </section>



            {/* Journey Timeline Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionHeader
                        title="Our Journey"
                        subtitle="The Story So Far"
                        description="From humble beginnings to becoming Northeast India's trusted travel curator"
                    />

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-primary-200/50 dark:bg-primary-800/50" />

                        {/* Timeline Events */}
                        <div className="space-y-24">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className={cn(
                                        "relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
                                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                                    )}
                                >
                                    <div className={index % 2 === 0 ? "md:order-1" : "md:order-2"}>
                                        <div className="space-y-2">
                                            <div className="text-4xl font-bold text-primary-500 dark:text-primary-400">
                                                {milestone.year}
                                            </div>
                                            <h3 className="text-xl font-semibold text-foreground dark:text-white">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-muted-foreground dark:text-neutral-300">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Timeline Point */}
                                    <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
                                        <div className="w-4 h-4 rounded-full bg-primary-500 dark:bg-primary-400" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="relative py-20 bg-primary-50/50 dark:bg-accent-900/50">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionHeader
                        title="Our Values"
                        subtitle="What Drives Us"
                        description="Core principles that guide every journey we create"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {valuesData.map((value, index) => (
                            <FloatingCard key={value.title}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative z-10 space-y-4"
                                >
                                    <div className="inline-flex p-3 rounded-xl bg-primary-100/50 dark:bg-primary-900/50">
                                        <value.icon className="w-6 h-6 text-primary-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground dark:text-white">
                                        {value.title}
                                    </h3>
                                    <p className="text-muted-foreground dark:text-neutral-300">
                                        {value.description}
                                    </p>
                                </motion.div>
                            </FloatingCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionHeader
                        title={teamSectionData.title}
                        subtitle={teamSectionData.subtitle}
                        description={teamSectionData.description}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamSectionData.members.map((member) => (
                            <TeamMemberCard key={member.id} member={member} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Part 2 continues with Team Section and Call to Action... */}
            {/* Call to Action Section */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="relative rounded-[2.5rem] overflow-hidden">
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-90" />
                            <Image
                                src="/api/placeholder/1920/600"
                                alt="Northeast India landscape"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="relative px-8 py-20 md:px-16 md:py-32 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="max-w-3xl mx-auto space-y-8"
                            >
                                <h2 className="text-4xl md:text-5xl font-bold text-white">
                                    Ready to Explore Northeast India?
                                </h2>
                                <p className="text-xl text-white/90">
                                    Join us on a journey of discovery through the enchanting landscapes and rich cultures of the Seven Sisters.
                                </p>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <a
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary-600 hover:bg-primary-50 text-lg font-medium transition-colors shadow-xl"
                                    >
                                        Start Planning Your Journey
                                        <Mountain className="w-5 h-5" />
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}