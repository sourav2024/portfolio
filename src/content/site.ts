/**
 * Single source of truth for everything the site says.
 *
 * Rule for editing: every claim here must be checkable — a commit, a public
 * repo, an npm release or a store listing. No invented metrics, user counts
 * or download numbers. Live values (npm versions) come from src/lib/npm.ts.
 */

export const profile = {
  name: "Sourav Kashyap",
  role: "Full-Stack Software Engineer",
  headline: "Full-Stack Software Engineer — TypeScript, Node.js, React Native, production AI and developer tools",
  location: "Chandigarh, India",
  timezone: "IST (UTC+5:30)",
  availability: "Open to remote roles worldwide and to relocation with visa sponsorship.",
  email: "souravkashyap7869@gmail.com",
  links: {
    github: "https://github.com/sourav2024",
    linkedin: "https://www.linkedin.com/in/sourav-kashyap-56b550269/",
    npm: "https://www.npmjs.com/~sourav28",
  },
  resumeFile: "Sourav_Kashyap_Resume_2027.pdf",
  /** Optional portrait in /public; the hero shows it only when the file exists. */
  photoFile: "sourav-kashyap.jpg",
} as const;

export const hero = {
  eyebrow: "Full-Stack Software Engineer",
  title: "I build production software across backend, mobile and AI.",
  lede:
    "At Truxo I work on a transportation management platform: real-time tracking, payments, and LLM-powered workflows across a Node.js backend, a React web app and two React Native apps. In my own time I publish developer tools that find performance and correctness problems in real codebases.",
};

export const about = [
  "I have been shipping production software since January 2024. I started at Zversal, building web and mobile apps for B2B and e-commerce clients, and since December 2025 I have worked across the whole stack at Truxo: Express and Socket.io services, a React 19 web app, two React Native apps, and the Kotlin underneath them.",
  "Most of my work sits where systems meet. A phone has to keep reporting its location when it is parked, backgrounded or rebooted. A broker's email has to become a structured load record. A payment provider disconnects halfway through a flow. I like problems where the failure modes matter more than the happy path.",
  "Outside work I build developer tools: static analysers and MCP servers that help engineers and AI coding agents find real problems in real code. Three are published on npm, each with a test suite, CI and versioned releases. Right now I am going deeper on PostgreSQL internals, distributed systems and AI engineering.",
];

export type ExperienceGroup = { title: string; points: string[] };
export type Experience = {
  company: string;
  role: string;
  period: string;
  context: string;
  groups: ExperienceGroup[];
  stack: string[];
  apps?: { name: string; note: string; href: string }[];
};

