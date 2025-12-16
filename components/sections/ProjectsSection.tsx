"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary, useLanguageSwitcher } from "@/hooks";
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiPostgresql,
    SiDocker,
    SiKubernetes,
    SiAmazonwebservices,
    SiVercel,
    SiGithub,
    SiGithubactions,
    SiNotion,
    SiLaravel,
    SiPhp,
    SiMysql,
    SiRedis,
    SiGo,
    SiPython,
    SiJavascript,
    SiGrafana,
    SiPrometheus,
    SiTerraform,
    SiAnsible,
    SiNginx,
    SiGitlab,
    SiLinux,
    SiFigma,
    SiPrisma,
    SiMongodb,
    SiFirebase,
    SiSupabase,
    SiCloudflare,
    SiOpentelemetry,
    SiExpress,
    SiBruno,
    SiShadcnui
} from "react-icons/si";
import { IconType } from "react-icons";

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

// Tech stack icons mapping
const techIcons: Record<string, { icon: IconType; label: string }> = {
    nextjs: { icon: SiNextdotjs, label: "Next.js" },
    react: { icon: SiReact, label: "React" },
    typescript: { icon: SiTypescript, label: "TypeScript" },
    javascript: { icon: SiJavascript, label: "JavaScript" },
    tailwind: { icon: SiTailwindcss, label: "Tailwind CSS" },
    nodejs: { icon: SiNodedotjs, label: "Node.js" },
    postgresql: { icon: SiPostgresql, label: "PostgreSQL" },
    mysql: { icon: SiMysql, label: "MySQL" },
    mongodb: { icon: SiMongodb, label: "MongoDB" },
    redis: { icon: SiRedis, label: "Redis" },
    docker: { icon: SiDocker, label: "Docker" },
    kubernetes: { icon: SiKubernetes, label: "Kubernetes" },
    aws: { icon: SiAmazonwebservices, label: "AWS" },
    vercel: { icon: SiVercel, label: "Vercel" },
    cloudflare: { icon: SiCloudflare, label: "Cloudflare" },
    github: { icon: SiGithub, label: "GitHub" },
    githubactions: { icon: SiGithubactions, label: "GitHub Actions" },
    gitlab: { icon: SiGitlab, label: "GitLab" },
    notion: { icon: SiNotion, label: "Notion" },
    laravel: { icon: SiLaravel, label: "Laravel" },
    php: { icon: SiPhp, label: "PHP" },
    go: { icon: SiGo, label: "Go" },
    python: { icon: SiPython, label: "Python" },
    grafana: { icon: SiGrafana, label: "Grafana" },
    prometheus: { icon: SiPrometheus, label: "Prometheus" },
    terraform: { icon: SiTerraform, label: "Terraform" },
    ansible: { icon: SiAnsible, label: "Ansible" },
    nginx: { icon: SiNginx, label: "Nginx" },
    linux: { icon: SiLinux, label: "Linux" },
    figma: { icon: SiFigma, label: "Figma" },
    prisma: { icon: SiPrisma, label: "Prisma" },
    firebase: { icon: SiFirebase, label: "Firebase" },
    supabase: { icon: SiSupabase, label: "Supabase" },
    opentelemetry: { icon: SiOpentelemetry, label: "OpenTelemetry" },
    express: { icon: SiExpress, label: "Express JS" },
    bruno: { icon: SiBruno, label: "Bruno" },
    shadcn: { icon: SiShadcnui, label: "Shadcn UI" },
};

// Types
interface Project {
    slug: string;
    title: string;
    description: string;
    thumbnail: string;
    tools: string[];
    liveUrl?: string;
    repoUrl?: string;
    featured?: boolean;
}

interface ProjectsDict {
    label: string;
    title: string;
    description: string;
    viewAll: string;
    viewProject: string;
    repository: string;
    liveSite: string;
    tools: string;
    items: Project[];
}

interface Dictionary {
    projects?: ProjectsDict;
    [key: string]: unknown;
}

interface TechIconProps {
    name: string;
    className?: string;
}

function TechIcon({ name, className = "w-5 h-5" }: TechIconProps) {
    const tech = techIcons[name.toLowerCase()];
    if (!tech) {
        return (
            <span className="text-xs uppercase font-medium text-muted-foreground">
                {name.slice(0, 3)}
            </span>
        );
    }
    const Icon = tech.icon;
    return <Icon className={className} title={tech.label} />;
}

interface ProjectCardProps {
    project: Project;
    index: number;
    locale: string;
    projectsDict: ProjectsDict;
}

