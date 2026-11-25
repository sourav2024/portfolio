import { profile } from "@/content/site";
import { navItems } from "./nav-items";
import { external } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-serif text-[1.3125rem] leading-none tracking-tight">{profile.name}</p>
          <p className="t-small mt-2 text-muted">
            {profile.role} · {profile.location}
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`/#${item.id}`} className="t-small inline-block py-2 text-fg2 transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-small text-muted">© {profile.name}</p>
        <p className="t-small text-muted">
          Built with Next.js and Tailwind CSS ·{" "}
          <a
            href={`${profile.links.github}/portfolio`}
            {...external}
            className="inline-block py-2 text-fg2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
          >
            Source<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
