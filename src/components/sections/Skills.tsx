import { Code2, Database, GitBranch, Layers3 } from "lucide-react"

const groups = [
  { title: "Frontend", icon: Code2, skills: ["React", "Next.js", "JavaScript", "TypeScript"] },
  { title: "Backend", icon: Database, skills: ["Laravel", "PHP", "Node.js", "Python", "Flask", "FastAPI"] },
  { title: "Infrastructure", icon: Layers3, skills: ["Docker", "Linux", "Redis", "Cloudflare", "Vercel"] },
  { title: "Tools", icon: GitBranch, skills: ["MySQL", "PostgreSQL", "Git", "GitHub Actions", "REST APIs"] },
]

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="portfolio-shell">
        <div className="section-heading">
          <div><p className="section-kicker">Toolkit</p><h2 id="skills-title" className="section-title">The tools behind the work.</h2></div>
          <p className="section-note">A practical stack shaped by shipping products, operating systems, and learning what holds up in production.</p>
        </div>
        <div className="skills-grid">
          {groups.map(({ title, icon: Icon, skills }) => (
            <div key={title} className="skill-group">
              <h3><Icon size={16} aria-hidden="true" /> {title}</h3>
              <ul className="skill-list">{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
