import type { ProjectStatus } from "@/data/projects"

export function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <span className="status" data-status={status}>
      <span className="status-dot" aria-hidden="true" />
      {label}
    </span>
  )
}
