import { experiences } from "@/data/experience"

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="portfolio-shell">
        <div className="section-heading"><div><p className="section-kicker">Experience</p><h2 id="experience-title" className="section-title">Where I&apos;ve been useful.</h2></div><p className="section-note">My current work spans EuroAfrique Corporate Skills and its sister companies, Chania Publishers and AfriAsia Career Development Center.</p></div>
        <div className="timeline">
          {experiences.map((experience) => (
            <article key={`${experience.company}-${experience.role}`} className="timeline-item">
              <time>{experience.duration}</time>
              <div><h3>{experience.role} · {experience.company}</h3>{experience.group && <p className="timeline-group">{experience.group}</p>}<p>{experience.impact[0]}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
