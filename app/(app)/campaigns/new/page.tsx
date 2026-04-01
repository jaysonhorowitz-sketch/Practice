"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewCampaignPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const fd = new FormData(e.currentTarget)
    const body = {
      clientName: fd.get("clientName"),
      productName: fd.get("productName"),
      productOneLiner: fd.get("productOneLiner"),
      targetAudience: fd.get("targetAudience"),
    }
    try {
      const res = await fetch("/api/campaigns/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? "Something went wrong")
      }
      router.push("/dashboard")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="mb-6 text-base font-semibold">New Campaign</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "clientName", label: "Client Name", placeholder: "Glow Skincare" },
          { name: "productName", label: "Product Name", placeholder: "HydraSerum Pro" },
          {
            name: "productOneLiner",
            label: "Product One-Liner",
            placeholder: "A daily serum that reduces dark spots in 2 weeks",
          },
          {
            name: "targetAudience",
            label: "Target Audience",
            placeholder: "Women aged 25–40 dealing with uneven skin tone",
          },
        ].map((field) => (
          <div key={field.name}>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              {field.label}
            </label>
            <input
              name={field.name}
              type="text"
              required
              placeholder={field.placeholder}
              className="w-full rounded border border-zinc-300 px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>
        ))}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate"}
        </button>
      </form>
    </div>
  )
}
