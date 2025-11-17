import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(request: Request) {
  try {
    const { description, currentPhoto } = await request.json()

    // Lazy load OpenAI client
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      )
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    if (!description) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      )
    }

    // Generate style analysis and recommendations using GPT-4
    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert hair stylist and colorist. Analyze the client's request and provide detailed recommendations including:
1. Specific hairstyle recommendations
2. Color formulations with exact product codes
3. Application techniques
4. Maintenance tips
5. Alternative options

Format your response as JSON with the following structure:
{
  "primaryRecommendation": {
    "style": "style name",
    "colorFormula": {
      "base": "product code",
      "highlights": "product code if applicable",
      "developer": "volume and ratio",
      "processingTime": "minutes"
    },
    "technique": "application method",
    "maintenanceTips": ["tip1", "tip2"]
  },
  "alternatives": [
    {
      "style": "alternative style",
      "reason": "why this might work"
    }
  ],
  "warnings": ["any important considerations"]
}`,
        },
        {
          role: "user",
          content: `Client request: "${description}"

Please provide detailed styling and color recommendations based on this request.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    const analysisText = analysisResponse.choices[0]?.message?.content || ""

    // Try to parse the JSON response
    let analysis
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in response")
      }
    } catch {
      // If parsing fails, create a structured response from the text
      analysis = {
        primaryRecommendation: {
          style: "Custom style based on description",
          colorFormula: {
            base: "Consult with stylist",
            developer: "20 Vol (1:1)",
            processingTime: "35",
          },
          technique: analysisText,
          maintenanceTips: [
            "Use color-safe shampoo",
            "Deep condition weekly",
          ],
        },
        alternatives: [],
        warnings: ["Please consult with a professional stylist for exact formulations"],
      }
    }

    // If we have a photo, we could potentially generate a preview
    // For now, we'll return the analysis
    // In production, you'd integrate with an image generation API like DALL-E or Stable Diffusion

    const generatedPreviews: string[] = []

    // Optionally generate image previews (requires DALL-E API)
    if (process.env.ENABLE_IMAGE_GENERATION === "true") {
      try {
        const imagePrompt = `Professional hairstyle photo: ${description}. High quality salon photography, realistic hair texture and color, professional lighting, front-facing portrait.`

        const imageResponse = await openai.images.generate({
          model: "dall-e-3",
          prompt: imagePrompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
        })

        if (imageResponse.data && imageResponse.data[0]?.url) {
          generatedPreviews.push(imageResponse.data[0].url)
        }
      } catch (imageError) {
        console.error("Image generation failed:", imageError)
        // Continue without image generation
      }
    }

    return NextResponse.json({
      success: true,
      analysis,
      generatedPreviews,
      originalDescription: description,
    })
  } catch (error) {
    console.error("Style generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate style recommendations" },
      { status: 500 }
    )
  }
}
