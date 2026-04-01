import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { StatusBadge } from "@/components/status-badge"
import { formatCost, formatDate } from "@/lib/utils"
import { RetryButton } from "./retry-button"

export const dynamic = "force-dynamic"

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const campaign = await db.campaign.findUnique({
    where: { id },
    include: {
      brief: {
        include: {
          script: {
            include: { video: true },
          },
        },
      },
    },
  })

  if (!campaign) notFound()

  const video = campaign.brief?.script?.video
  const script = campaign.brief?.script
  const brief = campaign.brief

  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-semibold">{campaign.productName}</h1>
          <p className="text-sm text-zinc-500">{campaign.clientName}</p>
        </div>
        <StatusBadge status={campaign.status} />
      </div>

      {/* Campaign info */}
      <section>
        <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
          Campaign
        </h2>
        <dl className="space-y-1 text-sm">
          <div className="flex gap-2">
            <dt className="w-36 text-zinc-500">One-liner</dt>
            <dd>{campaign.productOneLiner}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-36 text-zinc-500">Audience</dt>
            <dd>{campaign.targetAudience}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-36 text-zinc-500">Created</dt>
            <dd>{formatDate(campaign.createdAt)}</dd>
          </div>
        </dl>
      </section>

      {/* Brief */}
      {brief && (
        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
            Brief
          </h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-zinc-500">Hook concept</dt>
              <dd>{brief.hookConcept}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Key talking points</dt>
              <dd>
                <ul className="mt-1 list-inside list-disc space-y-0.5">
                  {(brief.keyTalkingPoints as string[]).map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500">CTA</dt>
              <dd>{brief.ctaText}</dd>
            </div>
          </dl>
        </section>
      )}

      {/* Script */}
      {script && (
        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
            Script
          </h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-zinc-500">Hook (0–3s)</dt>
              <dd className="font-medium">{script.hookLine}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Body (3–25s)</dt>
              <dd className="whitespace-pre-wrap">{script.body}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">CTA (25–30s)</dt>
              <dd>{script.ctaLine}</dd>
            </div>
          </dl>
        </section>
      )}

      {/* Video */}
      {video && (
        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
            Video
          </h2>
          {video.status === "DONE" && video.videoUrl ? (
            <div className="space-y-3">
              <video
                src={video.videoUrl}
                controls
                className="w-full max-w-xs rounded border border-zinc-200"
              />
              <a
                href={video.videoUrl}
                download
                className="inline-block rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-700"
              >
                Download MP4
              </a>
            </div>
          ) : video.status === "PROCESSING" || campaign.status === "GENERATING" ? (
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600" />
              Generating video…
            </div>
          ) : video.status === "FAILED" ? (
            <div className="space-y-2">
              <p className="text-sm text-red-600">Video generation failed.</p>
              <RetryButton campaignId={campaign.id} />
            </div>
          ) : null}
        </section>
      )}

      {/* Cost */}
      {video && (
        <section>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
            Cost
          </h2>
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-500">OpenAI ({video.openaiTokensUsed ?? 0} tokens)</dt>
              <dd>{formatCost((video.openaiTokensUsed ?? 0) * 0.000005)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">
                ElevenLabs ({video.elevenlabsCharsUsed ?? 0} chars)
              </dt>
              <dd>{formatCost((video.elevenlabsCharsUsed ?? 0) * 0.00003)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">HeyGen (1 credit)</dt>
              <dd>{formatCost(0.05)}</dd>
            </div>
            <div className="flex justify-between border-t border-zinc-200 pt-1 font-medium">
              <dt>Total</dt>
              <dd>{formatCost(video.estimatedCostUsd)}</dd>
            </div>
          </dl>
        </section>
      )}
    </div>
  )
}
