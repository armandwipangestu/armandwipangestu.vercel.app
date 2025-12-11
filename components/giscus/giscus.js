"use client";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";
export const ssr = false;

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

      script.setAttribute("data-repo", "armandwipangestu/giscus-comments");
      script.setAttribute("data-repo-id", "R_kgDOQm7OKQ");
      script.setAttribute("data-category", "Blog-Comments");
      script.setAttribute("data-category-id", "DIC_kwDOQm7OKc4Czqkl");
      script.setAttribute("data-mapping", "pathname");
      script.setAttribute("data-theme", theme);
      script.setAttribute("data-lang", "en");

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
