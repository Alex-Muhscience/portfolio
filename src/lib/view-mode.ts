'use client'

import { useSyncExternalStore } from "react"

export type ViewMode = "book" | "scroll"

const STORAGE_KEY = "view-mode"
const EVENT = "viewmodechange"
/** Too little height for a page to be readable inside the book frame, e.g. a phone held sideways. */
const TOO_SHORT = "(max-height: 30rem)"

/**
 * Runs before hydration so the first paint already has the right layout.
 * Without JS the site is a normal scrolling page.
 */
export const viewModeScript = `try{document.documentElement.dataset.view=localStorage.getItem("${STORAGE_KEY}")==="scroll"||matchMedia("${TOO_SHORT}").matches?"scroll":"book"}catch(e){document.documentElement.dataset.view="book"}`

function preference(): ViewMode {
  try {
    return localStorage.getItem(STORAGE_KEY) === "scroll" ? "scroll" : "book"
  } catch {
    return "book"
  }
}

/** The stored preference, except that very short viewports always scroll. */
function apply() {
  const mode = window.matchMedia(TOO_SHORT).matches ? "scroll" : preference()
  if (document.documentElement.dataset.view === mode) return
  document.documentElement.dataset.view = mode
  window.dispatchEvent(new Event(EVENT))
}

function read(): ViewMode {
  return document.documentElement.dataset.view === "scroll" ? "scroll" : "book"
}

function subscribe(onChange: () => void) {
  const short = window.matchMedia(TOO_SHORT)
  window.addEventListener(EVENT, onChange)
  short.addEventListener("change", apply)
  return () => {
    window.removeEventListener(EVENT, onChange)
    short.removeEventListener("change", apply)
  }
}

export function setViewMode(mode: ViewMode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    // Storage can be unavailable (private mode); fall through and apply for this page only.
    document.documentElement.dataset.view = mode
    window.dispatchEvent(new Event(EVENT))
    return
  }
  apply()
}

/** Server and first client render report "scroll" so markup matches; the real value arrives right after hydration. */
export function useViewMode(): ViewMode {
  return useSyncExternalStore(subscribe, read, () => "scroll")
}
