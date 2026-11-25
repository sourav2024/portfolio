import Image from "next/image";
import { Suspense } from "react";
import { ArrowDown, ArrowUpRight, Download, FileText, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { NpmLive, ProjectArticle } from "@/components/project";
import { Section } from "@/components/section";
import { ButtonLink, external, ExternalLink } from "@/components/ui";
import {
  about,
  alsoShipped,
  ecosystem,
  education,
  experience,
  expertise,
  hero,
  interests,
  profile,
  projects,
  type Experience,
} from "@/content/site";
import { photoSrc, resumeHref } from "@/lib/site";

const projectGroups = [
  {
    kind: "tool",
    title: "Developer tools",
    note: "Open source, published on npm with tests, CI and versioned releases.",
  },
  {
    kind: "app",
    title: "Mobile apps",
    note: "Designed, built and released solo. Live on Google Play.",
  },
] as const;

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />

        <Section id="experience" index="01" label="Experience" title="Production engineering work">
          <ol className="space-y-16 sm:space-y-20">
            {experience.map((job) => (
              <li key={job.company}>
                <Job job={job} />
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="projects"
          index="02"
          label="Independent projects"
          title="Things I designed, built and shipped on my own"
          wide
        >
          <nav aria-label="Projects in this section" className="-mt-4 mb-12 sm:-mt-6 sm:mb-16">
            <ul className="flex flex-wrap gap-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`#${p.slug}`}
                    className="inline-flex h-9 items-center rounded-full border border-line px-3.5 text-[0.875rem] text-fg2 transition-colors hover:border-line-strong hover:text-fg"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-20 sm:space-y-24">
            {projectGroups.map((group) => (
              <div key={group.kind}>
                <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <h3 className="text-[1.0625rem] font-medium text-fg">{group.title}</h3>
                  <p className="t-small text-muted">{group.note}</p>
                </div>
                <div className="space-y-14 sm:space-y-16">
                  {projects
                    .filter((p) => p.kind === group.kind)
                    .map((p) => (
                      <ProjectArticle key={p.slug} project={p} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="open-source" index="03" label="Open source" title="Published packages">
          <ul className="border-t border-line">
            {ecosystem.map((pkg) => (
              <li key={pkg.name} className="border-b border-line">
                <a
                  href={pkg.href}
                  {...external}
                  className="group flex flex-col gap-1 py-4 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[0.9375rem] text-fg transition-colors group-hover:text-accent">
                      {pkg.name}
                    </span>
                    <ArrowUpRight className="size-3.5 text-muted transition-colors group-hover:text-accent" aria-hidden />
                    <span className="sr-only">(npm, opens in a new tab)</span>
                  </span>
                  <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="t-small text-fg2">{pkg.kind}</span>
                    <Suspense fallback={null}>
                      <NpmLive pkg={pkg.npm} />
                    </Suspense>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="t-small mt-3 text-muted">Versions and dates are read from the npm registry and refreshed daily.</p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {alsoShipped.map((item) => (
              <div key={item.name}>
                <h3 className="font-medium text-fg">{item.name}</h3>
                <p className="t-small mt-1.5 text-fg2">{item.note}</p>
                <ExternalLink href={item.href} className="t-small mt-3">
                  {item.label}
                </ExternalLink>
              </div>
            ))}
            <div>
              <h3 className="font-medium text-fg">Everything else</h3>
              <p className="t-small mt-1.5 text-fg2">Source, issues, changelogs and release history for each package.</p>
              <ExternalLink href={profile.links.github} className="t-small mt-3">
                github.com/sourav2024
              </ExternalLink>
            </div>
          </div>
        </Section>

        <Section id="skills" index="04" label="Skills" title="What I work with, and where it shows">
          <dl className="border-t border-line">
            {expertise.map((e) => (
              <div key={e.area} className="grid gap-x-8 gap-y-2 border-b border-line py-5 sm:grid-cols-[13rem_1fr]">
                <dt className="font-medium text-fg">{e.area}</dt>
                <dd>
                  <p className="text-fg2">{e.items.join(" · ")}</p>
                  <p className="t-small mt-1.5 text-muted">{e.evidence}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="about" index="05" label="About" title="How I got here, and how I work">
          <div className="max-w-[42rem] space-y-5 text-[1.0625rem] leading-[1.7] text-fg2">
            {about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <dl className="mt-10 max-w-[42rem] border-t border-line pt-5">
            <dt className="t-label text-muted">Education</dt>
            <dd className="mt-2">
              <span className="font-medium text-fg">{education.degree}</span>
              <span className="t-small block text-fg2">
                {education.school} · {education.period}
              </span>
            </dd>
          </dl>

          <h3 id="interests" className="t-label mt-16 text-muted">
            Where I&apos;m going deeper
          </h3>
          <ul className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {interests.map((it) => (
              <li key={it.title} className="border-t border-line pt-4">
                <h4 className="font-medium text-fg">{it.title}</h4>
                <p className="t-small mt-1 text-fg2">{it.note}</p>
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
    { k: "Currently", v: `${experience[0].role} at ${experience[0].company}` },
    { k: "Experience", v: "Production software since January 2024" },
    { k: "Based in", v: `${profile.location} · ${profile.timezone}` },
    { k: "Open to", v: "Global remote roles · Relocation with employer sponsorship" },
  ];

  return (
    <section aria-labelledby="hero-title" className="container-page pb-16 pt-8 sm:pb-24 sm:pt-16 lg:pt-20">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-8">
          {/* Identity first: who this is, before what they say. */}
          <p className="rise mb-6 flex items-start gap-2.5 text-[0.875rem] leading-snug text-fg2">
            <span aria-hidden className="mt-[0.4em] size-1.5 shrink-0 rounded-full bg-accent" />
            {profile.availabilityShort}
          </p>
          <div className="rise flex items-center gap-3.5">
            {photoSrc ? (
              <Image
                src={photoSrc}
                alt=""
                width={96}
                height={96}
                priority
                className="size-12 rounded-full border border-line-strong object-cover lg:hidden"
              />
            ) : null}
            <p className="text-[0.9375rem] leading-snug">
              <span className="block font-medium text-fg sm:inline">{profile.name}</span>
              <span aria-hidden className="mx-2 hidden text-line-strong sm:inline">/</span>
              <span className="block text-fg2 sm:inline">{hero.eyebrow}</span>
            </p>
          </div>

          <h1 id="hero-title" className="t-display rise rise-2 mt-6 max-w-[21ch] lg:max-xl:text-[3.25rem]">
            {hero.title}
          </h1>
          <p className="t-lede rise rise-3 mt-7 max-w-[38rem] text-fg2">{hero.lede}</p>

          <div className="rise rise-4 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href="#projects" variant="primary">
              View projects <ArrowDown className="size-4" aria-hidden />
            </ButtonLink>
            {resumeHref ? (
              <ButtonLink href={resumeHref} download>
                Download résumé <Download className="size-4" aria-hidden />
              </ButtonLink>
            ) : null}
          </div>

          <ul className="rise rise-4 mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <li>
              <SocialLink href={profile.links.github} icon={<GitHubIcon className="size-[1.125rem]" />}>
                GitHub
              </SocialLink>
            </li>
            <li>
              <SocialLink href={profile.links.linkedin} icon={<LinkedInIcon className="size-[1.125rem]" />}>
                LinkedIn
              </SocialLink>
            </li>
            <li>
              <SocialLink href="#contact" icon={<Mail className="size-[1.125rem]" aria-hidden />} internal>
                Contact
              </SocialLink>
            </li>
          </ul>
        </div>

        {/* Profile card: the facts a recruiter screens for, in one place. */}
        <aside aria-label="At a glance" className="rise rise-3 lg:col-span-4">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            {photoSrc ? (
              <Image
                src={photoSrc}
                alt={`Portrait of ${profile.name}`}
                width={800}
                height={800}
                priority
                sizes="(min-width: 1024px) 360px, 0px"
                className="hidden aspect-[5/4] w-full object-cover object-[50%_22%] lg:block"
              />
            ) : null}
            <dl className="-mb-px grid sm:grid-cols-2 lg:grid-cols-1">
              {facts.map((f) => (
                <div key={f.k} className="border-b border-line px-5 py-3.5 sm:odd:border-r lg:odd:border-r-0">
                  <dt className="t-label text-muted">{f.k}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-snug text-fg">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  icon,
  internal = false,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  internal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(internal ? {} : external)}
      className="inline-flex items-center gap-2 py-1 text-[0.9375rem] text-fg2 transition-colors hover:text-fg"
    >
      {icon}
      {children}
      {internal ? null : <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

function Job({ job }: { job: Experience }) {
  const grouped = job.groups.length > 1;
  return (
    <article aria-label={`${job.role} at ${job.company}`}>
      <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div>
          <h3 className="t-h3">{job.company}</h3>
          <p className="mt-1 font-medium text-fg">{job.role}</p>
        </div>
        <p className="t-meta shrink-0 text-muted">{job.period}</p>
      </header>
      <p className="mt-3 max-w-[42rem] text-fg2">{job.context}</p>

      <div className="mt-8 border-t border-line">
        {job.groups.map((g) => (
          <div
            key={g.title}
            className={`border-b border-line py-6 ${grouped ? "grid gap-x-8 gap-y-3 md:grid-cols-[11rem_1fr]" : ""}`}
          >
            {grouped ? <h4 className="t-label pt-1 text-accent">{g.title}</h4> : <h4 className="sr-only">{g.title}</h4>}
            <ul className="space-y-3">
              {g.points.map((pt) => (
                <li key={pt} className="li-rule max-w-[42rem] text-fg2">
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {job.apps ? (
        <div className="mt-6">
          <h4 className="t-label text-muted">Apps shipped with the team</h4>
          <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
            {job.apps.map((app) => (
              <li key={app.name} className="border-b border-line">
                <a href={app.href} {...external} className="group flex items-center justify-between gap-3 py-3">
                  <span>
                    <span className="block font-medium text-fg transition-colors group-hover:text-accent">{app.name}</span>
                    <span className="t-small block text-muted">{app.note}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" aria-hidden />
                  <span className="sr-only">(store listing, opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="t-meta mt-6 max-w-[46rem] text-muted">
        <span className="text-fg2">Stack</span>
        <span aria-hidden className="mx-2">·</span>
        {job.stack.join(", ")}
      </p>
    </article>
  );
}

function Contact() {
  const channels = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: <Mail className="size-[1.125rem]" aria-hidden />,
      note: "Fastest way to reach me",
    },
    {
      label: "LinkedIn",
      value: "in/sourav-kashyap-56b550269",
      href: profile.links.linkedin,
      icon: <LinkedInIcon className="size-[1.125rem]" />,
      newTab: true,
    },
    {
      label: "GitHub",
      value: "github.com/sourav2024",
      href: profile.links.github,
      icon: <GitHubIcon className="size-[1.125rem]" />,
      newTab: true,
    },
    ...(resumeHref
      ? [
          {
            label: "Résumé",
            value: "PDF, two pages",
            href: resumeHref,
            icon: <FileText className="size-[1.125rem]" aria-hidden />,
            download: true,
          },
        ]
      : []),
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y border-t border-line bg-subtle">
      <div className="container-page">
        <p className="t-label text-muted">
          <span className="text-accent">06</span>
          <span aria-hidden className="mx-2.5 text-line-strong">—</span>
          Contact
        </p>
        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 id="contact-title" className="t-display max-w-[16ch]">
              Hiring for a full-stack, backend, mobile or AI role?
            </h2>
            <p className="t-lede mt-6 max-w-[34rem] text-fg2">
              I&apos;m based in {profile.location}, {profile.timezone}. {profile.availability}
            </p>
            <div className="mt-8">
              <ButtonLink href={`mailto:${profile.email}`} variant="primary" className="w-full sm:w-auto">
                <Mail className="size-4 shrink-0" aria-hidden /> Email me
              </ButtonLink>
            </div>
          </div>

          <ul className="self-end border-t border-line-strong lg:col-span-5">
            {channels.map((c) => (
              <li key={c.label} className="border-b border-line-strong">
                <a
                  href={c.href}
                  {...("newTab" in c && c.newTab ? external : {})}
                  {...("download" in c && c.download ? { download: true } : {})}
                  className="group flex items-center gap-4 py-4"
                >
                  <span className="text-fg2 transition-colors group-hover:text-accent">{c.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="t-label block text-muted">{c.label}</span>
                    <span className="mt-0.5 block truncate text-fg transition-colors group-hover:text-accent">{c.value}</span>
                    {"note" in c && c.note ? <span className="t-small block text-muted">{c.note}</span> : null}
                  </span>
                  {"download" in c && c.download ? (
                    <Download className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" aria-hidden />
                  ) : (
                    <ArrowUpRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" aria-hidden />
                  )}
                  {"newTab" in c && c.newTab ? <span className="sr-only">(opens in a new tab)</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
