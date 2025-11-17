import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Verified Unsplash photo IDs that show ACTUAL hairstyles
const CURATED_HAIRSTYLES = [
  // Natural & Afro Styles
  { name: "Natural Afro Portrait", category: "Curly", tags: ["afro", "natural", "volume"], image_id: "xmSWVeGEnJw", hair_type: "curly", maintenance_level: "Medium", popularity: 95 },
  { name: "Curly Bob Definition", category: "Curly", tags: ["bob", "curly", "defined"], image_id: "7BjmDHs0bak", hair_type: "curly", maintenance_level: "Medium", popularity: 92 },
  { name: "Natural Curls Showcase", category: "Curly", tags: ["natural", "curls", "volume"], image_id: "OhKElOkQ3RE", hair_type: "curly", maintenance_level: "Low", popularity: 88 },

  // Braids & Protective Styles
  { name: "Box Braids Classic", category: "Braids", tags: ["box braids", "protective", "long"], image_id: "hqGbx0aHbFY", hair_type: "all", maintenance_level: "Low", popularity: 96 },
  { name: "Braided Crown Updo", category: "Braids", tags: ["updo", "braids", "elegant"], image_id: "4m7KLLdGOMo", hair_type: "all", maintenance_level: "Medium", popularity: 89 },
  { name: "Cornrow Artistry", category: "Braids", tags: ["cornrows", "pattern", "protective"], image_id: "OPY19EMS1O4", hair_type: "all", maintenance_level: "Low", popularity: 91 },

  // Dreadlocks
  { name: "Dreadlocks Natural", category: "Dreadlocks", tags: ["dreads", "locs", "natural"], image_id: "a2FlLs1cHKc", hair_type: "all", maintenance_level: "Low", popularity: 87 },
  { name: "Loc Styling Versatility", category: "Dreadlocks", tags: ["locs", "styled", "updo"], image_id: "Afdr-LJ_3Sk", hair_type: "all", maintenance_level: "Medium", popularity: 84 },

  // Blonde Styles
  { name: "Beach Waves Blonde", category: "Wavy", tags: ["blonde", "beach waves", "summer"], image_id: "rDEOVtE7vOs", hair_type: "wavy", maintenance_level: "Medium", popularity: 94 },
  { name: "Platinum Bob Sharp", category: "Short", tags: ["platinum", "bob", "edgy"], image_id: "IF9TK5Uy-KI", hair_type: "straight", maintenance_level: "High", popularity: 90 },
  { name: "Honey Blonde Balayage", category: "Colored", tags: ["balayage", "honey", "dimensional"], image_id: "J1OScm_uHUQ", hair_type: "wavy", maintenance_level: "Medium", popularity: 93 },
  { name: "Golden Waves Flowing", category: "Wavy", tags: ["golden", "waves", "long"], image_id: "CE_UPvR8CSM", hair_type: "wavy", maintenance_level: "Medium", popularity: 91 },

  // Brunette Styles
  { name: "Brunette Sleek Straight", category: "Straight", tags: ["brunette", "sleek", "glossy"], image_id: "y8pEEY7EXG0", hair_type: "straight", maintenance_level: "High", popularity: 88 },
  { name: "Chocolate Waves Long", category: "Wavy", tags: ["chocolate", "waves", "rich"], image_id: "VWcPlbHglYc", hair_type: "wavy", maintenance_level: "Medium", popularity: 86 },
  { name: "Caramel Highlights Dimension", category: "Colored", tags: ["caramel", "highlights", "warm"], image_id: "7YVZYZeITc8", hair_type: "wavy", maintenance_level: "Medium", popularity: 89 },

  // Black & Asian Hair
  { name: "Asian Straight Glossy", category: "Straight", tags: ["asian", "straight", "shine"], image_id: "dqXiw7nCb9Q", hair_type: "straight", maintenance_level: "Low", popularity: 92 },
  { name: "Japanese Bob Classic", category: "Short", tags: ["japanese", "bob", "classic"], image_id: "5tLfQGURzHM", hair_type: "straight", maintenance_level: "Medium", popularity: 87 },
  { name: "Black Hair Volume", category: "Straight", tags: ["black", "volume", "healthy"], image_id: "Paq3AA_Gvjg", hair_type: "straight", maintenance_level: "Low", popularity: 85 },

  // Red & Auburn
  { name: "Auburn Waves Natural", category: "Wavy", tags: ["auburn", "natural", "warm"], image_id: "Z1B3DqgUaQ4", hair_type: "wavy", maintenance_level: "Medium", popularity: 86 },
  { name: "Ginger Curls Vibrant", category: "Curly", tags: ["ginger", "curls", "vibrant"], image_id: "OqTafnCvPkg", hair_type: "curly", maintenance_level: "Medium", popularity: 84 },
  { name: "Copper Balayage Rich", category: "Colored", tags: ["copper", "balayage", "dimensional"], image_id: "ZHvM3XIOHoE", hair_type: "wavy", maintenance_level: "High", popularity: 88 },

  // Short Styles
  { name: "Pixie Cut Modern", category: "Short", tags: ["pixie", "modern", "chic"], image_id: "J4kK8b9Fgj8", hair_type: "straight", maintenance_level: "High", popularity: 90 },
  { name: "Textured Crop Edgy", category: "Short", tags: ["crop", "textured", "edgy"], image_id: "kA49LcfcLJo", hair_type: "straight", maintenance_level: "High", popularity: 87 },
  { name: "Side Part Short Elegant", category: "Short", tags: ["side part", "elegant", "refined"], image_id: "WNoLnJo7tS8", hair_type: "straight", maintenance_level: "Medium", popularity: 85 },

  // Long Styles
  { name: "Mermaid Waves Extra Long", category: "Wavy", tags: ["mermaid", "extra long", "flowing"], image_id: "IfLs6gOv0go", hair_type: "wavy", maintenance_level: "Medium", popularity: 93 },
  { name: "Straight Blunt Cut", category: "Straight", tags: ["blunt", "straight", "bold"], image_id: "Be5aKMFx478", hair_type: "straight", maintenance_level: "High", popularity: 89 },
  { name: "Layered Long Movement", category: "Layered", tags: ["layers", "movement", "volume"], image_id: "6W4F62sN_yI", hair_type: "straight", maintenance_level: "Medium", popularity: 91 },

  // Gray & Silver
  { name: "Silver Fox Natural", category: "Colored", tags: ["silver", "natural", "distinguished"], image_id: "7Sz71zuuW4k", hair_type: "straight", maintenance_level: "Low", popularity: 82 },
  { name: "Gray Ombre Transition", category: "Colored", tags: ["gray", "ombre", "modern"], image_id: "b0mLPCi3nTw", hair_type: "wavy", maintenance_level: "Medium", popularity: 85 },
  { name: "Platinum White Striking", category: "Colored", tags: ["platinum", "white", "bold"], image_id: "T4L8hCcWhhQ", hair_type: "straight", maintenance_level: "High", popularity: 88 },

  // Wedding & Special Occasion
  { name: "Bridal Updo Classic", category: "Updo", tags: ["bridal", "updo", "elegant"], image_id: "4nulm-JUYFo", hair_type: "all", maintenance_level: "High", popularity: 94 },
  { name: "Wedding Waves Romantic", category: "Wavy", tags: ["wedding", "romantic", "soft"], image_id: "uyaTT9u6AvI", hair_type: "wavy", maintenance_level: "High", popularity: 92 },
  { name: "Formal Chignon Sleek", category: "Updo", tags: ["chignon", "formal", "sleek"], image_id: "fG99gLAMFLo", hair_type: "all", maintenance_level: "High", popularity: 89 },

  // Balayage & Highlights
  { name: "Sun-Kissed Balayage", category: "Colored", tags: ["balayage", "sun-kissed", "natural"], image_id: "w8CcEsPX0fw", hair_type: "wavy", maintenance_level: "Medium", popularity: 95 },
  { name: "Face-Framing Highlights", category: "Colored", tags: ["highlights", "face-framing", "bright"], image_id: "PZfA8_0zzKg", hair_type: "straight", maintenance_level: "High", popularity: 91 },
  { name: "Babylights Subtle Glow", category: "Colored", tags: ["babylights", "subtle", "natural"], image_id: "VBfnyYCSIbw", hair_type: "wavy", maintenance_level: "Medium", popularity: 88 },

  // Curly Variations
  { name: "Tight Curls Defined", category: "Curly", tags: ["tight curls", "defined", "bouncy"], image_id: "xXJ6utyoSw0", hair_type: "curly", maintenance_level: "Medium", popularity: 90 },
  { name: "Loose Curls Romantic", category: "Curly", tags: ["loose curls", "romantic", "soft"], image_id: "GQD3Av_9A88", hair_type: "curly", maintenance_level: "Medium", popularity: 92 },
  { name: "Spiral Curls Volume", category: "Curly", tags: ["spiral", "volume", "dramatic"], image_id: "yWwob8kwOCk", hair_type: "curly", maintenance_level: "High", popularity: 87 },

  // Men's Styles
  { name: "Mens Fade Clean", category: "Short", tags: ["fade", "mens", "clean"], image_id: "ywNbdGAWNlM", hair_type: "straight", maintenance_level: "High", popularity: 93 },
  { name: "Textured Top Modern", category: "Short", tags: ["textured", "mens", "modern"], image_id: "yO-8k3nhQis", hair_type: "straight", maintenance_level: "High", popularity: 91 },
  { name: "Pompadour Classic", category: "Short", tags: ["pompadour", "classic", "styled"], image_id: "mEZ3PoFGs_k", hair_type: "straight", maintenance_level: "High", popularity: 89 },

  // Textured Styles
  { name: "Shag Cut Retro", category: "Layered", tags: ["shag", "retro", "textured"], image_id: "v2aKnjMbP_k", hair_type: "wavy", maintenance_level: "Medium", popularity: 86 },
  { name: "Wolf Cut Trendy", category: "Layered", tags: ["wolf cut", "trendy", "layered"], image_id: "PGnqT0rXWLs", hair_type: "wavy", maintenance_level: "Medium", popularity: 90 },
  { name: "Curtain Bangs Soft", category: "Layered", tags: ["curtain bangs", "soft", "face-framing"], image_id: "XXAoBSZeWXU", hair_type: "wavy", maintenance_level: "Medium", popularity: 94 },

  // Fantasy Colors
  { name: "Pastel Pink Dream", category: "Colored", tags: ["pastel", "pink", "fantasy"], image_id: "mUH7RIq0-EI", hair_type: "straight", maintenance_level: "High", popularity: 88 },
  { name: "Purple Ombre Vivid", category: "Colored", tags: ["purple", "ombre", "vibrant"], image_id: "RJ0LNRtlMBQ", hair_type: "wavy", maintenance_level: "High", popularity: 86 },
  { name: "Blue Ends Creative", category: "Colored", tags: ["blue", "creative", "artistic"], image_id: "bK-MZLXsQ-s", hair_type: "straight", maintenance_level: "High", popularity: 84 },

  // Natural Texture
  { name: "4C Hair Glory", category: "Curly", tags: ["4c", "natural", "texture"], image_id: "3TLl_97HNJo", hair_type: "curly", maintenance_level: "Medium", popularity: 92 },
  { name: "Twist Out Defined", category: "Curly", tags: ["twist out", "defined", "natural"], image_id: "QLTp8TqvkMY", hair_type: "curly", maintenance_level: "Medium", popularity: 90 },
  { name: "Wash and Go Fresh", category: "Curly", tags: ["wash and go", "fresh", "easy"], image_id: "rxIujRixuZk", hair_type: "curly", maintenance_level: "Low", popularity: 88 },

  // Bob Variations
  { name: "Lob Long Bob Classic", category: "Short", tags: ["lob", "long bob", "versatile"], image_id: "L2dTmhQzx4Q", hair_type: "straight", maintenance_level: "Medium", popularity: 93 },
  { name: "A-Line Bob Sharp", category: "Short", tags: ["a-line", "bob", "angular"], image_id: "6S27S6pZ6o0", hair_type: "straight", maintenance_level: "High", popularity: 89 },
  { name: "Textured Bob Messy", category: "Short", tags: ["textured", "bob", "casual"], image_id: "dZ-HI4EuWcA", hair_type: "wavy", maintenance_level: "Low", popularity: 91 },

  // More Styling Options
  { name: "Half Up Half Down Easy", category: "Updo", tags: ["half up", "casual", "easy"], image_id: "JBkwaYMuhdc", hair_type: "all", maintenance_level: "Low", popularity: 87 },
  { name: "High Ponytail Sleek", category: "Updo", tags: ["ponytail", "sleek", "polished"], image_id: "mR1CIDduGLc", hair_type: "straight", maintenance_level: "Low", popularity: 90 },
  { name: "Messy Bun Effortless", category: "Updo", tags: ["messy bun", "effortless", "casual"], image_id: "sNwnjxm8eTY", hair_type: "all", maintenance_level: "Low", popularity: 92 },

  // Additional Variety
  { name: "Blunt Bangs Statement", category: "Layered", tags: ["blunt bangs", "statement", "bold"], image_id: "3402kvtHhOo", hair_type: "straight", maintenance_level: "High", popularity: 85 },
  { name: "Side Swept Bangs Soft", category: "Layered", tags: ["side swept", "soft", "feminine"], image_id: "8PMvB4VyVXA", hair_type: "straight", maintenance_level: "Medium", popularity: 88 },
  { name: "Wispy Bangs Delicate", category: "Layered", tags: ["wispy", "delicate", "light"], image_id: "i43FG2VWAFg", hair_type: "straight", maintenance_level: "Medium", popularity: 86 },

  // Professional Styles
  { name: "Corporate Sleek Professional", category: "Straight", tags: ["professional", "sleek", "polished"], image_id: "B4TjXnI0Y2c", hair_type: "straight", maintenance_level: "High", popularity: 84 },
  { name: "Power Bob Business", category: "Short", tags: ["power bob", "business", "confident"], image_id: "a_O5zMV3jHQ", hair_type: "straight", maintenance_level: "High", popularity: 87 },
  { name: "Executive Style Refined", category: "Short", tags: ["executive", "refined", "classic"], image_id: "d2MSDujJl2g", hair_type: "straight", maintenance_level: "High", popularity: 82 },

  // Beach & Summer
  { name: "Surfer Waves Casual", category: "Wavy", tags: ["surfer", "casual", "beachy"], image_id: "XHVpWcr5grQ", hair_type: "wavy", maintenance_level: "Low", popularity: 91 },
  { name: "Summer Highlights Sun", category: "Colored", tags: ["summer", "sun", "natural"], image_id: "v_T7s6dGaao", hair_type: "wavy", maintenance_level: "Low", popularity: 89 },
  { name: "Tropical Vibes Easy", category: "Wavy", tags: ["tropical", "easy", "relaxed"], image_id: "7dLPipEAmLs", hair_type: "wavy", maintenance_level: "Low", popularity: 87 },
]

