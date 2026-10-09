'use client'

import { useSyncExternalStore } from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { legacyThemes, type ThemeId } from "@/lib/themes"

const emptySubscribe = () => () => {}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)

  if (!mounted) {
    return <span className="icon-button icon-button-placeholder" aria-hidden="true" />
  }

  const active: ThemeId = theme === "light" || legacyThemes[theme ?? ""] === "light" ? "light" : "navy"
  const next: ThemeId = active === "light" ? "navy" : "light"
  const label = next === "light" ? "Switch to light theme" : "Switch to dark theme"

  // The new palette spreads out from the button, where the browser supports view transitions.
  const toggle = (event: React.MouseEvent) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!document.startViewTransition || reduceMotion) {
      setTheme(next)
      return
    }
    const root = document.documentElement
    root.style.setProperty("--reveal-x", `${event.clientX}px`)
    root.style.setProperty("--reveal-y", `${event.clientY}px`)
    root.setAttribute("data-theme-switch", "")
    const transition = document.startViewTransition(() => flushSync(() => setTheme(next)))
    transition.finished.finally(() => root.removeAttribute("data-theme-switch"))
  }

  return (
    <button type="button" className="icon-button theme-toggle" onClick={toggle} aria-label={label} title={label}>
      {next === "light" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}
