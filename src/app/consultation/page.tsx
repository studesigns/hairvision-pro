"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Camera,
  Upload,
  Loader2,
  RefreshCw,
  Download,
  ChevronRight,
  Check
} from "lucide-react"

type Step = "capture" | "color" | "result"

interface HairColor {
  id: string
  name: string
  hex: string
  description: string
}

const hairColors: HairColor[] = [
  { id: "platinum-blonde", name: "Platinum Blonde", hex: "#E8E4D9", description: "Ultra-light, icy blonde" },
  { id: "ash-blonde", name: "Ash Blonde", hex: "#C9BB9E", description: "Cool-toned light blonde" },
  { id: "honey-blonde", name: "Honey Blonde", hex: "#C9A961", description: "Warm golden blonde" },
  { id: "caramel", name: "Caramel Brown", hex: "#A67B5B", description: "Warm medium brown with golden tones" },
  { id: "chocolate", name: "Chocolate Brown", hex: "#5C4033", description: "Rich medium to dark brown" },
  { id: "espresso", name: "Espresso", hex: "#3C2415", description: "Deep, dark brown" },
  { id: "auburn", name: "Auburn", hex: "#922724", description: "Red-brown with warm undertones" },
  { id: "copper", name: "Copper Red", hex: "#B87333", description: "Vibrant copper-orange red" },
  { id: "burgundy", name: "Burgundy", hex: "#722F37", description: "Deep wine red" },
  { id: "jet-black", name: "Jet Black", hex: "#0A0A0A", description: "Pure, deep black" },
]

