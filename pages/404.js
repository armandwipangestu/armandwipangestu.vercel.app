import React, { useState, useEffect } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
// import "highlight.js/styles/github-dark.css";
import ReactTyped from "react-typed";
import { GoCopy, GoCheck } from "react-icons/go";
import Link from "next/link";
import Metadata from "@/components/utilities/metadata";
import { useRouter } from "next/router";

const markdown = `
  \`\`\`js
import cors from "cors";

router.use(cors({
    methods: ["GET"],
}))

router.get('/404', async (req, res) => {
    const result = await get404PageNotFound()

    res.status(404).send({
        data: result,
        status_code: '404 Not Found',
    })
})
  \`\`\`
`;

const Custom404 = () => {
  const router = useRouter();
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
        title="Error! 404 Page Not Found"
        description="Halaman Tidak Ditemukan"
        image="/metadata/blog.png"
        url="404-page-not-found"
      />

      <section className="pb-36 pt-36 transition-all duration-300 dark:bg-dark">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full self-center px-4 lg:w-1/2">
              <h1 className="mb-10 text-base font-semibold md:text-xl">
                <span className="mt-1 block text-3xl font-bold text-dark dark:text-gray dark:text-white lg:text-5xl">
                  Error!{" "}
                  <span className="animate-gradient-pulse from-background to-background text-foreground ml-1 inline-block -rotate-1 rounded-xl bg-gradient-to-r via-primary/10 px-4 py-1.5 text-lg tracking-tight shadow-2xl shadow-primary/[0.25] ring-2 ring-dark/70 dark:ring-white/70 sm:px-4 sm:py-3 sm:text-3xl lg:text-4xl">
                    <ReactTyped
                      strings={["404 Page Not Found"]}
                      typeSpeed={40}
                      loop
                      backSpeed={15}
                      className="font-bold text-dark dark:text-white"
                    />{" "}
                  </span>
                </span>
              </h1>

              {/* <Link
                href="/"
                className="rounded-full bg-dark px-7 py-2.5 text-base font-semibold text-white transition duration-300 ease-in-out hover:opacity-80 hover:shadow-lg dark:bg-white dark:text-dark md:px-8 md:py-3"
              >
                Kembali
              </Link> */}
              <button
                className="rounded-full bg-dark px-7 py-2.5 text-base font-semibold text-white transition duration-300 ease-in-out hover:opacity-80 hover:shadow-lg dark:bg-white dark:text-dark md:px-8 md:py-3"
                type="button"
                onClick={() => router.back()}
              >
                Kembali
              </button>
            </div>

            <div className="mt-10 w-full self-center rounded-lg px-4 lg:w-1/2">
              <div className="w-full rounded-lg shadow-2xl shadow-primary/[0.25]">
                <div className="flex h-9 w-full items-center justify-start space-x-1.5 rounded-t-lg bg-slate-400/30 px-3 transition-all duration-300 dark:bg-slate-800">
                  <div className="h-3 w-3 rounded-full bg-red-400 border-[2.5px] border-[#696a73]"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400 border-[2.5px] border-[#696a73]"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400 border-[2.5px] border-[#696a73]"></div>
                  <div className="flex-grow"></div>
                  <div className="text-center text-sm font-semibold text-white">
                    <span className="text-slate-400">{languageText}</span>
                  </div>
                  <div className="flex-grow"></div>
                  <div
                    className="group cursor-pointer text-center text-sm font-semibold text-white"
                    id="copy-code"
                  >
                    {copyButtonText === "Copy" ? (
                      <>
                        <GoCopy className="text-dark transition-all duration-300 dark:text-white" />
                        <span className="absolute mt-4 right-[19rem] scale-0 rounded p-2 text-xs bg-dark text-white dark:bg-white dark:text-dark group-hover:scale-100 w-[4.5rem] whitespace-normal transition duration-200 ease-in-out font-bold">
                          ✨ Copy
                        </span>
                      </>
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
    </>
  );
};

export default Custom404;
