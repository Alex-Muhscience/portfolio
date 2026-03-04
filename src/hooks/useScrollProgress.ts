"use client"

import { useRef } from "react"
import { useScroll, useTransform, useInView, useSpring, useMotionValue } from "framer-motion"

export function useScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressValue = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Enhanced spring configuration for smoother animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.5,
    restDelta: 0.001
  })

  // Transform progress to line height with enhanced interpolation
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  // Additional transforms for more dynamic effects
  const lineOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.8])
  const lineScale = useTransform(smoothProgress, [0, 0.1, 1], [0.8, 1, 1.05])

  return {
    containerRef,
    scrollYProgress,
    smoothProgress,
    lineHeight,
    lineOpacity,
    lineScale,
    progressValue
  }
}

export function useTimelineItemInView(threshold = 0.4) {
  const ref = useRef<HTMLDivElement>(null)

  // Enhanced inView configuration for better trigger timing
  const isInView = useInView(ref, {
    once: true,
    margin: "-120px 0px -120px 0px",
    amount: threshold
  })

  // Additional view progress for more granular animations
  const viewProgress = useInView(ref, {
    margin: "-50px 0px -50px 0px",
    amount: 0.1
  })

  return { ref, isInView, viewProgress }
}
