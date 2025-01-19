import { Script } from '../types'
import { Save, Copy } from 'lucide-react'
import { useState } from 'react'

interface ScriptPreviewProps {
  script: Script
  onSave: (script: Script) => void
}

export default function ScriptPreview({ script, onSave }: ScriptPreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(script.script)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Generated Script</h2>
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={() => onSave(script)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Script
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
        <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
          <div>
            <span className="text-sm font-medium text-gray-500">Platform</span>
            <p className="mt-1 text-sm text-gray-900">{script.platform}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Duration</span>
            <p className="mt-1 text-sm text-gray-900">{script.duration}s</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Tone</span>
            <p className="mt-1 text-sm text-gray-900">{script.tone}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Audience</span>
            <p className="mt-1 text-sm text-gray-900">{script.targetAudience}</p>
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap font-mono text-gray-800 leading-relaxed">
            {script.script}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Tips:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Review and adjust the script to match your personal style</li>
          <li>• Make sure to include relevant hashtags for your niche</li>
          <li>• Test different hooks to see what works best for your audience</li>
        </ul>
      </div>
    </div>
  )
}
