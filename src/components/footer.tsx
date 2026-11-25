import { profile } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {profile.name}
        </p>
        <p>
          Built with Next.js and Tailwind CSS.{" "}
          <a
            href={`${profile.links.github}/portfolio`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line-strong underline-offset-4 hover:text-ink"
          >
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}
