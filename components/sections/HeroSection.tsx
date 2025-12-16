"use client";

import { motion } from "framer-motion";
import {
    ArrowDown,
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpRight,
    Download,
    Github,
    Linkedin,
    Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary, useLanguageSwitcher } from "@/hooks";
import Image from "next/image";

// Social links configuration
const socialLinks = {
    github: "https://github.com/armandwipangestu",
    linkedin: "https://linkedin.com/in/armandwipangestu",
    email: "armandwi.pangestu7@gmail.com",
};

// Career start year
const CAREER_START_YEAR = 2021;

// Calculate years of experience dynamically
function getYearsOfExperience() {
    const currentYear = new Date().getFullYear();
    return currentYear - CAREER_START_YEAR;
}

export function HeroSection() {
    const { dictionary: dict, isLoading } = useDictionary();
    const { currentLocale } = useLanguageSwitcher();

    // Get dynamic years of experience
    const yearsOfExperience = getYearsOfExperience();

    if (isLoading || !dict) {
        return (
            <section id="hero" className="min-h-screen flex items-center">
                <div className="section-container">
                    <div className="grid lg:grid-cols-5 gap-8 items-center w-full">
                        <div className="lg:col-span-3 order-2 lg:order-1">
                            <div className="h-4 w-32 bg-muted animate-pulse rounded mb-6" />
                            <div className="h-16 w-3/4 bg-muted animate-pulse rounded mb-6" />
                            <div className="h-20 w-full bg-muted animate-pulse rounded mb-8" />
                            <div className="flex gap-4 mb-10">
                                <div className="h-16 w-32 bg-muted animate-pulse rounded" />
                                <div className="h-16 w-32 bg-muted animate-pulse rounded" />
                                <div className="h-16 w-32 bg-muted animate-pulse rounded" />
                            </div>
                            <div className="flex gap-4 mb-8">
                                <div className="h-12 w-36 bg-muted animate-pulse rounded" />
                                <div className="h-12 w-36 bg-muted animate-pulse rounded" />
                            </div>
                        </div>
                        <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center">
                            <div className="w-56 h-56 md:w-72 md:h-72 bg-muted animate-pulse rounded-full" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Format experience text based on locale
    const experienceText =
        currentLocale === "id"
            ? `~${yearsOfExperience} Tahun`
            : `~${yearsOfExperience} Years`;

    return (
        <section
            id="hero"
            className="section-container min-h-[calc(100vh-4rem)] flex items-center py-20 relative"
        >
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center w-full">
                {/* Left Content */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                    {/* Label */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-xs text-muted-foreground tracking-widest uppercase mb-6"
                    >
                        {dict.hero.label || "PORTFOLIO"}
                    </motion.p>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                    >
                        {dict.hero.greeting}{" "}
                        <span className="block mt-2">{dict.hero.name}.</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed"
                    >
                        {dict.hero.description}
                    </motion.p>

                    {/* Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-3 mb-8"
                    >
                        <div className="px-4 py-3 rounded-lg bg-card border border-border">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                {dict.hero.focusLabel || "Focus"}
                            </p>
                            <p className="font-medium text-sm">
                                {dict.hero.focusValue || "Cloud & DevOps"}
                            </p>
                        </div>
                        <div className="px-4 py-3 rounded-lg bg-card border border-border">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                {dict.hero.experienceLabel || "Experience"}
                            </p>
                            <p className="font-medium text-sm">
                                {experienceText}
                            </p>
                        </div>
                        <div className="px-4 py-3 rounded-lg bg-card border border-border">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                {dict.hero.stackLabel || "This Web Tech Stack"}
                            </p>
                            <p className="font-medium text-sm">
                                {dict.hero.stackValue ||
                                    "TypeScript · PHP · Go"}
                            </p>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap items-center gap-4 mb-8"
                    >
                        <Button asChild size="lg">
                            <a href={`/${currentLocale}#projects`}>
                                {dict.hero.cta}
                                <ArrowDownIcon className="w-2 h-2" />
                            </a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a
                                href={`/${currentLocale}/Arman_Dwi_Pangestu_CV.pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {dict.hero.resume || "See CV"}
                                <ArrowUpRight className="w-2 h-2" />
                            </a>
                        </Button>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex items-center gap-2"
                    >
                        <a
                            href={socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href={socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                            href={`mailto:${socialLinks.email}`}
                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                            aria-label="Email"
                        >
                            <Mail className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>

                {/* Right Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-2 order-1 lg:order-2 flex justify-center lg:justify-end"
                >
                    <div className="relative">
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 blur-[80px] rounded-full scale-110"></div>

                        {/* Border wrapper */}
                        <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border-4 border-border p-1">
                            {/* Image container */}
                            <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                    src="/me6.jpg"
                                    alt={dict.hero.name}
                                    fill
                                    sizes="(max-width: 768px) 224px, 288px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-0 bg-background/90 backdrop-blur-md border border-primary/30 text-foreground px-4 py-2 rounded-full flex items-center gap-2 shadow-xl animate-bounce-slow"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                            </span>
                            <span className="text-xs font-bold tracking-wide uppercase">
                                {dict.hero.statusText}
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ArrowDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
            </motion.div>
        </section>
    );
}
