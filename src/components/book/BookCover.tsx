import { ArrowRight } from "lucide-react"
import { site } from "@/lib/site"
import type { BookPage } from "./Book"

/**
 * The front cover of the closed book. Only shown in book view; in scroll view the
 * introduction is the top of the page. Its links are ordinary /#… anchors, which
 * the book turns into page flips.
 */
export function BookCover({ chapters }: { chapters: BookPage[] }) {
  return (
    <div className="cover" aria-label="Front cover">
      <p className="cover-kicker">Portfolio</p>

      <div className="cover-title">
        <p className="cover-name">{site.name}</p>
        <p className="cover-role">{site.role}</p>
        <p className="cover-line">Production web applications, business systems and the infrastructure they run on.</p>
      </div>

      <nav className="cover-contents" aria-label="Contents">
        <p>Contents</p>
        <ol>
          {chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <a href={`/#${chapter.id}`}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {chapter.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <p className="cover-open">
        <a href={`/#${chapters[0].id}`} className="cover-button">
          Open the book <ArrowRight size={16} aria-hidden="true" />
        </a>
        <span>{site.location}</span>
      </p>
    </div>
  )
}
