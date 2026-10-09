import { Check } from "lucide-react"
import { flowGuarantees, systemFlow } from "@/data/engineering"
import { TechList } from "@/components/shared/TechList"

/**
 * The shape every platform I run shares, drawn as a request travelling from the client to the data.
 * Pure HTML and CSS: a packet runs along each connector in turn and each stage lights up as it arrives.
 * With reduced motion the diagram is static.
 */
export function SystemFlow() {
  return (
    <section className="section flow-band" aria-labelledby="flow-title">
      <div className="shell">
        <div className="flow-head reveal">
          <p className="kicker">One owner, end to end</p>
          <h2 id="flow-title">From the first request to the last backup.</h2>
          <p className="section-note">
            Every platform I run follows the same path. I design, build and operate each stage, so there is no hand-off
            where things fall through.
          </p>
        </div>

        <ol className="flow" style={{ "--stages": systemFlow.length } as React.CSSProperties}>
          {systemFlow.map((stage, index) => (
            <li key={stage.name} className="flow-node" style={{ "--i": index } as React.CSSProperties}>
              <span className="flow-step" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{stage.name}</h3>
              <p>{stage.role}</p>
              <TechList items={stage.tools} label={`${stage.name} tools`} />
              {index < systemFlow.length - 1 && (
                <span className="flow-link" aria-hidden="true"><span className="flow-packet" /></span>
              )}
            </li>
          ))}
        </ol>

        <ul className="flow-guarantees">
          {flowGuarantees.map((item) => (
            <li key={item}><Check size={16} aria-hidden="true" /> {item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
