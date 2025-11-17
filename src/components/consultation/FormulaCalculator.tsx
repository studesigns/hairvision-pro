"use client"

import { useState, useEffect } from "react"
import { FlaskConical, AlertCircle, Copy, Check, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { ColorFormula } from "@/types"

interface FormulaCalculatorProps {
  currentLevel: number
  targetLevel: number
  targetTone: string
  brand: string
  onFormulaGenerated?: (formula: ColorFormula) => void
}

const brandFormulas: Record<string, Record<string, string>> = {
  wella: {
    "1": "2/0",
    "2": "3/0",
    "3": "4/0",
    "4": "5/0",
    "5": "6/0",
    "6": "7/0",
    "7": "8/0",
    "8": "9/0",
    "9": "10/0",
    "10": "12/0",
  },
  schwarzkopf: {
    "1": "1-0",
    "2": "2-0",
    "3": "3-0",
    "4": "4-0",
    "5": "5-0",
    "6": "6-0",
    "7": "7-0",
    "8": "8-0",
    "9": "9-0",
    "10": "10-0",
  },
  loreal: {
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
  },
}

const toneModifiers: Record<string, Record<string, string>> = {
  warm: {
    wella: "/3", // Gold
    schwarzkopf: "-5", // Gold
    loreal: ".3", // Gold
  },
  cool: {
    wella: "/1", // Ash
    schwarzkopf: "-1", // Cendre
    loreal: ".1", // Ash
  },
  neutral: {
    wella: "/0",
    schwarzkopf: "-0",
    loreal: "",
  },
}

export function FormulaCalculator({
  currentLevel,
  targetLevel,
  targetTone,
  brand,
  onFormulaGenerated,
}: FormulaCalculatorProps) {
  const [formula, setFormula] = useState<ColorFormula | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    calculateFormula()
  }, [currentLevel, targetLevel, targetTone, brand])

  const calculateFormula = () => {
    const levelDifference = targetLevel - currentLevel
    let developerVolume = 20 // default
    let ratio = "1:1"
    let processingTime = 35

    // Determine developer volume based on lift needed
    if (levelDifference <= 0) {
      developerVolume = 10
      processingTime = 25
    } else if (levelDifference === 1) {
      developerVolume = 20
      processingTime = 35
    } else if (levelDifference === 2) {
      developerVolume = 30
      processingTime = 40
    } else if (levelDifference >= 3) {
      developerVolume = 40
      ratio = "1:2"
      processingTime = 45
    }

    // Get base color code
    const brandKey = brand.toLowerCase()
    const baseCode = brandFormulas[brandKey]?.[targetLevel.toString()] || `${targetLevel}`
    const toneCode = toneModifiers[targetTone]?.[brandKey] || ""
    const fullColorCode = baseCode + toneCode

    // Build formula
    const newFormula: ColorFormula = {
      brand: brand.charAt(0).toUpperCase() + brand.slice(1),
      baseColor: fullColorCode,
      developer: {
        volume: developerVolume,
        ratio: ratio,
      },
      processingTime: processingTime,
      applicationNotes: generateNotes(levelDifference, targetTone),
    }

    // Add additives if needed
    if (levelDifference >= 3) {
      newFormula.additives = [
        { name: "Bond Builder", amount: "5ml per 30g color" },
      ]
    }

    if (targetTone === "cool" && currentLevel < 7) {
      newFormula.additives = [
        ...(newFormula.additives || []),
        { name: "Violet Additive", amount: "2-3 drops" },
      ]
    }

    setFormula(newFormula)
    onFormulaGenerated?.(newFormula)
  }

  const generateNotes = (lift: number, tone: string): string => {
    const notes = []

    if (lift >= 3) {
      notes.push("Pre-lighten may be required for best results")
    }

    if (tone === "cool") {
      notes.push("Apply to mid-lengths and ends first, then roots")
    } else if (tone === "warm") {
      notes.push("Apply to roots first for even deposit")
    }

    if (lift > 0) {
      notes.push("Perform strand test before full application")
    }

    return notes.join(". ") + "."
  }

  const copyFormula = () => {
    if (!formula) return
    const text = `
${formula.brand} Color Formula
Base: ${formula.baseColor}
Developer: ${formula.developer.volume} Vol (${formula.developer.ratio})
Process Time: ${formula.processingTime} min
${formula.additives ? `Additives: ${formula.additives.map(a => `${a.name} - ${a.amount}`).join(", ")}` : ""}
Notes: ${formula.applicationNotes}
    `.trim()

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!formula) return null

  const levelDiff = targetLevel - currentLevel

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <FlaskConical className="w-5 h-5" />
            Color Formula
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyFormula}
              className="text-green-700 hover:text-green-900"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.print()}
              className="text-green-700 hover:text-green-900"
            >
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Brand</p>
            <p className="font-semibold text-lg">{formula.brand}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Color Code</p>
            <p className="font-semibold text-lg font-mono">{formula.baseColor}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Developer</p>
            <p className="font-semibold text-lg">{formula.developer.volume} Vol</p>
            <p className="text-sm text-gray-600">Ratio: {formula.developer.ratio}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Process Time</p>
            <p className="font-semibold text-lg">{formula.processingTime} min</p>
          </div>
        </div>

        {formula.additives && formula.additives.length > 0 && (
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Additives</p>
            {formula.additives.map((additive, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{additive.name}</span>
                <span className="font-medium">{additive.amount}</span>
              </div>
            ))}
          </div>
        )}

        {levelDiff >= 3 && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold">High Lift Warning</p>
              <p>Lifting {levelDiff} levels requires careful monitoring. Consider pre-lightening for best results.</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Application Notes</p>
          <p className="text-sm text-gray-700">{formula.applicationNotes}</p>
        </div>
      </CardContent>
    </Card>
  )
}
