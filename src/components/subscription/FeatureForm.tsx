import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"

type TProps = {
  features: string[],
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>
}

const FeatureForm = ({ features, setFeatures }: TProps) => {
  const [inputValue, setInputValue] = useState("")

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setFeatures([...features, inputValue.trim()])
      setInputValue("")
    }
  }

  const handleDelete = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-1">Features</h2>
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a feature..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAdd}
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-cyan-600 cursor-pointer text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:bg-cyan-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* feature List */}
      {features?.length > 0 && (
          <>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Features ({features?.length})</h3>
              {features.length === 0 ? (
                <p className="text-gray-500 text-center py-4 italic">No conditions added yet</p>
              ) : (
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-gray-800 flex-1">{feature}</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(index)}
                        className="ml-2 p-1 text-red-500 hover:text-red-700 cursor-pointer hover:bg-red-50 rounded-full transition-colors"
                        aria-label={`Delete condition: ${feature}`}
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )
      }
    </div>
  )
}

export default FeatureForm;