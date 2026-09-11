'use client'

import { useState, useEffect } from "react"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Download, ExternalLink } from "lucide-react"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { Logo } from "./Logo"
import Link from "next/link"

const navigation = [
  { name: "Work", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setIsMenuOpen(false)
  }

  return (
      <header className={`site-header ${isScrolled ? "site-header-scrolled" : ""}`}>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.2 }}>
      <div className="portfolio-shell header-shell">
        <div className="header-row">
          <div className="site-logo"><Logo /></div>

          {/* Desktop Navigation */}
          <nav className="site-nav hidden md:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              item.href.startsWith('#') ? (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="site-nav-link"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="site-nav-link"
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* View CV Button */}
          <div className="site-header-actions hidden md:flex">
            <ThemeSwitcher />
            <Button asChild size="sm" className="header-resume">
              <a
                href="https://flowcv.com/resume/t249m8own6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4" />
                Résumé
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              className="mobile-menu md:hidden"
            >
              <div className="mobile-menu-links">
                {navigation.map((item) => (
                  item.href.startsWith('#') ? (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="mobile-menu-link"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="mobile-menu-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
              <div className="mobile-menu-actions">
                <div>
                  <ThemeSwitcher />
                </div>
                <Button asChild className="header-resume">
                  <a href="https://flowcv.com/resume/t249m8own6" target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4" />
                      Résumé
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </MotionConfig>
      </header>
  )
}
