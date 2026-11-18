import Link from "next/link"
import { ArrowRight, ArrowUpRight, Mail, RotateCcw } from "lucide-react"
import { businesses, credits, depth, filmPrinciples, work, WORK_BEAT_MS, type Chapter } from "./film-data"

interface SceneProps {
  chapter: Chapter
  state: "active" | "leaving"
  onClose?: () => void
  onReplay?: () => void
}

/** A scene's motion is CSS that starts on mount (see film.css). Text is real text throughout. */
export function FilmScene({ chapter, state, onClose, onReplay }: SceneProps) {
  return (
    <section className={`film-scene film-scene-${chapter.id}`} data-state={state} aria-hidden={state === "leaving" || undefined}>
      {chapter.id === "open" && <Opening />}
      {chapter.id === "title" && <Title />}
      {chapter.id === "origin" && <Origin />}
      {chapter.id === "owner" && <Owner />}
      {chapter.id === "work" && <Work />}
      {chapter.id === "depth" && <Depth />}
      {chapter.id === "principles" && <Principles />}
      {chapter.id === "now" && <Now onClose={onClose} onReplay={onReplay} />}
    </section>
  )
}

function ChapterMark({ n, title }: { n: string; title: string }) {
  return (
    <header className="film-chapter-mark">
      <span className="film-numeral">Chapter {n}</span>
      <h2 className="film-heading">{title}</h2>
    </header>
  )
}

function Opening() {
  const answer = "alex murimi kamau · full-stack developer · nairobi"
  return (
    <div className="film-terminal" aria-label={`whoami: ${answer}`}>
      <p className="film-line">
        <span className="film-prompt" aria-hidden="true">~ $</span>{" "}
        <span className="film-type film-type-1" style={{ "--chars": 6 } as React.CSSProperties}>whoami</span>
      </p>
      <p className="film-line film-answer">
        <span className="film-type film-type-2" style={{ "--chars": answer.length } as React.CSSProperties}>{answer}</span>
        <span className="film-cursor" aria-hidden="true" />
      </p>
    </div>
  )
}

function Title() {
  return (
    <div className="film-title">
      <div className="film-title-copy">
        <p className="film-kicker">A short film about</p>
        <h2 className="film-name">{credits.name}</h2>
        <p className="film-tagline">
          I design, build and <em>run</em> the systems businesses depend on.
        </p>
      </div>
      <div className="film-portrait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/profile.jpg" alt={`Portrait of ${credits.name}`} />
      </div>
    </div>
  )
}

function Origin() {
  return (
    <div className="film-origin">
      <svg className="film-network" viewBox="0 0 600 340" aria-hidden="true">
        {[["60,260", "180,120"], ["180,120", "330,200"], ["330,200", "470,90"], ["330,200", "540,270"], ["180,120", "300,40"], ["60,260", "330,200"]].map(([a, b], i) => {
          const [x1, y1] = a.split(","), [x2, y2] = b.split(",")
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} style={{ "--i": i } as React.CSSProperties} />
        })}
        {["60,260", "180,120", "330,200", "470,90", "540,270", "300,40"].map((p, i) => {
          const [cx, cy] = p.split(",")
          return <circle key={p} cx={cx} cy={cy} r="7" style={{ "--i": i } as React.CSSProperties} />
        })}
      </svg>
      <ChapterMark n="I" title="It started with security and networks." />
      <ol className="film-beats">
        <li style={{ "--i": 0 } as React.CSSProperties}>A security internship: reviewing web apps for access-control weaknesses, and a GSMA SAS-UP compliance audit.</li>
        <li style={{ "--i": 1 } as React.CSSProperties}>Then networks: cables, routers and firewalls for business clients.</li>
        <li style={{ "--i": 2 } as React.CSSProperties}>So in everything I build, security is never someone else&rsquo;s job.</li>
      </ol>
    </div>
  )
}

function Owner() {
  const path = ["Requirements", "Architecture", "Payments", "Security", "Servers"]
  return (
    <div className="film-owner">
      <ChapterMark n="II" title="Four businesses. One engineer." />
      <ul className="film-cards">
        {businesses.map((b, i) => (
          <li key={b} style={{ "--i": i } as React.CSSProperties}>{b}</li>
        ))}
      </ul>
      <p className="film-path" aria-label={path.join(", then ")}>
        {path.map((step, i) => (
          <span key={step} style={{ "--i": i } as React.CSSProperties}>{step}</span>
        ))}
      </p>
      <p className="film-caption film-owner-caption">Since August 2025, every stage is mine to build and to run.</p>
    </div>
  )
}

function Work() {
  return (
    <div className="film-work" style={{ "--beat": `${WORK_BEAT_MS}ms` } as React.CSSProperties}>
      <p className="film-work-label"><span className="film-numeral">Chapter III</span> The work</p>
      {work.map((b, i) => (
        <article key={b.slug} className="film-panel" style={{ "--i": i } as React.CSSProperties}>
          <figure className="film-browser">
            <div className="film-browser-bar" aria-hidden="true"><i /><i /><i /><span>{b.shot.address}</span></div>
            <div className="film-browser-view">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.shot.desktop} alt={b.shot.alt} />
            </div>
          </figure>
          <div className="film-panel-copy">
            <h3>{b.title}</h3>
            <p className="film-stat">{b.stat}</p>
            <p className="film-caption">{b.caption}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function Depth() {
  return (
    <div className="film-depth">
      <ChapterMark n="IV" title="Going deeper than the brief." />
      <div className="film-depth-grid">
        {depth.map((d, i) => (
          <div key={d.project} className="film-depth-item" style={{ "--i": i } as React.CSSProperties}>
            <p className="film-depth-project">{d.project}</p>
            <p className="film-stat">{d.stat}</p>
            <p className="film-caption">{d.caption}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Principles() {
  return (
    <div className="film-principles">
      <ChapterMark n="V" title="How I work." />
      <ol className="film-principle-list">
        {filmPrinciples.map((p, i) => (
          <li key={p} style={{ "--i": i } as React.CSSProperties}>{p}</li>
        ))}
      </ol>
    </div>
  )
}

function Now({ onClose, onReplay }: { onClose?: () => void; onReplay?: () => void }) {
  return (
    <div className="film-now">
      <h2 className="film-now-title">Now.</h2>
      <p className="film-now-line">{credits.availability}.</p>
      <div className="film-now-actions">
        <Link href="/#work" className="film-cta film-cta-primary" onClick={onClose}>
          See the work <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <a href={credits.resume} className="film-cta" target="_blank" rel="noopener noreferrer">
          Résumé <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <a href={`mailto:${credits.email}`} className="film-cta">
          Email me <Mail size={18} aria-hidden="true" />
        </a>
        <button type="button" className="film-cta film-cta-quiet" onClick={onReplay}>
          Watch again <RotateCcw size={16} aria-hidden="true" />
        </button>
      </div>
      <p className="film-credits">Written, designed, built and deployed by {credits.name}. Thanks for watching.</p>
    </div>
  )
}
