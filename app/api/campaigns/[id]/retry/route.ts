import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { runPipeline } from "@/lib/pipeline"

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  await db.campaign.update({
    where: { id },
    data: { status: "GENERATING" },
  })

  runPipeline(id).catch((err) =>
    console.error("[retry] Unhandled pipeline error:", err)
  )

  return NextResponse.json({ ok: true })
}
