import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { locales } from "@/i18n/config";
import { Providers } from "@/components/providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Arman Dwi Pangestu - Portfolio",
    description: "Portfolio and Blog",
};

export async function generateStaticParams() {
    return locales.map((lang) => {
        return { lang };
    });
}

// Critical inline script - runs before anything else
const themeScript = `
(function() {
    function getTheme() {
        try {
            var stored = localStorage.getItem('app-theme');
            if (stored === 'dark' || stored === 'light') return stored;
            if (stored === 'system' || !stored) {
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            return 'light';
        } catch (e) {
            return 'light';
        }
    }
    
    var theme = getTheme();
    var root = document.documentElement;
    
    // Set immediately before any rendering
    root.classList.add(theme);
    root.style.colorScheme = theme;
    root.dataset.theme = theme;
})();
`;

// Critical CSS to prevent flash
const criticalCSS = `
    :root { --initial-bg: oklch(1 0 0); }
    html.dark { --initial-bg: oklch(0.145 0 0); }
    html { background-color: var(--initial-bg); }
    body { background-color: var(--initial-bg); visibility: visible; }
`;

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    return (
        <html lang={lang} suppressHydrationWarning>
            <head>
                {/* Theme script MUST be first - blocking */}
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
                {/* Critical CSS for preventing flash */}
                <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                suppressHydrationWarning
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
