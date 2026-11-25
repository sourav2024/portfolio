import Link from "next/link";
import { Menu } from "lucide-react";
import { profile } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#open-source", label: "Open source" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-serif text-[1.05rem] font-medium tracking-tight">
          {profile.name}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <details className="group relative md:hidden">
            <summary
              aria-label="Open menu"
              className="inline-flex size-9 cursor-pointer list-none items-center justify-center rounded-full text-muted hover:text-ink [&::-webkit-details-marker]:hidden"
            >
              <Menu className="size-4" aria-hidden />
            </summary>
            <ul className="absolute right-0 mt-2 w-48 rounded-xl border border-line bg-surface p-1.5 shadow-lg">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-bg hover:text-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </nav>
      </div>
    </header>
  );
}
