import { capabilities } from "@/data/engineering"

export function Capabilities() {
  return (
    <section className="section section-tight" aria-labelledby="capabilities-title">
      <div className="shell">
        <h2 id="capabilities-title" className="sr-only">What I do</h2>
        <ol className="capability-grid">
          {capabilities.map((capability, index) => (
            <li key={capability.title} className="reveal">
              <span className="capability-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
