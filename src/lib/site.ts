import { existsSync } from "node:fs";
import path from "node:path";
import { profile } from "@/content/site";

/** Canonical origin. Resolved at build time in next.config.ts and inlined. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** The portrait only renders when the image is actually in /public. */
export const photoSrc = existsSync(path.join(process.cwd(), "public", profile.photoFile))
  ? `/${profile.photoFile}`
  : null;

/** The résumé CTA only renders when the PDF is actually in /public. */
export const resumeHref = existsSync(path.join(process.cwd(), "public", profile.resumeFile))
  ? `/${profile.resumeFile}`
  : null;
