import { existsSync } from "node:fs";
import path from "node:path";
import { profile } from "@/content/site";

/**
 * Canonical origin, in order of preference:
 *  1. NEXT_PUBLIC_SITE_URL — set explicitly to override everything.
 *  2. Netlify's URL — the site's main address at build time; this becomes the
 *     custom domain automatically once one is connected.
 *  3. Vercel's production URL.
 *  4. localhost, for local development.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NETLIFY === "true" && process.env.URL ? process.env.URL : undefined) ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/** The portrait only renders when the image is actually in /public. */
export const photoSrc = existsSync(path.join(process.cwd(), "public", profile.photoFile))
  ? `/${profile.photoFile}`
  : null;

/** The résumé CTA only renders when the PDF is actually in /public. */
export const resumeHref = existsSync(path.join(process.cwd(), "public", profile.resumeFile))
  ? `/${profile.resumeFile}`
  : null;
