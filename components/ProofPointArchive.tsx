'use client'
import { useState } from 'react'
import { archiveProofPoints, type ArchiveProofPoint } from '@/data/archiveProofPoints'
import type { ProofPoint } from '@/data/types'

const INDUSTRIES = [
  { key: 'all', label: 'All' },
  { key: 'fintech', label: 'Fintech' },
  { key: 'healthtech', label: 'Healthcare' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'saas', label: 'SaaS' },
  { key: 'ai', label: 'AI / ML' },
  { key: 'logistics', label: 'Logistics' },
  { key: 'media', label: 'Media' },
]

const SIZES = [
  { key: 'all', label: 'All Sizes' },
  { key: 'enterprise', label: 'Enterprise' },
  { key: 'mid-market', label: 'Mid-Market' },
  { key: 'startup', label: 'Startup / Growth' },
]

const INDUSTRY_COLORS: Record<string, string> = {
  fintech: '#63B3ED',
  healthtech: '#68D391',
  ecommerce: '#F6AD55',
  saas: '#B794F4',
  ai: '#00ED64',
  logistics: '#ECC94B',
  media: '#FC8181',
}

interface Props {
  existingIds: string[]
  onAdd: (pp: ProofPoint) => void
}

function toProofPoint(a: ArchiveProofPoint): ProofPoint {
  return {
    id: a.id,
    title: `${a.company} — ${a.useCase}`,
    industry: a.industry,
    stat: a.headline,
    customerName: a.company,
    project: a.useCase,
  }
}

