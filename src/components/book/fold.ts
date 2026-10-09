/** Geometry and per-frame drawing for the book. No React here: these write styles straight to the DOM. */

export const clamp = (value: number) => Math.max(0, Math.min(1, value))
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Draws a page being folded over, at `progress` 0 (flat) to 1 (gone).
 *
 * The fold is a straight line from (xt, 0) to (xb, height). The bottom leads, so the turn
 * starts as a lifted corner. The part of the sheet right of the line is hidden, and that
 * same region, mirrored across the line, is drawn as the back of the page folded over it.
 *
 * Nothing is repainted per frame. The sheet is cut by its wrapper (`leaf`): an oversized
 * overflow-hidden box rotated so one edge lies on the fold, with the sheet counter-rotated
 * inside it so it does not move. The back of the page is the same construction for the
 * other side of the line, then reflected. Only transforms change, so the compositor does
 * all the work.
 *
 * `spine` is where the fold comes to rest, as a fraction of the width. 0 is a single page
 * folding right across itself. 0.5 is a two-page spread: only the right-hand page turns,
 * over the spine, and its back lands on the left-hand page.
 */
export function drawFold(leaf: HTMLElement, sheet: HTMLElement, curl: HTMLElement, progress: number, spine = 0) {
  const width = leaf.parentElement!.clientWidth
  const height = leaf.parentElement!.clientHeight
  // A single page overshoots slightly so it clears the edge completely; a spread's page lands exactly on the spine.
  const travel = width * (1 - spine) * (spine > 0 ? 1 : 1.04)
  const xb = width - clamp(progress * 1.2) * travel
  const xt = width - clamp((progress - 0.16) / 0.84) * travel

  const angle = Math.atan2(xt - xb, height)
  const middle = (xt + xb) / 2
  // Clip boxes: just big enough to cover the page at the steepest fold angle (about 30 degrees).
  // Kept tight on purpose, since each is an off-screen surface the GPU fills every frame.
  const boxWidth = Math.ceil(width + height * 0.6)
  const boxHeight = Math.ceil(height + width)
  const lift = height / 2 - boxHeight / 2

  // The sheet: keep what lies left of the fold (the box's right edge sits on it).
  size(leaf, boxWidth, boxHeight)
  size(sheet, width, height)
  leaf.style.transform = `translate3d(${middle - boxWidth}px, ${lift}px, 0) rotate(${angle}rad)`
  sheet.style.transformOrigin = `${boxWidth}px ${boxHeight / 2}px`
  sheet.style.transform = `rotate(${-angle}rad) translate3d(${boxWidth - middle}px, ${-lift}px, 0)`

  // The back of the page: what lies right of the fold (box's left edge on it), reflected across the fold.
  const [mirror, cast, edge] = curl.children as unknown as HTMLElement[]
  const clip = mirror.firstElementChild as HTMLElement
  const paper = clip.firstElementChild as HTMLElement
  // The light across the back of the page. Looked up by tag: in a spread the paper also holds the next page.
  const shade = paper.querySelector<HTMLElement>(":scope > span")!
  const onFold = `translate3d(${middle}px, ${lift}px, 0) rotate(${angle}rad)`
  size(clip, boxWidth, boxHeight)
  size(paper, width, height)
  shade.style.height = `${boxHeight}px`
  clip.style.transform = onFold
  paper.style.transformOrigin = `0px ${boxHeight / 2}px`
  paper.style.transform = `rotate(${-angle}rad) translate3d(${-middle}px, ${-lift}px, 0)`
  shade.style.transform = onFold

  // Reflection across the fold line, as a 2D matrix about the point (xt, 0).
  const length = Math.hypot(xb - xt, height)
  const dx = (xb - xt) / length
  const dy = height / length
  const a = 2 * dx * dx - 1
  const b = 2 * dx * dy
  const d = 2 * dy * dy - 1
  mirror.style.transform = `matrix(${a}, ${b}, ${b}, ${d}, ${xt * (1 - a)}, ${-b * xt})`

  // Shadow on the page beneath, just beyond the fold.
  cast.style.transform = `translate3d(${middle}px, ${height / 2}px, 0) rotate(${angle}rad)`

  // The folded page's free edge (the mirrored right-hand edge) throws a shadow back onto the sheet.
  const reflect = (px: number, py: number) => [a * px + b * py + xt * (1 - a), b * px + d * py - b * xt]
  const [topX, topY] = reflect(width, 0)
  const [bottomX, bottomY] = reflect(width, height)
  const edgeAngle = Math.atan2(topX - bottomX, bottomY - topY)
  edge.style.transform = `translate3d(${(topX + bottomX) / 2}px, ${(topY + bottomY) / 2}px, 0) rotate(${edgeAngle}rad)`

  // Shadows are deepest mid-turn and vanish as the page lies flat at either end.
  curl.style.setProperty("--lift", Math.sin(Math.PI * clamp(progress)).toFixed(3))
}

function size(element: HTMLElement, width: number, height: number) {
  const w = `${width}px`
  const h = `${height}px`
  if (element.style.width !== w) element.style.width = w
  if (element.style.height !== h) element.style.height = h
}

/** Returns a folded sheet and its wrapper to their normal layout. */
export function resetFold(leaf: HTMLElement, sheet: HTMLElement) {
  for (const element of [leaf, sheet]) {
    element.style.width = ""
    element.style.height = ""
    element.style.transform = ""
    element.style.transformOrigin = ""
  }
}

/**
 * A hard cover does not bend: it swings open on the spine. As it opens, the page block
 * behind it widens from the closed book's shape to reading width (CSS reads --open).
 */
export function drawCover(sheet: HTMLElement, volume: HTMLElement, progress: number) {
  sheet.style.transform = `perspective(2800px) rotateY(${-104 * progress}deg)`
  volume.style.setProperty("--cover-shade", (0.45 * progress).toFixed(3))
  volume.style.setProperty("--open", easeInOut(clamp(progress * 1.15)).toFixed(4))
}