export const experience: Experience[] = [
  {
    company: "Truxo",
    role: "Full Stack Developer",
    period: "Dec 2025 — Present",
    context:
      "Transportation management system for trucking carriers and brokers: web platform, driver app and sales CRM.",
    groups: [
      {
        title: "Mobile and Android native",
        points: [
          "Built the Android background-location layer of the React Native driver app in Kotlin: a foreground service, a boot receiver and a native bridge module, with on-device arrive/depart stop zones and an offline queue that flushes when the app reopens.",
          "Investigated and fixed production crashes and ANRs reported through Firebase Crashlytics, and added a native exit-reasons module that records why the OS stopped tracking.",
          "Managed versioning and EAS release builds for the driver and CRM apps, enabled R8 minification, and set up the driver app's unit-test suite behind a pre-push gate.",
        ],
      },
      {
        title: "AI and voice",
        points: [
          "Built an email-ingestion pipeline that turns broker emails and rate-confirmation PDFs into load records with LLMs — MIME parsing, SendGrid Inbound Parse, and Gemini/OpenAI failover routed through OpenRouter.",
          "Built a tool-calling voice assistant for the sales CRM that asks for signed confirmation before it acts and keeps an audit trail; added voice input and spoken replies to the web AI chat.",
          "Built a multilingual driver voice agent (English, Punjabi, Spanish) on LiveKit that follows up on missing documents and detention time, with an SMS fallback through Twilio.",
        ],
      },
      {
        title: "Backend and real-time",
        points: [
          "Built the load marketplace: a bid state machine, a carrier load board, and syncing of bid replies that arrive by email.",
          "Replaced polling on the Live Loads board with a shared Redis cache and batched Socket.io room joins; built driver chat with attachments, live read receipts and message translation.",
          "Integrated Relay payments for fuel and lumper codes end to end — Express services, BullMQ queues, real-time notifications and the driver-facing screens.",
        ],
      },
    ],
    stack: [
      "TypeScript", "React 19", "React Native", "Expo", "Kotlin", "Node.js", "Express", "Socket.io",
      "Prisma", "MySQL", "Redis", "BullMQ", "OpenAI", "Gemini", "OpenRouter", "LiveKit",
      "SendGrid", "Twilio", "Firebase", "Docker",
    ],
  },
  {
    company: "Zversal Private Limited",
    role: "Full Stack Developer · Intern → Full-time",
    period: "Jan 2024 — Nov 2025",
    context:
      "Product and client studio in Mohali, India. Internship from January 2024, full-time from July 2024.",
    groups: [
      {
        title: "Highlights",
        points: [
          "Built and shipped web and mobile apps for B2B, healthcare and e-commerce clients; led development of Fayda Hub, a B2B stationery ordering app.",
          "Built GitHub organisation sync on the GitHub REST API and webhooks.",
          "Worked on Apollo Federation GraphQL services, Docker deployments, AWS Lambda functions and CI/CD pipelines, including Android and iOS release workflows for React Native apps.",
        ],
      },
    ],
    stack: ["React", "React Native", "Node.js", "Express", "GraphQL", "Apollo Federation", "Docker", "AWS Lambda", "GitHub Actions"],
    apps: [
      { name: "Fayda Hub", note: "B2B stationery ordering · Android & iOS", href: "https://apps.apple.com/in/app/fayda-hub/id6482287987" },
      { name: "Prima Childcare", note: "Paediatric care · Android & iOS", href: "https://play.google.com/store/apps/details?id=com.zversal.primachildcare" },
      { name: "ZBot Conversations", note: "WhatsApp business chatbot · Android & iOS", href: "https://play.google.com/store/apps/details?id=com.zversal.zbotconversation" },
      { name: "Hissaria Steel", note: "Dealer ordering for a steel distributor · Android", href: "https://play.google.com/store/apps/details?id=com.zversal.b2bmanagement" },
    ],
  },
];

export type Project = {
  slug: string;
  /** Groups the showcase: published developer tools vs. shipped mobile apps. */
  kind: "tool" | "app";
  name: string;
  tagline: string;
  problem: string;
  built: string[];
  decisions: string[];
  stack: string[];
  quality: string;
  status: string;
  npm?: string;
  links: { label: string; href: string }[];
  preview:
    | { kind: "output"; caption: string; command: string; text: string }
    | { kind: "image"; caption: string; src: string; width: number; height: number; alt: string }
    | { kind: "phones"; caption: string; images: { src: string; alt: string; width?: number; height?: number }[] };
};

