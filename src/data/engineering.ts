export interface FlowStage {
  name: string
  role: string
  tools: string[]
}

/**
 * The path a request takes through the platforms I run, edge to data.
 * Shown as the animated system strip under the hero.
 */
export const systemFlow: FlowStage[] = [
  { name: "Client", role: "Server-rendered pages, accessible forms", tools: ["Next.js", "React", "Livewire"] },
  { name: "Edge", role: "TLS, caching, security headers, rate limits", tools: ["Cloudflare", "nginx"] },
  { name: "Application", role: "Domain logic behind RBAC, MFA and audit", tools: ["Laravel", "Node.js", "REST"] },
  { name: "Workers", role: "Queues, outbox, PDFs and signed webhooks", tools: ["Redis", "Cron", "M-Pesa", "Paystack"] },
  { name: "Data", role: "Isolated, audited, backed up and restore-tested", tools: ["PostgreSQL", "MySQL"] },
]

/** Guarantees that hold across every platform, stated as outcomes. */
export const flowGuarantees = [
  "Payments confirmed only by signed provider callbacks",
  "Slow work queued, so a failure never blocks a checkout",
  "Every deploy gated on tests, lint and security audits",
]

export interface EngineeringArea {
  area: string
  practice: string
  tools: string[]
  evidence: { label: string; slug: string }
}

export const engineeringAreas: EngineeringArea[] = [
  {
    area: "Frontend",
    practice:
      "Component architecture with typed props, server rendering by default and client code only where interaction needs it. Responsive layouts, accessible controls and measured performance.",
    tools: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Livewire"],
    evidence: { label: "Muhscience Tech Labs", slug: "muhscience-tech-labs" },
  },
  {
    area: "Backend",
    practice:
      "APIs and business logic organised by domain. Explicit commands for writes, validation at the boundary, third-party integrations behind verified callbacks, and background processing for slow work.",
    tools: ["Laravel", "PHP", "Node.js", "Python", "REST APIs"],
    evidence: { label: "EuroAfrique platform", slug: "euroafrique" },
  },
  {
    area: "Data",
    practice:
      "Relational schema design, migrations that are safe to re-run, query tuning against realistic data volume, optimistic concurrency and tenant isolation at the database layer.",
    tools: ["PostgreSQL", "MySQL", "Redis"],
    evidence: { label: "BusinessOS", slug: "businessos" },
  },
  {
    area: "Security",
    practice:
      "Authentication, token rotation and multi-factor login. Role-based authorization, signed webhooks, rate limiting, secure session handling and audit logging treated as part of the design.",
    tools: ["RBAC", "JWT", "TOTP", "Row-level security"],
    evidence: { label: "BusinessOS", slug: "businessos" },
  },
  {
    area: "Infrastructure",
    practice:
      "Containerised stacks, CI pipelines that gate deployment on tests and audits, reverse-proxy and TLS configuration, edge caching, and deployments to Linux servers and Vercel.",
    tools: ["Docker", "GitHub Actions", "Linux", "nginx", "Cloudflare", "Vercel"],
    evidence: { label: "BusinessOS", slug: "businessos" },
  },
  {
    area: "Reliability",
    practice:
      "Caching, queues and workers, outbox delivery with retries, idempotent writes, health checks and structured logs, and backups that are verified by restoring them.",
    tools: ["Redis queues", "Cron", "Health checks", "Backups"],
    evidence: { label: "EuroAfrique platform", slug: "euroafrique" },
  },
]

export interface Principle {
  title: string
  detail: string
}

export const principles: Principle[] = [
  {
    title: "Architecture follows requirements.",
    detail:
      "The stack is chosen after the problem is understood. A content site, a payment workflow and a multi-tenant ledger do not want the same design.",
  },
  {
    title: "Prefer modules with clear boundaries to tightly coupled code.",
    detail: "A modular monolith is usually the right first shape. Services are extracted when a domain proves it needs to scale or release on its own.",
  },
  {
    title: "Contain failure.",
    detail: "A slow PDF render or an unreachable webhook endpoint should not be able to fail an unrelated checkout or enrolment.",
  },
  {
    title: "Do not block the request on work that can wait.",
    detail: "Document generation, email and external calls go to queues and are retried there.",
  },
  {
    title: "Access control and audit are architecture.",
    detail:
      "Authentication, authorization, data isolation and audit history are designed in from the first schema, because they are expensive to retrofit.",
  },
  {
    title: "Optimise what has been measured.",
    detail: "Find the bottleneck with real data volume first. Then cache, index or restructure that one thing.",
  },
  {
    title: "Build systems that can be operated.",
    detail: "Health checks, logs that can be correlated, repeatable deployments and tested restores are part of the feature.",
  },
]
