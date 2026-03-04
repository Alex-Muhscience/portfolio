import { LucideIcon } from "lucide-react"

export interface ExperienceItem {
  id: string
  company: string
  role: string
  duration: string
  location: string
  impact: string[]
  systems: string[]
  technologies: string[]
  outcomes: string[]
  icon?: LucideIcon
  accentColor?: string
  website?: string
  isCurrent?: boolean
}

export interface TimelineItemProps {
  item: ExperienceItem
  index: number
  isLeft: boolean
  isLast: boolean
}

export interface ExperienceTimelineProps {
  experiences: ExperienceItem[]
}
