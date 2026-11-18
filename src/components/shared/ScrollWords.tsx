/**
 * A statement that lights up word by word as it scrolls into view (see scroll.css).
 * Each word is its own span with its own view timeline, so a line brightens as it
 * reaches reading height. The text stays one continuous sentence for screen readers
 * and search engines, and is fully visible where scroll-driven animation is not
 * supported or reduced motion is requested.
 */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(/(\s+)/)

  return (
    <p className={["scroll-words", className].filter(Boolean).join(" ")}>
      {words.map((part, i) => (/^\s+$/.test(part) ? part : <span key={i} className="sw">{part}</span>))}
    </p>
  )
}
