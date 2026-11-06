import { techIcon } from "@/data/tech-icons"

/** Relative luminance of a hex colour, 0 (black) to 1 (white). */
function luminance(hex: string) {
  const channel = (value: number) => {
    const v = value / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  }
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16))
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

/**
 * Tools as chips with their brand logo. Logos that are nearly black or nearly white would vanish
 * in one of the themes, so those take the text colour instead.
 */
export function TechLogoList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul className="tech-logos" aria-label={label}>
      {items.map((item) => {
        const icon = techIcon(item)
        const lum = icon ? luminance(icon.hex) : 0
        const colour = icon && lum > 0.06 && lum < 0.75 ? `#${icon.hex}` : "currentColor"
        return (
          <li key={item}>
            {icon && (
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">
                <path d={icon.path} fill={colour} />
              </svg>
            )}
            {item}
          </li>
        )
      })}
    </ul>
  )
}
