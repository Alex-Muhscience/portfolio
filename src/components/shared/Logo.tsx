import Link from "next/link"
import { site } from "@/lib/site"

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label={`${site.name}, home`}>
      <span className="logo-mark" aria-hidden="true">AMK</span>
      <span className="logo-text">
        {site.name}
        <small>{site.role}</small>
      </span>
    </Link>
  )
}
