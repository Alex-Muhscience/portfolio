import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { ThemeProvider } from "next-themes"
import { Footer } from "@/components/shared/Footer"
import { Header } from "@/components/shared/Header"
import { site } from "@/lib/site"
import { defaultTheme, themeIds } from "@/lib/themes"
import { viewModeScript } from "@/lib/view-mode"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" })

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
  themeColor: "#0a1736",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Script id="view-mode" strategy="beforeInteractive">{viewModeScript}</Script>
        <ThemeProvider attribute="data-theme" themes={[...themeIds]} defaultTheme={defaultTheme} enableSystem={false} disableTransitionOnChange>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
