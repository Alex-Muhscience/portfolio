'use client'

import { BookOpen, ScrollText } from "lucide-react"
import { setViewMode, useViewMode } from "@/lib/view-mode"

export function ViewModeToggle() {
  const mode = useViewMode()
  const next = mode === "book" ? "scroll" : "book"
  const label = next === "scroll" ? "Read as a scrolling page" : "Read as a book"

  return (
    <button type="button" className="icon-button view-toggle" onClick={() => setViewMode(next)} aria-label={label} title={label}>
      {next === "scroll" ? <ScrollText size={18} aria-hidden="true" /> : <BookOpen size={18} aria-hidden="true" />}
    </button>
  )
}
