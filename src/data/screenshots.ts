/** Screenshots of a project, shown in a browser frame (and a phone frame where there is one). */
export interface Screenshot {
  /** What the browser frame's address bar shows. */
  address: string
  desktop: string
  mobile?: string
  alt: string
}

/** Desktop captures are 1280 × 720, phone captures 390 × 780. */
export const DESKTOP_SIZE = { width: 1280, height: 720 } as const
export const MOBILE_SIZE = { width: 390, height: 780 } as const

const shots: Record<string, Screenshot> = {
  euroafrique: {
    address: "euroafriquecorporateskills.com",
    desktop: "/work/euroafrique/desktop.webp",
    mobile: "/work/euroafrique/mobile.webp",
    alt: "EuroAfrique Corporate Skills homepage: corporate training programmes with a course search.",
  },
  "chania-publishers-lms": {
    address: "chaniapublishers.com",
    desktop: "/work/chania-publishers-lms/desktop.webp",
    mobile: "/work/chania-publishers-lms/mobile.webp",
    alt: "Chania Publishers homepage: online study for KASNEB, KNEC and career skills.",
  },
  "afriasia-career-development-center": {
    address: "afriasiacareercenter.com",
    desktop: "/work/afriasia-career-development-center/desktop.webp",
    mobile: "/work/afriasia-career-development-center/mobile.webp",
    alt: "AfriAsia Career Development Center homepage: professional training with a course search.",
  },
  "chania-finance-consultancy": {
    address: "chaniafinanceconsultancy.com",
    desktop: "/work/chania-finance-consultancy/desktop-live.webp",
    mobile: "/work/chania-finance-consultancy/mobile-live.webp",
    alt: "Chania Finance Consultancy homepage: course search and the next sessions by venue.",
  },
  "unified-threat-detection-response": {
    address: "utdrs-capstone-project.vercel.app",
    desktop: "/work/unified-threat-detection-response/desktop.webp",
    mobile: "/work/unified-threat-detection-response/mobile.webp",
    alt: "UTDRS sign-in page for the threat detection and response dashboard.",
  },
  "muhscience-tech-labs": {
    address: "muhscience-tech-labs-website.vercel.app",
    desktop: "/work/muhscience-tech-labs/desktop.webp",
    mobile: "/work/muhscience-tech-labs/mobile.webp",
    alt: "Muhscience Tech Labs homepage: business systems and automation engineering.",
  },
  muhos: {
    address: "MuhOS on Fedora",
    desktop: "/work/muhos/desktop-light.webp",
    alt: "The MuhOS desktop on Fedora: menu bar, dock and the control centre open.",
  },
}

export function getScreenshot(slug: string): Screenshot | undefined {
  return shots[slug]
}
