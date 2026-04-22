'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { sampleProspects } from '@/data/prospects'
import type { Prospect, ProspectStatus } from '@/data/types'
import { useSettings } from '@/hooks/useSettings'
import ProspectList from '@/components/ProspectList'
import ProspectSheet from '@/components/ProspectSheet'
import TargetsPanel from '@/components/TargetsPanel'

function calcDaysSince(lastContactDate?: string): number {
  if (!lastContactDate) return 0
  const diff = Date.now() - new Date(lastContactDate).getTime()
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
}

function calcPriorityScore(p: Prospect): number {
  const base = p.icpTier === 'A' ? 60 : p.icpTier === 'B' ? 40 : 20
  const days = calcDaysSince(p.lastContactDate)
  const recencyPenalty = Math.min(days * 2, 20)
  const statusBonus = p.status === 'meeting-booked' ? -30 : p.status === 'called' ? 5 : p.status === 'emailed' ? 10 : 0
  return Math.max(5, Math.min(100, base - recencyPenalty + statusBonus))
}

function todayGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Home() {
  const { settings, loaded } = useSettings()
  const [prospects, setProspects] = useState<Prospect[]>(() =>
    sampleProspects.map(p => ({ ...p, priorityScore: calcPriorityScore(p) }))
  )
  const [selectedId, setSelectedId] = useState<string | null>(prospects[0]?.id ?? null)
  const [leftTab, setLeftTab] = useState<'prospects' | 'targets'>('prospects')

  const selected = prospects.find(p => p.id === selectedId) ?? null

  const handleStatusChange = (id: string, status: ProspectStatus) => {
    setProspects(prev => prev.map(p => {
      if (p.id !== id) return p
      const updated = {
        ...p,
        status,
        lastContactDate: new Date().toISOString().split('T')[0],
        daysSinceContact: 0,
        outcomes: [...p.outcomes, { date: new Date().toISOString().split('T')[0], type: status as 'emailed' | 'called' | 'replied' | 'meeting' }],
      }
      return { ...updated, priorityScore: calcPriorityScore(updated) }
    }))
  }

  const handleSignalsRefreshed = (id: string, whyNow: string[], recentNews: string[], companySnapshot: string) => {
    setProspects(prev => prev.map(p =>
      p.id !== id ? p : { ...p, whyNow, recentNews, companySnapshot }
    ))
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const aCount = prospects.filter(p => p.icpTier === 'A').length
  const notStarted = prospects.filter(p => p.status === 'not-started').length

  if (!loaded) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Header */}
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-mark">M</div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text)', lineHeight: 1.1 }}>SDR Dashboard</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '1px' }}>
                {todayGreeting()}, <span style={{ color: 'var(--text-secondary)' }}>{settings.sdrName}</span> · {today}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { label: 'Total', value: prospects.length, color: 'var(--accent)' },
              { label: 'A-Tier', value: aCount, color: 'var(--icp-a)' },
              { label: 'Untouched', value: notStarted, color: 'var(--icp-b)' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="stat-block"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <Link href="/coaching" className="btn-ghost">Coaching</Link>
          <Link href="/settings" className="btn-ghost">Settings</Link>
        </div>
      </header>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', background: 'var(--bg-deep)' }}>

        {/* Left panel */}
        <div style={{ width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border)', overflow: 'hidden' }}>
          {/* Tab switcher */}
          <div className="tab-bar">
            <button
              onClick={() => setLeftTab('prospects')}
              className={`tab-btn${leftTab === 'prospects' ? ' active' : ''}`}
            >
              Prospects
            </button>
            <button
              onClick={() => setLeftTab('targets')}
              className={`tab-btn${leftTab === 'targets' ? ' active' : ''}`}
            >
              Targets
            </button>
          </div>

          {/* Panel content */}
          <div style={{ flex: 1, overflow: 'hidden', display: leftTab === 'prospects' ? 'flex' : 'block', flexDirection: 'column' }}>
            {leftTab === 'prospects' ? (
              <ProspectList
                prospects={prospects}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <TargetsPanel />
            )}
          </div>
        </div>

        {selected && leftTab === 'prospects' ? (
          <ProspectSheet
            prospect={selected}
            availableSlots={settings.availableSlots}
            proofPoints={settings.proofPoints}
            defaultStyle={settings.defaultStyle}
            onStatusChange={handleStatusChange}
            onSignalsRefreshed={handleSignalsRefreshed}
          />
        ) : leftTab === 'targets' ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)' }}>Target Accounts</div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', maxWidth: '300px', lineHeight: 1.7 }}>
              Select a company from the panel to see details,<br />or expand any card inline on the left.
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Select a prospect to get started</div>
          </div>
        )}
      </div>
    </div>
  )
}
