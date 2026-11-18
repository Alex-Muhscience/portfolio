import { getProject } from "@/data/projects"
import { principles } from "@/data/engineering"
import { getScreenshot, type Screenshot } from "@/data/screenshots"
import { site } from "@/lib/site"

/**
 * The script of the film on the homepage. Every claim here also appears in the
 * case studies or the experience section; the film only tells it in order.
 * Durations are in milliseconds; the finale has none (the film stops there).
 */

export interface WorkBeat {
  slug: string
  title: string
  shot: Screenshot
  /** The number or word that lands on screen. */
  stat: string
  /** What the number means, in one line. */
  caption: string
}

export interface Chapter {
  id: "open" | "title" | "origin" | "owner" | "work" | "depth" | "principles" | "now"
  label: string
  duration: number
}

/** One beat in the work montage. */
const WORK_BEAT_MS = 4600

function beat(slug: string, stat: string, caption: string): WorkBeat | null {
  const project = getProject(slug)
  const shot = getScreenshot(slug)
  return project && shot ? { slug, title: project.title, shot, stat, caption } : null
}

export const work: WorkBeat[] = [
  beat("euroafrique", "Signed", "provider callbacks confirm every M-Pesa and card payment"),
  beat("chania-publishers-lms", "0", "manual steps from payment to course access"),
  beat("afriasia-career-development-center", "17,000+", "courses across 16 cities, booked online"),
  beat("chania-finance-consultancy", "140+", "feature tests, including a database-query budget"),
].filter((b): b is WorkBeat => b !== null)

export const depth = [
  { project: "MuhOS", stat: "~9×", caption: "less idle CPU for my open-source Linux desktop shell, measured in a VM" },
  { project: "BusinessOS", stat: "600 req/s", caption: "at a 54 ms p95, load-tested with 10,000 tenants" },
]

export const filmPrinciples = principles.map((p) => p.title)

export const businesses = [
  "EuroAfrique Corporate Skills",
  "Chania Publishers",
  "AfriAsia Career Development Center",
  "Chania Finance Consultancy",
]

export const chapters: Chapter[] = [
  { id: "open", label: "Opening", duration: 5200 },
  { id: "title", label: "Title", duration: 7000 },
  { id: "origin", label: "Where it started", duration: 9800 },
  { id: "owner", label: "One engineer", duration: 9000 },
  { id: "work", label: "The work", duration: WORK_BEAT_MS * 4 + 600 },
  { id: "depth", label: "Going deeper", duration: 8200 },
  { id: "principles", label: "How I work", duration: 1900 * 5 + 900 },
  { id: "now", label: "Now", duration: 0 },
]

export const credits = {
  name: site.name,
  role: site.role,
  availability: site.availability,
  email: site.email,
  resume: site.links.resume,
}

export { WORK_BEAT_MS }
