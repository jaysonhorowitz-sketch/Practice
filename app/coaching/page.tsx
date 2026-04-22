'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCallAnalyses } from '@/hooks/useCallAnalyses'
import type { CallAnalysis, LetterGrade } from '@/data/types'

type SortKey = 'date' | 'score' | 'prospect'

function gradeColor(g: LetterGrade | string): string {
  if (g.startsWith('A')) return '#00ED64'
  if (g.startsWith('B')) return '#63B3ED'
  if (g.startsWith('C')) return '#ECC94B'
  return '#FC8181'
}

function gradeToNum(g: LetterGrade | string): number {
  const map: Record<string, number> = {
    'A+': 97, 'A': 93, 'A-': 90, 'B+': 87, 'B': 83, 'B-': 80,
    'C+': 77, 'C': 73, 'C-': 70, 'D': 60, 'F': 40,
  }
  return map[g] ?? 0
}

// Generate coaching insight from lowest category
function teachingPoints(analyses: CallAnalysis[]) {
  if (analyses.length < 2) return null

  const cats = ['voss', 'commandOfMessage', 'scriptAdherence', 'objectionHandling'] as const
  const catLabels: Record<string, string> = {
    voss: 'Voss Techniques',
    commandOfMessage: 'Command of the Message',
    scriptAdherence: 'Script Adherence',
    objectionHandling: 'Objection Handling',
  }

  // Average score per category
  const avgs = cats.map(c => {
    const scores = analyses.map(a => a.scores[c].score)
    const avg = scores.reduce((s, v) => s + v, 0) / scores.length
    return { key: c, label: catLabels[c], avg: Math.round(avg) }
  })

  const lowest = avgs.sort((a, b) => a.avg - b.avg)[0]

  // Collect most common improvement suggestions
  const allImprovements: string[] = []
  for (const a of analyses) {
    allImprovements.push(...(a.scores?.[lowest.key as keyof typeof a.scores]?.improvements ?? []))
  }

  // Deduplicate by similarity (simple: first 3 unique)
  const seen = new Set<string>()
  const unique: string[] = []
  for (const imp of allImprovements) {
    const key = imp.slice(0, 40).toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(imp)
    }
    if (unique.length >= 3) break
  }

  return { ...lowest, improvements: unique }
}

