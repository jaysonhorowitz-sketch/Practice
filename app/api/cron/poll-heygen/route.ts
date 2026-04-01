import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getVideoStatus } from '@/lib/heygen'
import { uploadFile } from '@/lib/storage'
import axios from 'axios'

export async function GET(req: NextRequest) {
  const secret = req.headers.get('authorization')?.replace('Bearer ', '')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .eq('status', 'PROCESSING')

  if (error) {
    console.error('[poll-heygen]', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  const results = await Promise.allSettled(
    (videos ?? []).map(async (video) => {
      const result = await getVideoStatus(video.heygen_job_id)

      if (result.status === 'DONE' && result.videoUrl) {
        // Download MP4 and re-upload to R2
        const mp4Response = await axios.get(result.videoUrl, { responseType: 'arraybuffer' })
        const videoUrl = await uploadFile(
          Buffer.from(mp4Response.data),
          `video/${video.id}.mp4`,
          'video/mp4'
        )

        await supabase
          .from('videos')
          .update({ status: 'DONE', video_url: videoUrl, completed_at: new Date().toISOString() })
          .eq('id', video.id)

        // Find campaign via script → brief → campaign chain
        const { data: script } = await supabase
          .from('scripts')
          .select('brief_id')
          .eq('id', video.script_id)
          .single()

        const { data: brief } = await supabase
          .from('briefs')
          .select('campaign_id')
          .eq('id', script?.brief_id)
          .single()

        if (brief?.campaign_id) {
          await supabase
            .from('campaigns')
            .update({ status: 'DONE' })
            .eq('id', brief.campaign_id)

          await supabase.from('notifications').insert({
            video_id: video.id,
            message: `Video ready for campaign ${brief.campaign_id}`,
          })
        }
      } else if (result.status === 'FAILED') {
        await supabase
          .from('videos')
          .update({ status: 'FAILED' })
          .eq('id', video.id)

        await supabase.from('notifications').insert({
          video_id: video.id,
          message: `Video generation failed for video ${video.id}`,
        })
      }
    })
  )

  const failures = results.filter((r) => r.status === 'rejected')
  if (failures.length > 0) {
    console.error('[poll-heygen] Some polls failed:', failures)
  }

  return NextResponse.json({ polled: videos?.length ?? 0, failures: failures.length })
}
