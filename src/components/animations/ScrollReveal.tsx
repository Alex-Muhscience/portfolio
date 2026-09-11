'use client'

import { MotionConfig, motion } from "framer-motion"
import type { ReactNode } from "react"

export function ScrollReveal({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.24 }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}
