'use client'
import { useState, useEffect } from 'react'
import type { Settings } from '@/data/types'
import { defaultProofPoints } from '@/data/proofPoints'

const DEFAULT_SETTINGS: Settings = {
  sdrName: 'Jayson',
  sdrTitle: 'Account Executive, MongoDB',
  availableSlots: ['Thursday April 10th at 10am', 'Friday April 11th at 2pm'],
  defaultStyle: 'my-style',
  proofPoints: defaultProofPoints,
  styleWins: { 'my-style': 0, 'value-sniper': 0, 'voss': 0, 'challenger': 0 },
}

const STORAGE_KEY = 'sdr-settings'

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Settings
        setSettings({ ...DEFAULT_SETTINGS, ...parsed })
      }
    } catch {}
    setLoaded(true)
  }, [])

  const save = (updated: Settings) => {
    setSettings(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {}
  }

  const recordWin = (style: Settings['defaultStyle']) => {
    const updated = {
      ...settings,
      styleWins: { ...settings.styleWins, [style]: (settings.styleWins[style] ?? 0) + 1 },
    }
    // Auto-swap default style after 10+ outcomes to the best performer
    const wins = updated.styleWins
    const totalWins = Object.values(wins).reduce((a, b) => a + b, 0)
    if (totalWins >= 10) {
      const best = (Object.keys(wins) as Settings['defaultStyle'][]).reduce((a, b) =>
        wins[a] > wins[b] ? a : b
      )
      updated.defaultStyle = best
    }
    save(updated)
  }

  return { settings, save, loaded, recordWin }
}
