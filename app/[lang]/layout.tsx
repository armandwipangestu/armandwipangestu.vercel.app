import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { locales, type Locale } from "@/i18n/config";

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

// Tell Next.js to pre-generate pages for all locales at build time
export async function generateStaticParams() {
    return locales.map((lang) => {
        return { lang };
    });
}

// Layout component receives `params` with the current locale
export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
}>) {
    const { lang } = await params;

    return (
        <html lang={lang}>
            {/* Dynamic lang attribute! */}
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
