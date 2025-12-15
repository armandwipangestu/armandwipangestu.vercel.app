"use client"; // This is a client component (uses hooks)

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
    const pathname = usePathname();

    // Replace locale in current path
    // e.g., /en/blog -> /id/blog
    const switchLocale = (newLocale: Locale) => {
        const segments = pathname.split("/");
        segments[1] = newLocale; // Replace locale segment
        return segments.join("/");
    };

    return (
        <div className="flex gap-2">
            {locales.map((locale) => {
                return (
                    <Link
                        key={locale}
                        href={switchLocale(locale)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                            currentLang === locale
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                        }`}
                    >
                        {locale.toUpperCase()}
                    </Link>
                );
            })}
        </div>
    );
}
