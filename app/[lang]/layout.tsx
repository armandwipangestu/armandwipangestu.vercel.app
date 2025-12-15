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
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var storageKey = 'app-theme';
                                    var theme = localStorage.getItem(storageKey);
                                    var root = document.documentElement;
                                    
                                    // Remove any existing theme class first
                                    root.classList.remove('light', 'dark');
                                    
                                    if (theme === 'dark') {
                                        root.classList.add('dark');
                                        root.style.colorScheme = 'dark';
                                    } else if (theme === 'light') {
                                        root.classList.add('light');
                                        root.style.colorScheme = 'light';
                                    } else {
                                        // System preference
                                        var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                        root.classList.add(isDark ? 'dark' : 'light');
                                        root.style.colorScheme = isDark ? 'dark' : 'light';
                                    }
                                } catch (e) {}
                            })()
                        `,
                    }}
                />
                {/* Prevent FOUC (Flash of Unstyled Content) */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                            html { background-color: var(--background); }
                            html.dark { background-color: oklch(0.145 0 0); }
                            html.light { background-color: oklch(1 0 0); }
                        `,
                    }}
                />
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
