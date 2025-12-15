"use client";

import { useParams } from "next/navigation";
import { type Locale, defaultLocale, locales } from "@/i18n/config";

/**
 * Get current locale from URL arams (Client Components only)
 * Use this in Client Components with "use client"
 */

export function useLocale(): Locale {
    const params = useParams();
    const lang = params?.lang as string;

    if (lang && locales.includes(lang as Locale)) {
        return lang as Locale;
    }

    return defaultLocale;
}
