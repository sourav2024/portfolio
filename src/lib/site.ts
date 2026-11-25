import { existsSync } from "node:fs";
import path from "node:path";
import { profile } from "@/content/site";

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL once a custom domain is connected;
 * on Vercel the production URL is picked up automatically.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
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
