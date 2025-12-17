import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug, getPostMeta } from "@/lib/blog";
import { compileMDX } from "next-mdx-remote/rsc";
import { PostFrontmatter } from "@/lib/types";
import { MainLayout } from "@/components/layout";

export async function generateStaticParams() {
    const langs = ["en", "id"];

    return langs.flatMap((lang) =>
        getAllPostSlugs(lang).map((slug) => ({
            lang,
            slug,
        }))
    );
}

export default async function BlogDetail({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang, slug } = await params;
    const post = getPostBySlug(lang, slug);

    if (!post) {
        notFound();
    }

    const { content, frontmatter } = await compileMDX<PostFrontmatter>({
        source: post,
        options: { parseFrontmatter: true },
    });

    return (
        <MainLayout>
            <article className="prose dark:prose-invert">
                <h1>{frontmatter.title}</h1>
                <h1>{frontmatter.excerpt}</h1>
                {content}
            </article>
        </MainLayout>
    );
}

export async function generateMetadata({
    params,
}: {
    params: { lang: string; slug: string };
}): Promise<Metadata> {
    const { lang, slug } = await params;

    const post = getPostMeta(lang, slug);

    if (!post) {
        return {};
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            images: [post.thumbnail],
        },
        alternates: {
            languages: {
                en: `/en/blog/${slug}`,
                id: `/id/blog/${slug}`,
            },
        },
    };
}
