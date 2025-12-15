"use client";

import { useDictionary } from "@/hooks";

export function HeroSection() {
    const { dictionary: dict, isLoading } = useDictionary();

    if (isLoading || !dict) {
        return (
            <section id="hero" className="min-h-screen flex items-center">
                <div className="section-container">
                    <div className="h-12 w-3/4 bg-muted animate-pulse rounded mb-4" />
                    <div className="h-6 w-1/2 bg-muted animate-pulse rounded" />
                </div>
            </section>
        );
    }

    return (
        <section id="hero" className="min-h-screen flex items-center">
            <div className="section-container">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {dict.home.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                    {dict.home.description}
                </p>
            </div>
        </section>
    );
}
