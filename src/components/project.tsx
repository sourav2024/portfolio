import Image from "next/image";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/site";
import { getNpmMeta } from "@/lib/npm";
import { external, StatusPill, Tag } from "./ui";

/** Latest npm version and date; renders nothing if the registry can't be reached. */
export async function NpmLive({ pkg }: { pkg: string }) {
  const meta = await getNpmMeta(pkg);
  if (!meta) return null;
  return (
    <span className="t-meta text-muted" title="Read from the npm registry, refreshed daily">
      v{meta.version}
      {meta.published ? <> · {formatDate(meta.published)}</> : null}
    </span>
  );
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

function Preview({ preview }: { preview: Project["preview"] }) {
  if (preview.kind === "output") {
    return (
      <figure className="overflow-hidden rounded-xl border border-line bg-subtle">
        <div className="t-meta flex items-center gap-2 border-b border-line px-4 py-3 text-fg2">
          <span aria-hidden className="text-accent">$</span>
          {preview.command}
        </div>
        <pre className="t-meta overflow-x-auto px-4 py-4 leading-relaxed text-fg2">
          <code>{preview.text}</code>
        </pre>
        <figcaption className="t-small border-t border-line px-4 py-2.5 text-muted">{preview.caption}</figcaption>
      </figure>
    );
  }
  if (preview.kind === "image") {
    return (
      <figure className="overflow-hidden rounded-xl border border-line bg-subtle">
        <div className="relative max-h-[25rem] overflow-hidden">
          <Image
            src={preview.src}
            width={preview.width}
            height={preview.height}
            alt={preview.alt}
            sizes="(min-width: 1024px) 440px, 100vw"
            className="h-auto w-full"
          />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-subtle to-transparent" />
        </div>
        <figcaption className="t-small border-t border-line px-4 py-2.5 text-muted">{preview.caption}</figcaption>
      </figure>
    );
  }
  return (
    <figure>
      <div className="grid grid-cols-3 gap-3">
        {preview.images.map((img) => (
          <div key={img.src} className="overflow-hidden rounded-2xl border border-line bg-subtle">
            <Image
              src={img.src}
              width={img.width ?? 1080}
              height={img.height ?? 2400}
              alt={img.alt}
              sizes="(min-width: 1024px) 150px, 30vw"
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
      <figcaption className="t-small mt-3 text-muted">{preview.caption}</figcaption>
    </figure>
  );
}

export function ProjectArticle({ project }: { project: Project }) {
  return (
    <article aria-labelledby={`${project.slug}-title`} id={project.slug} className="border-t border-line pt-10 sm:pt-12">
      {/* Identity: name, status, one-line pitch, and the links a reviewer wants first. */}
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h4 id={`${project.slug}-title`} className="t-h3">
              {project.name}
            </h4>
            <StatusPill>{project.status}</StatusPill>
            {project.npm ? (
              <Suspense fallback={null}>
                <NpmLive pkg={project.npm} />
              </Suspense>
            ) : null}
          </div>
          <p className="t-lede mt-2 max-w-2xl text-fg2">{project.tagline}</p>
        </div>
        <ul className="flex shrink-0 flex-wrap gap-2">
          {project.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                {...external}
                className="group inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong px-3.5 text-[0.875rem] font-medium transition-colors hover:border-muted hover:bg-surface"
              >
                {l.label}
                <ArrowUpRight className="size-3.5 text-muted transition-colors group-hover:text-accent" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </header>

      {/* Problem and scope beside the evidence. */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <h5 className="t-label text-muted">Problem</h5>
          <p className="mt-3 text-fg2">{project.problem}</p>

          <h5 className="t-label mt-8 text-muted">What I built</h5>
          <ul className="mt-3 space-y-2.5">
            {project.built.map((b) => (
              <li key={b} className="li-rule text-fg2">
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 lg:col-span-5">
          <Preview preview={project.preview} />
        </div>
      </div>

      {/* Engineering decisions: the part that shows judgment, given its own row. */}
      <div className="mt-10">
        <h5 className="t-label text-muted">Engineering decisions</h5>
        <ol className="mt-4 grid gap-x-8 gap-y-5 md:grid-cols-3">
          {project.decisions.map((d, i) => (
            <li key={d} className="border-t border-line-strong pt-4">
              <span className="t-meta text-accent">{String(i + 1).padStart(2, "0")}</span>
              <p className="t-small mt-2 text-fg2">{d}</p>
            </li>
          ))}
        </ol>
      </div>

      <footer className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
        <p className="t-meta text-muted lg:shrink-0">{project.quality}</p>
      </footer>
    </article>
  );
}
