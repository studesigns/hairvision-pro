"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Camera,
  Wand2,
  Palette,
  FlaskConical,
  Save,
  Download,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PhotoUpload } from "@/components/consultation/PhotoUpload"
import { StyleDescriptionInput } from "@/components/consultation/StyleDescriptionInput"
import { ColorPicker } from "@/components/consultation/ColorPicker"
import { FormulaCalculator } from "@/components/consultation/FormulaCalculator"

type Step = "photo" | "describe" | "preview" | "formula"

interface ColorOption {
  id: string
  name: string
  hex: string
  level: number
  tone: string
}

export default function ConsultationPage() {
  const [currentStep, setCurrentStep] = useState<Step>("photo")
  const [clientPhoto, setClientPhoto] = useState<string>("")
  const [styleDescription, setStyleDescription] = useState("")
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null)
  const [currentHairLevel, setCurrentHairLevel] = useState(4)
  const [selectedBrand, setSelectedBrand] = useState("wella")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedStyles, setGeneratedStyles] = useState<string[]>([])

  const steps = [
    { id: "photo", label: "Client Photo", icon: Camera },
    { id: "describe", label: "Describe Style", icon: Wand2 },
    { id: "preview", label: "Color & Preview", icon: Palette },
    { id: "formula", label: "Get Formula", icon: FlaskConical },
  ]

  const handlePhotoCapture = (imageData: string) => {
    setClientPhoto(imageData)
    if (imageData) {
      setCurrentStep("describe")
    }
  }

  const handleStyleGeneration = async (description: string) => {
    setIsGenerating(true)
    setStyleDescription(description)

    // Simulate AI generation (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock generated styles
    setGeneratedStyles([
      "Generated style option 1",
      "Generated style option 2",
      "Generated style option 3",
    ])

    setIsGenerating(false)
    setCurrentStep("preview")
  }

  const handleColorSelect = (color: ColorOption) => {
    setSelectedColor(color)
  }

  const goToFormula = () => {
    if (selectedColor) {
      setCurrentStep("formula")
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "photo":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-600" />
                Step 1: Capture Client Photo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PhotoUpload
                onPhotoCapture={handlePhotoCapture}
                currentPhoto={clientPhoto}
                className="min-h-[300px]"
              />
              {clientPhoto && (
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => setCurrentStep("describe")} className="gap-2">
                    Continue to Style Description
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case "describe":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-purple-600" />
                Step 2: Describe Desired Style
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StyleDescriptionInput
                onGenerate={handleStyleGeneration}
                isGenerating={isGenerating}
              />
            </CardContent>
          </Card>
        )

      case "preview":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-600" />
                  Step 3: Select Hair Color
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client's Current Hair Level (1-10)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={currentHairLevel}
                      onChange={(e) => setCurrentHairLevel(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-lg font-semibold w-8 text-center">
                      {currentHairLevel}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    1 = Black, 10 = Lightest Blonde
                  </p>
                </div>

                <ColorPicker
                  selectedColor={selectedColor}
                  onColorSelect={handleColorSelect}
                />

                {selectedColor && (
                  <div className="mt-6 flex justify-end">
                    <Button onClick={goToFormula} className="gap-2">
                      Calculate Formula
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {clientPhoto && selectedColor && (
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Current</p>
                      <div className="rounded-lg overflow-hidden border">
                        <img
                          src={clientPhoto}
                          alt="Current"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        After ({selectedColor.name})
                      </p>
                      <div className="rounded-lg overflow-hidden border relative">
                        <img
                          src={clientPhoto}
                          alt="Preview"
                          className="w-full h-64 object-cover"
                        />
                        <div
                          className="absolute inset-0 mix-blend-color opacity-50"
                          style={{ backgroundColor: selectedColor.hex }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Note: This is a simplified preview. Actual results depend on hair condition and application technique.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )

      case "formula":
        return (
          <div className="space-y-6">
            {selectedColor && (
              <FormulaCalculator
                currentLevel={currentHairLevel}
                targetLevel={selectedColor.level}
                targetTone={selectedColor.tone}
                brand={selectedBrand}
              />
            )}

            <Card>
              <CardHeader>
                <CardTitle>Brand Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {["wella", "schwarzkopf", "loreal"].map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                        selectedBrand === brand
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {brand === "loreal" ? "L'Oréal" : brand}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consultation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Client Description</p>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg mt-1">
                      {styleDescription || "No description provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Selected Color</p>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg mt-1">
                      {selectedColor && (
                        <>
                          <div
                            className="w-8 h-8 rounded"
                            style={{ backgroundColor: selectedColor.hex }}
                          />
                          <div>
                            <p className="font-medium">{selectedColor.name}</p>
                            <p className="text-sm text-gray-500">
                              Level {selectedColor.level}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="gap-2 flex-1">
                    <Save className="w-4 h-4" />
                    Save Consultation
                  </Button>
                  <Button variant="outline" className="gap-2 flex-1">
                    <Download className="w-4 h-4" />
                    Export PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h1 className="text-xl font-bold">New Consultation</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep
              const isPast = steps.findIndex((s) => s.id === currentStep) > index

              return (
                <button
                  key={step.id}
                  onClick={() => {
                    // Allow navigation to past steps
                    if (isPast) setCurrentStep(step.id as Step)
                  }}
                  className={`flex flex-col items-center gap-2 ${
                    isPast ? "cursor-pointer" : "cursor-default"
                  }`}
                  disabled={!isPast && !isActive}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : isPast
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isActive
                        ? "text-purple-600"
                        : isPast
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">{renderStepContent()}</div>
      </main>
    </div>
  )
}
