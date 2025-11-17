"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ColorOption {
  id: string
  name: string
  hex: string
  level: number
  tone: string
}

interface ColorPickerProps {
  selectedColor: ColorOption | null
  onColorSelect: (color: ColorOption) => void
}

const hairColors: ColorOption[] = [
  // Level 1-3: Dark
  { id: "1", name: "Black", hex: "#1a1a1a", level: 1, tone: "neutral" },
  { id: "2", name: "Darkest Brown", hex: "#2c1b0e", level: 2, tone: "neutral" },
  { id: "3", name: "Dark Brown", hex: "#3b2214", level: 3, tone: "neutral" },

  // Level 4-5: Medium Brown
  { id: "4", name: "Medium Brown", hex: "#4a3728", level: 4, tone: "neutral" },
  { id: "5", name: "Light Brown", hex: "#6b4423", level: 5, tone: "warm" },
  { id: "6", name: "Chocolate Brown", hex: "#5c3317", level: 4, tone: "warm" },

  // Level 6-7: Dark Blonde
  { id: "7", name: "Dark Blonde", hex: "#8b6914", level: 6, tone: "warm" },
  { id: "8", name: "Caramel", hex: "#a67b5b", level: 7, tone: "warm" },
  { id: "9", name: "Honey Blonde", hex: "#b8860b", level: 7, tone: "warm" },

  // Level 8-9: Light Blonde
  { id: "10", name: "Light Blonde", hex: "#d4a76a", level: 8, tone: "warm" },
  { id: "11", name: "Ash Blonde", hex: "#b8a99a", level: 8, tone: "cool" },
  { id: "12", name: "Golden Blonde", hex: "#daa520", level: 8, tone: "warm" },

  // Level 10: Lightest Blonde
  { id: "13", name: "Platinum Blonde", hex: "#e8e4c9", level: 10, tone: "cool" },
  { id: "14", name: "Icy Blonde", hex: "#f0e68c", level: 10, tone: "cool" },

  // Reds/Coppers
  { id: "15", name: "Auburn", hex: "#a52a2a", level: 5, tone: "warm" },
  { id: "16", name: "Copper Red", hex: "#b87333", level: 6, tone: "warm" },
  { id: "17", name: "Burgundy", hex: "#722f37", level: 4, tone: "cool" },
  { id: "18", name: "Mahogany", hex: "#c04000", level: 5, tone: "warm" },

  // Fashion Colors
  { id: "19", name: "Rose Gold", hex: "#b76e79", level: 8, tone: "warm" },
  { id: "20", name: "Strawberry Blonde", hex: "#c4aead", level: 9, tone: "warm" },
]

export function ColorPicker({ selectedColor, onColorSelect }: ColorPickerProps) {
  const [filter, setFilter] = useState<"all" | "warm" | "cool" | "neutral">("all")

  const filteredColors = filter === "all"
    ? hairColors
    : hairColors.filter(c => c.tone === filter)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["all", "warm", "cool", "neutral"] as const).map((tone) => (
          <button
            key={tone}
            onClick={() => setFilter(tone)}
            className={cn(
              "px-3 py-1 text-sm rounded-full transition-colors capitalize",
              filter === tone
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {tone}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-3">
        {filteredColors.map((color) => (
          <button
            key={color.id}
            onClick={() => onColorSelect(color)}
            className="group relative"
            title={`${color.name} (Level ${color.level})`}
          >
            <div
              className={cn(
                "w-full aspect-square rounded-lg transition-transform group-hover:scale-110 shadow-md",
                selectedColor?.id === color.id && "ring-4 ring-purple-500 ring-offset-2"
              )}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColor?.id === color.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
              )}
            </div>
            <p className="text-xs text-center mt-1 text-gray-600 truncate">
              {color.name}
            </p>
          </button>
        ))}
      </div>

      {selectedColor && (
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-semibold text-purple-900 mb-2">Selected Color</h4>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg shadow-md"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <div>
              <p className="font-medium">{selectedColor.name}</p>
              <p className="text-sm text-gray-600">
                Level {selectedColor.level} • {selectedColor.tone} tone
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
