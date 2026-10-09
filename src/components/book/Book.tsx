'use client'

import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useViewMode } from "@/lib/view-mode"
import { BookVerso } from "./BookVerso"
import { clamp, drawCover, drawFold, easeInOut, easeOut, resetFold } from "./fold"

export interface BookPage {
  /** Matches the hash used by the navigation, e.g. "work" for /#work. */
  id: string
  label: string
  /** The hard front cover: swings open rigidly instead of folding, and carries no folio. */
  cover?: boolean
  /** One or two sentences for the chapter opener on the left-hand page. */
  summary?: string
}

interface Flip {
  /** The sheet that moves: the lower-numbered of the two pages. */
  top: number
  /** The page it uncovers (forward) or covers again (backward). */
  under: number
  /** "drag" follows a finger; "run" animates from one fold position to another. */
  mode: "drag" | "run"
  /** Fold position, 0 = lying flat, 1 = fully turned. */
  from: number
  to: number
  duration: number
  ease: (t: number) => number
}

interface Gesture {
  x: number
  y: number
  time: number
  width: number
  /** Set once the movement is clearly a horizontal page turn rather than a vertical scroll. */
  turn?: { forward: boolean; target: number }
}

const FLIP_MS = 600
/** Longest step the animation clock takes in one frame (two frames at 60 Hz). */
const MAX_FRAME_MS = 34
const WHEEL_THRESHOLD = 160
const WHEEL_PAUSE_MS = 140
const SWIPE_THRESHOLD = 60

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Wide and tall enough for a two-page spread. Must match the media query in book.css. */
const SPREAD = "(min-width: 64rem) and (min-height: 37.5rem)"

