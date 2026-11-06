"use client"

import { useEffect, useState } from "react"

export interface CaseNavItem {
  id: string
  label: string
}

/**
 * "On this page" bar for a case study. It sticks under the site header and marks the section
 * being read. Without JavaScript it is still a working list of jump links.
 */
export function CaseNav({ items }: { items: CaseNavItem[] }) {
  const [current, setCurrent] = useState(items[0]?.id)

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        setCurrent(top.target.id)
      },
      { rootMargin: "-30% 0px -60% 0px" },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="case-nav" aria-label="On this page">
      <div className="shell">
        <ol>
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} aria-current={current === item.id ? "location" : undefined}>{item.label}</a>
            </li>
          ))}
        </ol>
      </div>
      <span className="reading-progress" aria-hidden="true" />
    </nav>
  )
}
