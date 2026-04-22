'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Prospect, ProspectStatus, OutreachStyle, IcpTier } from '@/data/types'
import type { ProofPoint } from '@/data/types'
import StatusBadge from './StatusBadge'
import EmailTab from './tabs/EmailTab'
import CallScriptTab from './tabs/CallScriptTab'
import LinkedInTab from './tabs/LinkedInTab'
import ObjectionsTab from './tabs/ObjectionsTab'
import MeetingPrepTab from './tabs/MeetingPrepTab'
import CallAnalysisTab from './tabs/CallAnalysisTab'

const TIER_COLOR: Record<IcpTier, string> = { A: '#E53E3E', B: '#ECC94B', C: '#68D391' }

const TABS = ['Email', 'Call Script', 'LinkedIn', 'Objections', 'Meeting Prep', 'Call Analysis'] as const
type Tab = typeof TABS[number]

interface Props {
  prospect: Prospect
  availableSlots: [string, string]
  proofPoints: ProofPoint[]
  defaultStyle: OutreachStyle
  onStatusChange: (id: string, status: ProspectStatus) => void
  onSignalsRefreshed: (id: string, whyNow: string[], recentNews: string[], companySnapshot: string) => void
}

export default function ProspectSheet({ prospect, availableSlots, proofPoints, defaultStyle, onStatusChange, onSignalsRefreshed }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Email')
  const [activeStyle, setActiveStyle] = useState<OutreachStyle>(defaultStyle)
  const [refreshing, setRefreshing] = useState(false)
  const [refreshed, setRefreshed] = useState(false)

  async function handleRefreshSignals() {
    if (refreshing) return
    setRefreshing(true)
    setRefreshed(false)
    try {
      const res = await fetch('/api/refresh-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prospectName: prospect.name,
          company: prospect.company,
          industry: prospect.industry,
          title: prospect.title,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json() as { whyNow: string[]; recentNews: string[]; companySnapshot: string }
      onSignalsRefreshed(prospect.id, data.whyNow, data.recentNews, data.companySnapshot)
      setRefreshed(true)
      setTimeout(() => setRefreshed(false), 3000)
    } catch {
      // silently fail — signals stay as-is
    } finally {
      setRefreshing(false)
    }
  }

  const proofPoint = proofPoints.find(p => p.id === prospect.suggestedProofPointId) ?? proofPoints[0]
  const proofPointText = proofPoint
    ? `We helped ${proofPoint.customerName} ${proofPoint.stat} on their ${proofPoint.project}`
    : ''

  const visibleWhyNow = prospect.whyNow.slice(0, 3)
  const hiddenWhyNow = prospect.whyNow.length - 3
  const visibleTechStack = prospect.techStack.slice(0, 3)
  const hiddenTechStack = prospect.techStack.length - 3

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Prospect header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, var(--card) 0%, rgba(13,34,53,0.95) 100%)',
        flexShrink: 0,
        boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Name + ICP + Status in one row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '21px', fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>{prospect.name}</h2>
              <span style={{
                fontSize: '11px', fontWeight: 800,
                color: TIER_COLOR[prospect.icpTier],
                background: `${TIER_COLOR[prospect.icpTier]}20`,
                padding: '2px 8px', borderRadius: '5px',
                border: `1px solid ${TIER_COLOR[prospect.icpTier]}44`,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                {prospect.icpTier}-Tier ICP
              </span>
              <div style={{ marginLeft: 'auto' }}>
                <StatusBadge status={prospect.status} onClick={next => onStatusChange(prospect.id, next)} size="md" />
              </div>
            </div>

            {/* Title + Company */}
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '11px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{prospect.title}</span>
              <span style={{ color: 'var(--border-strong)', margin: '0 6px' }}>·</span>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{prospect.company}</span>
              {prospect.phone && <span style={{ marginLeft: '14px', color: 'var(--muted)' }}>{prospect.phone}</span>}
            </div>

            {/* Why Now chips */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '7px', alignItems: 'center' }}>
              {visibleWhyNow.map((w, i) => (
                <span key={i} style={{
                  fontSize: '11px', color: 'var(--accent)',
                  background: 'var(--accent-glow)',
                  border: '1px solid var(--border-strong)',
                  padding: '3px 9px', borderRadius: '5px',
                  fontWeight: 600,
                  boxShadow: '0 0 8px rgba(0,237,100,0.1)',
                }}>
                  {w}
                </span>
              ))}
              {hiddenWhyNow > 0 && (
                <span style={{
                  fontSize: '11px', color: 'var(--muted)',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                  padding: '3px 9px', borderRadius: '5px',
                }}>
                  +{hiddenWhyNow} more
                </span>
              )}
              <button
                onClick={handleRefreshSignals}
                disabled={refreshing}
                title="Refresh live signals from the web"
                style={{
                  fontSize: '10px', fontWeight: 700,
                  padding: '3px 9px', borderRadius: '5px',
                  border: `1px solid ${refreshed ? 'var(--border-strong)' : 'var(--border)'}`,
                  background: refreshed ? 'var(--accent-glow)' : 'transparent',
                  color: refreshed ? 'var(--accent)' : 'var(--muted)',
                  cursor: refreshing ? 'not-allowed' : 'pointer',
                  opacity: refreshing ? 0.5 : 1,
                  transition: 'color 150ms cubic-bezier(0.23,1,0.32,1), background 150ms cubic-bezier(0.23,1,0.32,1), border-color 150ms cubic-bezier(0.23,1,0.32,1)',
                  letterSpacing: '0.04em',
                }}
              >
                {refreshing ? '⟳ Refreshing…' : refreshed ? '✓ Updated' : '↻ Refresh'}
              </button>
            </div>

            {/* Tech stack chips */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {visibleTechStack.map((t, i) => (
                <span key={i} style={{
                  fontSize: '11px', color: 'var(--muted)',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                  padding: '2px 8px', borderRadius: '5px',
                }}>
                  {t}
                </span>
              ))}
              {hiddenTechStack > 0 && (
                <span style={{
                  fontSize: '11px', color: 'var(--muted)',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                  padding: '2px 8px', borderRadius: '5px',
                }}>
                  +{hiddenTechStack} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="tab-bar" style={{ overflowX: 'auto' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-btn${activeTab === tab ? ' active' : ''}`}
            style={{ padding: '10px 16px', letterSpacing: '0.03em', textTransform: 'none', fontSize: '12px', fontWeight: 600 }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px', background: 'var(--bg-deep)', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            {activeTab === 'Email' && (
              <EmailTab prospect={prospect} activeStyle={activeStyle} onStyleChange={setActiveStyle} />
            )}
            {activeTab === 'Call Script' && (
              <CallScriptTab prospect={prospect} availableSlots={availableSlots} proofPointText={proofPointText} />
            )}
            {activeTab === 'LinkedIn' && (
              <LinkedInTab prospect={prospect} />
            )}
            {activeTab === 'Objections' && (
              <ObjectionsTab prospect={prospect} />
            )}
            {activeTab === 'Meeting Prep' && (
              <MeetingPrepTab prospect={prospect} />
            )}
            {activeTab === 'Call Analysis' && (
              <CallAnalysisTab prospect={prospect} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
