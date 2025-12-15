"use client";

import { ThemeProvider } from "@/hooks/use-theme";
import { QueryProvider } from "@/components/providers/query-provider";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <QueryProvider>
            <ThemeProvider defaultTheme="system" storageKey="app-theme">
                {children}
            </ThemeProvider>
        </QueryProvider>
    );
}
