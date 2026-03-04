import { Building2, TrendingUp, Code2, Server, Cpu, Globe } from "lucide-react"
import type { ExperienceItem } from "@/types/experience"

export const experiences: ExperienceItem[] = [
  {
    id: "chania-publishers",
    company: "Chania Publishers Limited",
    role: "IT Department Lead",
    duration: "2026 - Present",
    location: "Nairobi, Kenya",
    website: "https://chaniapublishers.com/",
    isCurrent: true,
    impact: [
      "Architected and maintained full digital infrastructure for Kenya's leading educational publisher",
      "Engineered automated publishing workflows reducing production time by 40%",
      "Implemented technical SEO strategies driving 300% increase in organic traffic",
      "Designed scalable cloud architecture supporting 10,000+ daily active users"
    ],
    systems: [
      "Digital Publishing Platform",
      "Content Management System",
      "Automated Distribution Pipeline",
      "Analytics Dashboard"
    ],
    technologies: ["PHP", "Laravel", "MySQL", "AWS", "Docker", "Nginx", "Redis"],
    outcomes: [
      "40% faster publishing cycles",
      "300% SEO traffic growth",
      "99.9% system uptime",
      "Zero security incidents"
    ],
    icon: Building2,
    accentColor: "from-blue-500 to-cyan-500"
  },
  {
    id: "euroafrique-corporate",
    company: "EuroAfrique Corporate Skills",
    role: "IT Department Lead",
    duration: "2025 - Present",
    location: "Nairobi, Kenya",
    website: "https://www.euroafriquecorporateskills.com/",
    isCurrent: true,
    impact: [
      "Built comprehensive corporate training platform from ground up",
      "Automated enrollment and certification systems reducing manual work by 70%",
      "Implemented DevOps practices enabling 3x faster deployment cycles",
      "Architected microservices infrastructure for scalability"
    ],
    systems: [
      "Corporate LMS Platform",
      "Automated Enrollment System",
      "Certification Engine",
      "Performance Analytics"
    ],
    technologies: ["Next.js", "PostgreSQL", "Node.js", "Docker", "AWS", "GitHub Actions"],
    outcomes: [
      "70% reduction in manual processing",
      "500+ active corporate users",
      "3x faster feature releases",
      "60% improvement in training efficiency"
    ],
    icon: TrendingUp,
    accentColor: "from-green-500 to-emerald-500"
  },
  {
    id: "independent-projects",
    company: "Muhscience Tech iLabs",
    role: "Founder & Systems Architect",
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
    duration: "2024",
    location: "Nairobi, Kenya",
    impact: [
      "Developed secure web applications following cybersecurity best practices",
      "Contributed to system integration projects for enterprise clients",
      "Learned enterprise development workflows and DevOps methodologies",
      "Built foundation in secure coding and architecture principles"
    ],
    systems: [
      "Secure Web Applications",
      "Authentication Systems",
      "API Security Implementations",
      "Database Optimization"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Python"],
    outcomes: [
      "Completed internship with distinction",
      "Production-ready applications delivered",
      "Strong foundation in security practices",
      "Transitioned to full-time roles"
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
