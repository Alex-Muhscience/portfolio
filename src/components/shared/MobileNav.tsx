'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { navigation, site } from "@/lib/site"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="icon-button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" hidden={!isOpen}>
        <ul>
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={close}>{item.name}</Link>
            </li>
          ))}
          <li>
            <a href={site.links.resume} target="_blank" rel="noopener noreferrer" onClick={close}>Résumé</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
