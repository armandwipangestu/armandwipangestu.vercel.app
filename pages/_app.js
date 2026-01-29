import Layout from "@/components/layouts/layout";
import "@/styles/globals.css";
import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { ANALYTICS_ENABLED } from "@/utilities/env";
import { PostHogPageView } from "@/components/analytics/PostHogPageView";

export default function App({ Component, pageProps }) {
  return (
    <>
      {ANALYTICS_ENABLED && (
        <>
          {/* Umami Analytics */}
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_DATA_WEBSITE_ID}
            strategy="afterInteractive"
          />

          {/* Google Analytics */}
          <GoogleAnalytics />
        </>
      )}

      {ANALYTICS_ENABLED ? (
        <PostHogProvider>
          <PostHogPageView />

          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </PostHogProvider>
      ) : (
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      )}
    </>
  );
}
