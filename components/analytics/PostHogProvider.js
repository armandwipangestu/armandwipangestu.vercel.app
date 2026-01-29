import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function PostHogProvider({ children }) {
    const router = useRouter();

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
            capture_pageview: false,
            capture_pageleave: true,
        });

        const handleRouteChange = () => posthog.capture('$pageview');
        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return <PHProvider client={posthog}>{children}</PHProvider>;
}
