import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { runPipeline } from "@/lib/pipeline"

export async function POST(req: NextRequest) {
  const { clientName, productName, productOneLiner, targetAudience } =
    await req.json()

  if (!clientName || !productName || !productOneLiner || !targetAudience) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 })
  }

  const campaign = await db.campaign.create({
    data: {
      clientName,
      productName,
      productOneLiner,
      targetAudience,
      status: "GENERATING",
    },
  })

  // Fire-and-forget pipeline
  runPipeline(campaign.id).catch((err) =>
    console.error("[create] Unhandled pipeline error:", err)
  )

  return NextResponse.json({ id: campaign.id })
}
