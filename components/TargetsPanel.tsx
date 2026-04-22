'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTargetAccounts, type SavedTarget } from '@/hooks/useTargetAccounts'

const CACHE_KEY = 'sdr-targets-cache'

type SignalLabel = 'hot' | 'good' | 'watch'

interface TargetCompany {
  company: string
  industry: string
  signalScore: number
  signalLabel: SignalLabel
  whyTarget: string[]
  roles: { title: string; location: string; url: string; postedAt: string; isTarget: boolean }[]
  totalRoles: number
  targetRoles: string[]
  news: { title: string; url: string; source: string; publishedAt: string; image: string | null }[]
  github: {
    handle: string; repoCount: number; topLanguages: string[]
    usesRelationalDb: boolean; usesMongo: boolean; stars: number; profileUrl: string
  } | null
  hnMentioned: boolean
  hnSnippet: string | null
}

const SIGNAL_CONFIG = {
  hot:   { label: 'HOT',   color: '#00ED64', bg: '#00ED6411', border: '#00ED6433' },
  good:  { label: 'GOOD',  color: '#63B3ED', bg: '#63B3ED11', border: '#63B3ED33' },
  watch: { label: 'WATCH', color: '#ECC94B', bg: '#ECC94B11', border: '#ECC94B33' },
}

const INDUSTRY_EMOJI: Record<string, string> = {}

function shouldRefresh(): boolean {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return true
    const { fetchedAt } = JSON.parse(raw) as { fetchedAt: string }
    const cached = new Date(fetchedAt)
    const now = new Date()
    const todayAt9 = new Date(now)
    todayAt9.setHours(9, 0, 0, 0)
    // Stale if cached before today's 9am and it's now past 9am
    if (now >= todayAt9 && cached < todayAt9) return true
    // Stale if cached yesterday or earlier
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    if (cached < yesterday) return true
    return false
  } catch { return true }
}

