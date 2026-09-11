import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Alex Murimi Kamau - Full-Stack Developer",
    template: "%s | Alex Murimi Kamau"
  },
  description: "Full-Stack Developer specializing in Laravel, React, Next.js, PHP, DevOps, secure application design, and performance engineering.",
  keywords: [
    "Full-Stack Developer",
    "Laravel Developer",
    "React Developer",
    "Cybersecurity",
    "Distributed Systems",
    "AI/ML",
    "Kenya",
    "Software Engineering"
  ],
  authors: [{ name: "Alex Murimi Kamau" }],
  creator: "Alex Murimi Kamau",
  publisher: "Alex Murimi Kamau",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-alex-m-kamau.vercel.app',
    title: 'Alex Murimi Kamau - Full-Stack Developer',
    description: 'Full-Stack Developer specializing in Laravel, React, Next.js, PHP, DevOps, and secure high-performance web applications.',
    siteName: 'Alex Murimi Kamau Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Murimi Kamau - Full-Stack Developer',
    description: 'Full-Stack Developer specializing in Laravel, React, Next.js, PHP, DevOps, and secure high-performance web applications.',
    creator: '@AlexMuhscience',
  },
  alternates: {
    canonical: 'https://portfolio-alex-m-kamau.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="M1ruyE4wie7Ei_x3caoezOYlvtHt4QJj56iDbvIWWPE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Alex Murimi Kamau",
              "jobTitle": "Full-Stack Developer",
              "description": "Full-Stack Developer specializing in Laravel, React, Next.js, PHP, DevOps, and secure high-performance web applications.",
              "url": "https://portfolio-alex-m-kamau.vercel.app",
              "sameAs": [
                "https://github.com/Alex-Muhscience",
                "https://www.linkedin.com/in/alex-mkamau-20015b340",
                "https://twitter.com/AlexMuhscience",
                "https://wa.me/254746254055"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Kenya"
              },
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Kisii University"
              }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}