export default function CoachingPage() {
  const { analyses, loaded } = useCallAnalyses()
  const [sortBy, setSortBy] = useState<SortKey>('date')

  if (!loaded) return null

  const sorted = [...analyses].sort((a, b) => {
    if (sortBy === 'date') return b.date.localeCompare(a.date)
    if (sortBy === 'score') return b.overallScore - a.overallScore
    return a.prospectName.localeCompare(b.prospectName)
  })

  // Stats
  const totalCalls = analyses.length
  const avgScore = totalCalls > 0 ? Math.round(analyses.reduce((s, a) => s + a.overallScore, 0) / totalCalls) : 0

  // Trend: compare last 5 vs previous 5
  const recent = analyses.slice(0, 5).map(a => a.overallScore)
  const prior = analyses.slice(5, 10).map(a => a.overallScore)
  const recentAvg = recent.length ? Math.round(recent.reduce((s, v) => s + v, 0) / recent.length) : null
  const priorAvg = prior.length ? Math.round(prior.reduce((s, v) => s + v, 0) / prior.length) : null
  const trend = recentAvg !== null && priorAvg !== null ? recentAvg - priorAvg : null

  // Category averages
  const cats = ['voss', 'commandOfMessage', 'scriptAdherence', 'objectionHandling'] as const
  const catLabels: Record<string, string> = {
    voss: 'Voss Techniques',
    commandOfMessage: 'Command of the Message',
    scriptAdherence: 'Script Adherence',
    objectionHandling: 'Objection Handling',
  }
  const catAvgs = cats.map(c => {
    const scores = analyses.map(a => a.scores?.[c]?.score ?? 0)
    const avg = scores.length ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length) : 0
    return { key: c, label: catLabels[c], avg }
  })

  // Chart: last 10 calls in chronological order
  const chartData = [...analyses].sort((a, b) => a.date.localeCompare(b.date)).slice(-10)

  const insight = teachingPoints(analyses)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text)' }}>
      {/* Header */}
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div className="logo-mark">M</div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text)', lineHeight: 1.1 }}>SDR Dashboard</div>
              <div style={{ fontSize: '11px', color: 'var(--accent)', marginTop: '1px', fontWeight: 600 }}>Call Coaching</div>
            </div>
          </Link>
        </div>
        <Link href="/" className="btn-ghost">← Back to Dashboard</Link>
      </header>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

        {/* Header stats */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {[
            { label: 'Calls Analyzed', value: totalCalls, color: 'var(--accent)' },
            { label: 'Avg Score', value: totalCalls > 0 ? `${avgScore}/100` : '—', color: avgScore >= 80 ? '#00ED64' : avgScore >= 65 ? '#63B3ED' : avgScore > 0 ? '#ECC94B' : '#8A9BA8' },
            { label: 'Trend (last 5 vs prev 5)', value: trend !== null ? `${trend > 0 ? '+' : ''}${trend} pts` : '—', color: trend !== null ? (trend >= 0 ? '#00ED64' : '#FC8181') : '#8A9BA8' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
              style={{ flex: 1, minWidth: '180px', padding: '20px', background: '#0D1821', border: '1px solid var(--border)', borderRadius: '12px' }}
            >
              <div style={{ fontSize: '28px', fontWeight: 800, color: stat.color, fontFamily: 'var(--font-mono)', letterSpacing: '-0.02em' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#8A9BA8', marginTop: '4px' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {totalCalls === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', background: '#0D1821', border: '1px solid var(--border)', borderRadius: '12px', color: '#8A9BA8' }}>
            <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>No call analyses yet</div>
            <div style={{ fontSize: '13px' }}>Paste a call transcript in any prospect's "Call Analysis" tab to get started.</div>
          </div>
        ) : (
          <>
            {/* Score trend chart */}
            {chartData.length > 1 && (
              <div style={{ padding: '20px', background: '#0D1821', border: '1px solid var(--border)', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
                  Score Trend — Last {chartData.length} Calls
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '100px' }}>
                  {chartData.map((a, i) => {
                    const pct = a.overallScore / 100
                    const color = gradeColor(a.overallGrade)
                    return (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <div style={{ fontSize: '11px', color: '#8A9BA8', fontWeight: 600 }}>{a.overallScore}</div>
                        <div style={{ width: '100%', height: `${Math.max(pct * 72, 4)}px`, background: color, borderRadius: '4px 4px 0 0', minHeight: '4px' }} />
                        <div style={{ fontSize: '10px', color: '#8A9BA8', textAlign: 'center' }}>
                          {new Date(a.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Category averages */}
            <div style={{ padding: '20px', background: '#0D1821', border: '1px solid var(--border)', borderRadius: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Category Averages
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                {catAvgs.map((cat, i) => {
                  const color = cat.avg >= 85 ? '#00ED64' : cat.avg >= 70 ? '#63B3ED' : cat.avg >= 55 ? '#ECC94B' : '#FC8181'
                  return (
                    <motion.div
                      key={cat.key}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                      style={{ padding: '14px', background: '#1C2B33', borderRadius: '10px' }}
                    >
                      <div style={{ fontSize: '12px', color: '#8A9BA8', marginBottom: '8px' }}>{cat.label}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '24px', fontWeight: 800, color, fontFamily: 'var(--font-mono)', letterSpacing: '-0.02em' }}>{cat.avg}</span>
                        <span style={{ fontSize: '12px', color: '#8A9BA8' }}>/ 100</span>
                      </div>
                      <div style={{ height: '4px', background: '#0D1821', borderRadius: '2px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cat.avg}%` }}
                          transition={{ duration: 0.6, delay: 0.2 + i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                          style={{ height: '100%', background: color, borderRadius: '2px' }}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Teaching points */}
            {insight && insight.improvements.length > 0 && (
              <div style={{ padding: '20px', background: '#0D1821', border: '1px solid #ECC94B44', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ECC94B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  Focus Area: {insight.label}
                </div>
                <div style={{ fontSize: '12px', color: '#8A9BA8', marginBottom: '16px' }}>
                  Lowest avg score ({insight.avg}/100) across your last {analyses.length} analyzed {analyses.length === 1 ? 'call' : 'calls'} — here's what to work on:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {insight.improvements.map((imp, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px 14px', background: '#1C2B33', borderRadius: '8px' }}>
                      <span style={{ color: '#ECC94B', flexShrink: 0, marginTop: '1px' }}>→</span>
                      <span style={{ fontSize: '13px', color: '#CBD5E0', lineHeight: 1.6 }}>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All calls table */}
            <div style={{ background: '#0D1821', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  All Calls
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['date', 'score', 'prospect'] as SortKey[]).map(key => (
                    <button
                      key={key}
                      onClick={() => setSortBy(key)}
                      style={{
                        padding: '4px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        background: sortBy === key ? 'var(--accent)' : '#1C2B33',
                        color: sortBy === key ? '#001E2B' : '#8A9BA8',
                      }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Date', 'Prospect', 'Company', 'Grade', 'Top Miss', 'Next Action'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', color: '#8A9BA8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((a, i) => {
                      const color = gradeColor(a.overallGrade)
                      return (
                        <tr key={a.id} style={{ borderBottom: i < sorted.length - 1 ? '1px solid var(--border)' : 'none', background: i % 2 === 0 ? 'transparent' : '#0A1218' }}>
                          <td style={{ padding: '12px 16px', fontSize: '13px', color: '#8A9BA8', whiteSpace: 'nowrap' }}>
                            {new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap' }}>
                            {a.prospectName}
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', color: '#8A9BA8', whiteSpace: 'nowrap' }}>
                            {a.company}
                          </td>
                          <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                            <span style={{
                              fontSize: '13px', fontWeight: 800, color,
                              background: `${color}22`, padding: '2px 8px', borderRadius: '4px',
                            }}>{a.overallGrade} · {a.overallScore}</span>
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: '12px', color: '#8A9BA8', maxWidth: '240px' }}>
                            <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.topMiss}</span>
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: '12px', color: '#CBD5E0', maxWidth: '200px' }}>
                            <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.suggestedNextAction.action}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