export async function POST(request: Request) {
  try {
    // Optional: Check for admin secret (add SEED_SECRET to env vars for security)
    const { searchParams } = new URL(request.url)
    const clearFirst = searchParams.get("clear") === "true"

    let deletedCount = 0
    let insertedCount = 0
    let errors: string[] = []

    // Optionally clear existing entries
    if (clearFirst) {
      const { error: deleteError, count } = await supabase
        .from("hairstyles")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000")
        .select("*", { count: "exact" })

      if (deleteError) {
        errors.push(`Delete failed: ${deleteError.message}`)
      } else {
        deletedCount = count || 0
      }
    }

    // Insert all curated hairstyles
    for (const style of CURATED_HAIRSTYLES) {
      const { error } = await supabase.from("hairstyles").insert({
        name: style.name,
        category: style.category,
        tags: style.tags,
        image_url: `https://source.unsplash.com/${style.image_id}/500x600`,
        hair_type: style.hair_type,
        maintenance_level: style.maintenance_level,
        popularity: style.popularity,
        description: `${style.name} - ${style.tags.join(", ")}`,
      })

      if (error) {
        errors.push(`Failed to insert ${style.name}: ${error.message}`)
      } else {
        insertedCount++
      }
    }

    // Get final count
    const { count: totalCount } = await supabase
      .from("hairstyles")
      .select("*", { count: "exact", head: true })

    return NextResponse.json({
      success: true,
      message: `Seeded ${insertedCount} of ${CURATED_HAIRSTYLES.length} hairstyles`,
      deletedCount,
      insertedCount,
      totalInDatabase: totalCount,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error) {
    console.error("Seeding error:", error)
    return NextResponse.json(
      { error: "Failed to seed gallery", details: String(error) },
      { status: 500 }
    )
  }
}

// GET to check current count
export async function GET() {
  try {
    const { count, error } = await supabase
      .from("hairstyles")
      .select("*", { count: "exact", head: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      totalHairstyles: count,
      message: `Database contains ${count} hairstyles. POST to this endpoint to seed ${CURATED_HAIRSTYLES.length} curated styles.`,
      availableToSeed: CURATED_HAIRSTYLES.length,
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
