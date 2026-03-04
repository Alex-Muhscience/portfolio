'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Cpu, Shield, Lock, Cloud, Wrench, Code, TrendingUp, Layers } from "lucide-react"
import {
  SiPython, SiJavascript, SiTypescript, SiPhp, SiPostgresql, SiMysql, SiCss,
  SiReact, SiNodedotjs, SiFastapi, SiLaravel, SiBootstrap, SiGit, SiDocker,
  SiNginx, SiKubernetes, SiGithubactions, SiLinux, SiVercel, SiNextdotjs,
  SiMongodb, SiRedis, SiJest, SiTailwindcss
} from "react-icons/si"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: SiJavascript,
    description: "Core programming languages",
    iconColor: "text-yellow-500",
    gradient: "from-yellow-500/20 to-yellow-500/10",
    skills: [
      { name: "Python", icon: SiPython, color: "text-blue-400" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
      { name: "PHP", icon: SiPhp, color: "text-purple-400" },
      { name: "SQL", icon: SiMysql, color: "text-orange-400" },
      { name: "CSS", icon: SiCss, color: "text-blue-300" }
    ]
  },
  {
    title: "Frameworks & Libraries",
    icon: SiReact,
    description: "Modern frameworks for full-stack",
    iconColor: "text-cyan-400",
    gradient: "from-cyan-500/20 to-cyan-500/10",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
      { name: "FastAPI", icon: SiFastapi, color: "text-teal-400" },
      { name: "Laravel", icon: SiLaravel, color: "text-red-500" },
      { name: "Bootstrap", icon: SiBootstrap, color: "text-purple-500" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400" }
    ]
  },
  {
    title: "Databases & Tools",
    icon: SiPostgresql,
    description: "Database and dev tools",
    iconColor: "text-blue-400",
    gradient: "from-blue-500/20 to-blue-500/10",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
      { name: "Redis", icon: SiRedis, color: "text-red-500" },
      { name: "Git", icon: SiGit, color: "text-orange-500" },
      { name: "Docker", icon: SiDocker, color: "text-blue-500" },
      { name: "Nginx", icon: SiNginx, color: "text-green-400" }
    ]
  },
  {
    title: "DevOps & Cloud",
    icon: SiDocker,
    description: "Infrastructure automation",
    iconColor: "text-orange-400",
    gradient: "from-orange-500/20 to-orange-500/10",
    skills: [
      { name: "Kubernetes", icon: SiKubernetes, color: "text-blue-500" },
      { name: "AWS", icon: Cloud, color: "text-orange-400" },
      { name: "CI/CD", icon: SiGithubactions, color: "text-blue-400" },
      { name: "Linux", icon: SiLinux, color: "text-yellow-500" },
      { name: "Vercel", icon: SiVercel, color: "text-white" }
    ]
  }
]

const architecturePrinciples = [
  {
    title: "Scalability First",
    description: "Design systems that can grow with demand. Always consider horizontal scaling and efficient resource utilization.",
    icon: Zap
  },
  {
    title: "Security by Design",
    description: "Security is not an afterthought. Implement defense-in-depth and secure defaults from day one.",
    icon: Lock
  },
  {
    title: "Observability Driven",
    description: "Build systems with comprehensive logging, monitoring, and alerting. Understand system behavior through data.",
    icon: Cpu
  },
  {
    title: "Fail Fast, Recover Quickly",
    description: "Design for failure. Implement circuit breakers, graceful degradation, and automated recovery mechanisms.",
    icon: Shield
  }
]

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  }

  return (
    <section id="skills" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ x: [-50, 50], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Wrench className="w-4 h-4" />
            Technical Expertise
          </motion.span>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
            Skills & Systems
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center gap-8 md:gap-12 text-sm"
          >
            {[
              { value: "15+", label: "Technologies", icon: Code },
              { value: "50+", label: "Systems", icon: Layers },
              { value: "99.9%", label: "Reliability", icon: TrendingUp }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center p-4 rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-0 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient}`}>
                      <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">{category.title}</CardTitle>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex flex-col items-center text-center p-3 rounded-xl bg-accent/40 hover:bg-accent/70 transition-all duration-300"
                      >
                        <skill.icon className={`w-7 h-7 mb-2 ${skill.color}`} />
                        <span className="text-xs font-medium">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Architecture Principles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-card/90 to-card/60">
            <CardHeader className="text-center pt-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                Guiding Principles
              </span>
              <CardTitle className="text-3xl font-bold mb-2">
                Architecture Framework
              </CardTitle>
            </CardHeader>

            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6">
                {architecturePrinciples.map((principle, index) => (
                  <motion.div
                    key={principle.title}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ x: 5 }}
                    className="group p-6 rounded-2xl bg-gradient-to-br from-accent/40 to-accent/20 border border-border/50 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                        <principle.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2">{principle.title}</h3>
                        <p className="text-sm text-muted-foreground">{principle.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
