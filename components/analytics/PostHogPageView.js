'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { ANALYTICS_ENABLED } from '@/utilities/env';

export function PostHogPageView() {
  const router = useRouter();

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;

    const handleRouteChange = (url) => {
      posthog.capture('$pageview', {
        $current_url: url,
      });
    };

    // Initial page load
    handleRouteChange(router.asPath);

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return null;
}
