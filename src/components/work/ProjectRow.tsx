import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/data/projects"
import { StatusBadge } from "./StatusBadge"

export function ProjectRow({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel

  return (
    <article className="project-row reveal">
      <div>
        <Heading><Link href={`/work/${project.slug}`}>{project.title}</Link></Heading>
        <StatusBadge status={project.status} label={project.statusLabel} />
      </div>
      <p>{project.summary}</p>
      <p className="project-row-stack">{project.stack.slice(0, 6).join(" · ")}</p>
      <Link href={`/work/${project.slug}`} className="text-link" aria-label={`Case study: ${project.title}`}>
        Case study <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </article>
  )
}
