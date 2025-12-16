"use client";

import { motion } from "framer-motion";
import { useDictionary } from "@/hooks";
import Image from "next/image";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export function AboutSection() {
    const { dictionary: dict, isLoading } = useDictionary();

    if (isLoading || !dict) {
        return (
            <section id="about" className="py-20 md:py-32">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto">
                        <div className="h-4 w-24 bg-muted animate-pulse rounded mb-6" />
                        <div className="h-12 w-3/4 bg-muted animate-pulse rounded mb-8" />
                        <div className="h-24 w-full bg-muted animate-pulse rounded mb-12" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                            <div className="h-24 bg-muted animate-pulse rounded-xl" />
                            <div className="h-24 bg-muted animate-pulse rounded-xl" />
                            <div className="h-24 bg-muted animate-pulse rounded-xl" />
                        </div>
                        <div className="h-32 w-full bg-muted animate-pulse rounded-xl" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="about" className="py-20 md:py-32">
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="max-w-4xl mx-auto"
                >
                    {/* Label */}
                    <motion.p
                        variants={itemVariants}
                        className="text-xs text-muted-foreground tracking-widest uppercase mb-6"
                    >
                        {dict.about?.label || "ABOUT"}
                    </motion.p>

                    {/* Title */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8"
                    >
                        {dict.about?.title || "A bit about me"}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-muted-foreground leading-relaxed mb-12"
                    >
                        {dict.about?.description ||
                            "I'm a passionate developer with a love for creating beautiful and functional web applications."}
                    </motion.p>

                    {/* Currently Section */}
                    <motion.div
                        variants={itemVariants}
                        className="p-6 md:p-8 rounded-xl bg-card border border-border"
                    >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                    {dict.about?.currentlyLabel || "Currently"}
                                </p>
                                <h3 className="text-xl font-semibold mb-2">
                                    {dict.about?.currentlyRole ||
                                        "Full Stack Developer"}
                                </h3>
                                <p className="text-muted-foreground">
                                    {dict.about?.currentlyDescription ||
                                        "Working on exciting projects and learning new technologies every day."}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-accent">
                                    <Image
                                        src="/me.png"
                                        alt="Arman Dwi Pangestu"
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium">
                                        Arman Dwi Pangestu
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Indonesia · haters &{">"} /dev/null
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
