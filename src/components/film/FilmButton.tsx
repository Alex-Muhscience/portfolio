'use client'

import { Play } from "lucide-react"
import { openFilm } from "@/lib/film"

/** Opens the homepage film; focus returns here when it closes. */
export function FilmButton() {
  return (
    <button type="button" className="film-opener" onClick={openFilm} data-film-opener>
      <span className="film-opener-icon" aria-hidden="true"><Play size={14} fill="currentColor" /></span>
      Watch my story <span className="film-opener-time">· 1 min</span>
    </button>
  )
}
