'use client'
import type { ProspectStatus } from '@/data/types'

const CONFIG: Record<ProspectStatus, { label: string; color: string; glow: string }> = {
  'not-started':    { label: 'Not Started',  color: '#8A9BA8', glow: 'rgba(138,155,168,0.15)' },
  'emailed':        { label: 'Emailed',      color: '#63B3ED', glow: 'rgba(99,179,237,0.15)'  },
  'called':         { label: 'Called',       color: 'var(--icp-b)', glow: 'rgba(255,209,102,0.15)' },
  'meeting-booked': { label: 'Meeting ✓',    color: 'var(--accent)', glow: 'rgba(0,237,100,0.18)' },
}

const ORDER: ProspectStatus[] = ['not-started', 'emailed', 'called', 'meeting-booked']

interface Props {
  status: ProspectStatus
  onClick?: (next: ProspectStatus) => void
  size?: 'sm' | 'md'
}

export default function StatusBadge({ status, onClick, size = 'sm' }: Props) {
  const { label, color, glow } = CONFIG[status]
  const px = size === 'sm' ? '8px' : '12px'
  const py = size === 'sm' ? '3px' : '6px'
  const fs = size === 'sm' ? '11px' : '13px'

  const handleClick = () => {
    if (!onClick) return
    const idx = ORDER.indexOf(status)
    const next = ORDER[(idx + 1) % ORDER.length]
    onClick(next)
  }

  const isMeeting = status === 'meeting-booked'

  return (
    <span
      onClick={handleClick}
      style={{
        display: 'inline-block',
        padding: `${py} ${px}`,
        borderRadius: '5px',
        fontSize: fs,
        fontWeight: 700,
        color,
        background: glow,
        border: `1px solid ${color}55`,
        cursor: onClick ? 'pointer' : 'default',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        letterSpacing: '0.02em',
        boxShadow: isMeeting ? `0 0 10px rgba(0,237,100,0.25)` : 'none',
        transition: 'all 0.15s ease',
      }}
      title={onClick ? 'Click to advance status' : undefined}
    >
      {label}
    </span>
  )
}
