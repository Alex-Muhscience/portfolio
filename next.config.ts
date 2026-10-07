import type { NextConfig } from "next"

// Case studies moved from /projects/:id to /work/:slug. Keep old URLs resolving.
const movedCaseStudies: Record<string, string> = {
  "euroafrique-platform": "euroafrique",
  "chania-publishers": "chania-publishers-lms",
  "afriasia-career-center": "afriasia-career-development-center",
  utdrs: "unified-threat-detection-response",
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...Object.entries(movedCaseStudies).map(([from, to]) => ({
        source: `/projects/${from}`,
        destination: `/work/${to}`,
        permanent: true,
      })),
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects/:path*", destination: "/work", permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

export default nextConfig
