"use client";

import { motion } from "framer-motion";
import { useDictionary } from "@/hooks";
import { Building2, MapPin } from "lucide-react";

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

interface Role {
    title: string;
    period: string;
    type: string;
    description: string;
    technologies: string[];
    isCurrent?: boolean;
}

interface Experience {
    company: string;
    location: string;
    roles: Role[];
}

export function ExperienceSection() {
    const { dictionary: dict, isLoading } = useDictionary();

    if (isLoading || !dict) {
        return (
            <section id="experience" className="py-20 md:py-32">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto">
                        <div className="h-4 w-24 bg-muted animate-pulse rounded mb-6" />
                        <div className="h-12 w-3/4 bg-muted animate-pulse rounded mb-4" />
                        <div className="h-16 w-full bg-muted animate-pulse rounded mb-12" />
                        <div className="space-y-8">
                            {[...Array(2)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-48 bg-muted animate-pulse rounded-3xl"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const experiences: Experience[] = dict.experience?.items || [];

    return (
        <section id="experience" className="py-20 md:py-32">
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
                        {dict.experience?.label || "EXPERIENCE"}
                    </motion.p>

                    {/* Title */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
                    >
                        {dict.experience?.title || "Work Experience"}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-muted-foreground leading-relaxed mb-12"
                    >
                        {dict.experience?.description ||
                            "My professional journey and the companies I've worked with."}
                    </motion.p>

                    {/* Timeline */}
                    <div className="relative space-y-10">
                        {/* Timeline Line - centered on icons */}
                        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

                        {experiences.map((exp, companyIndex) => (
                            <motion.div
                                key={companyIndex}
                                className="relative"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.25,
                                    delay: companyIndex * 0.1,
                                }}
                                viewport={{ once: true, margin: "-10%" }}
                            >
                                {/* Company Icon - centered on timeline */}
                                <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center z-10">
                                    <Building2 className="h-5 w-5 text-foreground" />
                                </div>

                                {/* Company Content */}
                                <div className="pl-16">
                                    {/* Company Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                                        <h3 className="text-xl font-bold text-foreground">
                                            {exp.company}
                                        </h3>
                                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {exp.location}
                                        </span>
                                    </div>

                                    {/* Roles */}
                                    <div className="space-y-6">
                                        {exp.roles.map((role, roleIndex) => {
                                            const isLastRole =
                                                roleIndex ===
                                                exp.roles.length - 1;
                                            const hasMultipleRoles =
                                                exp.roles.length > 1;

                                            return (
                                                <div
                                                    key={roleIndex}
                                                    className={`relative pl-6 ${
                                                        hasMultipleRoles &&
                                                        !isLastRole
                                                            ? "pb-6 border-l-2 border-dashed border-foreground/30 dark:border-foreground/20"
                                                            : ""
                                                    }`}
                                                >
                                                    {/* Role Dot */}
                                                    {role.isCurrent ? (
                                                        <span className="absolute -left-1.75 top-1.5 flex h-3.5 w-3.5">
                                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                                            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-background"></span>
                                                        </span>
                                                    ) : (
                                                        <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-background bg-blue-500 ring-2 ring-blue-500/20 dark:bg-blue-400 dark:ring-blue-400/20" />
                                                    )}

                                                    {/* Role Header */}
                                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                                        <div>
                                                            <h4
                                                                className={`text-lg font-semibold ${
                                                                    role.isCurrent
                                                                        ? "text-foreground"
                                                                        : "text-foreground"
                                                                }`}
                                                            >
                                                                {role.title}
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                {role.type}
                                                            </p>
                                                        </div>
                                                        {/* Period Badge */}
                                                        <span
                                                            className={`w-fit rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap ${
                                                                role.isCurrent
                                                                    ? "border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400"
                                                                    : "border-border bg-muted/50 text-muted-foreground"
                                                            }`}
                                                        >
                                                            {role.period}
                                                        </span>
                                                    </div>

                                                    {/* Role Description */}
                                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                                        {role.description}
                                                    </p>

                                                    {/* Technologies */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {role.technologies.map(
                                                            (tech) => (
                                                                <span
                                                                    key={tech}
                                                                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                                                                        role.isCurrent
                                                                            ? "border-primary/30 bg-primary/5 text-primary hover:border-primary/50"
                                                                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                                                                    }`}
                                                                >
                                                                    {tech}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
