"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: the theme still applies for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between dark and light theme"
      className="inline-flex size-10 items-center justify-center rounded-full text-fg2 transition-colors hover:bg-surface hover:text-fg"
    >
      <Sun className="hidden size-[1.125rem] dark:block" aria-hidden />
      <Moon className="size-[1.125rem] dark:hidden" aria-hidden />
    </button>
  );
}
