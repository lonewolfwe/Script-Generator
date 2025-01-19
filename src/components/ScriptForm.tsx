import { useState } from 'react'
import { Platform, Script } from '../types'
import { Wand2 } from 'lucide-react'

interface ScriptFormProps {
  onScriptGenerate: (script: Script) => void
}

export default function ScriptForm({ onScriptGenerate }: ScriptFormProps) {
  const [platform, setPlatform] = useState<Platform>('TikTok')
  const [description, setDescription] = useState('')
  const [tone, setTone] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [duration, setDuration] = useState(30)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // This is a mock generation - in reality, you'd call an AI API
    const generatedScript = `✨ Hey ${targetAudience}! ✨

[Hook] 
Get ready for a game-changing insight about ${description.split(' ').slice(0, 3).join(' ')}...

[Main Content]
• First point: Let me break this down for you
• Common misconception: Here's what most people get wrong
• The game-changer: This is what really works
• Pro tip: Something most people don't know

[Call to Action]
🎯 Follow for more ${platform} content like this!
💬 Comment below with your thoughts
❤️ Like if this helped you out!

#${platform.replace(/\s+/g, '')} #Content #Tips`

    onScriptGenerate({
      platform,
      description,
      tone,
      targetAudience,
      duration,
      script: generatedScript
    })
    setIsGenerating(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="TikTok">TikTok</option>
            <option value="Instagram Reels">Instagram Reels</option>
            <option value="YouTube Shorts">YouTube Shorts</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (seconds)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min={15}
            max={60}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Video Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="What's your video about? Be specific and descriptive."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tone
          </label>
          <input
            type="text"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Professional, Casual, Humorous"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Audience
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Tech enthusiasts, Fitness beginners"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isGenerating}
        className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-all
          ${isGenerating 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}
      >
        <Wand2 className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
        {isGenerating ? 'Generating Script...' : 'Generate Script'}
      </button>
    </form>
  )
}
