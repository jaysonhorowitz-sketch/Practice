'use client'
import { useState, useEffect } from 'react'
import type { Prospect } from '@/data/types'

interface NewsItem {
  title: string
  description: string | null
  url: string
  image: string | null
  publishedAt: string
  source: string
}

interface JobItem {
  title: string
  company: string
  location: string
  postedAt: string
  url: string
  isTarget: boolean
  salaryRange: string | null
}

interface LiveIntelData {
  news: NewsItem[]
  jobs: JobItem[]
  targetRoles: string[]
  jobCount: number
  targetHits: number
  fetchedAt: string
}

interface Props { prospect: Prospect }

export default function LiveIntelTab({ prospect }: Props) {
  const [data, setData] = useState<LiveIntelData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchIntel() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/live-intel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: prospect.company, industry: prospect.industry }),
      })
      if (!res.ok) throw new Error('Failed')
      setData(await res.json() as LiveIntelData)
    } catch {
      setError('Could not load live intel. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchIntel() }, [prospect.id])

  const targetJobs = data?.jobs.filter(j => j.isTarget) ?? []
  const otherJobs = data?.jobs.filter(j => !j.isTarget) ?? []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 18px',
        background: '#0D1821',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em',
            padding: '3px 8px', borderRadius: '4px',
            background: '#ECC94B22', border: '1px solid #ECC94B55', color: '#ECC94B',
          }}>BETA</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
              Live Intel — {prospect.company}
            </div>
            <div style={{ fontSize: '11px', color: '#8A9BA8', marginTop: '2px' }}>
              NewsAPI · Adzuna · Refreshes on demand
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {data && (
            <span style={{ fontSize: '11px', color: '#8A9BA8' }}>
              Last fetched {new Date(data.fetchedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </span>
          )}
          <button
            onClick={fetchIntel}
            disabled={loading}
            style={{
              padding: '7px 16px', fontSize: '12px', fontWeight: 700,
              borderRadius: '6px', border: '1px solid var(--border)',
              background: loading ? 'transparent' : '#00ED6411',
              color: loading ? '#8A9BA8' : 'var(--accent)',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {loading ? '⟳ Loading...' : '↻ Refresh'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: '12px 16px', background: '#FC818122', border: '1px solid #FC818144', borderRadius: '8px', fontSize: '13px', color: '#FC8181' }}>
          {error}
        </div>
      )}

      {/* Skeleton loader */}
      {loading && !data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[80, 64, 72, 64].map((h, i) => (
            <div key={i} style={{ height: `${h}px`, background: '#1C2B33', borderRadius: '8px', opacity: 0.4 + i * 0.1 }} />
          ))}
        </div>
      )}

      {data && (
        <>
          {/* Signal summary row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
            {[
              { label: 'News Articles', value: data.news.length, color: '#63B3ED' },
              { label: 'Open Roles Found', value: data.jobCount, color: '#00ED64' },
              { label: 'Target Buyer Roles', value: data.targetHits, color: data.targetHits > 0 ? '#00ED64' : '#8A9BA8' },
            ].map(stat => (
              <div key={stat.label} style={{
                padding: '16px', background: '#0D1821',
                border: `1px solid ${stat.value > 0 ? stat.color + '44' : 'var(--border)'}`,
                borderRadius: '10px',
              }}>
                <div style={{ fontSize: '11px', color: '#8A9BA8', marginBottom: '6px' }}>{stat.label}</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: stat.color }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Target roles legend */}
          <div style={{ padding: '14px 16px', background: '#0D1821', border: '1px solid var(--border)', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              Recommended Target Roles at {prospect.company}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.targetRoles.map((role, i) => (
                <span key={i} style={{
                  fontSize: '12px', padding: '4px 10px', borderRadius: '4px',
                  background: '#1C2B33', border: '1px solid var(--border)',
                  color: '#CBD5E0',
                }}>
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Jobs — target buyers first */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              Open Roles at {prospect.company}
              {data.jobCount === 0 && <span style={{ marginLeft: '8px', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— none found via Adzuna</span>}
            </div>

            {data.jobCount === 0 ? (
              <div style={{ padding: '20px', background: '#0D1821', border: '1px solid var(--border)', borderRadius: '10px', color: '#8A9BA8', fontSize: '13px' }}>
                No current job postings found for {prospect.company} on Adzuna. They may post on LinkedIn, Greenhouse, or their own careers page.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Target roles with highlight */}
                {targetJobs.map((job, i) => (
                  <a
                    key={i}
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '12px 16px',
                      background: '#00ED6409',
                      border: '1px solid #00ED6433',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#00ED6466')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#00ED6433')}
                  >
                    <span style={{
                      fontSize: '10px', fontWeight: 800, color: 'var(--accent)',
                      background: '#00ED6422', border: '1px solid #00ED6444',
                      padding: '3px 8px', borderRadius: '4px', flexShrink: 0, letterSpacing: '0.06em',
                    }}>TARGET</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {job.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#8A9BA8', display: 'flex', gap: '10px' }}>
                        <span>{job.location}</span>
                        {job.salaryRange && <span>· {job.salaryRange}</span>}
                        <span>· Posted {job.postedAt}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--accent)', flexShrink: 0 }}>↗ View</span>
                  </a>
                ))}

                {/* Other roles */}
                {otherJobs.map((job, i) => (
                  <a
                    key={i}
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '12px 16px',
                      background: '#1C2B33',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#2D4A5C')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {job.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#8A9BA8', display: 'flex', gap: '10px' }}>
                        <span>{job.location}</span>
                        {job.salaryRange && <span>· {job.salaryRange}</span>}
                        <span>· Posted {job.postedAt}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', color: '#8A9BA8', flexShrink: 0 }}>↗ View</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* News */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              Recent News
              {data.news.length === 0 && <span style={{ marginLeft: '8px', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— none found</span>}
            </div>

            {data.news.length === 0 ? (
              <div style={{ padding: '20px', background: '#0D1821', border: '1px solid var(--border)', borderRadius: '10px', color: '#8A9BA8', fontSize: '13px' }}>
                No recent news found for {prospect.company} via NewsAPI.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.news.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', gap: '14px', alignItems: 'flex-start',
                      padding: '14px 16px',
                      background: '#1C2B33',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#2D4A5C')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        style={{ width: '72px', height: '48px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.4, marginBottom: '4px' }}>
                        {item.title}
                      </div>
                      {item.description && (
                        <div style={{ fontSize: '12px', color: '#8A9BA8', lineHeight: 1.5, marginBottom: '6px',
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>
                          {item.description}
                        </div>
                      )}
                      <div style={{ fontSize: '11px', color: '#8A9BA8', display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span>{item.source}</span>
                        <span>·</span>
                        <span>{item.publishedAt}</span>
                        <span style={{ marginLeft: 'auto', color: '#63B3ED' }}>↗ Read</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Paid API upsell note */}
          <div style={{
            padding: '16px 18px',
            background: '#0D1821',
            border: '1px solid #ECC94B33',
            borderRadius: '10px',
          }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#ECC94B', marginBottom: '8px' }}>
              💡 Want more powerful signals?
            </div>
            <div style={{ fontSize: '12px', color: '#8A9BA8', lineHeight: 1.7 }}>
              This tab currently uses <strong style={{ color: '#CBD5E0' }}>NewsAPI</strong> (news) and <strong style={{ color: '#CBD5E0' }}>Adzuna</strong> (jobs) — both free tiers.
              Adding paid APIs would unlock significantly richer data:
            </div>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { api: 'Crunchbase', desc: 'Funding rounds, investors, employee headcount, acquisition history' },
                { api: 'Apollo.io', desc: 'Verified contact data, org charts, direct dials, email addresses' },
                { api: 'LinkedIn Sales Navigator', desc: 'Real-time hiring signals, role changes, company growth alerts' },
                { api: 'BuiltWith Pro', desc: 'Full tech stack — databases, frameworks, CDN, analytics tools' },
                { api: 'Bombora', desc: 'Intent data — which companies are actively researching your category' },
              ].map(({ api, desc }) => (
                <div key={api} style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>→</span>
                  <span><strong style={{ color: '#CBD5E0' }}>{api}</strong> — {desc}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
