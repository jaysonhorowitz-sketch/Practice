import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { MarkAllReadButton } from './MarkAllReadButton'

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  // Mark all as read on page load
  await supabase.from('notifications').update({ read: true }).eq('read', false)

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*, videos(script_id, scripts(brief_id, briefs(campaign_id)))')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <MarkAllReadButton />
      </div>

      {!notifications || notifications.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground border rounded-lg">
          <p>No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n: any) => {
            const campaignId = n.videos?.scripts?.briefs?.campaign_id
            return (
              <div
                key={n.id}
                className="border rounded-lg px-4 py-3 flex items-center justify-between text-sm"
              >
                <div>
                  <p>{n.message}</p>
                  {campaignId && (
                    <Link href={`/campaigns/${campaignId}`} className="text-xs text-muted-foreground hover:underline">
                      View campaign →
                    </Link>
                  )}
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                  {new Date(n.created_at).toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