function subscribeSpread(onChange: () => void) {
  const query = window.matchMedia(SPREAD)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

function useSpread() {
  return useSyncExternalStore(subscribeSpread, () => window.matchMedia(SPREAD).matches, () => false)
}

/** What scrolls when a page's content is too tall: the right-hand page in a spread, otherwise the whole page. */
function scrollerOf(page: HTMLElement | null | undefined, spread: boolean) {
  if (!page) return null
  return spread ? (page.querySelector<HTMLElement>(".book-recto") ?? page) : page
}

const folio = (index: number) => String(index).padStart(2, "0")

function indexFromHash(pages: BookPage[]) {
  const index = pages.findIndex((page) => page.id === window.location.hash.slice(1))
  return index === -1 ? 0 : index
}

/**
 * Presents its children as the pages of a book: one at a time, each folded over to reveal the next.
 * Every page stays in the DOM (server-rendered, crawlable). The book is only shown in
 * "book" view mode; otherwise (and without JavaScript) the scrolling page is shown instead.
 * On wide screens each page is a two-page spread and only the right-hand page turns.
 */
export function Book({ pages, children }: { pages: BookPage[]; children: ReactNode }) {
  const isBook = useViewMode() === "book"
  const spread = useSpread()
  const spreadRef = useRef(spread)
  useLayoutEffect(() => {
    spreadRef.current = spread
  }, [spread])
  const [current, setCurrent] = useState(0)
  const [flip, setFlip] = useState<Flip | null>(null)
  const currentRef = useRef(0)
  const progressRef = useRef(0)
  const volumeRef = useRef<HTMLDivElement>(null)
  const curlRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<(HTMLDivElement | null)[]>([])
  const leafRefs = useRef<(HTMLDivElement | null)[]>([])
  const gesture = useRef<Gesture | null>(null)
  const wheel = useRef({ travel: 0, last: 0, lockedUntil: 0, needsPause: false })
  const sheets = Children.toArray(children)

  /** Draws the moving sheet at a fold position. Called every animation frame and on every touch move. */
  const draw = useCallback(
    (top: number, progress: number) => {
      const sheet = pageRefs.current[top]
      const leaf = leafRefs.current[top]
      const volume = volumeRef.current
      if (!sheet || !leaf || !volume) return
      progressRef.current = progress
      if (pages[top].cover) drawCover(sheet, volume, progress)
      else if (curlRef.current) drawFold(leaf, sheet, curlRef.current, progress, spreadRef.current ? 0.5 : 0)
    },
    [pages],
  )

  /** Makes `index` the open page: state, URL and focus. The animation is started separately. */
  const commit = useCallback(
    (index: number, { focus = true, updateUrl = true } = {}) => {
      const forward = index > currentRef.current
      currentRef.current = index
      setCurrent(index)
      // A page you turn to starts at its top; a page you turn back to is where you left it.
      const page = pageRefs.current[index]
      const scroller = scrollerOf(page, spreadRef.current)
      if (scroller && forward) scroller.scrollTop = 0
      if (updateUrl) history.replaceState(null, "", index === 0 ? window.location.pathname : `#${pages[index].id}`)
      if (focus) page?.focus({ preventScroll: true })
    },
    [pages],
  )

  const goTo = useCallback(
    (target: number, { focus = true, animate = true, updateUrl = true } = {}) => {
      const index = Math.max(0, Math.min(pages.length - 1, target))
      const from = currentRef.current
      if (index === from) return
      const forward = index > from
      wheel.current.lockedUntil = performance.now() + FLIP_MS
      wheel.current.travel = 0
      commit(index, { focus, updateUrl })
      if (animate && !prefersReducedMotion()) {
        setFlip({ top: Math.min(from, index), under: Math.max(from, index), mode: "run", from: forward ? 0 : 1, to: forward ? 1 : 0, duration: FLIP_MS, ease: easeInOut })
      } else {
        setFlip(null)
      }
    },
    [pages, commit],
  )

  // Open at the page named in the URL, e.g. arriving from a case study via /#contact.
  useEffect(() => {
    if (!isBook) return
    const index = indexFromHash(pages)
    if (index !== 0) queueMicrotask(() => goTo(index, { animate: false, focus: false, updateUrl: false }))
  }, [isBook, pages, goTo])

  // Moves the sheet. A layout effect, so the first frame is drawn before the browser paints.
  useLayoutEffect(() => {
    if (!flip) return
    const sheet = pageRefs.current[flip.top]
    const leaf = leafRefs.current[flip.top]
    const volume = volumeRef.current
    if (!sheet || !leaf || !volume) return

    let frame = 0
    if (flip.mode === "drag") {
      draw(flip.top, progressRef.current)
    } else {
      // The clock only advances by a normal frame's worth per frame. If the browser stalls
      // (it has just had to paint the page being revealed), the turn slows for that moment
      // instead of jumping ahead, and it does not start until the first frame is on screen.
      let elapsed = 0
      let last = 0
      const tick = (now: number) => {
        if (last) elapsed += Math.min(now - last, MAX_FRAME_MS)
        last = now
        const t = clamp(elapsed / flip.duration)
        draw(flip.top, flip.from + (flip.to - flip.from) * flip.ease(t))
        if (t < 1) frame = requestAnimationFrame(tick)
        else setFlip(null)
      }
      draw(flip.top, flip.from)
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(tick)
      })
    }

    return () => {
      cancelAnimationFrame(frame)
      resetFold(leaf, sheet)
      volume.style.setProperty("--open", currentRef.current === 0 ? "0" : "1")
      volume.style.removeProperty("--cover-shade")
    }
  }, [flip, draw])

  // Leaving book mode: land on the section that was open.
  useEffect(() => {
    if (isBook || current === 0) return
    document.getElementById(pages[current].id)?.scrollIntoView()
    // Only when the mode changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBook])

  useEffect(() => {
    if (!isBook) return

    // Navigation links such as /#work turn to that page instead of scrolling.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
      const anchor = (event.target as Element).closest?.("a[href]")
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank") return
      const url = new URL(anchor.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return
      const index = url.hash ? pages.findIndex((page) => page.id === url.hash.slice(1)) : 0
      if (index === -1) return
      event.preventDefault()
      goTo(index)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.metaKey || event.ctrlKey) return
      const target = event.target as HTMLElement
      if (target.closest("input, textarea, select, [contenteditable]")) return
      const here = currentRef.current
      if (event.key === "ArrowRight") {
        event.preventDefault()
        goTo(here + 1)
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        goTo(here - 1)
      } else if (event.key === "PageDown" || event.key === "PageUp") {
        // Page keys read through a long page first, and only turn it once there is nothing left to scroll.
        event.preventDefault()
        const down = event.key === "PageDown"
        const scroller = scrollerOf(pageRefs.current[here], spreadRef.current)
        const canScroll = scroller
          ? down
            ? scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 2
            : scroller.scrollTop > 0
          : false
        if (scroller && canScroll) {
          scroller.scrollBy({ top: (down ? 1 : -1) * scroller.clientHeight * 0.9, behavior: prefersReducedMotion() ? "auto" : "smooth" })
        } else {
          goTo(here + (down ? 1 : -1))
        }
      } else if (event.key === "Home") {
        goTo(0)
      } else if (event.key === "End") {
        goTo(pages.length - 1)
      }
    }

    // Back/forward and hand-edited URLs.
    const onHashChange = () => goTo(indexFromHash(pages), { updateUrl: false })

    // Capture phase, so this runs before the router's own link handling and can cancel it.
    document.addEventListener("click", onClick, true)
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("hashchange", onHashChange)
    return () => {
      window.removeEventListener("hashchange", onHashChange)
      document.removeEventListener("click", onClick, true)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isBook, goTo, pages])

  // Scrolling past the end of a page turns it. Scrolling inside a page never does.
  const onWheel = (event: React.WheelEvent) => {
    const state = wheel.current
    const now = performance.now()
    const gap = now - state.last
    state.last = now
    // After a turn, the rest of that same scroll (trackpad momentum) must die away before another can start.
    if (state.needsPause) {
      if (gap < WHEEL_PAUSE_MS) return
      state.needsPause = false
    }
    const page = scrollerOf(pageRefs.current[current], spreadRef.current)
    if (!page || now < state.lockedUntil) return
    const atBottom = page.scrollTop + page.clientHeight >= page.scrollHeight - 2
    const atTop = page.scrollTop <= 0
    if ((event.deltaY > 0 && atBottom) || (event.deltaY < 0 && atTop)) {
      state.travel += event.deltaY
      if (Math.abs(state.travel) > WHEEL_THRESHOLD) {
        state.needsPause = true
        goTo(current + Math.sign(state.travel), { focus: false })
      }
    } else {
      state.travel = 0
    }
  }

  const onTouchStart = (event: React.TouchEvent) => {
    if (event.touches.length !== 1 || flip?.mode === "run") return
    const touch = event.touches[0]
    // In a spread only the right-hand page turns, so a full turn is half the book's width.
    const width = (volumeRef.current?.clientWidth ?? window.innerWidth) * (spreadRef.current ? 0.5 : 1)
    gesture.current = { x: touch.clientX, y: touch.clientY, time: performance.now(), width }
  }

  // The page follows the finger: dragging left peels it over, dragging right brings the last one back.
  const onTouchMove = (event: React.TouchEvent) => {
    const active = gesture.current
    if (!active || prefersReducedMotion()) return
    const touch = event.touches[0]
    const dx = touch.clientX - active.x
    const dy = touch.clientY - active.y

    if (!active.turn) {
      if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) gesture.current = null
      if (Math.abs(dx) < 12 || Math.abs(dx) < Math.abs(dy) * 1.3) return
      const forward = dx < 0
      const target = currentRef.current + (forward ? 1 : -1)
      if (target < 0 || target >= pages.length) {
        gesture.current = null
        return
      }
      active.turn = { forward, target }
      progressRef.current = forward ? 0 : 1
      const top = Math.min(currentRef.current, target)
      setFlip({ top, under: top + 1, mode: "drag", from: progressRef.current, to: progressRef.current, duration: 0, ease: easeOut })
      return
    }

    const pulled = clamp((Math.abs(dx) / active.width) * 1.15)
    const sameWay = dx < 0 === active.turn.forward
    const travelled = sameWay ? pulled : 0
    draw(Math.min(currentRef.current, active.turn.target), active.turn.forward ? travelled : 1 - travelled)
  }

  const onTouchEnd = (event: React.TouchEvent) => {
    const active = gesture.current
    gesture.current = null
    if (!active) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - active.x
    const dy = touch.clientY - active.y

    // No drag was shown (reduced motion): fall back to a plain swipe.
    if (!active.turn) {
      if (Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(currentRef.current + (dx < 0 ? 1 : -1), { focus: false })
      return
    }

    const { forward, target } = active.turn
    const top = Math.min(currentRef.current, target)
    const position = progressRef.current
    const travelled = forward ? position : 1 - position
    const speed = Math.abs(dx) / Math.max(1, performance.now() - active.time)
    const complete = event.type !== "touchcancel" && (travelled > 0.3 || (speed > 0.45 && travelled > 0.06))
    const to = complete === forward ? 1 : 0
    if (complete) commit(target, { focus: false })
    setFlip({ top, under: top + 1, mode: "run", from: position, to, duration: Math.max(180, FLIP_MS * 0.6 * Math.abs(to - position)), ease: easeOut })
  }

  const previous = pages[current - 1]
  const next = pages[current + 1]
  const coverMoving = flip ? Boolean(pages[flip.top].cover) : false

  return (
    <div
      className="book"
      onWheel={isBook ? onWheel : undefined}
      onTouchStart={isBook ? onTouchStart : undefined}
      onTouchMove={isBook ? onTouchMove : undefined}
      onTouchEnd={isBook ? onTouchEnd : undefined}
      onTouchCancel={isBook ? onTouchEnd : undefined}
    >
      {/* The physical book: closed and narrow on the cover, opened out for reading. */}
      <div
        ref={volumeRef}
        className="book-volume"
        style={isBook ? ({ "--open": current === 0 ? 0 : 1, "--read": current, "--remaining": pages.length - 1 - current } as React.CSSProperties) : undefined}
      >
        <div className="book-shadow" aria-hidden="true" />
        {sheets.map((sheet, index) => {
          // Mid-flip two pages are on show: the sheet being moved and the page beneath it.
          const moving = flip !== null && (index === flip.top || index === flip.under)
          const state = moving || index === current ? "open" : "closed"
          const isCover = Boolean(pages[index].cover)
          return (
            // The leaf is the sheet's clipping wrapper: during a fold it hides the part that has turned.
            <div
              key={pages[index].id}
              ref={(element) => { leafRefs.current[index] = element }}
              className="book-leaf"
              data-folding={(isBook && flip?.top === index && !isCover) || undefined}
              style={isBook ? { zIndex: pages.length - index } : undefined}
            >
              <div
                ref={(element) => { pageRefs.current[index] = element }}
                className={isCover ? "book-page book-page-cover" : "book-page"}
                data-state={isBook ? state : undefined}
                inert={isBook && index !== current}
                tabIndex={isBook ? -1 : undefined}
              >
                {isCover ? (
                  sheet
                ) : (
                  // A spread on wide screens: the chapter opener on the left, its content on the right.
                  // On phones the same markup stacks into a single page.
                  <div className="book-spread">
                    <BookVerso page={pages[index]} index={index} />
                    <div className="book-recto">
                      <p className="book-runhead book-runhead-recto" aria-hidden="true">{pages[index].label}</p>
                      <div className="book-recto-body">{sheet}</div>
                      <p className="book-folio book-folio-recto" aria-hidden="true">
                        <span className="book-folio-label">{pages[index].label}</span>
                        <span className="book-folio-single">{folio(index)} / {folio(pages.length - 1)}</span>
                        <span className="book-folio-spread">{index * 2 + 1}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {flip && !coverMoving && (
          <div ref={curlRef} className="book-curl" aria-hidden="true">
            <div className="book-curl-mirror">
              <div className="book-curl-clip">
                <div className="book-curl-paper">
                  {/* In a spread the back of the turning page is the next left-hand page. It is drawn
                      mirrored here, so that reflecting the sheet across the fold reads it the right way round. */}
                  {spread && !pages[flip.under].cover && (
                    <div className="book-curl-back">
                      <BookVerso page={pages[flip.under]} index={flip.under} />
                    </div>
                  )}
                  <span />
                </div>
              </div>
            </div>
            <span className="book-curl-cast" />
            <span className="book-curl-edge" />
          </div>
        )}
      </div>

      <nav className="book-bar" aria-label="Pages">
        <button type="button" className="book-turn" onClick={() => goTo(current - 1)} disabled={!previous}>
          <ArrowLeft size={16} aria-hidden="true" />
          <span>{previous?.label}</span>
        </button>

        <ol className="book-ticks">
          {pages.map((page, index) => (
            <li key={page.id}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Page ${index + 1}: ${page.label}`}
                aria-current={index === current ? "page" : undefined}
                data-read={index < current || undefined}
              >
                <span />
              </button>
            </li>
          ))}
        </ol>
        <p className="book-position" aria-live="polite">
          {current > 0 && <span>{String(current).padStart(2, "0")}</span>} {pages[current].label}
        </p>

        <button type="button" className="book-turn book-turn-next" onClick={() => goTo(current + 1)} disabled={!next}>
          <span>{next?.label}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </nav>
    </div>
  )
}
