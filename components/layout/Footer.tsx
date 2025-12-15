"use client";

import Link from "next/link";
import { useDictionary, useLanguageSwitcher } from "@/hooks";

export function Footer() {
    const { dictionary: dict, isLoading } = useDictionary();
    const { currentLocale } = useLanguageSwitcher();

    if (isLoading || !dict) {
        return (
            <footer className="border-t border-border py-8">
                <div className="section-container">
                    <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                </div>
            </footer>
        );
    }

    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border py-8">
            <div className="section-container">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} devnull. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href={`/${currentLocale}/blog`}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {dict.navigation.blog}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
