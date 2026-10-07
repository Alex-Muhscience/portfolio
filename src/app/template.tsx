/** Remounts on every navigation, so each route arrives with a page-turn (CSS only, see base.css). */
export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="page-turn">{children}</div>
}
