import type { ReactNode } from "react";

/**
 * Page section. On large screens a narrow rail carries the index and label and
 * the content takes the remaining nine columns; below that the two stack.
 * `wide` drops the rail so the content can use the full container.
 */
export function Section({
  id,
  index,
  label,
  title,
  intro,
  wide = false,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  intro?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  const eyebrow = (
    <p className="t-label text-muted">
      <span className="text-accent">{index}</span>
      <span aria-hidden className="mx-2.5 text-line-strong">—</span>
      {label}
    </p>
  );
  const heading = (
    <div className="mb-10 max-w-2xl sm:mb-14">
      <h2 id={`${id}-title`} className="t-h2">
        {title}
      </h2>
      {intro ? <p className="t-lede mt-4 text-fg2">{intro}</p> : null}
    </div>
  );

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-y border-t border-line">
      {wide ? (
        <div className="container-page">
          <div className="mb-6">{eyebrow}</div>
          {heading}
          {children}
        </div>
      ) : (
        <div className="container-page grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">{eyebrow}</div>
          </div>
          <div className="min-w-0 lg:col-span-9">
            {heading}
            {children}
          </div>
        </div>
      )}
    </section>
  );
}
