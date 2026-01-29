import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

const GoogleAnalytics = () => {
    const router = useRouter();
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    useEffect(() => {
        const handleRouteChange = (url) => {
            if (window.gtag) {
                window.gtag('config', gaId, {
                    page_path: url,
                });
            }
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events, gaId]);

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${gaId}', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
        </>
    );
};

export default GoogleAnalytics;
