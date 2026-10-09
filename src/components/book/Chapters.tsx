import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react"
import { about } from "@/data/about"
import { education } from "@/data/education"
import { engineeringAreas, principles } from "@/data/engineering"
import { earlierRoles, experience } from "@/data/experience"
import { projects } from "@/data/projects"
import { channels } from "@/components/sections/Contact"
import { GitHubIcon, LinkedInIcon } from "@/components/shared/BrandIcons"
import { Headline } from "@/components/shared/Headline"
import { StatusBadge } from "@/components/work/StatusBadge"
import { site } from "@/lib/site"

/*
 * The book's chapters: the same material as the scrolling page, cut down so each one fits on a
 * single page. Anything longer is a link to the full case study. The chapter title lives on the
 * left-hand page (BookVerso), so these start straight with content.
 */

export function IntroChapter() {
  return (
    <div className="chapter chapter-intro">
      <div className="chapter-intro-id">
        <div className="chapter-portrait">
          <Image src="/images/profile.jpg" alt={`Portrait of ${site.name}`} fill sizes="80px" />
        </div>
        <p>
          <strong>{site.name}</strong>
          <span>{site.role} · {site.location}</span>
        </p>
      </div>
      <p className="chapter-headline"><Headline /></p>
      <p className="chapter-lead">{site.summary}</p>
      <div className="chapter-actions">
        <Link href="/#work" className="button button-primary">
          Read the work <ArrowRight size={16} aria-hidden="true" />
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
        {site.availability}
      </p>
    </div>
  )
}

export function WorkChapter() {
  return (
    <div className="chapter">
      <ol className="chapter-rows chapter-work">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/work/${project.slug}`}>
              <span className="chapter-row-head">
                <strong>{project.title}</strong>
                <ArrowRight size={15} aria-hidden="true" />
              </span>
              <span className="chapter-work-meta">
                {/* The short form of the status ("In production"); the case study has the rest. */}
                <StatusBadge status={project.status} label={project.statusLabel.split(" · ")[0]} />
                <span className="chapter-row-note">{project.summary}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="chapter-more">
        <Link href="/work" className="text-link">All case studies <ArrowRight size={15} aria-hidden="true" /></Link>
      </p>
    </div>
  )
}

export function EngineeringChapter() {
  return (
    <div className="chapter">
      <dl className="chapter-rows chapter-areas">
        {engineeringAreas.map((item) => (
          <div key={item.area}>
            <dt>{item.area}</dt>
            <dd>
              <span className="chapter-tools">{item.tools.join(" · ")}</span>
              <span className="chapter-row-note">
                Seen in <Link href={`/work/${item.evidence.slug}`}>{item.evidence.label}</Link>
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function PrinciplesChapter() {
  return (
    <div className="chapter">
      <ol className="chapter-rows chapter-principles">
        {principles.map((principle) => (
          <li key={principle.title}>
            <strong>{principle.title}</strong>
            <span className="chapter-row-note">{principle.detail}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function ExperienceChapter() {
  const [current, internship] = experience
  const roles = [
    ...earlierRoles.map((role) => ({ period: role.period, role: role.role, organisation: role.company })),
    { period: internship.period, role: internship.role, organisation: internship.organisation },
  ]

  return (
    <div className="chapter">
      <div className="chapter-rows chapter-roles">
        <div className="chapter-role-current">
          <p className="chapter-period">{current.period}</p>
          <p><strong>{current.role}</strong></p>
          <ul className="chapter-platforms">
            {current.platforms?.map((platform) => (
              <li key={platform.business}>
                <Link href={`/work/${platform.caseStudy}`}>{platform.business}</Link>
                <span>{platform.product}</span>
              </li>
            ))}
          </ul>
        </div>
        {roles.map((role) => (
          <div key={role.role}>
            <p className="chapter-period">{role.period}</p>
            <p><strong>{role.role}</strong> · {role.organisation}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AboutChapter() {
  return (
    <div className="chapter chapter-about">
      {about.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
      {education.map((item) => (
        <p key={item.institution} className="chapter-education">
          <span className="chapter-period">Education</span>
          <strong>{item.qualification}</strong>, {item.institution}. {item.period}. {item.result}.
        </p>
      ))}
    </div>
  )
}

export function ContactChapter() {
  return (
    <div className="chapter chapter-contact">
      <p className="chapter-headline chapter-headline-small">Have a system that needs an owner?</p>
      <ul className="chapter-channels">
        {channels.map(({ label, value, href, icon: Icon, external }) => (
          <li key={label}>
            <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <Icon size={17} aria-hidden="true" />
              <strong>{label}</strong>
              <span>{value}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="chapter-actions">
        <a href={`mailto:${site.email}`} className="button button-primary">
          Email me <ArrowRight size={16} aria-hidden="true" />
        </a>
        <a href={site.links.resume} className="button" target="_blank" rel="noopener noreferrer">
          Résumé <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
