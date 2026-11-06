import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"
import { about } from "@/data/about"
import { systemFlow } from "@/data/engineering"
import { projects } from "@/data/projects"
import { DESKTOP_SIZE, getScreenshot } from "@/data/screenshots"
import { techIcon } from "@/data/tech-icons"
import { site } from "@/lib/site"
import { ScrollViewButton } from "./ScrollViewButton"

/*
 * Illustrations for the left-hand pages of the book's spreads, plus the endpaper and back cover.
 * Server components: they are passed to the client <Book> as ready-made elements.
 */

export function IntroFigure() {
  return (
    <figure className="fig-portrait">
      <div className="fig-portrait-frame">
        <Image src="/images/profile.jpg" alt="" fill sizes="(min-width: 64rem) 22rem, 0px" />
      </div>
      <figcaption>{site.location} · {site.timezone}</figcaption>
    </figure>
  )
}

export function WorkFigure() {
  const shots = ["euroafrique", "chania-publishers-lms", "afriasia-career-development-center"]
    .map((slug) => getScreenshot(slug))
    .filter((shot) => shot !== undefined)
  return (
    <div className="fig-fan">
      {shots.map((shot, i) => (
        <div key={shot.desktop} className="fig-fan-card" style={{ "--i": i } as React.CSSProperties}>
          <span className="fig-fan-bar"><i /><i /><i /><b>{shot.address}</b></span>
          <Image src={shot.desktop} alt="" width={DESKTOP_SIZE.width} height={DESKTOP_SIZE.height} sizes="(min-width: 64rem) 24rem, 0px" />
        </div>
      ))}
    </div>
  )
}

const LOGOS = ["React", "Next.js", "TypeScript", "Laravel", "PHP", "Python", "Django", "PostgreSQL", "MySQL", "Redis", "Docker", "nginx", "Cloudflare", "GitHub Actions", "Linux", "Qt 6"]

export function EngineeringFigure() {
  return (
    <ul className="fig-logos">
      {LOGOS.map((name) => {
        const icon = techIcon(name)
        return (
          <li key={name} title={name}>
            {icon && (
              <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                <path d={icon.path} fill="currentColor" />
              </svg>
            )}
            <span>{name}</span>
          </li>
        )
      })}
    </ul>
  )
}

export function PrinciplesFigure() {
  return (
    <ol className="fig-path">
      {systemFlow.map((stage) => (
        <li key={stage.name}>
          <strong>{stage.name}</strong>
          <span>{stage.role}</span>
        </li>
      ))}
    </ol>
  )
}

const MILESTONES = [
  { year: "2021", text: "BSc Computer Science, Kisii University" },
  { year: "2024", text: "Software development intern, Secunets" },
  { year: "2025", text: "Technical owner, EuroAfrique and sister companies" },
  { year: "2026", text: "Four platforms, plus BusinessOS and MuhOS" },
]

export function ExperienceFigure() {
  return (
    <ol className="fig-years">
      {MILESTONES.map((item) => (
        <li key={item.year}>
          <strong>{item.year}</strong>
          <span>{item.text}</span>
        </li>
      ))}
    </ol>
  )
}

export function AboutFigure() {
  return (
    <blockquote className="fig-quote">
      <p>I would rather ship a smaller system I can operate than a larger one I can only demonstrate.</p>
      <footer>{site.name}</footer>
    </blockquote>
  )
}

export function ContactFigure() {
  return (
    <div className="fig-letter">
      <p className="fig-letter-to">Write to</p>
      <p className="fig-letter-address">{site.email}</p>
      <p className="fig-letter-meta"><span className="status-dot" aria-hidden="true" /> {site.availability}</p>
      <p className="fig-letter-meta">{site.location} · {site.timezone}</p>
    </div>
  )
}

/** The endpaper facing the back cover: a patterned sheet with the colophon. */
export function Colophon() {
  return (
    <div className="colophon">
      <p className="colophon-title">Colophon</p>
      <p>Written, designed and built by {site.name} in {site.location}.</p>
      <p>Set in Hanken Grotesk. Built with Next.js, React and TypeScript, and published on Vercel.</p>
      <p>Every project named here has a full case study on the website, with the code linked wherever it is public.</p>
      <p className="colophon-edition">First edition · {new Date().getFullYear()}</p>
    </div>
  )
}

/** A decorative barcode drawn from the site's address, so it is the same on every render. */
function Barcode({ value }: { value: string }) {
  const bars: { x: number; w: number }[] = []
  let x = 0
  for (const char of value) {
    const code = char.charCodeAt(0)
    for (let bit = 0; bit < 4; bit++) {
      const w = ((code >> bit) & 1) + 1
      if (bit % 2 === 0) bars.push({ x, w })
      x += w + 1
    }
  }
  return (
    <svg className="barcode" viewBox={`0 0 ${x} 40`} preserveAspectRatio="none" aria-hidden="true">
      {bars.map((bar) => <rect key={bar.x} x={bar.x} y="0" width={bar.w} height="40" />)}
    </svg>
  )
}

export function BackCover() {
  const live = projects.filter((project) => project.status === "production").length
  return (
    <div className="back-cover">
      <p className="back-kicker">{site.role}</p>
      <p className="back-blurb">{about[0]}</p>

      <ul className="back-facts">
        <li><strong>{projects.length}</strong> systems, each with a full case study</li>
        <li><strong>{live}</strong> of them live in production</li>
        <li><strong>One owner</strong> from the first request to the last backup</li>
      </ul>

      <div className="back-actions">
        <Link href="/#cover" className="back-button">
          <ArrowLeft size={16} aria-hidden="true" /> Close the book
        </Link>
        <ScrollViewButton>
          <BookOpen size={16} aria-hidden="true" /> Read as a scrolling page
        </ScrollViewButton>
      </div>

      <div className="back-foot">
        <p>
          <strong>{site.name}</strong>
          <span>{site.email}</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </p>
        <div className="back-code">
          <Barcode value={site.url} />
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    </div>
  )
}
