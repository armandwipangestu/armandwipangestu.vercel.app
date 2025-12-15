import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";

export default async function Home({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    // Get current locale from URL params
    const { lang } = await params;

    // Load translations for current locale
    const dict = await getDictionary(lang);

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={100}
                    height={20}
                    priority
                />

                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    {/* Using translations! */}
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        {dict.home.title}
                    </h1>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        {dict.home.description}
                    </p>
                </div>

                <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
                    {/* Include locale in links! */}
                    <a
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
                        href={`/${lang}/blog`}
                    >
                        {dict.home.getStarted}
                    </a>
                    {/* Include locale in links! */}
                    <a
                        className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
                        href={`/${lang}/about`}
                    >
                        {dict.home.learnMore}
                    </a>

                    <Button>
                        <LanguageSwitcher currentLang={lang} />
                    </Button>
                </div>
            </main>
        </div>
    );
}