export default function ConsultationPage() {
  const [currentStep, setCurrentStep] = useState<Step>("capture")
  const [clientPhoto, setClientPhoto] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<HairColor | null>(null)
  const [styleNotes, setStyleNotes] = useState("")
  const [isTransforming, setIsTransforming] = useState(false)
  const [transformedImage, setTransformedImage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setClientPhoto(reader.result as string)
      setError("")
    }
    reader.readAsDataURL(file)
  }

  const handleTransform = async () => {
    if (!clientPhoto || !selectedColor) {
      setError("Please upload a photo and select a color")
      return
    }

    setIsTransforming(true)
    setError("")

    try {
      // For now, we'll use the uploaded image directly
      // In production, this would call the Replicate API with proper image hosting
      const response = await fetch("/api/transform-hair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: clientPhoto, // This would need to be a hosted URL for Replicate
          hairColor: selectedColor.name,
          hairStyle: styleNotes || "healthy, shiny, natural looking",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setTransformedImage(result.transformedImageUrl)
        setCurrentStep("result")
      } else {
        setError(result.error || "Failed to transform image")
        // For demo, show a simulated result
        setTransformedImage(clientPhoto)
        setCurrentStep("result")
      }
    } catch (err) {
      console.error("Transform error:", err)
      setError("Transformation service unavailable. Showing original for demo.")
      // Show original as placeholder for demo
      setTransformedImage(clientPhoto)
      setCurrentStep("result")
    } finally {
      setIsTransforming(false)
    }
  }

  const resetConsultation = () => {
    setCurrentStep("capture")
    setClientPhoto("")
    setSelectedColor(null)
    setStyleNotes("")
    setTransformedImage("")
    setError("")
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-[#666666] hover:text-[#C9A961] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-[13px] font-medium uppercase tracking-[0.15em]">Back</span>
              </Link>
              <div className="h-6 w-px bg-[#E8E8E8]" />
              <div className="flex flex-col">
                <span className="text-lg font-medium tracking-tight text-[#1A1A1A]">
                  Hair Architect
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#666666]">
                  Consultation
                </span>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="hidden md:flex items-center gap-4">
              <div className={`flex items-center gap-2 ${currentStep === "capture" ? "text-[#C9A961]" : "text-[#A3A3A3]"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === "capture" ? "bg-[#C9A961] text-white" : "bg-[#E8E8E8] text-[#666666]"
                }`}>
                  {currentStep === "capture" ? "1" : <Check className="w-4 h-4" />}
                </div>
                <span className="text-sm font-medium">Capture</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#D4D4D4]" />
              <div className={`flex items-center gap-2 ${currentStep === "color" ? "text-[#C9A961]" : "text-[#A3A3A3]"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === "color" ? "bg-[#C9A961] text-white" :
                  currentStep === "result" ? "bg-[#E8E8E8] text-[#666666]" : "bg-[#E8E8E8]"
                }`}>
                  {currentStep === "result" ? <Check className="w-4 h-4" /> : "2"}
                </div>
                <span className="text-sm font-medium">Color</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#D4D4D4]" />
              <div className={`flex items-center gap-2 ${currentStep === "result" ? "text-[#C9A961]" : "text-[#A3A3A3]"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === "result" ? "bg-[#C9A961] text-white" : "bg-[#E8E8E8]"
                }`}>
                  3
                </div>
                <span className="text-sm font-medium">Result</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-10 py-12">
        {/* Step 1: Photo Capture */}
        {currentStep === "capture" && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold uppercase tracking-[0.15em] text-[#1A1A1A] mb-4">
                Capture Client Photo
              </h1>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Upload a clear photo of your client showing their current hair. For best results, ensure good lighting and the full head of hair is visible.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl border border-[#E8E8E8] p-8">
                {!clientPhoto ? (
                  <div
                    className="border-2 border-dashed border-[#E8E8E8] rounded-lg p-12 text-center cursor-pointer hover:border-[#C9A961] transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Upload className="w-12 h-12 text-[#C9A961] mx-auto mb-4" />
                    <p className="text-lg font-medium text-[#1A1A1A] mb-2">
                      Upload Client Photo
                    </p>
                    <p className="text-sm text-[#666666] mb-4">
                      Click to browse or drag and drop
                    </p>
                    <p className="text-xs text-[#A3A3A3]">
                      Supported formats: JPG, PNG, WebP (max 10MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative aspect-[3/4] max-w-md mx-auto rounded-lg overflow-hidden bg-[#F5F5F5]">
                      <Image
                        src={clientPhoto}
                        alt="Client photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        Change Photo
                      </button>
                      <button
                        onClick={() => setCurrentStep("color")}
                        className="btn-primary flex items-center gap-2"
                      >
                        Continue
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Photo Tips */}
              <div className="mt-8 bg-[#C9A961]/10 rounded-lg p-6">
                <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#1A1A1A] mb-4">
                  Photo Guidelines
                </h3>
                <ul className="space-y-2 text-sm text-[#666666]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C9A961] mt-0.5 flex-shrink-0" />
                    Ensure natural lighting without harsh shadows
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C9A961] mt-0.5 flex-shrink-0" />
                    Include the full head and shoulders
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C9A961] mt-0.5 flex-shrink-0" />
                    Hair should be down and visible
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C9A961] mt-0.5 flex-shrink-0" />
                    Neutral background works best
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Color Selection */}
        {currentStep === "color" && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold uppercase tracking-[0.15em] text-[#1A1A1A] mb-4">
                Select Hair Color
              </h1>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Choose the desired hair color for visualization
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Client Photo Preview */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-[#E8E8E8] p-6 sticky top-28">
                  <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#1A1A1A] mb-4">
                    Current Photo
                  </h3>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#F5F5F5]">
                    <Image
                      src={clientPhoto}
                      alt="Client"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Color Selection */}
              <div className="lg:col-span-2 space-y-8">
                {/* Color Grid */}
                <div className="bg-white rounded-xl border border-[#E8E8E8] p-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#1A1A1A] mb-6">
                    Choose Color
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {hairColors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                          selectedColor?.id === color.id
                            ? "border-[#C9A961] shadow-md"
                            : "border-[#E8E8E8] hover:border-[#C9A961]/50"
                        }`}
                      >
                        <div
                          className="w-full h-12 rounded-md mb-3"
                          style={{ backgroundColor: color.hex }}
                        />
                        <p className="font-medium text-[#1A1A1A] text-sm mb-1">
                          {color.name}
                        </p>
                        <p className="text-xs text-[#666666]">
                          {color.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Notes */}
                <div className="bg-white rounded-xl border border-[#E8E8E8] p-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#1A1A1A] mb-4">
                    Additional Notes (Optional)
                  </h3>
                  <textarea
                    value={styleNotes}
                    onChange={(e) => setStyleNotes(e.target.value)}
                    placeholder="E.g., Add subtle highlights, keep darker at roots, face-framing pieces..."
                    className="w-full p-4 border border-[#E8E8E8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A961] resize-none"
                    rows={3}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep("capture")}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={handleTransform}
                    disabled={!selectedColor || isTransforming}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isTransforming ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transforming...
                      </>
                    ) : (
                      <>
                        Generate Preview
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {currentStep === "result" && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold uppercase tracking-[0.15em] text-[#1A1A1A] mb-4">
                Transformation Preview
              </h1>
              <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                Compare the before and after visualization
              </p>
            </div>

            {/* Before/After Comparison */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
              <div className="bg-white rounded-xl border border-[#E8E8E8] p-6">
                <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#1A1A1A] mb-4">
                  Before
                </h3>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#F5F5F5]">
                  <Image
                    src={clientPhoto}
                    alt="Before"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E8E8] p-6">
                <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#1A1A1A] mb-4">
                  After - {selectedColor?.name}
                </h3>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#F5F5F5]">
                  <Image
                    src={transformedImage || clientPhoto}
                    alt="After transformation"
                    fill
                    className="object-cover"
                  />
                  {error && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="bg-white p-4 rounded-lg text-center max-w-xs">
                        <p className="text-sm text-[#666666]">
                          Preview requires Replicate API token. Add REPLICATE_API_TOKEN to enable real transformations.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Color Info */}
            {selectedColor && (
              <div className="max-w-2xl mx-auto mb-12">
                <div className="bg-white rounded-xl border border-[#E8E8E8] p-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#1A1A1A] mb-4">
                    Selected Color Details
                  </h3>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-lg"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{selectedColor.name}</p>
                      <p className="text-sm text-[#666666]">{selectedColor.description}</p>
                      <p className="text-xs text-[#A3A3A3] mt-1">Hex: {selectedColor.hex}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCurrentStep("color")}
                className="btn-secondary flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Different Color
              </button>
              <button
                onClick={resetConsultation}
                className="btn-secondary flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                New Consultation
              </button>
              <button
                className="btn-primary flex items-center gap-2"
                onClick={() => {
                  // Download or save functionality
                  alert("Save functionality would export consultation details and images")
                }}
              >
                <Download className="w-4 h-4" />
                Save Results
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
