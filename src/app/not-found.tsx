import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="container-page flex min-h-[64dvh] flex-col justify-center py-24">
        <p className="t-label text-accent">Error 404</p>
        <h1 className="t-display mt-5 max-w-[14ch]">This page doesn&apos;t exist.</h1>
        <p className="t-lede mt-5 max-w-md text-fg2">The link may be old, or the address may have a typo.</p>
        <div className="mt-9">
          <ButtonLink href="/" variant="primary">
            <ArrowLeft className="size-4" aria-hidden /> Back to the homepage
          </ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
