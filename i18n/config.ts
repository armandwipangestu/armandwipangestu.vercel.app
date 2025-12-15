// List of supported locales
export const locales = ["en", "id"] as const;

// Default locale when no preference is detected
export const defaultLocale = "en" as const;

// TypeScript type for locale (will be "en" | "id")
export type Locale = (typeof locales)[number];