export const projects: Project[] = [
  {
    slug: "expopulse",
    kind: "tool",
    name: "ExpoPulse",
    tagline: "Static analysis and safe auto-fixes for Expo and React Native apps.",
    problem:
      "Expo apps fail store review, ship oversized bundles or carry misconfigured native code for reasons that hide across JavaScript, assets, app config, Gradle files and Info.plist — places a code review rarely looks at together.",
    built: [
      "A CLI (analyze, doctor, fix, compare, report) with 59 rules across code, assets, dependencies, Expo config, Android and iOS.",
      "Reporters for the terminal, JSON, Markdown, HTML and SARIF 2.1.0, plus per-category health scores.",
      "An Agent Skill so coding agents can run the same checks.",
    ],
    decisions: [
      "Auto-fixes write atomically, take a backup first and refuse paths outside the project, so an interrupted fix cannot leave a half-written file.",
      "Scoring damps repeated findings and marks layers that don't apply as N/A instead of rewarding their absence.",
      "Asset checks understand Metro's density and platform variants (@2x, .ios.png) before calling an image unused.",
    ],
    stack: ["TypeScript", "Babel AST", "pnpm monorepo", "sharp", "Vitest", "tsup", "Biome"],
    quality: "80 tests · CI on Node 20, 22, 24 · MIT",
    status: "Active · pre-1.0",
    npm: "expopulse",
    links: [
      { label: "GitHub", href: "https://github.com/sourav2024/expopulse" },
      { label: "npm", href: "https://www.npmjs.com/package/expopulse" },
    ],
    preview: {
      kind: "output",
      caption: "Real output from the repo's demo app (excerpt)",
      command: "npx expopulse analyze",
      text: `Health Score    73/100
ERROR 3   WARN 26   INFO 17

expo 60 · android 64 · deps 70
assets 72 · code 83
performance 96

ANDROID (10)
 ERROR  targetSdkVersion is 33;
        Google Play requires at
        least 34 to publish app
        updates.
        android/app/build.gradle:10
 WARN   Cleartext HTTP traffic is
        enabled app-wide via
        usesCleartextTraffic.
 WARN   Permission CAMERA is
        declared 2 times (first
        at line 3).
        ✚ auto-fixable`,
    },
  },
  {
    slug: "scale-guard",
    kind: "tool",
    name: "ScaleGuard",
    tagline: "Evidence-first scalability audits for Node.js services on PostgreSQL or MySQL.",
    problem:
      "Connection-pool exhaustion, N+1 queries and transactions that wait on the network usually surface only under production load. The code patterns behind them are visible much earlier, if something looks.",
    built: [
      "A zero-dependency static scanner for pool config, duplicate PrismaClient instances, queue-worker concurrency, transactions with external I/O, queries inside loops, unbounded findMany and polling.",
      "A connection-budget calculator based on Prisma's default pool formula and Little's law, which can read its input straight from scan output.",
      "Installs as an Agent Skill for Claude Code and Codex; PR mode (--changed-since) and --fail-on exit codes for CI.",
    ],
    decisions: [
      "Read-only by design: it never prints .env values and redacts credentials in output.",
      "Findings are reported as leads with file:line evidence, so an agent verifies the code before recommending a change.",
      "Results are grouped per deployable, because a worker's concurrency counts against the pool of the process it runs in.",
    ],
    stack: ["Node.js", "ES modules", "node:test", "Prisma", "PostgreSQL / MySQL"],
    quality: "50 tests · CI on Node 18, 20, 22 · npm provenance · MIT",
    status: "Published · v1",
    npm: "scale-guard",
    links: [
      { label: "GitHub", href: "https://github.com/sourav2024/scale-guard" },
      { label: "npm", href: "https://www.npmjs.com/package/scale-guard" },
      { label: "skills.sh", href: "https://www.skills.sh/sourav2024/scale-guard" },
    ],
    preview: {
      kind: "output",
      caption: "Real output from the repo's evaluation fixture (excerpt)",
      command: "npx scale-guard scan ./app",
      text: `Leads: 2 high, 4 medium, 0 low,
5 context.

Queue workers: 3; summed
concurrency: 25, of which
DB-using: 20.

## Interactive transactions with
   external I/O
_Holds a connection across network
calls._
- src/routes/orders.ts:36
  (high, external I/O: fetch,
  timeout=30000)
  await prisma.$transaction(…)

## Database URLs in env files
- .env.example DATABASE_URL:
  connection_limit=ABSENT`,
    },
  },
  {
    slug: "technical-seo-mcp",
    kind: "tool",
    name: "technical-seo-mcp",
    tagline: "An MCP server that gives AI assistants a working technical-SEO toolkit.",
    problem:
      "AI assistants can talk about SEO but cannot check a live site. This server gives them tools that actually fetch, crawl and measure — without API keys.",
    built: [
      "14 MCP tools: full audit, site crawl, Lighthouse, rendering, HTTPS, page essentials, caching, sitemap, robots.txt, structured data, hreflang, URL structure, keyword placement and AI-crawler access.",
      "Reports as Markdown, JSON or a standalone HTML file.",
      "A bundled agent skill with config templates for Claude, Codex and VS Code.",
    ],
    decisions: [
      "An optional SSRF guard blocks private, loopback and link-local hosts and re-checks after every redirect hop.",
      "The crawler runs concurrent workers on one shared queue, seeds from sitemaps (index-aware, discovered through robots.txt) and falls back to breadth-first links, with a politeness delay and cancellation.",
      "Only two runtime dependencies: the MCP SDK and zod.",
    ],
    stack: ["Node.js", "MCP SDK", "zod", "Lighthouse"],
    quality: "150 tests · CI on Node 20, 22, 24 and macOS · MIT",
    status: "Published · v1.2",
    npm: "technical-seo-mcp",
    links: [
      { label: "GitHub", href: "https://github.com/sourav2024/seo-mcp" },
      { label: "npm", href: "https://www.npmjs.com/package/technical-seo-mcp" },
    ],
    preview: {
      kind: "image",
      caption: "The generated HTML audit report",
      src: "/projects/seo-html-report.png",
      width: 676,
      height: 1400,
      alt: "HTML SEO audit report generated by technical-seo-mcp, showing scored sections for a site",
    },
  },
  {
    slug: "ai-vault",
    kind: "app",
    name: "AI Vault",
    tagline: "A private document vault for Android that never touches the network.",
    problem:
      "Insurance policies, warranties and vehicle papers carry expiry dates that are easy to miss, and most scanner apps upload your documents to someone's cloud to read them.",
    built: [
      "Scan with the camera or import PDFs and photos; text is recognised on the phone, documents are categorised, and expiry dates and amounts are extracted.",
      "Reminders before a date arrives, full-text search across every page, a biometric lock, and multi-page documents with a page editor.",
      "Designed, built and released solo — from native spikes to the Play Store listing.",
    ],
    decisions: [
      "The release build has no INTERNET permission, so the app cannot upload anything — privacy enforced by the OS, not by a promise.",
      "Custom Expo native modules in Swift (PDFKit, Vision) and Kotlin (PdfRenderer, pdfbox, ML Kit) behind one interface, validated on both platforms in a spike before any feature depended on them.",
      "Documents live on the filesystem and out of cloud backups; SQLite holds only metadata and an FTS5 index.",
    ],
    stack: ["React Native", "Expo SDK 57", "TypeScript", "Kotlin", "Swift", "SQLite / Drizzle", "Zustand", "Jest"],
    quality: "Unit tests and CI (typecheck, lint, test) · source private",
    status: "Live on Google Play",
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.souravkashyap.aivault" },
    ],
    preview: {
      kind: "phones",
      caption: "Store screenshots",
      images: [
        { src: "/projects/aivault-01-home.png", alt: "AI Vault home screen showing documents that need attention" },
        { src: "/projects/aivault-02-vault.png", alt: "AI Vault document list sorted into categories" },
        { src: "/projects/aivault-04-search.png", alt: "AI Vault full-text search results" },
      ],
    },
  },
  {
    slug: "dabba-dash",
    kind: "app",
    name: "Dabba Dash",
    tagline: "A three-lane delivery-runner game for Android, rendered entirely in code.",
    problem:
      "Endless runners feel unfair when the spawner can box you in, and they stutter on mid-range phones when every frame re-draws complex sprites. I wanted to build one that is fair by construction and smooth on ordinary Android hardware.",
    built: [
      "A complete game: lane-switching on swipe or tap, traffic and obstacles, deliveries with drop zones, power-ups, six scooters, four upgrades, daily missions and 13 achievements.",
      "Every sprite is drawn in code with React Native Skia and every sound effect and music loop is synthesised by a script — no third-party art or audio.",
      "Designed, built and released solo, from engine to Play Store listing.",
    ],
    decisions: [
      "The simulation is a pure, deterministic engine — one fixed 1/120 s step and a seedable PRNG, with no React, Skia or Math.random inside — so runs are reproducible and testable.",
      "A lane planner enforces a fairness rule: whatever spawns, a survivable route always exists.",
      "Sprites are recorded once as Skia pictures and replayed each frame; a benchmark build logs FPS to logcat and an invincible mode lets a run soak unattended.",
    ],
    stack: ["React Native", "Expo SDK 58", "TypeScript", "React Native Skia", "Reanimated", "Zustand", "Jest"],
    quality: "60 tests (engine, collision, spawner fairness, progression) · strict TypeScript · source private",
    status: "Live on Google Play",
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.souravkashyap.dabbadash" },
    ],
    preview: {
      kind: "phones",
      caption: "Store screenshots",
      images: [
        { src: "/projects/dabbadash-gameplay.png", alt: "Dabba Dash gameplay: a scooter weaving between a truck and an auto-rickshaw", width: 1080, height: 1920 },
        { src: "/projects/dabbadash-garage.png", alt: "Dabba Dash garage screen with scooters and upgrades", width: 1080, height: 1920 },
        { src: "/projects/dabbadash-missions.png", alt: "Dabba Dash daily missions and achievements", width: 1080, height: 1920 },
      ],
    },
  },
];

