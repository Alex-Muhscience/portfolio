export function TechList({ items, label = "Technology" }: { items: readonly string[]; label?: string }) {
  return (
    <ul className="tech-list" aria-label={label}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}
