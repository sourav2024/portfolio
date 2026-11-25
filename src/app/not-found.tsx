import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto flex min-h-[70dvh] max-w-5xl flex-col justify-center px-4 py-24 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">404</p>
        <h1 className="mt-4 max-w-xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-md text-muted">The link may be old, or the address may have a typo.</p>
        <Link
          href="/"
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg hover:opacity-85"
        >
          <ArrowLeft className="size-4" aria-hidden /> Back to the homepage
        </Link>
      </main>
    </>
  );
}
