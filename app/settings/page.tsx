'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSettings } from '@/hooks/useSettings'
import type { ProofPoint, OutreachStyle } from '@/data/types'
import ProofPointArchive from '@/components/ProofPointArchive'

const STYLE_LABELS: Record<OutreachStyle, string> = {
  'my-style': 'My Style',
  'value-sniper': 'Value Sniper',
  'voss': 'Voss / Empathetic',
  'challenger': 'Challenger',
}

export default function SettingsPage() {
  const { settings, save, loaded } = useSettings()
  const [form, setForm] = useState(settings)
  const [saved, setSaved] = useState(false)

  useEffect(() => { setForm(settings) }, [loaded]) // eslint-disable-line

  const handleSave = () => {
    save(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const updateProofPoint = (id: string, field: keyof ProofPoint, value: string) => {
    setForm(f => ({
      ...f,
      proofPoints: f.proofPoints.map(p => p.id === id ? { ...p, [field]: value } : p),
    }))
  }

  const deleteProofPoint = (id: string) => {
    setForm(f => ({ ...f, proofPoints: f.proofPoints.filter(p => p.id !== id) }))
  }

  const addProofPoint = () => {
    const newPP: ProofPoint = {
      id: `custom-${Date.now()}`,
      title: 'New Proof Point',
      industry: 'general',
      stat: '',
      customerName: '',
      project: '',
    }
    setForm(f => ({ ...f, proofPoints: [...f.proofPoints, newPP] }))
  }

  if (!loaded) return null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      {/* Header */}
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="logo-mark">M</div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text)', lineHeight: 1.1 }}>SDR Dashboard</div>
            <div style={{ fontSize: '11px', color: 'var(--accent)', marginTop: '1px', fontWeight: 600 }}>Settings</div>
          </div>
        </div>
        <Link href="/" className="btn-ghost">← Back to Dashboard</Link>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}
      >

        {/* SDR Profile */}
        <section>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--text)' }}>Your Profile</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { field: 'sdrName', label: 'Your Name', placeholder: 'Jayson' },
              { field: 'sdrTitle', label: 'Your Title', placeholder: 'Account Executive, MongoDB' },
            ].map(({ field, label, placeholder }) => (
              <div key={field}>
                <label style={{ fontSize: '12px', color: '#8A9BA8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</label>
                <input
                  value={(form as unknown as Record<string, string>)[field]}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  placeholder={placeholder}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '14px', outline: 'none', transition: 'border-color 150ms cubic-bezier(0.23,1,0.32,1)' }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Available Time Slots */}
        <section>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: 'var(--text)' }}>Available Time Slots</h2>
          <p style={{ fontSize: '13px', color: '#8A9BA8', marginBottom: '16px' }}>These auto-fill into every call script and email wherever [DATE 1] and [DATE 2] appear.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[0, 1].map(i => (
              <div key={i}>
                <label style={{ fontSize: '12px', color: '#8A9BA8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Slot {i + 1}</label>
                <input
                  value={form.availableSlots[i]}
                  onChange={e => {
                    const slots = [...form.availableSlots] as [string, string]
                    slots[i] = e.target.value
                    setForm(f => ({ ...f, availableSlots: slots }))
                  }}
                  placeholder={i === 0 ? 'Thursday April 10th at 10am' : 'Friday April 11th at 2pm'}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', fontSize: '14px', outline: 'none', transition: 'border-color 150ms cubic-bezier(0.23,1,0.32,1)' }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Default Outreach Style */}
        <section>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: 'var(--text)' }}>Default Outreach Style</h2>
          <p style={{ fontSize: '13px', color: '#8A9BA8', marginBottom: '16px' }}>The app adapts this automatically based on what gets meetings booked.</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {(Object.keys(STYLE_LABELS) as OutreachStyle[]).map(style => (
              <button
                key={style}
                onClick={() => setForm(f => ({ ...f, defaultStyle: style }))}
                style={{
                  padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  border: '1px solid', borderColor: form.defaultStyle === style ? 'var(--accent)' : 'var(--border)',
                  background: form.defaultStyle === style ? '#00ED6422' : 'transparent',
                  color: form.defaultStyle === style ? 'var(--accent)' : '#8A9BA8',
                }}
              >
                {STYLE_LABELS[style]}
                {form.styleWins[style] > 0 && (
                  <span style={{ marginLeft: '6px', fontSize: '11px', color: form.defaultStyle === style ? 'var(--accent)' : '#8A9BA8' }}>
                    ({form.styleWins[style]} wins)
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Proof Point Library */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text)' }}>Proof Point Library</h2>
              <p style={{ fontSize: '13px', color: '#8A9BA8', marginTop: '4px' }}>Customer stories that auto-fill into your call scripts based on prospect industry.</p>
            </div>
            <button
              onClick={addProofPoint}
              style={{ padding: '7px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: '1px solid var(--accent)', background: 'transparent', color: 'var(--accent)' }}
            >
              + Add
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {form.proofPoints.map(pp => (
              <div key={pp.id} style={{ background: '#1C2B33', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <input
                    value={pp.title}
                    onChange={e => updateProofPoint(pp.id, 'title', e.target.value)}
                    style={{ fontSize: '14px', fontWeight: 700, background: 'none', border: 'none', color: 'var(--text)', outline: 'none', flex: 1 }}
                  />
                  <button
                    onClick={() => deleteProofPoint(pp.id)}
                    style={{ background: 'none', border: 'none', color: '#8A9BA8', cursor: 'pointer', fontSize: '16px' }}
                  >
                    ×
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { field: 'industry', label: 'Industry', placeholder: 'fintech' },
                    { field: 'customerName', label: 'Customer', placeholder: 'a leading payments company' },
                    { field: 'stat', label: 'Result / Stat', placeholder: 'reduced costs by 30%...' },
                    { field: 'project', label: 'Project', placeholder: 'real-time transaction processing' },
                  ].map(({ field, label, placeholder }) => (
                    <div key={field} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <label style={{ fontSize: '11px', color: '#8A9BA8', width: '80px', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
                      <input
                        value={(pp as unknown as Record<string, string>)[field]}
                        onChange={e => updateProofPoint(pp.id, field as keyof ProofPoint, e.target.value)}
                        placeholder={placeholder}
                        style={{ flex: 1, padding: '7px 10px', background: '#0D1821', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)', fontSize: '13px', outline: 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Proof Point Archive */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
          <ProofPointArchive
            existingIds={form.proofPoints.map(p => p.id)}
            onAdd={pp => {
              if (!form.proofPoints.find(p => p.id === pp.id)) {
                setForm(f => ({ ...f, proofPoints: [...f.proofPoints, pp] }))
              }
            }}
          />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          style={{
            padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
            border: 'none',
            background: saved ? '#00C050' : 'var(--accent)',
            color: '#001E2B',
            transition: 'background 200ms cubic-bezier(0.23,1,0.32,1), transform 160ms cubic-bezier(0.23,1,0.32,1)',
          }}
          onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)' }}
          onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = '' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = '' }}
        >
          {saved ? 'Saved ✓' : 'Save Settings'}
        </button>
      </motion.div>
    </div>
  )
}
