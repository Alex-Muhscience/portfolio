import { ArrowUpRight, FileText, Github, Linkedin, Mail, MessageCircle } from "lucide-react"
import { site } from "@/lib/site"
import { SectionHeading } from "@/components/shared/SectionHeading"

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail, external: false },
  { label: "LinkedIn", value: "linkedin.com/in/alex-mkamau-20015b340", href: site.links.linkedin, icon: Linkedin, external: true },
  { label: "GitHub", value: "github.com/Alex-Muhscience", href: site.links.github, icon: Github, external: true },
  { label: "WhatsApp", value: site.phone, href: site.links.whatsapp, icon: MessageCircle, external: true },
  { label: "Résumé", value: "View online", href: site.links.resume, icon: FileText, external: true },
]

export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="shell contact-layout">
        <div>
          <SectionHeading id="contact-title" index="06" label="Contact" title="Get in touch." />
          <p className="contact-note reveal">
            I am open to conversations about full-stack and product engineering roles and projects, remote or in Nairobi.
            Email is the most reliable way to reach me.
          </p>
          <dl className="meta-list contact-meta">
            <div>
              <dt>Location</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt>Time zone</dt>
              <dd>{site.timezone}</dd>
            </div>
          </dl>
        </div>

        <ul className="contact-list">
          {channels.map(({ label, value, href, icon: Icon, external }) => (
            <li key={label}>
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Icon size={18} aria-hidden="true" />
                <span className="contact-label">{label}</span>
                <span className="contact-value">{value}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
