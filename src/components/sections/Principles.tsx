import { principles } from "@/data/engineering"
import { SectionHeading } from "@/components/shared/SectionHeading"

export function Principles() {
  return (
    <section id="principles" className="section section-inset" aria-labelledby="principles-title">
      <div className="shell principles-layout">
        <SectionHeading id="principles-title" index="03" label="Engineering principles" title="The defaults I work from." />
        <ol className="principle-list">
          {principles.map((principle) => (
            <li key={principle.title} className="reveal">
              <h3>{principle.title}</h3>
              <p>{principle.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
