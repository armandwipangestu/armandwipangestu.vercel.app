"use client";

import { motion } from "framer-motion";
import { useDictionary } from "@/hooks";

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

// Define category keys type
type CategoryKey =
    | "cloudPlatforms"
    | "devopsSre"
    | "softwareEngineering"
    | "dataAnalytics"
    | "networking"
    | "tools";

interface SkillCategory {
    titleKey: CategoryKey;
    stack: string[];
}

// Skill categories data
const skillCategories: SkillCategory[] = [
    {
        titleKey: "cloudPlatforms",
        stack: [
            "AWS",
            "Google Cloud",
            "Azure",
            "DigitalOcean",
            "Cloudflare",
            "Vercel",
            "Netlify",
            "Proxmox",
            "VMware EXSi",
        ],
    },
    {
        titleKey: "devopsSre",
        stack: [
            "Bash",
            "Docker",
            "Kubernetes",
            "Terraform",
            "Ansible",
            "GitHub Actions",
            "GitLab CI",
            "Jenkins",
            "ArgoCD",
            "Prometheus",
            "Grafana",
            "Loki",
            "Thanos",
            "Alloy",
            "K6",
        ],
    },
    {
        titleKey: "softwareEngineering",
        stack: [
            "Bash",
            "JavaScript",
            "TypeScript",
            "Node.js",
            "Tailwind CSS",
            "React",
            "Next.js",
            "PHP",
            "Laravel",
            "Go",
            "Gin",
            "Python",
            "MySQL",
            "PostgreSQL",
            "Redis",
            "RabbitMQ",
            "RESTful API",
        ],
    },
    {
        titleKey: "dataAnalytics",
        stack: [
            "MinIO",
            "Ceph",
            "Neesie",
            "Dremio",
            "Trino",
            "Apache NiFi",
            "Apache Zookeeper",
            "Apache Iceberg",
            "Apache Parquet",
            "Apache Avro",
            "Apache Kafka",
            "Apache Hadoop",
            "Apache Hive",
            "Superset",
            "Metabase",
        ],
    },
    {
        titleKey: "networking",
        stack: [
            "Nginx",
            "Apache",
            "HAProxy",
            "Cisco",
            "Mikrotik",
            "UniFi / Ubiquiti",
            "Ruijie / Reyee",
            "TPLink",
            "ZTE",
            "PowerDNS",
            "OpenVPN",
            "WireGuard",
            "IPSec",
            "SSL/TLS",
        ],
    },
    {
        titleKey: "tools",
        stack: [
            "Git",
            "Linux",
            "Bash",
            "Tabby",
            "VS Code",
            "Neovim",
            "Bruno",
            "Figma",
            "Trello",
            "Notion",
            "Discord",
        ],
    },
];

export function SkillsSection() {
    const { dictionary: dict, isLoading } = useDictionary();

    // Helper function to get category title with proper typing
    const getCategoryTitle = (titleKey: CategoryKey): string => {
        const categories = dict?.skills?.categories as
            | Record<CategoryKey, string>
            | undefined;
        return categories?.[titleKey] || titleKey;
    };

    if (isLoading || !dict) {
        return (
            <section id="skills" className="py-20 md:py-32">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto">
                        <div className="h-4 w-24 bg-muted animate-pulse rounded mb-6" />
                        <div className="h-12 w-3/4 bg-muted animate-pulse rounded mb-4" />
                        <div className="h-16 w-full bg-muted animate-pulse rounded mb-12" />
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-32 bg-muted animate-pulse rounded-3xl"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="skills" className="py-20 md:py-32">
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
                        {dict.skills?.label || "SKILLS"}
                    </motion.p>

                    {/* Title */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
                    >
                        {dict.skills?.title || "Tech Stack & Skills"}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-muted-foreground leading-relaxed mb-12"
                    >
                        {dict.skills?.description ||
                            "Technologies and tools I use to bring ideas to life."}
                    </motion.p>

                    {/* Skills Grid */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        {skillCategories.map((category, index) => (
                            <motion.div
                                key={category.titleKey}
                                className="rounded-3xl border border-border bg-card p-5 shadow-sm hover:border-foreground/20 transition-colors"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.25,
                                    delay: index * 0.05,
                                }}
                                viewport={{ once: true, margin: "-10%" }}
                            >
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {getCategoryTitle(category.titleKey)}
                                    </h3>
                                    <span className="rounded-full border border-orange-500/50 bg-orange-500/10 px-2.5 py-0.5 text-[10px] font-medium text-orange-600 dark:text-orange-400">
                                        {category.stack.length}{" "}
                                        {dict.skills?.toolsLabel || "tools"}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.stack.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
