import type { Metadata, Viewport } from "next"
import { Hanken_Grotesk } from "next/font/google"
import Script from "next/script"
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/next"
import { Footer } from "@/components/shared/Footer"
import { Header } from "@/components/shared/Header"
import { site } from "@/lib/site"
import { defaultTheme, legacyThemes, themeIds } from "@/lib/themes"
import { viewModeScript } from "@/lib/view-mode"
import "./globals.css"

/* Hanken Grotesk: an open-licence corporate grotesk in the spirit of Graphik. */
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: site.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: { google: "M1ruyE4wie7Ei_x3caoezOYlvtHt4QJj56iDbvIWWPE" },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={hanken.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Script id="view-mode" strategy="beforeInteractive">{viewModeScript}</Script>
        <ThemeProvider
          attribute="data-theme"
          themes={[...themeIds, ...Object.keys(legacyThemes)]}
          value={{ light: "light", dark: "dark", ...legacyThemes }}
          defaultTheme={defaultTheme}
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
