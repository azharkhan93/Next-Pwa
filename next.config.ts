import type { NextConfig } from "next";
import withPWA from "next-pwa";

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

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false, // Enable PWA in all environments
  exclude: [
    ({ request }) => request.url.includes('_next/app-build-manifest.json'),
    ({ request }) => request.url.includes('_next/static/'),
    ({ request }) => request.url.includes('_next/webpack-runtime'),
    ({ request }) => request.url.includes('_next/ssg-manifest'),
    // Add other patterns to exclude
  ],
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
})(nextConfig);
