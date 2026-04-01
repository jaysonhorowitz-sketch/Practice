const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY!
const HEYGEN_AVATAR_ID = process.env.HEYGEN_AVATAR_ID!
const BASE_URL = "https://api.heygen.com"

export async function createVideoJob(
  scriptText: string,
  audioUrl: string,
  avatarId: string = HEYGEN_AVATAR_ID
): Promise<string> {
  const res = await fetch(`${BASE_URL}/v2/video/generate`, {
    method: "POST",
    headers: {
      "X-Api-Key": HEYGEN_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      video_inputs: [
        {
          character: {
            type: "avatar",
            avatar_id: avatarId,
            avatar_style: "normal",
          },
          voice: {
            type: "audio",
            audio_url: audioUrl,
          },
          background: {
            type: "color",
            value: "#FAFAFA",
          },
        },
      ],
      dimension: { width: 1080, height: 1920 },
      caption: true,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`HeyGen createVideoJob failed ${res.status}: ${body}`)
  }

  const data = await res.json()
  return data.data.video_id as string
}

export async function getVideoStatus(
  jobId: string
): Promise<{ status: "processing" | "completed" | "failed"; videoUrl?: string }> {
  const res = await fetch(`${BASE_URL}/v1/video_status.get?video_id=${jobId}`, {
    headers: { "X-Api-Key": HEYGEN_API_KEY },
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`HeyGen getVideoStatus failed ${res.status}: ${body}`)
  }

  const data = await res.json()
  const status = data.data.status as string

  if (status === "completed") {
    return { status: "completed", videoUrl: data.data.video_url }
  } else if (status === "failed") {
    return { status: "failed" }
  }
  return { status: "processing" }
}
