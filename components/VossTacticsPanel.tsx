'use client'
import { useState } from 'react'

const TACTICS = [
  {
    id: 'mirror',
    name: 'Mirror',
    description: 'Repeat their last 1–3 words in a curious tone. Encourages them to elaborate.',
    phrases: [
      '"Don\'t use MongoDB?"',
      '"Really busy right now?"',
      '"Happy with Postgres?"',
      '"You mentioned scalability?"',
    ],
  },
  {
    id: 'label',
    name: 'Label',
    description: 'Name their emotion. Defuses resistance and makes them feel heard.',
    phrases: [
      '"It sounds like you\'ve had a bad experience with this before."',
      '"It seems like you\'re uncertain MongoDB would help your team."',
      '"It sounds like you\'re really heads-down right now."',
      '"It looks like timing is the main concern."',
    ],
  },
  {
    id: 'audit',
    name: 'Accusation Audit',
    description: 'Proactively name their objection before they say it. Disarms and builds trust.',
    phrases: [
      '"You\'re probably thinking this is another vendor pitch."',
      '"I know you think MongoDB isn\'t right for your stack."',
      '"You might be thinking I have a quota and need your help."',
      '"You\'re probably wondering why I\'m calling now of all times."',
    ],
  },
]

export default function VossTacticsPanel() {
  const [open, setOpen] = useState<string | null>('audit')
  const [highlighted, setHighlighted] = useState<string | null>(null)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
        Voss Tactics
      </div>

      {TACTICS.map(t => (
        <div key={t.id} style={{ background: '#0D1821', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
          <button
            onClick={() => setOpen(open === t.id ? null : t.id)}
            style={{
              width: '100%',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text)',
              textAlign: 'left',
            }}
          >
            <span style={{ fontWeight: 600, fontSize: '13px' }}>{t.name}</span>
            <span style={{ marginLeft: 'auto', color: '#8A9BA8', fontSize: '12px' }}>{open === t.id ? '▲' : '▼'}</span>
          </button>

          {open === t.id && (
            <div style={{ padding: '0 12px 12px' }}>
              <p style={{ fontSize: '12px', color: '#8A9BA8', marginBottom: '10px', lineHeight: 1.5 }}>
                {t.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {t.phrases.map(phrase => (
                  <div
                    key={phrase}
                    onClick={() => setHighlighted(highlighted === phrase ? null : phrase)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontStyle: 'italic',
                      cursor: 'pointer',
                      background: highlighted === phrase ? '#00ED6422' : '#1C2B33',
                      border: highlighted === phrase ? '1px solid #00ED6488' : '1px solid transparent',
                      color: highlighted === phrase ? '#00ED64' : '#CBD5E0',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {phrase}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <div style={{
        padding: '10px 12px',
        background: '#0D1821',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        fontSize: '12px',
        color: '#8A9BA8',
        lineHeight: 1.5,
      }}>
        <strong style={{ color: '#CBD5E0' }}>FM Radio DJ Voice</strong><br />
        Slow down. Drop your tone. Let the silence breathe.
      </div>
    </div>
  )
}
