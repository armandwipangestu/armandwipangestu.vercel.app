"use client";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";
export const ssr = false;

const giscusConfig = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  mapping: process.env.NEXT_PUBLIC_GISCUS_MAPPING ?? "pathname",
  lang: process.env.NEXT_PUBLIC_GISCUS_LANG ?? "en",
};

export default function GiscusLoader() {
  const [theme, setTheme] = useState(null);
  const [ready, setReady] = useState(false);

  // Detect theme ASAP
  useEffect(() => {
    const html = document.documentElement;

    const updateTheme = () => {
      const isDark = html.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    updateTheme();
    setReady(true);

    const observer = new MutationObserver(updateTheme);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Always run hook — only execute logic when ready + theme available
  useEffect(() => {
    if (!ready || !theme) return; // ← Hook tetap dipanggil, logic-nya yang stop

    const iframe = document.querySelector("iframe.giscus-frame");

    if (!iframe) {
      const script = document.createElement("script");
      script.id = "giscus-script";
      script.src = "https://giscus.app/client.js";
      script.async = true;
      script.crossOrigin = "anonymous";

      script.setAttribute("data-repo", giscusConfig.repo);
      script.setAttribute("data-repo-id", giscusConfig.repoId);
      script.setAttribute("data-category", giscusConfig.category);
      script.setAttribute("data-category-id", giscusConfig.categoryId);
      script.setAttribute("data-mapping", giscusConfig.mapping);
      script.setAttribute("data-theme", theme);
      script.setAttribute("data-lang", giscusConfig.lang);

      document.getElementById("giscus-thread").appendChild(script);
    } else {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme } } },
        "https://giscus.app"
      );
    }
  }, [ready, theme]);

  // Render container dulu saja
  return <div id="giscus-thread" className="mt-10"></div>;
}
