import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="portfolio-shell contact-layout">
        <div><p className="section-kicker">Contact</p><h2 id="contact-title">Have a good problem? Let&apos;s talk.</h2></div>
        <div className="contact-links">
          <a href="mailto:alex.kamau.2558@gmail.com"><span><Mail size={16} /> alex.kamau.2558@gmail.com</span><ArrowUpRight size={16} /></a>
          <a href="tel:+254746254055"><span><Phone size={16} /> +254 746 254 055</span><ArrowUpRight size={16} /></a>
          <a href="https://github.com/Alex-Muhscience" target="_blank" rel="noopener noreferrer"><span><Github size={16} /> GitHub</span><ArrowUpRight size={16} /></a>
          <a href="https://www.linkedin.com/in/alex-mkamau-20015b340" target="_blank" rel="noopener noreferrer"><span><Linkedin size={16} /> LinkedIn</span><ArrowUpRight size={16} /></a>
          <a href="https://flowcv.com/resume/t249m8own6" target="_blank" rel="noopener noreferrer"><span>Résumé</span><ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>
  )
}
