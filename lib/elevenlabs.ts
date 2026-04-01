import axios from 'axios'
import { MOCK_MODE, mockGenerateAudio } from './mock'

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? 'EXAVITQu4vr4xnSDxMaL'

export async function generateAudio(
  text: string
): Promise<{ audioBuffer: Buffer; charsUsed: number }> {
  if (MOCK_MODE) {
    return mockGenerateAudio(text)
  }

  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
    {
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    },
    {
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      responseType: 'arraybuffer',
    }
  )

  return {
    audioBuffer: Buffer.from(response.data),
    charsUsed: text.length,
  }
}
