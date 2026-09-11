'use client'

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)

  if (!mounted) {
    return <span className="theme-toggle-placeholder" aria-hidden="true" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  )
}
