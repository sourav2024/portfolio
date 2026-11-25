import Link from "next/link";
import { profile } from "@/content/site";
import { resumeHref } from "@/lib/site";
import { DesktopNav, MobileNav } from "./nav";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav aria-label="Primary" className="container-page relative flex h-16 items-center justify-between gap-4">
        <Link href="/" className="py-2 font-serif text-[1.3125rem] leading-none tracking-tight text-fg">
          {profile.name}
        </Link>
        <div className="flex items-center gap-1">
          <DesktopNav />
          {resumeHref ? (
            <a
              href={resumeHref}
              download
              className="ml-3 hidden h-9 items-center rounded-full border border-line-strong px-4 text-[0.875rem] font-medium text-fg transition-colors hover:border-muted hover:bg-surface lg:inline-flex"
            >
              Résumé
            </a>
          ) : null}
          <ThemeToggle />
          <MobileNav resumeHref={resumeHref} />
        </div>
      </nav>
    </header>
  );
}
