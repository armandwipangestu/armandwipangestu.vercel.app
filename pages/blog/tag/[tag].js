import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortPostsByDate } from "@/utilities/sortPostsByDate";
import Metadata from "@/components/utilities/metadata";
import ArticleLayout from "@/components/article/article";
import { useRouter } from "next/router";

const DynamicTagPage = ({ posts }) => {
  const router = useRouter();
  const tag = router.query?.tag;
  const sortPostByDynamicTag = posts?.filter((post) => {
    if (post.frontmatter.tag.toLowerCase().includes(tag.toLowerCase())) {
      return post;
    }
  });

  return (
    <>
      <Metadata
        title={`Blog - ${tag}`}
        description={`Tag - ${tag}`}
        image="/metadata/root.png"
        url={`https://armandwipangestu.vercel.app/blog/tag/${tag}`}
      />

      <ArticleLayout posts={sortPostByDynamicTag} tag={tag} />
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { tag: "programming" } },
      { params: { tag: "sysadmin" } },
      { params: { tag: "networking" } },
      { params: { tag: "linux" } },
      { params: { tag: "setup" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
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

export default DynamicTagPage;
