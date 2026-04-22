import { NextResponse } from 'next/server'
import { ApifyClient } from 'apify-client'

export const maxDuration = 300 // 5-minute route timeout

const apify = new ApifyClient({ token: process.env.APIFY_TOKEN })
const NEWS_API_KEY = process.env.NEWS_API_KEY!
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!

const EXCLUDED = new Set([
  'amazon', 'google', 'microsoft', 'meta', 'apple', 'netflix', 'ibm',
  'oracle', 'salesforce', 'sap', 'servicenow', 'mongodb', 'atlassian',
  'uber', 'airbnb', 'twitter', 'x corp', 'linkedin',
])

function isExcluded(name: string): boolean {
  const lower = name.toLowerCase()
  if (EXCLUDED.has(lower)) return true
  return ['staffing', 'recruiting', 'talent', 'consulting', 'solutions llc', 'agency', 'contract'].some(w => lower.includes(w))
}

function scoreTitle(title: string): number {
  const t = title.toLowerCase()
  if (t.includes('chief') || t.includes('cto') || t.includes('cio')) return 5
  if (t.includes('vp ') || t.includes('vice president')) return 5
  if (t.includes('head of')) return 4
  if (t.includes('director')) return 3
  if (t.includes('staff ') || t.includes('principal')) return 3
  if (t.includes('senior') || t.includes('sr.') || t.includes('sr ')) return 2
  return 1
}

function hasDbMigrationSignal(title: string, desc: string): boolean {
  const text = `${title} ${desc}`.toLowerCase()
  return (
    text.includes('postgresql') || text.includes('postgres') ||
    text.includes('mysql') || text.includes('oracle db') ||
    text.includes('sql server') || text.includes('relational database') ||
    text.includes('legacy database') || text.includes('database migration')
  )
}

function inferIndustry(companyIndustry: string, titles: string[], descs: string[]): string {
  const text = `${companyIndustry} ${[...titles, ...descs].join(' ')}`.toLowerCase()
  if (text.includes('fintech') || text.includes('payment') || text.includes('banking') || text.includes('financial')) return 'fintech'
  if (text.includes('health') || text.includes('medical') || text.includes('clinical') || text.includes('pharma')) return 'healthtech'
  if (text.includes('ecommerce') || text.includes('e-commerce') || text.includes('retail') || text.includes('marketplace')) return 'ecommerce'
  if (text.includes('logistics') || text.includes('supply chain') || text.includes('freight') || text.includes('shipping')) return 'logistics'
  if (text.includes('media') || text.includes('content') || text.includes('streaming') || text.includes('publishing')) return 'media'
  if (text.includes('ai ') || text.includes('machine learning') || text.includes('llm') || text.includes('artificial intelligence')) return 'ai'
  return 'saas'
}

const TARGET_TITLES: Record<string, string[]> = {
  fintech:    ['VP Engineering', 'Head of Data', 'CTO', 'Director of Engineering', 'Data Platform Lead'],
  healthtech: ['VP Engineering', 'Head of Data Engineering', 'CTO', 'Director of Engineering'],
  ecommerce:  ['VP Engineering', 'Head of Platform', 'CTO', 'Director of Engineering'],
  logistics:  ['VP Engineering', 'Head of Data', 'CTO', 'Director of Engineering'],
  media:      ['VP Engineering', 'Head of Data', 'CTO', 'Director of Engineering'],
  ai:         ['VP Engineering', 'Head of AI Infrastructure', 'CTO', 'ML Platform Lead'],
  saas:       ['VP Engineering', 'Head of Infrastructure', 'CTO', 'Director of Engineering'],
}

const DB_MIGRATION_LIBS = ['psycopg', 'pg', 'mysql', 'sqlalchemy', 'knex', 'sequelize', 'prisma', 'typeorm', 'hibernate']
const MONGO_LIBS = ['mongoose', 'pymongo', 'motor', 'mongodb']

interface LinkedInJob {
  title?: string
  companyName?: string
  companyIndustry?: string
  companySize?: string
  location?: string
  postedAt?: string
  jobUrl?: string
  description?: string
}

interface NewsArticle {
  title: string
  url: string
  source: { name: string }
  publishedAt: string
  urlToImage: string | null
}

