"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { flowGuarantees, systemFlow } from "@/data/engineering"

/**
 * The shape every platform I run shares, drawn as a request travelling from the client to the data.
 * Each stage is a tab: selecting one (click, tap, hover or arrow keys) shows where that stage is
 * easiest to see in real projects. The travelling packet is CSS and stops under reduced motion.
 */
export function SystemFlow() {
  const [active, setActive] = useState(3)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const stage = systemFlow[active]

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = systemFlow.length - 1
    const target =
      event.key === "ArrowRight" || event.key === "ArrowDown" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null
    if (target === null) return
    event.preventDefault()
    setActive(target)
    tabs.current[target]?.focus()
  }

  return (
    <section className="section flow-band texture-grid" aria-labelledby="flow-title">
      <div className="shell">
        <div className="flow-head reveal">
          <p className="kicker">One owner, end to end</p>
          <h2 id="flow-title">From the first request to the last backup.</h2>
          <p className="section-note">
            Every platform I run follows the same path. I design, build and operate each stage, so there is no hand-off
            where things fall through. Pick a stage to see where it shows up in my work.
          </p>
        </div>

        <ol className="flow" role="tablist" aria-label="Stages of a request" style={{ "--stages": systemFlow.length } as React.CSSProperties}>
          {systemFlow.map((item, index) => (
            <li key={item.name} className="flow-node" data-active={index === active || undefined} style={{ "--i": index } as React.CSSProperties}>
              <button
                ref={(el) => { tabs.current[index] = el }}
                type="button"
                role="tab"
                id={`flow-tab-${index}`}
                aria-selected={index === active}
                aria-controls="flow-panel"
                tabIndex={index === active ? 0 : -1}
                className="flow-tab"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className="flow-step" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="flow-name">{item.name}</span>
                <span className="flow-role">{item.role}</span>
                <span className="flow-tools">
                  {item.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </span>
              </button>
              {index < systemFlow.length - 1 && (
                <span className="flow-link" aria-hidden="true"><span className="flow-packet" /></span>
              )}
            </li>
          ))}
        </ol>

        <div id="flow-panel" role="tabpanel" aria-labelledby={`flow-tab-${active}`} className="flow-panel" key={stage.name}>
          <p className="flow-panel-title">
            <span>{String(active + 1).padStart(2, "0")}</span> {stage.name}, in practice
          </p>
          <ul className="flow-examples">
            {stage.examples.map((example) => (
              <li key={example.slug + example.detail}>
                <Link href={`/work/${example.slug}`}>
                  <strong>{example.project}</strong>
                  <span>{example.detail}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="flow-guarantees">
          {flowGuarantees.map((item) => (
            <li key={item}><Check size={16} aria-hidden="true" /> {item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
