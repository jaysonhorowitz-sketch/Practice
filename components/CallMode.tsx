'use client'
import { useState } from 'react'
import type { CallScript, CallStep } from '@/data/types'
import VossTacticsPanel from './VossTacticsPanel'

interface Props {
  prospectName: string
  scriptType: 'direct' | 'ea'
  script: CallScript
  accusationAudit: string
  availableSlots: [string, string]
  onClose: () => void
}

function fillSlots(text: string, slots: [string, string]): string {
  return text
    .replace(/\[DATE 1\]/g, slots[0])
    .replace(/\[DATE 2\]/g, slots[1])
    .replace(/\[TIME 1\]/g, slots[0])
}

export default function CallMode({ prospectName, script, accusationAudit, availableSlots, onClose }: Props) {
  const [stepIdx, setStepIdx] = useState(0)
  const [showPushback, setShowPushback] = useState(false)

  const auditStep: CallStep = {
    id: 0,
    label: 'ACCUSATION AUDIT — USE THIS FIRST',
    script: accusationAudit,
    coachingNote: 'Say this before anything else. Disarms their objection before they can raise it.',
  }

  const allSteps = [auditStep, ...script.steps]
  const current = allSteps[stepIdx]
  const total = allSteps.length

  const prev = () => { setStepIdx(i => Math.max(0, i - 1)); setShowPushback(false) }
  const next = () => { setStepIdx(i => Math.min(total - 1, i + 1)); setShowPushback(false) }

  const filled = (text: string) => fillSlots(text, availableSlots)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        width: '100%', maxWidth: '900px',
        display: 'flex', gap: '20px',
        maxHeight: '90vh',
      }}>
        {/* Main script area */}
        <div style={{
          flex: 1,
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Call Mode — {prospectName}
              </div>
              <div style={{ fontSize: '13px', color: '#8A9BA8', marginTop: '2px' }}>
                Step {stepIdx + 1} of {total}
              </div>
            </div>
            <button
              onClick={onClose}
              style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '6px', color: '#8A9BA8', padding: '6px 12px', cursor: 'pointer', fontSize: '13px' }}
            >
              Exit Call Mode
            </button>
          </div>

          {/* Progress bar */}
          <div style={{ height: '3px', background: '#0D1821' }}>
            <div style={{ height: '100%', width: `${((stepIdx + 1) / total) * 100}%`, background: 'var(--accent)', transition: 'width 0.2s ease' }} />
          </div>

          {/* Step content */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
            {/* Step label */}
            <div style={{
              display: 'inline-block',
              fontSize: '11px', fontWeight: 700,
              color: stepIdx === 0 ? '#00ED64' : '#ECC94B',
              background: stepIdx === 0 ? '#00ED6422' : '#ECC94B22',
              padding: '4px 10px', borderRadius: '4px',
              marginBottom: '20px',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              {current.label}
            </div>

            {/* Script */}
            <div style={{
              fontSize: '20px',
              lineHeight: 1.6,
              color: 'var(--text)',
              fontWeight: 400,
              marginBottom: '24px',
              whiteSpace: 'pre-wrap',
            }}>
              {filled(current.script)}
            </div>

            {/* Pushback line */}
            {current.ifTheyPushBack && (
              <div>
                <button
                  onClick={() => setShowPushback(v => !v)}
                  style={{
                    background: 'none', border: '1px solid var(--border)',
                    borderRadius: '6px', color: '#8A9BA8',
                    padding: '6px 12px', cursor: 'pointer', fontSize: '12px',
                    marginBottom: '12px',
                  }}
                >
                  {showPushback ? '▲ Hide' : '▼ If they push back...'}
                </button>
                {showPushback && (
                  <div style={{
                    padding: '14px 16px',
                    background: '#0D1821',
                    borderLeft: '3px solid #ECC94B',
                    borderRadius: '0 6px 6px 0',
                    fontSize: '16px',
                    color: '#ECC94B',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {filled(current.ifTheyPushBack ?? '')}
                  </div>
                )}
              </div>
            )}

            {/* Coaching note */}
            {current.coachingNote && (
              <div style={{
                marginTop: '20px',
                padding: '10px 14px',
                background: '#0D1821',
                borderLeft: '3px solid #8A9BA8',
                borderRadius: '0 6px 6px 0',
                fontSize: '13px',
                color: '#8A9BA8',
                lineHeight: 1.5,
              }}>
                💡 {current.coachingNote}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <button
              onClick={prev}
              disabled={stepIdx === 0}
              style={{
                background: 'none', border: '1px solid var(--border)',
                borderRadius: '8px', color: stepIdx === 0 ? '#2D4A5C' : 'var(--text)',
                padding: '10px 20px', cursor: stepIdx === 0 ? 'default' : 'pointer',
                fontSize: '14px', fontWeight: 600,
              }}
            >
              ← Prev
            </button>

            <div style={{ display: 'flex', gap: '6px' }}>
              {allSteps.map((_, i) => (
                <div
                  key={i}
                  onClick={() => { setStepIdx(i); setShowPushback(false) }}
                  style={{
                    width: i === stepIdx ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === stepIdx ? 'var(--accent)' : i < stepIdx ? '#2D7A4F' : '#2D4A5C',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={stepIdx === total - 1}
              style={{
                background: stepIdx === total - 1 ? 'none' : 'var(--accent)',
                border: '1px solid var(--accent)',
                borderRadius: '8px',
                color: stepIdx === total - 1 ? '#2D4A5C' : '#001E2B',
                padding: '10px 24px',
                cursor: stepIdx === total - 1 ? 'default' : 'pointer',
                fontSize: '14px', fontWeight: 700,
              }}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Voss Tactics Panel */}
        <div style={{
          width: '260px',
          flexShrink: 0,
          overflowY: 'auto',
          paddingBottom: '20px',
        }}>
          <VossTacticsPanel />
        </div>
      </div>
    </div>
  )
}