export default function ProofPointArchive({ existingIds, onAdd }: Props) {
  const [search, setSearch] = useState('')
  const [industry, setIndustry] = useState('all')
  const [size, setSize] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set(existingIds))
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filtered = archiveProofPoints.filter(p => {
    const matchesIndustry = industry === 'all' || p.industry === industry
    const matchesSize = size === 'all' || p.sizeTier === size
    const matchesSearch = search === '' ||
      p.company.toLowerCase().includes(search.toLowerCase()) ||
      p.headline.toLowerCase().includes(search.toLowerCase()) ||
      p.useCase.toLowerCase().includes(search.toLowerCase())
    return matchesIndustry && matchesSize && matchesSearch
  })

  const handleAdd = (p: ArchiveProofPoint) => {
    onAdd(toProofPoint(p))
    setAddedIds(prev => new Set([...prev, p.id]))
  }

  const copyScript = async (p: ArchiveProofPoint) => {
    await navigator.clipboard.writeText(p.scriptLine)
    setCopiedId(p.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const industryColor = (ind: string) => INDUSTRY_COLORS[ind] ?? '#8A9BA8'

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text)' }}>Proof Point Archive</h2>
          <p style={{ fontSize: '13px', color: '#8A9BA8', marginTop: '4px' }}>
            Browse real MongoDB customer stories. Hit + to add any to your personal list.
          </p>
        </div>
        <span style={{ fontSize: '12px', color: '#8A9BA8' }}>{filtered.length} of {archiveProofPoints.length}</span>
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by company, industry, or use case..."
        style={{
          width: '100%', padding: '10px 14px', marginBottom: '12px',
          background: '#1C2B33', border: '1px solid var(--border)',
          borderRadius: '8px', color: 'var(--text)', fontSize: '14px', outline: 'none',
        }}
      />

      {/* Industry filters */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
        {INDUSTRIES.map(ind => (
          <button key={ind.key} onClick={() => setIndustry(ind.key)} style={{
            padding: '5px 12px', borderRadius: '5px', fontSize: '12px', fontWeight: 600,
            cursor: 'pointer', border: '1px solid',
            borderColor: industry === ind.key ? (ind.key === 'all' ? 'var(--accent)' : industryColor(ind.key)) : 'var(--border)',
            background: industry === ind.key ? (ind.key === 'all' ? '#00ED6422' : `${industryColor(ind.key)}22`) : 'transparent',
            color: industry === ind.key ? (ind.key === 'all' ? 'var(--accent)' : industryColor(ind.key)) : '#8A9BA8',
          }}>
            {ind.label}
          </button>
        ))}
      </div>

      {/* Size filters */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {SIZES.map(s => (
          <button key={s.key} onClick={() => setSize(s.key)} style={{
            padding: '4px 10px', borderRadius: '5px', fontSize: '11px', fontWeight: 600,
            cursor: 'pointer', border: '1px solid',
            borderColor: size === s.key ? 'var(--accent)' : 'var(--border)',
            background: size === s.key ? '#00ED6422' : 'transparent',
            color: size === s.key ? 'var(--accent)' : '#8A9BA8',
          }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#8A9BA8', fontSize: '14px' }}>
          No proof points match your filters.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(p => {
            const isExpanded = expandedId === p.id
            const isAdded = addedIds.has(p.id)
            const indColor = industryColor(p.industry)

            return (
              <div key={p.id} style={{
                background: '#1C2B33',
                border: `1px solid ${isExpanded ? '#2D4A5C' : 'var(--border)'}`,
                borderRadius: '10px',
                overflow: 'hidden',
                transition: 'border-color 0.15s ease',
              }}>
                {/* Card header — always visible */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : p.id)}
                  style={{
                    padding: '14px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>{p.company}</span>
                      <span style={{ fontSize: '10px', color: '#8A9BA8' }}>{isExpanded ? '▲' : '▼'}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#CBD5E0', marginBottom: '8px', lineHeight: 1.4 }}>
                      {p.headline}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: indColor, background: `${indColor}22`, padding: '2px 8px', borderRadius: '3px' }}>
                        {INDUSTRIES.find(i => i.key === p.industry)?.label ?? p.industry}
                      </span>
                      <span style={{ fontSize: '11px', color: '#8A9BA8', background: '#0D1821', padding: '2px 8px', borderRadius: '3px' }}>
                        {p.sizeLabel}
                      </span>
                      <span style={{ fontSize: '11px', color: '#8A9BA8', background: '#0D1821', padding: '2px 8px', borderRadius: '3px' }}>
                        {p.useCase}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={e => { e.stopPropagation(); if (!isAdded) handleAdd(p) }}
                    style={{
                      flexShrink: 0,
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: isAdded ? 'default' : 'pointer',
                      border: '1px solid',
                      borderColor: isAdded ? '#2D4A5C' : 'var(--accent)',
                      background: isAdded ? 'transparent' : '#00ED6422',
                      color: isAdded ? '#2D4A5C' : 'var(--accent)',
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isAdded ? 'Added ✓' : '+ Add'}
                  </button>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div style={{ borderTop: '1px solid var(--border)', padding: '16px', background: '#0D1821' }}>
                    {/* Story */}
                    <p style={{ fontSize: '14px', color: '#CBD5E0', lineHeight: 1.7, marginBottom: '14px' }}>
                      {p.story}
                    </p>

                    {/* Key stats */}
                    <div style={{ marginBottom: '16px' }}>
                      {p.keyStats.map((stat, i) => (
                        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '6px' }}>
                          <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>•</span>
                          <span style={{ fontSize: '13px', color: '#CBD5E0', lineHeight: 1.5 }}>{stat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Script line */}
                    <div style={{ padding: '14px', background: '#1C2B33', border: '1px solid var(--border)', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#ECC94B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          💬 Script Line — Copy for your call
                        </span>
                        <button
                          onClick={() => copyScript(p)}
                          style={{
                            padding: '4px 12px', borderRadius: '5px', fontSize: '12px', fontWeight: 600,
                            cursor: 'pointer', border: '1px solid var(--border)',
                            background: copiedId === p.id ? '#00ED6422' : 'transparent',
                            color: copiedId === p.id ? 'var(--accent)' : '#8A9BA8',
                          }}
                        >
                          {copiedId === p.id ? 'Copied ✓' : 'Copy'}
                        </button>
                      </div>
                      <p style={{ fontSize: '14px', color: '#ECC94B', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                        "{p.scriptLine}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
