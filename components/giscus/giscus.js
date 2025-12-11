"use client";
import { useEffect, useState } from "react";

export default function GiscusLoader() {
  const [theme, setTheme] = useState("light");

  // Detect theme from <html> class
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      const isDark = html.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    // Initial theme
    const isDark = html.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    return () => observer.disconnect();
  }, []);

  // Inject + update Giscus theme
  useEffect(() => {
    const existingScript = document.getElementById("giscus-script");

    if (!existingScript) {
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
      // Update theme dynamically
      const iframe = document.querySelector("iframe.giscus-frame");
      if (iframe) {
        iframe.contentWindow.postMessage(
          {
            giscus: {
              setConfig: { theme },
            },
          },
          "https://giscus.app"
        );
      }
    }
  }, [theme]);

  return <div id="giscus-thread" className="mt-10"></div>;
}
