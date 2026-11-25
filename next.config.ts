import type { NextConfig } from "next";

/**
 * Canonical origin, resolved once at build time and inlined, so pages that
 * re-render later on the server use the same address as the build:
 *  1. NEXT_PUBLIC_SITE_URL — explicit override.
 *  2. Netlify's URL — the site's primary address (the custom domain once set).
 *  3. Vercel's production URL.
 *  4. localhost, for local development.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NETLIFY === "true" && process.env.URL ? process.env.URL : undefined) ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
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
