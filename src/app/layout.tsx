import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { experience, profile } from "@/content/site";
import { photoSrc, siteUrl } from "@/lib/site";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const description =
  "Full-stack software engineer building production logistics software across Node.js, React and React Native, LLM-powered features, and open-source developer tools. Based in India, open to remote and relocation roles.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.links.github }],
  creator: profile.name,
  keywords: [
    "Full-Stack Software Engineer", "Backend Engineer", "Node.js", "TypeScript", "React",
    "React Native", "Expo", "AI Engineer", "MCP", "Developer Tools", "Remote", "Sourav Kashyap",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} — ${profile.role}`,
    description,
    locale: "en_US",
    firstName: "Sourav",
    lastName: "Kashyap",
  },
  twitter: { card: "summary_large_image", title: `${profile.name} — ${profile.role}`, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0c0d0f",
};

// Dark is the default; a stored "light" choice is applied before paint so it never flashes.
const themeScript = `(()=>{try{document.documentElement.dataset.theme=localStorage.getItem('theme')==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}})()`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Chandigarh", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: experience[0].company },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Guru Nanak Dev University" },
  ...(photoSrc ? { image: `${siteUrl}${photoSrc}` } : {}),
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.npm],
  knowsAbout: ["Node.js", "TypeScript", "React", "React Native", "Kotlin", "PostgreSQL", "Redis", "LLM integration", "Model Context Protocol"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="dark"
      className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
