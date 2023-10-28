import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import hljs from "highlight.js";
import Toc from "@/components/utilities/toc";
import { useRef, useEffect, useState } from "react";
import { GoCopy, GoCheck } from "react-icons/go";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import useReadingTime from "use-reading-time";
import Metadata from "@/components/utilities/metadata";
import { sortPostsByDate, formatDate } from "@/utilities/sortPostsByDate";

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
        // Menggunakan Text
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

          // Menggunakan Text
          copyDiv.innerText = "Copied!";

          setTimeout(() => {
            // Menggunakan Text
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
        image={cover_image}
        url={`blog/posts/${slug}`}
      />

      <div className="pb-36 pt-36 transition duration-300 ease-in-out dark:bg-dark">
        <div className="container">
          <div className="mx-auto px-4 sm:px-6 md:px-4 lg:max-w-6xl lg:px-8 xl:max-w-7xl">
            <div className="-mt-24 lg:mt-[-9rem] border-b border-dark/20 dark:border-white/20">
              <div className="relative isolate pt-14">
                <div
                  className="absolute inset-x-0 midnight:hidden -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-cyan-800/90 to-cyan-800/90 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                  ></div>
                </div>
                {/* <svg
                  className="absolute inset-0 -z-10 h-full w-full dark:stroke-accent/50 dark:[mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                      width="200"
                      height="200"
                      x="50%"
                      y="-1"
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M100 200V.5M.5 .5H200" fill="none"></path>
                    </pattern>
                  </defs>
                  <svg
                    x="50%"
                    y="-1"
                    className="dark:overflow-visible dark:fill-accent/20"
                  >
                    <path
                      d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                      strokeWidth="0"
                    ></path>
                  </svg>
                  <rect
                    width="100%"
                    height="100%"
                    strokeWidth="0"
                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  ></rect>
                </svg> */}
                <div className="pt-16 sm:pt-16 md:pt-16 md:pb-0 max-w-screen-2xl mx-auto overflow-hidden lg:grid lg:grid-cols-12 lg:items-center lg:pt-40 lg:pb-28">
                  <div className="col-span-6 sm:px-6 lg:pl-0 max-w-2xl px-4 col-start-2 lg:px-0 ml-0 lg:ml-[-1rem] xl:ml-[-0.5rem] lg:flex-auto lg:pr-16">
                    <h1 className="lg:max-w-lg text-2xl font-bold tracking-tighter text-foreground sm:text-3xl lg:text-4xl/[2.5rem]">
                      {title}
                    </h1>
                    <p className="mt-2 lg:max-w-xl leading-relaxed text-slate-400 sm:mt-4 sm:text-lg sm:leading-7">
                      {excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-1 mt-4">
                        <Link
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs tracking-tight font-medium transition-colors focus:outline-none border-cyan-500/40 bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20"
                          href={`/blog/tag/${tag.toLowerCase()}`}
                        >
                          {tag}
                        </Link>
                      </div>
                    </div>
                    <div className="my-8 flex items-center justify-between gap-x-2">
                      <div className="tracking-tighter text-sm text-muted-foreground">
                        <div className="flex">
                          <div className="mr-4 flex-shrink-0">
                            <div className="LazyLoad is-visible">
                              <img
                                className="rounded-full w-12 h-12"
                                src={author_image}
                                loading="lazy"
                                style={{ opacity: 1 }}
                              />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">
                              {author_name}
                            </h4>
                            <p className="mt-1 text-slate-400">
                              <span>{formatDate(date)}</span>
                              <span className="mx-1">•</span>
                              <span>{readingTime} min read</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-8 lg:mr-4 lg:mt-0 col-span-5 lg:flex-shrink-0 lg:flex-grow">
                    <div
                      data-radix-aspect-ratio-wrapper=""
                      style={{
                        position: "relative",
                        width: "100%",
                        paddingBottom: "56.25%",
                      }}
                    >
                      <div
                        className="grid place-content-center overflow-hidden lg:rounded-lg lg:ring-1 lg:ring-border/70 lg:ring-black font-mono text-xl font-medium tracking-tighter text-accent-foreground dark:shadow-xl"
                        style={{ position: "absolute", inset: "0px" }}
                      >
                        <img
                          className="object-cover object-center w-full h-full rounded-md"
                          height="720"
                          width="1280"
                          src={cover_image}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

  // Ganti `${NEXT_PUBLIC_PUBLIC_ASSETS}` dengan nilai yang benar dalam konten
  const contentWithReplacedBaseUrl = content.replace(
    /\$\{NEXT_PUBLIC_PUBLIC_ASSETS\}/g,
    process.env.NEXT_PUBLIC_PUBLIC_ASSETS
  );

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
      content: contentWithReplacedBaseUrl, // Gunakan konten yang telah diganti baseUrl
      posts: posts.sort(sortPostsByDate),
    },
  };
}

export default DynamicSinglePagePost;
