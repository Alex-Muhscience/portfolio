interface SectionHeadingProps {
  id: string
  index: string
  label: string
  title: string
  note?: string
}

export function SectionHeading({ id, index, label, title, note }: SectionHeadingProps) {
  return (
    <div className="section-heading reveal">
      <p className="kicker"><span>{index}</span>{label}</p>
      <h2 id={id}>{title}</h2>
      {note && <p className="section-note">{note}</p>}
    </div>
  )
}
