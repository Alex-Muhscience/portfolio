export interface Platform {
  business: string
  product: string
  since: string
  website: string
  /** Case study slug in src/data/projects.ts, where the engineering detail lives. */
  caseStudy: string
  summary: string
}

export interface ExperienceItem {
  organisation: string
  role: string
  period: string
  location: string
  /** One sentence on the shape of the role, shown above the highlights. */
  context?: string
  highlights: string[]
  /** Scope of responsibility, shown as a compact list. */
  responsibilities?: string[]
  /** Distinct products built or run within this one role. */
  platforms?: Platform[]
}

export const experience: ExperienceItem[] = [
  {
    organisation: "EuroAfrique Corporate Skills and sister companies",
    role: "Full-Stack Developer and Technical Owner",
    period: "Aug 2025 – Present",
    location: "Juja, Kenya",
    context:
      "One ongoing engineering role across three businesses under the same ownership: EuroAfrique Corporate Skills, Chania Publishers and AfriAsia Career Development Center. Each runs on its own platform, and I am the technical owner of all three.",
    highlights: [
      "Take each platform from requirements through architecture, build and launch, then keep it running: maintenance, releases and production support.",
      "Built the payment paths the businesses depend on: M-Pesa and card payments confirmed through signed provider callbacks, with fee calculation, verification and idempotent recording.",
      "Automated enrolment and document work that used to be manual, including invoices, invitation letters and certificates generated off the request path.",
      "Run the infrastructure behind all three: Linux servers, DNS and TLS, Redis and Cloudflare caching, cron and queue processing, and a GitHub Actions pipeline that gates deployment on lint, security audits and tests.",
      "Own security across the platforms: role-based access control, multi-factor authentication for administrators, rate limiting, session hardening and security headers.",
    ],
    responsibilities: [
      "Software architecture",
      "Full-stack development",
      "Application maintenance",
      "Infrastructure",
      "Deployment and CI/CD",
      "Cybersecurity",
      "Automation",
      "Performance",
      "Technical SEO",
      "Production support",
    ],
    platforms: [
      {
        business: "EuroAfrique Corporate Skills",
        product: "Corporate training platform",
        since: "Since Aug 2025",
        website: "https://www.euroafriquecorporateskills.com/",
        caseStudy: "euroafrique",
        summary: "Programme publishing, applications, M-Pesa and card payments, and automated enrolment documents.",
      },
      {
        business: "Chania Publishers",
        product: "Learning management system",
        since: "Since Dec 2025",
        website: "https://chaniapublishers.com/",
        caseStudy: "chania-publishers-lms",
        summary: "Course management, enrolment, verified payments and access-checked video content.",
      },
      {
        business: "AfriAsia Career Development Center",
        product: "Training and booking platform",
        since: "Since Aug 2026",
        website: "https://afriasiacareercenter.com/",
        caseStudy: "afriasia-career-development-center",
        summary: "Public course catalogue and an administration portal with permissions, MFA, payments and generated documents.",
      },
    ],
  },
  {
    organisation: "Secunets Technologies",
    role: "Software Development Intern",
    period: "May 2024 – Aug 2024",
    location: "Kikuyu, Kenya",
    highlights: [
      "Built a Flask password manager using SQLite, AES encryption and PBKDF2 key derivation.",
      "Reviewed web applications for access-control weaknesses and reported the findings.",
      "Contributed to a GSMA SAS-UP compliance audit and provided back-end and security support during the National Research Fund Hackathon.",
    ],
  },
]

export const earlierRoles = [
  {
    role: "Freelance Web Development Tutor",
    company: "Self-employed",
    period: "May 2025 – Aug 2025",
    note: "Project-based mentoring in JavaScript, React, PHP, Laravel, SQL, Git and deployment.",
  },
  {
    role: "Network Technician",
    company: "Gicatech Enterprise Solutions",
    period: "Aug 2024 – Feb 2025",
    note: "Installed and maintained wired and wireless networks, routers and firewalls for business clients.",
  },
] as const
