# sourav2024/portfolio

**Live:** https://www.souravkashyap.in

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

## Design system

Tokens and the type scale live in `src/app/globals.css`; components only use those.

- **Colour:** dark by default (`--bg #0c0d0f`, warm off-white text, one mint accent), with a light theme behind the toggle. Every text colour meets WCAG AA (≥ 5.4:1) in both themes.
- **Type:** Newsreader (display), Geist (text), Geist Mono (metadata). Utilities: `t-display`, `t-h2`, `t-h3`, `t-lede`, `t-body`, `t-small`, `t-meta`, `t-label`. Nothing renders below 13px; `t-label` is the only uppercase style.
- **Layout:** `container-page` (72rem) and `section-y` for rhythm; `Section` gives the rail + content grid.
- **Components:** `ui.tsx` (ButtonLink, ExternalLink, Tag, StatusPill), `nav.tsx` (scroll-spy nav and mobile menu), `project.tsx`.

## Deploy

Hosted on **Vercel** (free Hobby plan) at https://www.souravkashyap.in. Every push to `main` builds and deploys. `souravkashyap.in` redirects to the `www` address.

The canonical URL, sitemap and Open Graph tags use `PRODUCTION_URL` in `next.config.ts`. If the domain ever changes, update it there and in `resume/content.mjs`, then run `npm run resume`.

DNS is at Hostinger: an `A` record for `@` and a `CNAME` for `www`, both pointing at Vercel.
