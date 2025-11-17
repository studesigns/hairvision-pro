"use client"

import { useState } from "react"
import { Wand2, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StyleDescriptionInputProps {
  onGenerate: (description: string) => void
  isGenerating: boolean
}

const suggestionChips = [
  "Balayage highlights",
  "Platinum blonde",
  "Red copper tones",
  "Shoulder-length bob",
  "Layered cut",
  "Ombre effect",
  "Ash blonde",
  "Caramel highlights",
  "Pixie cut",
  "Beach waves",
]

export function StyleDescriptionInput({ onGenerate, isGenerating }: StyleDescriptionInputProps) {
  const [description, setDescription] = useState("")
  const [charCount, setCharCount] = useState(0)

  const handleDescriptionChange = (value: string) => {
    setDescription(value)
    setCharCount(value.length)
  }

  const addSuggestion = (suggestion: string) => {
    const newDesc = description ? `${description}, ${suggestion.toLowerCase()}` : suggestion
    handleDescriptionChange(newDesc)
  }

  const handleSubmit = () => {
    if (description.trim()) {
      onGenerate(description)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Describe the desired hairstyle and color...

Example: 'I want a shoulder-length bob with warm caramel balayage highlights, transitioning from my natural dark brown to golden blonde at the ends. Low-maintenance and modern.'"
          className="w-full h-40 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          maxLength={500}
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
          {charCount}/500
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Quick Add:</p>
        <div className="flex flex-wrap gap-2">
          {suggestionChips.map((chip) => (
            <button
              key={chip}
              onClick={() => addSuggestion(chip)}
              className="px-3 py-1 text-xs bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors"
            >
              + {chip}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!description.trim() || isGenerating}
        size="lg"
        className="w-full gap-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating Styles...
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5" />
            Generate AI Styles
          </>
        )}
      </Button>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Sparkles className="w-4 h-4" />
        <span>AI will generate multiple style and color options based on your description</span>
      </div>
    </div>
  )
}
