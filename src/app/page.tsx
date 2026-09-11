import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Experience } from "@/components/sections/Experience"
import { Projects } from "@/components/sections/Projects"
import { Skills } from "@/components/sections/Skills"
import { Contact } from "@/components/sections/Contact"
import { Education } from "@/components/sections/Education"
import { ScrollReveal } from "@/components/animations/ScrollReveal"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ScrollReveal><Projects /></ScrollReveal>
      <ScrollReveal><Skills /></ScrollReveal>
      <ScrollReveal><About /></ScrollReveal>
      <ScrollReveal><Experience /></ScrollReveal>
      <ScrollReveal><Education /></ScrollReveal>
      <ScrollReveal><Contact /></ScrollReveal>
    </main>
  )
}
