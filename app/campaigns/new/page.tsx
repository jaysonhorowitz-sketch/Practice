'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function NewCampaignPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    client_name: '',
    product_name: '',
    product_one_liner: '',
    target_audience: '',
  })

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/campaigns/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Something went wrong')
      }

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Campaign</h1>
        <p className="text-sm text-muted-foreground mt-1">Fill in the details to start the generation pipeline.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="client_name">Client Name</Label>
          <Input
            id="client_name"
            value={form.client_name}
            onChange={(e) => set('client_name', e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="product_name">Product Name</Label>
          <Input
            id="product_name"
            value={form.product_name}
            onChange={(e) => set('product_name', e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="product_one_liner">Product One-Liner</Label>
          <Input
            id="product_one_liner"
            placeholder="One sentence describing what the product does"
            value={form.product_one_liner}
            onChange={(e) => set('product_one_liner', e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="target_audience">Target Audience</Label>
          <Input
            id="target_audience"
            placeholder="e.g. busy moms aged 25-40"
            value={form.target_audience}
            onChange={(e) => set('target_audience', e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating…' : 'Create Campaign'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
