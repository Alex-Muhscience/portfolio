import { Book, type BookPage } from "@/components/book/Book"
import { BookCover } from "@/components/book/BookCover"
import {
  AboutChapter,
  ContactChapter,
  EngineeringChapter,
  ExperienceChapter,
  IntroChapter,
  PrinciplesChapter,
  WorkChapter,
} from "@/components/book/Chapters"
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

/** One entry per chapter of <Book>, in order. Ids match the section ids used by /#… links. */
const chapters: BookPage[] = [
  { id: "intro", label: "Introduction", summary: "Who I am, the work I do and where I do it from." },
  {
    id: "work",
    label: "Work",
    summary: "Systems I have designed, built and run. Each one has a full case study: the problem, my role, the architecture and the decisions behind it.",
  },
  { id: "engineering", label: "Engineering", summary: "Depth across the stack, by area, with the case study where each is easiest to see." },
  { id: "principles", label: "Principles", summary: "The defaults I work from, whatever the stack." },
  { id: "experience", label: "Experience", summary: "Where I have worked, most recent first." },
  { id: "about", label: "About", summary: "Full-stack by responsibility, not only by tools." },
  { id: "contact", label: "Contact", summary: "Open to full-stack and backend roles, remote or in Nairobi." },
]

const bookPages: BookPage[] = [{ id: "cover", label: "Cover", cover: true }, ...chapters]

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      {/* The scrolling page (the default) and the book are separate renderings of the same material.
          CSS shows one or the other from <html data-view>, which is set before first paint. */}
      <div className="scroll-view">
        <Hero />
        <SystemFlow />
        <SelectedWork />
        <Engineering />
        <Principles />
        <Experience />
        <About />
        <Contact />
      </div>
      <Book pages={bookPages}>
        <BookCover chapters={chapters} />
        <IntroChapter />
        <WorkChapter />
        <EngineeringChapter />
        <PrinciplesChapter />
        <ExperienceChapter />
        <AboutChapter />
        <ContactChapter />
      </Book>
    </>
  )
}
