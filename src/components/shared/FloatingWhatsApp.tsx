'use client'

import { useState } from "react"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { ArrowUpRight, MessageCircle, X } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.2 }}>
      <div className="whatsapp-widget">
        <AnimatePresence>
          {isOpen && (
            <motion.section initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.96 }} className="whatsapp-panel" role="dialog" aria-label="WhatsApp contact panel">
              <div className="whatsapp-panel-header">
                <div className="whatsapp-panel-icon"><FaWhatsapp size={18} /></div>
                <button type="button" className="whatsapp-close" onClick={() => setIsOpen(false)} aria-label="Close WhatsApp panel"><X size={16} /></button>
              </div>
              <p className="whatsapp-kicker">Let&apos;s connect</p>
              <h2>Have a project in mind?</h2>
              <p>Send a message on WhatsApp and I&apos;ll get back to you as soon as I can.</p>
              <a className="whatsapp-open" href="https://wa.me/254746254055?text=Hi%20Alex%2C%20I%27d%20like%20to%20talk%20about%20a%20project." target="_blank" rel="noopener noreferrer">Open WhatsApp <ArrowUpRight size={16} /></a>
              <span className="whatsapp-number">+254 746 254 055 · Nairobi</span>
            </motion.section>
          )}
        </AnimatePresence>
        <motion.button type="button" className="whatsapp-trigger" onClick={() => setIsOpen((open) => !open)} whileTap={{ scale: 0.94 }} aria-expanded={isOpen} aria-label={isOpen ? "Close WhatsApp contact panel" : "Open WhatsApp contact panel"} title="Chat on WhatsApp">
          {isOpen ? <X size={21} /> : <MessageCircle size={21} />}
          <span>WhatsApp</span>
        </motion.button>
      </div>
    </MotionConfig>
  )
}
