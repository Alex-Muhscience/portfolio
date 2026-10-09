import { ArrowRight, ArrowUpRight, FileText, Mail } from "lucide-react"
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/shared/BrandIcons"
import { site } from "@/lib/site"
import { SectionHeading } from "@/components/shared/SectionHeading"

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail, external: false },
  { label: "LinkedIn", value: "linkedin.com/in/alex-m-kamau-20015b340", href: site.links.linkedin, icon: LinkedInIcon, external: true },
  { label: "GitHub", value: "github.com/Alex-Muhscience", href: site.links.github, icon: GitHubIcon, external: true },
  { label: "WhatsApp", value: site.phone, href: site.links.whatsapp, icon: WhatsAppIcon, external: true },
  { label: "Résumé", value: "View online", href: site.links.resume, icon: FileText, external: true },
]

export function Contact() {
  return (
    <section id="contact" className="section contact-band" aria-labelledby="contact-title">
      <div className="shell contact-layout">
        <div>
          <SectionHeading id="contact-title" index="06" label="Contact" title="Have a system that needs an owner?" />
          <p className="contact-note reveal">
            I am open to full-stack and backend engineering roles and to projects where reliability matters, remote or in
            Nairobi. Email is the most reliable way to reach me.
          </p>
          <div className="contact-actions">
            <a href={`mailto:${site.email}`} className="button button-primary">
              Email me <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href={site.links.resume} className="button" target="_blank" rel="noopener noreferrer">
              Résumé <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
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
