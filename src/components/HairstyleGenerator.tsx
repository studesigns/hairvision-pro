"use client"

import { useState, useRef } from "react"
import { Upload, Camera, Download, Loader2, Check, RefreshCw } from "lucide-react"

interface GeneratedImage {
  url: string
  id: string
}

export default function HairstyleGenerator() {
  const [uploadedImage, setUploadedImage] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string>("")
  const [stylePrompt, setStylePrompt] = useState<string>("")
  const [selectedStyle, setSelectedStyle] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])
  const [error, setError] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Predefined style options (like longhair.ai)
  const styleOptions = [
    { label: "Long Straight", prompt: "long straight hair, sleek, professional, glossy" },
    { label: "Long Wavy", prompt: "long wavy hair, beach waves, voluminous, flowing" },
    { label: "Long Curly", prompt: "long curly hair, defined curls, bouncy, natural" },
    { label: "Bob Cut", prompt: "bob haircut, chin length, modern, clean lines" },
    { label: "Pixie Cut", prompt: "pixie haircut, short, edgy, textured" },
    { label: "Shoulder Length", prompt: "shoulder length hair, layered, versatile" },
    { label: "Updo", prompt: "updo hairstyle, elegant, formal, sophisticated" },
    { label: "Braided", prompt: "braided hairstyle, intricate, detailed" },
  ]

  // Color options
  const colorOptions = [
    { label: "Natural Brown", value: "natural brown hair color" },
    { label: "Blonde", value: "blonde hair color" },
    { label: "Black", value: "black hair color" },
    { label: "Red", value: "red hair color" },
    { label: "Auburn", value: "auburn hair color" },
    { label: "Ash Brown", value: "ash brown hair color" },
    { label: "Platinum Blonde", value: "platinum blonde hair color" },
    { label: "Balayage", value: "balayage highlights hair color" },
    { label: "Copper", value: "copper hair color" },
    { label: "Burgundy", value: "burgundy wine hair color" },
  ]

  async function handleImageUpload(file: File) {
    setIsUploading(true)
    setError("")

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = async () => {
      const base64Image = reader.result as string
      setUploadedImage(base64Image)

      // Upload to Supabase Storage to get public URL
      try {
        const uploadResponse = await fetch("/api/upload-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageData: base64Image }),
        })

        const data = await uploadResponse.json()

        if (data.success) {
          setImageUrl(data.imageUrl)
        } else {
          setError(data.error || "Failed to upload image")
        }
      } catch (err) {
        console.error("Upload error:", err)
        setError("Failed to upload image to server")
      } finally {
        setIsUploading(false)
      }
    }
  }

  async function generateHairstyles() {
    if (!imageUrl) {
      setError("Please upload an image first")
      return
    }

    if (!selectedStyle) {
      setError("Please select a hairstyle")
      return
    }

    setIsGenerating(true)
    setGeneratedImages([])
    setError("")

    // Build the full prompt
    const colorPart = selectedColor ? `, ${selectedColor}` : ""
    const fullStylePrompt = `${stylePrompt}${colorPart}`

    try {
      const response = await fetch("/api/generate-hairstyle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          stylePrompt: fullStylePrompt,
          numberOfVariations: 6, // Generate 6 variations like longhair.ai
        }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedImages(
          data.images.map((url: string, idx: number) => ({
            url,
            id: `result-${idx + 1}`,
          }))
        )
      } else {
        setError(data.error || "Failed to generate hairstyles")
      }
    } catch (err) {
      console.error("Generation failed:", err)
      setError("Failed to generate hairstyles. Please check your API configuration.")
    } finally {
      setIsGenerating(false)
    }
  }

  function downloadImage(url: string, id: string) {
    const a = document.createElement("a")
    a.href = url
    a.download = `hairstyle-${id}-${Date.now()}.png`
    a.target = "_blank"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  function resetGenerator() {
    setUploadedImage("")
    setImageUrl("")
    setStylePrompt("")
    setSelectedStyle("")
    setSelectedColor("")
    setGeneratedImages([])
    setError("")
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold uppercase tracking-[0.15em] text-[#1A1A1A] mb-4">
          AI Hairstyle Generator
        </h1>
        <p className="text-lg text-[#666666] max-w-2xl mx-auto">
          Upload your photo, select a style and color, and let AI generate multiple hairstyle variations for you to choose from.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <h2 className="text-xl font-semibold text-[#1A1A1A] mb-6 flex items-center gap-2">
          <Upload className="w-5 h-5 text-[#C9A961]" />
          Upload Your Photo
        </h2>

        <div className="flex flex-col items-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleImageUpload(e.target.files[0])
              }
            }}
            className="hidden"
          />

          {!uploadedImage ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full max-w-md h-64 border-2 border-dashed border-[#D4D4D4] rounded-xl flex flex-col items-center justify-center gap-4 hover:border-[#C9A961] transition-colors cursor-pointer"
            >
              {isUploading ? (
                <Loader2 className="w-12 h-12 text-[#C9A961] animate-spin" />
              ) : (
                <Camera className="w-12 h-12 text-[#A3A3A3]" />
              )}
              <span className="text-[#666666] font-medium">
                {isUploading ? "Uploading..." : "Click to upload your photo"}
              </span>
              <span className="text-sm text-[#A3A3A3]">JPG, PNG up to 10MB</span>
            </button>
          ) : (
            <div className="relative">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="max-w-md max-h-96 rounded-xl shadow-md"
              />
              <button
                onClick={() => {
                  setUploadedImage("")
                  setImageUrl("")
                }}
                className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow hover:bg-white"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              {imageUrl && (
                <div className="absolute bottom-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Ready
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Style Selection */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <h2 className="text-xl font-semibold text-[#1A1A1A] mb-6">Select Hairstyle</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {styleOptions.map((style) => (
            <button
              key={style.label}
              onClick={() => {
                setSelectedStyle(style.label)
                setStylePrompt(style.prompt)
              }}
              className={`p-4 border-2 rounded-xl text-center font-medium transition-all ${
                selectedStyle === style.label
                  ? "border-[#C9A961] bg-[#C9A961]/10 text-[#1A1A1A]"
                  : "border-[#E8E8E8] hover:border-[#C9A961]/50 text-[#666666]"
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Select Color (Optional)</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {colorOptions.map((color) => (
            <button
              key={color.label}
              onClick={() => setSelectedColor(selectedColor === color.value ? "" : color.value)}
              className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                selectedColor === color.value
                  ? "border-[#C9A961] bg-[#C9A961]/10 text-[#1A1A1A]"
                  : "border-[#E8E8E8] hover:border-[#C9A961]/50 text-[#666666]"
              }`}
            >
              {color.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
          {error}
        </div>
      )}

      {/* Generate Button */}
      <div className="text-center mb-12">
        <button
          onClick={generateHairstyles}
          disabled={isGenerating || !imageUrl || !selectedStyle}
          className="bg-gradient-to-r from-[#C9A961] to-[#B89651] text-white px-12 py-4 rounded-xl text-lg font-bold uppercase tracking-wider shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isGenerating ? (
            <span className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Variations...
            </span>
          ) : (
            "Generate Hairstyles"
          )}
        </button>

        {generatedImages.length > 0 && (
          <button
            onClick={resetGenerator}
            className="ml-4 text-[#666666] hover:text-[#1A1A1A] underline"
          >
            Start Over
          </button>
        )}
      </div>

      {/* Loading State */}
      {isGenerating && (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center mb-8">
          <div className="w-16 h-16 border-4 border-[#E8E8E8] border-t-[#C9A961] rounded-full animate-spin mx-auto mb-6" />
          <p className="text-lg text-[#666666]">Creating your hairstyle variations...</p>
          <p className="text-sm text-[#A3A3A3] mt-2">This may take 30-60 seconds</p>
        </div>
      )}

      {/* Results Grid */}
      {generatedImages.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
            Your Results ({generatedImages.length} Variations)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedImages.map((img) => (
              <div
                key={img.id}
                className="border border-[#E8E8E8] rounded-xl p-4 bg-white hover:shadow-md transition-shadow"
              >
                <img
                  src={img.url}
                  alt={`Hairstyle variation ${img.id}`}
                  className="w-full rounded-lg mb-4"
                />
                <button
                  onClick={() => downloadImage(img.url, img.id)}
                  className="w-full flex items-center justify-center gap-2 bg-[#C9A961] text-white py-3 rounded-lg font-medium hover:bg-[#B89651] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
