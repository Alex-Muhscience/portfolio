import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { site } from "@/lib/site"
import type { BookPage } from "./Book"

const SEAL_TEXT = "FULL-STACK ENGINEER · NAIROBI · TECHNICAL OWNER · "

/**
 * The front cover of the closed book: blue cloth with a lettered spine, a scarlet ribbon,
 * a duotone portrait in an arched window and a turning seal. Only shown in book view; in
 * scroll view the introduction is the top of the page. Its links are ordinary /#… anchors,
 * which the book turns into page flips.
 */
export function BookCover({ chapters }: { chapters: BookPage[] }) {
  const [first, ...rest] = site.name.split(" ")

  return (
    <div className="cover" aria-label="Front cover">
      <span className="cover-spine" aria-hidden="true">{site.name} · Portfolio · First edition</span>
      <span className="cover-ribbon" aria-hidden="true" />

      <p className="cover-kicker">
        <span>Portfolio · Vol. I</span>
        <svg className="cover-seal" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path id="seal-ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <circle cx="50" cy="50" r="48" />
          <circle cx="50" cy="50" r="27" />
          <text><textPath href="#seal-ring" startOffset="0">{SEAL_TEXT.repeat(2)}</textPath></text>
          <text className="cover-seal-mark" x="50" y="55" textAnchor="middle">AMK</text>
        </svg>
      </p>

      <div className="cover-hero">
        <div className="cover-portrait" aria-hidden="true">
          <Image src="/images/profile.jpg" alt="" fill sizes="12rem" />
        </div>
        <div className="cover-title">
          <p className="cover-name">
            <span>{first}</span> {rest.join(" ")}
          </p>
          <p className="cover-role">{site.role}</p>
        </div>
      </div>

      <p className="cover-line">I design, build and run the systems businesses depend on.</p>

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
