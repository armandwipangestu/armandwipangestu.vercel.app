"use client";

import { useEffect, useState, useTransition } from "react";
import { useLocale } from "@/hooks/use-locale";
import { getDictionary } from "@/i18n/dictionaries";

// Type for the dictionary (infer from JSON structure)
type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

/**
 * Hook to get dictionary in Client Components
 * Returns dictionary and loading state
 */
export function useDictionary() {
    const locale = useLocale();
    const [dictionary, setDictionary] = useState<Dictionary | null>(null);
    const [isPending, startTransition] = useTransition()
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        startTransition(() => {
            getDictionary(locale).then((dict) => {
                if (isMounted) {
                    setDictionary(dict);
                    setIsInitialLoading(false);
                }
            });
        })

        // Cleanup to prevent state update on mounter component
        return () => {
            isMounted = false;
        }
    }, [locale]);

    return {
        dictionary,
        isLoading: isInitialLoading || isPending,
        locale,
    };
}
