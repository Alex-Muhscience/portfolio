import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { projects } from "@/data/projects"

export function Projects() {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3)

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="portfolio-shell">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2 id="projects-title" className="section-title">Case studies, not just screenshots.</h2>
          </div>
          <p className="section-note">A few systems I&apos;ve designed and built, from security infrastructure to products used in everyday operations.</p>
        </div>

        <div className="project-grid">
          {featuredProjects.map((project, index) => (
            <article key={project.id} className="project-card">
              <div className="project-card-image">
                {project.favicon ? (
                  <div className="project-site-mark">
                    <span>0{index + 1}</span>
                    <img src={project.favicon} alt={`${project.title} website favicon`} width={72} height={72} />
                  </div>
                ) : (
                  <div className="project-placeholder" aria-label={`${project.title} preview unavailable`}>{project.category}</div>
                )}
              </div>
              <div className="project-meta"><span>0{index + 1} / {project.category}</span><span>{project.year}</span></div>
              <h3>{project.title}</h3>
              <p className="project-label">Problem</p>
              <p className="project-copy">{project.problem}</p>
              <p className="project-label">Role & outcome</p>
              <p className="project-copy">{project.role ?? "Full-stack developer"}. {project.outcomes[0]}</p>
              <div className="tag-list" aria-label="Technology stack">
                {project.technologies.slice(0, 5).map((technology) => <span key={technology} className="tag">{technology}</span>)}
              </div>
              <div className="project-links">
                <Link className="project-link" href={`/projects/${project.id}`}>Read case study <ArrowUpRight size={15} /></Link>
                {project.github && <a className="project-link" href={project.github} target="_blank" rel="noopener noreferrer"><Github size={15} /> GitHub</a>}
                {project.demo && <a className="project-link" href={project.demo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={15} /></a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
