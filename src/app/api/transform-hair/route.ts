import { NextResponse } from "next/server"
import Replicate from "replicate"

// Initialize Replicate client lazily
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
    const { imageUrl, hairColor, hairStyle, maskData } = await request.json()

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      )
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Replicate API token not configured" },
        { status: 500 }
      )
    }

    const replicate = getReplicateClient()

    // Build the prompt for hair transformation
    const colorDescription = hairColor || "natural brown"
    const styleDescription = hairStyle || "healthy, shiny"

    const prompt = `professional salon quality photo, ${styleDescription} hair with ${colorDescription} color, natural looking, realistic hair texture, well-lit, high quality`

    // Use SDXL Inpainting for precise hair color changes
    // If we have a mask, use inpainting. Otherwise use img2img

    if (maskData) {
      // Inpainting with mask for precise hair color change
      const output = await replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
          input: {
            image: imageUrl,
            mask: maskData,
            prompt: prompt,
            negative_prompt: "blurry, low quality, distorted face, unnatural, cartoon, painting",
            num_inference_steps: 30,
            guidance_scale: 7.5,
            prompt_strength: 0.75,
            scheduler: "DPMSolverMultistep",
          },
        }
      )

      const resultUrl = Array.isArray(output) ? output[0] : output

      return NextResponse.json({
        success: true,
        transformedImageUrl: resultUrl,
        prompt: prompt,
      })
    } else {
      // Without mask, use img2img for general style transfer
      // This is less precise but works without segmentation
      const output = await replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
          input: {
            image: imageUrl,
            prompt: prompt,
            negative_prompt: "blurry, low quality, distorted face, unnatural, cartoon, painting, bad hair",
            num_inference_steps: 25,
            guidance_scale: 7.0,
            prompt_strength: 0.4, // Lower to preserve more of original
            scheduler: "DPMSolverMultistep",
          },
        }
      )

      const resultUrl = Array.isArray(output) ? output[0] : output

      return NextResponse.json({
        success: true,
        transformedImageUrl: resultUrl,
        prompt: prompt,
        note: "For better results, provide a hair mask",
      })
    }
  } catch (error) {
    console.error("Hair transformation error:", error)
    return NextResponse.json(
      { error: "Failed to transform hair", details: String(error) },
      { status: 500 }
    )
  }
}
