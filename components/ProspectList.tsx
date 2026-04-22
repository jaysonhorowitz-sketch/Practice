'use client'
import { motion, AnimatePresence } from 'framer-motion'
import type { Prospect, ProspectStatus, IcpTier } from '@/data/types'
import StatusBadge from './StatusBadge'
import PriorityScoreBar from './PriorityScoreBar'

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
}

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number]
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as [number, number, number, number]

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.28, ease: EASE_OUT } },
  exit:   { opacity: 0, x: -6, transition: { duration: 0.18, ease: EASE_IN_OUT } },
}

const TIER_COLOR: Record<IcpTier, string> = {
  A: 'var(--icp-a)',
  B: 'var(--icp-b)',
  C: 'var(--icp-c)',
}

const TIER_GLOW: Record<IcpTier, string> = {
  A: 'rgba(255,107,107,0.2)',
  B: 'rgba(255,209,102,0.2)',
  C: 'rgba(6,214,160,0.2)',
}

interface Props {
  prospects: Prospect[]
  selectedId: string | null
  onSelect: (id: string) => void
  onStatusChange: (id: string, status: ProspectStatus) => void
}

export default function ProspectList({ prospects, selectedId, onSelect, onStatusChange }: Props) {
  const sorted = [...prospects].sort((a, b) => b.priorityScore - a.priorityScore)

  return (
    <div style={{
      flex: 1,
      background: 'var(--bg-deep)',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* List header */}
      <div style={{
        padding: '14px 16px',
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(0,30,43,0.8) 0%, transparent 100%)',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
          Today&apos;s Prospects
        </div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '3px' }}>
          <span style={{ color: 'var(--icp-b)' }}>{sorted.filter(p => p.status === 'not-started').length}</span> not started
          {' · '}
          <span style={{ color: 'var(--icp-a)' }}>{sorted.filter(p => p.icpTier === 'A').length}</span> A-tier
        </div>
      </div>

      <AnimatePresence initial={false}>
      <motion.div variants={listVariants} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column' }}>
      {sorted.map(p => {
        const isSelected = p.id === selectedId
        const isContacted = p.status !== 'not-started'
        const isBooked = p.status === 'meeting-booked'

        return (
          <motion.div
            key={p.id}
            variants={itemVariants}
            onClick={() => onSelect(p.id)}
            className={`prospect-item${isSelected ? ' selected' : ''}`}
            style={{ opacity: isBooked ? 0.55 : 1 }}
          >
            {/* Name row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 800,
                color: TIER_COLOR[p.icpTier],
                background: TIER_GLOW[p.icpTier],
                padding: '2px 6px',
                borderRadius: '4px',
                flexShrink: 0,
                letterSpacing: '0.05em',
                border: `1px solid ${TIER_COLOR[p.icpTier]}44`,
              }}>
                {p.icpTier}
              </span>
              <span style={{
                fontSize: '14px',
                fontWeight: 700,
                color: isSelected ? 'var(--text)' : 'var(--text-secondary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transition: 'color 150ms cubic-bezier(0.23, 1, 0.32, 1)',
              }}>
                {p.name}
              </span>
            </div>

            {/* Title + Company */}
            <div style={{
              fontSize: '12px',
              color: 'var(--muted)',
              marginBottom: '9px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {p.title}
              <span style={{ color: 'var(--border-strong)', margin: '0 4px' }}>·</span>
              <span style={{ color: isSelected ? 'var(--text-secondary)' : 'var(--muted)' }}>{p.company}</span>
            </div>

            {/* Status badge */}
            <div style={{ marginBottom: '9px' }} onClick={e => { e.stopPropagation() }}>
              <StatusBadge status={p.status} onClick={next => onStatusChange(p.id, next)} />
            </div>

            {/* Priority bar */}
            <PriorityScoreBar score={p.priorityScore} />
          </motion.div>
        )
      })}
      </motion.div>
      </AnimatePresence>
    </div>
  )
}
