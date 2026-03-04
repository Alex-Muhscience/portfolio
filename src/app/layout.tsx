import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";

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
    default: "Alex M. Kamau - Computer Scientist & Systems Architect",
    template: "%s | Alex M. Kamau"
  },
  description: "Computer Scientist specializing in distributed systems, cybersecurity, and full-stack engineering. Building scalable systems with security by design.",
  keywords: [
    "Computer Scientist",
    "Systems Architect",
    "Full-Stack Developer",
    "Cybersecurity",
    "Distributed Systems",
    "AI/ML",
    "Kenya",
    "Software Engineering"
  ],
  authors: [{ name: "Alex M. Kamau" }],
  creator: "Alex M. Kamau",
  publisher: "Alex M. Kamau",
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
    url: 'https://alex-kamau.vercel.app',
    title: 'Alex M. Kamau - Computer Scientist & Systems Architect',
    description: 'Computer Scientist specializing in distributed systems, cybersecurity, and full-stack engineering. Building scalable systems with security by design.',
    siteName: 'Alex M. Kamau Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex M. Kamau - Computer Scientist & Systems Architect',
    description: 'Computer Scientist specializing in distributed systems, cybersecurity, and full-stack engineering.',
    creator: '@AlexMuhscience',
  },
  alternates: {
    canonical: 'https://alex-kamau.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="M1ruyE4wie7Ei_x3caoezOYlvtHt4QJj56iDbvIWWPE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Alex M. Kamau",
              "jobTitle": "Computer Scientist & Systems Architect",
              "description": "Computer Scientist specializing in distributed systems, cybersecurity, and full-stack engineering.",
              "url": "https://alex-kamau.vercel.app",
              "sameAs": [
                "https://github.com/Alex-Muhscience",
                "https://www.linkedin.com/in/alex-m-kamau-20015b340/",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
