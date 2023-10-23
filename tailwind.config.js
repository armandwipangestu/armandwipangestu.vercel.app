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
    },
  },
  plugins: [],
};
