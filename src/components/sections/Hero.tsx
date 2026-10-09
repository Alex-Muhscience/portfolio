import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/shared/BrandIcons"
import { Headline } from "@/components/shared/Headline"
import { site } from "@/lib/site"

export function Hero() {
  return (
    <section id="intro" className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="kicker">{site.name} · {site.role}</p>

          <h1 id="hero-title"><Headline /></h1>

          <p className="hero-intro">{site.summary}</p>

          <div className="hero-actions">
            <Link href="/#work" className="button button-primary">
              View selected work <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href={site.links.resume} className="button" target="_blank" rel="noopener noreferrer">
              Résumé <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <span className="hero-socials">
              <a href={site.links.github} className="icon-button" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                <GitHubIcon size={18} aria-hidden="true" />
              </a>
              <a href={site.links.linkedin} className="icon-button" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <LinkedInIcon size={18} aria-hidden="true" />
              </a>
              <a href={`mailto:${site.email}`} className="icon-button" aria-label="Email" title="Email">
                <Mail size={18} aria-hidden="true" />
              </a>
            </span>
          </div>

          <p className="hero-availability">
            <span className="status-dot" aria-hidden="true" />
            {site.availability}, {site.timezone}
          </p>
        </div>

        <div className="hero-portrait-card">
          <div className="hero-portrait">
            <Image src="/images/profile.jpg" alt={`Portrait of ${site.name}`} fill sizes="(max-width: 960px) 90vw, 360px" preload />
          </div>
        </div>
      </div>
    </section>
  )
}
