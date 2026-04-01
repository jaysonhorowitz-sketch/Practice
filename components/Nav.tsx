'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export function Nav() {
  const { data: session } = useSession()
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    if (!session) return
    fetch('/api/notifications/unread-count')
      .then((r) => r.json())
      .then((d) => setUnread(d.count ?? 0))
      .catch(() => {})
  }, [session])

  if (!session) return null

  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="font-semibold text-sm">
            UGC Studio
          </Link>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/campaigns/new" className="text-sm text-muted-foreground hover:text-foreground">
            New Campaign
          </Link>
          <Link href="/notifications" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            Notifications
            {unread > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                {unread}
              </span>
            )}
          </Link>
        </div>
        <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: '/login' })}>
          Sign out
        </Button>
      </div>
    </nav>
  )
}
