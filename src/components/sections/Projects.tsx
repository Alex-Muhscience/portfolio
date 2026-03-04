'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ArrowUpRight, Layers, Sparkles } from "lucide-react"
import { projects } from "@/data/projects"
import Link from "next/link"

export function Projects() {
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
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
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Layers className="w-4 h-4" />
            Portfolio
          </motion.span>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"
          />

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Showcasing architectural thinking and system design excellence
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl">
              <Link href="/projects">
                View All Projects
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-0 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                <CardHeader className="relative">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                      {project.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">{project.year}</span>
                  </div>

                  <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:underline"
                      >
                        {project.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      project.title
                    )}
                  </CardTitle>

                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs border-primary/20 text-primary/80">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs border-border/50">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center p-3 bg-accent/40 rounded-xl">
                        <div className="text-lg font-bold text-primary">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-2">
                    {project.github && (
                      <Button variant="outline" size="sm" asChild className="flex-1 rounded-lg border-border/50 hover:border-primary/30">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1.5" />
                          Code
                        </a>
                      </Button>
                    )}
                    <Button size="sm" asChild className="flex-1 rounded-lg bg-gradient-to-r from-primary to-primary/80 hover:opacity-90">
                      <Link href={`/projects/${project.id}`}>
                        <ExternalLink className="w-4 h-4 mr-1.5" />
                        Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Architecture Philosophy Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="overflow-hidden border-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 hover:shadow-xl transition-all duration-500">
            <CardContent className="p-8 md:p-12 text-center relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute top-4 right-4"
              >
                <Sparkles className="w-8 h-8 text-primary/30" />
              </motion.div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4">Systems Architecture Focus</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Each project demonstrates deep architectural thinking, from distributed systems design
                to security-first development. These are engineered systems built for scale and reliability.
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" className="rounded-xl border-primary/30 hover:bg-primary/5">
                  <Link href="/projects">
                    Explore All Systems
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
