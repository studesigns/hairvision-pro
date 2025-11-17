"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Upload, Camera, Download, Loader2, Check, Info, ChevronLeft, ChevronRight, Heart, Sparkles, Image as ImageIcon, X } from "lucide-react"

interface GeneratedImage {
  url: string
  id: string
}

interface HistoryItem {
  image: string
  timestamp: string
}

export default function HairstyleGenerator() {
  const [uploadedImage, setUploadedImage] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string>("")
  const [gender, setGender] = useState<"female" | "male">("female")
  const [isUploading, setIsUploading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null)
  const [error, setError] = useState<string>("")
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showCamera, setShowCamera] = useState(false)
  const [showPhotoRequirements, setShowPhotoRequirements] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)
  const [showHoverButtons, setShowHoverButtons] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Check localStorage for photo requirements preference
  useEffect(() => {
    const dontShow = localStorage.getItem("hidePhotoRequirements")
    if (dontShow === "true") {
      setDontShowAgain(true)
    }
  }, [])

  // Save preference when changed
  useEffect(() => {
    if (dontShowAgain) {
      localStorage.setItem("hidePhotoRequirements", "true")
    }
  }, [dontShowAgain])

  // Style prompts based on gender
  const stylePrompts = {
    female: "beautiful female hairstyle, elegant, salon quality, professional styling",
    male: "handsome male haircut, well-groomed, barber quality, professional styling"
  }

  async function handleImageUpload(file: File) {
    setIsUploading(true)
    setError("")

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = async () => {
      const base64Image = reader.result as string
      setUploadedImage(base64Image)

      // Add to history
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setHistory(prev => [{ image: base64Image, timestamp }, ...prev.slice(0, 5)])

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
          // Even if upload fails, we can still work with base64
          setImageUrl(base64Image)
        }
      } catch (err) {
        console.error("Upload error:", err)
        // Use base64 as fallback
        setImageUrl(base64Image)
      } finally {
        setIsUploading(false)
      }
    }
  }

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setShowCamera(true)
      }
    } catch (err) {
      console.error("Camera access denied:", err)
      setError("Camera access denied. Please allow camera access or use file upload.")
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
        setUploadedImage(imageData)
        setImageUrl(imageData)

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        setHistory(prev => [{ image: imageData, timestamp }, ...prev.slice(0, 5)])

        stopCamera()
      }
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setShowCamera(false)
  }

  async function generateHairstyles() {
    if (!uploadedImage) {
      setError("Please upload or take a photo first")
      return
    }

    setIsGenerating(true)
    setGeneratedImages([])
    setSelectedImage(null)
    setError("")

    const fullStylePrompt = stylePrompts[gender]

    try {
      const response = await fetch("/api/generate-hairstyle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: imageUrl || uploadedImage,
          stylePrompt: fullStylePrompt,
          numberOfVariations: 12, // 4x3 grid
        }),
      })

      const data = await response.json()

      if (data.success) {
        const images = data.images.map((url: string, idx: number) => ({
          url,
          id: `result-${idx + 1}`,
        }))
        setGeneratedImages(images)
        if (images.length > 0) {
          setSelectedImage(images[0])
        }
      } else {
        setError(data.error || "Failed to generate hairstyles")
        if (data.suggestion) {
          setError(prev => `${prev}. ${data.suggestion}`)
        }
      }
    } catch (err) {
      console.error("Generation failed:", err)
      setError("Failed to generate hairstyles. Please try again.")
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

  return (
    <div className="min-h-screen bg-white">
      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <h3 className="text-xl font-semibold mb-4">Take Your Photo</h3>
            <div className="relative bg-black rounded-lg overflow-hidden mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={capturePhoto}
                className="flex-1 bg-[#C9A961] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Capture Photo
              </button>
              <button
                onClick={stopCamera}
                className="px-6 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Requirements Modal */}
      {showPhotoRequirements && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 lg:p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-10">
            {/* Header */}
            <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-8 text-center">
              Photo Guidelines for Best Results
            </h2>

            {/* Suitable Photos Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">Suitable Photos</h3>
              </div>

              <p className="text-[#666] text-[15px] leading-relaxed mb-6">
                Please upload a clear, front-facing photo of your face. To create a satisfactory look,
                it's ideal to pull your hair up or back. And let your hair hang naturally.
              </p>

              {/* Good Examples Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden border-2 border-[#E8E8E8] bg-gray-100 aspect-[3/4]">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Camera className="w-12 h-12" />
                    </div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unsuitable Photos Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
                  <X className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">Unsuitable Photos</h3>
              </div>

              <p className="text-[#666] text-[15px] leading-relaxed mb-6">
                Please don't upload photos taken from the side, in low light, where your face is
                covered by hair or any other objects. Also, please avoid cartoon images.
              </p>

              {/* Bad Examples Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden border-2 border-[#E8E8E8] bg-gray-100 aspect-[3/4]">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Camera className="w-12 h-12" />
                    </div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                      <X className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Don't show again checkbox */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <input
                type="checkbox"
                id="dontShowAgain"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#C9A961] focus:ring-[#C9A961]"
              />
              <label htmlFor="dontShowAgain" className="text-sm text-[#666] cursor-pointer">
                Don't show again
              </label>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowPhotoRequirements(false)}
              className="w-48 mx-auto block py-3.5 bg-gradient-to-r from-[#C9A961] to-[#B89651] text-white rounded-lg text-base font-semibold hover:shadow-lg transition-shadow"
            >
              OK, Got it
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* LEFT COLUMN - Upload & History */}
        <div className="w-full lg:w-[30%] p-6 lg:p-8 bg-[#FAFAFA] lg:border-r border-b lg:border-b-0 border-[#E8E8E8]">
          {/* Upload Area */}
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

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="user"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleImageUpload(e.target.files[0])
              }
            }}
            className="hidden"
          />

          {isUploading ? (
            <div className="bg-white border-3 border-dashed border-[#D0D0D0] rounded-xl p-10 lg:p-14 text-center mb-6 min-h-[400px] lg:min-h-[450px] flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-[#C9A961] animate-spin mb-4" />
              <p className="text-[#666] font-medium text-lg">Uploading...</p>
            </div>
          ) : !uploadedImage ? (
            /* Empty State */
            <div className="bg-white border-[3px] border-dashed border-[#D0D0D0] rounded-xl p-10 lg:p-14 text-center mb-6 min-h-[400px] lg:min-h-[450px] flex flex-col items-center justify-center">
              {/* Upload Icon with Background */}
              <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-6">
                <Upload className="w-10 h-10 text-[#999]" />
              </div>

              {/* Instructions */}
              <p className="text-base text-[#666] mb-6 leading-relaxed">
                Click to upload or drag and drop<br />
                your image here
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-5">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-7 py-3.5 bg-gradient-to-r from-[#C9A961] to-[#B89651] text-white rounded-lg text-base font-semibold hover:shadow-lg transition-shadow"
                >
                  Choose File
                </button>
                <button
                  onClick={startCamera}
                  className="px-7 py-3.5 bg-white text-[#C9A961] border-2 border-[#C9A961] rounded-lg text-base font-semibold hover:bg-[#C9A961]/5 transition-colors"
                >
                  Take Photo
                </button>
              </div>

              {/* File Requirements */}
              <p className="text-sm text-[#999] mb-2">
                Supported Formats: JPG, JPEG, PNG or WebP (20MB)
              </p>

              {/* Daily Limit */}
              <p className="text-sm text-[#E91E8C] font-semibold">
                ( 20 Times Limit Per Day )
              </p>
            </div>
          ) : (
            /* Uploaded State with Hover Buttons */
            <div
              className="relative bg-white rounded-xl overflow-hidden mb-6 group"
              onMouseEnter={() => setShowHoverButtons(true)}
              onMouseLeave={() => setShowHoverButtons(false)}
            >
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full rounded-xl"
              />

              {/* Hover Overlay Buttons */}
              <div
                className={`absolute inset-0 bg-black/30 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                  showHoverButtons ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-white/95 text-[#C9A961] border-2 border-[#C9A961] rounded-lg text-sm font-semibold shadow-lg hover:bg-white transition-colors"
                >
                  Re-upload
                </button>
                <button
                  onClick={startCamera}
                  className="px-6 py-3 bg-white/95 text-[#C9A961] border-2 border-[#C9A961] rounded-lg text-sm font-semibold shadow-lg hover:bg-white transition-colors"
                >
                  Take Photo
                </button>
              </div>
            </div>
          )}

          {/* Photo Requirements */}
          <button
            onClick={() => setShowPhotoRequirements(true)}
            className="flex items-center gap-2 text-[#666] text-sm mb-6 hover:text-[#333] transition-colors"
          >
            <Info className="w-4 h-4" />
            Photo Requirements
          </button>

          {/* History Section */}
          <div>
            <h4 className="text-sm font-semibold text-[#666] mb-4">History</h4>
            <div className="grid grid-cols-3 lg:grid-cols-3 gap-3">
              {/* Current photo */}
              {uploadedImage && (
                <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#C9A961]">
                  <img src={uploadedImage} alt="Current" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 right-1 text-[10px] text-[#666] bg-white/90 py-0.5 px-1 rounded text-center">
                    Current
                  </span>
                </div>
              )}

              {/* Placeholder slots */}
              {Array.from({ length: uploadedImage ? 5 : 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-lg border-2 border-dashed border-[#E0E0E0] flex flex-col items-center justify-center bg-[#F8F8F8]"
                >
                  <ImageIcon className="w-6 h-6 text-[#D0D0D0] mb-1" />
                  <span className="text-xs text-[#999]">Result {idx + (uploadedImage ? 2 : 1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Gender & Results */}
        <div className="w-full lg:w-[70%] p-6 lg:p-8 xl:p-12 bg-white">
          {/* Instructions */}
          <p className="text-center text-[#666] text-base lg:text-lg mb-6 lg:mb-8">
            Upload your photo and try different hairstyles instantly
          </p>

          {/* Gender Toggle */}
          <div className="flex justify-center gap-3 mb-8 lg:mb-12">
            <button
              onClick={() => setGender("female")}
              className={`px-8 py-3 rounded-lg text-base font-semibold flex items-center gap-2 transition-all ${
                gender === "female"
                  ? "bg-[#E91E8C] text-white shadow-md"
                  : "bg-white text-[#666] border-2 border-[#E0E0E0] hover:border-[#E91E8C]"
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C9.24 2 7 4.24 7 7s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 12c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Female
            </button>
            <button
              onClick={() => setGender("male")}
              className={`px-8 py-3 rounded-lg text-base font-semibold flex items-center gap-2 transition-all ${
                gender === "male"
                  ? "bg-[#4A90E2] text-white shadow-md"
                  : "bg-white text-[#666] border-2 border-[#E0E0E0] hover:border-[#4A90E2]"
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C9.24 2 7 4.24 7 7s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 12c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Male
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
              {error}
            </div>
          )}

          {/* Results Grid with Navigation */}
          <div className="relative mb-8">
            {/* Left Arrow */}
            <button className="absolute left-0 lg:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center z-10 hover:shadow-md transition-shadow">
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Results Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 lg:px-8">
              {generatedImages.length > 0 ? (
                generatedImages.slice(0, 12).map((image) => (
                  <div
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className={`relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                      selectedImage?.id === image.id
                        ? "ring-4 ring-[#C9A961] shadow-lg"
                        : "border border-[#E0E0E0] hover:shadow-md"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Style ${image.id}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage?.id === image.id && (
                      <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#C9A961] flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" fill="white" />
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadImage(image.url, image.id)
                      }}
                      className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Download className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                ))
              ) : (
                // Empty placeholders
                Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="aspect-[3/4] rounded-xl border-2 border-dashed border-[#E0E0E0] flex flex-col items-center justify-center bg-[#FAFAFA]"
                  >
                    <ImageIcon className="w-8 h-8 text-[#D0D0D0] mb-2" />
                    <span className="text-sm text-[#999]">Style {idx + 1}</span>
                  </div>
                ))
              )}
            </div>

            {/* Right Arrow */}
            <button className="absolute right-0 lg:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center z-10 hover:shadow-md transition-shadow">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateHairstyles}
            disabled={!uploadedImage || isGenerating}
            className="w-full py-5 rounded-xl text-lg font-bold flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#C9A961] to-[#B89651] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Sparkles className="w-6 h-6" />
            {isGenerating ? "Generating Hairstyles..." : "Generate New Hairstyles"}
          </button>

          {isGenerating && (
            <div className="text-center mt-4">
              <div className="inline-block w-8 h-8 border-4 border-[#E8E8E8] border-t-[#C9A961] rounded-full animate-spin" />
              <p className="text-sm text-[#666] mt-2">This may take 30-60 seconds...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
