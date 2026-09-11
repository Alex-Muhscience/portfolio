'use client'

import { MotionConfig, motion } from "framer-motion"

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.24 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {children}
      </motion.div>
    </MotionConfig>
  )
}
