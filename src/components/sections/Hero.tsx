import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Trophy } from "lucide-react"
import { site } from "@/lib/site"

/** Proof points, each traceable to a case study. */
const metrics = [
  { value: "3", label: "production platforms I own end to end" },
  { value: "25,000+", label: "professionals in the network they serve" },
  { value: "50+", label: "countries reached" },
  { value: "~60%", label: "less manual work through automation" },
]

export function Hero() {
  return (
    <section id="intro" className="hero" aria-labelledby="hero-title">
      <div className="shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <Link href="/work/unified-threat-detection-response" className="hero-award">
              <Trophy size={14} aria-hidden="true" />
              <span><strong>Top 5 finalist</strong> · Mozilla Responsible Computing Challenge</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>

            <h1 id="hero-title">
              I design, build and <em>run</em> the systems businesses depend on.
            </h1>

            <p className="hero-intro">
              Full-stack engineer in Nairobi and the sole technical owner of three production platforms, from requirements
              and architecture through payments and security to the Linux servers they run on.
            </p>

            <div className="hero-actions">
              <Link href="/#work" className="button button-primary">
                View selected work <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href={site.links.resume} className="button" target="_blank" rel="noopener noreferrer">
                Résumé <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <span className="hero-socials">
                <a href={site.links.github} className="icon-button" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                  <Github size={18} aria-hidden="true" />
                </a>
                <a href={site.links.linkedin} className="icon-button" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                  <Linkedin size={18} aria-hidden="true" />
                </a>
                <a href={`mailto:${site.email}`} className="icon-button" aria-label="Email" title="Email">
                  <Mail size={18} aria-hidden="true" />
                </a>
              </span>
            </div>

            <p className="hero-availability">
              <span className="status-dot" aria-hidden="true" />
              Open to full-stack and backend roles · remote or Nairobi, {site.timezone}
            </p>
          </div>

          <figure className="hero-portrait-card">
            <div className="hero-portrait">
              <Image src="/images/profile.jpg" alt={`Portrait of ${site.name}`} fill sizes="(max-width: 960px) 90vw, 360px" preload />
            </div>
            <figcaption className="hero-chip">
              <span className="status-dot" aria-hidden="true" />
              3 platforms in production
            </figcaption>
          </figure>
        </div>

        <dl className="hero-metrics" aria-label="At a glance">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
