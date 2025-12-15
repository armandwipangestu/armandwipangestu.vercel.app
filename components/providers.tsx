"use client";

import { ThemeProvider } from "@/hooks/use-theme";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider defaultTheme="system" storageKey="app-theme">
            {children}
        </ThemeProvider>
    );
}
