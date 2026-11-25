import type { NextConfig } from "next";

/**
 * Canonical origin, inlined at build time so every render uses the same address.
 * Production builds use the live domain; set NEXT_PUBLIC_SITE_URL to override
 * (for example on a preview host). Development uses localhost.
 */
const PRODUCTION_URL = "https://www.souravkashyap.in";
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000")
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_SITE_URL: siteUrl },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
