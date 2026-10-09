export type ProjectStatus = "production" | "in-development" | "research"

export interface ProjectLink {
  label: string
  href: string
  kind: "live" | "repository"
}

export interface EngineeringNote {
  area: string
  points: string[]
}

export interface Decision {
  decision: string
  rationale: string
}

export interface SystemLayer {
  layer: string
  nodes: { name: string; detail?: string }[]
}

/** A headline number or fact for a project card, drawn from the outcomes below. */
export interface Highlight {
  value: string
  label: string
}

export interface Project {
  slug: string
  title: string
  /** One line used in listings and metadata. */
  summary: string
  status: ProjectStatus
  statusLabel: string
  period: string
  role: string
  featured: boolean
  problem: string
  built: string
  stack: string[]
  system: SystemLayer[]
  engineering: EngineeringNote[]
  decisions: Decision[]
  outcomes: string[]
  /** Up to three proof points shown on the homepage card. */
  highlights?: Highlight[]
  links: ProjectLink[]
  /** Shown where there is nothing public to link to. */
  accessNote?: string
}

export const projects: Project[] = [
  {
    slug: "businessos",
    title: "BusinessOS",
    summary:
      "Multi-tenant business operating system that puts CRM, sales, procurement, inventory, finance, HR and projects on one governed data model.",
    status: "in-development",
    statusLabel: "In development · private repository",
    period: "2026 – present",
    role: "Architecture and full-stack development",
    featured: true,
    problem:
      "Small and mid-sized organisations tend to run sales, purchasing, stock, finance and people on separate tools. The records disagree with each other, permissions are bolted on per tool, and nobody can reconstruct who changed what. BusinessOS is an attempt to put those workflows on a single transactional model where tenancy, authorization and audit are properties of the platform rather than of each feature.",
    built:
      "A Laravel API organised by business domain, a server-rendered Next.js web application, and a PostgreSQL database with row-level security, running as a containerised stack with queue workers, an outbox publisher, a scheduler and verified backups. It is an ongoing project and is not publicly deployed.",
    stack: [
      "Laravel 13",
      "PHP 8.5",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL 18",
      "Redis",
      "Docker",
      "nginx",
      "GitHub Actions",
      "Playwright",
      "k6",
    ],
    system: [
      { layer: "Edge", nodes: [{ name: "nginx", detail: "TLS, security headers, auth rate limiting, request IDs" }] },
      {
        layer: "Application",
        nodes: [
          { name: "Next.js web", detail: "Server-rendered UI, httpOnly token cookies" },
          { name: "Laravel API", detail: "Domain modules on PHP-FPM" },
        ],
      },
      {
        layer: "Background",
        nodes: [
          { name: "Queue workers", detail: "Redis-backed, retried with backoff" },
          { name: "Outbox publisher", detail: "Integration events, signed webhooks" },
          { name: "Scheduler" },
        ],
      },
      {
        layer: "Data",
        nodes: [
          { name: "PostgreSQL", detail: "Row-level security, restricted runtime role" },
          { name: "Redis", detail: "Cache, queues, sessions, locks" },
        ],
      },
      {
        layer: "Operations",
        nodes: [
          { name: "Migrate job", detail: "Checksummed SQL releases" },
          { name: "Backups", detail: "Scheduled dumps, restore-verified" },
          { name: "Health and metrics", detail: "Readiness checks, Prometheus format" },
        ],
      },
    ],
    engineering: [
      {
        area: "Architecture",
        points: [
          "Modular monolith: Laravel code is organised by business domain, and a service is only extracted once a domain shows an independent scaling, reliability or release need.",
          "Writes go through explicit commands. The business change, its audit record and its outbox event commit in the same database transaction.",
          "Tenant-scoped operations use explicit repositories and query-builder SQL rather than shared Eloquent models, because the schema uses composite tenant-aware keys.",
        ],
      },
      {
        area: "Tenant isolation",
        points: [
          "PostgreSQL row-level security is enforced as defence in depth. The application connects as a restricted role with no superuser or BYPASSRLS privilege.",
          "Tenant context is set per transaction, so it stays correct when connections are pooled or persistent.",
          "Application authorization still runs on top of RLS: tenant, company, role, record scope and approval limits are evaluated in code.",
        ],
      },
      {
        area: "Identity and access",
        points: [
          "First-party login issuing short-lived JWT access tokens and rotating refresh tokens. Re-presenting an already-rotated token revokes the whole token family.",
          "The login path always performs a password-hash comparison so response timing cannot be used to enumerate accounts, and repeated failures lock the account temporarily.",
          "TOTP two-factor authentication with one-time recovery codes.",
          "Role-based access control with company-scoped roles, team-scoped administration and enforced approval limits.",
          "The operator console for platform staff is a separate surface with its own login, signing secret and database role, so an operator token and a tenant token cannot verify as each other.",
        ],
      },
      {
        area: "Data integrity",
        points: [
          "Optimistic concurrency: state transitions carry an expected version and stale writes are rejected without persisting anything.",
          "Idempotency keys, scoped to the resolved tenant, make write requests safe to retry.",
          "Posted financial and stock history is append-only. Corrections are linked reversal or adjustment records, and a delete is a state transition rather than a row removal.",
        ],
      },
      {
        area: "Background work and integrations",
        points: [
          "Redis-backed queue workers handle work that does not need to block the request.",
          "A transactional outbox publishes integration events and delivers signed webhooks with retries and dead-lettering, so an external outage cannot fail or half-complete a business transaction.",
        ],
      },
      {
        area: "Infrastructure and operations",
        points: [
          "Docker Compose stack: nginx, the API, the web server, workers, scheduler, outbox publisher, PostgreSQL, Redis and a backup service. nginx is the only container with published ports.",
          "A one-shot migrate job runs before the application starts and is the only holder of the database owner password. Each SQL release is recorded with its SHA-256 and the runner refuses to proceed if an applied file was edited.",
          "JSON logs carry a request ID assigned at the edge and forwarded through the web server to the API, plus tenant and user IDs.",
          "Liveness and readiness endpoints, Prometheus-format metrics for database, Redis, queue and outbox state, and slow-query logging.",
          "Scheduled database dumps with checksums. A subset is automatically restored into a scratch database and checked, and a restore-drill script rehearses full recovery without touching live data.",
        ],
      },
      {
        area: "Testing and delivery",
        points: [
          "GitHub Actions runs API tests against a freshly migrated PostgreSQL, type-checks, lints and builds the web app, builds the Docker images, validates the nginx configuration and audits dependencies.",
          "Playwright end-to-end tests run against the full Docker stack.",
          "A k6 load test drives read and point-of-sale write traffic against a tenant seeded with realistic data volume, since an empty database hides unbounded reads.",
        ],
      },
    ],
    decisions: [
      {
        decision: "Modular monolith instead of microservices",
        rationale:
          "Audit evidence and outbox events have to commit atomically with the business change. One transactional boundary gives that for free; splitting services first would have meant building distributed consistency before there was a reason to.",
      },
      {
        decision: "Row-level security and application authorization, not one or the other",
        rationale:
          "RLS stops a missed WHERE clause from leaking another tenant's rows. It cannot express approval limits or record-level scope, so those stay in application code.",
      },
      {
        decision: "Credential and refresh-token tables sit outside row-level security",
        rationale:
          "Tenant identity is not known until login succeeds, so the tables consulted during login cannot depend on a tenant context. They are kept to a deliberately small set.",
      },
      {
        decision: "Outbox for external calls",
        rationale:
          "Calling third parties inside the request ties their availability to ours. Writing an event in the same transaction and delivering it asynchronously keeps the transaction honest and the delivery retryable.",
      },
    ],
    outcomes: [
      "The backend modules are implemented with command and query coverage, authorization, audit and outbox traceability, and API tests.",
      "The web application covers a subset of those modules and is being extended module by module.",
      "Not yet publicly available.",
    ],
    highlights: [
      { value: "7", label: "business domains on one governed data model" },
      { value: "RLS", label: "tenant isolation enforced inside PostgreSQL" },
      { value: "E2E", label: "Playwright and k6 against the full Docker stack" },
    ],
    links: [],
    accessNote: "The repository is private. I am happy to walk through the architecture and code in a conversation.",
  },
  {
    slug: "euroafrique",
    title: "EuroAfrique Corporate Skills Platform",
    summary:
      "Production training platform handling programme publishing, applications, M-Pesa and card payments, and the documents generated around each enrolment.",
    status: "production",
    statusLabel: "In production",
    period: "2025 – present",
    role: "Full-stack developer and sole technical owner",
    featured: true,
    problem:
      "A corporate training provider serving professionals in many countries needed one system to publish programmes and schedules, accept individual and corporate applications, collect payment by M-Pesa or card, and produce the paperwork each enrolment requires: invoices, invitation letters, brochures and certificates. Most of that was manual, and it did not scale with enquiry volume.",
    built:
      "The public Laravel application, the REST endpoints and admin tooling behind it, the payment and document workflows, and the delivery pipeline and server configuration that keep it running. I own it end to end, from requirements to production support.",
    stack: [
      "Laravel",
      "PHP",
      "MySQL",
      "Redis",
      "JavaScript",
      "Tailwind CSS",
      "Vite",
      "Algolia",
      "Paystack",
      "M-Pesa",
      "GitHub Actions",
      "Cloudflare",
      "Linux",
    ],
    system: [
      { layer: "Edge", nodes: [{ name: "Cloudflare", detail: "DNS, TLS, edge caching" }] },
      {
        layer: "Application",
        nodes: [
          { name: "Laravel app", detail: "Public site, applications, country-aware routing" },
          { name: "REST API", detail: "Programmes, schedules, applications" },
          { name: "Admin", detail: "Role-based back office" },
        ],
      },
      {
        layer: "Integrations",
        nodes: [
          { name: "M-Pesa", detail: "Payment callback" },
          { name: "Paystack", detail: "Card payments, signed webhook" },
          { name: "Algolia", detail: "Programme search" },
          { name: "Email", detail: "Transactional mail with attachments" },
        ],
      },
      {
        layer: "Background",
        nodes: [
          { name: "Document queue", detail: "PDF generation processed by cron" },
          { name: "Scheduled jobs", detail: "Schedule generation and clean-up" },
        ],
      },
      {
        layer: "Data",
        nodes: [
          { name: "MySQL", detail: "System of record" },
          { name: "Redis", detail: "Cache, sessions, queues" },
        ],
      },
    ],
    engineering: [
      {
        area: "Backend",
        points: [
          "Laravel application with service classes for programmes, cohort assignment, invoicing and country-specific SEO.",
          "Versioned REST endpoints serve programme, schedule and application data to the front end and the admin tooling.",
          "The Laravel application was introduced alongside the existing PHP admin and API code and shares their database, so the platform kept trading while it was modernised.",
        ],
      },
      {
        area: "Payments",
        points: [
          "M-Pesa and card payments (Paystack) confirmed server-side through provider callbacks rather than by trusting the browser redirect.",
          "Webhook payloads are authenticated with an HMAC-SHA512 signature compared in constant time before any payment state changes.",
          "Fee calculation and payment verification gate enrolment confirmation and paid-invoice generation.",
        ],
      },
      {
        area: "Documents and automation",
        points: [
          "Invoices, paid invoices, invitation letters, brochures and certificates are generated as PDFs and emailed to applicants.",
          "Generation runs from a queue processed on a schedule, so a slow PDF render never blocks an application submission.",
          "Programme schedules are generated and cleaned up by scheduled jobs instead of by hand.",
        ],
      },
      {
        area: "Performance and SEO",
        points: [
          "Redis for cache and sessions, compressed responses, and Cloudflare caching in front of the origin.",
          "Country detection, hreflang alternates and per-country metadata for a multi-regional audience.",
        ],
      },
      {
        area: "Access control and security",
        points: [
          "Role-based access control in the admin area, with rate limiting and CSRF protection on forms.",
          "Certificates are served through obfuscated, verified URLs rather than guessable paths.",
        ],
      },
      {
        area: "Delivery and operations",
        points: [
          "GitHub Actions pipeline: PHP lint, Composer and npm security audits, PHPUnit, an asset build, static analysis and admin security checks. Deployment to the production server over SSH runs only after those pass.",
          "I manage hosting, DNS, TLS, cron, deployments and production support for the platform.",
        ],
      },
    ],
    decisions: [
      {
        decision: "Confirm payments from provider callbacks only",
        rationale:
          "A redirect back to the site proves the user returned, not that money moved. Enrolment state changes only when a signed callback says so.",
      },
      {
        decision: "Move document generation off the request path",
        rationale:
          "PDF rendering and email with attachments are the slowest and least reliable steps in an application. Queuing them lets the submission succeed immediately and the documents be retried independently.",
      },
      {
        decision: "Modernise incrementally rather than rewrite",
        rationale:
          "The platform was already taking applications and payments. Introducing Laravel beside the existing code and moving flows across one at a time avoided a risky cut-over.",
      },
      {
        decision: "Put checks in front of deployment",
        rationale:
          "As sole owner there is no second reviewer on a release, so lint, dependency audits and tests in the pipeline do that job before anything reaches the server.",
      },
    ],
    outcomes: [
      "In production at euroafriquecorporateskills.com.",
      "Serves an alumni network of 25,000+ professionals across 50+ countries.",
      "Average latency reduced by approximately 35% through caching and delivery changes.",
      "Manual operational work reduced by approximately 60% through payment, enrolment and document automation.",
    ],
    highlights: [
      { value: "25,000+", label: "professionals across 50+ countries" },
      { value: "~35%", label: "lower average latency" },
      { value: "~60%", label: "less manual operational work" },
    ],
    links: [{ label: "Live site", href: "https://www.euroafriquecorporateskills.com/", kind: "live" }],
    accessNote: "The source repository is private.",
  },
  {
    slug: "chania-publishers-lms",
    title: "Chania Publishers LMS",
    summary:
      "Learning management system for an educational publisher: course management, enrolment, verified payments and protected video content.",
    status: "production",
    statusLabel: "In production",
    period: "2025 – present",
    role: "Full-stack developer and sole technical owner",
    featured: true,
    problem:
      "An educational publisher wanted to sell and deliver courses online. That meant student accounts, a course catalogue, paid access that is only granted once payment is verified, and video lessons that paying subscribers can watch but that cannot simply be linked to or downloaded.",
    built:
      "The LMS from concept to production: authentication and role-based access, course and lesson management, enrolment and subscriptions, payment verification, a protected video delivery path, the admin back office, and the hosting and deployment around it.",
    stack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Linux"],
    system: [
      {
        layer: "Clients",
        nodes: [
          { name: "Student area", detail: "Dashboard, courses, profile, subscription" },
          { name: "Admin back office", detail: "Courses, users, subscriptions, monitoring" },
        ],
      },
      {
        layer: "Request pipeline",
        nodes: [
          { name: "Router" },
          { name: "Middleware", detail: "Auth, admin access control, subscriber check" },
          { name: "Rate limiting" },
        ],
      },
      {
        layer: "Domain",
        nodes: [
          { name: "Courses and lessons" },
          { name: "Subscriptions and payments" },
          { name: "Protected video streaming", detail: "Access checked per request" },
        ],
      },
      {
        layer: "Data",
        nodes: [
          { name: "MySQL", detail: "Users, courses, payments, subscriptions" },
          { name: "Audit and security logs" },
        ],
      },
    ],
    engineering: [
      {
        area: "LMS architecture",
        points: [
          "A router and middleware pipeline with models for users, courses, lessons, payments, subscriptions and reviews.",
          "Separate student and admin surfaces over the same domain model.",
          "Course catalogue organised by education level, with enrolment and progress tracking per student.",
        ],
      },
      {
        area: "Authentication and RBAC",
        points: [
          "Session-based authentication with rate limiting on login and automatic session clean-up.",
          "Role-based access control enforced in middleware: general authentication, admin access control and a subscriber check are separate layers.",
          "Audit logging of security-relevant events for the admin monitoring views.",
        ],
      },
      {
        area: "Payments and enrolment",
        points: [
          "Enrolment and subscription state changes only after payment verification.",
          "Admins can review subscriptions and payments from the back office.",
        ],
      },
      {
        area: "Protected content",
        points: [
          "Video lessons are streamed through the application, which checks the session and subscription on each request instead of exposing a static file URL.",
        ],
      },
      {
        area: "Performance and deployment",
        points: [
          "Caching, asset optimisation and more efficient resource delivery to improve page speed.",
          "I manage hosting, DNS, TLS, security hardening, deployments and monitoring for the platform.",
        ],
      },
    ],
    decisions: [
      {
        decision: "Serve video through an access-checked endpoint",
        rationale:
          "A direct file URL can be shared the moment one subscriber has it. Routing playback through the application keeps the subscription check on every request.",
      },
      {
        decision: "Authorization as layered middleware",
        rationale:
          "Keeping authentication, admin access and subscriber status as separate checks makes each route's requirements explicit and stops a new page from being accidentally public.",
      },
      {
        decision: "Grant access on verified payment, not on submission",
        rationale: "Paid content is the product. Access is tied to a verified payment record rather than to a form being completed.",
      },
    ],
    outcomes: [
      "In production at chaniapublishers.com.",
      "Page speed improved by approximately 60% through caching and asset optimisation.",
      "Enrolment, payment verification and premium content access run without manual intervention.",
    ],
    highlights: [
      { value: "~60%", label: "faster page loads" },
      { value: "0", label: "manual steps from payment to course access" },
      { value: "Per request", label: "subscription check on every video stream" },
    ],
    links: [{ label: "Live site", href: "https://chaniapublishers.com/", kind: "live" }],
    accessNote: "The source repository is private.",
  },
  {
    slug: "afriasia-career-development-center",
    title: "AfriAsia Career Development Center",
    summary:
      "Training, booking and document-management platform with a public course catalogue and an authenticated administration portal.",
    status: "production",
    statusLabel: "In production",
    period: "2026 – present",
    role: "Full-stack developer and sole technical owner",
    featured: false,
    problem:
      "A sister company to EuroAfrique needed its own platform for executive training: public course discovery and applications for individuals and corporate groups, and an operations portal covering programmes, schedules, delegates, venues, payments, invoices and certificates.",
    built:
      "A Laravel application with a Livewire administration portal, online payments, generated documents and a permission model, deployed to production.",
    stack: ["Laravel 12", "PHP", "Livewire", "Alpine.js", "Tailwind CSS", "MySQL", "Redis", "Paystack", "Vite"],
    system: [
      {
        layer: "Clients",
        nodes: [
          { name: "Public site", detail: "Courses, venues, trainers, applications" },
          { name: "Admin portal", detail: "Livewire, role and permission gated" },
        ],
      },
      {
        layer: "Application",
        nodes: [
          { name: "Laravel", detail: "Controllers, services, Livewire components" },
          { name: "Queued jobs", detail: "Application document processing" },
        ],
      },
      {
        layer: "Integrations",
        nodes: [
          { name: "Paystack", detail: "Checkout, callback, webhook" },
          { name: "Email", detail: "Applications, invoices, certificates" },
        ],
      },
      {
        layer: "Data",
        nodes: [
          { name: "MySQL", detail: "System of record" },
          { name: "Redis", detail: "Sessions and cache" },
        ],
      },
    ],
    engineering: [
      {
        area: "Application",
        points: [
          "Public catalogue for courses, categories, sectors, venues and trainers, with individual and corporate applications that can carry multiple participants.",
          "Administration portal for courses, schedules, venues, trainers, applications, users, roles and permissions, with reporting dashboards and audit logs.",
        ],
      },
      {
        area: "Authentication and authorization",
        points: [
          "Roles and permissions through Spatie Laravel Permission, with admin routes requiring both authentication and role checks.",
          "TOTP multi-factor authentication for administrators, with the secret stored encrypted.",
          "One active session per user, enforced with a session version that also invalidates other sessions on password change.",
          "Rate-limited login and an activity log of successful sign-ins.",
        ],
      },
      {
        area: "Payments and documents",
        points: [
          "Paystack checkout in USD or KES with callbacks, timing-safe webhook validation and idempotent payment recording.",
          "PDF invoices, brochures, invitation letters, certificates and receipts, plus DOCX forms, generated by a queued job.",
        ],
      },
      {
        area: "Security and delivery",
        points: [
          "HSTS, content-type, frame, referrer and permissions headers on web responses. Secure, HTTP-only, SameSite session cookies in production.",
          "SEO metadata, canonical URLs and hreflang support on public pages.",
          "The production host does not provide Composer, so releases are built locally and uploaded with their dependencies, followed by migrations and config, route and view caching on the server.",
        ],
      },
    ],
    decisions: [
      {
        decision: "Livewire for the admin portal",
        rationale:
          "The portal is form- and table-heavy and used by a small internal team. Server-driven components kept validation and authorization in one place without a separate API and SPA to maintain.",
      },
      {
        decision: "Idempotent payment recording",
        rationale:
          "Payment providers retry webhooks and users refresh callback pages. Recording a payment has to be safe to run more than once.",
      },
      {
        decision: "A deployment process that fits the host",
        rationale:
          "The hosting environment has no Composer and limited shell access, so the release procedure is designed around building locally and applying a short, repeatable set of commands on the server.",
      },
    ],
    outcomes: ["In production at afriasiacareercenter.com."],
    links: [{ label: "Live site", href: "https://afriasiacareercenter.com", kind: "live" }],
    accessNote: "The source repository is private.",
  },
  {
    slug: "muhscience-tech-labs",
    title: "Muhscience Tech Labs Website",
    summary:
      "Company website built with Next.js, React and TypeScript, with server-handled forms, technical SEO and deployment on Vercel.",
    status: "production",
    statusLabel: "Deployed on Vercel · public repository",
    period: "2025 – 2026",
    role: "Front-end and full-stack developer",
    featured: false,
    problem:
      "Muhscience Tech Labs needed a company site covering services, projects, a blog, careers and contact, that loads quickly, ranks for its services and can take enquiries without a separate back end to operate.",
    built:
      "A Next.js App Router application with a typed component library, contact and service-enquiry forms handled on the server, and SEO and security configuration, deployed on Vercel.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "MongoDB", "Vercel"],
    system: [
      { layer: "Hosting", nodes: [{ name: "Vercel", detail: "Builds, CDN, analytics" }] },
      {
        layer: "Application",
        nodes: [
          { name: "App Router pages", detail: "Services, projects, blog, careers, FAQ" },
          { name: "Middleware", detail: "Security headers" },
          { name: "Route handlers", detail: "Contact and enquiry forms" },
        ],
      },
      {
        layer: "Services",
        nodes: [
          { name: "MongoDB", detail: "Mongoose models" },
          { name: "SMTP", detail: "Form notifications" },
        ],
      },
    ],
    engineering: [
      {
        area: "Front-end engineering",
        points: [
          "Next.js App Router with React and strict TypeScript.",
          "Component architecture built on shadcn/ui primitives and Tailwind CSS, with shared layout, navigation and form components.",
          "Responsive layouts across the service, project, blog, careers and FAQ pages.",
        ],
      },
      {
        area: "Forms and data",
        points: [
          "Contact and service-enquiry forms validated on the server and delivered by SMTP.",
          "MongoDB with Mongoose for stored content and submissions.",
        ],
      },
      {
        area: "SEO and performance",
        points: [
          "Generated sitemap and robots rules, structured page metadata and Open Graph tags.",
          "Optimised images and lazy loading, with Vercel Analytics and Speed Insights for measurement.",
        ],
      },
      {
        area: "Security and deployment",
        points: [
          "Security headers applied in middleware, with input validation on form endpoints.",
          "Continuous deployment on Vercel from the repository, with ESLint, Prettier and a type-check step.",
        ],
      },
    ],
    decisions: [
      {
        decision: "Next.js on Vercel rather than a separate front end and API",
        rationale:
          "The site is mostly content with a few server-side form handlers. One deployable with route handlers was enough, and it left no server to patch.",
      },
      {
        decision: "Compose from accessible primitives",
        rationale:
          "Building on shadcn/ui and Radix primitives gave keyboard and focus behaviour for menus and dialogs without writing it from scratch.",
      },
    ],
    outcomes: ["Deployed on Vercel.", "Source is public on GitHub."],
    links: [
      { label: "Live site", href: "https://muhscience-tech-labs-website.vercel.app", kind: "live" },
      { label: "Repository", href: "https://github.com/Alex-Muhscience/Muhscience-Tech-Labs-Website", kind: "repository" },
    ],
  },
  {
    slug: "unified-threat-detection-response",
    title: "Unified Threat Detection & Response System",
    summary:
      "Threat detection and response: every event runs through rule-based, anomaly and ML detectors, and analysts triage the resulting alerts in a web dashboard. Top 5 finalist in the Mozilla Responsible Computing Challenge.",
    status: "research",
    statusLabel: "Research project · open source",
    period: "2025 – 2026",
    role: "Developer",
    featured: false,
    problem:
      "Smaller organisations rarely have a security operations team, yet they face the same threats as larger ones. UTDRS explores how far a single system can go in collecting security events, detecting threats with several complementary methods and presenting alerts an operator can act on, while keeping the AI components explainable and accountable.",
    built:
      "One repository of services: a React and TypeScript dashboard where analysts triage alerts; a FastAPI gateway for authentication and alert, event, asset and rule management, which sends every event to a core detection engine; a data processor; and a device scanner in C. An event posted to the gateway comes back as an alert, linked to the event and mapped to MITRE ATT&CK, within seconds. The project was a Top 5 finalist in the Mozilla Responsible Computing Challenge.",
    stack: ["Python", "FastAPI", "MongoDB", "React", "TypeScript", "C", "Docker"],
    system: [
      { layer: "Interface", nodes: [{ name: "Dashboard", detail: "React, TypeScript; alert triage" }] },
      { layer: "Collection", nodes: [{ name: "Device scanner", detail: "Agents report over TLS" }, { name: "Event intake" }] },
      {
        layer: "API",
        nodes: [{ name: "API gateway", detail: "JWT auth, security headers, request IDs" }],
      },
      {
        layer: "Detection",
        nodes: [
          { name: "Rule engine", detail: "Signatures mapped to MITRE ATT&CK" },
          { name: "Anomaly and ML detection" },
          { name: "Threat-intelligence enrichment" },
        ],
      },
      {
        layer: "Processing and storage",
        nodes: [
          { name: "Data processor", detail: "Batches, retries, dead-letter collection" },
          { name: "MongoDB", detail: "Events, alerts, assets, rules" },
        ],
      },
    ],
    engineering: [
      {
        area: "Detection",
        points: [
          "Layered detection: signature rules, correlation, anomaly detection, behavioural (ML) scoring and threat-intelligence lookups run concurrently, and the most specific verdict becomes the alert.",
          "Detection rules are data, mapped to MITRE ATT&CK techniques, and can be enabled, disabled or run in a testing state.",
        ],
      },
      {
        area: "API and access control",
        points: [
          "API gateway with JWT authentication and bcrypt password hashing; new accounts are analysts and cannot raise their own role.",
          "Request validation, host checks, size limits, security headers and request-ID tracing on every call.",
          "Every stored event is sent to the detection engine in the background, so ingestion never waits on, or fails because of, detection.",
        ],
      },
      {
        area: "Data processing",
        points: [
          "A processor works through events in configurable batches with retries. Documents that fail are written to a dead-letter collection with their error context instead of being dropped or blocking the batch.",
          "Health endpoints expose processing counts and failure metrics.",
        ],
      },
      {
        area: "Responsible AI",
        points: [
          "Built for the Mozilla Responsible Computing Challenge, where it was selected as a Top 5 finalist.",
          "Model-based detections sit alongside rule-based ones, so an alert can be traced to the rule or signal that produced it rather than to an opaque score alone.",
        ],
      },
      {
        area: "Dashboard",
        points: [
          "React 19 and TypeScript, with API types generated from the gateway's OpenAPI schema; CI fails if the two drift apart.",
          "Analysts follow each alert back to the event that raised it and the MITRE ATT&CK techniques it matched, then investigate, assign and resolve it.",
        ],
      },
      {
        area: "Testing and delivery",
        points: [
          "Unit, service and system tests for each component, and Playwright tests that drive the dashboard against the real services.",
          "Every service ships a Docker image that runs as a non-root user; CI tests every component and builds every image on each pull request.",
        ],
      },
    ],
    decisions: [
      {
        decision: "Several detection methods instead of one model",
        rationale:
          "Signatures are precise but miss novel behaviour, and anomaly and ML detection are the reverse. Running them together and correlating the results gives better coverage than tuning any single one.",
      },
      {
        decision: "A gateway in front of the detection engine",
        rationale:
          "Authentication and input validation live in one place, and the engine, an internal service behind a shared secret, only ever sees requests that have already passed them.",
      },
      {
        decision: "Dead-letter failed documents",
        rationale: "One malformed event should not stall the pipeline, but it also should not disappear. Keeping it with its error makes failures inspectable.",
      },
    ],
    outcomes: ["Top 5 finalist, Mozilla Responsible Computing Challenge.", "Source code is public on GitHub in one repository."],
    links: [{ label: "Source code", href: "https://github.com/Alex-Muhscience/UTDRS-Capstone-Project", kind: "repository" }],
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug)
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined,
  }
}
