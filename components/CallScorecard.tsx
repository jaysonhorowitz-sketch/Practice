'use client'
import { useState } from 'react'
import type { CallAnalysis, CallCategoryScore, LetterGrade } from '@/data/types'

function gradeColor(g: LetterGrade): string {
  if (g.startsWith('A')) return '#00ED64'
  if (g.startsWith('B')) return '#63B3ED'
  if (g.startsWith('C')) return '#ECC94B'
  return '#FC8181'
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 85 ? '#00ED64' : score >= 70 ? '#63B3ED' : score >= 55 ? '#ECC94B' : '#FC8181'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '4px', background: '#0D1821', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: '2px' }} />
      </div>
      <span style={{ fontSize: '11px', color: '#8A9BA8', width: '26px', textAlign: 'right' }}>{score}</span>
    </div>
  )
}

function CategoryCard({ title, cat }: { title: string; cat: CallCategoryScore }) {
  const [open, setOpen] = useState(false)
  const color = gradeColor(cat.grade)

  return (
    <div style={{ background: '#0D1821', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
      {/* Header row */}
      <div
        onClick={() => setOpen(v => !v)}
        style={{ padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>{title}</span>
            <span style={{
              fontSize: '13px', fontWeight: 800, color,
              background: `${color}22`, padding: '2px 8px', borderRadius: '4px',
            }}>{cat.grade}</span>
          </div>
          <div style={{ fontSize: '12px', color: '#8A9BA8' }}>{cat.verdict}</div>
        </div>
        <ScoreBar score={cat.score} />
        <span style={{ color: '#8A9BA8', fontSize: '12px', flexShrink: 0 }}>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Details */}
          <p style={{ fontSize: '13px', color: '#CBD5E0', lineHeight: 1.6, margin: 0 }}>{cat.details}</p>

          {/* Sub-scores */}
          {cat.subScores.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Breakdown</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cat.subScores.map((s, i) => {
                  const sc = gradeColor(s.grade as LetterGrade)
                  return (
                    <div key={i} style={{ padding: '10px 12px', background: '#1C2B33', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{
                          fontSize: '11px', fontWeight: 700, color: sc,
                          background: `${sc}22`, padding: '1px 6px', borderRadius: '3px', flexShrink: 0,
                        }}>{s.grade}</span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{s.label}</span>
                      </div>
                      <ScoreBar score={s.score} />
                      <p style={{ fontSize: '12px', color: '#8A9BA8', margin: '8px 0 0', lineHeight: 1.5 }}>{s.notes}</p>
                      {s.evidence && s.evidence !== 'none found' && (
                        <div style={{ marginTop: '8px', padding: '8px 10px', background: '#0D1821', borderLeft: '2px solid #2D4A5C', borderRadius: '0 4px 4px 0', fontSize: '12px', color: '#8A9BA8', fontStyle: 'italic' }}>
                          "{s.evidence}"
                        </div>
                      )}
                      {(s as { betterResponse?: string }).betterResponse && (
                        <div style={{ marginTop: '8px', padding: '8px 10px', background: '#00ED6411', borderLeft: '2px solid var(--accent)', borderRadius: '0 4px 4px 0', fontSize: '12px', color: '#CBD5E0' }}>
                          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Better response: </span>
                          {(s as { betterResponse?: string }).betterResponse}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Evidence */}
          {cat.evidence.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Key Moments</div>
              {cat.evidence.map((e, i) => (
                <div key={i} style={{ padding: '8px 12px', background: '#1C2B33', borderLeft: '2px solid #2D4A5C', borderRadius: '0 6px 6px 0', fontSize: '13px', color: '#8A9BA8', fontStyle: 'italic', marginBottom: '6px' }}>
                  "{e}"
                </div>
              ))}
            </div>
          )}

          {/* Improvements */}
          {cat.improvements.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', color: '#ECC94B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>How to Improve</div>
              {cat.improvements.map((imp, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <span style={{ color: '#ECC94B', flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: '13px', color: '#CBD5E0', lineHeight: 1.5 }}>{imp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface Props { analysis: CallAnalysis }

export default function CallScorecard({ analysis: a }: Props) {
  const overallColor = gradeColor(a.overallGrade)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Overall score */}
      <div style={{ padding: '20px', background: '#0D1821', border: `1px solid ${overallColor}44`, borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '12px',
            background: `${overallColor}22`, border: `2px solid ${overallColor}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: 900, color: overallColor, flexShrink: 0,
          }}>
            {a.overallGrade}
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#8A9BA8', marginBottom: '2px' }}>
              {a.prospectName} · {a.company} · {new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: overallColor }}>{a.overallScore} / 100</div>
            <div style={{ fontSize: '12px', color: '#8A9BA8' }}>{a.durationEstimate} · {a.callType === 'direct' ? 'Direct Call' : a.callType === 'ea' ? 'Through EA' : 'Call'}</div>
          </div>
        </div>

        {/* Win / Miss */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', padding: '10px 14px', background: '#00ED6411', border: '1px solid #00ED6433', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Top Win</div>
            <div style={{ fontSize: '13px', color: '#CBD5E0', lineHeight: 1.5 }}>{a.topWin}</div>
          </div>
          <div style={{ flex: 1, minWidth: '200px', padding: '10px 14px', background: '#FC818122', border: '1px solid #FC818144', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: '#FC8181', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Top Miss</div>
            <div style={{ fontSize: '13px', color: '#CBD5E0', lineHeight: 1.5 }}>{a.topMiss}</div>
          </div>
        </div>
      </div>

      {/* Category scores */}
      <CategoryCard title="Voss Techniques" cat={a.scores.voss} />
      <CategoryCard title="Command of the Message" cat={a.scores.commandOfMessage} />
      <CategoryCard title="Script Adherence" cat={a.scores.scriptAdherence} />
      <CategoryCard title="Objection Handling" cat={a.scores.objectionHandling} />

      {/* Suggested next action */}
      <div style={{ padding: '16px', background: '#0D1821', border: '1px solid var(--accent)', borderRadius: '10px' }}>
        <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          ▶ Suggested Next Action
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: '#8A9BA8', width: '60px', flexShrink: 0 }}>Action</span>
            <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 600 }}>{a.suggestedNextAction.action}</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: '#8A9BA8', width: '60px', flexShrink: 0 }}>When</span>
            <span style={{ fontSize: '13px', color: '#CBD5E0' }}>{a.suggestedNextAction.timing}</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: '#8A9BA8', width: '60px', flexShrink: 0 }}>Angle</span>
            <span style={{ fontSize: '13px', color: '#CBD5E0' }}>{a.suggestedNextAction.angle}</span>
          </div>
          {a.suggestedNextAction.draftSubject && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ fontSize: '12px', color: '#8A9BA8', width: '60px', flexShrink: 0 }}>Subject</span>
              <span style={{ fontSize: '13px', color: 'var(--accent)', fontStyle: 'italic' }}>"{a.suggestedNextAction.draftSubject}"</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
