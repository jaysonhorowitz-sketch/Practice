import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { runPipeline } from '@/lib/pipeline'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { client_name, product_name, product_one_liner, target_audience } = body

  if (!client_name || !product_name || !product_one_liner || !target_audience) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  const { data: campaign, error } = await supabase
    .from('campaigns')
    .insert({ client_name, product_name, product_one_liner, target_audience, status: 'GENERATING' })
    .select()
    .single()

  if (error) {
    console.error('[create campaign]', error)
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 })
  }

  // Fire and forget — respond to client immediately
  runPipeline(campaign).catch((err) =>
    console.error(`[pipeline] Unhandled error for campaign ${campaign.id}:`, err)
  )

  return NextResponse.json({ id: campaign.id }, { status: 201 })
}
