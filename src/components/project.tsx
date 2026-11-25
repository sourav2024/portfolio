import Image from "next/image";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/site";
import { getNpmMeta } from "@/lib/npm";
import { Tag } from "./section";

export async function NpmLive({ pkg }: { pkg: string }) {
  const meta = await getNpmMeta(pkg);
  if (!meta) return null;
  return (
    <span className="font-mono text-[0.72rem] text-faint" title="Read from the npm registry, refreshed daily">
      npm v{meta.version}
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

function Preview({ preview, name }: { preview: Project["preview"]; name: string }) {
  if (preview.kind === "output") {
    return (
      <figure className="overflow-hidden rounded-xl border border-line bg-code">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 font-mono text-[0.72rem] text-faint">
          <span aria-hidden className="text-accent">$</span>
          <span>{preview.command}</span>
        </div>
        <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.72rem] leading-relaxed text-muted sm:text-[0.76rem]">
          <code>{preview.text}</code>
        </pre>
        <figcaption className="border-t border-line px-4 py-2 text-xs text-faint">{preview.caption}</figcaption>
      </figure>
    );
  }
  if (preview.kind === "image") {
    return (
      <figure className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="relative max-h-[26rem] overflow-hidden">
          <Image
            src={preview.src}
            width={preview.width}
            height={preview.height}
            alt={preview.alt}
            sizes="(min-width: 1024px) 400px, 100vw"
            className="h-auto w-full"
          />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent" />
        </div>
        <figcaption className="border-t border-line px-4 py-2 text-xs text-faint">{preview.caption}</figcaption>
      </figure>
    );
  }
  return (
    <figure>
      <div className="grid grid-cols-3 gap-3">
        {preview.images.map((img) => (
          <div key={img.src} className="overflow-hidden rounded-[1.1rem] border border-line bg-surface">
            <Image src={img.src} width={1080} height={2400} alt={img.alt} sizes="(min-width: 1024px) 140px, 30vw" className="h-auto w-full" />
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-xs text-faint">
        {name} · {preview.caption}
      </figcaption>
    </figure>
  );
}

export function ProjectArticle({ project, index }: { project: Project; index: number }) {
  return (
    <article
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
      className="grid gap-8 border-t border-line pt-10 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-10"
    >
      <div className="min-w-0 lg:col-span-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-xs text-faint">{String(index + 1).padStart(2, "0")}</span>
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">{project.status}</span>
          {project.npm ? (
            <Suspense fallback={null}>
              <NpmLive pkg={project.npm} />
            </Suspense>
          ) : null}
        </div>
        <h3 id={`${project.slug}-title`} className="mt-3 font-serif text-2xl tracking-tight sm:text-[1.75rem]">
          {project.name}
        </h3>
        <p className="mt-1 text-lg text-muted">{project.tagline}</p>

        <dl className="mt-6 space-y-6 text-[0.95rem] leading-relaxed">
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">Problem</dt>
            <dd className="mt-2 text-muted">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">What I built</dt>
            <dd className="mt-2">
              <ul className="space-y-2">
                {project.built.map((b) => (
                  <li key={b} className="relative pl-4 text-muted before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-line-strong">
                    {b}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">Engineering decisions</dt>
            <dd className="mt-2">
              <ul className="space-y-2">
                {project.decisions.map((d) => (
                  <li key={d} className="relative pl-4 text-muted before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-accent">
                    {d}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        <p className="mt-3 font-mono text-[0.72rem] text-faint">{project.quality}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-line-strong px-3.5 py-1.5 text-sm transition-colors hover:border-ink"
            >
              {l.label}
              <ArrowUpRight className="size-3.5 text-faint" aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
      <div className="min-w-0 lg:col-span-5">
        <div className="lg:sticky lg:top-24">
          <Preview preview={project.preview} name={project.name} />
        </div>
      </div>
    </article>
  );
}
