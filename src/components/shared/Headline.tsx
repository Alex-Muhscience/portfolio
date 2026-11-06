/** The homepage headline, shared by the scrolling page and the book's introduction. */
export function Headline() {
  return (
    <>
      I design, build and{" "}
      <em className="mark">
        run
        <svg className="mark-line" viewBox="0 0 120 16" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M3 11 C 28 4, 62 3, 117 8" />
        </svg>
      </em>{" "}
      the systems businesses depend on.
    </>
  )
}
