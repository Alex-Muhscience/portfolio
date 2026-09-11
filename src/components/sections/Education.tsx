import { education } from "@/data/education"

export function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="portfolio-shell">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Education</p>
            <h2 id="education-title" className="section-title">The foundation behind the work.</h2>
          </div>
        </div>
        <div className="education-list">
          {education.map((item) => (
            <article key={item.institution} className="education-item">
              <div>
                <p className="education-period">{item.duration}</p>
                <h3>{item.institution}</h3>
                <p>{item.location}</p>
              </div>
              <div>
                <p className="education-qualification">{item.qualification}</p>
                <p className="education-result">{item.result}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
