import type { Metadata } from "next"
import { JsonLd } from "@/components/shared/JsonLd"
import { ProjectRow } from "@/components/work/ProjectRow"
import { projects } from "@/data/projects"
import { absoluteUrl, site } from "@/lib/site"

const description =
  "Case studies in full-stack engineering: a multi-tenant business platform, production training and learning platforms with payment integrations, a Next.js company site and a threat-detection system."

export const metadata: Metadata = {
  title: "Work",
  description,
  alternates: { canonical: "/work" },
  openGraph: { title: `Work — ${site.name}`, description, url: "/work" },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `Work — ${site.name}`,
  url: absoluteUrl("/work"),
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: absoluteUrl(`/work/${project.slug}`),
    })),
  },
}

export default function WorkPage() {
  return (
    <section className="section page-top" aria-labelledby="work-index-title">
      <JsonLd data={structuredData} />
      <div className="shell">
        <div className="section-heading">
          <p className="kicker">Work</p>
          <h1 id="work-index-title">Case studies</h1>
          <p className="section-note">
            Production systems, an ongoing platform build and a research project. Each one sets out the problem, my role,
            the architecture and the reasoning behind the main decisions.
          </p>
        </div>
        <div className="project-rows">
          {projects.map((project) => <ProjectRow key={project.slug} project={project} headingLevel="h2" />)}
        </div>
      </div>
    </section>
  )
}
