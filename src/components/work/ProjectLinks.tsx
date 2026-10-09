import { ArrowUpRight } from "lucide-react"
import { GitHubIcon } from "@/components/shared/BrandIcons"
import type { ProjectLink } from "@/data/projects"

export function ProjectLinks({ links, title }: { links: ProjectLink[]; title: string }) {
  if (links.length === 0) return null

  return (
    <ul className="project-links">
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`${link.label}: ${title} (opens in a new tab)`}>
            {link.kind === "repository" && <GitHubIcon size={15} aria-hidden="true" />}
            {link.label}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
