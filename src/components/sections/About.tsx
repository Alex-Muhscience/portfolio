import { about } from "@/data/about"
import { education } from "@/data/education"
import { SectionHeading } from "@/components/shared/SectionHeading"

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="shell about-layout">
        <SectionHeading id="about-title" index="05" label="About" title="Full-stack by responsibility, not only by tools." />
        <div className="about-copy reveal">
          {about.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
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
