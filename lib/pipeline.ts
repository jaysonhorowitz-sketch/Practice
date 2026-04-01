import OpenAI from "openai"
import axios from "axios"
import { db } from "./db"
import { createVideoJob } from "./heygen"
import { uploadFile, getPublicUrl } from "./storage"

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

const BRIEF_SYSTEM_PROMPT = `You are a TikTok UGC creative strategist. Given product info, generate a creative brief.
Return valid JSON with this exact shape:
{
  "hookConcept": "string — the emotional/narrative angle to open with",
  "keyTalkingPoints": ["string", "string", "string"],
  "ctaText": "string — what to tell viewers to do at the end"
}`

const SCRIPT_SYSTEM_PROMPT = `You are a TikTok UGC scriptwriter. Write a Problem→Solution TikTok script optimised for 30-45 seconds.
Structure:
- Hook (0-3s): Open with the audience's core problem/frustration
- Body (3-25s): Introduce the product as the solution with 2-3 key benefits
- CTA (25-30s): Clear call to action

Return valid JSON with this exact shape:
{
  "hookLine": "string",
  "body": "string",
  "ctaLine": "string",
  "fullText": "string — hook + body + cta joined as one script"
}`

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (err: unknown) {
    const status = (err as { status?: number; response?: { status?: number } })
      ?.status ??
      (err as { response?: { status?: number } })?.response?.status
    if (status === 429) {
      await sleep(10000)
      return fn()
    }
    throw err
  }
}

export async function runPipeline(campaignId: string) {
  try {
    const campaign = await db.campaign.findUniqueOrThrow({
      where: { id: campaignId },
    })

    const openai = getOpenAI()

    // Step 1 — Brief
    const briefCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: BRIEF_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Product: ${campaign.productName}\nDescription: ${campaign.productOneLiner}\nTarget audience: ${campaign.targetAudience}`,
        },
      ],
    })
    const briefTokens = briefCompletion.usage?.total_tokens ?? 0
    const briefData = JSON.parse(briefCompletion.choices[0].message.content ?? "{}")
    if (!briefData.hookConcept || !briefData.keyTalkingPoints || !briefData.ctaText) {
      throw new Error("Brief JSON missing required fields")
    }
    const brief = await db.brief.create({
      data: {
        campaignId,
        hookConcept: briefData.hookConcept,
        keyTalkingPoints: briefData.keyTalkingPoints,
        ctaText: briefData.ctaText,
      },
    })

    // Step 2 — Script
    const scriptCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SCRIPT_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Hook concept: ${brief.hookConcept}\nKey talking points: ${(brief.keyTalkingPoints as string[]).join(", ")}\nCTA: ${brief.ctaText}\nProduct: ${campaign.productName}\nAudience: ${campaign.targetAudience}`,
        },
      ],
    })
    const scriptTokens = scriptCompletion.usage?.total_tokens ?? 0
    const scriptData = JSON.parse(scriptCompletion.choices[0].message.content ?? "{}")
    if (!scriptData.hookLine || !scriptData.body || !scriptData.ctaLine || !scriptData.fullText) {
      throw new Error("Script JSON missing required fields")
    }
    const script = await db.script.create({
      data: {
        briefId: brief.id,
        hookLine: scriptData.hookLine,
        body: scriptData.body,
        ctaLine: scriptData.ctaLine,
        fullText: scriptData.fullText,
      },
    })

    const totalOpenAiTokens = briefTokens + scriptTokens

    // Step 3 — ElevenLabs voiceover
    const voiceRes = await withRetry(() =>
      axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`,
        {
          text: script.fullText,
          model_id: "eleven_monolingual_v1",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        },
        {
          headers: {
            "xi-api-key": process.env.ELEVENLABS_API_KEY!,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      )
    )
    const audioBuffer = Buffer.from(voiceRes.data)
    const elevenlabsChars = script.fullText.length

    // Create video record first so we have an ID for the storage key
    const video = await db.video.create({
      data: {
        scriptId: script.id,
        status: "PENDING",
        openaiTokensUsed: totalOpenAiTokens,
        elevenlabsCharsUsed: elevenlabsChars,
      },
    })

    const audioKey = `audio/${video.id}.mp3`
    await uploadFile(audioBuffer, audioKey, "audio/mpeg")
    const audioUrl = await getPublicUrl(audioKey)

    await db.video.update({
      where: { id: video.id },
      data: { audioUrl },
    })

    // Step 4 — HeyGen video job
    const heygenJobId = await withRetry(() =>
      createVideoJob(script.fullText, audioUrl)
    )

    // Estimate cost
    const openAiCost = totalOpenAiTokens * 0.000005
    const elevenlabsCost = elevenlabsChars * 0.000030
    const heygenCost = 1 * 0.05 // ~$0.05 per credit estimate
    const estimatedCostUsd = openAiCost + elevenlabsCost + heygenCost

    await db.video.update({
      where: { id: video.id },
      data: {
        heygenJobId,
        status: "PROCESSING",
        estimatedCostUsd,
      },
    })

    await db.campaign.update({
      where: { id: campaignId },
      data: { status: "GENERATING" },
    })
  } catch (err) {
    console.error(`[pipeline] Campaign ${campaignId} failed:`, err)
    await db.campaign.update({
      where: { id: campaignId },
      data: { status: "FAILED" },
    })

    const video = await db.video.findFirst({
      where: { script: { brief: { campaignId } } },
    })
    if (video) {
      await db.notification.create({
        data: {
          videoId: video.id,
          message: `Video generation failed for campaign ${campaignId}.`,
        },
      })
    }
  }
}
