"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/hooks/use-locale";
import { locales, type Locale } from "@/i18n/config";
import { useTransition, useCallback } from "react";

/**
 * Hook to handle language switching
 */
export function useLanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const [isPending, startTransition] = useTransition();

    /**
     * Switch to a specific locale
     */
    const switchLocale = useCallback(
        (newLocale: Locale) => {
            const segments = pathname.split("/");
            segments[1] = newLocale;
            const newPath = segments.join("/");

            // Temporarily remove 'loaded' class to disable transitions during navigation
            document.documentElement.classList.remove("loaded");

            startTransition(() => {
                router.push(newPath, { scroll: false });

                // Re-add 'loaded' class after navigation
                setTimeout(() => {
                    document.documentElement.classList.add("loaded");
                }, 50);
            });
        },
        [pathname, router]
    );

    /**
     * Toggle between available locales (for 2 languages)
     */
    const toggleLocale = useCallback(() => {
        const currentIndex = locales.indexOf(currentLocale);
        const nextIndex = (currentIndex + 1) % locales.length;
        const nextLocale = locales[nextIndex];
        switchLocale(nextLocale);
    }, [currentLocale, switchLocale]);

    /**
     * Get the next locale (useful for displaying "switch to X")
     */
    const getNextLocale = useCallback((): Locale => {
        const currentIndex = locales.indexOf(currentLocale);
        const nextIndex = (currentIndex + 1) % locales.length;
        return locales[nextIndex];
    }, [currentLocale]);

    return {
        currentLocale,
        locales,
        switchLocale,
        toggleLocale,
        getNextLocale,
        isPending,
    };
}
