'use client'
import { useState, useEffect } from 'react'
import type { CallAnalysis } from '@/data/types'

const STORAGE_KEY = 'sdr-call-analyses'

export function useCallAnalyses() {
  const [analyses, setAnalyses] = useState<CallAnalysis[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setAnalyses(JSON.parse(stored) as CallAnalysis[])
    } catch {}
    setLoaded(true)
  }, [])

  const save = (updated: CallAnalysis[]) => {
    setAnalyses(updated)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) } catch {}
  }

  const addAnalysis = (a: CallAnalysis) => {
    const updated = [a, ...analyses]
    save(updated)
  }

  const forProspect = (prospectId: string) =>
    analyses.filter(a => a.prospectId === prospectId).sort((a, b) => b.date.localeCompare(a.date))

  return { analyses, addAnalysis, forProspect, loaded }
}
