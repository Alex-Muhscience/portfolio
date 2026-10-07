/** Colour themes. Tokens for each live in src/styles/tokens.css under [data-theme="…"]. */
export const defaultTheme = "navy"

export const themes = [
  { id: "navy", name: "Navy", swatch: ["#0a1736", "#eef1f8", "#ff3b1f"] },
  { id: "light", name: "Paper", swatch: ["#fafaf8", "#18181a", "#c2361c"] },
  { id: "slate", name: "Slate", swatch: ["#f4f6f9", "#0f172a", "#2456d6"] },
  { id: "sepia", name: "Sepia", swatch: ["#f4ecd8", "#2b2118", "#9a3412"] },
  { id: "dark", name: "Ink", swatch: ["#0f0f11", "#ededea", "#ff8a6b"] },
  { id: "midnight", name: "Midnight", swatch: ["#0b1220", "#e6ecf7", "#5cc8ff"] },
  { id: "forest", name: "Forest", swatch: ["#0e1512", "#e8efe9", "#f2b84b"] },
] as const

export const themeIds = themes.map((theme) => theme.id)
