// Résumé content — the single editable source for both the PDF and the DOCX.
// Same rule as the website: only claims backed by commits, public repos,
// npm releases or store listings. Run `npm run resume` after editing.

// Replace with the custom domain once the new site is deployed.
const portfolioUrl = process.env.RESUME_SITE_URL ?? "https://souravs-code-canvas.lovable.app/";
const bare = (u) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

export const resume = {
  name: "Sourav Kashyap",
  title: "Full-Stack Software Engineer",
  focus: "TypeScript · Node.js · React · React Native · AI/LLM Integrations · Developer Tools",
  location: "Chandigarh, India (UTC+5:30)",
  availability:
    "Open to international remote opportunities and relocation with employer-sponsored work authorization.",
  // Two deliberate lines, so nothing wraps mid-list.
  contactRows: [
    [
      { label: "souravkashyap7869@gmail.com", href: "mailto:souravkashyap7869@gmail.com" },
      { label: "linkedin.com/in/sourav-kashyap-56b550269", href: "https://www.linkedin.com/in/sourav-kashyap-56b550269/" },
    ],
    [
      { label: "github.com/sourav2024", href: "https://github.com/sourav2024" },
      { label: bare(portfolioUrl), href: portfolioUrl },
    ],
  ],

  summary:
    "Full-stack software engineer with 2+ years of professional experience shipping production software across Node.js backends, React web apps and React Native mobile apps, down to Kotlin native modules. At Truxo I build real-time tracking, payments, LLM pipelines and voice agents for a transportation management platform. Outside work I publish open-source developer tools on npm, each with a test suite, CI and versioned releases.",

  skills: [
    ["Languages", "TypeScript, JavaScript, SQL, Kotlin, Swift (native modules)"],
    ["Backend", "Node.js, Express, REST APIs, Socket.io (WebSockets), BullMQ job queues, JWT authentication, GraphQL"],
    ["Frontend", "React 19, Next.js, Redux Toolkit, TanStack Table, Tailwind CSS"],
    ["Mobile", "React Native, Expo and EAS, Android native modules, Firebase Crashlytics, React Native Skia"],
    ["Databases", "PostgreSQL, MySQL, Prisma ORM, Redis, SQLite (FTS5)"],
    ["AI Engineering", "OpenAI, Gemini, OpenRouter, tool-calling agents, LiveKit voice agents, MCP servers, Agent Skills"],
    ["DevOps and Testing", "Docker, GitHub Actions CI/CD, AWS (S3, Lambda), npm provenance, Jest, Vitest"],
  ],

  experience: [
    {
      role: "Full Stack Developer",
      company: "Truxo",
      context: "Transportation management platform for trucking carriers and brokers",
      period: "Dec 2025 – Present",
      bullets: [
        "Built the Android background-location layer of the React Native driver app in Kotlin (foreground service, boot receiver, native bridge), with on-device arrive/depart stop zones and an offline queue that flushes on reopen.",
        "Investigated and fixed production crashes and ANRs reported through Firebase Crashlytics; added a native exit-reasons module that records why the OS stopped tracking.",
        "Built an LLM email-ingestion pipeline that turns broker emails and rate-confirmation PDFs into load records (MIME parsing, SendGrid Inbound Parse, Gemini/OpenAI failover via OpenRouter).",
        "Built a tool-calling voice assistant for the sales CRM with signed confirmations and an audit trail, and a multilingual (English, Punjabi, Spanish) driver voice agent on LiveKit with Twilio SMS fallback.",
        "Built the load marketplace (bid state machine, carrier load board, email bid-reply sync) and integrated Relay payments end to end with Express services, BullMQ queues and real-time notifications.",
        "Replaced polling on the Live Loads board with a shared Redis cache and batched Socket.io room joins; built driver chat with attachments, read receipts and translation.",
        "Managed EAS release builds for the driver and CRM apps, enabled R8 minification, and set up the driver app's unit-test suite behind a pre-push gate.",
      ],
      stack: "TypeScript, React 19, React Native, Expo, Kotlin, Node.js, Express, Socket.io, Prisma, MySQL, Redis, BullMQ, OpenAI, Gemini, LiveKit, Docker",
    },
    {
      role: "Full Stack Developer",
      company: "Zversal Private Limited",
      context: "Product and client studio, Mohali, India",
      period: "Jul 2024 – Nov 2025",
      bullets: [
        "Built and shipped web and mobile apps for B2B, healthcare and e-commerce clients, published on Google Play and the App Store: Fayda Hub, Prima Childcare, ZBot Conversations and Hissaria Steel.",
        "Led development of Fayda Hub, a B2B stationery ordering app for wholesalers and retailers (Android and iOS); built GitHub organisation sync on the GitHub REST API and webhooks.",
        "Worked on Apollo Federation GraphQL services, Docker deployments, AWS Lambda functions and CI/CD pipelines.",
      ],
    },
    {
      role: "Full Stack Developer Intern",
      company: "Zversal Private Limited",
      context: "Mohali, India",
      period: "Jan 2024 – Jun 2024",
      bullets: ["Contributed to React Native applications and the CI/CD workflows behind their Android and iOS releases."],
    },
  ],

  // Page 2. Featured projects get bullets; additional products get a paragraph.
  featured: [
    {
      name: "ExpoPulse",
      descriptor: "Static analysis and safe auto-fixes for Expo and React Native apps",
      link: "github.com/sourav2024/expopulse",
      href: "https://github.com/sourav2024/expopulse",
      bullets: [
        "Built a static-analysis CLI with 59 rules across code, assets, dependencies, Expo config, Android and iOS, using Babel AST traversal.",
        "Implemented safe auto-fixes (atomic writes, backups, path guards) and reporters for terminal, JSON, Markdown, HTML and SARIF 2.1.0, with per-category health scoring.",
        "Published on npm as a TypeScript pnpm monorepo with 80 Vitest tests and CI on Node 20, 22 and 24.",
      ],
      stack: "TypeScript, Babel AST, pnpm monorepo, sharp, Vitest, tsup, Biome",
    },
    {
      name: "ScaleGuard",
      descriptor: "Scalability audits for Node.js services on PostgreSQL or MySQL",
      link: "github.com/sourav2024/scale-guard",
      href: "https://github.com/sourav2024/scale-guard",
      bullets: [
        "Built a zero-dependency static scanner that finds connection-pool exhaustion risks, N+1 queries, duplicate PrismaClient instances and transactions that hold connections across network I/O.",
        "Added a connection-budget calculator based on Prisma's pool formula and Little's law, a PR-diff mode and CI exit codes; output redacts credentials.",
        "Published on npm and skills.sh as a CLI and Agent Skill for AI coding agents, with 50 tests, CI on Node 18, 20 and 22, and provenance-signed releases.",
      ],
      stack: "Node.js (ES modules), node:test, Prisma, PostgreSQL, MySQL",
    },
    {
      name: "Technical SEO MCP",
      descriptor: "MCP server that gives AI assistants a technical-SEO toolkit (npm: technical-seo-mcp)",
      link: "github.com/sourav2024/seo-mcp",
      href: "https://github.com/sourav2024/seo-mcp",
      bullets: [
        "Built an MCP server exposing 14 tools to AI assistants: site crawl, Lighthouse, sitemap, robots.txt, structured data, hreflang, caching and AI-crawler access.",
        "Implemented a concurrent sitemap-seeded crawler with a politeness delay and cancellation, and an SSRF guard that is re-checked on every redirect hop.",
        "Published on npm with 150 tests, CI on Linux and macOS, and only two runtime dependencies.",
      ],
      stack: "Node.js, Model Context Protocol SDK, zod, Lighthouse",
    },
  ],

  additional: [
    {
      name: "AI Vault",
      descriptor: "Offline-first document vault for Android",
      link: "Google Play",
      href: "https://play.google.com/store/apps/details?id=com.souravkashyap.aivault",
      text: "On-device OCR and PDF text through custom Expo native modules (Kotlin: PdfRenderer, ML Kit; Swift: PDFKit, Vision), SQLite FTS5 search, expiry-date extraction with reminders, and a biometric lock. The release build has no INTERNET permission. Built and released solo.",
      stack: "React Native, Expo SDK 57, TypeScript, Kotlin, Swift, SQLite, Drizzle ORM, Zustand, Jest",
    },
    {
      name: "Dabba Dash",
      descriptor: "Arcade game for Android, rendered in code",
      link: "Google Play",
      href: "https://play.google.com/store/apps/details?id=com.souravkashyap.dabbadash",
      text: "React Native Skia game with a deterministic fixed-step engine and seedable PRNG, a lane planner that guarantees a survivable route, and sprites recorded once as Skia pictures. 60 tests. Built and released solo.",
      stack: "React Native, Expo SDK 58, TypeScript, React Native Skia, Reanimated, Zustand, Jest",
    },
  ],

  openSource: [
    {
      label: "npm packages",
      links: [
        { label: "expopulse", href: "https://www.npmjs.com/package/expopulse" },
        { label: "@expopulse/core", href: "https://www.npmjs.com/package/@expopulse/core" },
        { label: "scale-guard", href: "https://www.npmjs.com/package/scale-guard" },
        { label: "technical-seo-mcp", href: "https://www.npmjs.com/package/technical-seo-mcp" },
      ],
    },
    {
      label: "Agent Skills",
      links: [{ label: "skills.sh/sourav2024", href: "https://www.skills.sh/sourav2024" }],
    },
    {
      label: "Source and releases",
      links: [{ label: "github.com/sourav2024", href: "https://github.com/sourav2024" }],
    },
  ],

  education: {
    degree: "B.Tech, Computer Science and Engineering",
    school: "Guru Nanak Dev University Regional Campus, Gurdaspur",
    detail: "CGPA 8.37",
    period: "2020 – 2024",
  },
};
