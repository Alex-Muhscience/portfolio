import Image from "next/image"
import { ViewTransition } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/data/projects"
import { DESKTOP_SIZE, getScreenshot } from "@/data/screenshots"
import { StatusBadge } from "./StatusBadge"

export function ProjectRow({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel
  const shot = getScreenshot(project.slug)

  return (
    <article className="project-row reveal" data-thumb={shot ? "yes" : "no"}>
      <div className="project-thumb" aria-hidden="true">
        {shot
          ? (
            <ViewTransition name={`shot-${project.slug}`} share="morph" default="none">
              <Image src={shot.desktop} alt="" width={DESKTOP_SIZE.width} height={DESKTOP_SIZE.height} sizes="11rem" />
            </ViewTransition>
          )
          : <span>Private · no public screens</span>}
      </div>
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
