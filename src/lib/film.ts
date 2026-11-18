/**
 * The homepage film plays by itself once per visitor. This runs before first
 * paint and sets <html data-film="auto"> when it should, so a black curtain is
 * up before anything else shows (no flash of the page underneath).
 *
 * It never auto-plays for: returning visitors, deep links (/#work), ?nofilm,
 * reduced-motion users, very short screens, or crawlers and audit tools, which
 * see the normal page. Anyone can still open it with the "Watch the film" button.
 */
export const FILM_SEEN_KEY = "film-seen-v1"
export const FILM_OPEN_EVENT = "film:open"

export const filmScript = `try{var d=document.documentElement,l=location;if(l.pathname==="/"&&!l.hash&&l.search.indexOf("nofilm")<0&&!localStorage.getItem("${FILM_SEEN_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!matchMedia("(max-height: 26rem)").matches&&!/bot|crawl|spider|slurp|lighthouse|headless|preview/i.test(navigator.userAgent)){d.dataset.film="auto"}}catch(e){}`

export function openFilm() {
  window.dispatchEvent(new Event(FILM_OPEN_EVENT))
}
