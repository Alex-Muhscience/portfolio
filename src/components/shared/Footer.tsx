import { Logo } from "./Logo"

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="portfolio-shell footer-row">
        <Logo compact />
        <span>Full-Stack Developer · Nairobi, Kenya</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