export default function TargetsPanel() {
  const [companies, setCompanies] = useState<TargetCompany[]>([])
  const [fetchedAt, setFetchedAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [signalFilter, setSignalFilter] = useState<'all' | 'hot' | 'good' | 'watch'>('all')
  const [industryFilter, setIndustryFilter] = useState<string>('all')
  const [showWatchList, setShowWatchList] = useState(false)
  const { accounts: watchList, add, remove, has } = useTargetAccounts()

  const loadFromCache = useCallback(() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY)
      if (!raw) return false
      const data = JSON.parse(raw) as { companies: TargetCompany[]; fetchedAt: string }
      setCompanies(data.companies ?? [])
      setFetchedAt(data.fetchedAt)
      return true
    } catch { return false }
  }, [])

  const fetchTargets = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/find-targets', { method: 'POST' })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(errData.error ?? `HTTP ${res.status}`)
      }
      const data = await res.json() as { companies: TargetCompany[]; fetchedAt: string; debug?: string }
      // Only cache if we actually got companies
      if ((data.companies ?? []).length > 0) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
      }
      setCompanies(data.companies ?? [])
      setFetchedAt(data.fetchedAt)
      if ((data.companies ?? []).length === 0) {
        setError(data.debug ?? 'Apify returned 0 companies.')
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error'
      setError(`Failed to load: ${msg}`)
      loadFromCache()
    } finally {
      setLoading(false)
    }
  }, [loadFromCache])

  // On mount: load cache, refresh if stale
  useEffect(() => {
    const hasCached = loadFromCache()
    if (!hasCached || shouldRefresh()) fetchTargets()
  }, [fetchTargets, loadFromCache])

  // Poll every minute for 9 AM auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      if (now.getHours() === 9 && now.getMinutes() === 0 && shouldRefresh()) {
        fetchTargets()
      }
    }, 60000)
    return () => clearInterval(interval)
  }, [fetchTargets])

  const industries = ['all', ...Array.from(new Set(companies.map(c => c.industry))).sort()]

  const filtered = companies.filter(c => {
    if (signalFilter !== 'all' && c.signalLabel !== signalFilter) return false
    if (industryFilter !== 'all' && c.industry !== industryFilter) return false
    return true
  })

  function timeLabel(iso: string): string {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Filter bar */}
      <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0, background: 'var(--bg-deep)' }}>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '7px' }}>
          {(['all', 'hot', 'good', 'watch'] as const).map(f => (
            <button
              key={f}
              onClick={() => setSignalFilter(f)}
              style={{
                padding: '4px 10px', fontSize: '11px', fontWeight: 700, borderRadius: '5px',
                border: `1px solid ${signalFilter === f ? (f === 'all' ? 'var(--border-strong)' : SIGNAL_CONFIG[f]?.border ?? 'var(--border)') : 'var(--border)'}`,
                background: signalFilter === f ? (f === 'all' ? 'var(--accent-glow)' : SIGNAL_CONFIG[f]?.bg ?? 'transparent') : 'transparent',
                color: signalFilter === f ? (f === 'all' ? 'var(--accent)' : SIGNAL_CONFIG[f]?.color ?? 'var(--muted)') : 'var(--muted)',
                cursor: 'pointer',
                transition: 'color 150ms cubic-bezier(0.23,1,0.32,1), background 150ms cubic-bezier(0.23,1,0.32,1), border-color 150ms cubic-bezier(0.23,1,0.32,1)',
              }}
            >
              {f === 'all' ? 'All' : SIGNAL_CONFIG[f].label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={industryFilter}
            onChange={e => setIndustryFilter(e.target.value)}
            style={{
              padding: '4px 8px', fontSize: '11px', borderRadius: '5px',
              background: 'var(--card)', border: '1px solid var(--border)',
              color: 'var(--text-secondary)', cursor: 'pointer', flex: 1, minWidth: 0,
            }}
          >
            {industries.map(ind => (
              <option key={ind} value={ind}>
                {ind === 'all' ? 'All Industries' : ind.charAt(0).toUpperCase() + ind.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowWatchList(v => !v)}
            style={{
              padding: '4px 10px', fontSize: '11px', fontWeight: 700, borderRadius: '5px',
              border: `1px solid ${showWatchList ? '#63B3ED44' : 'var(--border)'}`,
              background: showWatchList ? '#63B3ED11' : 'transparent',
              color: showWatchList ? '#63B3ED' : 'var(--muted)',
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'color 150ms cubic-bezier(0.23,1,0.32,1), background 150ms cubic-bezier(0.23,1,0.32,1), border-color 150ms cubic-bezier(0.23,1,0.32,1)',
            }}
          >
            Watch ({watchList.length})
          </button>
        </div>
      </div>

      {/* Company list or Watch list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px', background: 'var(--bg-deep)' }}>

        {/* Refresh / status bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 4px 8px', gap: '8px' }}>
          <span style={{ fontSize: '10px', color: 'var(--muted)' }}>
            {loading ? <span style={{ color: 'var(--accent)' }}>Refreshing…</span> : fetchedAt ? `Updated ${timeLabel(fetchedAt)}` : 'Not loaded'}
            {!loading && !error && <span style={{ color: 'var(--border-strong)' }}> · {filtered.length} companies</span>}
          </span>
          <button
            onClick={fetchTargets}
            disabled={loading}
            style={{
              padding: '3px 8px', fontSize: '10px', fontWeight: 700, borderRadius: '4px',
              border: '1px solid var(--border)', background: 'transparent',
              color: loading ? 'var(--muted)' : 'var(--accent)', cursor: loading ? 'default' : 'pointer',
              transition: 'color 150ms cubic-bezier(0.23,1,0.32,1), background 150ms cubic-bezier(0.23,1,0.32,1), border-color 150ms cubic-bezier(0.23,1,0.32,1)',
            }}
          >
            {loading ? '…' : '↻ Refresh'}
          </button>
        </div>

        {error && (
          <div style={{ padding: '10px', background: 'rgba(252,129,129,0.08)', border: '1px solid rgba(252,129,129,0.25)', borderRadius: '7px', fontSize: '12px', color: '#FC8181', marginBottom: '8px' }}>
            {error}
          </div>
        )}

        {loading && companies.length === 0 && (
          <div style={{ padding: '40px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>Searching LinkedIn Jobs…</div>
            <div style={{ fontSize: '11px', color: '#8A9BA8', marginBottom: '4px' }}>This takes 1–3 minutes.</div>
            <div style={{ fontSize: '11px', color: '#4A5568' }}>Running 7 searches via Apify. Don't close the tab.</div>
          </div>
        )}

        {/* Watch list mode */}
        {showWatchList && (
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 4px 8px' }}>
              Watch List — {watchList.length} companies
            </div>
            {watchList.length === 0 && (
              <div style={{ fontSize: '12px', color: '#4A5568', padding: '16px', textAlign: 'center' }}>
                No companies on watch list yet.<br />Click + Watch on any company.
              </div>
            )}
            {watchList.map((w: SavedTarget) => (
              <div key={w.company} style={{
                padding: '10px 12px', marginBottom: '6px',
                background: '#0D1821', border: '1px solid var(--border)',
                borderLeft: `3px solid ${SIGNAL_CONFIG[w.signalLabel]?.color ?? '#8A9BA8'}`,
                borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {w.company}
                  </div>
                  <div style={{ fontSize: '11px', color: '#8A9BA8' }}>
                    {w.industry} · Score {w.signalScore}
                  </div>
                </div>
                <button
                  onClick={() => remove(w.company)}
                  style={{ background: 'none', border: 'none', color: '#8A9BA8', cursor: 'pointer', fontSize: '13px', padding: '2px 4px' }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main company list */}
        {!showWatchList && filtered.map((c, i) => {
          const cfg = SIGNAL_CONFIG[c.signalLabel]
          const isOpen = expanded === c.company
          const isWatched = has(c.company)

          return (
            <motion.div
              key={c.company}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.4), ease: [0.23, 1, 0.32, 1] }}
              style={{
              marginBottom: '6px',
              background: '#0D1821',
              border: `1px solid ${isOpen ? cfg.border : 'var(--border)'}`,
              borderLeft: `3px solid ${cfg.color}`,
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              {/* Card header */}
              <div
                onClick={() => setExpanded(isOpen ? null : c.company)}
                style={{ padding: '10px 12px', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '10px', fontWeight: 800, letterSpacing: '0.05em',
                    padding: '2px 7px', borderRadius: '3px',
                    color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
                    flexShrink: 0,
                  }}>
                    {cfg.label}
                  </span>
                  <span style={{ fontSize: '10px', color: '#8A9BA8', flexShrink: 0 }}>
                    {c.industry}
                  </span>
                  <span style={{ flex: 1 }} />
                  <span style={{ fontSize: '10px', color: cfg.color, fontWeight: 700, flexShrink: 0 }}>
                    {c.totalRoles} roles
                  </span>
                  {c.github && <span style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '2px', background: '#1C2B33', border: '1px solid var(--border)', color: '#8A9BA8', flexShrink: 0 }}>GH</span>}
                  {c.hnMentioned && <span style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '2px', background: '#ECC94B11', border: '1px solid #ECC94B44', color: '#ECC94B', flexShrink: 0 }}>HN</span>}
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)', lineHeight: 1.2 }}>
                    {c.company}
                  </span>
                  <span style={{ fontSize: '10px', color: '#4A5568', flexShrink: 0, marginTop: '2px' }}>
                    {isOpen ? '▲' : '▼'}
                  </span>
                </div>

                {/* Top why-target bullet */}
                {c.whyTarget[0] && (
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', marginTop: '5px' }}>
                    <span style={{ color: cfg.color, fontSize: '10px', flexShrink: 0, marginTop: '1px' }}>→</span>
                    <span style={{ fontSize: '11px', color: '#CBD5E0', lineHeight: 1.4 }}>{c.whyTarget[0]}</span>
                  </div>
                )}
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div style={{ borderTop: '1px solid var(--border)', padding: '12px' }}>

                  {/* All why-target bullets */}
                  {c.whyTarget.length > 1 && (
                    <div style={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {c.whyTarget.slice(1).map((r, i) => (
                        <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                          <span style={{ color: cfg.color, fontSize: '10px', flexShrink: 0, marginTop: '2px' }}>→</span>
                          <span style={{ fontSize: '11px', color: '#CBD5E0', lineHeight: 1.4 }}>{r}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Open roles */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px' }}>
                      Open Roles
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {c.roles.map((role, i) => (
                        <a key={i} href={role.url} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '6px 8px',
                            background: role.isTarget ? `${cfg.color}09` : '#1C2B33',
                            border: `1px solid ${role.isTarget ? cfg.border : 'var(--border)'}`,
                            borderRadius: '5px', textDecoration: 'none',
                          }}
                        >
                          {role.isTarget && (
                            <span style={{ fontSize: '8px', fontWeight: 800, color: cfg.color, background: cfg.bg, padding: '1px 4px', borderRadius: '2px', flexShrink: 0 }}>
                              TARGET
                            </span>
                          )}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {role.title}
                            </div>
                            <div style={{ fontSize: '10px', color: '#8A9BA8' }}>{role.postedAt}</div>
                          </div>
                          <span style={{ fontSize: '9px', color: '#8A9BA8', flexShrink: 0 }}>↗</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Who to contact */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px' }}>
                      Who to Contact
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {c.targetRoles.map((title, i) => (
                        <span key={i} style={{
                          fontSize: '10px', padding: '3px 8px', borderRadius: '3px',
                          background: '#1C2B33', border: '1px solid var(--border)', color: '#CBD5E0',
                        }}>
                          {title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* GitHub intel */}
                  {c.github && (
                    <div style={{ marginBottom: '12px', padding: '8px 10px', background: '#1C2B33', borderRadius: '6px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px' }}>
                        GitHub Intel
                      </div>
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ fontSize: '10px', color: '#8A9BA8' }}>Repos</div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>{c.github.repoCount}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '10px', color: '#8A9BA8' }}>Stars</div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>{c.github.stars.toLocaleString()}</div>
                        </div>
                        {c.github.topLanguages.length > 0 && (
                          <div>
                            <div style={{ fontSize: '10px', color: '#8A9BA8', marginBottom: '3px' }}>Languages</div>
                            <div style={{ display: 'flex', gap: '3px' }}>
                              {c.github.topLanguages.map((l, i) => (
                                <span key={i} style={{ fontSize: '10px', padding: '1px 5px', borderRadius: '2px', background: '#0D1821', border: '1px solid var(--border)', color: '#CBD5E0' }}>
                                  {l}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '6px' }}>
                        {c.github.usesRelationalDb && (
                          <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '3px', background: '#FC818122', border: '1px solid #FC818144', color: '#FC8181', fontWeight: 700 }}>
                            Relational DB
                          </span>
                        )}
                        {c.github.usesMongo && (
                          <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '3px', background: '#00ED6411', border: '1px solid #00ED6433', color: '#00ED64', fontWeight: 700 }}>
                            ✓ MongoDB
                          </span>
                        )}
                      </div>
                      <a href={c.github.profileUrl} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ fontSize: '10px', color: '#63B3ED', textDecoration: 'none' }}>
                        ↗ github.com/{c.github.handle}
                      </a>
                    </div>
                  )}

                  {/* HN mention */}
                  {c.hnMentioned && c.hnSnippet && (
                    <div style={{ marginBottom: '12px', padding: '8px 10px', background: '#ECC94B09', border: '1px solid #ECC94B33', borderRadius: '6px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#ECC94B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>
                        HN — Who's Hiring
                      </div>
                      <div style={{ fontSize: '11px', color: '#CBD5E0', lineHeight: 1.5, fontStyle: 'italic' }}>
                        "{c.hnSnippet}…"
                      </div>
                    </div>
                  )}

                  {/* News */}
                  {c.news.length > 0 && (
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px' }}>
                        Recent News
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {c.news.map((article, i) => (
                          <a key={i} href={article.url} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            style={{
                              display: 'block', padding: '7px 9px',
                              background: '#1C2B33', border: '1px solid var(--border)',
                              borderRadius: '5px', textDecoration: 'none',
                            }}
                          >
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {article.title}
                            </div>
                            <div style={{ fontSize: '10px', color: '#8A9BA8' }}>
                              {article.source} · {article.publishedAt} ↗
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Watch / unwatch */}
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      isWatched ? remove(c.company) : add({
                        company: c.company, industry: c.industry,
                        signalScore: c.signalScore, signalLabel: c.signalLabel,
                        whyTarget: c.whyTarget, addedAt: new Date().toISOString(),
                      })
                    }}
                    style={{
                      width: '100%', padding: '7px', fontSize: '12px', fontWeight: 700,
                      borderRadius: '5px', border: `1px solid ${isWatched ? cfg.border : 'var(--border)'}`,
                      background: isWatched ? cfg.bg : 'transparent',
                      color: isWatched ? cfg.color : '#8A9BA8',
                      cursor: 'pointer',
                    }}
                  >
                    {isWatched ? '✓ On Watch List' : '+ Add to Watch List'}
                  </button>
                </div>
              )}
            </motion.div>
          )
        })}

        {!showWatchList && !loading && filtered.length === 0 && companies.length > 0 && (
          <div style={{ padding: '24px', textAlign: 'center', fontSize: '12px', color: '#8A9BA8' }}>
            No companies match current filters.
          </div>
        )}

        {/* Footer note */}
        {!showWatchList && companies.length > 0 && (
          <div style={{ padding: '10px 4px', borderTop: '1px solid var(--border)', marginTop: '8px' }}>
            <div style={{ fontSize: '10px', color: '#4A5568', lineHeight: 1.5 }}>
              Data from LinkedIn Jobs (Apify), GitHub, NewsAPI, and Hacker News. Auto-refreshes at 9 AM daily.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
