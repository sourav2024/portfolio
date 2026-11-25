import type { Architecture as ArchitectureData } from "@/content/site";

/**
 * Pipeline diagram built from plain markup: an ordered list that reads left to
 * right on wide screens and top to bottom on narrow ones. No images or SVG, so
 * it stays sharp, themable and readable by screen readers.
 *
 * Only describe steps that exist in the real implementation.
 */
export function ArchitectureDiagram({ data }: { data: ArchitectureData }) {
  return (
    <figure>
      <figcaption className="mb-5">
        <p className="font-medium text-fg">{data.title}</p>
        <p className="t-small mt-1 text-muted">{data.caption}</p>
      </figcaption>
      <ol className="grid gap-0 lg:grid-flow-col lg:auto-cols-fr">
        {data.steps.map((step, i) => (
          <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0 lg:block lg:pb-0">
            {/* Connector: a vertical rail on small screens, a horizontal rule on large ones. */}
            <div className="flex flex-col items-center lg:mb-4 lg:flex-row">
              <span className="t-meta flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-accent">
                {i + 1}
              </span>
              {i < data.steps.length - 1 ? (
                <span aria-hidden className="mt-2 w-px flex-1 bg-line-strong lg:mx-3 lg:mt-0 lg:h-px lg:w-auto" />
              ) : null}
            </div>
            <div className="min-w-0 pt-0.5 lg:pr-5 lg:pt-0">
              <p className="font-medium leading-snug text-fg">{step.label}</p>
              <p className="t-small mt-1 text-fg2">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
