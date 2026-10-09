import { Book, type BookPage } from "@/components/book/Book"
import { BookCover } from "@/components/book/BookCover"
import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Engineering } from "@/components/sections/Engineering"
import { Experience } from "@/components/sections/Experience"
import { Hero } from "@/components/sections/Hero"
import { Principles } from "@/components/sections/Principles"
import { SelectedWork } from "@/components/sections/SelectedWork"
import { SystemFlow } from "@/components/sections/SystemFlow"
import { JsonLd } from "@/components/shared/JsonLd"
import { absoluteUrl, site } from "@/lib/site"

const personId = absoluteUrl("/#person")

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      jobTitle: site.role,
      description: site.description,
      url: site.url,
      image: absoluteUrl("/images/profile.jpg"),
      email: `mailto:${site.email}`,
      sameAs: [site.links.github, site.links.linkedin],
      address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Kisii University" },
      knowsAbout: [
        "Full-stack web development",
        "Software architecture",
        "React",
        "Next.js",
        "TypeScript",
        "Laravel",
        "PostgreSQL",
        "MySQL",
        "API development",
        "Web application security",
      ],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: site.url,
      name: `${site.name} — Portfolio`,
      inLanguage: "en",
      author: { "@id": personId },
    },
  ],
}

/** One entry per child of <Book>, in order. Ids match the section ids used by /#… links. */
const chapters: BookPage[] = [
  { id: "intro", label: "Introduction" },
  { id: "work", label: "Work" },
  { id: "engineering", label: "Engineering" },
  { id: "principles", label: "Principles" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
]

const bookPages: BookPage[] = [{ id: "cover", label: "Cover", cover: true }, ...chapters]

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Book pages={bookPages}>
        <BookCover chapters={chapters} />
        {/* A real element, not a fragment: fragments are flattened across the server/client boundary. */}
        <div>
          <Hero />
          <SystemFlow />
        </div>
        <SelectedWork />
        <Engineering />
        <Principles />
        <Experience />
        <About />
        <Contact />
      </Book>
    </>
  )
}
