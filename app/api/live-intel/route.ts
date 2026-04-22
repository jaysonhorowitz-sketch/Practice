import { NextResponse } from 'next/server'

const NEWS_API_KEY = process.env.NEWS_API_KEY!
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID!
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY!

// Target job titles by industry — these are the roles that signal a MongoDB buying moment
const TARGET_ROLES_BY_INDUSTRY: Record<string, string[]> = {
  fintech:    ['VP Engineering', 'Head of Data', 'Principal Engineer', 'Staff Engineer', 'CTO', 'Director of Engineering', 'Data Platform Engineer', 'Backend Engineer'],
  healthtech: ['VP Engineering', 'Head of Data Engineering', 'CTO', 'Director of Engineering', 'Data Platform Lead', 'Clinical Data Engineer'],
  ecommerce:  ['VP Engineering', 'Head of Platform', 'Staff Engineer', 'Director of Engineering', 'CTO', 'Backend Engineer', 'Data Platform Engineer'],
  saas:       ['VP Engineering', 'Head of Infrastructure', 'Staff Engineer', 'Principal Engineer', 'CTO', 'Director of Engineering'],
  ai:         ['ML Platform Engineer', 'Head of AI Infrastructure', 'Staff Engineer', 'Principal Engineer', 'CTO', 'VP Engineering'],
  logistics:  ['VP Engineering', 'Head of Data', 'Director of Engineering', 'Backend Engineer', 'CTO', 'Platform Engineer'],
  media:      ['VP Engineering', 'Head of Data', 'Backend Engineer', 'CTO', 'Director of Engineering', 'Data Platform Engineer'],
  default:    ['VP Engineering', 'Head of Data', 'CTO', 'Director of Engineering', 'Backend Engineer', 'Staff Engineer'],
}

function getTargetRoles(industry: string): string[] {
  const key = industry.toLowerCase()
  for (const [k, v] of Object.entries(TARGET_ROLES_BY_INDUSTRY)) {
    if (key.includes(k)) return v
  }
  return TARGET_ROLES_BY_INDUSTRY.default
}

interface NewsArticle {
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  source: { name: string }
}

interface AdzunaJob {
  title: string
  company: { display_name: string }
  location: { display_name: string }
  created: string
  redirect_url: string
  description: string
  salary_min?: number
  salary_max?: number
}

async function fetchNews(company: string): Promise<NewsArticle[]> {
  try {
    const url = `https://newsapi.org/v2/everything?q="${encodeURIComponent(company)}"&sortBy=publishedAt&pageSize=6&language=en&apiKey=${NEWS_API_KEY}`
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json() as { articles: NewsArticle[] }
    return (data.articles ?? []).filter(a => a.title && !a.title.includes('[Removed]'))
  } catch {
    return []
  }
}

async function fetchJobs(company: string): Promise<AdzunaJob[]> {
  try {
    const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${encodeURIComponent(company)}&results_per_page=10&content-type=application/json`
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json() as { results: AdzunaJob[] }
    return data.results ?? []
  } catch {
    return []
  }
}

function timeAgoLabel(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export async function POST(req: Request) {
  try {
    const { company, industry } = await req.json() as { company: string; industry: string }

    const [articles, jobs] = await Promise.all([
      fetchNews(company),
      fetchJobs(company),
    ])

    const targetRoles = getTargetRoles(industry)

    // Flag jobs that match target buyer roles
    const enrichedJobs = jobs.map(job => ({
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      postedAt: timeAgoLabel(job.created),
      url: job.redirect_url,
      isTarget: targetRoles.some(role =>
        job.title.toLowerCase().includes(role.toLowerCase().split(' ').pop()!.toLowerCase())
      ),
      salaryRange: job.salary_min && job.salary_max
        ? `$${Math.round(job.salary_min / 1000)}k–$${Math.round(job.salary_max / 1000)}k`
        : null,
    }))

    const enrichedNews = articles.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.urlToImage,
      publishedAt: timeAgoLabel(a.publishedAt),
      source: a.source.name,
    }))

    return NextResponse.json({
      news: enrichedNews,
      jobs: enrichedJobs,
      targetRoles,
      jobCount: enrichedJobs.length,
      targetHits: enrichedJobs.filter(j => j.isTarget).length,
      fetchedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('live-intel error:', err)
    return NextResponse.json({ error: 'Failed to load live intel.' }, { status: 500 })
  }
}