function ProjectCard({
    project,
    index,
    locale,
    projectsDict,
}: ProjectCardProps) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-10%" }}
            className="group"
        >
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Content Side */}
                <div className={`space-y-6 ${isEven ? "" : "md:order-2"}`}>
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                        {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                    </p>

                    {/* Tools */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                            {projectsDict.tools}:
                        </span>
                        <div className="flex items-center gap-3">
                            {project.tools.map((tool) => (
                                <div
                                    key={tool}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    title={techIcons[tool]?.label || tool}
                                >
                                    <TechIcon name={tool} className="w-5 h-5" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Button asChild className="group/btn">
                        <Link href={`/${locale}/projects/${project.slug}`}>
                            {projectsDict.viewProject}
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </Button>
                </div>

                {/* Thumbnail Side */}
                <div className={`relative ${isEven ? "" : "md:order-1"}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-card">
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Overlay with links */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 right-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {project.repoUrl && (
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-sm font-medium hover:bg-background transition-colors"
                                >
                                    <Github className="w-4 h-4" />
                                    {projectsDict.repository}
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-sm font-medium hover:bg-background transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    {projectsDict.liveSite}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout - Card Style */}
            <div className="md:hidden rounded-2xl border border-border bg-card overflow-hidden">
                {/* Thumbnail */}
                <div className="relative aspect-video">
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">
                        {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                    </p>

                    {/* Tools */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                            {projectsDict.tools}:
                        </span>
                        <div className="flex items-center gap-2">
                            {project.tools.map((tool) => (
                                <div
                                    key={tool}
                                    className="text-muted-foreground"
                                    title={techIcons[tool]?.label || tool}
                                >
                                    <TechIcon name={tool} className="w-4 h-4" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                        <Button asChild size="sm" className="group/btn">
                            <Link href={`/${locale}/projects/${project.slug}`}>
                                {projectsDict.viewProject}
                                <ArrowRight className="w-3 h-3 ml-1.5 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                        </Button>
                        <div className="flex items-center gap-2">
                            {project.repoUrl && (
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg hover:bg-accent transition-colors"
                                    aria-label={projectsDict.repository}
                                >
                                    <Github className="w-4 h-4" />
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg hover:bg-accent transition-colors"
                                    aria-label={projectsDict.liveSite}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function ProjectsSection() {
    const { dictionary } = useDictionary();
    const { currentLocale } = useLanguageSwitcher();

    const dict = dictionary as Dictionary | null;

    // Default values for projects dict
    const defaultProjectsDict: ProjectsDict = {
        label: "PROJECTS",
        title: "Featured Projects",
        description: "A selection of projects I've worked on.",
        viewAll: "View All Projects",
        viewProject: "View Project",
        repository: "Repository",
        liveSite: "Live Site",
        tools: "Tools",
        items: [],
    };

    const projectsDict = dict?.projects || defaultProjectsDict;
    const projects = projectsDict.items || [];

    if (!dict) {
        return (
            <section id="projects" className="py-20 md:py-32 bg-muted/30">
                <div className="section-container">
                    <div className="max-w-5xl mx-auto">
                        <div className="h-4 w-24 bg-muted animate-pulse rounded mb-6" />
                        <div className="h-12 w-3/4 bg-muted animate-pulse rounded mb-4" />
                        <div className="h-16 w-full bg-muted animate-pulse rounded mb-12" />
                        <div className="space-y-16">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="grid md:grid-cols-2 gap-8"
                                >
                                    <div className="h-64 bg-muted animate-pulse rounded-2xl" />
                                    <div className="space-y-4">
                                        <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
                                        <div className="h-20 w-full bg-muted animate-pulse rounded" />
                                        <div className="h-10 w-32 bg-muted animate-pulse rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-20 md:py-32 bg-muted/30">
            <div className="section-container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="max-w-5xl mx-auto"
                >
                    {/* Label */}
                    <motion.p
                        variants={itemVariants}
                        className="text-xs text-muted-foreground tracking-widest uppercase mb-6"
                    >
                        {projectsDict.label}
                    </motion.p>

                    {/* Title */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
                    >
                        {projectsDict.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-muted-foreground leading-relaxed mb-12"
                    >
                        {projectsDict.description}
                    </motion.p>

                    {/* Projects List */}
                    <div className="space-y-16 md:space-y-24">
                        {projects
                            .filter((p) => p.featured)
                            .map((project, index) => (
                                <ProjectCard
                                    key={project.slug}
                                    project={project}
                                    index={index}
                                    locale={currentLocale}
                                    projectsDict={projectsDict}
                                />
                            ))}
                    </div>

                    {/* View All Projects Button */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 text-center"
                    >
                        <Button variant="outline" size="lg" asChild>
                            <Link href={`/${currentLocale}/projects`}>
                                {projectsDict.viewAll}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
