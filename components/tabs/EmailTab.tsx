'use client'
import { useState } from 'react'
import type { Prospect, OutreachStyle } from '@/data/types'

interface Props {
  prospect: Prospect
  activeStyle: OutreachStyle
  onStyleChange: (style: OutreachStyle) => void
}

const STYLE_LABELS: Record<OutreachStyle, string> = {
  'my-style': 'My Style',
  'value-sniper': 'Value Sniper',
  'voss': 'Voss / Empathetic',
  'challenger': 'Challenger',
}

const DAY_LABELS: Record<number, string> = {
  1: 'Day 1 — Cold Email',
  3: 'Day 3 — Follow-up',
  7: 'Day 7 — Case Study',
  14: 'Day 14 — Break-up',
}

export default function EmailTab({ prospect, activeStyle, onStyleChange }: Props) {
  const [copied, setCopied] = useState<string | null>(null)
  const emails = prospect.styleEmails[activeStyle]

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Style selector */}
      <div>
        <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          Outreach Style
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(Object.keys(STYLE_LABELS) as OutreachStyle[]).map(style => (
            <button
              key={style}
              onClick={() => onStyleChange(style)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: activeStyle === style ? 'var(--accent)' : 'var(--border)',
                background: activeStyle === style ? '#00ED6422' : 'transparent',
                color: activeStyle === style ? 'var(--accent)' : '#8A9BA8',
                transition: 'all 0.15s ease',
              }}
            >
              {STYLE_LABELS[style]}
            </button>
          ))}
        </div>
      </div>

      {/* Email sequence */}
      {emails.map((email, i) => {
        const copyId = `email-${i}`
        const fullText = `Subject: ${email.subject}\n\n${email.body}`
        return (
          <div
            key={i}
            style={{
              background: '#0D1821',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            {/* Email header */}
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{
                  fontSize: '11px', fontWeight: 700,
                  color: i === 0 ? 'var(--accent)' : '#8A9BA8',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {DAY_LABELS[email.day]}
                </span>
              </div>
              <button
                onClick={() => copy(fullText, copyId)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '5px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid var(--border)',
                  background: copied === copyId ? '#00ED6422' : 'transparent',
                  color: copied === copyId ? 'var(--accent)' : '#8A9BA8',
                  transition: 'all 0.15s ease',
                }}
              >
                {copied === copyId ? 'Copied ✓' : 'Copy'}
              </button>
            </div>

            {/* Subject */}
            <div style={{ padding: '12px 16px 0', fontSize: '13px' }}>
              <span style={{ color: '#8A9BA8', marginRight: '8px' }}>Subject:</span>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{email.subject}</span>
            </div>

            {/* Body */}
            <div style={{
              padding: '12px 16px',
              fontSize: '14px',
              color: '#CBD5E0',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
            }}>
              {email.body}
            </div>
          </div>
        )
      })}
    </div>
  )
}
