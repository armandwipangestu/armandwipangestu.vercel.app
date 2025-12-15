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
                                    
                                    if (theme === 'dark') {
                                        root.classList.add('dark');
                                    } else if (theme === 'light') {
                                        root.classList.add('light');
                                    } else {
                                        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                                            root.classList.add('dark');
                                        } else {
                                            root.classList.add('light');
                                        }
                                    }
                                } catch (e) {}
                            })()
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
