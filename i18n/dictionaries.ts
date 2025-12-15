import type { Locale } from "./config";

// Map of locale to its dictionary loader (lazy loading)
const dictionaries = {
    en: () => import("./locales/en.json").then((module) => module.default),
    id: () => import("./locales/id.json").then((module) => module.default),
};

// Function to get dictionary for a specific locale
export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]();
};