// Search LinkedIn Jobs via Apify
async function searchLinkedInJobs(keywords: string): Promise<LinkedInJob[]> {
  try {
    const run = await apify.actor('bebity/linkedin-jobs-scraper').call({
      keywords,
      location: 'United States',
      datePosted: 'r2592000', // last 30 days
      maxResults: 50,
    }, { waitSecs: 300 })

    const { items } = await apify.dataset(run.defaultDatasetId).listItems()
    console.log(`[find-targets] "${keywords}" → ${items.length} jobs`)
    if (items.length > 0) {
      // Log the first item's keys so we can verify field names
      console.log(`[find-targets] sample keys:`, Object.keys(items[0] as object).join(', '))
    }
    return items as LinkedInJob[]
  } catch (err) {
    console.error(`[find-targets] Apify search failed for "${keywords}":`, err)
    return []
  }
}

async function fetchNewsForCompany(company: string): Promise<NewsArticle[]> {
  try {
    const url = `https://newsapi.org/v2/everything?q="${encodeURIComponent(company)}"&sortBy=publishedAt&pageSize=3&language=en&apiKey=${NEWS_API_KEY}`
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json() as { articles: NewsArticle[] }
    return (data.articles ?? []).filter(a => a.title && !a.title.includes('[Removed]')).slice(0, 3)
  } catch { return [] }
}

async function fetchGitHubSignals(company: string): Promise<{
  exists: boolean; repoCount: number; topLanguages: string[]
  usesRelationalDb: boolean; usesMongo: boolean; recentlyActive: boolean
  stars: number; orgHandle: string
} | null> {
  try {
    const handle = company.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    const headers = { Authorization: `token ${GITHUB_TOKEN}`, 'User-Agent': 'SDR-Dashboard' }

    let orgHandle = handle
    const orgRes = await fetch(`https://api.github.com/orgs/${handle}`, { headers })
    if (!orgRes.ok) {
      const searchRes = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(company)}+type:org&per_page=1`, { headers })
      if (!searchRes.ok) return null
      const searchData = await searchRes.json() as { items: { login: string }[] }
      if (!searchData.items?.length) return null
      orgHandle = searchData.items[0].login
    }

    const reposRes = await fetch(`https://api.github.com/orgs/${orgHandle}/repos?sort=updated&per_page=20`, { headers })
    if (!reposRes.ok) return null
    const repos = await reposRes.json() as { name: string; language: string | null; stargazers_count: number; updated_at: string; description: string | null; topics: string[] }[]

    const allText = repos.map(r => `${r.name} ${r.description ?? ''} ${(r.topics ?? []).join(' ')}`).join(' ').toLowerCase()
    const langCount: Record<string, number> = {}
    for (const repo of repos) {
      if (repo.language) langCount[repo.language] = (langCount[repo.language] ?? 0) + 1
    }
    const topLanguages = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([l]) => l)

    return {
      exists: true,
      repoCount: repos.length,
      topLanguages,
      usesRelationalDb: DB_MIGRATION_LIBS.some(l => allText.includes(l)),
      usesMongo: MONGO_LIBS.some(l => allText.includes(l)),
      recentlyActive: repos.some(r => (Date.now() - new Date(r.updated_at).getTime()) / 86400000 < 30),
      stars: repos.reduce((s, r) => s + r.stargazers_count, 0),
      orgHandle,
    }
  } catch { return null }
}

