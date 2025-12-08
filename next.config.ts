import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Prevent multiple service worker generation in development
    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/public/sw.js",
          "**/public/workbox-*.js",
        ],
      };
    }
    return config;
  },
  turbopack: {
    // Turbopack configuration
    // Note: Turbopack handles file watching differently than webpack
    // The watchOptions from webpack are not directly applicable here
  },
  /* config options here */
};

export default nextConfig;
