import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { PostFrontmatter } from "./types";

const BLOG_PATH = path.join(process.cwd(), "content/blog/posts");

export function getAllPostSlugs(lang: string) {
    if (!lang) {
        return [];
    }

    const langPath = path.join(BLOG_PATH, lang);

    if (!fs.existsSync(langPath)) {
        return [];
    }

    return fs
        .readdirSync(langPath)
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export function getAllPostsMeta(lang: string) {
    const langPath = path.join(BLOG_PATH, lang);

    if (!fs.existsSync(langPath)) {
        return [];
    }

    return fs
        .readdirSync(langPath)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => {
            const slug = file.replace(".mdx", "");
            const source = fs.readFileSync(path.join(langPath, file), "utf-8");

            const { data } = matter(source);

            return {
                slug,
                ...(data as PostFrontmatter),
            };
        })
        .filter((post) => post.published)
        .sort(
            (a, b) =>
                new Date(b.published_date).getMinutes() -
                new Date(a.published_date).getTime()
        );
}

export function getPostBySlug(lang: string, slug: string) {
    const fullPath = path.join(BLOG_PATH, lang, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    return fs.readFileSync(fullPath, "utf-8");
}

export function getPostMeta(
    lang: string,
    slug: string
): PostFrontmatter | null {
    const fullPath = path.join(BLOG_PATH, lang, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const file = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(file);

    return data as PostFrontmatter;
}
