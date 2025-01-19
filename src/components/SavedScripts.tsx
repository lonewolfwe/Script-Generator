import { Script } from '../types'
import { Trash2, Edit } from 'lucide-react'

interface SavedScriptsProps {
  scripts: Script[]
  onDelete: (id: number) => void
  onSelect: (script: Script) => void
}

export default function SavedScripts({ scripts, onDelete, onSelect }: SavedScriptsProps) {
  if (scripts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Scripts</h2>
        <p className="text-gray-500 text-sm">No saved scripts yet. Generate one to get started!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Scripts</h2>
      <div className="space-y-4">
        {scripts.map((script) => (
          <div
            key={script.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                {script.platform}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelect(script)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => script.id && onDelete(script.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {script.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
