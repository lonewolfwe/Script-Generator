export type Platform = 'TikTok' | 'Instagram Reels' | 'YouTube Shorts'

export interface Script {
  id?: number
  platform: Platform
  description: string
  tone: string
  targetAudience: string
  duration: number
  script: string
}
