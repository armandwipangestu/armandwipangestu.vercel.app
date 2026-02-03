/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    unoptimized: true,
  },
  async redirects() {
    if (process.env.ENABLE_REDIRECT_TO_NEW_WEBSITE === "true") {
      return [
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
