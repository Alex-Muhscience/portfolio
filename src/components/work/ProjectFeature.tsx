import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/data/projects"
import { TechList } from "@/components/shared/TechList"
import { ProjectLinks } from "./ProjectLinks"
import { StatusBadge } from "./StatusBadge"

export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const titleId = `project-${project.slug}`

  return (
    <article className="project-feature reveal" aria-labelledby={titleId}>
      <header className="project-feature-head">
        <span className="project-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3 id={titleId}><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
          <StatusBadge status={project.status} label={project.statusLabel} />
        </div>
      </header>

      <div className="project-feature-body">
        <div className="project-feature-main">
          <p className="project-summary">{project.summary}</p>
          <dl className="project-facts">
            <div>
              <dt>Problem</dt>
              <dd>{project.problem}</dd>
            </div>
            <div>
              <dt>What I built</dt>
              <dd>{project.built}</dd>
            </div>
          </dl>
        </div>

        <div className="project-feature-side">
          <dl className="meta-list">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>{project.period}</dd>
            </div>
            <div>
              <dt>Engineering</dt>
              <dd>
                <ul className="plain-list">
                  {project.engineering.map((note) => <li key={note.area}>{note.area}</li>)}
                </ul>
              </dd>
            </div>
          </dl>
          <TechList items={project.stack} label={`${project.title} stack`} />
        </div>
      </div>

      <footer className="project-feature-foot">
        <Link href={`/work/${project.slug}`} className="text-link">
          Read the case study <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <ProjectLinks links={project.links} title={project.title} />
      </footer>
    </article>
  )
}
