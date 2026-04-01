"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function RetryButton({ campaignId }: { campaignId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleRetry() {
    setLoading(true)
    await fetch(`/api/campaigns/${campaignId}/retry`, { method: "POST" })
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleRetry}
      disabled={loading}
      className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
    >
      {loading ? "Retrying…" : "Retry"}
    </button>
  )
}
