/**
 * Full generation pipeline: Brief → Script → Audio → HeyGen video.
 * Each step is wrapped in try/catch; failures set campaign status to FAILED.
 */

import { supabase } from './supabase'
import { generateBrief, generateScript } from './openai'
import { generateAudio } from './elevenlabs'
import { createVideoJob } from './heygen'
import { uploadFile } from './storage'
import type { Campaign } from './types'

// Cost rates (rough estimates)
const OPENAI_COST_PER_TOKEN = 0.000005   // GPT-4o input+output blended
const ELEVENLABS_COST_PER_CHAR = 0.000004
const HEYGEN_COST_PER_CREDIT = 0.10

async function failCampaign(campaignId: string, message: string) {
  await supabase
    .from('campaigns')
    .update({ status: 'FAILED' })
    .eq('id', campaignId)

  // Create a notification without a video_id
  await supabase.from('notifications').insert({ message, video_id: null })

  console.error(`[pipeline] Campaign ${campaignId} failed: ${message}`)
}

export async function runPipeline(campaign: Campaign): Promise<void> {
  let totalTokens = 0

  // ── Step 1: Generate Brief ────────────────────────────────────────────────
  let brief
  try {
    const { data: briefData, tokensUsed } = await generateBrief(campaign)
    totalTokens += tokensUsed

    const { data, error } = await supabase
      .from('briefs')
      .insert({ ...briefData, campaign_id: campaign.id })
      .select()
      .single()

    if (error) throw error
    brief = data
  } catch (err: any) {
    await failCampaign(campaign.id, `Brief generation failed: ${err.message}`)
    return
  }

  // ── Step 2: Generate Script ───────────────────────────────────────────────
  let script
  try {
    const { data: scriptData, tokensUsed } = await generateScript(brief)
    totalTokens += tokensUsed

    const { data, error } = await supabase
      .from('scripts')
      .insert({ ...scriptData, brief_id: brief.id })
      .select()
      .single()

    if (error) throw error
    script = data
  } catch (err: any) {
    await failCampaign(campaign.id, `Script generation failed: ${err.message}`)
    return
  }

  // Create a Video record in PENDING state
  let video
  try {
    const { data, error } = await supabase
      .from('videos')
      .insert({
        script_id: script.id,
        status: 'PENDING',
        openai_tokens_used: totalTokens,
      })
      .select()
      .single()

    if (error) throw error
    video = data
  } catch (err: any) {
    await failCampaign(campaign.id, `Video record creation failed: ${err.message}`)
    return
  }

  // ── Step 3: Generate Audio via ElevenLabs ─────────────────────────────────
  let audioUrl: string
  try {
    const { audioBuffer, charsUsed } = await generateAudio(script.full_text)
    audioUrl = await uploadFile(audioBuffer, `audio/${video.id}.mp3`, 'audio/mpeg')

    await supabase
      .from('videos')
      .update({ audio_url: audioUrl, elevenlabs_chars_used: charsUsed })
      .eq('id', video.id)
  } catch (err: any) {
    // Retry once after 10s on rate-limit
    if (err?.response?.status === 429) {
      await new Promise((r) => setTimeout(r, 10000))
      try {
        const { audioBuffer, charsUsed } = await generateAudio(script.full_text)
        audioUrl = await uploadFile(audioBuffer, `audio/${video.id}.mp3`, 'audio/mpeg')
        await supabase
          .from('videos')
          .update({ audio_url: audioUrl, elevenlabs_chars_used: charsUsed })
          .eq('id', video.id)
      } catch (retryErr: any) {
        await failCampaign(campaign.id, `Audio generation failed: ${retryErr.message}`)
        return
      }
    } else {
      await failCampaign(campaign.id, `Audio generation failed: ${err.message}`)
      return
    }
  }

  // ── Step 4: Submit HeyGen job ─────────────────────────────────────────────
  try {
    const { jobId } = await createVideoJob(
      script.full_text,
      audioUrl!,
      process.env.HEYGEN_AVATAR_ID!
    )

    const estimatedCost =
      totalTokens * OPENAI_COST_PER_TOKEN +
      (video.elevenlabs_chars_used ?? 0) * ELEVENLABS_COST_PER_CHAR +
      1 * HEYGEN_COST_PER_CREDIT  // 1 credit assumed per job

    await supabase
      .from('videos')
      .update({
        heygen_job_id: jobId,
        status: 'PROCESSING',
        estimated_cost_usd: estimatedCost,
      })
      .eq('id', video.id)

    await supabase
      .from('campaigns')
      .update({ status: 'GENERATING' })
      .eq('id', campaign.id)
  } catch (err: any) {
    await failCampaign(campaign.id, `HeyGen job submission failed: ${err.message}`)
  }
}
