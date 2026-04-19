import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // SEO: tek format → trailing slash YOK. Proxy ek olarak 301 ile normalize ediyor.
  trailingSlash: false,
  skipTrailingSlashRedirect: false,

  // SEO: Tüm trafiği https://www.kalindayapi.com'a yönlendir
  async redirects() {
    return [
      // non-www → www (HTTPS)
      {
        source: "/:path*",
        has: [{ type: "host", value: "kalindayapi.com" }],
        destination: "https://www.kalindayapi.com/:path*",
        permanent: true,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kalindayapi.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.kalindayapi.com",
        pathname: "/uploads/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/uploads/**",
      },
      {
        pathname: "/images/**",
      },
      {
        pathname: "/*.png",
      },
      {
        pathname: "/*.jpg",
      },
      {
        pathname: "/*.svg",
      },
    ],
    // Uploaded files are served by nginx, skip optimization for them
    unoptimized: false,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
};

export default nextConfig;
