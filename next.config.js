/** @type {import('next').NextConfig} */

const { LEGACY_SLUG_MAP } = require("./utilities/legacy-slug-map");

const typoRedirects = Object.entries(LEGACY_SLUG_MAP).map(
  ([from, to]) => ({
    source: `/blog/posts/${from}`,
    destination: `${process.env.NEW_WEBSITE_URL}/id/blog/${to}`,
    permanent: true,
  })
);

const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    unoptimized: true,
  },
  async redirects() {
    if (process.env.ENABLE_REDIRECT_TO_NEW_WEBSITE === "true") {
      return [
        ...typoRedirects,
        {
          source: "/blog/posts/:slug",
          destination: `${process.env.NEW_WEBSITE_URL}/id/blog/:slug`,
          permanent: false,
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;
