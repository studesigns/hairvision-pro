import { NextResponse } from "next/server"
import Replicate from "replicate"

// Initialize Replicate client
function getReplicateClient() {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("REPLICATE_API_TOKEN is required")
  }
  return new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  })
}

export async function POST(request: Request) {
  try {
    const { imageUrl, stylePrompt, numberOfVariations = 4 } = await request.json()

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      )
    }

    if (!stylePrompt) {
      return NextResponse.json(
        { error: "Style prompt is required" },
        { status: 400 }
      )
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Replicate API token not configured. Please add REPLICATE_API_TOKEN to environment variables." },
        { status: 500 }
      )
    }

    const replicate = getReplicateClient()

    // Build comprehensive prompt for hairstyle generation
    const fullPrompt = `professional hairstyle photography, ${stylePrompt}, high quality, realistic, salon photography, natural lighting, clear focus on hair, studio quality`

    const negativePrompt = "cartoon, anime, illustration, painting, drawing, art, sketch, low quality, blurry, distorted face, unnatural, bad anatomy, deformed"

    // Generate multiple variations
    // Note: SDXL doesn't support num_outputs, so we'll run multiple times
    const generationPromises = []

    for (let i = 0; i < numberOfVariations; i++) {
      const promise = replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
          input: {
            image: imageUrl,
            prompt: fullPrompt,
            negative_prompt: negativePrompt,
            num_inference_steps: 30,
            guidance_scale: 7.5 + (i * 0.3), // Slight variation in guidance
            prompt_strength: 0.65 + (i * 0.05), // Vary strength slightly
            scheduler: "DPMSolverMultistep",
            seed: Math.floor(Math.random() * 1000000) + i, // Different seeds
          },
        }
      )
      generationPromises.push(promise)
    }

    // Wait for all generations to complete
    const results = await Promise.all(generationPromises)

    // Extract URLs from results
    const images = results.map((output) => {
      return Array.isArray(output) ? output[0] : output
    }).filter(Boolean)

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
      count: images.length
    })

  } catch (error) {
    console.error("Hairstyle generation error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate hairstyles",
        details: String(error),
        suggestion: "Make sure REPLICATE_API_TOKEN is set in your environment variables"
      },
      { status: 500 }
    )
  }
}
