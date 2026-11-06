import { site } from "@/lib/site"
import type { BookPage } from "./Book"

/**
 * The left-hand page of a spread: running head, chapter opener (with its figure) and folio,
 * or a custom page such as the endpaper before the back cover.
 * Also drawn on the back of a turning page, so it must depend on nothing but its props.
 */
export function BookVerso({ page, index }: { page: BookPage; index: number }) {
  if (page.verso) {
    return <div className="book-verso book-endpaper">{page.verso}</div>
  }

  const number = String(index).padStart(2, "0")

  return (
    <div className="book-verso">
      <p className="book-runhead" aria-hidden="true">{site.name}</p>
      <div className="book-opener">
        <span className="book-numeral" aria-hidden="true">{number}</span>
        <p className="book-chapter">Chapter {number}</p>
        <h2 className="book-title">{page.label}</h2>
        {page.summary && <p className="book-summary">{page.summary}</p>}
      </div>
      {page.figure && <div className="book-figure" aria-hidden="true">{page.figure}</div>}
      <p className="book-folio book-folio-verso" aria-hidden="true">{index * 2}</p>
    </div>
  )
}
