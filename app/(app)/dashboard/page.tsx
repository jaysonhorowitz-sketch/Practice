import Link from "next/link"
import { db } from "@/lib/db"
import { StatusBadge } from "@/components/status-badge"
import { formatCost, formatDate } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const campaigns = await db.campaign.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      brief: {
        include: {
          script: {
            include: { video: { select: { estimatedCostUsd: true } } },
          },
        },
      },
    },
  })

  const totalSpend = campaigns.reduce((sum, c) => {
    return sum + (c.brief?.script?.video?.estimatedCostUsd ?? 0)
  }, 0)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold">Campaigns</h1>
          <p className="text-sm text-zinc-500">
            Total spend: {formatCost(totalSpend)}
          </p>
        </div>
        <Link
          href="/campaigns/new"
          className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-700"
        >
          New Campaign
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No campaigns yet.{" "}
          <Link href="/campaigns/new" className="underline">
            Create one.
          </Link>
        </p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left text-xs text-zinc-500">
              <th className="pb-2 font-medium">Client</th>
              <th className="pb-2 font-medium">Product</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Est. Cost</th>
              <th className="pb-2 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr
                key={c.id}
                className="border-b border-zinc-100 hover:bg-zinc-50"
              >
                <td className="py-2 pr-4">{c.clientName}</td>
                <td className="py-2 pr-4">
                  <Link
                    href={`/campaigns/${c.id}`}
                    className="font-medium hover:underline"
                  >
                    {c.productName}
                  </Link>
                </td>
                <td className="py-2 pr-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="py-2 pr-4 text-zinc-500">
                  {formatCost(c.brief?.script?.video?.estimatedCostUsd)}
                </td>
                <td className="py-2 text-zinc-500">{formatDate(c.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
