import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import hljs from "highlight.js";
import Toc from "@/components/utilities/toc";
import { useRef, useEffect, useState } from "react";
import { GoCopy, GoCheck } from "react-icons/go";
import useReadingTime from "use-reading-time";
import Metadata from "@/components/utilities/metadata";
import { sortPostsByDate } from "@/utilities/sortPostsByDate";

const DynamicSinglePagePost = ({
  frontmatter: {
    title,
    tag,
    date,
    excerpt,
    cover_image,
    author_name,
    author_title,
    author_image,
  },
  slug,
  content,
  posts,
}) => {
  useEffect(() => {
    const relativeTable = () => {
      const tables = document.querySelectorAll("table");

      tables.forEach((tableElement) => {
        const divWrapper = document.createElement("div");
        divWrapper.classList.add("relative", "overflow-x-auto");

        const childNodes = Array.from(tableElement.childNodes);

        childNodes.forEach((childNode) => {
          tableElement.appendChild(childNode);
        });

        if (tableElement.parentNode) {
          tableElement.parentNode.replaceChild(divWrapper, tableElement);
          divWrapper.appendChild(tableElement);
        }
      });
    };

    const addTitlebar = () => {
      const codeBlocks = document.querySelectorAll("pre code");

      codeBlocks.forEach(function (codeBlock) {
        const outerDiv = document.createElement("div");
        outerDiv.classList.add("w-full", "rounded-lg");

        const innerDiv = document.createElement("div");
        innerDiv.classList.add(
          "flex",
          "h-9",
          "w-full",
          "items-center",
          "justify-start",
          "space-x-1.5",
          "rounded-t-lg",
          "bg-slate-400/30",
          "px-3",
          "transition",
          "duration-300",
          "ease-in-out",
          "dark:bg-slate-800"
        );

        const redDot = document.createElement("div");
        redDot.classList.add(
          "h-3",
          "w-3",
          "rounded-full",
          "bg-red-400",
          "border-[2.5px]",
          "border-[#696a73]"
        );
        innerDiv.appendChild(redDot);

        const yellowDot = document.createElement("div");
        yellowDot.classList.add(
          "h-3",
          "w-3",
          "rounded-full",
          "bg-yellow-400",
          "border-[2.5px]",
          "border-[#696a73]"
        );
        innerDiv.appendChild(yellowDot);

        const greenDot = document.createElement("div");
        greenDot.classList.add(
          "h-3",
          "w-3",
          "rounded-full",
          "bg-green-400",
          "border-[2.5px]",
          "border-[#696a73]"
        );
        innerDiv.appendChild(greenDot);

        const growDiv1 = document.createElement("div");
        growDiv1.classList.add("flex-grow");
        innerDiv.appendChild(growDiv1);

        const languageDiv = document.createElement("div");
        languageDiv.classList.add(
          "text-center",
          "text-sm",
          "font-semibold",
          "text-white"
        );
        const languageSpan = document.createElement("span");
        languageSpan.classList.add("text-zinc-600", "dark:text-slate-400");
        const languageName =
          codeBlock.getAttribute("hljs") || codeBlock.className;
        languageSpan.innerText = languageName.split("-")[1]?.split(" ")[0]
          ? languageName.split("-")[1]?.split(" ")[0]
          : "";
        languageDiv.appendChild(languageSpan);

        innerDiv.appendChild(languageDiv);

        const growDiv2 = document.createElement("div");
        growDiv2.classList.add("flex-grow");
        innerDiv.appendChild(growDiv2);

        const copyDiv = document.createElement("button");
        copyDiv.classList.add(
          "cursor-poiter",
          "text-center",
          "text-sm",
          "font-semibold",
          "text-zinc-600",
          "dark:text-slate-400",
          "hover:text-green-600",
          "dark:hover:text-green-400"
        );
        copyDiv.innerText = "Copy";
        innerDiv.appendChild(copyDiv);

        copyDiv.addEventListener("click", () => {
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

          copyDiv.innerText = "Copied!";
          setTimeout(() => {
            copyDiv.innerText = "Copy";
          }, 2000);
        });

        const newPre = document.createElement("pre");

        const newCode = document.createElement("code");

        newCode.className = codeBlock.className;
        newCode.textContent = codeBlock.textContent;

        newPre.appendChild(newCode);

        outerDiv.appendChild(innerDiv);

        outerDiv.appendChild(newPre);

        codeBlock.parentNode.replaceWith(outerDiv);
      });
    };
    addTitlebar();

    relativeTable();
    hljs.highlightAll();
  }, []);

  const post = useRef();
  const { readingTime, wordsCount } = useReadingTime(post);

  return (
    <>
      <Metadata
        title={title}
        description={excerpt}
        image="metadata/root.png"
        url={`blog/posts/${slug}`}
      />

      <div className="pb-36 pt-36 transition duration-300 ease-in-out dark:bg-dark">
        <div className="container">
          <div className="mx-auto px-4 sm:px-6 md:px-4 lg:max-w-6xl lg:px-8 xl:max-w-7xl">
            <div className="md:w-6/12 w-full mx-auto flex items-center flex-col">
              <div className="flex items-center text-accents-3 dark:text-slate-400 space-x-3">
                <div className="capitalize text-base">
                  <Link href={`/blog/tag/${tag.toLowerCase()}`}>{tag}</Link>
                </div>
                <span>•</span>
                <div>{date}</div>
              </div>
              <div className="text-accents-3 dark:text-slate-400 mt-3">
                {readingTime} Menit Baca
              </div>
              <h2 className="text-2xl mt-4 text-center dark:text-white">
                {title}
              </h2>
              <div className="flex items-center mt-5">
                <img
                  src={author_image}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-accents-3 dark:text-slate-400">
                    {author_name}
                  </h3>
                  <div className="text-accents-3 dark:text-slate-400 text-sm mt-1">
                    {author_title}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-10/12 w-full mx-auto my-10">
              <img
                src={cover_image}
                className="w-full rounded-lg ring-border/50 ring-1 ring-black"
              />
            </div>
            <div className="w-full rounded-lg mx-auto mb-5 md:max-w-3xl lg:max-w-5xl transition duration-300 ease-in-out prose prose-pre:mt-0 prose-pre:rounded-t-none prose-pre:rounded-b-lg prose-code:text-[#696a73] prose-code:dark:text-[#8B99AE] prose-code:font-bold prose-code:bg-[#E6ECF3] prose-code:dark:bg-[#0f1419] prose-code:py-1 prose-code:px-2 prose-code:rounded-md prose-table:border-collapse prose-blockquote:border-amber-500 prose-blockquote:bg-amber-300 prose-blockquote:bg-opacity-10 prose-blockquote:text-slate-500 prose-blockquote:dark:text-slate-400 prose-blockquote:not-italic prose-blockquote:px-5 prose-blockquote:py-2 prose-blockquote:rounded prose-headings:text-dark prose-headings:dark:text-white prose-strong:text-dark prose-strong:dark:text-white prose-p:text-accents-3 prose-p:dark:text-slate-400 prose-hr:border-slate-400 prose-li:text-accents-3 prose-li:dark:text-slate-400 prose-img:rounded prose-img:w-full prose-pre:bg-[#E6ECF3] prose-pre:dark:bg-[#0f1419]">
              <Toc content={content} />
              <div
                dangerouslySetInnerHTML={{ __html: marked(content) }}
                ref={post}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const allMarkdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(allMarkdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      frontmatter,
      slug,
      content,
      posts: posts.sort(sortPostsByDate),
    },
  };
}

export default DynamicSinglePagePost;
