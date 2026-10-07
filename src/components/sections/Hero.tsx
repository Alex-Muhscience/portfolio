import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Github, Linkedin } from "lucide-react"
import { site } from "@/lib/site"

const facts = [
  { term: "Based in", detail: `${site.location} · ${site.timezone}` },
  { term: "Currently", detail: "Technical owner for EuroAfrique Corporate Skills and its sister companies, since 2025" },
  { term: "Works across", detail: "Architecture, frontend, backend, databases, security, deployment and production operations" },
  { term: "Core stack", detail: "TypeScript, React, Next.js, Laravel, PostgreSQL, MySQL, Redis, Docker, Linux" },
]

export function Hero() {
  return (
    <section id="intro" className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="kicker">{site.name} · {site.role}</p>
          <h1 id="hero-title">
            I build production web applications and business systems, from the first requirement to the server they run on.
          </h1>
          <p className="hero-intro">
            I work across product requirements, architecture, frontend, backend, databases, APIs, security and deployment,
            and I stay responsible for a system once it is live. The stack is chosen for the problem: Laravel or Node.js,
            React and Next.js, PostgreSQL or MySQL.
          </p>
          <div className="hero-actions">
            <Link href="/#work" className="button button-primary">View selected work <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/#contact" className="button">Contact me</Link>
            <a href={site.links.github} className="button button-ghost" target="_blank" rel="noopener noreferrer">
              <Github size={16} aria-hidden="true" /> GitHub
            </a>
            <a href={site.links.linkedin} className="button button-ghost" target="_blank" rel="noopener noreferrer">
              <Linkedin size={16} aria-hidden="true" /> LinkedIn
            </a>
            <a href={site.links.resume} className="button button-ghost" target="_blank" rel="noopener noreferrer">
              Résumé <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="hero-aside" aria-label="At a glance">
          <div className="hero-portrait">
            <Image src="/images/profile.jpg" alt={`Portrait of ${site.name}`} fill sizes="(max-width: 900px) 96px, 280px" preload />
          </div>
          <dl className="fact-list">
            {facts.map((fact) => (
              <div key={fact.term}>
                <dt>{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  )
}
