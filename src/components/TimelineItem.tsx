"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MapPin, Clock, Building2, ArrowUpRight, Sparkles, Zap, Target, Trophy, Users, TrendingUp } from "lucide-react"
import type { TimelineItemProps } from "@/types/experience"
import { useTimelineItemInView } from "@/hooks/useScrollProgress"

const TimelineItem = memo(function TimelineItem({
  item,
  index,
  isLeft,
  isLast
}: TimelineItemProps) {
  const { ref, isInView } = useTimelineItemInView()

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: index * 0.15
      }
    }
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, x: isLeft ? -30 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2 + 0.3
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full max-w-2xl"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border-0 shadow-2xl group">
        <motion.div
          variants={cardVariants}
          className="relative"
        >
          {/* Gradient accent stripe */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
          />

          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
        </motion.div>

        <CardHeader className="relative pb-4">
          {/* Role Title */}
          <motion.h3
            variants={contentVariants}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent mb-3"
          >
            {item.role}
          </motion.h3>

          {/* Company and Meta Info */}
          <motion.div
            variants={contentVariants}
            className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
          >
            {/* Company Link */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 group/company"
            >
              {item.website ? (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover/company:bg-primary/20 transition-colors">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">{item.company}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50 group-hover/company:opacity-100 transition-opacity" />
                </a>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">{item.company}</span>
                </div>
              )}
            </motion.div>

            {/* Duration */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-xs">
              <Clock className="w-3 h-3" />
              <span>{item.duration}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-xs">
              <MapPin className="w-3 h-3" />
              <span>{item.location}</span>
            </div>
          </motion.div>

          {/* Current Role Badge */}
          {item.isCurrent && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.7, type: "spring", stiffness: 200 }}
              className="mt-4"
            >
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2 shadow-lg">
                <Zap className="w-3 h-3 mr-1" />
                Current Position
              </Badge>
            </motion.div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Leadership Impact */}
          <motion.div
            variants={contentVariants}
            className="space-y-3"
          >
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Leadership Impact
            </h4>
            <div className="space-y-2">
              {item.impact.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.8 + idx * 0.1 }}
                  className="flex items-start gap-3 group/item"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors">
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Stack */}
          <motion.div
            variants={contentVariants}
            className="space-y-3"
          >
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Technical Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((tech, idx) => (
                <motion.div
                  key={tech}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 1.2 + idx * 0.05 }}
                >
                  <Badge
                    variant="outline"
                    className="text-xs border-primary/30 text-primary/80 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Architecture & Systems */}
          <motion.div
            variants={contentVariants}
            className="space-y-3"
          >
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Architecture & Systems
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.systems.map((system, idx) => (
                <motion.div
                  key={system}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 1.4 + idx * 0.05 }}
                >
                  <Badge
                    variant="secondary"
                    className="text-xs bg-secondary/60 hover:bg-secondary/80 border border-border/50 transition-all duration-300 hover:scale-105"
                  >
                    {system}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            variants={contentVariants}
            className="pt-4 border-t border-border/50"
          >
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Key Metrics
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {item.outcomes.map((outcome, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 1.6 + idx * 0.1 }}
                  className="text-xs text-muted-foreground bg-accent/30 hover:bg-accent/50 rounded-lg px-3 py-2.5 border border-border/30 hover:border-primary/20 transition-all duration-300"
                >
                  {outcome}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
})

export default TimelineItem
