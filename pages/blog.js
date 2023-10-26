import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import hljs from "highlight.js";
// import "highlight.js/styles/github-dark.css";
import Link from "next/link";
import { sortPostsByDate } from "@/utilities/sortPostsByDate";
import Metadata from "@/components/utilities/metadata";
import React, { useState, useEffect } from "react";
import ReactTyped from "react-typed";
import { GoCopy, GoCheck } from "react-icons/go";

const markdown = `
  \`\`\`jsx
import React from 'react';

const App = ({ props }) => {
    return (
        <section id='tagline'>
            <div className='tagline-content'>
                <h1>Tidak ada kata berhenti untuk belajar ✨</h1>
                <p>Tingkatkan terus skill mu</p>
                <button >Mulai Sekarang 🚀</button>
            </div>
        </section>
    )
}

export default App;
  \`\`\`
`;

const BlogPage = ({ posts }) => {
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [languageText, setLanguageText] = useState("");

  const copyButton = () => {
    const codeBlock = document.querySelector("pre code");
    const copyCode = document.querySelector("#copy-code");
    const language = codeBlock.getAttribute("hljs") || codeBlock.className;
    setLanguageText(
      language.split("-")[1].split(" ")[0]
        ? language.split("-")[1].split(" ")[0]
        : ""
    );

    copyCode.addEventListener("click", () => {
      if (navigator.clipboard && window.isSecureContext) {
        const codeText = codeBlock.innerText.trim();
        navigator.clipboard.writeText(codeText);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = codeBlock.innerText;

        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
          document.execCommand("copy");
        } catch (error) {
          console.error(error);
        } finally {
          textArea.remove();
        }
      }

      // Update the button text and set a timer to reset it
      setCopyButtonText("Copied!");
      setTimeout(() => {
        setCopyButtonText("Copy");
      }, 2000);
    });
  };

  useEffect(() => {
    hljs.highlightAll();
    copyButton();
  }, []);

  return (
    <>
      <Metadata
        title="Blog"
        description="Dokumentasi kegiatan belajar sehari-hari seputar Programming, Networking, dan System Administrator"
        image="/metadata/blog.png"
        url="blog"
      />

      <section className="pb-36 pt-36 transition-all duration-300 dark:bg-dark">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full self-center px-4 lg:w-1/2">
              <h1 className="text-base font-semibold md:text-xl">
                <span className="mt-1 block text-3xl font-bold text-dark dark:text-gray dark:text-white lg:text-5xl">
                  Belajar Itu Mudah Bukan?{" "}
                  <span className="animate-gradient-pulse from-background to-background text-foreground ml-1 inline-block -rotate-1 rounded-xl bg-gradient-to-r via-primary/10 px-4 py-1.5 text-lg tracking-tight shadow-2xl shadow-primary/[0.25] ring-2 ring-dark/70 dark:ring-white/70 sm:px-4 sm:py-3 sm:text-3xl lg:text-4xl">
                    Bukan
                  </span>
                </span>
              </h1>

              <h2 className="mb-8 mt-2 text-lg font-medium text-accents-3 dark:text-white/80 lg:mt-3 lg:text-xl">
                Tutorial -{" "}
                <ReactTyped
                  strings={[
                    "Programming",
                    "Networking",
                    "System Administrator",
                  ]}
                  typeSpeed={40}
                  loop
                  backSpeed={15}
                  className="font-bold text-dark dark:text-white"
                />
              </h2>

              <a
                href="#artikel-terbaru"
                className="rounded-full bg-dark px-7 py-2.5 text-base font-semibold text-white transition duration-300 ease-in-out hover:opacity-80 hover:shadow-lg dark:bg-white dark:text-dark md:px-8 md:py-3"
              >
                Baca Artikel
              </a>
            </div>

            <div className="mt-10 w-full self-center rounded-lg px-4 lg:w-1/2">
              <div className="w-full rounded-lg shadow-2xl shadow-primary/[0.25]">
                <div className="flex h-9 w-full items-center justify-start space-x-1.5 rounded-t-lg bg-slate-400/30 px-3 transition-all duration-300 dark:bg-slate-800">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <div className="flex-grow"></div>
                  <div className="text-center text-sm font-semibold text-white">
                    <span className="text-slate-400">{languageText}</span>
                  </div>
                  <div className="flex-grow"></div>
                  <div
                    className="cursor-pointer text-center text-sm font-semibold text-white"
                    id="copy-code"
                  >
                    {copyButtonText === "Copy" ? (
                      <GoCopy className="text-dark transition-all duration-300 dark:text-white" />
                    ) : (
                      <GoCheck className="text-lg text-green-400" />
                    )}
                  </div>
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: marked(markdown),
                  }}
                  className="font-bold"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-12 pt-12 transition-all duration-300 dark:bg-dark">
        <div className="container">
          <div className="mx-auto px-4 sm:px-6 md:px-4 lg:max-w-6xl lg:px-8 xl:max-w-7xl">
            <div className="space-y-10 sm:space-y-24">
              <div style={{ opacity: 1, transform: "none" }}>
                <section id="artikel-terbaru">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold leading-6 tracking-tight dark:text-white">
                      Artikel Terbaru
                    </h2>
                    <p className="text-sm text-slate-400">
                      Artikel terbaru yang telah saya terbitkan.
                    </p>
                  </div>
                  <div className="grid gap-y-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 lg:gap-x-20 lg:gap-y-24">
                    {posts.slice(0, 6).map((post, index) => (
                      <div key={index}>
                        <Link href={`/blog/posts/${post.slug}`}>
                          <div
                            data-radix-aspect-ratio-wrapper=""
                            style={{
                              position: "relative",
                              width: "100%",
                              paddingBottom: "56.25%",
                            }}
                          >
                            <div
                              className="ring-border/50 text-accent-foreground z-10 grid place-content-center overflow-hidden rounded-[0.60rem] bg-accent font-mono text-sm  ring-1 ring-black"
                              style={{
                                position: "absolute",
                                inset: "0px",
                              }}
                            >
                              <img
                                alt=""
                                height="360"
                                width="640"
                                src={post.frontmatter.cover_image}
                              />
                            </div>
                          </div>
                        </Link>
                        <div className="mt-4 rounded-lg">
                          <div className="line-clamp-1 dark:text-white">
                            <Link
                              className="text-lg font-medium"
                              href={`/blog/posts/${post.slug}`}
                            >
                              <span className="hover:text-primary transition duration-300 ease-in-out">
                                {post.frontmatter.title}
                              </span>
                            </Link>
                          </div>
                          <div className="mb-4 mt-2 line-clamp-2 text-sm text-slate-400">
                            {post.frontmatter.excerpt}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-x-1">
                              <Link
                                href={`/blog/tag/${post.frontmatter.tag.toLowerCase()}`}
                              >
                                <div className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium tracking-tight text-cyan-500 transition-colors hover:bg-cyan-500/20 focus:outline-none">
                                  {post.frontmatter.tag}
                                </div>
                              </Link>
                            </div>
                            <div className="font-mono text-xs tracking-tighter text-slate-400">
                              {post.frontmatter.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 flex justify-end">
                    <Link
                      href="/blog/posts"
                      className="rounded-full bg-dark px-7 py-2.5 text-base font-semibold text-white transition duration-300 ease-in-out hover:opacity-80 hover:shadow-lg dark:bg-white dark:text-dark md:px-8 md:py-3"
                    >
                      Lihat Lebih Banyak
                    </Link>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
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

    // Set a default value for 'published' if it's not defined
    if (frontmatter.published === undefined) {
      frontmatter.published = true; // Default to published
    }

    return {
      slug,
      frontmatter,
    };
  });

  // Filter posts based on the 'published' property
  const publishedPosts = posts.filter((post) => post.frontmatter.published);

  return {
    props: {
      posts: publishedPosts.sort(sortPostsByDate),
    },
  };
};

export default BlogPage;
