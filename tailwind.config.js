/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#31B5D5",
        secondary: "#64748b",
        dark: "#010613",
        white: "#ffffff",
        accent: "#1a2332",
        "accents-100": "#111",
        "accents-200": "#333",
        "accents-300": "#444",
        "accents-400": "#666",
        "accents-500": "#888",
        "accents-600": "#999",
        "accents-700": "#eaeaea",
        "accents-800": "#fafafa",
        "emphasis-200": "#ebedf0",
        "emphasis-gray-600": "#8d949e",
        "emphasis-gray-700": "#606770",
        "emphasis-gray-800": "#444950",
      },
      screens: {
        "2xl": "1320px",
      },
      typography: ({}) => ({
        DEFAULT: {
          css: {
            pre: {
              // "background-color": "#0f1419",
              "font-family": "Fira Code, monospace",
            },
            p: {
              "&::before": {
                content: '"" !important',
              },
              "&::after": {
                content: '"" !important',
              },
            },
            code: {
              "&::before": {
                content: '"" !important',
              },
              "&::after": {
                content: '"" !important',
              },
            },
            li: {
              "&::marker": {
                color: "rgb(148 163 184)",
              },
              // color: "rgb(148 163 184)",
            },
            a: {
              "text-decoration": "none !important",
              "&:hover": {
                "text-decoration": "underline !important",
                color: "#1d4ed8",
              },
            },
            // "blockquote strong": {
            //   color: "#010613",
            //   opacity: 0.7,
            // },
            // table: {
            //   "border-color": ""
            // },
            "--tw-prose-body": "#888",
            "--tw-prose-headings": "#fff",
            "--tw-prose-lead": "#ffffff",
            "--tw-prose-links": "#3b82f6",
            "--tw-prose-bold": "#ffffff",
            "--tw-prose-counters": "#ffffff",
            "--tw-prose-bullets": "#ffffff",
            "--tw-prose-hr": "#ffffff",
            "--tw-prose-captions": "#ffffff",
            "--tw-prose-code": "rgb(226 232 240)",
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
