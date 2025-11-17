"use client"

import { useCallback, useState } from "react"
import { Camera, Upload, X, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PhotoUploadProps {
  onPhotoCapture: (imageData: string) => void
  currentPhoto?: string
  className?: string
}

export function PhotoUpload({ onPhotoCapture, currentPhoto, className }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      processFile(file)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }, [])

  const processFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      onPhotoCapture(result)
    }
    reader.readAsDataURL(file)
  }

  const handleCameraCapture = async () => {
    setIsCapturing(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      const video = document.createElement("video")
      video.srcObject = stream
      await video.play()

      const canvas = document.createElement("canvas")
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      ctx?.drawImage(video, 0, 0)

      const imageData = canvas.toDataURL("image/jpeg", 0.8)
      onPhotoCapture(imageData)

      stream.getTracks().forEach(track => track.stop())
    } catch (error) {
      console.error("Camera access denied:", error)
      alert("Unable to access camera. Please upload a photo instead.")
    } finally {
      setIsCapturing(false)
    }
  }

  const clearPhoto = () => {
    onPhotoCapture("")
  }

  if (currentPhoto) {
    return (
      <div className={cn("relative rounded-xl overflow-hidden", className)}>
        <img
          src={currentPhoto}
          alt="Client photo"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearPhoto}
            className="bg-white/90 hover:bg-white"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Retake
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearPhoto}
            className="bg-white/90 hover:bg-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-xl p-8 text-center transition-colors",
        isDragging ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-purple-400",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
          <Camera className="w-8 h-8 text-purple-600" />
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-1">
            Upload Client Photo
          </h4>
          <p className="text-sm text-gray-500">
            Drag and drop an image, or use the options below
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="default"
            onClick={handleCameraCapture}
            disabled={isCapturing}
            className="gap-2"
          >
            <Camera className="w-4 h-4" />
            {isCapturing ? "Capturing..." : "Take Photo"}
          </Button>

          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <span className="inline-flex items-center justify-center rounded-lg font-medium transition-colors h-10 px-4 text-base border border-gray-300 bg-white hover:bg-gray-50 gap-2">
              <Upload className="w-4 h-4" />
              Browse Files
            </span>
          </label>
        </div>

        <p className="text-xs text-gray-400">
          Supports JPG, PNG, WebP up to 10MB
        </p>
      </div>
    </div>
  )
}
