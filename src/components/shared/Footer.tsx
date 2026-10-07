import Link from "next/link"
import { navigation, site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-row">
        <p>
          <strong>{site.name}</strong>
          <span>{site.role} · {site.location}</span>
        </p>
        <nav aria-label="Footer">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>{item.name}</Link>
          ))}
        </nav>
        <ul className="footer-links">
          <li><a href={`mailto:${site.email}`}>Email</a></li>
          <li><a href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </footer>
  )
}
