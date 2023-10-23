import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Metadata from "@/components/utilities/metadata";

const Home = ({ posts }) => {
  return (
    <>
      <Metadata
        title="Portofolio"
        description="Website Portofolio Dibuat Menggunakan NextJS dan TailwindCSS"
        image="/images/metadata/root.png"
        url="https://armandwipangestu.vercel.app"
      />
      <p className="pt-36">test</p>
    </>
  );
};

export async function getStaticProps() {
  // Get files from the /posts directory
  const files = fs.readdirSync(path.join("posts"));

  // Get slug from file name and frontmatter from posts
  const posts = files.map((filename) => {
    // Create a slug from file name
    const slug = filename.replace(".md", "");

    // Get frontmatter
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
      posts: posts,
    },
  };
}

export default Home;
