"use client"

import { BookOpen } from "lucide-react"
import { setViewMode } from "@/lib/view-mode"

/** A gentle pointer to the book view, which otherwise hides behind a header icon. */
export function BookPrompt() {
  return (
    <button type="button" className="book-prompt" onClick={() => setViewMode("book")}>
      <BookOpen size={16} aria-hidden="true" />
      <span>Prefer something different? <strong>Read this portfolio as a book</strong></span>
    </button>
  )
}
