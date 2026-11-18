import { about } from "@/data/about"
import { education } from "@/data/education"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { ScrollWords } from "@/components/shared/ScrollWords"

export function About() {
  return (
    <section id="about" className="section section-warm" aria-labelledby="about-title">
      <div className="shell about-layout">
        <SectionHeading id="about-title" index="05" label="About" title="Full-stack by responsibility, not only by tools." />
        <div className="about-copy reveal">
          {/* The lead lights up word by word as it is read; the rest follows as plain text. */}
          <ScrollWords text={about[0]} className="about-lead" />
          {about.slice(1).map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
          <dl className="education">
            {education.map((item) => (
              <div key={item.institution}>
                <dt>Education</dt>
                <dd>
                  <strong>{item.qualification}</strong>, {item.institution}. {item.period}. {item.result}.
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
