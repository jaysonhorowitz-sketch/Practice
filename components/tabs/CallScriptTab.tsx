'use client'
import { useState } from 'react'
import type { Prospect } from '@/data/types'
import CallMode from '../CallMode'

interface Props {
  prospect: Prospect
  availableSlots: [string, string]
  proofPointText: string
}

function fillSlots(text: string, slots: [string, string]): string {
  return text
    .replace(/\[DATE 1\]/g, slots[0])
    .replace(/\[DATE 2\]/g, slots[1])
    .replace(/\[TIME 1\]/g, slots[0])
}

export default function CallScriptTab({ prospect, availableSlots, proofPointText }: Props) {
  const [scriptType, setScriptType] = useState<'direct' | 'ea'>('direct')
  const [callModeOpen, setCallModeOpen] = useState(false)

  const script = prospect.callScripts[scriptType]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Toggle + Call Mode button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['direct', 'ea'] as const).map(t => (
            <button
              key={t}
              onClick={() => setScriptType(t)}
              style={{
                padding: '7px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: scriptType === t ? 'var(--accent)' : 'var(--border)',
                background: scriptType === t ? '#00ED6422' : 'transparent',
                color: scriptType === t ? 'var(--accent)' : '#8A9BA8',
              }}
            >
              {t === 'direct' ? 'Direct Call' : 'Through EA'}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCallModeOpen(true)}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
            background: 'var(--accent)',
            color: '#001E2B',
          }}
        >
          Enter Call Mode →
        </button>
      </div>

      {/* Accusation audit */}
      <div style={{ padding: '14px 16px', background: '#0D1821', border: '1px solid #00ED6444', borderLeft: '3px solid var(--accent)', borderRadius: '0 8px 8px 0' }}>
        <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          Accusation Audit — Say This First
        </div>
        <div style={{ fontSize: '14px', color: '#CBD5E0', lineHeight: 1.6, fontStyle: 'italic' }}>
          {prospect.accusationAudit}
        </div>
      </div>

      {/* Script steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {script.steps.map((step, i) => (
          <div
            key={step.id}
            style={{
              background: '#0D1821',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <div style={{
              padding: '10px 14px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                width: '22px', height: '22px',
                borderRadius: '50%',
                background: '#1C2B33',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 700, color: '#8A9BA8',
                flexShrink: 0,
              }}>
                {i + 1}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#ECC94B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {step.label}
              </span>
            </div>

            <div style={{ padding: '14px' }}>
              <div style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.6, marginBottom: step.ifTheyPushBack || step.coachingNote ? '12px' : '0', whiteSpace: 'pre-wrap' }}>
                {fillSlots(step.script, availableSlots).replace(/\[PROOF POINT\]/g, proofPointText)}
              </div>

              {step.ifTheyPushBack && (
                <div style={{ padding: '10px 12px', background: '#1C2B33', borderLeft: '3px solid #ECC94B', borderRadius: '0 6px 6px 0', fontSize: '13px', color: '#ECC94B', lineHeight: 1.5, marginBottom: step.coachingNote ? '10px' : '0', fontStyle: 'italic' }}>
                  <span style={{ fontStyle: 'normal', fontSize: '11px', color: '#8A9BA8', display: 'block', marginBottom: '4px' }}>IF THEY PUSH BACK:</span>
                  {fillSlots(step.ifTheyPushBack, availableSlots)}
                </div>
              )}

              {step.coachingNote && (
                <div style={{ fontSize: '12px', color: '#8A9BA8', marginTop: step.ifTheyPushBack ? '10px' : '0' }}>
                  💡 {step.coachingNote}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Voicemail */}
      <div style={{ padding: '14px 16px', background: '#0D1821', border: '1px solid var(--border)', borderRadius: '8px' }}>
        <div style={{ fontSize: '11px', color: '#8A9BA8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          📱 Voicemail Script
        </div>
        <div style={{ fontSize: '14px', color: '#CBD5E0', lineHeight: 1.6, fontStyle: 'italic' }}>
          {fillSlots(prospect.voicemailScript, availableSlots)}
        </div>
      </div>

      {/* Call Mode overlay */}
      {callModeOpen && (
        <CallMode
          prospectName={prospect.name}
          scriptType={scriptType}
          script={script}
          accusationAudit={prospect.accusationAudit}
          availableSlots={availableSlots}
          onClose={() => setCallModeOpen(false)}
        />
      )}
    </div>
  )
}
