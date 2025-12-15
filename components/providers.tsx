"use client";

import { useEffect } from "react";
import { ThemeProvider } from "@/hooks/use-theme";
import { QueryProvider } from "@/components/providers/query-provider";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    // Add 'loaded' class after hydration to enable transitions
    useEffect(() => {
        // Small delay to ensure everything is painted
        const timer = setTimeout(() => {
            document.documentElement.classList.add("loaded");
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <QueryProvider>
            <ThemeProvider defaultTheme="system" storageKey="app-theme">
                {children}
            </ThemeProvider>
        </QueryProvider>
    );
}
