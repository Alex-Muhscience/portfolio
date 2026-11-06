import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { engineeringAreas } from "@/data/engineering"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { TechLogoList } from "@/components/shared/TechLogoList"

export function Engineering() {
  return (
    <section id="engineering" className="section texture-grid" aria-labelledby="engineering-title">
      <div className="shell">
        <SectionHeading
          id="engineering-title"
          index="02"
          label="How I build"
          title="Depth across the stack, by area."
          note="Not every tool appears on every project. Each area links to the case study where that work is easiest to see."
        />

        <div className="area-grid">
          {engineeringAreas.map((item) => (
            <article key={item.area} className="area-card reveal">
              <h3>{item.area}</h3>
              <TechLogoList items={item.tools} label={`${item.area} tools`} />
              <p>{item.practice}</p>
              <Link href={`/work/${item.evidence.slug}`} className="area-evidence">
                Seen in <strong>{item.evidence.label}</strong> <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
