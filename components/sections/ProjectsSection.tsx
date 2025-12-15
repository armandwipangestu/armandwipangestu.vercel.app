"use client";

import { useDictionary } from "@/hooks";

export function ProjectsSection() {
    const { dictionary: dict, isLoading } = useDictionary();

    if (isLoading || !dict) {
        return (
            <section id="projects" className="py-20 bg-muted/50">
                <div className="section-container">
                    <div className="h-8 w-32 bg-muted animate-pulse rounded mb-8" />
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-20 bg-muted/50">
            <div className="section-container">
                <h2 className="text-3xl font-bold mb-8">
                    {dict.navigation.projects}
                </h2>
                {/* Add your projects content here */}
            </div>
        </section>
    );
}
