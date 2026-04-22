import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      prospectName: string
      company: string
      industry: string
      title: string
    }

    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tools: [{ type: 'web_search_20250305', name: 'web_search' } as any],
      messages: [{
        role: 'user',
        content: `Search for the latest news about ${body.company} (${body.industry} company). I'm a MongoDB SDR preparing to call ${body.prospectName}, their ${body.title}.

Find signals relevant to why they might need to upgrade or change their database infrastructure RIGHT NOW:
- Recent funding rounds or financial events (with dates)
- Engineering or data team hiring (job postings, LinkedIn signals)
- New product launches or scaling events
- Infrastructure or platform announcements
- Any technical debt, outages, or performance issues mentioned publicly
- Industry pressures specific to ${body.industry}

Return ONLY valid JSON (no markdown, no explanation):
{
  "whyNow": ["3-5 specific, dated signals — be concrete, e.g. 'Raised $40M Series B Jan 2025', 'Posting 8 senior backend engineer roles on LinkedIn'"],
  "recentNews": ["2-3 recent news headlines with dates, e.g. 'TechCrunch Mar 2025: ${body.company} launches real-time analytics product'"],
  "companySnapshot": "1-2 sentence summary of what the company does and their current growth stage"
}

Only include things you actually found. If a signal is older than 12 months, skip it.`,
      }],
    })

    // Extract the final text block (model may emit tool_use blocks first)
    let text = ''
    for (const block of message.content) {
      if (block.type === 'text') text = block.text
    }

    const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
    const parsed = JSON.parse(cleaned) as { whyNow: string[]; recentNews: string[]; companySnapshot: string }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('refresh-signals error:', err)
    return NextResponse.json({ error: 'Failed to refresh signals. Try again.' }, { status: 500 })
  }
}
