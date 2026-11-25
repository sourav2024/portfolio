// Builds the résumé as PDF (HTML printed by headless Chrome) and DOCX (docx-js)
// from resume/content.mjs.
//
//   npm run resume             # writes resume/dist/ and updates public/<pdf> for the site
//   npm run resume -- --draft  # writes resume/dist/*_draft.* only; nothing else is touched
//   CHROME_PATH=/path/to/chrome npm run resume
//   RESUME_SITE_URL=https://example.com npm run resume   # portfolio link in the header

import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  AlignmentType, BorderStyle, Document, ExternalHyperlink, LevelFormat, Packer,
  Paragraph, TabStopType, TextRun,
} from "docx";
import { resume as r } from "./content.mjs";

const draft = process.argv.includes("--draft");
const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, "dist");
const publicName = "Sourav_Kashyap_Resume_2027";
const base = draft ? `${publicName}_draft` : publicName;
mkdirSync(dist, { recursive: true });

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ───────────────────────── HTML → PDF ─────────────────────────
function html() {
  const link = (c) => `<a href="${c.href}">${esc(c.label)}</a>`;
  const sep = ` <span class="sep">|</span> `;

  const jobs = r.experience
    .map(
      (j) => `
    <div class="item">
      <div class="row"><span class="strong">${esc(j.role)}</span><span class="date">${esc(j.period)}</span></div>
      <p class="org"><span class="company">${esc(j.company)}</span> · ${esc(j.context)}</p>
      <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      ${j.stack ? `<p class="stack"><span class="strong">Stack:</span> ${esc(j.stack)}</p>` : ""}
    </div>`,
    )
    .join("");

  const featured = r.featured
    .map(
      (p) => `
    <div class="item">
      <div class="row"><span class="strong proj">${esc(p.name)}</span><a class="date" href="${p.href}">${esc(p.link)}</a></div>
      <p class="org">${esc(p.descriptor)}</p>
      <ul>${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      <p class="stack"><span class="strong">Stack:</span> ${esc(p.stack)}</p>
    </div>`,
    )
    .join("");

  const additional = r.additional
    .map(
      (p) => `
    <div class="item">
      <div class="row"><span><span class="strong">${esc(p.name)}</span> · ${esc(p.descriptor)}</span><a class="date" href="${p.href}">${esc(p.link)}</a></div>
      <p>${esc(p.text)}</p>
      <p class="stack"><span class="strong">Stack:</span> ${esc(p.stack)}</p>
    </div>`,
    )
    .join("");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(r.name)} — Résumé</title>
