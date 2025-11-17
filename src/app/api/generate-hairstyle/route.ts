import { NextResponse } from "next/server"
import { HfInference } from "@huggingface/inference"

// Initialize Hugging Face client
function getHFClient() {
  if (!process.env.HUGGINGFACE_API_KEY) {
    throw new Error("HUGGINGFACE_API_KEY is required")
  }
  return new HfInference(process.env.HUGGINGFACE_API_KEY)
}

export async function POST(request: Request) {
  try {
    const { imageUrl, stylePrompt, numberOfVariations = 4 } = await request.json()

    if (!stylePrompt) {
      return NextResponse.json(
        { error: "Style prompt is required" },
        { status: 400 }
      )
    }

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json(
        { error: "Hugging Face API key not configured. Get a FREE key at huggingface.co/settings/tokens" },
        { status: 500 }
      )
    }

    const hf = getHFClient()

    // Build comprehensive prompt for hairstyle generation
    const fullPrompt = `professional hairstyle photography, ${stylePrompt}, high quality, realistic, salon photography, natural lighting, clear focus on hair, studio quality, portrait photography`

    const negativePrompt = "cartoon, anime, illustration, painting, drawing, art, sketch, low quality, blurry, distorted face, unnatural, bad anatomy, deformed, watermark, text"

    // Generate multiple variations using Hugging Face's free inference API
    // Using text-to-image since img2img requires more setup
    const generationPromises = []

    // Limit to 3 variations for free tier (to avoid rate limits)
    const actualVariations = Math.min(numberOfVariations, 3)

    for (let i = 0; i < actualVariations; i++) {
      const promise = hf.textToImage({
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        inputs: fullPrompt,
        parameters: {
          negative_prompt: negativePrompt,
          num_inference_steps: 25,
          guidance_scale: 7.5 + (i * 0.5),
          width: 768,
          height: 1024, // Portrait orientation for hairstyles
        },
      })
      generationPromises.push(promise)
    }

    // Wait for all generations to complete
    const results = await Promise.all(generationPromises)

    // Convert blobs to base64 data URLs
    const images: string[] = []
    for (const result of results) {
      // HuggingFace returns Blob objects
      const blob = result as unknown as Blob
      const arrayBuffer = await blob.arrayBuffer()
      const base64 = Buffer.from(arrayBuffer).toString("base64")
      const dataUrl = `data:image/jpeg;base64,${base64}`
      images.push(dataUrl)
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: "No images were generated" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      images: images,
      prompt: fullPrompt,
      count: images.length,
      note: "Generated using Hugging Face free tier (SDXL)"
    })

  } catch (error) {
    console.error("Hairstyle generation error:", error)

    // Check for specific HF errors
    const errorMessage = String(error)
    let suggestion = "Make sure HUGGINGFACE_API_KEY is set. Get a FREE key at huggingface.co/settings/tokens"

    if (errorMessage.includes("rate limit")) {
      suggestion = "Free tier rate limit reached. Wait a few minutes and try again."
    } else if (errorMessage.includes("loading")) {
      suggestion = "Model is loading (cold start). Please wait 30-60 seconds and try again."
    }

    return NextResponse.json(
      {
        error: "Failed to generate hairstyles",
        details: errorMessage,
        suggestion: suggestion
      },
      { status: 500 }
    )
  }
}
