'use client'

interface Props {
  score: number
}

export default function PriorityScoreBar({ score }: Props) {
  const clamped = Math.max(0, Math.min(100, score))
  const color = clamped >= 70 ? 'var(--accent)' : clamped >= 40 ? 'var(--icp-b)' : 'var(--icp-a)'
  const glowColor = clamped >= 70
    ? 'rgba(0,237,100,0.5)'
    : clamped >= 40
      ? 'rgba(255,209,102,0.5)'
      : 'rgba(255,107,107,0.5)'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div className="priority-bar-track">
        <div
          className="priority-bar-fill"
          style={{
            width: `${clamped}%`,
            background: color,
            boxShadow: clamped > 20 ? `0 0 6px ${glowColor}` : 'none',
          }}
        />
      </div>
      <span style={{ fontSize: '11px', fontWeight: 700, color, minWidth: '26px', textAlign: 'right', opacity: 0.85 }}>
        {clamped}
      </span>
    </div>
  )
}
