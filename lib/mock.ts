/**
 * Mock responses for all external API calls.
 * Used when MOCK_MODE=true in .env.local so you can develop without real API keys.
 */

import type { Brief, Script } from './types'

export const MOCK_MODE = process.env.MOCK_MODE === 'true'

// Simulated latency so the UI feels realistic in mock mode
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

// ── OpenAI ────────────────────────────────────────────────────────────────────

export async function mockGenerateBrief(campaignId: string): Promise<Omit<Brief, 'id' | 'campaign_id' | 'generated_at'>> {
  await delay(800)
  return {
    hook_concept: '[MOCK] Did you know most people ignore this one simple trick?',
    key_talking_points: [
      '[MOCK] Problem: people struggle with X every single day',
      '[MOCK] Solution: our product fixes X in under 60 seconds',
      '[MOCK] Social proof: 10,000 happy customers agree',
    ],
    cta_text: '[MOCK] Try it free — link in bio',
  }
}

export async function mockGenerateScript(briefId: string): Promise<Omit<Script, 'id' | 'brief_id' | 'generated_at'>> {
  await delay(800)
  const hookLine = '[MOCK] Stop scrolling — this changed everything for me.'
  const body =
    '[MOCK] I used to struggle with X every single day. Nothing worked — until I found this product. ' +
    'It solved X in under 60 seconds and 10,000 people already love it.'
  const ctaLine = '[MOCK] Try it free — link in bio!'
  return {
    hook_line: hookLine,
    body,
    cta_line: ctaLine,
    full_text: `${hookLine}\n\n${body}\n\n${ctaLine}`,
  }
}

// ── ElevenLabs ────────────────────────────────────────────────────────────────

export async function mockGenerateAudio(text: string): Promise<{ audioBuffer: Buffer; charsUsed: number }> {
  await delay(600)
  // Return a tiny valid MP3 header so the file isn't completely empty
  const tinyMp3 = Buffer.from('FFFB9000000000000000000000000000000000000000000000000000000000000000', 'hex')
  return { audioBuffer: tinyMp3, charsUsed: text.length }
}

// ── HeyGen ────────────────────────────────────────────────────────────────────

export async function mockCreateVideoJob(
  _scriptText: string,
  _audioUrl: string,
  _avatarId: string
): Promise<{ jobId: string }> {
  await delay(400)
  return { jobId: `mock_job_${Date.now()}` }
}

export async function mockGetVideoStatus(
  _jobId: string
): Promise<{ status: 'PROCESSING' | 'DONE' | 'FAILED'; videoUrl?: string }> {
  await delay(300)
  // Always return DONE with a placeholder video URL in mock mode
  return {
    status: 'DONE',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  }
}

// ── S3 / R2 ───────────────────────────────────────────────────────────────────

export async function mockUploadFile(
  _buffer: Buffer,
  key: string,
  _contentType: string
): Promise<string> {
  await delay(300)
  return `https://mock-storage.example.com/${key}`
}
