'use client'

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Phone, ArrowDown, Sparkles, Code2, Cpu, Globe } from "lucide-react"
import { useEffect, useState, useRef } from "react"

// Particle background component
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const count = Math.min(50, Math.floor(window.innerWidth / 30))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 150, 255, ${particle.alpha})`
        ctx.fill()

        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(100, 150, 255, ${0.1 * (1 - dist / 150)})`
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    resize()
    createParticles()
    drawParticles()

    window.addEventListener('resize', () => {
      resize()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.6 }} />
}

// Typewriter effect
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('')
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => setHasStarted(true), delay)
    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [hasStarted, text])

  return <span>{displayText}<span className="animate-pulse">|</span></span>
}

export function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  const rotateX = useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  }

  const socialIcons = [
    { icon: Github, href: "https://github.com/Alex-Muhscience", label: "GitHub", color: "hover:text-white" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/alex-m-kamau-20015b340/", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Mail, href: "mailto:alex.kamau.2558@gmail.com", label: "Email", color: "hover:text-red-400" },
    { icon: Phone, href: "tel:+254746254055", label: "Phone", color: "hover:text-green-400" }
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden hero-bg pt-16">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-blue-900 to-navy-900" />
        <motion.div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <ParticleBackground />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]" variants={containerVariants} initial="hidden" animate="visible">
          <div className="text-center md:text-left order-2 md:order-1">
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-blue-300">
                <Sparkles className="w-4 h-4" />
                <TypewriterText text="Available for projects" delay={1000} />
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Hello, I'm</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extrabold">Alex M. Kamau</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-300 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Code2 className="w-6 h-6 text-blue-400" />
                <span>Computer Scientist</span>
                <span className="text-slate-500">|</span>
                <Cpu className="w-6 h-6 text-purple-400" />
                <span>Systems Architect</span>
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg md:text-xl mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed text-slate-300">
              Building <span className="text-blue-400 font-semibold">scalable systems</span> with <span className="text-purple-400 font-semibold">security by design</span>. Driving digital transformation across Kenya and East Africa through innovative systems engineering.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-10">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                <Globe className="w-5 h-5 mr-2" />
                View Projects
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm transition-all duration-300" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Get In Touch
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6 justify-center md:justify-start">
              {socialIcons.map((social, index) => (
                <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className={`relative p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 ${social.color} transition-all duration-300 group`} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + index * 0.1 }}>
                  <social.icon size={22} />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex justify-center md:justify-end order-1 md:order-2" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ perspective: 1000 }}>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <motion.div style={{ rotateX, rotateY }} className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-2xl" />
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                  <Image src="/images/profile.jpg" alt="Alex M. Kamau" fill className="object-cover" priority />
                  <motion.div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }} />
                </motion.div>
                <motion.div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  <Code2 className="w-5 h-5 text-white" />
                </motion.div>
                <motion.div className="absolute -bottom-2 -left-2 w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg" animate={{ rotate: [360, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
                  <Cpu className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.5 }}>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
