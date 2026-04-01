export type CampaignStatus = 'DRAFT' | 'GENERATING' | 'DONE' | 'FAILED'
export type VideoStatus = 'PENDING' | 'PROCESSING' | 'DONE' | 'FAILED'

export interface Campaign {
  id: string
  client_name: string
  product_name: string
  product_one_liner: string
  target_audience: string
  status: CampaignStatus
  created_at: string
  updated_at: string
}

export interface Brief {
  id: string
  campaign_id: string
  hook_concept: string
  key_talking_points: string[]
  cta_text: string
  generated_at: string
}

export interface Script {
  id: string
  brief_id: string
  hook_line: string
  body: string
  cta_line: string
  full_text: string
  generated_at: string
}

export interface Video {
  id: string
  script_id: string
  heygen_job_id: string | null
  status: VideoStatus
  video_url: string | null
  audio_url: string | null
  heygen_credits_used: number
  elevenlabs_chars_used: number
  openai_tokens_used: number
  estimated_cost_usd: number
  completed_at: string | null
}

export interface Notification {
  id: string
  video_id: string | null
  message: string
  read: boolean
  created_at: string
}

export interface CampaignWithCost extends Campaign {
  estimated_cost_usd?: number
}
