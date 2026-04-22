'use client'
import type { Prospect } from '@/data/types'

interface Props { prospect: Prospect }

export default function MeetingPrepTab({ prospect }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Company snapshot */}
      <div style={{ background: '#0D1821', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
        <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
          Company Snapshot
        </div>
        <div style={{ fontSize: '14px', color: '#CBD5E0', lineHeight: 1.7 }}>
          {prospect.companySnapshot}
        </div>
      </div>

      {/* Meeting brief */}
      <div style={{ background: '#0D1821', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
        <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
          Pre-Meeting Brief
        </div>
        <div style={{ fontSize: '14px', color: '#CBD5E0', lineHeight: 1.7 }}>
          {prospect.meetingPrep.brief}
        </div>
      </div>

      {/* Recent news */}
      <div style={{ background: '#0D1821', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
        <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          Recent News & Signals
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {prospect.recentNews.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }}>•</span>
              <span style={{ fontSize: '14px', color: '#CBD5E0', lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Discovery questions */}
      <div style={{ background: '#0D1821', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
        <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          Discovery Questions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {prospect.discoveryQuestions.map((q, i) => (
            <div key={i} style={{
              display: 'flex', gap: '12px', alignItems: 'flex-start',
              padding: '10px 12px', background: '#1C2B33', borderRadius: '6px',
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', flexShrink: 0, marginTop: '1px' }}>
                Q{i + 1}
              </span>
              <span style={{ fontSize: '14px', color: '#CBD5E0', lineHeight: 1.6 }}>{q}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested meeting questions */}
      <div style={{ background: '#0D1821', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
        <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          If You Get the Meeting — Ask These
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {prospect.meetingPrep.suggestedQs.map((q, i) => (
            <div key={i} style={{
              display: 'flex', gap: '12px', alignItems: 'flex-start',
              padding: '10px 12px',
              background: '#00ED6411',
              border: '1px solid #00ED6422',
              borderRadius: '6px',
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', flexShrink: 0, marginTop: '1px' }}>→</span>
              <span style={{ fontSize: '14px', color: '#CBD5E0', lineHeight: 1.6 }}>{q}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
