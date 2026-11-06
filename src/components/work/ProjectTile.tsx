import { ViewTransition } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/data/projects"
import { getScreenshot } from "@/data/screenshots"
import { BrowserFrame, PhoneFrame } from "./DeviceFrames"
import { StatusBadge } from "./StatusBadge"

export type TileVariant = "lead" | "standard" | "wide"

/**
 * One project in the Selected work grid. The whole tile is the link to the case study
 * (the title's link is stretched over it), so there is a single, predictable target.
 */
export function ProjectTile({ project, variant }: { project: Project; variant: TileVariant }) {
  const shot = getScreenshot(project.slug)
  const highlight = project.highlights?.[0]
  const titleId = `tile-${project.slug}`

  return (
    <article className={`tile tile-${variant} reveal`} aria-labelledby={titleId}>
      <div className="tile-visual">
        {shot ? (
          <>
            <ViewTransition name={`shot-${project.slug}`} share="morph" default="none">
              <BrowserFrame
                shot={shot}
                sizes={variant === "lead" ? "(min-width: 60rem) 40rem, 92vw" : "(min-width: 60rem) 30rem, 92vw"}
                priority={variant === "lead"}
              />
            </ViewTransition>
            {variant === "lead" && <PhoneFrame shot={shot} />}
          </>
        ) : (
          <LayerVisual project={project} />
        )}
      </div>

      <div className="tile-body">
        <StatusBadge status={project.status} label={project.statusLabel} />
        <ViewTransition name={`title-${project.slug}`} share="morph" default="none">
          <h3 id={titleId}>
            <Link href={`/work/${project.slug}`} className="tile-link">{project.title}</Link>
          </h3>
        </ViewTransition>
        <p className="tile-summary">{project.summary}</p>
        {highlight && (
          <p className="tile-highlight">
            <strong>{highlight.value}</strong> {highlight.label}
          </p>
        )}
        <span className="tile-cta" aria-hidden="true">Case study <ArrowRight size={15} /></span>
      </div>
    </article>
  )
}

/** For projects with nothing public to screenshot: the system's layers, drawn from the case study data. */
function LayerVisual({ project }: { project: Project }) {
  return (
    <div className="layer-visual" aria-hidden="true">
      {project.system.map((layer) => (
        <div key={layer.layer} className="layer-row">
          <span className="layer-name">{layer.layer}</span>
          <span className="layer-nodes">
            {layer.nodes.map((node) => <span key={node.name}>{node.name}</span>)}
          </span>
        </div>
      ))}
    </div>
  )
}
