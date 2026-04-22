'use client'
import type { Prospect } from '@/data/types'

interface Props { prospect: Prospect }

const TECHNIQUE_CONFIG = {
  'mirror': { label: 'Mirror', color: '#63B3ED' },
  'label': { label: 'Label', color: '#B794F4' },
  'accusation-audit': { label: 'Accusation Audit', color: '#00ED64' },
}

export default function ObjectionsTab({ prospect }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ fontSize: '13px', color: '#8A9BA8', lineHeight: 1.5 }}>
        Pre-loaded objections for {prospect.name} at {prospect.company} — with the Voss technique to use for each.
      </div>

      {prospect.objections.map((obj, i) => {
        const tech = TECHNIQUE_CONFIG[obj.technique]
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
            {/* Objection */}
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                Their Objection
              </div>
              <div style={{ fontSize: '15px', color: 'var(--text)', fontWeight: 600 }}>
                "{obj.objection}"
              </div>
            </div>

            {/* Technique badge + phrase */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', background: `${tech.color}11` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '11px', fontWeight: 700,
                  color: tech.color,
                  background: `${tech.color}22`,
                  padding: '3px 8px', borderRadius: '4px',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {tech.label}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: tech.color, fontStyle: 'italic', fontWeight: 600 }}>
                {obj.techniquePhrase}
              </div>
            </div>

            {/* Response */}
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Your Response
              </div>
              <div style={{ fontSize: '14px', color: '#CBD5E0', lineHeight: 1.7 }}>
                {obj.response}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
