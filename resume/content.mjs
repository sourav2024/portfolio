// Résumé content — the single editable source for both the PDF and the DOCX.
// Same rule as the website: only claims backed by commits, public repos,
// npm releases or store listings. Run `npm run resume` after editing.

const siteUrl = process.env.RESUME_SITE_URL ?? ""; // set once the portfolio is deployed

export const resume = {
  name: "Sourav Kashyap",
  headline: "Full-Stack Software Engineer — TypeScript · Node.js · React Native · Production AI & Developer Tools",
  location: "Chandigarh, India (IST, UTC+5:30) · Open to remote roles and to relocation with visa sponsorship",
  contacts: [
    { label: "souravkashyap7869@gmail.com", href: "mailto:souravkashyap7869@gmail.com" },
    { label: "linkedin.com/in/sourav-kashyap-56b550269", href: "https://www.linkedin.com/in/sourav-kashyap-56b550269/" },
    { label: "github.com/sourav2024", href: "https://github.com/sourav2024" },
    ...(siteUrl ? [{ label: siteUrl.replace(/^https?:\/\//, ""), href: siteUrl }] : []),
  ],

  summary:
    "Full-stack software engineer with 2+ years of professional experience shipping production software across Node.js backends, React web apps and React Native mobile apps, down to Kotlin native modules. At Truxo I build real-time tracking, payments, LLM pipelines and voice agents for a transportation management platform. Outside work I publish open-source developer tools on npm — static analysers and MCP servers — each with a test suite, CI and versioned releases.",

  skills: [
    ["Languages", "TypeScript, JavaScript, SQL, Kotlin, Swift (native modules)"],
    ["Backend", "Node.js, Express, REST APIs, Socket.io, BullMQ, JWT auth, GraphQL"],
    ["Frontend", "React 19, Next.js, Redux Toolkit, TanStack Table, Tailwind CSS"],
    ["Mobile", "React Native, Expo & EAS, Android native modules, Firebase Crashlytics, React Native Skia"],
    ["Data", "MySQL, PostgreSQL, Prisma, Redis, SQLite (FTS5)"],
    ["AI", "OpenAI, Gemini, OpenRouter, tool-calling agents, LiveKit voice agents, MCP servers, Agent Skills"],
    ["DevOps & testing", "Docker, GitHub Actions, AWS (S3, Lambda), npm provenance, Jest, Vitest, node:test"],
  ],

  experience: [
    {
      company: "Truxo",
      role: "Full Stack Developer",
      period: "Dec 2025 – Present",
      context: "Transportation management system for trucking carriers and brokers — web platform, driver app and sales CRM.",
      bullets: [
        "Built the Android background-location layer of the React Native driver app in Kotlin — foreground service, boot receiver and native bridge — with on-device arrive/depart stop zones and an offline queue that flushes on reopen.",
        "Investigated and fixed production crashes and ANRs from Firebase Crashlytics; added a native exit-reasons module that records why the OS stopped tracking.",
        "Built an LLM email-ingestion pipeline that turns broker emails and rate-confirmation PDFs into load records (MIME parsing, SendGrid Inbound Parse, Gemini/OpenAI failover via OpenRouter).",
        "Built a tool-calling voice assistant for the sales CRM with signed confirmations and an audit trail, and a multilingual (English, Punjabi, Spanish) driver voice agent on LiveKit with Twilio SMS fallback.",
        "Built the load marketplace — bid state machine, carrier load board, email bid-reply sync — and integrated Relay payments end to end with Express services, BullMQ queues and real-time notifications.",
        "Replaced polling on the Live Loads board with a shared Redis cache and batched Socket.io room joins; built driver chat with attachments, read receipts and translation.",
        "Managed EAS release builds for the driver and CRM apps, enabled R8 minification, and set up the driver app's unit-test suite behind a pre-push gate.",
      ],
      stack: "TypeScript, React 19, React Native, Expo, Kotlin, Node.js, Express, Socket.io, Prisma, MySQL, Redis, BullMQ, OpenAI, Gemini, LiveKit, Docker",
    },
    {
      company: "Zversal Private Limited",
      role: "Full Stack Developer",
      period: "Jul 2024 – Nov 2025",
      context: "Product and client studio, Mohali, India.",
      bullets: [
        "Built and shipped web and mobile apps for B2B, healthcare and e-commerce clients, published on Google Play and the App Store: Fayda Hub, Prima Childcare, ZBot Conversations and Hissaria Steel.",
        "Led development of Fayda Hub, a B2B stationery ordering app for wholesalers and retailers (Android and iOS).",
        "Built GitHub organisation sync on the GitHub REST API and webhooks.",
        "Worked on Apollo Federation GraphQL services, Docker deployments, AWS Lambda functions and CI/CD pipelines.",
      ],
      stack: "React, React Native, Node.js, Express, GraphQL, Docker, AWS Lambda, GitHub Actions",
    },
    {
      company: "Zversal Private Limited",
      role: "Full Stack Developer Intern",
      period: "Jan 2024 – Jun 2024",
      bullets: ["Contributed to React Native applications and the CI/CD workflows behind their Android and iOS releases."],
    },
  ],

  projects: [
    {
      name: "ExpoPulse",
      link: "github.com/sourav2024/expopulse",
      href: "https://github.com/sourav2024/expopulse",
      meta: "npm · TypeScript",
      text: "Static-analysis CLI for Expo/React Native apps: 59 rules across code, assets, dependencies, Expo config, Android and iOS; Babel-AST checks; auto-fixes with atomic writes and backups; SARIF 2.1.0, HTML and JSON reports. 80 Vitest tests, CI on Node 20–24.",
    },
    {
      name: "ScaleGuard",
      link: "github.com/sourav2024/scale-guard",
      href: "https://github.com/sourav2024/scale-guard",
      meta: "npm · Agent Skill · Node.js",
      text: "Zero-dependency scanner that finds connection-pool exhaustion, N+1 queries and transactions holding connections across network calls in Node.js/Prisma services on PostgreSQL or MySQL, plus a Little's-law connection-budget calculator. PR mode and CI exit codes; 50 tests; provenance-signed releases.",
    },
    {
      name: "technical-seo-mcp",
      link: "github.com/sourav2024/seo-mcp",
      href: "https://github.com/sourav2024/seo-mcp",
      meta: "npm · MCP server",
      text: "MCP server giving AI assistants 14 technical-SEO tools (crawl, Lighthouse, sitemap, robots, structured data, hreflang, AI-crawler access). SSRF guard re-checked on every redirect; concurrent sitemap-seeded crawler. 150 tests, CI on Linux and macOS.",
    },
    {
      name: "AI Vault",
      link: "Google Play: com.souravkashyap.aivault",
      href: "https://play.google.com/store/apps/details?id=com.souravkashyap.aivault",
      meta: "Android · solo",
      text: "Offline-first document vault: on-device OCR and PDF text through custom Expo native modules (Kotlin: PdfRenderer, ML Kit; Swift: PDFKit, Vision), SQLite FTS5 search, expiry extraction and reminders, biometric lock. Release build has no INTERNET permission.",
    },
    {
      name: "Dabba Dash",
      link: "Google Play: com.souravkashyap.dabbadash",
      href: "https://play.google.com/store/apps/details?id=com.souravkashyap.dabbadash",
      meta: "Android · solo",
      text: "Arcade game rendered in code with React Native Skia: deterministic fixed-step engine with a seedable PRNG, a lane planner that guarantees a survivable route, sprites recorded once as Skia pictures. 60 tests.",
    },
  ],

  education: {
    school: "Guru Nanak Dev University Regional Campus, Gurdaspur",
    degree: "B.Tech, Computer Science and Engineering · CGPA 8.37",
    period: "2020 – 2024",
  },
};
