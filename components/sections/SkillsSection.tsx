"use client";

import { useDictionary } from "@/hooks";

export function SkillsSection() {
    const { dictionary: dict, isLoading } = useDictionary();

    if (isLoading || !dict) {
        return (
            <section id="skills" className="py-20 bg-muted/50">
                <div className="section-container">
                    <div className="h-8 w-32 bg-muted animate-pulse rounded mb-8" />
                </div>
            </section>
        );
    }

    return (
        <section id="skills" className="py-20 bg-muted/50">
            <div className="section-container">
                <h2 className="text-3xl font-bold mb-8">
                    {dict.navigation.skills}
                </h2>
                {/* Add your skills content here */}
            </div>
        </section>
    );
}
