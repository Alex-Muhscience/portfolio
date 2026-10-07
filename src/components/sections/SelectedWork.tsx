import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { projects } from "@/data/projects"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { ProjectFeature } from "@/components/work/ProjectFeature"
import { ProjectRow } from "@/components/work/ProjectRow"

export function SelectedWork() {
  const featured = projects.filter((project) => project.featured)
  const more = projects.filter((project) => !project.featured)

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

        <div className="project-features">
          {featured.map((project, index) => <ProjectFeature key={project.slug} project={project} index={index} />)}
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
