import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getVideoStatus } from "@/lib/heygen"
import { uploadFile, getPublicUrl } from "@/lib/storage"
import axios from "axios"

export async function GET(req: NextRequest) {
  const secret = req.headers.get("authorization")?.replace("Bearer ", "")
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const processingVideos = await db.video.findMany({
    where: { status: "PROCESSING" },
    include: { script: { include: { brief: { include: { campaign: true } } } } },
  })

  for (const video of processingVideos) {
    if (!video.heygenJobId) continue
    try {
      const result = await getVideoStatus(video.heygenJobId)

      if (result.status === "completed" && result.videoUrl) {
        // Download and re-upload to our storage
        const res = await axios.get(result.videoUrl, { responseType: "arraybuffer" })
        const buf = Buffer.from(res.data)
        const key = `video/${video.id}.mp4`
        await uploadFile(buf, key, "video/mp4")
        const videoUrl = await getPublicUrl(key)

        await db.video.update({
          where: { id: video.id },
          data: { status: "DONE", videoUrl, completedAt: new Date() },
        })
        await db.campaign.update({
          where: { id: video.script.brief.campaignId },
          data: { status: "DONE" },
        })
        await db.notification.create({
          data: {
            videoId: video.id,
            message: `Video ready for "${video.script.brief.campaign.productName}" (${video.script.brief.campaign.clientName})`,
          },
        })
      } else if (result.status === "failed") {
        await db.video.update({
          where: { id: video.id },
          data: { status: "FAILED" },
        })
        await db.campaign.update({
          where: { id: video.script.brief.campaignId },
          data: { status: "FAILED" },
        })
        await db.notification.create({
          data: {
            videoId: video.id,
            message: `Video failed for "${video.script.brief.campaign.productName}" (${video.script.brief.campaign.clientName})`,
          },
        })
      }
    } catch (err) {
      console.error(`[cron] Error polling video ${video.id}:`, err)
    }
  }

  return NextResponse.json({ polled: processingVideos.length })
}
