"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Menu,
    X,
    Moon,
    Sun,
    Languages,
    Monitor,
    ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VersionBadge } from "../ui/version-badge";
import { useTheme } from "@/hooks/use-theme";
import { useDictionary, useLanguageSwitcher } from "@/hooks/index";

type Theme = "light" | "dark" | "system";

// Language Toggle with dropdown
function LanguageToggle() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { currentLocale, switchLocale } = useLanguageSwitcher();

    const languages = [
        { code: "en" as const, label: "English", flag: "🇺🇸" },
        { code: "id" as const, label: "Indonesia", flag: "🇮🇩" },
    ];

    // Get current language
    const currentLang =
        languages.find((l) => l.code === currentLocale) || languages[0];

    // Close dropdown when clicking outside (but not on other dropdowns)
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;

            // Don't close if clicking on another dropdown
            if (target.closest("[data-dropdown]")) {
                return;
            }

            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (code: "en" | "id") => {
        switchLocale(code);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef} data-dropdown="language">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1.5 text-sm transition-colors hover:bg-muted"
            >
                <Languages className="h-4 w-4 text-muted-foreground" />
                <span className="uppercase text-xs font-medium">
                    {currentLang.code}
                </span>
                <ChevronDown
                    className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full z-50 mt-2 w-40 origin-top-right rounded-lg border border-border bg-popover p-1 shadow-lg"
                    >
                        {languages.map((lang) => {
                            const isActive = currentLocale === lang.code;

                            return (
                                <button
                                    key={lang.code}
                                    onClick={() => handleSelect(lang.code)}
                                    className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${
                                        isActive
                                            ? "bg-accent text-accent-foreground"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    }`}
                                >
                                    <span className="text-base">
                                        {lang.flag}
                                    </span>
                                    <span className="font-medium">
                                        {lang.label}
                                    </span>
                                    <span className="ml-auto uppercase text-xs opacity-60">
                                        {lang.code}
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ThemeToggle component with grouped icons
function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
        { value: "light", icon: <Sun className="h-4 w-4" />, label: "Light" },
        { value: "dark", icon: <Moon className="h-4 w-4" />, label: "Dark" },
        {
            value: "system",
            icon: <Monitor className="h-4 w-4" />,
            label: "System",
        },
    ];

    return (
        <div className="flex items-center rounded-full border border-border bg-muted/50 p-1">
            {themes.map((t) => (
                <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className={`relative rounded-full p-1.5 transition-colors ${
                        theme === t.value
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                    title={t.label}
                >
                    {theme === t.value && (
                        <motion.div
                            layoutId="theme-indicator"
                            className="absolute inset-0 rounded-full bg-background shadow-sm"
                            transition={{
                                type: "spring",
                                duration: 0.3,
                                bounce: 0.2,
                            }}
                        />
                    )}
                    <span className="relative z-10">{t.icon}</span>
                </button>
            ))}
        </div>
    );
}

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // i18n hooks
    const { dictionary: dict, isLoading } = useDictionary();
    const { currentLocale } = useLanguageSwitcher();

    // Navigation links (generated from dictionary)
    const navLinks = dict
        ? [
              { href: `/${currentLocale}#hero`, label: dict.navigation.hero },
              { href: `/${currentLocale}#about`, label: dict.navigation.about },
              {
                  href: `/${currentLocale}#skills`,
                  label: dict.navigation.skills,
              },
              {
                  href: `/${currentLocale}#experience`,
                  label: dict.navigation.experience,
              },
              {
                  href: `/${currentLocale}#projects`,
                  label: dict.navigation.projects,
              },
          ]
        : [];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Show skeleton or nothing while loading
    if (isLoading || !dict) {
        return (
            <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
                <nav className="section-container flex items-center justify-between h-16">
                    <div className="h-6 w-20 bg-muted animate-pulse rounded" />
                    <div className="hidden md:flex items-center gap-8">
                        <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                    </div>
                </nav>
            </header>
        );
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-border"
                    : "bg-transparent"
            }`}
        >
            <nav className="section-container flex items-center justify-between h-16">
                {/* Logo + Version Badge */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
                    >
                        devnull
                    </Link>
                    {/* Desktop Version Badge - hidden on mobile */}
                    <div className="hidden sm:block">
                        <VersionBadge />
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {/* Navigation link based on locales here! */}
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                    <Button asChild size="sm">
                        <Link
                            href={`/${currentLocale}/blog`}
                            rel="noopener noreferrer"
                        >
                            {dict.navigation.blog}
                        </Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border"
                    >
                        <div className="section-container py-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-border flex items-center gap-4">
                                {/* Mobile Version Badge */}
                                <VersionBadge />
                                <Button asChild size="sm" className="flex-1">
                                    <Link
                                        href={`/${currentLocale}/blog`}
                                        rel="noopener noreferrer"
                                    >
                                        Blog
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
