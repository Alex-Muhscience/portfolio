import { Building2, TrendingUp, Code2, Server } from "lucide-react"
import type { ExperienceItem } from "@/types/experience"

export const experiences: ExperienceItem[] = [
  {
    id: "afriasia-career-center",
    company: "AfriAsia Career Development Center",
    role: "Full-Stack Developer",
    duration: "08/2026 - Present",
    location: "Juja, Kenya",
    website: "https://afriasiacareercenter.com/",
    isCurrent: true,
    group: "EuroAfrique Corporate Skills sister companies",
    impact: [
      "Built and launched a premium-client career development website as a sister-company platform to EuroAfrique Corporate Skills",
      "Adapted reusable full-stack patterns into a focused digital experience for premium career development services",
      "Handled responsive implementation, structured content, production deployment, and search-ready page architecture"
    ],
    systems: ["Premium Career Development Website", "Structured Content Platform", "Production Deployment"],
    technologies: ["Laravel", "PHP", "JavaScript", "MySQL", "Cloudflare", "GitHub Actions"],
    outcomes: ["Built in August 2026", "Live at afriasiacareercenter.com", "Premium-client experience launched"],
    icon: Code2,
    accentColor: "from-amber-500 to-orange-500"
  },
  {
    id: "chania-publishers",
    company: "Chania Publishers Limited",
    role: "Full-Stack Developer (Sole Technical Owner)",
    duration: "12/2025 - Present",
    location: "Juja, Kenya",
    website: "https://chaniapublishers.com/",
    isCurrent: true,
    group: "EuroAfrique Corporate Skills sister companies",
    impact: [
      "Designed, developed, and maintain a Laravel corporate training platform for an alumni network of 25,000+ professionals across 50+ countries",
      "Built MySQL schemas, RESTful services, M-Pesa and card payment workflows, webhooks, fee calculations, and payment verification",
      "Configured Redis, Cloudflare edge caching, GitHub Actions, Linux VPS deployments, cron jobs, and queue workers",
      "Reduced average latency by approximately 35% and manual operational work by approximately 60%"
    ],
    systems: [
      "Corporate Training Platform",
      "Payment and Enrolment Workflows",
      "Publishing Automation",
      "SEO and Analytics Infrastructure"
    ],
    technologies: ["PHP", "Laravel", "MySQL", "AWS", "Docker", "Nginx", "Redis"],
    outcomes: [
      "25,000+ professionals supported",
      "50+ countries reached",
      "35% lower average latency",
      "60% less manual operations"
    ],
    icon: Building2,
    accentColor: "from-blue-500 to-cyan-500"
  },
  {
    id: "euroafrique-corporate",
    company: "EuroAfrique Corporate Skills",
    role: "Full-Stack Developer (Sole Technical Owner)",
    duration: "08/2025 - Present",
    location: "Juja, Kenya",
    website: "https://www.euroafriquecorporateskills.com/",
    isCurrent: true,
    group: "EuroAfrique Corporate Skills sister companies",
    impact: [
      "Designed and developed a complete Laravel Learning Management System from concept to production",
      "Implemented RBAC, automated enrolment, payment verification, and protected access to premium learning content",
      "Improved page speed by approximately 60% through caching, asset optimization, and efficient resource delivery",
      "Managed hosting, DNS, SSL, security hardening, deployments, monitoring, and technical SEO"
    ],
    systems: ["Learning Management System", "Role-Based Access Control", "Payment and Course Access", "Technical SEO Architecture"],
    technologies: ["Next.js", "PostgreSQL", "Node.js", "Docker", "AWS", "GitHub Actions"],
    outcomes: ["60% faster page speed", "Secure premium content access", "Production deployment owned end to end", "Improved organic search visibility"],
    icon: TrendingUp,
    accentColor: "from-green-500 to-emerald-500"
  },
  {
    id: "freelance-tutor",
    company: "Freelance | Self-Employed",
    role: "Freelance Web Development Tutor",
    duration: "05/2025 - 08/2025",
    location: "Remote",
    impact: [
      "Delivered project-based mentorship across HTML, CSS, JavaScript, React, PHP, Laravel, Node.js, REST APIs, SQL, Git, and deployment workflows",
      "Guided learners through requirements analysis, system design, development, debugging, testing, deployment, and maintenance",
      "Taught GitHub workflows, code organization, debugging, and software engineering practices",
      "Coached a learner to design, build, and deploy a full-stack web application within six weeks"
    ],
    systems: ["Project-Based Curriculum", "Full-Stack Applications", "Deployment Workflows", "Career Coaching"],
    technologies: ["JavaScript", "React", "PHP", "Laravel", "Node.js", "SQL", "Git"],
    outcomes: ["First full-stack application shipped within six weeks", "Production-focused software practices taught"],
    icon: Code2,
    accentColor: "from-cyan-500 to-blue-500"
  },
  {
    id: "gicatech-network-technician",
    company: "Gicatech Enterprise Solutions",
    role: "Network Technician",
    duration: "08/2024 - 02/2025",
    location: "Kisii County, Kenya",
    impact: [
      "Installed, configured, and maintained wired and wireless network infrastructure for business clients",
      "Diagnosed network performance, connectivity, and hardware issues to minimize downtime",
      "Configured routers and firewalls, access controls, and basic network hardening measures",
      "Performed preventive maintenance, monitoring, and infrastructure health checks"
    ],
    systems: ["Wired and Wireless Networks", "Router and Firewall Configuration", "Infrastructure Monitoring", "Preventive Maintenance"],
    technologies: ["Networking", "Firewalls", "Routing", "Infrastructure Monitoring"],
    outcomes: ["Improved network reliability", "Reduced client connectivity downtime"],
    icon: Server,
    accentColor: "from-slate-500 to-slate-700"
  },
  {
    id: "independent-projects",
    company: "Muhscience Tech iLabs",
    role: "Independent Full-Stack Developer",
    duration: "2024 - Present",
    location: "Nairobi, Kenya",
    isCurrent: true,
    impact: [
      "Architected enterprise automation systems serving 50+ SMEs across East Africa",
      "Built full-stack web applications with focus on performance and scalability",
      "Implemented technical SEO frameworks achieving 200% average traffic growth",
      "Designed zero-downtime deployment strategies for critical business systems"
    ],
    systems: [
      "SME Automation Platform",
      "Technical SEO Engine",
      "Web Deployment Pipeline",
      "Business Intelligence Dashboard"
    ],
    technologies: ["React", "TypeScript", "Python", "FastAPI", "Docker", "Kubernetes", "Terraform"],
    outcomes: [
      "50+ successful deployments",
      "200% average SEO improvement",
      "Zero-downtime releases",
      "Trusted by major enterprises"
    ],
    icon: Code2,
    accentColor: "from-purple-500 to-violet-500"
  },
  {
    id: "secunets-intern",
    company: "Secunets Technologies Ltd",
    role: "Software Engineer Intern",
    duration: "05/2024 - 08/2024",
    location: "Kikuyu, Kenya",
    impact: [
      "Built a Flask password manager using SQLite, AES encryption, PBKDF2 key derivation, and biometric authentication",
      "Identified more than 15 access-control vulnerabilities and reduced the simulated attack surface by approximately 30%",
      "Contributed to a GSMA SAS-UP compliance audit at Sintel Security Print Solutions",
      "Provided backend development and cybersecurity support during the National Research Fund Hackathon"
    ],
    systems: [
      "Secure Web Applications",
      "Authentication Systems",
      "API Security Implementations",
      "Database Optimization"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Python"],
    outcomes: [
      "15+ access-control vulnerabilities identified",
      "30% lower simulated attack surface",
      "GSMA SAS-UP audit experience",
      "Hackathon backend and security support"
    ],
    icon: Server,
    accentColor: "from-orange-500 to-amber-500"
  }
]

export const timelineCategories = [
  "All",
  "Leadership",
  "Architecture",
  "Automation",
  "Engineering"
] as const
