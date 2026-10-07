import { education } from "@/data/education"
import { SectionHeading } from "@/components/shared/SectionHeading"

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="shell about-layout">
        <SectionHeading id="about-title" index="05" label="About" title="Full-stack by responsibility, not only by tools." />
        <div className="about-copy reveal">
          <p>
            I am Alex Murimi Kamau, a full-stack developer and software engineer based in Nairobi. Most of my work has been
            as the only engineer on a product, which means the whole path is mine: understanding what the business needs,
            designing the data model, building the interface and the API, integrating payments, deploying it and fixing it
            when something breaks in production.
          </p>
          <p>
            That has shaped how I work. I would rather ship a smaller system I can operate than a larger one I can only
            demonstrate. I came to web development through security and networking, so authentication, authorization and
            infrastructure have never felt like someone else&apos;s job.
          </p>
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
