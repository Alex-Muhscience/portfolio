'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { flushSync } from "react-dom"
import { Check, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { themes } from "@/lib/themes"

const emptySubscribe = () => () => {}

export function ThemeSwitcher() {
  const { theme: active, setTheme } = useTheme()
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("pointerdown", onPointerDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("pointerdown", onPointerDown)
    }
  }, [isOpen])

  if (!mounted) {
    return <span className="icon-button icon-button-placeholder" aria-hidden="true" />
  }

  // The new palette spreads out from the swatch that was clicked, where the browser supports view transitions.
  const choose = (id: string, event: React.MouseEvent) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!document.startViewTransition || reduceMotion) {
      setTheme(id)
      return
    }
    const root = document.documentElement
    root.style.setProperty("--reveal-x", `${event.clientX}px`)
    root.style.setProperty("--reveal-y", `${event.clientY}px`)
    root.setAttribute("data-theme-switch", "")
    const transition = document.startViewTransition(() => flushSync(() => setTheme(id)))
    transition.finished.finally(() => root.removeAttribute("data-theme-switch"))
  }

  return (
    <div className="theme-picker" ref={containerRef}>
      <button
        type="button"
        className="icon-button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="theme-menu"
        aria-label="Choose colour theme"
        title="Choose colour theme"
      >
        <Palette size={18} aria-hidden="true" />
      </button>
      <div id="theme-menu" className="theme-menu" role="group" aria-label="Colour theme" hidden={!isOpen}>
        {themes.map(({ id, name, swatch }) => (
          <button key={id} type="button" onClick={(event) => choose(id, event)} aria-pressed={active === id}>
            <span className="theme-swatch" aria-hidden="true">
              {swatch.map((color) => <span key={color} style={{ background: color }} />)}
            </span>
            {name}
            {active === id && <Check size={14} aria-hidden="true" />}
          </button>
        ))}
      </div>
    </div>
  )
}