async function fetchHNSignals(company: string): Promise<{ mentioned: boolean; snippet: string | null }> {
  try {
    const searchRes = await fetch(`https://hn.algolia.com/api/v1/search?query=who+is+hiring&tags=ask_hn&hitsPerPage=1`)
    if (!searchRes.ok) return { mentioned: false, snippet: null }
    const searchData = await searchRes.json() as { hits: { objectID: string }[] }
    if (!searchData.hits?.length) return { mentioned: false, snippet: null }

    const threadId = searchData.hits[0].objectID
    const mentionRes = await fetch(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(company)}&tags=comment,story_${threadId}&hitsPerPage=3`)
    if (!mentionRes.ok) return { mentioned: false, snippet: null }
    const mentionData = await mentionRes.json() as { hits: { comment_text?: string }[] }
    if (!mentionData.hits?.length) return { mentioned: false, snippet: null }

    const raw = mentionData.hits[0].comment_text ?? ''
    const clean = raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200)
    return { mentioned: true, snippet: clean || null }
  } catch { return { mentioned: false, snippet: null } }
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

function parseCompanySize(size: string | undefined): number {
  if (!size) return 0
  const nums = size.replace(/,/g, '').match(/\d+/g)
  if (!nums) return 0
  return Math.max(...nums.map(Number))
}

export async function POST() {
  try {
    // 7 parallel LinkedIn Jobs searches via Apify
    const searchResults = await Promise.all([
      searchLinkedInJobs('data engineer'),
      searchLinkedInJobs('data platform engineer'),
      searchLinkedInJobs('VP engineering'),
      searchLinkedInJobs('head of engineering'),
      searchLinkedInJobs('backend engineer'),
      searchLinkedInJobs('database engineer'),
      searchLinkedInJobs('director of engineering'),
    ])

    // Group by company
    const allJobs = searchResults.flat()
    console.log(`[find-targets] Total raw jobs: ${allJobs.length}`)

    // If nothing came back, return debug info so the UI can show it
    if (allJobs.length === 0) {
      return NextResponse.json({
        companies: [],
        fetchedAt: new Date().toISOString(),
        debug: 'Apify returned 0 jobs across all 7 searches. Check Apify token and account credits at console.apify.com',
      })
    }

    // Log sample item keys so we can verify field names
    const sampleItem = allJobs[0] as Record<string, unknown>
    const sampleKeys = Object.keys(sampleItem).join(', ')
    console.log(`[find-targets] Sample job keys: ${sampleKeys}`)
    console.log(`[find-targets] Sample companyName:`, sampleItem.companyName, '| company:', sampleItem.company, '| organizationName:', sampleItem.organizationName)

    // Normalize field names — different actor versions use different keys
    const normalizedJobs = allJobs.map(job => {
      const raw = job as Record<string, unknown>
      return {
        ...job,
        companyName: (job.companyName ?? raw.company ?? raw.organizationName ?? raw.employer ?? '') as string,
        companyIndustry: (job.companyIndustry ?? raw.industry ?? raw.sector ?? '') as string,
        companySize: (job.companySize ?? raw.employeeCount ?? raw.companyEmployeesCount ?? '') as string,
        title: (job.title ?? raw.jobTitle ?? raw.positionTitle ?? '') as string,
        description: (job.description ?? raw.jobDescription ?? raw.descriptionText ?? '') as string,
        jobUrl: (job.jobUrl ?? raw.url ?? raw.link ?? '#') as string,
      }
    })

    const byCompany = new Map<string, {
      company: string
      industry: string
      jobs: LinkedInJob[]
    }>()

    for (const job of normalizedJobs) {
      const name = job.companyName?.trim()
      if (!name || isExcluded(name)) continue
      // Skip very large companies (enterprise) — focus on growth-stage
      if (parseCompanySize(job.companySize) > 10000) continue

      if (!byCompany.has(name)) {
        byCompany.set(name, { company: name, industry: job.companyIndustry ?? '', jobs: [] })
      }
      const existing = byCompany.get(name)!
      if (!existing.jobs.find(j => j.title === job.title)) existing.jobs.push(job)
    }

    console.log(`[find-targets] Companies after filter: ${byCompany.size}`)

    if (byCompany.size === 0) {
      return NextResponse.json({
        companies: [],
        fetchedAt: new Date().toISOString(),
        debug: `Got ${allJobs.length} raw jobs but 0 passed filters. Sample keys: ${sampleKeys}. Sample companyName: "${sampleItem.companyName ?? sampleItem.company ?? sampleItem.organizationName ?? 'MISSING'}"`,
      })
    }

    // Score and rank
    const companies = [...byCompany.values()]
      .map(c => {
        let score = 0
        for (const job of c.jobs) {
          score += scoreTitle(job.title ?? '')
          if (hasDbMigrationSignal(job.title ?? '', job.description ?? '')) score += 2
        }
        if (c.jobs.length >= 5) score += 4
        else if (c.jobs.length >= 3) score += 2
        return { ...c, score }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 60)

    // Enrich top 15 with GitHub + HN + News
    const top15 = companies.slice(0, 15)
    const [newsResults, githubResults, hnResults] = await Promise.all([
      Promise.all(top15.map(c => fetchNewsForCompany(c.company))),
      Promise.all(top15.map(c => fetchGitHubSignals(c.company))),
      Promise.all(top15.map(c => fetchHNSignals(c.company))),
    ])

    const results = companies.map((c, i) => {
      const news = i < 15 ? newsResults[i] : []
      const github = i < 15 ? githubResults[i] : null
      const hn = i < 15 ? hnResults[i] : null
      const industry = inferIndustry(c.industry, c.jobs.map(j => j.title ?? ''), c.jobs.map(j => j.description ?? ''))

      let finalScore = c.score
      if (github?.usesRelationalDb) finalScore += 4
      if (github?.recentlyActive) finalScore += 2
      if (github?.repoCount && github.repoCount > 20) finalScore += 1
      if (hn?.mentioned) finalScore += 3

      const signal = finalScore >= 16 ? 'hot' : finalScore >= 9 ? 'good' : 'watch'

      const whyTarget: string[] = []
      const totalRoles = c.jobs.length
      const seniorCount = c.jobs.filter(j => scoreTitle(j.title ?? '') >= 4).length
      const dataCount = c.jobs.filter(j => (j.title ?? '').toLowerCase().includes('data')).length
      const dbCount = c.jobs.filter(j => hasDbMigrationSignal(j.title ?? '', j.description ?? '')).length

      if (totalRoles >= 5) whyTarget.push(`${totalRoles} open engineering/data roles on LinkedIn — major team expansion`)
      else whyTarget.push(`${totalRoles} open engineering/data role${totalRoles > 1 ? 's' : ''} on LinkedIn`)
      if (seniorCount > 0) whyTarget.push(`Hiring ${seniorCount} senior/leadership role${seniorCount > 1 ? 's' : ''} — decision-maker access`)
      if (dataCount >= 2) whyTarget.push(`${dataCount} data engineering roles — building out data infrastructure`)
      if (dbCount > 0) whyTarget.push(`Job descriptions reference SQL/relational databases — migration opportunity`)
      if (github?.usesRelationalDb) whyTarget.push(`GitHub repos show relational DB usage — confirmed migration target`)
      if (github?.usesMongo) whyTarget.push(`GitHub shows existing MongoDB usage — expansion opportunity`)
      if (hn?.mentioned) whyTarget.push(`Mentioned in Hacker News "Who is Hiring" — engineering-led culture`)
      if (news && news.length > 0) whyTarget.push(`Recent press coverage — active company`)

      const topRoles = c.jobs
        .sort((a, b) => scoreTitle(b.title ?? '') - scoreTitle(a.title ?? ''))
        .slice(0, 5)
        .map(j => ({
          title: j.title ?? '',
          location: j.location ?? 'United States',
          url: j.jobUrl ?? '#',
          postedAt: j.postedAt ? timeAgo(j.postedAt) : 'recently',
          isTarget: scoreTitle(j.title ?? '') >= 3,
        }))

      return {
        company: c.company,
        industry,
        signalScore: finalScore,
        signalLabel: signal as 'hot' | 'good' | 'watch',
        whyTarget: whyTarget.slice(0, 5),
        roles: topRoles,
        totalRoles,
        targetRoles: TARGET_TITLES[industry] ?? TARGET_TITLES.saas,
        news: (news ?? []).map(n => ({
          title: n.title, url: n.url, source: n.source.name,
          publishedAt: timeAgo(n.publishedAt), image: n.urlToImage,
        })),
        github: github ? {
          handle: github.orgHandle, repoCount: github.repoCount,
          topLanguages: github.topLanguages,
          usesRelationalDb: github.usesRelationalDb,
          usesMongo: github.usesMongo,
          stars: github.stars,
          profileUrl: `https://github.com/${github.orgHandle}`,
        } : null,
        hnMentioned: hn?.mentioned ?? false,
        hnSnippet: hn?.snippet ?? null,
      }
    })

    return NextResponse.json({ companies: results, fetchedAt: new Date().toISOString() })
  } catch (err) {
    console.error('find-targets error:', err)
    return NextResponse.json({ error: 'Failed to load target accounts.' }, { status: 500 })
  }
}
