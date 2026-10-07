import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="shell">
        <p className="kicker"><span>404</span>Not found</p>
        <h1>This page does not exist.</h1>
        <p className="section-note">The address may be out of date. Older project pages have moved to the work section.</p>
        <div className="hero-actions">
          <Link href="/" className="button button-primary">Go to the homepage</Link>
          <Link href="/work" className="button">Browse case studies <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}
