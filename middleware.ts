import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "./i18n/config";

// Type guard to check if a string is valid Locale
function isValidLocale(lang: string): lang is Locale {
    return locales.includes(lang as Locale);
}

// Detect user's preferred locale from browser
function getLocale(request: NextRequest): string {
    const acceptLanguage = request.headers.get("accept-language");

    if (acceptLanguage) {
        // Parse "en-US,en;q=0.9,id;q=0.8" format
        const preferredLocale = acceptLanguage
            .split(",")
            .map((lang) => lang.split(";")[0].trim().substring(0, 2))
            .find((lang) => isValidLocale(lang));

        if (preferredLocale) {
            return preferredLocale;
        }
    }

    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if pathname already has a locale prefix
    // e.g., /en/about or /id/blog
    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}`) || pathname === `/${locale}`
    );
    // If already has locale, do nothing
    if (pathnameHasLocale) {
        return;
    }

    // Redirect to locale-prefixed path
    // e.g., /about -> /en/about or /id/about
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
}

// Configure which paths middleware runs on
export const config = {
    matcher: [
        // Math all paths except:
        // - /api routes
        // - /_next (Next.js internals)
        // - Static files (.png, .jpg, .svg, etc.)
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};
