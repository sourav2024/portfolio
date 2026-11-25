import type { ReactNode } from "react";

/** Editorial section: a small index label on the left at desktop widths, content on the right. */
export function Section({
  id,
  index,
  label,
  title,
  wide = false,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title?: string;
  /** Wide sections put the label above and give content the full width. */
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="border-t border-line py-16 sm:py-24">
      <div className={`mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 ${wide ? "" : "md:grid-cols-12 md:gap-10"}`}>
        <div className={wide ? "" : "md:col-span-3"}>
          <p className={`font-mono text-xs uppercase tracking-[0.14em] text-faint ${wide ? "" : "md:sticky md:top-24"}`}>
            <span className="text-accent">{index}</span>
            <span className="mx-2 text-line-strong">/</span>
            <span id={`${id}-label`}>{label}</span>
          </p>
        </div>
        <div className={wide ? "min-w-0" : "min-w-0 md:col-span-9"}>
          {title ? (
            <h2 className="mb-10 max-w-2xl font-serif text-3xl leading-tight tracking-tight sm:text-4xl">{title}</h2>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[0.72rem] text-muted">
      {children}
    </span>
  );
}
