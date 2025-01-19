import './index.css'
import { useState, useEffect } from 'react'
import ScriptForm from './components/ScriptForm'
import ScriptPreview from './components/ScriptPreview'
import SavedScripts from './components/SavedScripts'
import { Script } from './types'

function App() {
  const [savedScripts, setSavedScripts] = useState<Script[]>([])
  const [currentScript, setCurrentScript] = useState<Script | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('savedScripts')
    if (saved) {
      setSavedScripts(JSON.parse(saved))
    }
  }, [])

  const handleSaveScript = (script: Script) => {
    const newScripts = [...savedScripts, { ...script, id: Date.now() }]
    setSavedScripts(newScripts)
    localStorage.setItem('savedScripts', JSON.stringify(newScripts))
  }

  const handleDeleteScript = (id: number) => {
    const newScripts = savedScripts.filter(script => script.id !== id)
    setSavedScripts(newScripts)
    localStorage.setItem('savedScripts', JSON.stringify(newScripts))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
          Script Generator
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Create engaging short-form video scripts in seconds
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Create New Script
              </h2>
              <ScriptForm onScriptGenerate={setCurrentScript} />
            </div>
            
            {currentScript && (
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <ScriptPreview 
                  script={currentScript} 
                  onSave={handleSaveScript}
                />
              </div>
            )}
          </div>
          
          <div className="lg:col-span-4">
            <SavedScripts 
              scripts={savedScripts} 
              onDelete={handleDeleteScript}
              onSelect={setCurrentScript}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
