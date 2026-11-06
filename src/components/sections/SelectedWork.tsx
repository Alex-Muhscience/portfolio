import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getProject, projects, type Project } from "@/data/projects"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { ProjectRow } from "@/components/work/ProjectRow"
import { ProjectTile, type TileVariant } from "@/components/work/ProjectTile"

/** The grid: one large tile, two beside it, and one full-width tile beneath. */
const layout: [string, TileVariant][] = [
  ["euroafrique", "lead"],
  ["chania-publishers-lms", "standard"],
  ["muhos", "standard"],
  ["businessos", "wide"],
]

export function SelectedWork() {
  const tiles = layout
    .map(([slug, variant]) => [getProject(slug), variant] as const)
    .filter((entry): entry is readonly [Project, TileVariant] => Boolean(entry[0]))
  const shown = new Set(tiles.map(([project]) => project.slug))
  const more = projects.filter((project) => !shown.has(project.slug))

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="shell">
        <SectionHeading
          id="work-title"
          index="01"
          label="Selected work"
          title="Systems I have designed, built and run."
          note="Each case study covers the problem, my role, the architecture and the decisions behind it. Where the code is private, that is stated."
        />

        <div className="bento">
          {tiles.map(([project, variant]) => <ProjectTile key={project.slug} project={project} variant={variant} />)}
        </div>

        <h3 className="subheading">More work</h3>
        <div className="project-rows">
          {more.map((project) => <ProjectRow key={project.slug} project={project} headingLevel="h3" />)}
        </div>

        <p className="section-more">
          <Link href="/work" className="text-link">All case studies <ArrowRight size={15} aria-hidden="true" /></Link>
        </p>
      </div>
    </section>
  )
}
