import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/shared/JsonLd"
import { TechList } from "@/components/shared/TechList"
import { ProjectLinks } from "@/components/work/ProjectLinks"
import { StatusBadge } from "@/components/work/StatusBadge"
import { SystemMap } from "@/components/work/SystemMap"
import { BrowserFrame, PhoneFrame } from "@/components/work/DeviceFrames"
import { CaseNav } from "@/components/work/CaseNav"
import { ViewTransition } from "react"
import { getScreenshot } from "@/data/screenshots"
import { getAdjacentProjects, getProject, projects } from "@/data/projects"
import { absoluteUrl, site } from "@/lib/site"

type CaseStudyProps = { params: Promise<{ slug: string }> }

const caseSections = [
  { id: "problem", label: "Problem" },
  { id: "built", label: "What I built" },
  { id: "system", label: "System" },
  { id: "engineering", label: "Engineering" },
  { id: "decisions", label: "Decisions" },
  { id: "outcome", label: "Outcome" },
]

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const url = `/work/${project.slug}`
  return {
    title: `${project.title} — Case study`,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", title: project.title, description: project.summary, url },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const { previous, next } = getAdjacentProjects(project.slug)
  const shot = getScreenshot(project.slug)
  const url = absoluteUrl(`/work/${project.slug}`)

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#case-study`,
        name: project.title,
        headline: `${project.title} — Case study`,
        description: project.summary,
        url,
        author: { "@type": "Person", "@id": absoluteUrl("/#person"), name: site.name },
        keywords: project.stack.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/work") },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  }

  return (
    <article className="case-study page-top">
      <JsonLd data={structuredData} />

      <header className="shell case-header">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/work">Work</Link></li>
            <li aria-current="page">{project.title}</li>
          </ol>
        </nav>
        <ViewTransition name={`title-${project.slug}`} share="morph" default="none">
          <h1>{project.title}</h1>
        </ViewTransition>
        <p className="case-summary">{project.summary}</p>

        <dl className="case-meta">
          <div>
            <dt>Status</dt>
            <dd><StatusBadge status={project.status} label={project.statusLabel} /></dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Period</dt>
            <dd>{project.period}</dd>
          </div>
          <div>
            <dt>Inspect</dt>
            <dd>
              <ProjectLinks links={project.links} title={project.title} />
              {project.accessNote && <p className="access-note">{project.accessNote}</p>}
            </dd>
          </div>
        </dl>

        {shot && (
          <div className="case-shot">
            <ViewTransition name={`shot-${project.slug}`} share="morph" default="none">
              <BrowserFrame shot={shot} sizes="(min-width: 60rem) 56rem, 92vw" priority />
            </ViewTransition>
            <PhoneFrame shot={shot} />
          </div>
        )}
      </header>

      <CaseNav items={caseSections} />

      <div className="shell case-body">
        <section id="problem" className="case-section" aria-labelledby="problem-title">
          <h2 id="problem-title">Problem</h2>
          <p className="case-lead">{project.problem}</p>
        </section>

        <section id="built" className="case-section" aria-labelledby="built-title">
          <h2 id="built-title">What I built</h2>
          <div>
            <p className="case-lead">{project.built}</p>
            <h3 className="case-label">Stack</h3>
            <TechList items={project.stack} label="Stack" />
          </div>
        </section>

        <section id="system" className="case-section" aria-labelledby="system-title">
          <h2 id="system-title">System</h2>
          <SystemMap layers={project.system} title={project.title} />
        </section>

        <section id="engineering" className="case-section" aria-labelledby="engineering-title">
          <h2 id="engineering-title">Engineering</h2>
          <div className="case-notes">
            {project.engineering.map((note) => (
              <div key={note.area} className="case-note">
                <h3>{note.area}</h3>
                <ul>
                  {note.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="decisions" className="case-section" aria-labelledby="decisions-title">
          <h2 id="decisions-title">Decisions</h2>
          <dl className="decision-list">
            {project.decisions.map((item) => (
              <div key={item.decision}>
                <dt>{item.decision}</dt>
                <dd>{item.rationale}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="outcome" className="case-section" aria-labelledby="outcome-title">
          <h2 id="outcome-title">Outcome</h2>
          <ul className="outcome-list">
            {project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
          </ul>
        </section>
      </div>

      <nav className="shell case-pager" aria-label="More case studies">
        {previous ? (
          <Link href={`/work/${previous.slug}`} rel="prev">
            <span><ArrowLeft size={14} aria-hidden="true" /> Previous</span>
            <strong>{previous.title}</strong>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/work/${next.slug}`} rel="next" className="case-pager-next">
            <span>Next <ArrowRight size={14} aria-hidden="true" /></span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <Link href="/#contact" className="case-pager-next">
            <span>Next <ArrowRight size={14} aria-hidden="true" /></span>
            <strong>Get in touch</strong>
          </Link>
        )}
      </nav>
    </article>
  )
}
