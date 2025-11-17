"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  Camera,
  Upload,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Search,
  Palette,
  Download,
  Sparkles,
  Loader2,
  X,
  History,
  Check,
} from "lucide-react"

interface Hairstyle {
  id: string
  name: string
  category: string
  image_url: string
  tags: string[]
  description?: string
}

interface HistoryItem {
  id: string
  original: string
  result: string
  style: Hairstyle
  color?: string
  timestamp: Date
}

const HAIR_COLORS = [
  { name: "Natural Black", hex: "#1A1A1A", tone: "neutral" },
  { name: "Dark Brown", hex: "#3D2314", tone: "warm" },
  { name: "Medium Brown", hex: "#6B4423", tone: "warm" },
  { name: "Light Brown", hex: "#A0522D", tone: "warm" },
  { name: "Ash Brown", hex: "#8B7355", tone: "cool" },
  { name: "Golden Blonde", hex: "#D4A84A", tone: "warm" },
  { name: "Platinum Blonde", hex: "#E8E4C9", tone: "cool" },
  { name: "Copper Red", hex: "#B87333", tone: "warm" },
  { name: "Auburn", hex: "#922724", tone: "warm" },
  { name: "Burgundy", hex: "#722F37", tone: "cool" },
]

export default function StudioPage() {
  // Gallery state
  const [hairstyles, setHairstyles] = useState<Hairstyle[]>([])
  const [selectedStyle, setSelectedStyle] = useState<Hairstyle | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loadingStyles, setLoadingStyles] = useState(true)

  // Photo state
  const [clientPhoto, setClientPhoto] = useState<string>("")
  const [showCamera, setShowCamera] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Generation state
  const [generatedResult, setGeneratedResult] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  // Color state
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [showColorPicker, setShowColorPicker] = useState(false)

  // History state
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // Fetch hairstyles on mount
  useEffect(() => {
    fetchHairstyles()
  }, [])

  async function fetchHairstyles() {
    try {
      const res = await fetch("/api/hairstyles")
      const data = await res.json()
      if (data.success) {
        setHairstyles(data.data)
      }
    } catch (err) {
      console.error("Failed to fetch styles:", err)
    } finally {
      setLoadingStyles(false)
    }
  }

  // Filter hairstyles
  const filteredStyles = hairstyles.filter((style) => {
    const matchesCategory = selectedCategory === "All" || style.category === selectedCategory
    const matchesSearch =
      !searchQuery ||
      style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const categories = ["All", ...Array.from(new Set(hairstyles.map((s) => s.category)))]

  // Camera functions
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setShowCamera(true)
      }
    } catch (err) {
      setError("Camera access denied. Please allow camera access.")
    }
  }

  function capturePhoto() {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg", 0.9)
        setClientPhoto(imageData)
        stopCamera()
      }
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setShowCamera(false)
  }

  async function handleFileUpload(file: File) {
    setIsUploading(true)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setClientPhoto(reader.result as string)
      setIsUploading(false)
    }
  }

  // Generate the style on client photo
  async function generateStyleOnPhoto() {
    if (!clientPhoto || !selectedStyle) {
      setError("Please upload a photo and select a hairstyle first")
      return
    }

    setIsGenerating(true)
    setError("")
    setGeneratedResult("")

    // Build prompt from selected style
    const stylePrompt = `${selectedStyle.name}, ${selectedStyle.tags.join(", ")}, professional salon quality, realistic hairstyle`
    const colorPrompt = selectedColor ? `, ${selectedColor} hair color` : ""
    const fullPrompt = `${stylePrompt}${colorPrompt}`

    try {
      const response = await fetch("/api/generate-hairstyle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: clientPhoto,
          stylePrompt: fullPrompt,
          numberOfVariations: 1, // Just one result for the selected style
        }),
      })

      const data = await response.json()

      if (data.success && data.images.length > 0) {
        setGeneratedResult(data.images[0])

        // Add to history
        const historyItem: HistoryItem = {
          id: `${Date.now()}`,
          original: clientPhoto,
          result: data.images[0],
          style: selectedStyle,
          color: selectedColor,
          timestamp: new Date(),
        }
        setHistory((prev) => [historyItem, ...prev.slice(0, 9)])
      } else {
        setError(data.error || "Failed to generate style")
        if (data.suggestion) {
          setError((prev) => `${prev}. ${data.suggestion}`)
        }
      }
    } catch (err) {
      setError("Failed to generate. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Apply color change to current result
  async function applyColorChange(colorName: string) {
    if (!clientPhoto || !selectedStyle) return

    setSelectedColor(colorName)
    // Regenerate with new color
    await generateStyleOnPhoto()
  }

  function downloadResult() {
    if (!generatedResult) return
    const a = document.createElement("a")
    a.href = generatedResult
    a.download = `hairvision-${selectedStyle?.name.replace(/\s+/g, "-")}-${Date.now()}.png`
    a.click()
  }

  return (
    <div className="h-screen flex flex-col bg-[#F8F8F8] overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E8E8] px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wider text-[#1A1A1A]">
          HAIR<span className="text-[#C9A961]">VISION</span> STUDIO
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-sm text-[#666] hover:text-[#1A1A1A]"
          >
            <History className="w-4 h-4" />
            History ({history.length})
          </button>
        </div>
      </header>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <h3 className="text-xl font-semibold mb-4">Take Client Photo</h3>
            <div className="relative bg-black rounded-lg overflow-hidden mb-4">
              <video ref={videoRef} autoPlay playsInline className="w-full" />
            </div>
            <div className="flex gap-4">
              <button
                onClick={capturePhoto}
                className="flex-1 bg-[#C9A961] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Capture
              </button>
              <button onClick={stopCamera} className="px-6 border border-gray-300 rounded-lg font-semibold">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR - Style Gallery */}
        <div className="w-72 bg-white border-r border-[#E8E8E8] flex flex-col">
          <div className="p-4 border-b border-[#E8E8E8]">
            <h2 className="font-semibold text-[#1A1A1A] mb-3">Choose Style</h2>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input
                type="text"
                placeholder="Search styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#C9A961]"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1">
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-1 text-xs rounded ${
                    selectedCategory === cat
                      ? "bg-[#C9A961] text-white"
                      : "bg-[#F0F0F0] text-[#666] hover:bg-[#E8E8E8]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Styles Grid */}
          <div className="flex-1 overflow-y-auto p-3">
            {loadingStyles ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#C9A961]" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {filteredStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    className={`relative rounded-lg overflow-hidden aspect-[3/4] group ${
                      selectedStyle?.id === style.id ? "ring-3 ring-[#C9A961]" : "hover:ring-2 hover:ring-[#C9A961]/50"
                    }`}
                  >
                    <img src={style.image_url} alt={style.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-medium truncate">{style.name}</p>
                    </div>
                    {selectedStyle?.id === style.id && (
                      <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#C9A961] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CENTER - Main Workspace */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          {/* Selected Style Info */}
          {selectedStyle && (
            <div className="bg-white rounded-lg p-3 mb-4 flex items-center gap-3">
              <img src={selectedStyle.image_url} alt="" className="w-12 h-12 rounded object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold text-[#1A1A1A]">{selectedStyle.name}</h3>
                <p className="text-xs text-[#666]">{selectedStyle.tags.slice(0, 3).join(", ")}</p>
              </div>
              <button
                onClick={() => setSelectedStyle(null)}
                className="text-[#999] hover:text-[#666]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Photo & Result Area */}
          <div className="flex-1 bg-white rounded-xl p-6 flex gap-6 overflow-hidden">
            {/* Client Photo */}
            <div className="flex-1 flex flex-col">
              <h4 className="text-sm font-semibold text-[#666] mb-3">Client Photo</h4>
              <div className="flex-1 relative border-2 border-dashed border-[#D0D0D0] rounded-lg flex items-center justify-center bg-[#FAFAFA]">
                {clientPhoto ? (
                  <img src={clientPhoto} alt="Client" className="max-h-full max-w-full object-contain rounded" />
                ) : (
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-[#999] mx-auto mb-3" />
                    <p className="text-sm text-[#666] mb-4">Upload or take client photo</p>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-[#C9A961] text-white rounded text-sm font-medium"
                      >
                        Upload
                      </button>
                      <button
                        onClick={startCamera}
                        className="px-4 py-2 border border-[#C9A961] text-[#C9A961] rounded text-sm font-medium"
                      >
                        Camera
                      </button>
                    </div>
                  </div>
                )}

                {clientPhoto && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 bg-white/90 rounded-lg shadow hover:bg-white"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                    <button
                      onClick={startCamera}
                      className="p-2 bg-white/90 rounded-lg shadow hover:bg-white"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
              />
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <ChevronRight className="w-8 h-8 text-[#C9A961]" />
            </div>

            {/* Generated Result */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-[#666]">Result</h4>
                {generatedResult && (
                  <button
                    onClick={downloadResult}
                    className="flex items-center gap-1 text-xs text-[#C9A961] hover:text-[#B89651]"
                  >
                    <Download className="w-3 h-3" />
                    Save
                  </button>
                )}
              </div>
              <div className="flex-1 relative border-2 border-[#E0E0E0] rounded-lg flex items-center justify-center bg-[#FAFAFA]">
                {isGenerating ? (
                  <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-[#C9A961] mx-auto mb-3" />
                    <p className="text-sm text-[#666]">Generating style...</p>
                    <p className="text-xs text-[#999] mt-1">This may take 30-60 seconds</p>
                  </div>
                ) : generatedResult ? (
                  <img src={generatedResult} alt="Result" className="max-h-full max-w-full object-contain rounded" />
                ) : (
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-[#D0D0D0] mx-auto mb-3" />
                    <p className="text-sm text-[#999]">Result will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4 text-sm">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={generateStyleOnPhoto}
              disabled={!clientPhoto || !selectedStyle || isGenerating}
              className="flex-1 py-3 bg-gradient-to-r from-[#C9A961] to-[#B89651] text-white rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
            >
              <Sparkles className="w-5 h-5" />
              {isGenerating ? "Generating..." : "Apply Style"}
            </button>

            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              disabled={!generatedResult}
              className="px-6 py-3 border-2 border-[#C9A961] text-[#C9A961] rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#C9A961]/5"
            >
              <Palette className="w-5 h-5" />
              Color
            </button>

            <button
              onClick={generateStyleOnPhoto}
              disabled={!generatedResult || isGenerating}
              className="px-6 py-3 border-2 border-[#666] text-[#666] rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#666]/5"
            >
              <RefreshCw className="w-5 h-5" />
              Regenerate
            </button>
          </div>

          {/* Color Picker */}
          {showColorPicker && (
            <div className="mt-4 bg-white rounded-lg p-4">
              <h4 className="text-sm font-semibold text-[#1A1A1A] mb-3">Select Hair Color</h4>
              <div className="flex flex-wrap gap-2">
                {HAIR_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => applyColorChange(color.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                      selectedColor === color.name
                        ? "border-[#C9A961] bg-[#C9A961]/10"
                        : "border-[#E0E0E0] hover:border-[#C9A961]/50"
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.hex }} />
                    <span className="text-xs font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR - History */}
        {showHistory && (
          <div className="w-64 bg-white border-l border-[#E8E8E8] flex flex-col">
            <div className="p-4 border-b border-[#E8E8E8] flex items-center justify-between">
              <h3 className="font-semibold text-[#1A1A1A]">History</h3>
              <button onClick={() => setShowHistory(false)} className="text-[#999] hover:text-[#666]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {history.length === 0 ? (
                <p className="text-sm text-[#999] text-center py-8">No history yet</p>
              ) : (
                <div className="space-y-3">
                  {history.map((item) => (
                    <div key={item.id} className="bg-[#F8F8F8] rounded-lg p-2">
                      <img src={item.result} alt="" className="w-full rounded mb-2" />
                      <p className="text-xs font-medium text-[#1A1A1A]">{item.style.name}</p>
                      {item.color && <p className="text-xs text-[#666]">{item.color}</p>}
                      <p className="text-xs text-[#999] mt-1">
                        {item.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
