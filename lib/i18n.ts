import { headers } from "next/headers"
import { locales, defaultLocale, type Locale } from "@/i18n/config"

/**
 * Get current locale from URL pathname (Server Components only)
 * Use this in Server Components like Navbar, Footer, etc.
 */
export async function getCurrentLocale(): Promise<Locale> {
    const headersList = await headers()
    const pathname = headersList.get("x-pathname") || ""

    // Extract locale from pathname (e.g., "/en/about" -> "en")
    const segments = pathname.split("/")
    const localeFromPath = segments[1]

    if (localeFromPath && locales.includes(localeFromPath as Locale)) {
        return localeFromPath as Locale
    }

    return defaultLocale
}