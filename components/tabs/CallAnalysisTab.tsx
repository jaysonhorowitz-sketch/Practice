'use client'
import { useState, useRef } from 'react'
import type { Prospect } from '@/data/types'
import type { CallAnalysis } from '@/data/types'
import { useCallAnalyses } from '@/hooks/useCallAnalyses'
import CallScorecard from '@/components/CallScorecard'

const LOADING_MESSAGES = [
  'Analyzing Voss techniques...',
  'Reviewing Command of the Message...',
  'Identifying objection moments...',
  'Grading script adherence...',
  'Building your scorecard...',
]

interface Props {
  prospect: Prospect
}

export default function CallAnalysisTab({ prospect }: Props) {
  const { analyses, addAnalysis, forProspect, loaded } = useCallAnalyses()
  const [transcript, setTranscript] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [activeAnalysisId, setActiveAnalysisId] = useState<string | null>(null)
  const msgIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const prospectAnalyses = loaded ? forProspect(prospect.id) : []
  const activeAnalysis = activeAnalysisId
    ? prospectAnalyses.find(a => a.id === activeAnalysisId) ?? prospectAnalyses[0]
    : prospectAnalyses[0]

  async function handleAnalyze() {
    if (!transcript.trim() || loading) return
    setLoading(true)
    setError(null)
    setLoadingMsg(0)

    // Rotate loading messages
    msgIntervalRef.current = setInterval(() => {
      setLoadingMsg(prev => (prev + 1) % LOADING_MESSAGES.length)
    }, 2200)

    try {
      const res = await fetch('/api/analyze-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: transcript.trim(),
          prospectName: prospect.name,
          company: prospect.company,
          industry: prospect.industry,
          icpTier: prospect.icpTier,
          whyNow: prospect.whyNow,
          techStack: prospect.techStack,
        }),
      })

      if (!res.ok) {
        const data = await res.json() as { error?: string }
        throw new Error(data.error ?? 'Analysis failed')
      }

      const data = await res.json() as Omit<CallAnalysis, 'id' | 'prospectId' | 'transcriptSnippet' | 'rawTranscript' | 'prospectName' | 'company'>

      const analysis: CallAnalysis = {
        ...data,
        id: `${prospect.id}-${Date.now()}`,
        prospectId: prospect.id,
        prospectName: prospect.name,
        company: prospect.company,
        transcriptSnippet: transcript.slice(0, 200),
        rawTranscript: transcript,
        date: new Date().toISOString(),
      }

      addAnalysis(analysis)
      setActiveAnalysisId(analysis.id)
      setTranscript('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    } finally {
      if (msgIntervalRef.current) clearInterval(msgIntervalRef.current)
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Input area */}
      <div style={{ background: '#0D1821', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          ▶ Analyze a Call
        </div>
        <textarea
          value={transcript}
          onChange={e => setTranscript(e.target.value)}
          placeholder={`Paste your call transcript here...\n\nExample format:\nRep: Hi, is this Jordan?\nProspect: Yeah, who's this?\nRep: Hey Jordan, this is Alex from MongoDB...`}
          disabled={loading}
          style={{
            width: '100%',
            minHeight: '160px',
            background: '#1C2B33',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text)',
            fontSize: '13px',
            fontFamily: 'inherit',
            padding: '14px',
            resize: 'vertical',
            lineHeight: 1.6,
            outline: 'none',
            boxSizing: 'border-box',
            opacity: loading ? 0.5 : 1,
          }}
        />

        {error && (
          <div style={{ marginTop: '10px', padding: '10px 14px', background: '#FC818122', border: '1px solid #FC818144', borderRadius: '8px', fontSize: '13px', color: '#FC8181' }}>
            {error}
          </div>
        )}

        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div style={{ width: '100%', height: '4px', background: '#1C2B33', borderRadius: '2px', overflow: 'hidden', flex: 1 }}>
                <div style={{
                  height: '100%', background: 'var(--accent)', borderRadius: '2px',
                  animation: 'pulse-bar 1.8s ease-in-out infinite',
                  width: '40%',
                }} />
              </div>
              <span style={{ fontSize: '13px', color: '#8A9BA8', flexShrink: 0, minWidth: '260px' }}>
                {LOADING_MESSAGES[loadingMsg]}
              </span>
            </div>
          ) : (
            <span style={{ fontSize: '12px', color: '#8A9BA8' }}>
              {transcript.trim() ? `${transcript.trim().split(/\s+/).length} words` : 'Paste a transcript above to get started'}
            </span>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!transcript.trim() || loading}
            style={{
              padding: '10px 24px',
              background: !transcript.trim() || loading ? '#1C2B33' : 'var(--accent)',
              color: !transcript.trim() || loading ? '#8A9BA8' : '#001E2B',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: !transcript.trim() || loading ? 'not-allowed' : 'pointer',
              flexShrink: 0,
              transition: 'background 0.15s',
            }}
          >
            {loading ? 'Analyzing...' : 'Analyze Call →'}
          </button>
        </div>
      </div>

      {/* Results */}
      {!loaded ? null : prospectAnalyses.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#8A9BA8', fontSize: '14px' }}>
          No call analyses yet for {prospect.name}.<br />
          <span style={{ fontSize: '12px', opacity: 0.7 }}>Paste a transcript above to get your first scorecard.</span>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* History selector (if multiple) */}
          {prospectAnalyses.length > 1 && (
            <div>
              <div style={{ fontSize: '11px', color: '#8A9BA8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                Call History — {prospectAnalyses.length} analyses
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {prospectAnalyses.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setActiveAnalysisId(a.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      background: (activeAnalysis?.id === a.id) ? '#1C2B33' : '#0D1821',
                      border: `1px solid ${(activeAnalysis?.id === a.id) ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    <span style={{
                      fontSize: '15px', fontWeight: 800,
                      color: a.overallGrade.startsWith('A') ? '#00ED64' : a.overallGrade.startsWith('B') ? '#63B3ED' : a.overallGrade.startsWith('C') ? '#ECC94B' : '#FC8181',
                      background: (a.overallGrade.startsWith('A') ? '#00ED64' : a.overallGrade.startsWith('B') ? '#63B3ED' : a.overallGrade.startsWith('C') ? '#ECC94B' : '#FC8181') + '22',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      flexShrink: 0,
                    }}>{a.overallGrade}</span>
                    <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 600 }}>{a.overallScore}/100</span>
                    <span style={{ fontSize: '12px', color: '#8A9BA8' }}>
                      {new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {a.durationEstimate}
                    </span>
                    <span style={{ fontSize: '12px', color: '#8A9BA8', marginLeft: 'auto', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {a.topWin}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active scorecard */}
          {activeAnalysis && <CallScorecard analysis={activeAnalysis} />}
        </div>
      )}

      <style>{`
        @keyframes pulse-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  )
}
