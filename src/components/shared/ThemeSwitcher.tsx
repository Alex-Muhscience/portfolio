'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"

const themes = [
  { name: "light", label: "Light", color: "bg-yellow-400" },
  { name: "dark", label: "Dark", color: "bg-slate-800" },
  { name: "purple", label: "Purple", color: "bg-purple-600" },
  { name: "red", label: "Red", color: "bg-red-500" },
  { name: "green", label: "Green", color: "bg-green-500" },
  { name: "orange", label: "Orange", color: "bg-orange-500" },
  { name: "blue-light", label: "Blue Light", color: "bg-blue-500" }
]

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (theme: string) => {
    if (theme === "dark" || theme === "purple") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    document.documentElement.setAttribute("data-theme", theme)
  }

  const switchTheme = () => {
    const currentIndex = themes.findIndex(t => t.name === currentTheme)
    const nextIndex = (currentIndex + 1) % themes.length
    const nextTheme = themes[nextIndex]

    setCurrentTheme(nextTheme.name)
    applyTheme(nextTheme.name)
    localStorage.setItem("theme", nextTheme.name)
  }

  const currentThemeData = themes.find(t => t.name === currentTheme)

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchTheme}
      className="gap-2"
      title={`Current theme: ${currentThemeData?.label}. Click to switch.`}
    >
      <div className={`w-3 h-3 rounded-full ${currentThemeData?.color}`} />
      <Palette className="w-4 h-4" />
    </Button>
  )
}
