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
        ignored: ['**/node_modules/**', '**/public/sw.js', '**/public/workbox-*.js'],
      };
    }
    return config;
  },
  /* config options here */
};

export default nextConfig;
