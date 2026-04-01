import OpenAI from 'openai'
import { MOCK_MODE, mockGenerateBrief, mockGenerateScript } from './mock'
import type { Brief, Script, Campaign } from './types'

const client = !MOCK_MODE ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

const BRIEF_SYSTEM_PROMPT = `You are a TikTok UGC creative strategist. Given a product, generate a compelling campaign brief.
Return valid JSON with these exact keys:
{
  "hook_concept": "string — a curiosity-driven hook idea (max 15 words)",
  "key_talking_points": ["string", "string", "string"],  // 2-3 talking points
  "cta_text": "string — a short call-to-action (max 10 words)"
}`

const SCRIPT_SYSTEM_PROMPT = `You are a TikTok UGC scriptwriter. Given a campaign brief, write a 30-45 second script.
Format: Problem→Solution. Structure: hook (0-3s) + body (3-25s) + CTA (25-30s).
Return valid JSON with these exact keys:
{
  "hook_line": "string — 1 punchy sentence (0-3s)",
  "body": "string — problem/solution narrative (3-25s)",
  "cta_line": "string — call to action (25-30s)",
  "full_text": "string — complete script joined with newlines"
}`

export async function generateBrief(
  campaign: Campaign
): Promise<{ data: Omit<Brief, 'id' | 'campaign_id' | 'generated_at'>; tokensUsed: number }> {
  if (MOCK_MODE) {
    const data = await mockGenerateBrief(campaign.id)
    return { data, tokensUsed: 0 }
  }

  const userPrompt = `Product: ${campaign.product_name}
One-liner: ${campaign.product_one_liner}
Target audience: ${campaign.target_audience}
Client: ${campaign.client_name}`

  const response = await client!.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: BRIEF_SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  })

  const raw = JSON.parse(response.choices[0].message.content!)
  if (!raw.hook_concept || !raw.key_talking_points || !raw.cta_text) {
    throw new Error('OpenAI brief response missing required fields')
  }

  return {
    data: {
      hook_concept: raw.hook_concept,
      key_talking_points: raw.key_talking_points,
      cta_text: raw.cta_text,
    },
    tokensUsed: response.usage?.total_tokens ?? 0,
  }
}

export async function generateScript(
  brief: Brief
): Promise<{ data: Omit<Script, 'id' | 'brief_id' | 'generated_at'>; tokensUsed: number }> {
  if (MOCK_MODE) {
    const data = await mockGenerateScript(brief.id)
    return { data, tokensUsed: 0 }
  }

  const userPrompt = `Hook concept: ${brief.hook_concept}
Key talking points: ${brief.key_talking_points.join(' | ')}
CTA: ${brief.cta_text}`

  const response = await client!.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SCRIPT_SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  })

  const raw = JSON.parse(response.choices[0].message.content!)
  if (!raw.hook_line || !raw.body || !raw.cta_line || !raw.full_text) {
    throw new Error('OpenAI script response missing required fields')
  }

  return {
    data: {
      hook_line: raw.hook_line,
      body: raw.body,
      cta_line: raw.cta_line,
      full_text: raw.full_text,
    },
    tokensUsed: response.usage?.total_tokens ?? 0,
  }
}
