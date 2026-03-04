"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import type { ExperienceTimelineProps } from "@/types/experience"
import TimelineItem from "./TimelineItem"
import { useScrollProgress } from "@/hooks/useScrollProgress"
import { TrendingUp, Award, Target, Sparkles, Rocket, Code2, Database, Shield } from "lucide-react"
import { experiences } from "@/data/experience"

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const { containerRef } = useScrollProgress()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.8, 0.6])

  const stats = [
    {
      icon: Code2,
      value: "4+",
      label: "Years Experience",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Database,
      value: "10+",
      label: "Systems Built",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "System Reliability",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Rocket,
      value: "300%",
      label: "Performance Growth",
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 bg-gradient-to-br from-muted/20 via-background to-muted/30 overflow-hidden"
      id="experience"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/8 to-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-32 h-32 border border-primary/20 rounded-lg rotate-45"
          animate={{
            rotate: [45, 135, 225, 315, 45],
            scale: [1, 1.1, 1, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-purple-500/20 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px"
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Enhanced Header Section */}
        <motion.div
          className="text-center max-w-6xl mx-auto mb-20 md:mb-32"
          style={{ opacity: titleOpacity }}
        >
          {/* Section Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 mb-8"
          >
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Career Journey</span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight"
          >
            Experience
            <br />
            <span className="text-3xl md:text-6xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Timeline
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
          >
            A journey through technical leadership, system architecture, and digital innovation.
            Each milestone represents deeper expertise and broader impact in shaping the future of technology.
          </motion.p>

          {/* Animated Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Experience Cards Grid */}
        <div className="relative">
          {/* Timeline Connection Lines - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent rounded-full" />
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2, delay: 1 }}
              viewport={{ once: true }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-primary/80 to-primary/60 rounded-full shadow-lg"
            />
          </div>

          {/* Timeline Connection Lines - Mobile */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-1">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent rounded-full" />
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2, delay: 1 }}
              viewport={{ once: true }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-primary/80 to-primary/60 rounded-full shadow-lg"
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-16 lg:space-y-24">
            {experiences.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex items-center gap-8 lg:gap-16 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-col lg:flex-row`}
              >
                <TimelineItem
                  item={item}
                  index={index}
                  isLeft={index % 2 === 0}
                  isLast={index === experiences.length - 1}
                />

                {/* Timeline Node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2 + 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                  className="relative z-20 flex-shrink-0"
                >
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/70 shadow-2xl flex items-center justify-center border-4 border-card">
                    <Award className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>

                  {/* Current role indicator */}
                  {item.isCurrent && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-card flex items-center justify-center shadow-lg"
                    >
                      <Sparkles className="w-3 h-3 text-white animate-pulse" />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20 lg:mt-32 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 mb-8"
          >
            <Target className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Always Evolving</span>
          </motion.div>

          <h3 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Ready for the Next Challenge
          </h3>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            With a proven track record of building scalable systems and leading technical teams,
            I'm always excited to take on new challenges and drive innovation in emerging technologies.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-primary"
          >
            <Rocket className="w-5 h-5" />
            <span className="text-sm font-medium">Let's build something extraordinary</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceTimeline
