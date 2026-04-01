import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
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

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const { data: campaign } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!campaign) notFound()

  const { data: brief } = await supabase
    .from('briefs')
    .select('*')
    .eq('campaign_id', params.id)
    .single()

  const { data: script } = brief
    ? await supabase.from('scripts').select('*').eq('brief_id', brief.id).single()
    : { data: null }

  const { data: video } = script
    ? await supabase.from('videos').select('*').eq('script_id', script.id).single()
    : { data: null }

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{campaign.product_name}</h1>
          <p className="text-muted-foreground text-sm mt-1">{campaign.client_name}</p>
        </div>
        <Badge variant={statusVariant(campaign.status)}>{campaign.status}</Badge>
      </div>

      {/* Campaign metadata */}
      <section className="space-y-2 text-sm">
        <p><span className="font-medium">One-liner:</span> {campaign.product_one_liner}</p>
        <p><span className="font-medium">Target audience:</span> {campaign.target_audience}</p>
        <p><span className="font-medium">Created:</span> {new Date(campaign.created_at).toLocaleString()}</p>
      </section>

      {/* Brief */}
      {brief && (
        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Brief</h2>
          <p className="text-sm"><span className="font-medium">Hook concept:</span> {brief.hook_concept}</p>
          <div className="text-sm">
            <span className="font-medium">Key talking points:</span>
            <ul className="list-disc list-inside mt-1 space-y-1 text-muted-foreground">
              {(brief.key_talking_points as string[]).map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
          <p className="text-sm"><span className="font-medium">CTA:</span> {brief.cta_text}</p>
        </section>
      )}

      {/* Script */}
      {script && (
        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Script</h2>
          <p className="text-sm"><span className="font-medium">Hook (0-3s):</span> {script.hook_line}</p>
          <p className="text-sm"><span className="font-medium">Body (3-25s):</span> {script.body}</p>
          <p className="text-sm"><span className="font-medium">CTA (25-30s):</span> {script.cta_line}</p>
        </section>
      )}

      {/* Video */}
      {video && (
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">Video</h2>
          {video.status === 'DONE' && video.video_url && (
            <div className="space-y-3">
              <video
                src={video.video_url}
                controls
                className="w-full max-w-xs rounded-lg border"
              />
              <Button asChild size="sm">
                <a href={video.video_url} download={`${campaign.product_name}.mp4`}>
                  Download MP4
                </a>
              </Button>
            </div>
          )}
          {video.status === 'PROCESSING' && (
            <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md px-4 py-3">
              <span className="animate-spin">⟳</span>
              <span>Generating video… this may take a few minutes.</span>
            </div>
          )}
          {video.status === 'FAILED' && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-3">
              Video generation failed.
            </div>
          )}
        </section>
      )}

      {/* Cost breakdown */}
      {video && (video.openai_tokens_used > 0 || video.estimated_cost_usd > 0) && (
        <section className="space-y-2 text-sm border rounded-lg p-4 bg-muted/30">
          <h2 className="font-semibold">Cost Breakdown</h2>
          <p>OpenAI tokens: {video.openai_tokens_used.toLocaleString()}</p>
          <p>ElevenLabs characters: {video.elevenlabs_chars_used.toLocaleString()}</p>
          <p>HeyGen credits: {video.heygen_credits_used}</p>
          <p className="font-medium pt-1 border-t mt-2">
            Estimated total: ${Number(video.estimated_cost_usd).toFixed(4)}
          </p>
        </section>
      )}
    </div>
  )
}
