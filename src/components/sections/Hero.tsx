'use client'

import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { MotionConfig, motion } from "framer-motion"

export function Hero() {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.24 }}>
    <section id="home" className="portfolio-hero">
      <div className="portfolio-shell">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="hero-copy">
          <p className="eyebrow"><span>01</span> Alex Murimi Kamau · Nairobi, Kenya</p>
          <h1>Full-Stack Developer <em>building secure products</em> that do useful work.</h1>
          <p className="hero-intro">I design, build, deploy, and maintain high-performance web applications across Laravel, React, Next.js, PHP, and DevOps.</p>
          <div className="hero-actions">
            <Link href="#projects" className="button button-primary">Explore selected work <ArrowUpRight size={17} /></Link>
            <Link href="#contact" className="button button-quiet">Start a conversation</Link>
          </div>
          <div className="hero-links" aria-label="Social links">
            <a href="https://github.com/Alex-Muhscience" target="_blank" rel="noopener noreferrer"><Github size={17} /> GitHub</a>
            <a href="https://www.linkedin.com/in/alex-mkamau-20015b340" target="_blank" rel="noopener noreferrer"><Linkedin size={17} /> LinkedIn</a>
            <a href="mailto:alex.kamau.2558@gmail.com"><Mail size={17} /> Email</a>
          </div>
        </motion.div>

        <motion.aside initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="hero-index">
          <div className="hero-profile">
            <Image src="/images/profile.jpg" alt="Alex Murimi Kamau" fill sizes="(max-width: 800px) 160px, 240px" priority />
          </div>
          <span className="index-label">Currently</span>
          <strong>Designing resilient products, platforms, and teams.</strong>
          <span className="index-rule" />
          <div className="index-meta"><span>01</span><span>Selected work</span></div>
          <a href="#projects" className="index-scroll">Scroll to explore <ArrowDown size={16} /></a>
        </motion.aside>
      </div>
    </section>
    </MotionConfig>
  )
}
