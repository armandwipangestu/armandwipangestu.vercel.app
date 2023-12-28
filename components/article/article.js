import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "@/utilities/sortPostsByDate";
import { useRouter } from "next/router";

const ArticleLayout = ({ posts, tag }) => {
  const [mainCard, setMainCard] = useState(posts[0]);
  const [cards, setCards] = useState(posts.slice(1));
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredIndex, setIsHoveredIndex] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQuery = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleMediaQuery);

    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="pt-24 transition-all duration-300 dark:bg-dark">
          <div className="container">
            <div className="mx-auto px-4 sm:px-6 md:px-4 lg:max-w-6xl lg:px-8 xl:max-w-7xl">
              <div className="space-y-10 sm:space-y-24">
                <div className="mx-auto">
                  <div className="flex items-center justify-center border-b border-dark pb-8 dark:border-white/10">
                    <h1 className="text-dark text-lg leading-5 dark:text-white">
                      {tag !== "posts" ? "#" : ""}
                      {tag}
                    </h1>
                  </div>
                </div>
                <div style={{ opacity: 1, transform: "none" }}>
                  <section>
                    <div className="grid gap-y-6 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 lg:gap-x-20 lg:gap-y-24">
                      <Link href={`/blog/posts/${mainCard.slug}`}>
                        <div
                          data-radix-aspect-ratio-wrapper=""
                          style={{
                            position: "relative",
                            width: "100%",
                            paddingBottom: "56.25%",
                          }}
                        >
                          <div
                            className="text-accent-foreground grid place-content-center overflow-hidden font-mono text-sm border border-dark/20 dark:border-white/20 rounded-[0.60rem]"
                            style={{
                              position: "absolute",
                              inset: "0px",
                            }}
                          >
                            <img
                              alt=""
                              height="360"
                              width="640"
                              src={mainCard.frontmatter.cover_image}
                              className={`transition duration-300 ease-in-out hover:scale-110 ${
                                isHovered ? "scale-110" : ""
                              }`}
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                            />
                          </div>
                        </div>
                      </Link>
                      <div className="rounded-lg">
                        <div className="line-clamp-1 dark:text-white">
                          <Link
                            className="text-lg font-medium"
                            href={`/blog/posts/${mainCard.slug}`}
                          >
                            <span
                              className={`hover:text-primary transition duration-300 ease-in-out ${
                                isHovered ? "text-primary" : ""
                              }`}
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                            >
                              {mainCard.frontmatter.title}
                            </span>
                          </Link>
                        </div>
                        <div className="mb-4 mt-2 line-clamp-2 text-sm text-slate-400">
                          {mainCard.frontmatter.excerpt}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-x-1">
                            <Link
                              href={`/blog/tag/${mainCard.frontmatter.tag.toLowerCase()}`}
                            >
                              <div className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium tracking-tight text-cyan-500 transition-colors hover:bg-cyan-500/20 focus:outline-none">
                                {mainCard.frontmatter.tag}
                              </div>
                            </Link>
                          </div>
                          <div className="font-mono text-xs tracking-tighter text-slate-400">
                            {formatDate(mainCard.frontmatter.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="transition-all duration-300 dark:bg-dark lg:block">
          <div className="mx-auto px-4 sm:px-6 md:px-4 lg:max-w-6xl lg:px-8 xl:max-w-full">
            <div className="relative isolate pt-14">
              <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
                className="midnight:hidden absolute inset-0 -z-10 h-full w-full stroke-accent/50 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
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
                <svg x="50%" y="-1" className="overflow-visible fill-accent/20">
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
              <div className="mx-auto max-w-screen-2xl overflow-hidden pt-16 sm:pt-16 md:pb-0 md:pt-16 lg:grid lg:grid-cols-12 lg:items-center lg:pb-28 lg:pt-40">
                <div className="col-span-6 col-start-2 ml-0 max-w-2xl px-4 sm:px-6 lg:ml-[-1rem] lg:flex-auto lg:px-0 lg:pl-0 lg:pr-16 xl:ml-[-0.5rem]">
                  <h1 className="text-2xl font-bold tracking-tighter dark:text-white sm:text-3xl lg:max-w-lg lg:text-4xl/[2.5rem]">
                    {mainCard.frontmatter.title}
                  </h1>
                  <p className="mt-2 leading-relaxed text-slate-400 sm:mt-4 sm:text-lg sm:leading-7 lg:max-w-xl">
                    {mainCard.frontmatter.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="mt-4 flex items-center gap-x-1">
                      <Link
                        className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium tracking-tight text-cyan-500 transition-colors hover:bg-cyan-500/20 focus:outline-none"
                        href={`/blog/tag/${mainCard.frontmatter.tag.toLowerCase()}`}
                      >
                        {mainCard.frontmatter.tag}
                      </Link>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-x-6 lg:mt-10">
                    <Link
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className={`rounded-full bg-dark px-7 py-2.5 text-base font-semibold text-white transition duration-300 ease-in-out hover:opacity-80 hover:shadow-lg dark:bg-white dark:text-dark md:px-8 md:py-3 ${
                        isHovered ? "opacity-80 shadow-lg" : ""
                      }`}
                      href={`/blog/posts/${mainCard.slug}`}
                    >
                      Baca selengkapnya
                    </Link>
                  </div>
                  <div className="my-8 flex items-center justify-between gap-x-2">
                    <div className="font-mono text-sm tracking-tighter text-slate-400">
                      <span>
                        {formatDate(mainCard.frontmatter.date)}
                        <a className="hover:text-foreground" href="#">
                          {" "}
                        </a>
                      </span>
                    </div>
                    <div className="hidden items-center justify-end gap-x-1 lg:flex"></div>
                  </div>
                </div>
                <div className="col-span-5 mt-6 sm:mt-8 lg:mr-4 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
                  <div
                    data-radix-aspect-ratio-wrapper=""
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingBottom: "56.25%",
                    }}
                  >
                    <div
                      className="text-accent-foreground z-10 grid place-content-center overflow-hidden font-mono text-sm border border-dark/20 dark:border-white/20 rounded-[0.60rem]"
                      style={{
                        position: "absolute",
                        inset: "0px",
                      }}
                    >
                      <Link href={`/blog/posts/${mainCard.slug}`}>
                        <img
                          alt="Progressive Web Apps"
                          className={`h-full w-full object-cover object-center lg:rounded-md transition duration-300 ease-in-out hover:scale-110 ${
                            isHovered ? "scale-110" : ""
                          }`}
                          height="720"
                          width="1280"
                          src={mainCard.frontmatter.cover_image}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pb-12 pt-12 transition-all duration-300 dark:bg-dark">
        <div className="container">
          <div className="mx-auto px-4 sm:px-6 md:px-4 lg:max-w-6xl lg:px-8 xl:max-w-7xl">
            <div className="space-y-10 sm:space-y-24">
              <div style={{ opacity: 1, transform: "none" }}>
                <section id="new_articles">
                  <div className="grid gap-y-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 lg:gap-x-20 lg:gap-y-24">
                    {cards.map((card, index) => (
                      <div key={index}>
                        <Link href={`/blog/posts/${card.slug}`}>
                          <div
                            data-radix-aspect-ratio-wrapper=""
                            style={{
                              position: "relative",
                              width: "100%",
                              paddingBottom: "56.25%",
                            }}
                          >
                            <div
                              className="text-accent-foreground z-10 grid place-content-center overflow-hidden font-mono text-sm border border-dark/20 dark:border-white/20 rounded-[0.60rem]"
                              style={{
                                position: "absolute",
                                inset: "0px",
                              }}
                            >
                              <img
                                alt=""
                                height="360"
                                width="640"
                                src={card.frontmatter.cover_image}
                                className={`transition duration-300 ease-in-out hover:scale-110 ${
                                  isHoveredIndex === index ? "scale-110" : ""
                                }`}
                                onMouseEnter={() => setIsHoveredIndex(index)}
                                onMouseLeave={() => setIsHoveredIndex(null)}
                              />
                            </div>
                          </div>
                        </Link>
                        <div className="mt-4 rounded-lg">
                          <div className="line-clamp-1 dark:text-white">
                            <Link
                              className="text-lg font-medium"
                              href={`/blog/posts/${card.slug}`}
                            >
                              <span
                                onMouseEnter={() => setIsHoveredIndex(index)}
                                onMouseLeave={() => setIsHoveredIndex(null)}
                                className={`hover:text-primary transition duration-300 ease-in-out ${
                                  isHoveredIndex === index ? "text-primary" : ""
                                }`}
                              >
                                {card.frontmatter.title}
                              </span>
                            </Link>
                          </div>
                          <div className="mb-4 mt-2 line-clamp-2 text-sm text-slate-400">
                            {card.frontmatter.excerpt}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-x-1">
                              <Link
                                href={`/blog/tag/${card.frontmatter.tag.toLowerCase()}`}
                              >
                                <div className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium tracking-tight text-cyan-500 transition-colors hover:bg-cyan-500/20 focus:outline-none">
                                  {card.frontmatter.tag}
                                </div>
                              </Link>
                            </div>
                            <div className="font-mono text-xs tracking-tighter text-slate-400">
                              {formatDate(card.frontmatter.date)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default ArticleLayout;
