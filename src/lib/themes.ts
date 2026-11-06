/** Colour themes. Tokens for each live in src/styles/tokens.css under [data-theme="…"]. */
export const defaultTheme = "light"

export const themes = [
  { id: "light", name: "Light" },
  { id: "dark", name: "Dark" },
] as const

export type ThemeId = (typeof themes)[number]["id"]

export const themeIds = themes.map((theme) => theme.id)

/**
 * Earlier versions offered more palettes. A visitor who picked one of them still has it
 * stored, so map it to the closest remaining theme instead of rendering an unstyled value.
 */
export const legacyThemes: Record<string, ThemeId> = {
  navy: "dark",
  midnight: "dark",
  forest: "dark",
  slate: "light",
  sepia: "light",
}
