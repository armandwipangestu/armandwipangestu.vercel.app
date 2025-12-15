"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary, useLanguageSwitcher } from "@/hooks";
import Image from "next/image";

export function HeroSection() {
    const { dictionary: dict, isLoading } = useDictionary();
    const { currentLocale } = useLanguageSwitcher();

    if (isLoading || !dict) {
        return (
            <section id="hero" className="min-h-screen flex items-center">
                <div className="section-container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                        <div className="order-2 lg:order-1">
                            <div className="h-4 w-32 bg-muted animate-pulse rounded mb-4" />
                            <div className="h-12 w-3/4 bg-muted animate-pulse rounded mb-4" />
                            <div className="h-8 w-1/2 bg-muted animate-pulse rounded mb-4" />
                            <div className="h-20 w-full bg-muted animate-pulse rounded mb-8" />
                            <div className="flex gap-4">
                                <div className="h-12 w-36 bg-muted animate-pulse rounded" />
                                <div className="h-12 w-36 bg-muted animate-pulse rounded" />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 flex justify-center">
                            <div className="w-64 h-64 md:w-80 md:h-80 bg-muted animate-pulse rounded-full" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            id="hero"
            className="section-container min-h-[calc(100vh-4rem)] flex items-center py-20"
        >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="order-2 lg:order-1"
                >
                    <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
                        {dict.hero.greeting}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                        {dict.hero.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-medium">
                        {dict.hero.title}
                    </p>
                    <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
                        {dict.hero.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" asChild className="group">
                            <a href={`/${currentLocale}#projects`}>
                                {dict.hero.cta}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                {dict.hero.resume}
                            </a>
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="order-1 lg:order-2 flex justify-center lg:justify-end"
                >
                    <div className="relative">
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 blur-[80px] rounded-full scale-110"></div>

                        {/* Border wrapper */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-border p-1">
                            {/* Image container */}
                            <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                    src="/me.png"
                                    alt={dict.hero.name}
                                    fill
                                    sizes="(max-width: 768px) 256px, 320px"
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
        </section>
    );
}
