'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react"
import { Pause, Play, RotateCcw, SkipBack, SkipForward, X } from "lucide-react"
import { FILM_OPEN_EVENT, FILM_SEEN_KEY } from "@/lib/film"
import { chapters, work } from "./film-data"
import { FilmScene } from "./Scenes"

const LAST = chapters.length - 1
const STARTS = chapters.reduce<number[]>((acc, c, i) => [...acc, i === 0 ? 0 : acc[i - 1] + chapters[i - 1].duration], [])
const TOTAL = STARTS[LAST]
const LEAVE_MS = 700
const IDLE_MS = 2600

const REDUCED = "(prefers-reduced-motion: reduce)"
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED)
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}
const getReduced = () => window.matchMedia(REDUCED).matches

const fmt = (ms: number) => {
  const s = Math.max(0, Math.round(ms / 1000))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
}

/**
 * A one-minute film that tells the portfolio as a story, on top of the homepage.
 * The clock is a requestAnimationFrame loop; each scene's motion is CSS that
 * starts when the scene mounts and pauses with the film. Seeking jumps to the
 * start of a chapter (the scene remounts so its animation restarts).
 */
export function Film() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [runKey, setRunKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const [leaving, setLeaving] = useState<{ index: number; key: number } | null>(null)
  const [controls, setControls] = useState(true)
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, () => false)

  const elapsed = useRef(0)
  const last = useRef<number | null>(null)
  const bar = useRef<HTMLDivElement>(null)
  const clock = useRef<HTMLSpanElement>(null)
  const dialog = useRef<HTMLDivElement>(null)
  const idleTimer = useRef<number | undefined>(undefined)
  const state = useRef({ index, runKey, paused, reduced })
  useLayoutEffect(() => {
    state.current = { index, runKey, paused, reduced }
  })

  const goTo = useCallback((next: number) => {
    const { index: current, runKey: key } = state.current
    const target = Math.min(Math.max(next, 0), LAST)
    setLeaving({ index: current, key })
    window.setTimeout(() => setLeaving(null), LEAVE_MS)
    elapsed.current = 0
    last.current = null
    setIndex(target)
    setRunKey(key + 1)
  }, [])

  const start = useCallback(() => {
    setLeaving(null)
    elapsed.current = 0
    last.current = null
    setIndex(0)
    setRunKey((k) => k + 1)
    setPaused(false)
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    try { localStorage.setItem(FILM_SEEN_KEY, "1") } catch {}
    delete document.documentElement.dataset.film
    setOpen(false)
    window.setTimeout(() => (document.querySelector("[data-film-opener]") as HTMLElement | null)?.focus(), 50)
  }, [])

  // Open: automatically when the pre-paint script asked for it, or from the "Watch the film" button.
  useEffect(() => {
    const auto = document.documentElement.dataset.film === "auto" ? requestAnimationFrame(start) : 0
    const onOpen = () => {
      document.documentElement.dataset.film = "open"
      start()
    }
    window.addEventListener(FILM_OPEN_EVENT, onOpen)
    return () => {
      cancelAnimationFrame(auto)
      window.removeEventListener(FILM_OPEN_EVENT, onOpen)
    }
  }, [start])

  // Preload the montage screenshots as soon as the film opens.
  useEffect(() => {
    if (!open) return
    work.forEach((b) => { const img = new Image(); img.src = b.shot.desktop })
    dialog.current?.focus()
  }, [open])

  // The clock.
  useEffect(() => {
    if (!open) return
    let raf = 0
    const tick = (now: number) => {
      const s = state.current
      const running = !s.paused && !s.reduced && s.index < LAST
      if (running) {
        // Real elapsed time (frames can be sparse in a background window); a long gap counts as at most 1 s.
        const dt = last.current === null ? 0 : Math.min(now - last.current, 1000)
        elapsed.current += dt
        if (elapsed.current >= chapters[s.index].duration) goTo(s.index + 1)
      }
      last.current = running ? now : null
      const t = s.index === LAST ? TOTAL : STARTS[s.index] + elapsed.current
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, t / TOTAL)})`
      if (clock.current) clock.current.textContent = `${fmt(t)} / ${fmt(TOTAL)}`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [open, goTo])

  // Leaving the tab pauses the film (clock and CSS together), like a video; it waits for Play.
  useEffect(() => {
    if (!open) return
    const onVisibility = () => {
      if (document.hidden && state.current.index < LAST) {
        setPaused(true)
        setControls(true)
      }
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [open])

  // Controls fade away while the film plays; any movement brings them back.
  const armIdle = useCallback(() => {
    window.clearTimeout(idleTimer.current)
    idleTimer.current = window.setTimeout(() => {
      const s = state.current
      if (!s.paused && s.index < LAST) setControls(false)
    }, IDLE_MS)
  }, [])

  const wake = useCallback(() => {
    setControls(true)
    armIdle()
  }, [armIdle])

  useEffect(() => {
    if (open) armIdle()
    return () => window.clearTimeout(idleTimer.current)
  }, [open, index, paused, armIdle])

  const toggle = useCallback(() => {
    setControls(true)
    if (state.current.index === LAST) start()
    else setPaused((p) => !p)
  }, [start])

  const onKeyDown = (e: React.KeyboardEvent) => {
    wake()
    if (e.key === "Escape") { e.preventDefault(); close() }
    else if (e.key === " " || e.key === "k") { if ((e.target as HTMLElement).tagName !== "BUTTON" || e.key === "k") { e.preventDefault(); toggle() } }
    else if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1) }
    else if (e.key === "ArrowLeft") { e.preventDefault(); goTo(elapsed.current > 1500 ? index : index - 1) }
  }

  if (!open) return <div className="film-curtain" aria-hidden="true" />

  const atEnd = index === LAST

  return (
    <div
      ref={dialog}
      className="film"
      role="dialog"
      aria-modal="true"
      aria-label="A one-minute film about Alex Murimi Kamau. Press Escape to skip to the site."
      tabIndex={-1}
      data-paused={paused || undefined}
      data-reduced={reduced || undefined}
      data-controls={controls || undefined}
      onKeyDown={onKeyDown}
      onPointerMove={wake}
      onPointerDown={wake}
    >
      <div className="film-stage">
        {leaving && <FilmScene key={`leave-${leaving.key}`} chapter={chapters[leaving.index]} state="leaving" />}
        <FilmScene key={`run-${runKey}`} chapter={chapters[index]} state="active" onClose={close} onReplay={start} />
      </div>

      <div className="film-letterbox film-letterbox-top" aria-hidden="true" />
      <div className="film-letterbox film-letterbox-bottom" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <button type="button" className="film-skip" onClick={close}>
        Skip to site <X size={16} aria-hidden="true" />
      </button>

      <div className="film-controls">
        <button type="button" className="film-btn" onClick={() => goTo(elapsed.current > 1500 ? index : index - 1)} aria-label="Previous chapter" disabled={index === 0 && !reduced}>
          <SkipBack size={18} aria-hidden="true" />
        </button>
        {!reduced && (
          <button type="button" className="film-btn film-play" onClick={toggle} aria-label={atEnd ? "Watch again" : paused ? "Play" : "Pause"}>
            {atEnd ? <RotateCcw size={20} aria-hidden="true" /> : paused ? <Play size={20} aria-hidden="true" /> : <Pause size={20} aria-hidden="true" />}
          </button>
        )}
        <button type="button" className="film-btn" onClick={() => goTo(index + 1)} aria-label="Next chapter" disabled={atEnd}>
          <SkipForward size={18} aria-hidden="true" />
        </button>

        <div className="film-timeline">
          <div className="film-track">
            <div ref={bar} className="film-progress" />
            {chapters.slice(0, LAST).map((c, i) => (
              <button
                key={c.id}
                type="button"
                className="film-tick"
                style={{ left: `${(STARTS[i] / TOTAL) * 100}%` }}
                onClick={() => goTo(i)}
                aria-label={`Chapter ${i + 1}: ${c.label}`}
                data-current={i === index || undefined}
              />
            ))}
          </div>
          <p className="film-chapter">
            <span>{String(index + 1).padStart(2, "0")}</span> {chapters[index].label}
          </p>
        </div>

        <span ref={clock} className="film-clock" aria-hidden="true">0:00 / {fmt(TOTAL)}</span>
      </div>
    </div>
  )
}
