import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

export const alt = site.title
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#ffffff",
          color: "#000000",
          borderTop: "14px solid #005DA6",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 2, color: "#005DA6" }}>
          {site.role.toUpperCase()} · {site.location.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -3 }}>{site.name}</div>
          <div style={{ display: "flex", fontSize: 34, lineHeight: 1.35, color: "#616161", maxWidth: 940 }}>
            I design, build and run the systems businesses depend on: four production platforms, owned end to end.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#595959" }}>
          React · Next.js · TypeScript · Laravel · PostgreSQL · MySQL · Docker
        </div>
      </div>
    ),
    size,
  )
}
