"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "./nav-items";

/** Tracks which section sits under the header so the nav can mark it current. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band a little below the header: whichever section crosses it is current.
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return active;
}

export function DesktopNav() {
  const active = useActiveSection();
  return (
    <ul className="hidden items-center lg:flex">
      {navItems.map((item) => {
        const current = active === item.id;
        return (
          <li key={item.id}>
            <a
              href={`/#${item.id}`}
              aria-current={current ? "location" : undefined}
              className={`relative rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors ${
                current ? "text-fg" : "text-fg2 hover:text-fg"
              }`}
            >
              {item.label}
              <span
                aria-hidden
                className={`absolute inset-x-3.5 -bottom-0.5 h-px bg-accent transition-opacity duration-300 ${
                  current ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function MobileNav({ resumeHref }: { resumeHref: string | null }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-10 items-center justify-center rounded-full text-fg2 transition-colors hover:bg-surface hover:text-fg"
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
      </button>

      {open ? (
        <div id="mobile-menu" className="absolute inset-x-0 top-full border-b border-line bg-bg shadow-2xl shadow-black/40">
          <ul className="container-page py-3">
            {navItems.map((item) => (
              <li key={item.id} className="border-b border-line last:border-b-0">
                <a
                  href={`/#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "location" : undefined}
                  className={`flex items-center justify-between py-3.5 text-[1.0625rem] ${
                    active === item.id ? "text-fg" : "text-fg2"
                  }`}
                >
                  {item.label}
                  {active === item.id ? <span aria-hidden className="size-1.5 rounded-full bg-accent" /> : null}
                </a>
              </li>
            ))}
          </ul>
          {resumeHref ? (
            <div className="container-page pb-5">
              <a
                href={resumeHref}
                download
                onClick={() => setOpen(false)}
                className="flex h-11 items-center justify-center rounded-full border border-line-strong text-[0.9375rem] font-medium"
              >
                Download résumé
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
