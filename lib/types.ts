export type Author = {
    name: string;
    avatar?: string;
    bio?: string;
};

export type PostFrontmatter = {
    title: string;
    excerpt: string;
    published: boolean;

    tags: string[];
    categories: string[];

    published_date: string;
    updated_date?: string;

    thumbnail: string;

    author: Author;
};
