import { Suspense } from "react";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { NpmLive, ProjectArticle } from "@/components/project";
import { Section, Tag } from "@/components/section";
import {
  about,
  alsoShipped,
  ecosystem,
  experience,
  expertise,
  hero,
  interests,
  profile,
  projects,
} from "@/content/site";
import { photoSrc, resumeHref } from "@/lib/site";
import Image from "next/image";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />

        <Section id="about" index="01" label="About">
          <div className="max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-muted">
            {about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="experience" index="02" label="Experience" title="Production work">
          <ol className="space-y-16">
            {experience.map((job) => (
              <li key={job.company}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-serif text-2xl tracking-tight">
                    {job.company}
                    <span className="ml-2 font-sans text-base text-muted">· {job.role}</span>
                  </h3>
                  <p className="shrink-0 font-mono text-xs text-faint">{job.period}</p>
                </div>
                <p className="mt-2 max-w-2xl text-muted">{job.context}</p>

                <div className="mt-6 space-y-6">
                  {job.groups.map((g) => (
                    <div key={g.title}>
                      {job.groups.length > 1 ? (
                        <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">{g.title}</h4>
                      ) : null}
                      <ul className="mt-2 space-y-2.5">
                        {g.points.map((pt) => (
                          <li
                            key={pt}
                            className="relative max-w-2xl pl-4 leading-relaxed text-muted before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2 before:bg-line-strong"
                          >
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {job.apps ? (
                  <div className="mt-6">
                    <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">Apps shipped with the team</h4>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {job.apps.map((app) => (
                        <li key={app.name}>
                          <a
                            href={app.href}
                            {...external}
                            className="group flex h-full items-start justify-between gap-3 rounded-lg border border-line bg-surface px-3.5 py-3 transition-colors hover:border-line-strong"
                          >
                            <span>
                              <span className="block text-sm font-medium">{app.name}</span>
                              <span className="block text-xs text-faint">{app.note}</span>
                            </span>
                            <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-faint group-hover:text-ink" aria-hidden />
                            <span className="sr-only">(store listing, opens in a new tab)</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {job.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" index="03" label="Independent projects" title="Things I built on my own" wide>
          <div className="space-y-16">
            {projects.map((p, i) => (
              <ProjectArticle key={p.slug} project={p} index={i} />
            ))}
          </div>
        </Section>

        <Section id="open-source" index="04" label="Open source" title="Published packages and tools">
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {ecosystem.map((pkg) => (
              <li key={pkg.name}>
                <a
                  href={pkg.href}
                  {...external}
                  className="group flex flex-col gap-1 px-4 py-3.5 transition-colors hover:bg-bg sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-sm">{pkg.name}</span>
                    <ArrowUpRight className="size-3.5 text-faint group-hover:text-ink" aria-hidden />
                  </span>
                  <span className="flex flex-wrap items-center gap-x-3 text-xs text-faint">
                    <span>{pkg.kind}</span>
                    <Suspense fallback={null}>
                      <NpmLive pkg={pkg.npm} />
                    </Suspense>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-faint">Versions and dates are read from the npm registry and refreshed daily.</p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {alsoShipped.map((item) => (
              <a
                key={item.name}
                href={item.href}
                {...external}
                className="group rounded-xl border border-line p-5 transition-colors hover:border-line-strong"
              >
                <span className="flex items-center justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-faint group-hover:text-ink">
                    {item.label}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </span>
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">{item.note}</span>
              </a>
            ))}
          </div>

          <a
            href={profile.links.github}
            {...external}
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink"
          >
            <GitHubIcon className="size-4" /> Everything else is on GitHub
          </a>
        </Section>

        <Section id="expertise" index="05" label="Expertise" title="What I work with, and where it shows">
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {expertise.map((e) => (
              <div key={e.area} className="bg-bg p-5">
                <h3 className="font-medium">{e.area}</h3>
                <p className="mt-1 text-sm text-faint">{e.evidence}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{e.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="interests" index="06" label="Interests" title="Where I'm going deeper">
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {interests.map((it) => (
              <li key={it.title}>
                <h3 className="font-medium">{it.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{it.note}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  const facts = [
    { k: "Currently", v: `${experience[0].role}, ${experience[0].company}` },
    { k: "Shipping since", v: "January 2024" },
    { k: "Based in", v: `${profile.location} · ${profile.timezone}` },
    { k: "Open to", v: "Remote · Relocation" },
  ];

  return (
    <section aria-labelledby="hero-title" className="mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-24">
      <div className="flex flex-col gap-8 lg:flex-row-reverse lg:items-end lg:justify-between lg:gap-12">
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt={`Portrait of ${profile.name}`}
            width={512}
            height={512}
            priority
            sizes="(min-width: 1024px) 240px, 80px"
            className="rise size-20 shrink-0 rounded-full border border-line object-cover lg:size-60 lg:rounded-2xl"
          />
        ) : null}
        <div className="min-w-0">
          <p className="rise font-mono text-xs uppercase tracking-[0.16em] text-accent">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="rise rise-2 mt-5 max-w-3xl font-serif text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl"
          >
            {hero.title}
          </h1>
          <p className="rise rise-3 mt-6 max-w-2xl text-lg leading-relaxed text-muted">{hero.lede}</p>
        </div>
      </div>

      <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          View projects <ArrowDown className="size-4" aria-hidden />
        </a>
        {resumeHref ? (
          <a
            href={resumeHref}
            download
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink"
          >
            Download résumé <Download className="size-4" aria-hidden />
          </a>
        ) : null}
        <div className="flex items-center gap-1 sm:ml-2">
          <IconLink href={profile.links.github} label="GitHub">
            <GitHubIcon className="size-[1.15rem]" />
          </IconLink>
          <IconLink href={profile.links.linkedin} label="LinkedIn">
            <LinkedInIcon className="size-[1.15rem]" />
          </IconLink>
          <IconLink href={`mailto:${profile.email}`} label="Email" internal>
            <Mail className="size-[1.15rem]" aria-hidden />
          </IconLink>
        </div>
      </div>

      <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.k} className="bg-bg px-4 py-3.5">
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">{f.k}</dt>
            <dd className="mt-1 text-sm">{f.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function IconLink({
  href,
  label,
  internal = false,
  children,
}: {
  href: string;
  label: string;
  internal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(internal ? {} : external)}
      className="inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-line/60 hover:text-ink"
    >
      {children}
    </a>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
          <span className="text-accent">07</span>
          <span className="mx-2 text-line-strong">/</span>Contact
        </p>
        <h2 id="contact-title" className="mt-6 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          Hiring for a full-stack, backend, mobile or AI engineering role?
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          I&apos;m based in {profile.location} ({profile.timezone}). {profile.availability} Email is the fastest way to
          reach me.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            <Mail className="size-4" aria-hidden /> {profile.email}
          </a>
          <a
            href={profile.links.linkedin}
            {...external}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink"
          >
            <LinkedInIcon className="size-4" /> LinkedIn
          </a>
          <a
            href={profile.links.github}
            {...external}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink"
          >
            <GitHubIcon className="size-4" /> GitHub
          </a>
          {resumeHref ? (
            <a
              href={resumeHref}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink"
            >
              <Download className="size-4" aria-hidden /> Résumé (PDF)
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