export const ecosystem = [
  { name: "expopulse", kind: "npm · CLI", href: "https://www.npmjs.com/package/expopulse", npm: "expopulse" },
  { name: "@expopulse/core", kind: "npm · library", href: "https://www.npmjs.com/package/@expopulse/core", npm: "@expopulse/core" },
  { name: "scale-guard", kind: "npm · CLI + Agent Skill", href: "https://www.npmjs.com/package/scale-guard", npm: "scale-guard" },
  { name: "technical-seo-mcp", kind: "npm · MCP server", href: "https://www.npmjs.com/package/technical-seo-mcp", npm: "technical-seo-mcp" },
] as const;

export const alsoShipped = [
  {
    name: "Agent Skills on skills.sh",
    note: "ScaleGuard and ExpoPulse are installable as skills for Claude Code, Codex and other coding agents.",
    href: "https://www.skills.sh/sourav2024",
    label: "skills.sh",
  },
];

export const expertise = [
  {
    area: "Backend engineering",
    items: ["Node.js", "TypeScript", "Express", "REST APIs", "Socket.io", "BullMQ", "JWT auth"],
    evidence: "Marketplace, payments and real-time services at Truxo.",
  },
  {
    area: "Frontend engineering",
    items: ["React 19", "Next.js", "Redux Toolkit", "TanStack Table", "Tailwind CSS"],
    evidence: "TMS web app at Truxo; this site.",
  },
  {
    area: "Mobile engineering",
    items: ["React Native", "Expo & EAS", "Kotlin modules", "Swift modules", "Crashlytics"],
    evidence: "Background location in a driver app; on-device OCR in AI Vault; a Skia game in Dabba Dash.",
  },
  {
    area: "Data",
    items: ["MySQL", "PostgreSQL", "Prisma", "Redis", "SQLite FTS5"],
    evidence: "Connection-pool and query analysis in ScaleGuard.",
  },
  {
    area: "Cloud and DevOps",
    items: ["Docker", "GitHub Actions", "AWS", "npm provenance", "EAS Build"],
    evidence: "CI matrices and signed releases on every published package.",
  },
  {
    area: "AI and developer tooling",
    items: ["OpenAI", "Gemini", "OpenRouter", "Tool-calling agents", "LiveKit voice", "MCP servers", "Babel AST"],
    evidence: "LLM pipelines and voice agents at work; MCP servers and static analysers in public.",
  },
];

export const interests = [
  { title: "Backend architecture", note: "Service boundaries, queues and idempotent workflows." },
  { title: "Database internals", note: "Query planning, MVCC, indexing and connection pooling in PostgreSQL." },
  { title: "Distributed systems", note: "Delivery guarantees, retries with backoff, consistency trade-offs." },
  { title: "AI engineering", note: "Structured output, tool permissions, evaluation and failover." },
  { title: "Developer productivity", note: "Tools that find problems in code before production does." },
  { title: "Mobile engineering", note: "Offline-first apps and the native layer under React Native." },
];
