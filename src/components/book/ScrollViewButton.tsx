"use client"

import type { ReactNode } from "react"
import { setViewMode } from "@/lib/view-mode"

export function ScrollViewButton({ children }: { children: ReactNode }) {
  return (
    <button type="button" className="back-link" onClick={() => setViewMode("scroll")}>
      {children}
    </button>
  )
}