<style>
  @page { size: A4; margin: 12mm 16mm 12mm; }
  * { box-sizing: border-box; }
  body { font-family: "Helvetica Neue", Arial, sans-serif; font-size: 9.6pt; line-height: 1.34; color: #17181b; margin: 0; }
  a { color: inherit; text-decoration: none; }
  p { margin: 0; }
  .strong { font-weight: 600; }

  h1 { font-size: 22pt; font-weight: 600; letter-spacing: -0.2pt; line-height: 1.1; margin: 0; }
  .title { font-size: 11.5pt; font-weight: 600; color: #1d5c4c; margin-top: 3pt; }
  .focus { font-size: 9.6pt; color: #33363b; margin-top: 1.5pt; }
  .contact { font-size: 9.4pt; color: #33363b; margin-top: 4pt; }
  .sep { color: #a9a69c; padding: 0 1.5pt; }
  .contact2 { font-size: 9.4pt; color: #33363b; margin-top: 1pt; }
  .avail { font-size: 9.4pt; color: #17181b; margin-top: 2pt; }

  h2 { font-size: 9.6pt; font-weight: 700; text-transform: uppercase; color: #1d5c4c;
       margin: 10pt 0 4.5pt; padding-bottom: 2.5pt; border-bottom: 0.75pt solid #c9c6bc; break-after: avoid; }
  h2.newpage { break-before: page; margin-top: 0; }
  h3 { font-size: 9.6pt; font-weight: 600; color: #33363b; margin: 9pt 0 4pt; break-after: avoid; }

  ul { margin: 2.5pt 0 0; padding-left: 11.5pt; }
  li { margin: 0 0 1.7pt; padding-left: 1pt; }
  ul.skills { list-style: none; padding: 0; margin: 0; }
  ul.skills li { margin-bottom: 1.2pt; padding: 0; }

  .item { margin-bottom: 6.5pt; break-inside: avoid; }
  .item:last-child { margin-bottom: 0; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 12pt; }
  .proj { font-size: 10.6pt; }
  .date { color: #33363b; white-space: nowrap; font-size: 9.4pt; }
  .org { color: #33363b; }
  .company { font-weight: 600; color: #17181b; }
  .stack { color: #33363b; font-size: 9.3pt; margin-top: 2pt; }
  /* Page 2 has room: let the project blocks breathe. */
  .p2 h2 { margin-top: 15pt; margin-bottom: 6pt; }
  .p2 h2.newpage { margin-top: 0; }
  .p2 h3 { margin: 14pt 0 5pt; }
  .p2 .item { margin-bottom: 11pt; }
  .p2 li { margin-bottom: 2.6pt; }
  .p2 ul { margin-top: 3.5pt; }
  .p2 ul.skills { margin-top: 0; }
  .p2 .stack { margin-top: 3pt; }
</style></head><body>
  <h1>${esc(r.name)}</h1>
  <p class="title">${esc(r.title)}</p>
  <p class="focus">${esc(r.focus)}</p>
  <p class="contact">${esc(r.location)}${sep}${r.contactRows[0].map(link).join(sep)}</p>
  <p class="contact2">${r.contactRows[1].map(link).join(sep)}</p>
  <p class="avail">${esc(r.availability)}</p>

  <h2>Summary</h2>
  <p>${esc(r.summary)}</p>

  <h2>Technical Skills</h2>
  <ul class="skills">${r.skills.map(([k, v]) => `<li><span class="strong">${esc(k)}:</span> ${esc(v)}</li>`).join("")}</ul>

  <h2>Professional Experience</h2>
  ${jobs}

  <div class="p2">
  <h2 class="newpage">Projects — Independent Engineering Work</h2>
  ${featured}

  <h3>Additional independent products</h3>
  ${additional}

  <h2>Open Source</h2>
  <ul class="skills">${r.openSource.map((g) => `<li><span class="strong">${esc(g.label)}:</span> ${g.links.map(link).join(sep)}</li>`).join("")}</ul>

  <h2>Education</h2>
  <div class="item">
    <div class="row"><span class="strong">${esc(r.education.degree)}</span><span class="date">${esc(r.education.period)}</span></div>
    <p class="org">${esc(r.education.school)} · ${esc(r.education.detail)}</p>
  </div>
  </div>
</body></html>`;
}

const htmlPath = path.join(dist, `${base}.html`);
const pdfPath = path.join(dist, `${base}.pdf`);
writeFileSync(htmlPath, html());

const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (!existsSync(chrome)) throw new Error(`Chrome not found at ${chrome}; set CHROME_PATH`);
execFileSync(chrome, [
  "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
  `--print-to-pdf=${pdfPath}`, `file://${htmlPath}`,
], { stdio: "ignore" });
if (!draft) copyFileSync(pdfPath, path.join(here, "..", "public", `${publicName}.pdf`));

// ───────────────────────── DOCX ─────────────────────────
const FONT = "Arial";
const INK = "17181B";
const ACCENT = "1D5C4C";
const MUTED = "33363B";
// A4 with 0.65" side margins → text width for the right-aligned tab stop.
const SIDE = 936;
const TEXT_W = 11906 - 2 * SIDE;
const BODY = 19; // half-points → 9.5pt

// Every run sets font and size explicitly: some viewers ignore document defaults.
const T = (o) => new TextRun(typeof o === "string" ? { text: o, font: FONT, size: BODY } : { font: FONT, size: BODY, ...o });
const A = (c, opts = {}) => new ExternalHyperlink({ link: c.href, children: [T({ text: c.label, ...opts })] });
const SEP = (opts = {}) => T({ text: "  |  ", color: "A9A69C", ...opts });

const heading = (text, { pageBreak = false } = {}) =>
  new Paragraph({
    keepNext: true,
    pageBreakBefore: pageBreak,
    spacing: { before: pageBreak ? 0 : 200, after: 90 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "C9C6BC", space: 2 } },
    children: [T({ text: text.toUpperCase(), bold: true, color: ACCENT })],
  });

const subheading = (text) =>
  new Paragraph({ keepNext: true, spacing: { before: 160, after: 60 }, children: [T({ text, bold: true, color: MUTED })] });

const rowLine = (left, right, rightHref) =>
  new Paragraph({
    keepNext: true,
    tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W }],
    spacing: { before: 110, after: 10 },
    children: [
      ...left,
      T("\t"),
      rightHref ? A({ label: right, href: rightHref }, { color: MUTED, size: 18 }) : T({ text: right, color: MUTED, size: 18 }),
    ],
  });

const bullet = (text) =>
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 24 }, children: [T(text)] });

const plain = (children, spacing = { after: 30 }, extra = {}) => new Paragraph({ spacing, children, ...extra });

const children = [
  plain([T({ text: r.name, bold: true, size: 42 })], { after: 30 }),
  plain([T({ text: r.title, bold: true, color: ACCENT, size: 23 })], { after: 20 }),
  plain([T({ text: r.focus, color: MUTED })], { after: 60 }),
  plain(
    [T({ text: r.location, color: MUTED, size: 18 }), ...r.contactRows[0].flatMap((c) => [SEP({ size: 18 }), A(c, { color: MUTED, size: 18 })])],
    { after: 10 },
  ),
  plain(r.contactRows[1].flatMap((c, i) => [...(i ? [SEP({ size: 18 })] : []), A(c, { color: MUTED, size: 18 })]), { after: 30 }),
  plain([T({ text: r.availability, size: 18 })], { after: 20 }),

  heading("Summary"),
  plain([T(r.summary)]),

  heading("Technical Skills"),
  ...r.skills.map(([k, v]) => plain([T({ text: `${k}: `, bold: true }), T(v)], { after: 16 })),

  heading("Professional Experience"),
  ...r.experience.flatMap((j) => [
    rowLine([T({ text: j.role, bold: true })], j.period),
    plain([T({ text: j.company, bold: true }), T({ text: ` · ${j.context}`, color: MUTED })], { after: 30 }, { keepNext: true }),
    ...j.bullets.map(bullet),
    ...(j.stack ? [plain([T({ text: "Stack: ", bold: true, color: MUTED, size: 18 }), T({ text: j.stack, color: MUTED, size: 18 })])] : []),
  ]),

  heading("Projects — Independent Engineering Work", { pageBreak: true }),
  ...r.featured.flatMap((p) => [
    rowLine([T({ text: p.name, bold: true, size: 21 })], p.link, p.href),
    plain([T({ text: p.descriptor, color: MUTED })], { after: 30 }, { keepNext: true }),
    ...p.bullets.map(bullet),
    plain([T({ text: "Stack: ", bold: true, color: MUTED, size: 18 }), T({ text: p.stack, color: MUTED, size: 18 })]),
  ]),

  subheading("Additional independent products"),
  ...r.additional.flatMap((p) => [
    rowLine([T({ text: p.name, bold: true }), T(` · ${p.descriptor}`)], p.link, p.href),
    plain([T(p.text)], { after: 20 }),
    plain([T({ text: "Stack: ", bold: true, color: MUTED, size: 18 }), T({ text: p.stack, color: MUTED, size: 18 })]),
  ]),

  heading("Open Source"),
  ...r.openSource.map((g) =>
    plain([T({ text: `${g.label}: `, bold: true }), ...g.links.flatMap((c, i) => [...(i ? [SEP()] : []), A(c)])], { after: 16 }),
  ),

  heading("Education"),
  rowLine([T({ text: r.education.degree, bold: true })], r.education.period),
  plain([T({ text: `${r.education.school} · ${r.education.detail}`, color: MUTED })]),
];

const doc = new Document({
  creator: r.name,
  title: `${r.name} — Résumé`,
  styles: { default: { document: { run: { font: FONT, size: BODY, color: INK }, paragraph: { spacing: { line: 259 } } } } },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 280, hanging: 200 } } },
      }],
    }],
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 760, bottom: 760, left: SIDE, right: SIDE } } },
    children,
  }],
});

const docxPath = path.join(dist, `${base}.docx`);
writeFileSync(docxPath, await Packer.toBuffer(doc));

console.log(`${draft ? "DRAFT — public/ not updated\n" : ""}PDF  ${pdfPath}\nDOCX ${docxPath}`);
