import axios from 'axios'
import { MOCK_MODE, mockCreateVideoJob, mockGetVideoStatus } from './mock'

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY
const HEYGEN_AVATAR_ID = process.env.HEYGEN_AVATAR_ID

const heygenClient = axios.create({
  baseURL: 'https://api.heygen.com/v2',
  headers: { 'X-Api-Key': HEYGEN_API_KEY },
})

export async function createVideoJob(
  scriptText: string,
  audioUrl: string,
  avatarId: string = HEYGEN_AVATAR_ID!
): Promise<{ jobId: string }> {
  if (MOCK_MODE) {
    return mockCreateVideoJob(scriptText, audioUrl, avatarId)
  }

  const { data } = await heygenClient.post('/video/generate', {
    video_inputs: [
      {
        character: { type: 'avatar', avatar_id: avatarId },
        voice: { type: 'audio', audio_url: audioUrl },
        script: { type: 'text', input: scriptText },
      },
    ],
    dimension: { width: 1080, height: 1920 },
  })

  return { jobId: data.data.video_id }
}

export async function getVideoStatus(
  jobId: string
): Promise<{ status: 'PROCESSING' | 'DONE' | 'FAILED'; videoUrl?: string }> {
  if (MOCK_MODE) {
    return mockGetVideoStatus(jobId)
  }

  const { data } = await heygenClient.get(`/video/${jobId}`)
  const s = data.data.status as string

  if (s === 'completed') return { status: 'DONE', videoUrl: data.data.video_url }
  if (s === 'failed') return { status: 'FAILED' }
  return { status: 'PROCESSING' }
}
