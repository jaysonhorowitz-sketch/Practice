'use client'
import { useState, useEffect } from 'react'

export interface SavedTarget {
  company: string
  industry: string
  signalScore: number
  signalLabel: 'hot' | 'good' | 'watch'
  whyTarget: string[]
  addedAt: string
}

const STORAGE_KEY = 'sdr-target-accounts'

export function useTargetAccounts() {
  const [accounts, setAccounts] = useState<SavedTarget[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setAccounts(JSON.parse(stored) as SavedTarget[])
    } catch {}
    setLoaded(true)
  }, [])

  const save = (updated: SavedTarget[]) => {
    setAccounts(updated)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) } catch {}
  }

  const add = (t: SavedTarget) => {
    if (accounts.find(a => a.company === t.company)) return
    save([t, ...accounts])
  }

  const remove = (company: string) => save(accounts.filter(a => a.company !== company))

  const has = (company: string) => accounts.some(a => a.company === company)

  return { accounts, add, remove, has, loaded }
}
