import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortPostsByDate } from "@/utilities/sortPostsByDate";
import ArticleLayout from "@/components/article/article";
import Metadata from "@/components/utilities/metadata";

const PostsPage = ({ posts }) => {
  return (
    <>
      <Metadata
        title={`Blog - Posts`}
        description={`Daftar artikel yang saya terbitkan`}
        image="/metadata/root.png"
        url={`https://armandwipangestu.vercel.app/blog/posts`}
      />

      <ArticleLayout posts={posts} tag="posts" />
    </>
  );
};

export const getStaticProps = async () => {
  // Get files from the posts directory
  const files = fs.readdirSync(path.join("posts"));

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace(".md", "");

    // Get fronmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortPostsByDate),
    },
  };
};

export default PostsPage;
