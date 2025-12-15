"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    ChevronDown,
    ExternalLink,
    FileText,
    Tag,
    AlertCircle,
    Star,
    GitFork,
    Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLatestRelease, useRepoInfo } from "@/hooks/use-github";
import { useDictionary, useLanguageSwitcher } from "@/hooks";

const GITHUB_OWNER = "armandwipangestu";
const GITHUB_REPO = "armandwipangestu.vercel.app";
const CHANGELOG_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/blob/main/CHANGELOG.md`;
const SPONSOR_URL = "https://saweria.co/armandwipangestu";

// Helper function to format numbers (e.g., 1234 -> 1.2k)
function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
    }

    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }

    return num.toString();
}

export function VersionBadge() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // i18n hooks
    const { dictionary: dict } = useDictionary();
    const { currentLocale } = useLanguageSwitcher();

    // Use TanStack Query hook
    const {
        data: release,
        isLoading: isLoadingRelease,
        isError: isErrorRelease,
        error: errorRelease,
    } = useLatestRelease({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
    });

    const { data: repoInfo, isLoading: isLoadingRepo } = useRepoInfo({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
    });

    const isLoading = isLoadingRelease;

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
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Loading state
    if (isLoading) {
        return <div className="h-5 w-14 animate-pulse rounded-full bg-muted" />;
    }

    // Error state
    if (isErrorRelease) {
        return (
            <div
                className="inline-flex items-center gap-1 rounded-full bg-desctructive/10 px-2 py-0.5 text-xs text-destructive"
                title={errorRelease?.message}
            >
                <AlertCircle className="h-3 w-3" />
                <span>Error</span>
            </div>
        );
    }

    // No release found
    if (!release) {
        return null;
    }

    return (
        <div className="relative" ref={dropdownRef} data-dropdown="version">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-1 rounded-full border border-green-500/50 bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 transition-colors hover:bg-green-500/20 hover:border-green-500 dark:text-green-400 dark:border-green-400/50 dark:bg-green-400/10 dark:hover:bg-green-400/20 dark:hover:border-green-400"
            >
                <Tag className="h-3 w-3" />
                <span>{release.version}</span>
                <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${
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
                        className="absolute left-0 top-full z-50 mt-2 w-56 origin-top-left rounded-lg border border-border bg-popover p-2 shadow-lg"
                    >
                        {/* Release Info Section */}
                        <div className="mb-2 border-b border-border">
                            <p className="text-sm font-medium text-foreground">
                                {release.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {dict?.version?.released || "Released"}{" "}
                                {formatDate(release.publishedAt)}
                            </p>
                            {release.isPrerelease && (
                                <span className="mt-1 inline-block rounded-bg-yellow-500/10 px-1.5 py-0.5 text-xs text-yellow-600 dark:text-yellow-400">
                                    {dict?.version?.preRelease || "Pre-release"}
                                </span>
                            )}
                        </div>

                        {/* Stars & Forks Section */}
                        {repoInfo && (
                            <div className="mb-2 pb-2 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/stargazers`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors bg-yellow-500/10 hover:bg-yellow-500/20 group"
                                    >
                                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                        <span className="font-medium text-yellow-600 dark:text-yellow-400">
                                            {formatNumber(repoInfo.stars)}
                                        </span>
                                        <span className="text-xs text-yellow-600/70 dark:text-yellow-400/70">
                                            {dict?.version?.stars || "Stars"}
                                        </span>
                                    </Link>
                                    <Link
                                        href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/fork`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors bg-blue-500/10 hover:bg-blue-500/20 group"
                                    >
                                        <GitFork className="h-4 w-4 text-blue-500" />
                                        <span className="font-medium text-blue-600 dark:text-blue-400">
                                            {formatNumber(repoInfo.forks)}
                                        </span>
                                        <span className="text-xs text-blue-600/70 dark:text-blue-400/70">
                                            {dict?.version?.forks || "Forks"}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Sponsor Button */}
                        <div className="mb-2 pb-2 border-b border-border">
                            <Link
                                href={SPONSOR_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400"
                            >
                                <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
                                <span>
                                    {dict?.version?.sponsor ||
                                        "Sponsor this project"}
                                </span>
                            </Link>
                        </div>

                        <div className="space-y-1">
                            <Link
                                href={release.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <ExternalLink className="h-4 w-4" />
                                <span>
                                    {dict?.version?.viewReleaseNotes ||
                                        "View Release Notes"}
                                </span>
                            </Link>
                            <Link
                                href={CHANGELOG_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <FileText className="h-4 w-4" />
                                <span>
                                    {dict?.version?.viewChangelog ||
                                        "View Changelog"}
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
