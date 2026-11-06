import { projects } from "@/data/projects"

/**
 * A slow strip of the platforms and products I have built, between the hero and the
 * request path. Decorative: the same names appear as real links in Selected work.
 * The list is drawn twice so the loop is seamless; it stops under reduced motion.
 */
export function Ticker() {
  const names = projects.map((project) => project.title)
  const run = (copy: number) => (
    <ul className="ticker-run" aria-hidden={copy === 1 ? true : undefined}>
      {names.map((name) => <li key={`${copy}-${name}`}>{name}</li>)}
    </ul>
  )

  return (
    <div className="ticker" role="region" aria-label="Platforms and products I have built">
      <div className="ticker-track">
        {run(0)}
        {run(1)}
      </div>
    </div>
  )
}
