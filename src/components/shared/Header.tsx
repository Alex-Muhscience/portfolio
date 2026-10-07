import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { navigation, site } from "@/lib/site"
import { Logo } from "./Logo"
import { MobileNav } from "./MobileNav"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { ViewModeToggle } from "./ViewModeToggle"

export function Header() {
  return (
    <header className="site-header">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="shell header-row">
        <Logo />
        <nav className="site-nav" aria-label="Primary">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>{item.name}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-resume" href={site.links.resume} target="_blank" rel="noopener noreferrer">
            Résumé <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <ViewModeToggle />
          <ThemeSwitcher />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
