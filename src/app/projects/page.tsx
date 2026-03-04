'use client'

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Filter } from "lucide-react"
import { projects, projectCategories, type Project } from "@/data/projects"
import Link from "next/link"

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects
    return projects.filter(project => project.category === selectedCategory)
  }, [selectedCategory])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length }
    projects.forEach(project => {
      counts[project.category] = (counts[project.category] || 0) + 1
    })
    return counts
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Project Portfolio
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Deep dives into system architecture, problem-solving, and engineering excellence.
              Each project represents a unique challenge and architectural solution.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full" />
                {projects.length} Projects
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full" />
                {projectCategories.length - 1} Categories
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Production-Ready Solutions
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {projectCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="relative"
              >
                {category}
                {category !== "All" && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {categoryCounts[category]}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="secondary">{project.category}</Badge>
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                    </div>
                    <CardTitle className="text-xl leading-tight">{project.title}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center p-2 bg-accent/50 rounded">
                          <div className="text-lg font-semibold text-primary">{metric.value}</div>
                          <div className="text-xs text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex gap-2">
                      {project.github && (
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      )}
                      <Button size="sm" asChild className="flex-1">
                        <Link href={`/projects/${project.id}`}>
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Case Study
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                No projects found in this category. Try selecting a different category.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
