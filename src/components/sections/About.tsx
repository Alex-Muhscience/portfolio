'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Briefcase, Code, Search, Cog, Globe, Shield, Zap, Database } from "lucide-react"

export function About() {
  const timeline = [
    {
      id: "intern-2024",
      year: "2024",
      title: "Software Engineer Intern",
      institution: "Secunets Technologies Ltd",
      description: "Gained hands-on experience in software development, cybersecurity practices, and system integration during internship program.",
      icon: Code,
      type: "work"
    },
    {
      id: "muhscience-2024",
      year: "2024",
      title: "Founder & Systems Architect",
      institution: "Muhscience Tech iLabs",
      description: "Building the next generation of digital infrastructure and empowering SMEs with cutting-edge technology solutions.",
      icon: Code,
      type: "work"
    },
    {
      id: "graduation-2025",
      year: "2025",
      title: "BSc Computer Science",
      institution: "Kisii University",
      description: "Specialized in software engineering, cybersecurity, and AI systems. Graduated with honors.",
      icon: GraduationCap,
      type: "education"
    },
    {
      id: "euroafrique-2025",
      year: "2025",
      title: "IT Department Lead",
      institution: "EuroAfrique Corporate Skills",
      description: "Led IT infrastructure optimization and digital transformation initiatives for corporate training and development programs.",
      icon: Briefcase,
      type: "work"
    },
    {
      id: "chania-2026",
      year: "2026",
      title: "IT Department Lead",
      institution: "Chania Publishers Limited",
      description: "Managed comprehensive IT infrastructure and led digital transformation for one of Kenya's leading educational publishers.",
      icon: Briefcase,
      type: "work"
    },
  ]

  const skills = [
    { icon: Search, name: "SEO & Digital Marketing", level: "Expert" },
    { icon: Code, name: "Full-Stack Development", level: "Expert" },
    { icon: Cog, name: "DevOps & Automation", level: "Expert" },
    { icon: Globe, name: "Web Deployment", level: "Expert" }
  ]

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Systems Architect passionate about building scalable, secure digital infrastructure
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Professional Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Systems-First Philosophy</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    My journey in computer science began with a fundamental belief that{" "}
                    <strong>systems thinking</strong> is the key to solving complex problems.
                    Unlike feature-driven development, I focus on <strong>architectural integrity</strong>{" "}
                    and <strong>long-term scalability</strong>.
                  </p>
                  <p>
                    As a Computer Scientist from Kenya, I've witnessed firsthand how technology can transform
                    underserved markets. My work bridges the gap between theoretical computer science and
                    practical system design, always prioritizing <strong>security by design</strong> and{" "}
                    <strong>performance optimization</strong>.
                  </p>
                  <p>
                    Through leading IT departments at major organizations and founding Muhscience Tech iLabs,
                    I've developed a unique methodology that combines academic rigor with business acumen.
                    This approach has enabled me to architect systems that not only perform but also adapt
                    and scale with organizational growth.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Core Competencies</h3>
                <div className="grid grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center text-center p-4 rounded-lg bg-accent/50"
                    >
                      <skill.icon className="w-8 h-8 mb-2 text-primary" />
                      <h4 className="font-semibold text-sm mb-1">{skill.name}</h4>
                      <span className="text-xs text-muted-foreground">{skill.level}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Professional Journey - Modern Horizontal Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-semibold text-center mb-12">Professional Journey</h3>

          {/* Horizontal Timeline for Desktop */}
          <div className="hidden md:block relative">
            {/* Timeline line with gradient */}
            <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full" />

            {/* Timeline items */}
            <div className="flex justify-between items-start relative px-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center max-w-xs flex-1"
                >
                  {/* Timeline dot with icon */}
                  <div className="relative z-10 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg border-4 border-background">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content card */}
                  <Card className="w-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {item.year}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${item.type === 'education'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          }`}>
                          {item.type}
                        </span>
                      </div>
                      <h4 className="font-bold text-lg mb-2 leading-tight">{item.title}</h4>
                      <p className="text-primary font-semibold text-sm mb-2">{item.institution}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Vertical Timeline for Mobile */}
          <div className="md:hidden relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary to-primary/30 rounded-full" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 relative"
                >
                  {/* Timeline dot with icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg border-4 border-background">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content card */}
                  <Card className="flex-1 hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {item.year}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${item.type === 'education'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          }`}>
                          {item.type}
                        </span>
                      </div>
                      <h4 className="font-bold text-base mb-1 leading-tight">{item.title}</h4>
                      <p className="text-primary font-semibold text-sm mb-2">{item.institution}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Architecture Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Architecture Philosophy</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Security by Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Every system I build incorporates security principles from the ground up,
                    ensuring robust protection against modern threats.
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Performance First</h4>
                  <p className="text-sm text-muted-foreground">
                    Systems are engineered for optimal performance, with careful consideration
                    of scalability, efficiency, and user experience.
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Database className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Scalable Architecture</h4>
                  <p className="text-sm text-muted-foreground">
                    Building systems that grow with your business, designed for horizontal
                    scaling and future technological advancements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
