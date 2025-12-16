"use client";

import Link from "next/link";
import {
    Github,
    Gitlab,
    Linkedin,
    Mail,
    Youtube,
    Instagram,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary, useLanguageSwitcher } from "@/hooks";

// Social links
const socialLinks = [
    {
        name: "Email",
        href: "mailto:armandwi.pangestu7@gmail.com",
        icon: Mail,
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/armandwipangestu",
        icon: Linkedin,
    },
    {
        name: "GitHub",
        href: "https://github.com/armandwipangestu",
        icon: Github,
    },
    {
        name: "GitLab",
        href: "https://gitlab.com/armandwipangestu",
        icon: Gitlab,
    },
    {
        name: "YouTube",
        href: "https://www.youtube.com/@armandwipangestu",
        icon: Youtube,
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/devvnnull/",
        icon: Instagram,
    },
];

export function Footer() {
    const { dictionary: dict, isLoading } = useDictionary();
    const { currentLocale } = useLanguageSwitcher();

    const currentYear = new Date().getFullYear();

    if (isLoading || !dict) {
        return (
            <footer className="border-t border-border bg-background">
                <div className="section-container py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <div className="h-6 w-40 bg-muted animate-pulse rounded mb-4" />
                            <div className="h-4 w-64 bg-muted animate-pulse rounded" />
                        </div>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="space-y-3">
                                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                                <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                                <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </footer>
        );
    }

    // Footer navigation links
    const footerLinks = {
        general: {
            title: dict.footer?.general || "General",
            links: [
                {
                    label: dict.navigation?.hero || "Home",
                    href: `/${currentLocale}#hero`,
                },
                {
                    label: dict.navigation?.about || "About",
                    href: `/${currentLocale}#about`,
                },
                {
                    label: dict.navigation?.skills || "Skills",
                    href: `/${currentLocale}#skills`,
                },
                {
                    label: dict.navigation?.experience || "Experience",
                    href: `/${currentLocale}#experience`,
                },
                {
                    label: dict.navigation?.projects || "Projects",
                    href: `/${currentLocale}#projects`,
                },
                {
                    label: dict.navigation?.blog || "Blog",
                    href: `/${currentLocale}/blog`,
                },
            ],
        },
        website: {
            title: dict.footer?.website || "The Website",
            links: [
                {
                    label: dict.footer?.techStack || "Tech Stack",
                    href: `/${currentLocale}/tech-stack`,
                },
                {
                    label: dict.footer?.analytics || "Analytics",
                    href: `/${currentLocale}/analytics`,
                },
                {
                    label: dict.footer?.guestbook || "Guestbook",
                    href: `/${currentLocale}/guestbook`,
                },
            ],
        },
        resources: {
            title: dict.footer?.resources || "Resources",
            links: [
                { label: "RSS", href: `/${currentLocale}/rss.xml` },
                {
                    label: dict.footer?.snippets || "Snippets",
                    href: `/${currentLocale}/snippets`,
                },
                {
                    label: dict.footer?.uses || "Uses",
                    href: `/${currentLocale}/uses`,
                },
            ],
        },
    };

    return (
        <footer className="border-t border-border bg-background">
            {/* Main Footer */}
            <div className="section-container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
                    {/* Brand & Description */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link
                            href={`/${currentLocale}`}
                            className="text-xl font-bold tracking-tight"
                        >
                            devnull
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                            {dict.footer?.description ||
                                "Building digital experiences and sharing knowledge through code and writing."}
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-1 pt-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* General Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground">
                            {footerLinks.general.title}
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.general.links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Website Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground">
                            {footerLinks.website.title}
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.website.links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Subscribe */}
                    <div className="space-y-4 md:col-span-2 lg:col-span-1">
                        <h3 className="text-sm font-semibold text-foreground">
                            {dict.footer?.subscribeTitle ||
                                "Subscribe to newsletter"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {dict.footer?.subscribeDescription ||
                                "Get notified when I publish new posts. No spam."}
                        </p>
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="group"
                        >
                            <Link href={`/${currentLocale}/subscribe`}>
                                {dict.footer?.subscribeButton ||
                                    "Subscribe Now"}
                                <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border">
                <div className="section-container py-6">
                    <p className="text-sm text-muted-foreground text-center">
                        Copyright © 2023 - {currentYear} devnull. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
