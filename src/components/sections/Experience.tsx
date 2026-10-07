import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { earlierRoles, experience } from "@/data/experience"
import { SectionHeading } from "@/components/shared/SectionHeading"

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="shell">
        <SectionHeading
          id="experience-title"
          index="04"
          label="Experience"
          title="Where I have worked."
          note="My current role is a single ongoing engagement that spans three businesses, each with its own platform. The engineering detail for each is in its case study."
        />

        <ol className="experience-list">
          {experience.map((item) => (
            <li key={item.organisation} className="experience-item reveal">
              <p className="experience-period">{item.period}</p>
              <div>
                <h3>
                  {item.role} <span>· {item.organisation}</span>
                </h3>
                <p className="experience-location">{item.location}</p>
                {item.context && <p className="experience-context">{item.context}</p>}
                <ul className="experience-highlights">
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>

                {item.responsibilities && (
                  <>
                    <h4 className="experience-label">Scope</h4>
                    <ul className="scope-list">
                      {item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
                    </ul>
                  </>
                )}

                {item.platforms && (
                  <>
                    <h4 className="experience-label">Platforms within this role</h4>
                    <ul className="platform-list">
                      {item.platforms.map((platform) => (
                        <li key={platform.business}>
                          <p className="platform-since">{platform.since}</p>
                          <p className="platform-name">
                            <strong>{platform.business}</strong>
                            <span>{platform.product}</span>
                          </p>
                          <p className="platform-summary">{platform.summary}</p>
                          <p className="experience-links">
                            <Link href={`/work/${platform.caseStudy}`} className="text-link" aria-label={`Case study: ${platform.business}`}>
                              Case study <ArrowRight size={14} aria-hidden="true" />
                            </Link>
                            <a href={platform.website} className="text-link" target="_blank" rel="noopener noreferrer" aria-label={`${platform.business} website (opens in a new tab)`}>
                              Website <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>

        <h3 className="subheading">Earlier</h3>
        <ul className="earlier-list">
          {earlierRoles.map((item) => (
            <li key={item.role}>
              <span className="experience-period">{item.period}</span>
              <span><strong>{item.role}</strong> · {item.company}. {item.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
