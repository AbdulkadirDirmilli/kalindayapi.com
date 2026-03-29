import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
    // Uploaded files are served by nginx, skip optimization for them
    unoptimized: false,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
    // Allow larger request bodies for API routes
    middlewarePrefetch: 'flexible',
  },
  // Increase body size limit for API routes
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
    responseLimit: false,
  },
};

export default nextConfig;
