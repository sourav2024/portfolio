# sourav2024/portfolio

Personal site of Sourav Kashyap: full-stack software engineer (TypeScript, Node.js, React Native, production AI and developer tools).

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · Lucide icons. No other runtime dependencies, no analytics, no secrets.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build && npm start
```

## Where things live

| Path | What |
|---|---|
| `src/content/site.ts` | **All copy**: profile, experience, projects, skills. Every claim must be verifiable (commit, public repo, npm release or store listing). |
| `src/lib/npm.ts` | Live npm version and publish date per package (`'use cache'` with `cacheLife('days')`). Returns `null` on failure, so the badge simply disappears. |
| `src/lib/site.ts` | Canonical URL resolution; the portrait and résumé links render only when their files exist in `public/`. |
| `src/app/` | Page, 404, `sitemap.xml`, `robots.txt`, generated Open Graph image, SVG favicon, JSON-LD `Person` in the layout. |
| `public/projects/` | Genuine project images (store screenshots, a generated report). |

### Résumé

The résumé is generated from `resume/content.mjs`. Edit that file, then run:

```bash
npm run resume                                        # PDF + DOCX in resume/dist/, PDF copied to public/
RESUME_SITE_URL=https://yourdomain.com npm run resume  # adds the portfolio link once deployed
```

The PDF is printed by headless Chrome (macOS default path; set `CHROME_PATH` elsewhere). Both formats are single-column with real text, so applicant-tracking systems can parse them. The "Download résumé" buttons render only while `public/Sourav_Kashyap_Resume_2027.pdf` exists.

The hero portrait is `public/sourav-kashyap.jpg`. It renders only while that file exists.

## Deploy (free tier, no domain needed)

**Vercel (recommended):** import this repo at vercel.com/new. Use the framework preset Next.js with default settings. The production URL is detected automatically for canonical, sitemap and OG tags.

Other Node hosts work too: `npm run build && npm start`. Set `NEXT_PUBLIC_SITE_URL` to the public origin.

## Connecting a custom domain later

1. In Vercel go to Project → Settings → Domains → add `yourdomain.com` (and `www`).
2. At the registrar, add the DNS records Vercel shows. These are usually an `A` record to `76.76.21.21` for the apex and a `CNAME` for `www` to `cname.vercel-dns.com`.
3. Set the env var `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` and redeploy, so canonical, sitemap and OG URLs use the domain.
4. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.
