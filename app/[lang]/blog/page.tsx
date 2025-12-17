import { MainLayout } from "@/components/layout";
import { getAllPostsMeta } from "@/lib/blog";

export default async function BlogPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    const posts = getAllPostsMeta(lang);

    return (
        <MainLayout>
            <ul className="mt-8">
                {posts.map((post) => (
                    <li key={post.slug}>
                        <a href={`/${lang}/blog/${post.slug}`}>
                            <h2>{post.title}</h2>
                            <p>{post.excerpt}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </MainLayout>
    );
}
