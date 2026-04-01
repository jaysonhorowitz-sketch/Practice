import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { CampaignStatus } from '@/lib/types'

function statusVariant(status: CampaignStatus) {
  switch (status) {
    case 'GENERATING': return 'yellow'
    case 'DONE': return 'green'
    case 'FAILED': return 'red'
    default: return 'gray'
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })

  // Get total spend
  const { data: videos } = await supabase
    .from('videos')
    .select('estimated_cost_usd')

  const totalSpend = (videos ?? []).reduce((sum, v) => sum + (v.estimated_cost_usd ?? 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Total spend: <span className="font-medium text-foreground">${totalSpend.toFixed(2)}</span>
          </p>
        </div>
        <Button asChild>
          <Link href="/campaigns/new">New Campaign</Link>
        </Button>
      </div>

      {!campaigns || campaigns.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground border rounded-lg">
          <p className="text-lg">No campaigns yet.</p>
          <p className="text-sm mt-1">Create your first campaign to get started.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Client</th>
                <th className="text-left px-4 py-3 font-medium">Product</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Est. Cost</th>
                <th className="text-left px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/campaigns/${c.id}`} className="hover:underline font-medium">
                      {c.client_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.product_name}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant(c.status)}>{c.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">—</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
