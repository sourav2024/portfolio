import { cacheLife } from "next/cache";

export type NpmMeta = { version: string; published: string } | null;

/**
 * Latest version and publish date of an npm package, cached for a day.
 * Returns null on any failure so the UI can simply omit the live badge —
 * the page never shows a stale hardcoded version as if it were live.
 */
export async function getNpmMeta(pkg: string): Promise<NpmMeta> {
  "use cache";
  cacheLife("days");

  try {
    const res = await fetch(`https://registry.npmjs.org/${pkg.replace("/", "%2F")}`, {
      headers: { accept: "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      "dist-tags"?: { latest?: string };
      time?: Record<string, string>;
      modified?: string;
    };
    const version = data["dist-tags"]?.latest;
    if (!version) return null;
    const published = data.time?.[version] ?? data.modified ?? "";
    return { version, published: published.slice(0, 10) };
  } catch {
    return null;
  }
}
