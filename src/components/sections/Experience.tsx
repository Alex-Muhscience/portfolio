"use client"

import { ExperienceTimeline } from "@/components/ExperienceTimeline"
import { experiences } from "@/data/experience"

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-muted/50">
      <ExperienceTimeline experiences={experiences} />
    </section>
  )
}

export default Experience
