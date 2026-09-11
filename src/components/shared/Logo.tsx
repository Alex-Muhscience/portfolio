import Link from "next/link"

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`brand-logo${compact ? " brand-logo-compact" : ""}`} aria-label="Alex Murimi Kamau home">
      <span className="brand-logo-mark" aria-hidden="true">
        <span>A</span>
        <span>M</span>
        <span>K</span>
      </span>
      {!compact && (
        <span className="brand-logo-name">
          Alex Murimi Kamau
          <small>Full-Stack Developer</small>
        </span>
      )}
    </Link>
  )
}
