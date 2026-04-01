import { db } from "@/lib/db"
import { Nav } from "@/components/nav"

export const dynamic = "force-dynamic"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const unreadCount = await db.notification.count({ where: { read: false } })

  return (
    <div className="flex min-h-screen flex-col">
      <Nav unreadCount={unreadCount} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
    </div>
  )
}
