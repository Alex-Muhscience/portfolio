export type ProjectStatus = "production" | "in-development"

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
      "Multi-tenant business operating system that puts selling, buying, stock, money, people and documents on one governed data model, with a touch-first point of sale that works offline. Load-tested at 10,000 tenants.",
    status: "in-development",
    statusLabel: "In development · private repository",
    period: "2026 – present",
    role: "Architecture and full-stack development",
    featured: true,
    problem:
      "Small and mid-sized organisations tend to run sales, purchasing, stock, finance and people on separate tools. The records disagree with each other, permissions are bolted on per tool, and nobody can reconstruct who changed what. BusinessOS is an attempt to put those workflows on a single transactional model where tenancy, authorization and audit are properties of the platform rather than of each feature.",
    built:
      "A Laravel API organised by business domain, a server-rendered Next.js web application, and a PostgreSQL database with row-level security, running as a containerised stack with queue workers, an outbox publisher, a scheduler and verified backups. Each tenant subscribes to the modules it needs, from CRM, sales, point of sale and finance to payroll, manufacturing, projects and a support desk; screens follow the job, so a cashier lands on a till and an accountant on the books. The first market is Kenya (KES, VAT, statutory payroll returns, M-Pesa). It is an ongoing project and is not publicly deployed.",
    stack: [
      "Laravel 13",
      "PHP 8.5",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL 18",
      "Redis",
      "M-Pesa",
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
        area: "Business modules",
        points: [
          "Invoices, till sales, payroll and stock movements post balanced journal entries; posted entries never change, and monthly account totals keep statements fast after years of trading. Reports include a general ledger with drill-down, a cash flow statement and a VAT return.",
          "Payroll calculates payslips and statutory returns, issues P9 tax deduction cards, and needs a second person to approve and lock each run.",
          "Approvals route by amount, never to the person asking, and escalate when left waiting; scheduled jobs expire quotations, raise preventive maintenance and flag missed support targets and low stock.",
          "Each company gets public pages: careers with applications, support requests, sales enquiries, and documents opened by private link with quotations accepted online.",
        ],
      },
      {
        area: "Point of sale",
        points: [
          "A touch-first checkout lane that keeps selling offline and syncs later, sells weighed items from a scale's label, prints to receipt printers, opens the drawer on cash and requests M-Pesa payment.",
          "Another cashier can take over an open till with their own PIN; receipts carry the company's own layout and logo.",
        ],
      },
      {
        area: "Documents and files",
        points: [
          "Quotations, invoices, credit notes, receipts and payslips are generated from templates built of blocks each company controls, or from its own Word file, and delivered as a page, a PDF or a Word file, emailed from the page they are read on.",
          "Any record can carry files kept in an object store, read in place, with restricted files and an access log; executable files are refused and uploads are scanned where a scanner is configured.",
        ],
      },
      {
        area: "Scale",
        points: [
          "Load-tested with 10,000 tenants on one machine: 600 requests a second at a 54 ms p95 with no errors.",
          "Permission answers are cached per member until the tenant changes, a cache budget keeps the cache from crowding out the queue, and dashboards and module pages run half the queries they did.",
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
      "Nine domain-expert audits and a production-readiness plan guide the remaining work.",
      "Not yet publicly available.",
    ],
    highlights: [
      { value: "10k", label: "tenants load-tested: 600 req/s at a 54 ms p95" },
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
          "Invoices can be issued in KES with matching Paystack KES payment links.",
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
          "Course pages cut by about 60% in HTML size by shipping each session once, with the training-centre list rendered once and the rest sent as JSON.",
          "Country detection, hreflang alternates and per-country metadata for a multi-regional audience; unified title and description generation, complete Course and ItemList structured data, and crawler rules that admit search and AI-search agents while keeping internal and brochure URLs out of the index.",
        ],
      },
      {
        area: "Design",
        points: [
          "Public site and admin panel redesigned around enterprise-style components: flat brand colours instead of gradients, consistent cards, buttons and forms with explicit labels, collapsible training hubs on mobile, and an admin brand theme with real icons and analytics charts.",
        ],
      },
      {
        area: "Access control and security",
        points: [
          "Role-based access control in the admin area, with rate limiting and CSRF protection on forms.",
          "Certificates are served through obfuscated, verified URLs rather than guessable paths.",
          "Dependency advisories are patched as they appear (Symfony, phpseclib and npm packages), and debug endpoints were removed.",
        ],
      },
      {
        area: "Delivery and operations",
        points: [
          "GitHub Actions pipeline: PHP lint, Composer and npm security audits, PHPUnit, an asset build, static analysis and admin security checks. Deployment to the production server over SSH runs only after those pass.",
          "Pull-request branches deploy to a password-protected staging subdomain with its own settings, so staging never loads production configuration.",
          "Deploys detect the server's PHP 8.4 binary, rebuild Laravel's package manifest, clear OPcache, and check for server errors after each production release; visitors' server errors are emailed to the team.",
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
      "Payments, enrolment and document generation that used to be manual now run automatically.",
    ],
    highlights: [
      { value: "Signed", label: "provider callbacks confirm every M-Pesa and card payment" },
      { value: "Queued", label: "enrolment documents generated off the request path" },
      { value: "Gated", label: "deploys run only after lint, audits and tests pass" },
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
      "Enrolment, payment verification and premium content access run without manual intervention.",
    ],
    highlights: [
      { value: "0", label: "manual steps from payment to course access" },
      { value: "Per request", label: "subscription check on every video stream" },
    ],
    links: [{ label: "Live site", href: "https://chaniapublishers.com/", kind: "live" }],
    accessNote: "The source repository is private.",
  },
  {
    slug: "muhos",
    title: "MuhOS",
    summary:
      "Open-source macOS-style desktop for Hyprland on Fedora: a packaged fork of Serpantinum with a GDM session, a one-command installer, managed updates and benchmarked performance.",
    status: "production",
    statusLabel: "Released · open source (AGPL-3.0)",
    period: "2026 – present",
    role: "Fork maintainer: packaging, interface design and QML development",
    featured: true,
    problem:
      "Serpantinum is a capable Quickshell desktop shell for Hyprland, but it installs through a curl-to-bash script that takes over the system's configuration, it bundled fonts that cannot be redistributed, and it depends on versions of Quickshell, Matugen and Hyprland that Fedora does not ship. There was no clean, reversible way to run it on Fedora, and no evidence for how much it cost to run.",
    built:
      "Fedora packaging for the shell and its toolkit, a login session and systemd integration that leave the rest of the system alone, a licence inventory for every bundled asset, a virtual-machine test and benchmark harness, a redesigned macOS-style interface in QML, and an installer and updater that verify every package. Version 0.1.0 installs with one command on Fedora 44 and 45.",
    stack: [
      "QML",
      "Qt 6",
      "Quickshell",
      "Hyprland",
      "Fedora RPM",
      "systemd",
      "GDM",
      "Bash",
      "Python",
      "Podman",
      "QEMU/KVM",
      "GitHub Actions",
    ],
    system: [
      {
        layer: "Login",
        nodes: [
          { name: "GDM", detail: "\"MuhOS (Hyprland)\" session entry" },
          { name: "muhos-session", detail: "Creates per-user config only if missing" },
        ],
      },
      {
        layer: "Session",
        nodes: [
          { name: "Hyprland", detail: "Packaged defaults plus the user's own user.lua" },
          { name: "systemd user units", detail: "Shell bound to the session, restarted on crash" },
        ],
      },
      {
        layer: "Shell",
        nodes: [
          { name: "MuhOS interface", detail: "Menu bar, glass dock, app grid, control centre (QML)" },
          { name: "Serpantinum components", detail: "Launcher, dock, notifications, lock screen" },
        ],
      },
      {
        layer: "System services",
        nodes: [
          { name: "NetworkManager, BlueZ, UPower", detail: "Through Quickshell's service bindings" },
          { name: "PipeWire", detail: "Volume, media and visualizer" },
          { name: "Matugen", detail: "Colour themes from the wallpaper" },
        ],
      },
      {
        layer: "Delivery",
        nodes: [
          { name: "GitHub Releases", detail: "Binary and source RPMs with checksums" },
          { name: "Installer and muhos-update", detail: "Verified downloads; manual, notify or automatic updates" },
          { name: "CI", detail: "Build, install tests, asset licences, lint baseline" },
        ],
      },
    ],
    engineering: [
      {
        area: "Packaging and system integration",
        points: [
          "Installed as RPMs: a one-command installer finds the release built for the Fedora version, checks every package against the release's SHA256SUMS and hands them to dnf. Nothing is written to /usr/local, GDM stays the login manager, and removing the package leaves the system as it was.",
          "Updates are the user's choice: muhos-update by hand, a daily notification from a systemd user timer, or automatic installs from a system timer. Nothing checks for updates in the background unless the user opts in.",
          "Quickshell 0.3.2 and Matugen 4.2 are packaged by the project for Fedora 44 and 45 because Fedora ships older versions; Matugen's Rust dependencies are vendored so it builds offline.",
          "The user's Hyprland configuration is a small stub that loads the packaged defaults and then the user's own file, so package updates improve the defaults without overwriting anyone's changes.",
          "The shell runs as a systemd user service bound to the graphical session and is restarted if it crashes.",
        ],
      },
      {
        area: "Licensing and provenance",
        points: [
          "Every bundled font, sound and image is inventoried with its source and licence; the build fails if any asset is not cleared for redistribution.",
          "Fonts that could not be redistributed were removed, and the public history starts from a clean import so they are not reachable in it.",
          "Upstream is tracked on a vendor branch; every commit is labelled as general, Fedora-specific, branding or fork maintenance, and the AGPL change notice is generated from those labels.",
        ],
      },
      {
        area: "Interface",
        points: [
          "A menu bar and control centre rebuilt in QML: GNOME's layout and pill toggles, a transparent macOS-style bar, glass panels blurred by the compositor, and Adwaita icons.",
          "The bar's text colour follows the brightness of the wallpaper under it, measured once per wallpaper change for each screen.",
          "Popups open through an in-process call instead of a shell script that started a second Quickshell process for every click, which took 0.12–0.29 s in the test VM.",
          "A macOS-style glass material across the shell: a glass dock, a Spotlight-style launcher, notification banners with a notification centre, an on-screen indicator and a glass lock screen.",
          "A sound window opened from the control centre's volume slider, with its own app entry, and macOS-style close buttons shared across windows.",
          "Design directions were compared as interactive mock-ups before any QML was written.",
        ],
      },
      {
        area: "Testing on real hardware",
        points: [
          "Daily use on a 4K laptop with Intel and NVIDIA graphics found what the virtual machines could not: text a quarter of its size until screens were scaled automatically, and a logout that left a black screen because the logout script ran inside the shell's own systemd service and was stopped with it.",
          "Windows that seemed frozen were traced through Hyprland's event log to its maximize, a kind of full screen that stays above every other window. Zoom is now handled in the compositor's Lua configuration as an ordinary window filling the screen, as on macOS.",
          "Window management was rebuilt to match macOS: click to focus, Super+Tab switching, cascading new windows, and minimize through a hidden workspace because Hyprland ignores apps' own minimize requests.",
        ],
      },
      {
        area: "Testing and measurement",
        points: [
          "A harness builds Fedora 44 and 45 virtual machines with the package installed, logs in through GDM and checks the session: Hyprland running, the shell active under systemd, no restarts, no changes to existing configuration.",
          "Benchmarks run 5 times per scenario on a fresh disk overlay, with a warm-up and a measured window, and report medians with ranges.",
          "GitHub Actions builds the RPM for Fedora 44 and 45, runs 74 package checks on each, checks asset licences and fails if shellcheck or qmllint findings grow.",
        ],
      },
    ],
    decisions: [
      {
        decision: "Fork and package rather than rewrite",
        rationale:
          "Serpantinum already does most of what a desktop needs. Keeping its components, rebuilding only the parts the design required, and labelling every change keeps the fork maintainable and lets fixes flow back upstream.",
      },
      {
        decision: "A login session and packages, not a script that takes over the system",
        rationale:
          "Choosing \"MuhOS (Hyprland)\" at login, with the package owning only its own files, makes the desktop something you can try and remove without risk to the rest of the system. The one-command installer only downloads, verifies and hands packages to dnf.",
      },
      {
        decision: "No performance claim without a benchmark",
        rationale:
          "Every number in the project's documentation comes from the VM protocol, including the bad ones: a growth in Hyprland's memory found that way is published as a known issue rather than left out.",
      },
    ],
    outcomes: [
      "Version 0.1.0 released after nine pre-releases, for Fedora 44 and 45, with binary and source RPMs and open issues inviting collaborators.",
      "Full GDM login sessions work in Fedora 44 and 45 virtual machines, and it is in daily use on a 4K laptop with Intel and NVIDIA graphics.",
      "Measured in a VM: idle shell CPU fell from 0.62% to 0.07% of a core, and the first-run screen from 130% to 0.5%. Hyprland's memory grew by about 28 MiB, which is being investigated.",
      "The glass design was benchmarked against the release before it with no measurable change in idle cost.",
    ],
    highlights: [
      { value: "~9×", label: "less idle shell CPU, measured in a VM" },
      { value: "74", label: "package checks in CI on Fedora 44 and 45" },
      { value: "1", label: "command to install; updates verified the same way" },
    ],
    links: [
      { label: "Website", href: "https://alex-muhscience.github.io/MuhOS/", kind: "live" },
      { label: "Repository", href: "https://github.com/Alex-Muhscience/MuhOS", kind: "repository" },
      { label: "Releases", href: "https://github.com/Alex-Muhscience/MuhOS/releases", kind: "live" },
    ],
  },
  {
    slug: "secure-file-sharing",
    title: "Secure File Sharing Platform",
    summary:
      "Encrypted file sharing for teams: resumable uploads encrypted chunk by chunk, malware scanning before release, workspace roles, verified recipients and measured lossless compression.",
    status: "in-development",
    statusLabel: "In development · private repository",
    period: "2024 – present",
    role: "Architecture and full-stack development",
    featured: false,
    problem:
      "Contracts, financial records, research data and design files are often too large or too sensitive for email attachments, and an attachment is out of the sender's control the moment it leaves. Teams need to send large files that are encrypted at rest, scanned before anyone can open them, limited to the people meant to receive them, revocable at any time, and provably intact on arrival.",
    built:
      "A Node.js and Express application on MongoDB with private filesystem or S3-compatible storage, running as a Docker Compose stack with a background worker, ClamAV scanning and a local mail server. Files upload in resumable encrypted chunks, are quarantined until scanned, and reach recipients who verify their email before downloading. I started it as a prototype in December 2024 and resumed it in October 2026 with a full rebuild. Version 0.6.0 is a local pilot release, not yet a production service.",
    stack: ["Node.js", "Express", "JavaScript", "MongoDB", "S3", "ClamAV", "libsodium", "Docker", "Stripe", "M-Pesa", "Playwright", "GitHub Actions"],
    system: [
      { layer: "Client", nodes: [{ name: "Browser app", detail: "Resumable uploads, compression in a Web Worker" }] },
      {
        layer: "API",
        nodes: [{ name: "Express API", detail: "Email sign-in, workspace roles, range downloads, one-use download tickets" }],
      },
      {
        layer: "Background",
        nodes: [
          { name: "Worker", detail: "Scan queue with leases and retries, notifications, deletion" },
          { name: "ClamAV", detail: "Streamed scanning, fail-closed quarantine" },
          { name: "Mail", detail: "Sign-in codes and notifications" },
        ],
      },
      {
        layer: "Data",
        nodes: [
          { name: "MongoDB", detail: "Users, workspaces, transfers, audit" },
          { name: "Object storage", detail: "Filesystem or S3; ciphertext only" },
        ],
      },
      {
        layer: "Operations",
        nodes: [
          { name: "Encrypted snapshots", detail: "Streaming backup and restore" },
          { name: "Key rotation", detail: "Data keys rewrapped in place" },
          { name: "Storage migration", detail: "Filesystem to S3, verified and reversible" },
        ],
      },
    ],
    engineering: [
      {
        area: "Encryption and integrity",
        points: [
          "Each file gets its own random data key, wrapped by a server keyring. Every chunk is sealed with AES-256-GCM and authenticated before any of its plaintext is released.",
          "A keyed manifest binds the complete, ordered set of chunks, so a missing, reordered or tampered chunk fails the download instead of producing a corrupted file.",
          "Encryption is server-managed, not end to end: authorised operators can decrypt. The product documentation says so plainly.",
        ],
      },
      {
        area: "Uploads and downloads",
        points: [
          "Resumable uploads in 8–16 MiB chunks with persisted offsets and a SHA-256 per chunk; an interrupted upload continues from the last verified chunk.",
          "Authenticated byte-range downloads stream from storage, so a large file never has to sit whole in server or page memory.",
          "A browser download exchanges a one-use, 60-second ticket for a file-scoped HttpOnly cookie that cannot call any other API. Expiry, revocation and current membership are rechecked while the file streams.",
        ],
      },
      {
        area: "Access control",
        points: [
          "Email one-time codes that expire after ten minutes, allow five attempts and work once. Session tokens are hashed at rest, last an hour and are held only in browser memory.",
          "Workspace roles: owners and admins manage transfers and members, members manage their own files, viewers cannot upload or revoke. Removing a member also invalidates the recipient grants they issued.",
          "Platform operators are a separate, explicitly configured allowlist, and platform access never grants access to file contents.",
        ],
      },
      {
        area: "Malware scanning",
        points: [
          "Every completed upload is quarantined and streamed through ClamAV before release. If the scanner is unavailable the file stays quarantined.",
          "Scan jobs run on the worker with leases, heartbeats, retries and backpressure, so a crashed or stalled scan is picked up again rather than lost.",
        ],
      },
      {
        area: "Compression",
        points: [
          "Chunks can be compressed in a browser Web Worker before upload, choosing per chunk between Brotli, Zstandard and a predictive bit-packing codec I wrote, and only then encrypted.",
          "A documented single-file archive format with full SHA-256 verification, restorable in the app or offline from the command line. Decompression limits stop compression bombs.",
          "Every result is measured per file against a 75% reduction target and reported as met or not met. Already-compressed media can grow, so no ratio is promised.",
        ],
      },
      {
        area: "Billing",
        points: [
          "Stripe subscriptions and prepaid terms, and M-Pesa prepaid renewals, with idempotent orders. A provider callback is treated as a hint: access changes only after the payment is verified with the provider.",
          "Checkout ships switched off until prices, currency and merchant accounts are configured.",
        ],
      },
      {
        area: "Storage and recovery",
        points: [
          "Ciphertext lives in a private filesystem volume or S3-compatible storage, with verified, reversible migration between the two.",
          "Streaming encrypted snapshots (XChaCha20-Poly1305), key rotation by rewrapping data keys, and restore into a fresh database and an empty storage target.",
        ],
      },
      {
        area: "Testing and delivery",
        points: [
          "Unit and integration tests run against real MongoDB and S3 storage; browser tests drive packaged Docker images with real ClamAV, using the EICAR test file, and a real mail server, in both storage modes.",
          "Interface checks cover keyboard focus, 200% text, reduced motion and automated accessibility rules.",
          "GitHub Actions runs all of it, plus secret scanning and a dependency audit, on every change.",
        ],
      },
    ],
    decisions: [
      {
        decision: "Encrypt per chunk, then bind the chunks with a manifest",
        rationale:
          "Resumable uploads and range downloads need chunks that can be handled independently. Per-chunk authentication alone would still let chunks be dropped or reordered, so a keyed manifest over the whole sequence closes that gap.",
      },
      {
        decision: "Compress in the browser, before encryption",
        rationale:
          "Encrypted data does not compress, so compression has to come first. Doing it in a Web Worker cuts the bytes uploaded without blocking the page, and measuring each file keeps the claims honest when media will not shrink.",
      },
      {
        decision: "Fail closed on scanning",
        rationale: "If the scanner is down, files wait in quarantine. Releasing unscanned files to keep transfers moving would defeat the point of scanning.",
      },
      {
        decision: "Publish the limits alongside the features",
        rationale:
          "Encryption and compression claims invite scrutiny. The documentation states that encryption is server-managed, that the 5 TiB size ceiling is a configuration limit rather than a demonstrated transfer, and that benchmarks use synthetic data.",
      },
    ],
    outcomes: [
      "Version 0.6.0 runs as a local pilot: encrypted transfers, workspaces, scanning, compression, billing in test mode and recovery work end to end in CI.",
      "On a deliberately repetitive 1 GiB test file, stored size fell by 75% and the download matched byte for byte, with peak memory around 180 MiB.",
      "Not yet in production: managed key storage, production infrastructure and an independent security review come first.",
    ],
    highlights: [
      { value: "AES-256-GCM", label: "per chunk, with a keyed manifest over the whole file" },
      { value: "Fail closed", label: "every upload quarantined until ClamAV clears it" },
      { value: "~180 MiB", label: "peak memory moving a 1 GiB file" },
    ],
    links: [],
    accessNote: "The repository is private. I am happy to walk through the architecture and code in a conversation.",
  },
  {
    slug: "chania-finance-consultancy",
    title: "Chania Finance Consultancy",
    summary:
      "Finance-training platform where clients search the catalogue, pick a venue and a start week on a calendar and register a team in minutes, with admin and trainer portals behind it.",
    status: "production",
    statusLabel: "In production",
    period: "2026 – present",
    role: "Full-stack developer and sole technical owner",
    featured: false,
    problem:
      "A professional finance-training provider needed one system for the whole training cycle. Clients had to find the right course among a growing catalogue, see dates a year ahead, book individuals or corporate teams and receive an invoice they could pass to their employer. Staff needed sessions, fees, registrations, documents, certificates and trainers in one place, with nothing slipping through the cracks.",
    built:
      "A Laravel 12 application with Livewire booking and registration components, a role-gated admin portal and a trainer portal. Every course runs at every venue, so sessions belong to venues and follow a strict Monday-to-Friday rule, and fees depend on venue and course length. The catalogue is designed to stay fast at tens of thousands of courses.",
    stack: ["Laravel 12", "PHP 8.2", "Livewire 4", "Alpine.js", "Tailwind CSS", "MySQL / MariaDB", "DomPDF", "Paystack", "Spatie Permission", "Vite"],
    system: [
      {
        layer: "Clients",
        nodes: [
          { name: "Public site", detail: "Search, course pages, three-step booking, registration modal" },
          { name: "Admin portal", detail: "Role-gated, with notification counters" },
          { name: "Trainer portal", detail: "Session requests by category" },
        ],
      },
      {
        layer: "Application",
        nodes: [
          { name: "Laravel", detail: "Controllers, services, Livewire components" },
          { name: "Course search", detail: "FULLTEXT ranking, synonyms, capped suggestions" },
          { name: "Scheduler", detail: "Expires sessions at 00:01 on their start date" },
        ],
      },
      {
        layer: "Background",
        nodes: [
          { name: "Queued jobs", detail: "Invoices, invitation letters, brochures, emails" },
          { name: "Notifications", detail: "Trainer invitations and request decisions" },
        ],
      },
      {
        layer: "Integrations and data",
        nodes: [
          { name: "Paystack", detail: "Invoice payment and webhook" },
          { name: "MySQL / MariaDB", detail: "System of record, indexed for every list and filter" },
        ],
      },
    ],
    engineering: [
      {
        area: "Booking that fits the business",
        points: [
          "Three-step booking box on each course page: in person (default), online or in-house, then a venue with its fee, then a start week on a twelve-month calendar drawn in the browser so changing month costs no request.",
          "Sessions belong to venues and every course can run in any session of its length. The model refuses any session that does not start on a Monday and end on a Friday, and 10-day sessions span two working weeks.",
          "Fees are set per venue and per course length, and one calculation feeds the course page, registration modal, invoice and brochure so the numbers can't disagree.",
          "Sessions disappear from the site at midnight and are marked expired at 00:01 on their start date in the business timezone, so nobody can register on the morning training starts. Clients can change their dates during registration without starting over.",
        ],
      },
      {
        area: "Performance at catalogue scale",
        points: [
          "Course search uses a MySQL FULLTEXT index with prefix matching, a synonym table for finance abbreviations and a ranking that prefers name matches. Suggestions are capped and result pages are paginated, so the cost doesn't grow with the catalogue.",
          "Lazy loading is disabled outside production, and a test renders every main page against the full demo data and fails on N+1 queries or more than 60 queries per page.",
          "Composite indexes on the status, date and foreign-key filters the admin lists actually use.",
        ],
      },
      {
        area: "Operations for a small team",
        points: [
          "Admin notification counters: unread registrations and new support messages in red, items awaiting a decision in orange, all read in a single indexed query, with a count in the browser tab that refreshes every minute.",
          "Bulk session builder with a live preview: venues, length, period and frequency, skipping weeks that already have a session.",
          "Optimistic locking on courses and content, so several admins can edit at once without silently overwriting each other.",
          "Branded A4 PDFs for brochures, invoices (organisation-sponsored by default, due on the first training day), invitation letters and certificates, generated by queued jobs.",
          "Guarded bulk actions and CSV exports of selected records in the admin area.",
        ],
      },
      {
        area: "Running on shared hosting",
        points: [
          "Background jobs without a resident worker: a cron-driven queue runner with a database lock, a time budget and heartbeats, and a doctor command that checks PHP, configuration, mailbox logins, cron heartbeats and failed jobs.",
          "The dashboard warns when cron or the queue stops, and failed-job alerts fall back to a monitored mailbox.",
          "Registration emails reach admins first, in the same job, with every document attached; a retry only resends the emails that failed. Every email shares one branded, mobile-friendly theme.",
          "Redis over a Unix socket through Predis, and .htaccess rules that block Laravel's private files when the app sits in public_html.",
        ],
      },
      {
        area: "Access and security",
        points: [
          "Spatie roles for six admin roles plus trainers, with no public sign-up. Single-session login, account lockout, password expiry and an audit log.",
          "Trainers apply with up to five categories. Once approved, they only see paid sessions in their own categories, and an admin confirms one trainer per session.",
          "Support tickets are reached through unguessable private links rather than guessable ticket numbers.",
        ],
      },
    ],
    decisions: [
      {
        decision: "Sessions belong to venues, not courses",
        rationale:
          "Every course is available at every venue all year. Tying sessions to courses would have multiplied the schedule by the size of the catalogue. Venue-owned sessions keep the admin work constant as courses are added.",
      },
      {
        decision: "Enforce the Monday-to-Friday rule in the model",
        rationale:
          "Forms, the bulk builder and imports all create sessions. Putting the rule in one place on save means no path can create a session the business can't run.",
      },
      {
        decision: "Make performance a failing test",
        rationale:
          "A page that runs one query per row looks fine on demo data and fails in production. Rendering every page under a query budget in the test suite catches it before release.",
      },
      {
        decision: "Shared read state for registrations",
        rationale:
          "A small team works one inbox. Marking a registration read when anyone opens it stops two people picking up the same client, and \"mark as unread\" covers the case where it needs a second look.",
      },
    ],
    outcomes: [
      "In production at chaniafinanceconsultancy.com.",
      "Booking, billing, documents, trainers and content shipped with 140+ feature tests passing.",
    ],
    highlights: [
      { value: "3 steps", label: "from course page to a booked start week" },
      { value: "1 query", label: "for every admin notification counter" },
      { value: "140+", label: "feature tests, including an N+1 query budget" },
    ],
    links: [{ label: "Live site", href: "https://chaniafinanceconsultancy.com/", kind: "live" }],
    accessNote: "The source repository is private.",
  },
  {
    slug: "afriasia-career-development-center",
    title: "AfriAsia Career Development Center",
    summary:
      "Training, booking and document-management platform: a public catalogue of 17,000+ courses across 16 cities, booking for individuals and teams, and an administration portal.",
    status: "production",
    statusLabel: "In production",
    period: "2026 – present",
    role: "Full-stack developer and sole technical owner",
    featured: false,
    problem:
      "A sister company to EuroAfrique needed its own platform for executive training: public course discovery and applications for individuals and corporate groups, and an operations portal covering programmes, schedules, delegates, venues, payments, invoices and certificates. It also needed its own identity, distinct from the sister brands, and releases that did not depend on manual uploads to a shared host.",
    built:
      "A Laravel 13 application with a Livewire administration portal, Paystack payments, generated documents with an approval workflow for certificates, and a permission model, tested and released through GitHub Actions to a staging site and then to production.",
    stack: ["Laravel 13", "PHP 8.4", "Livewire 4", "Alpine.js", "Tailwind CSS", "MySQL", "Redis", "Paystack", "Vite", "GitHub Actions", "Cloudflare"],
    system: [
      {
        layer: "Clients",
        nodes: [
          { name: "Public site", detail: "Courses, training centres, booking, enquiries" },
          { name: "Admin portal", detail: "Livewire, role and permission gated, TOTP MFA" },
          { name: "Certificate check", detail: "Public lookup by number or QR code" },
        ],
      },
      {
        layer: "Edge",
        nodes: [
          { name: "Cloudflare", detail: "WAF rules, static-asset caching" },
        ],
      },
      {
        layer: "Application",
        nodes: [
          { name: "Laravel", detail: "Controllers, services, Livewire components" },
          { name: "Queued jobs", detail: "Documents and SEO generation" },
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
      {
        layer: "Delivery",
        nodes: [
          { name: "GitHub Actions", detail: "88 feature tests, build, release archive over SSH" },
          { name: "Staging", detail: "Own database, never indexed" },
        ],
      },
    ],
    engineering: [
      {
        area: "Application",
        points: [
          "Public catalogue for courses, categories, sectors, topics and training centres, with individual and team bookings that can carry multiple participants.",
          "A dates picker where every course runs in every city on the same dates: centres ordered by region with country flags, fees per centre, and booking or WhatsApp enquiry per date.",
          "Administration portal for courses, schedules, training centres, trainers, applications, users, roles and permissions, with a dashboard of key figures and a work queue of items that need attention, reports and audit logs.",
          "A certificate desk with an approval workflow: issue as pending, approve once both official signatures are uploaded, revoke with a reason shown to anyone who checks it. Each certificate carries a QR code to a public check page.",
          "A system monitor with thirteen health checks (database, Redis, queue, scheduler heartbeat, pending migrations, disk, OPcache and more), recent log entries read from the end of the log, and a cache refresh that is safe on a Redis shared with another site.",
        ],
      },
      {
        area: "Design and documents",
        points: [
          "A design system built for the brand: shared buttons, cards and page heroes, one call-to-action colour, black-on-white text and no gradients, applied across every page through shared tokens.",
          "Course brochures generated as PDFs with running headers and page numbers, an enrolment guide and a QR code to the course page, with no dates or cities so a shared copy never goes out of date. Certificates are one landscape page with two uploaded signatures and a verification QR code; invoices and invitation letters share the same document style.",
        ],
      },
      {
        area: "Authentication and authorization",
        points: [
          "Roles and permissions through Spatie Laravel Permission, with admin routes requiring both authentication and role checks.",
          "TOTP multi-factor authentication for administrators, with the secret stored encrypted. The setup page never shows a secret once MFA is on, and five wrong codes sign the user out; both found and fixed during a review, with tests.",
          "One active session per user, enforced with a session version that also invalidates other sessions on password change.",
          "Rate-limited login and an activity log of successful sign-ins.",
        ],
      },
      {
        area: "Payments",
        points: [
          "Paystack checkout in USD or KES with callbacks, timing-safe webhook validation and idempotent payment recording.",
          "Invoices carry the card payment link; payment is due before the course starts, by card or bank transfer.",
        ],
      },
      {
        area: "Performance and search",
        points: [
          "Cloudflare caches static assets; menu, footer and homepage data are cached in Redis, taking a course page from 31 to 17 database queries.",
          "Front-end JavaScript cut from 164 KB to about 1.5 KB by replacing an animation library with a small scroll reveal that never hides content on load.",
          "Structured data, canonical URLs, generated meta descriptions, topic hubs and indexable training-centre pages.",
        ],
      },
      {
        area: "Security and delivery",
        points: [
          "Releases are built in GitHub Actions (Composer packages and Vite assets) and shipped to a cPanel host over SSH as one archive, so the server needs neither git nor Composer.",
          "Every change lands on a staging site with its own database first, kept out of search with noindex headers, then fast-forwards to production.",
          "Deploys pick the host's PHP 8.4 binary, keep cPanel's PHP handler across releases, rebuild Laravel's caches and reset OPcache through a one-time loopback script. Production migrations are run by hand.",
          "Client documents are private: invoices, invitation letters and certificates are rendered on request and never stored where a URL could reach them, and booking, invoice and form links are signed, replacing guessable ids and timestamps.",
          "Honeypot fields and per-visitor rate limits on public forms, Cloudflare WAF rules, HSTS and security headers, and dependency audits kept clean.",
          "Upgraded from Laravel 12 to 13 (Symfony 8, PHPUnit 12) on staging first, checked against the upgrade guide, with the full test suite passing before production.",
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
        decision: "Build in CI, ship one archive",
        rationale:
          "The host has no Composer and limited shell access. Building the release in GitHub Actions and unpacking a single archive keeps deploys repeatable; staging catches problems before production, and migrations against live data stay a deliberate manual step.",
      },
      {
        decision: "Signed links instead of secret-looking ids",
        rationale:
          "Booking numbers and invoice ids were easy to guess. Signing the links (over the path only, so they work on www, staging and behind Cloudflare) closed that without a database change, and old links show a helpful page instead of an error.",
      },
      {
        decision: "Keep existing token names when changing the palette",
        rationale:
          "Thousands of class names used the old colour tokens. Remapping the tokens to the new palette restyled every page at once, and new shared components carried the rest.",
      },
    ],
    outcomes: [
      "In production at www.afriasiacareercenter.com, with a staging site for every change.",
      "Deploys run automatically from GitHub Actions after the test suite passes; production stays on the version proven on staging.",
      "On Laravel 13, with certificates, client documents and administrator sign-in hardened in a security review.",
    ],
    links: [{ label: "Live site", href: "https://www.afriasiacareercenter.com", kind: "live" }],
    accessNote: "The source repository is private.",
  },
  {
    slug: "muhscience-tech-labs",
    title: "Muhscience Tech Labs Website",
    summary:
      "Company website rebuilt on Next.js 16: honest content, an enquiry form that delivers by email, technical SEO, and deployment on Vercel.",
    status: "production",
    statusLabel: "Deployed on Vercel · public repository",
    period: "2025 – 2026",
    role: "Front-end and full-stack developer",
    featured: false,
    problem:
      "Muhscience Tech Labs needed a company site covering its services, work and contact that loads quickly, ranks for its services and takes enquiries without a back end to operate. The first version wrote enquiries to a database that did not exist on Vercel, so every submission failed, and it carried claims that could not be verified.",
    built:
      "A Next.js App Router site with Home, Services (with starting prices), Work, About, FAQ, Contact, Privacy, Terms and Security pages, a contact form validated on the server and delivered by SMTP, and canonical SEO configuration, deployed on Vercel. Removed pages redirect permanently.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Zod", "Nodemailer", "Vercel"],
    system: [
      { layer: "Hosting", nodes: [{ name: "Vercel", detail: "Builds, CDN, analytics, Speed Insights" }] },
      {
        layer: "Application",
        nodes: [
          { name: "App Router pages", detail: "Services, work, about, FAQ, contact, policies" },
          { name: "Route handler", detail: "Contact form, validated with Zod" },
        ],
      },
      {
        layer: "Services",
        nodes: [{ name: "SMTP", detail: "Enquiries delivered by email" }],
      },
    ],
    engineering: [
      {
        area: "Content and design",
        points: [
          "Rewritten so every statement can be backed up: unverifiable client counts, certifications, team size and invented projects and people were removed.",
          "Design shared with my portfolio, responsive across every page, with generated icons and Open Graph images.",
        ],
      },
      {
        area: "Contact form",
        points: [
          "The form posts to a route handler that validates input with Zod and sends the enquiry by SMTP through Nodemailer.",
          "If mail is not configured, the form offers to send the message by email or WhatsApp instead of losing it.",
        ],
      },
      {
        area: "SEO and performance",
        points: [
          "Generated sitemap and robots rules on the canonical address instead of per-deployment URLs, page metadata and Open Graph tags.",
          "Vercel Analytics and Speed Insights for measurement.",
        ],
      },
      {
        area: "Security and deployment",
        points: [
          "Upgraded from Next.js 15 to 16, clearing two critical remote-code-execution advisories and taking known vulnerabilities from 67 to 0; the environment file is no longer tracked.",
          "Continuous deployment on Vercel from the repository, with lint, type-check and build passing before merge.",
        ],
      },
    ],
    decisions: [
      {
        decision: "Next.js on Vercel rather than a separate front end and API",
        rationale:
          "The site is mostly content with one server-side form handler. One deployable with a route handler was enough, and it left no server to patch.",
      },
      {
        decision: "Email instead of a database for enquiries",
        rationale:
          "The site only needs enquiries to reach a person. Sending them by email removed a database that the hosting did not provide and that had been failing every submission.",
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
      "Threat detection and response for organisations without a security team: events from devices, Microsoft 365 and Google Workspace run through rule-based, correlation, anomaly and ML detectors, and analysts work the results as cases. Top 5 finalist in the Mozilla Responsible Computing Challenge.",
    status: "production",
    statusLabel: "Live on Vercel and Render · private repository",
    period: "2025 – present",
    role: "Developer",
    featured: false,
    problem:
      "Smaller organisations rarely have a security operations team, yet they face the same threats as larger ones. UTDRS explores how far a single system can go in collecting security events, detecting threats with several complementary methods and presenting alerts an operator can act on, while keeping the AI components explainable and accountable.",
    built:
      "One repository of services: a React and TypeScript dashboard where analysts triage alerts and work cases; a FastAPI gateway for authentication, tenancy and every API, which sends each event through a durable queue to a core detection engine; separate analysis workers fed by Redis Streams; an MCP server so AI assistants can investigate through the API; a data processor; and a device scanner in C over mutual TLS. Platform operators have their own console, apart from every organisation. The dashboard is deployed on Vercel, the services run as Docker containers on Render, and the data lives in MongoDB Atlas. It began as a capstone project, a Top 5 finalist in the Mozilla Responsible Computing Challenge, and is being built into a commercial product.",
    stack: ["Python", "FastAPI", "MongoDB", "Redis Streams", "React", "TypeScript", "C", "OpenSSL", "MCP", "Docker", "Render", "Vercel", "Playwright"],
    system: [
      { layer: "Interface", nodes: [{ name: "Dashboard", detail: "React, TypeScript; alerts, cases, response" }, { name: "Operator console", detail: "Separate app for platform operators" }] },
      {
        layer: "Collection",
        nodes: [
          { name: "Device scanner", detail: "C agents over mutual TLS" },
          { name: "Connectors", detail: "Microsoft 365, Google Workspace, Exchange" },
          { name: "Ingestion API", detail: "Batches, idempotency keys, gzip" },
        ],
      },
      {
        layer: "API",
        nodes: [
          { name: "API gateway", detail: "Sessions, MFA, passkeys, SSO, SCIM, API keys" },
          { name: "MCP server", detail: "AI assistants act through the API" },
        ],
      },
      {
        layer: "Detection",
        nodes: [
          { name: "Durable analysis queue", detail: "Retries and replay; workers on Redis Streams" },
          { name: "Six detectors", detail: "Rules, correlation, anomaly, ML, threat intelligence" },
        ],
      },
      {
        layer: "Response",
        nodes: [
          { name: "Cases and playbooks", detail: "Actions with approvals" },
          { name: "Notifications", detail: "Email, Slack, Teams, signed webhooks" },
        ],
      },
      {
        layer: "Storage and operations",
        nodes: [
          { name: "MongoDB", detail: "One database per service, data kept apart per organisation" },
          { name: "Backups", detail: "Daily, encrypted, off-site, restore-tested" },
        ],
      },
    ],
    engineering: [
      {
        area: "Detection",
        points: [
          "Layered detection: signature rules, correlation, anomaly detection, behavioural (ML) scoring and threat-intelligence lookups run concurrently, and the most specific verdict becomes the alert.",
          "Detection rules are data, mapped to MITRE ATT&CK techniques, versioned, with test cases checked on every save and counting conditions over time windows.",
          "Sign-in correlation catches impossible travel, password spraying and MFA fatigue; analysts' verdicts and suppressions tune noisy detectors.",
          "The capstone's phishing and network-flow models were retrained from public datasets and run inside the engine.",
        ],
      },
      {
        area: "Investigation and response",
        points: [
          "Related alerts are grouped into cases with notes and attachments; response actions and playbooks run with approvals.",
          "Connectors for Microsoft 365 (sign-ins, audit logs, Defender alerts), Exchange mailbox audit, Google Workspace and phishing checks from the recipient's mailbox.",
          "Alerts and decisions reach teams by email, Slack and Microsoft Teams, and other systems through signed, retried webhooks with a delivery log.",
          "An MCP server lets AI assistants investigate and act through the same API, with a scoped API key.",
          "A monthly executive report, on the web and as a PDF.",
        ],
      },
      {
        area: "Identity, tenancy and access",
        points: [
          "Each organisation's data is kept apart in the gateway and the engine; managed service providers work across their clients, and can limit staff to assigned clients.",
          "Sessions with refresh tokens, revocation and idle and absolute limits; authenticator MFA enforceable per organisation, passkeys, and single sign-on through OpenID Connect and SAML 2.0.",
          "SCIM provisioning lets identity providers manage accounts, with groups mapped to roles; organisations define their own roles from per-area permissions.",
          "Platform operators sign in to a separate console with their own accounts, always with an authenticator, using tokens that only work on the platform API.",
          "API keys with scopes and a tamper-evident audit log that can be exported and checked outside UTDRS.",
          "API gateway with bcrypt password hashing; new accounts are analysts and cannot raise their own role.",
          "Request validation, host checks, size limits, security headers and request-ID tracing on every call.",
          "Every stored event is sent to the detection engine in the background, so ingestion never waits on, or fails because of, detection.",
        ],
      },
      {
        area: "Data processing and operations",
        points: [
          "Every event goes through a durable analysis queue with retries and replay; analysis scales out to dedicated workers fed by Redis Streams.",
          "The ingestion API takes batches, external ids, idempotency keys and gzip bodies.",
          "A processor delivers scanner data in batches with retries; documents that fail go to a dead-letter collection with their error context.",
          "Metrics, readiness checks, heartbeats and health alerts; automatic backups, restore-tested, plus daily encrypted off-site copies to S3, R2 or B2.",
          "Per-organisation data retention, and erasure of a person's personal data on request.",
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
    outcomes: [
      "Top 5 finalist, Mozilla Responsible Computing Challenge.",
      "Live: the dashboard on Vercel, the API gateway and detection engine on Render, backed by MongoDB Atlas.",
      "Being developed into a commercial product: tenancy, single sign-on, SCIM, managed-service-provider accounts and off-site backups are in place.",
    ],
    links: [{ label: "Live dashboard", href: "https://utdrs-capstone-project.vercel.app", kind: "live" }],
    accessNote: "The repository is private. I am happy to walk through the architecture and code in a conversation.",
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
