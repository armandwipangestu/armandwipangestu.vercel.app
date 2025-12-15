"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface QueryProviderProps {
    children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(() => {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    // Default stale time: 5 minutes
                    staleTime: 5 * 60 * 1000,
                    // Default cache time: 30 minutes
                    gcTime: 30 * 60 * 1000,
                    // Retry 2 times on failure
                    retry: 2,
                    // Don't refetch on window focus by default
                    refetchOnWindowFocus: false,
                },
            },
        });
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
