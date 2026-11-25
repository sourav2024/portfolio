// Builds the résumé as PDF (HTML printed by headless Chrome) and DOCX (docx-js)
// from resume/content.mjs. Output: resume/dist/ and public/<pdf> for the site.
//
//   npm run resume                          # uses Google Chrome on macOS
//   CHROME_PATH=/path/to/chrome npm run resume
//   RESUME_SITE_URL=https://example.com npm run resume   # adds the portfolio link

import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  AlignmentType, BorderStyle, Document, ExternalHyperlink, LevelFormat, Packer,
  Paragraph, TabStopType, TextRun,
} from "docx";
import { resume as r } from "./content.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, "dist");
const base = "Sourav_Kashyap_Resume_2027";
mkdirSync(dist, { recursive: true });

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------- HTML → PDF ----------
function html() {
  const contacts = r.contacts.map((c) => `<a href="${c.href}">${esc(c.label)}</a>`).join(" · ");
  const skills = r.skills.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join("");
  const jobs = r.experience
    .map(
      (j) => `
    <div class="item">
      <div class="row"><span><b>${esc(j.role)}</b> · ${esc(j.company)}</span><span class="date">${esc(j.period)}</span></div>
      ${j.context ? `<p class="ctx">${esc(j.context)}</p>` : ""}
      <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      ${j.stack ? `<p class="stack"><b>Stack:</b> ${esc(j.stack)}</p>` : ""}
    </div>`,
    )
    .join("");
  const projects = r.projects
    .map(
      (p) => `
    <div class="item">
      <div class="row"><span><b>${esc(p.name)}</b> · ${esc(p.meta)}</span><a class="date" href="${p.href}">${esc(p.link)}</a></div>
      <p>${esc(p.text)}</p>
    </div>`,
    )
    .join("");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(r.name)} — Résumé</title>
<style>
  @page { size: A4; margin: 16mm 17mm; }
  * { box-sizing: border-box; }
  body { font-family: "Helvetica Neue", Arial, sans-serif; font-size: 10pt; line-height: 1.38; color: #17181b; margin: 0; }
  a { color: inherit; text-decoration: none; }
  h1 { font-size: 21pt; font-weight: 600; letter-spacing: -0.2pt; margin: 0; }
  .headline { font-size: 10.5pt; margin: 3pt 0 2pt; color: #1d5c4c; font-weight: 500; }
  .meta { font-size: 9.2pt; color: #45484e; margin: 0; }
  h2 { font-size: 9.5pt; text-transform: uppercase; color: #1d5c4c; margin: 13pt 0 5pt; padding-bottom: 2.5pt; border-bottom: 0.75pt solid #cfccc3; }
  p { margin: 0; }
  ul { margin: 2pt 0 0; padding-left: 12pt; }
  li { margin: 0 0 1.6pt; }
  ul.skills { list-style: none; padding: 0; }
  ul.skills li { margin-bottom: 1pt; }
  .item { margin-bottom: 7pt; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; gap: 12pt; }
  .date { color: #45484e; white-space: nowrap; font-size: 9.2pt; }
  .ctx { color: #45484e; font-style: italic; margin-top: 1pt; }
  .stack { color: #45484e; font-size: 9.2pt; margin-top: 2pt; }
  h2 + .item, h2 + p, h2 + ul { break-before: avoid; }
  h2 { break-after: avoid; }
</style></head><body>
  <h1>${esc(r.name)}</h1>
  <p class="headline">${esc(r.headline)}</p>
  <p class="meta">${esc(r.location)}</p>
  <p class="meta">${contacts}</p>

  <h2>Summary</h2>
  <p>${esc(r.summary)}</p>

  <h2>Technical Skills</h2>
  <ul class="skills">${skills}</ul>

  <h2>Professional Experience</h2>
  ${jobs}

  <h2>Independent Projects</h2>
  ${projects}

  <h2>Education</h2>
  <div class="item">
    <div class="row"><span><b>${esc(r.education.degree)}</b></span><span class="date">${esc(r.education.period)}</span></div>
    <p>${esc(r.education.school)}</p>
  </div>
</body></html>`;
}

const htmlPath = path.join(dist, `${base}.html`);
const pdfPath = path.join(dist, `${base}.pdf`);
writeFileSync(htmlPath, html());

const chrome =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (!existsSync(chrome)) throw new Error(`Chrome not found at ${chrome}; set CHROME_PATH`);
execFileSync(chrome, [
  "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
  `--print-to-pdf=${pdfPath}`, `file://${htmlPath}`,
], { stdio: "ignore" });
copyFileSync(pdfPath, path.join(here, "..", "public", `${base}.pdf`));

// ---------- DOCX ----------
const FONT = "Arial";
const ACCENT = "1D5C4C";
const T = (o) => new TextRun(typeof o === "string" ? { text: o, font: FONT, size: 20 } : { font: FONT, size: 20, ...o });
const MUTED = "45484E";
// A4, 0.7" margins → text width = 11906 − 2 × 1008
const MARGIN = 1008;
const TEXT_W = 11906 - 2 * MARGIN;

const heading = (text) =>
  new Paragraph({
    keepNext: true,
    spacing: { before: 240, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "CFCCC3", space: 2 } },
    children: [T({ text: text.toUpperCase(), bold: true, color: ACCENT, size: 19 })],
  });

const rowLine = (left, right, rightHref) =>
  new Paragraph({
    keepNext: true,
    tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W }],
    spacing: { before: 120, after: 20 },
    children: [
      ...left,
      T({ text: "\t" }),
      rightHref
        ? new ExternalHyperlink({ link: rightHref, children: [T({ text: right, color: MUTED, size: 18 })] })
        : T({ text: right, color: MUTED, size: 18 }),
    ],
  });

const bullet = (text) =>
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 30 }, children: [T(text)] });

