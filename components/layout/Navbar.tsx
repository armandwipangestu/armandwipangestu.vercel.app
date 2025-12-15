"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Moon, Sun, Languages, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VersionBadge } from "../ui/version-badge";
import { useTheme } from "@/hooks/use-theme";
import { useDictionary, useLanguageSwitcher } from "@/hooks/index";

// Theme cycle order: light -> dark -> system -> light, ...
const themeOrder = ["light", "dark", "system"] as const;

// ThemeIcon OUTSIDE of Navbar component
function ThemeIcon({ theme }: { theme: string }) {
    switch (theme) {
        case "light":
            return <Sun className="h-4 w-4" />;
        case "dark":
            return <Moon className="h-4 w-4" />;
        case "system":
            return <Monitor className="h-4 w-4" />;
        default:
            return <Sun className="h-4 w-4" />;
    }
}

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // i18n hooks
    const { dictionary: dict, isLoading } = useDictionary();
    const { currentLocale, toggleLocale, getNextLocale } =
        useLanguageSwitcher();

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

    // Cycle through: light -> dark -> system -> light
    const toggleTheme = () => {
        const currentIndex = themeOrder.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themeOrder.length;
        setTheme(themeOrder[nextIndex]);
    };

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
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLocale}
                        className="gap-2"
                    >
                        <Languages className="h-4 w-4" />
                        <span className="uppercase text-xs font-medium">
                            {getNextLocale()}
                        </span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        title={`Current: ${theme}`}
                    >
                        <ThemeIcon theme={theme} />
                    </Button>
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
                    {/* Mobile Version Badge */}
                    <div className="sm:hidden">
                        <VersionBadge />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        title={`Current: ${theme}`}
                    >
                        <ThemeIcon theme={theme} />
                    </Button>
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
                        className="md:hidden bg-background border-b border-border overflow-hidden"
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
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={toggleLocale}
                                    className="gap-2"
                                >
                                    <Languages className="h-4 w-4" />
                                    <span className="uppercase text-xs font-medium">
                                        {getNextLocale()}
                                    </span>
                                </Button>
                                <Button asChild size="sm" className="flex-1">
                                    <Link
                                        href="/blog"
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
