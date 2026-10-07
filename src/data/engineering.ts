export interface Capability {
  title: string
  description: string
}

/** What a team gets, stated as work rather than as tools. */
export const capabilities: Capability[] = [
  {
    title: "Requirements to architecture",
    description:
      "I start from the business process, the data it produces and the ways it can fail, then choose a structure and stack that fit the problem and the people who will maintain it.",
  },
  {
    title: "Interfaces and APIs",
    description:
      "Typed React and Next.js front ends, server-rendered Laravel applications, and the REST APIs, validation and business logic behind them.",
  },
  {
    title: "Data, access and security",
    description:
      "Schema design in PostgreSQL and MySQL, authentication, role-based authorization, tenant isolation, payment verification and audit trails.",
  },
  {
    title: "Deployment and operations",
    description:
      "Containers, CI pipelines, Linux servers, caching, queues, backups and monitoring. I stay with a system after it ships.",
  },
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