const plain = (text, opts = {}) =>
  new Paragraph({ spacing: { after: 40 }, children: [T({ text, ...opts })] });

const children = [
  new Paragraph({ spacing: { after: 40 }, children: [T({ text: r.name, bold: true, size: 40 })] }),
  new Paragraph({ spacing: { after: 30 }, children: [T({ text: r.headline, color: ACCENT, size: 21 })] }),
  plain(r.location, { color: MUTED, size: 18 }),
  new Paragraph({
    spacing: { after: 40 },
    children: r.contacts.flatMap((c, i) => [
      ...(i ? [T({ text: "  ·  ", color: MUTED, size: 18 })] : []),
      new ExternalHyperlink({ link: c.href, children: [T({ text: c.label, color: MUTED, size: 18 })] }),
    ]),
  }),

  heading("Summary"),
  plain(r.summary),

  heading("Technical Skills"),
  ...r.skills.map(([k, v]) =>
    new Paragraph({ spacing: { after: 20 }, children: [T({ text: `${k}: `, bold: true }), T(v)] }),
  ),

  heading("Professional Experience"),
  ...r.experience.flatMap((j) => [
    rowLine([T({ text: j.role, bold: true }), T(` · ${j.company}`)], j.period),
    ...(j.context ? [plain(j.context, { italics: true, color: MUTED })] : []),
    ...j.bullets.map(bullet),
    ...(j.stack
      ? [new Paragraph({ spacing: { after: 40 }, children: [T({ text: "Stack: ", bold: true, color: MUTED, size: 18 }), T({ text: j.stack, color: MUTED, size: 18 })] })]
      : []),
  ]),

  heading("Independent Projects"),
  ...r.projects.flatMap((p) => [
    rowLine([T({ text: p.name, bold: true }), T(` · ${p.meta}`)], p.link, p.href),
    plain(p.text),
  ]),

  heading("Education"),
  rowLine([T({ text: r.education.degree, bold: true })], r.education.period),
  plain(r.education.school),
];

const doc = new Document({
  creator: r.name,
  title: `${r.name} — Résumé`,
  styles: {
    default: { document: { run: { font: FONT, size: 20, color: "17181B" }, paragraph: { spacing: { line: 264 } } } },
  },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 300, hanging: 220 } } },
      }],
    }],
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 900, bottom: 900, left: MARGIN, right: MARGIN } } },
    children,
  }],
});

const docxPath = path.join(dist, `${base}.docx`);
writeFileSync(docxPath, await Packer.toBuffer(doc));

console.log(`PDF  ${pdfPath}\nDOCX ${docxPath}\nSite public/${base}.pdf`);
