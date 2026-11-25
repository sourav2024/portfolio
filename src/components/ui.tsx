import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

/** Attributes for links that leave the site. */
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const buttonBase =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium transition-colors duration-200";

const buttonVariants = {
  /** One per view: the main action. */
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  /** Supporting actions. */
  secondary: "border border-line-strong text-fg hover:border-muted hover:bg-surface",
} as const;

export function ButtonLink({
  variant = "secondary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: keyof typeof buttonVariants }) {
  return <a className={`${buttonBase} ${buttonVariants[variant]} ${className}`} {...props} />;
}

/** Inline text link that leaves the site; the arrow and SR hint are built in. */
export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      {...external}
      className={`group inline-flex items-center gap-1 py-1.5 text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent ${className}`}
    >
      {children}
      <ArrowUpRight className="size-3.5 text-muted transition-colors group-hover:text-accent" aria-hidden />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="t-meta inline-flex items-center rounded-md border border-line px-2 py-0.5 text-fg2">{children}</span>
  );
}

export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[0.8125rem] font-medium leading-none text-accent">
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}
