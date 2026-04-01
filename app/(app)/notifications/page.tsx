import Link from "next/link"
import { db } from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { MarkAllReadButton } from "./mark-all-read-button"

export const dynamic = "force-dynamic"

export default async function NotificationsPage() {
  const notifications = await db.notification.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      video: {
        include: {
          script: {
            include: { brief: { include: { campaign: true } } },
          },
        },
      },
    },
  })

  // Mark all as read on visit
  await db.notification.updateMany({ where: { read: false }, data: { read: true } })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-base font-semibold">Notifications</h1>
        {notifications.some((n) => !n.read) && <MarkAllReadButton />}
      </div>

      {notifications.length === 0 ? (
        <p className="text-sm text-zinc-500">No notifications yet.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => {
            const campaign = n.video.script?.brief?.campaign
            return (
              <li
                key={n.id}
                className="flex items-start justify-between rounded border border-zinc-200 bg-white px-4 py-3 text-sm"
              >
                <div>
                  <p>{n.message}</p>
                  {campaign && (
                    <Link
                      href={`/campaigns/${campaign.id}`}
                      className="text-xs text-zinc-500 hover:underline"
                    >
                      View campaign →
                    </Link>
                  )}
                </div>
                <span className="ml-4 shrink-0 text-xs text-zinc-400">
                  {formatDate(n.createdAt)}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
