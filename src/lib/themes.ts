/** Colour themes. Tokens for each live in src/styles/tokens.css under [data-theme="…"]. */
export const defaultTheme = "navy"

export const themes = [
  { id: "navy", name: "Dark" },
  { id: "light", name: "Light" },
] as const

export type ThemeId = (typeof themes)[number]["id"]

export const themeIds = themes.map((theme) => theme.id)

/**
 * Earlier versions offered more palettes. A visitor who picked one of them still has it
 * stored, so map it to the closest remaining theme instead of rendering an unstyled value.
 */
export const legacyThemes: Record<string, ThemeId> = {
  dark: "navy",
  midnight: "navy",
  forest: "navy",
  slate: "light",
  sepia: "light",
}
