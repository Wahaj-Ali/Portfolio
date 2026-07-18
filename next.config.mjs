/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ur", "es", "ar"],
    defaultLocale: "en",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [384, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 176, 256],
  },
  async rewrites() {
    return [
      { source: "/robots.txt", destination: "/api/robots" },
      { source: "/sitemap.xml", destination: "/api/sitemap" },
    ];
  },
};

export default nextConfig;
