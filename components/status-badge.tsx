import { Badge } from "@/components/ui/badge"
import type { CampaignStatus, VideoStatus } from "@prisma/client"

const statusMap: Record<
  CampaignStatus | VideoStatus,
  { label: string; variant: "yellow" | "green" | "red" | "gray" }
> = {
  DRAFT: { label: "Draft", variant: "gray" },
  GENERATING: { label: "Generating", variant: "yellow" },
  DONE: { label: "Done", variant: "green" },
  FAILED: { label: "Failed", variant: "red" },
  PENDING: { label: "Pending", variant: "gray" },
  PROCESSING: { label: "Processing", variant: "yellow" },
}

export function StatusBadge({ status }: { status: CampaignStatus | VideoStatus }) {
  const { label, variant } = statusMap[status] ?? { label: status, variant: "gray" }
  return <Badge variant={variant}>{label}</Badge>
}
