'use client'
import { useState } from 'react'
import type { Prospect } from '@/data/types'

interface Props { prospect: Prospect }

export default function LinkedInTab({ prospect }: Props) {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const sections = [
    { id: 'connection', label: 'Connection Request Note', sublabel: '300 character limit — use when sending a connection request', content: prospect.linkedin.connectionNote },
    { id: 'inmail', label: 'InMail Message', sublabel: 'Use when not connected — longer form, more context', content: prospect.linkedin.inMail },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {sections.map(s => (
        <div key={s.id} style={{ background: '#0D1821', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>{s.label}</div>
              <div style={{ fontSize: '12px', color: '#8A9BA8', marginTop: '2px' }}>{s.sublabel}</div>
            </div>
            <button
              onClick={() => copy(s.content, s.id)}
              style={{
                padding: '5px 12px', borderRadius: '5px', fontSize: '12px', fontWeight: 600,
                cursor: 'pointer', border: '1px solid var(--border)',
                background: copied === s.id ? '#00ED6422' : 'transparent',
                color: copied === s.id ? 'var(--accent)' : '#8A9BA8',
              }}
            >
              {copied === s.id ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
          <div style={{ padding: '14px 16px', fontSize: '14px', color: '#CBD5E0', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {s.content}
          </div>
          {s.id === 'connection' && (
            <div style={{ padding: '8px 16px', borderTop: '1px solid var(--border)', fontSize: '12px', color: '#8A9BA8' }}>
              {s.content.length} / 300 characters
            </div>
          )}
        </div>
      ))}

      {/* LinkedIn profile link */}
      {prospect.linkedinUrl && (
        <div style={{ padding: '12px 16px', background: '#0D1821', border: '1px solid var(--border)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', color: '#8A9BA8' }}>LinkedIn Profile</span>
          <a
            href={`https://${prospect.linkedinUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}
          >
            Open Profile →
          </a>
        </div>
      )}
    </div>
  )
}
