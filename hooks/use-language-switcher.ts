"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/hooks/use-locale";
import { locales, type Locale } from "@/i18n/config";

/**
 * Hook to handle language switching
 */
export function useLanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    /**
     * Switch to a specifc locale
     */
    const switchLocale = (newLocale: Locale) => {
        // Replace current locale in pathname with new locale
        const segments = pathname.split("/");
        segments[1] = newLocale;
        const newPath = segments.join("/");
        router.push(newPath);
    };

    /**
     * Toggle between available locales (for 2 languages)
     */
    const toggleLocale = () => {
        const currentIndex = locales.indexOf(currentLocale);
        const nextIndex = (currentIndex + 1) % locales.length;
        const nextLocale = locales[nextIndex];
        switchLocale(nextLocale);
    };

    /**
     * Get the next locale (useful for displaying "switch to X")
     */
    const getNextLocale = (): Locale => {
        const currentIndex = locales.indexOf(currentLocale);
        const nextIndex = (currentIndex + 1) % locales.length;
        return locales[nextIndex];
    };

    return {
        currentLocale,
        locales,
        switchLocale,
        toggleLocale,
        getNextLocale,
    };
}
