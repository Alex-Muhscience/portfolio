import Link from "next/link"
import { engineeringAreas } from "@/data/engineering"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { TechList } from "@/components/shared/TechList"

export function Engineering() {
  return (
    <section id="engineering" className="section" aria-labelledby="engineering-title">
      <div className="shell">
        <SectionHeading
          id="engineering-title"
          index="02"
          label="How I build"
          title="Depth across the stack, by area."
          note="Not every tool appears on every project. Each area links to the case study where that work is easiest to see."
        />

        <div className="area-table">
          {engineeringAreas.map((item) => (
            <article key={item.area} className="area-row reveal">
              <h3>{item.area}</h3>
              <p>{item.practice}</p>
              <div className="area-side">
                <TechList items={item.tools} label={`${item.area} tools`} />
                <p className="area-evidence">
                  Seen in <Link href={`/work/${item.evidence.slug}`}>{item.evidence.label}</Link>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
