"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    ChevronDown,
    ExternalLink,
    FileText,
    Tag,
    AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLatestRelease } from "@/hooks/use-github";
import { useDictionary, useLanguageSwitcher } from "@/hooks";

const GITHUB_OWNER = "armandwipangestu";
const GITHUB_REPO = "armandwipangestu.vercel.app";
const CHANGELOG_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/blob/main/CHANGELOG.md`;

export function VersionBadge() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // i18n hooks
    const { dictionary: dict } = useDictionary();
    const { currentLocale } = useLanguageSwitcher();

    // Use TanStack Query hook
    const {
        data: release,
        isLoading,
        isError,
        error,
    } = useLatestRelease({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
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
    if (isError) {
        return (
            <div
                className="inline-flex items-center gap-1 rounded-full bg-desctructive/10 px-2 py-0.5 text-xs text-destructive"
                title={error?.message}
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
        <div className="relative" ref={dropdownRef}>
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
