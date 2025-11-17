import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client for server-side
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error("Supabase credentials not configured")
  }

  return createClient(url, key)
}

export async function POST(request: Request) {
  try {
    const { imageData } = await request.json()

    if (!imageData) {
      return NextResponse.json(
        { error: "Image data is required" },
        { status: 400 }
      )
    }

    // Extract base64 data from data URL
    const base64Match = imageData.match(/^data:image\/(\w+);base64,(.+)$/)
    if (!base64Match) {
      return NextResponse.json(
        { error: "Invalid image format" },
        { status: 400 }
      )
    }

    const imageType = base64Match[1]
    const base64Data = base64Match[2]

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, "base64")

    const supabase = getSupabaseClient()

    // Generate unique filename
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(7)
    const fileName = `consultations/${timestamp}-${randomId}.${imageType}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("consultation-images")
      .upload(fileName, buffer, {
        contentType: `image/${imageType}`,
        cacheControl: "3600",
        upsert: false
      })

    if (error) {
      console.error("Supabase upload error:", error)
      return NextResponse.json(
        { error: "Failed to upload image", details: error.message },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("consultation-images")
      .getPublicUrl(fileName)

    return NextResponse.json({
      success: true,
      imageUrl: urlData.publicUrl,
      path: data.path
    })

  } catch (error) {
    console.error("Image upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload image", details: String(error) },
      { status: 500 }
    )
  }
}
