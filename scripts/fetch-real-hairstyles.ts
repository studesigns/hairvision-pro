/**
 * Fetch Real Hairstyle Images from Unsplash API
 *
 * Uses targeted keyword searches to get actual hairstyle photos
 * instead of random portraits. Each search term is specific to the hairstyle.
 */

import { createClient } from "@supabase/supabase-js"

// Unsplash API - Free tier: 50 requests/hour
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || ""

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://burdztelpeqkbhaevako.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cmR6dGVscGVxa2JoYWV2YWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NDI3NTMsImV4cCI6MjA0NzMxODc1M30.yh1Gf9VT0gKDt4E-3ikFRwOVe7yx1vRfBsQbG6XgvLE"

interface HairstyleSearch {
  name: string
  category: string
  searchQuery: string // Specific search term for actual hairstyle images
  tags: string[]
  hairType: string
}

// Each entry has a SPECIFIC search query to find ACTUAL images of that hairstyle
const hairstyleSearches: HairstyleSearch[] = [
  // Balayage & Color Techniques
  {
    name: "Caramel Balayage",
    category: "Color",
    searchQuery: "balayage hair caramel highlights",
    tags: ["balayage", "caramel", "highlights", "sun-kissed"],
    hairType: "long"
  },
  {
    name: "Blonde Balayage",
    category: "Color",
    searchQuery: "blonde balayage hair",
    tags: ["balayage", "blonde", "highlights", "natural"],
    hairType: "long"
  },
  {
    name: "Ash Blonde Ombre",
    category: "Color",
    searchQuery: "ash blonde ombre hair",
    tags: ["ombre", "ash", "blonde", "gradient"],
    hairType: "medium"
  },
  {
    name: "Rose Gold Hair",
    category: "Color",
    searchQuery: "rose gold pink hair color",
    tags: ["rose-gold", "pink", "fashion", "trendy"],
    hairType: "medium"
  },
  {
    name: "Rich Burgundy",
    category: "Color",
    searchQuery: "burgundy wine red hair color",
    tags: ["burgundy", "wine", "red", "deep"],
    hairType: "long"
  },
  {
    name: "Silver Platinum",
    category: "Color",
    searchQuery: "platinum silver gray hair",
    tags: ["platinum", "silver", "gray", "icy"],
    hairType: "short"
  },
  {
    name: "Copper Red Highlights",
    category: "Color",
    searchQuery: "copper red hair highlights",
    tags: ["copper", "red", "highlights", "warm"],
    hairType: "long"
  },
  {
    name: "Honey Blonde Highlights",
    category: "Color",
    searchQuery: "honey blonde hair highlights",
    tags: ["honey", "blonde", "warm", "golden"],
    hairType: "medium"
  },

  // Bob Cuts
  {
    name: "Classic Bob Cut",
    category: "Short",
    searchQuery: "bob haircut straight",
    tags: ["bob", "classic", "straight", "professional"],
    hairType: "short"
  },
  {
    name: "Angled Bob",
    category: "Short",
    searchQuery: "angled bob haircut",
    tags: ["bob", "angled", "modern", "asymmetric"],
    hairType: "short"
  },
  {
    name: "Textured Lob",
    category: "Medium",
    searchQuery: "lob long bob haircut textured",
    tags: ["lob", "textured", "wavy", "messy"],
    hairType: "medium"
  },
  {
    name: "Blunt Bob",
    category: "Short",
    searchQuery: "blunt bob haircut",
    tags: ["bob", "blunt", "sharp", "sleek"],
    hairType: "short"
  },
  {
    name: "Curly Bob",
    category: "Curly",
    searchQuery: "curly bob haircut",
    tags: ["bob", "curly", "natural", "volume"],
    hairType: "curly"
  },

  // Pixie Cuts
  {
    name: "Classic Pixie Cut",
    category: "Short",
    searchQuery: "pixie haircut short",
    tags: ["pixie", "short", "classic", "chic"],
    hairType: "short"
  },
  {
    name: "Textured Pixie",
    category: "Short",
    searchQuery: "textured pixie haircut",
    tags: ["pixie", "textured", "edgy", "modern"],
    hairType: "short"
  },
  {
    name: "Pixie with Undercut",
    category: "Short",
    searchQuery: "pixie undercut haircut",
    tags: ["pixie", "undercut", "bold", "statement"],
    hairType: "short"
  },
  {
    name: "Long Pixie",
    category: "Short",
    searchQuery: "long pixie haircut",
    tags: ["pixie", "long", "feminine", "versatile"],
    hairType: "short"
  },

  // Braids & Protective Styles
  {
    name: "Box Braids",
    category: "Long",
    searchQuery: "box braids hairstyle",
    tags: ["box-braids", "protective", "classic", "versatile"],
    hairType: "long"
  },
  {
    name: "Knotless Braids",
    category: "Long",
    searchQuery: "knotless braids hairstyle",
    tags: ["knotless", "braids", "natural", "lightweight"],
    hairType: "long"
  },
  {
    name: "Goddess Locs",
    category: "Long",
    searchQuery: "goddess locs hairstyle",
    tags: ["locs", "goddess", "bohemian", "textured"],
    hairType: "long"
  },
  {
    name: "Senegalese Twists",
    category: "Long",
    searchQuery: "senegalese twists hairstyle",
    tags: ["twists", "senegalese", "elegant", "protective"],
    hairType: "long"
  },
  {
    name: "Cornrows",
    category: "Short",
    searchQuery: "cornrows hairstyle",
    tags: ["cornrows", "neat", "geometric", "protective"],
    hairType: "short"
  },
  {
    name: "Passion Twists",
    category: "Medium",
    searchQuery: "passion twists hair",
    tags: ["passion", "twists", "bohemian", "romantic"],
    hairType: "medium"
  },

  // Natural Curls
  {
    name: "Defined Natural Curls",
    category: "Curly",
    searchQuery: "natural curly hair defined",
    tags: ["natural", "curls", "defined", "type-3"],
    hairType: "curly"
  },
  {
    name: "Coily Afro",
    category: "Curly",
    searchQuery: "afro hairstyle natural",
    tags: ["afro", "coily", "natural", "volume"],
    hairType: "curly"
  },
  {
    name: "Wash and Go Curls",
    category: "Curly",
    searchQuery: "wash and go curly hair",
    tags: ["wash-go", "curly", "easy", "natural"],
    hairType: "curly"
  },
  {
    name: "Twist Out",
    category: "Curly",
    searchQuery: "twist out natural hair",
    tags: ["twist-out", "defined", "natural", "texture"],
    hairType: "curly"
  },

  // Layers & Modern Cuts
  {
    name: "Face-Framing Layers",
    category: "Long",
    searchQuery: "face framing layers haircut",
    tags: ["layers", "face-framing", "soft", "flattering"],
    hairType: "long"
  },
  {
    name: "Butterfly Cut",
    category: "Long",
    searchQuery: "butterfly haircut layers",
    tags: ["butterfly", "layers", "voluminous", "trendy"],
    hairType: "long"
  },
  {
    name: "Wolf Cut",
    category: "Medium",
    searchQuery: "wolf cut haircut",
    tags: ["wolf", "shaggy", "edgy", "70s"],
    hairType: "medium"
  },
  {
    name: "Shaggy Layers",
    category: "Medium",
    searchQuery: "shag haircut layers",
    tags: ["shag", "layers", "textured", "modern"],
    hairType: "medium"
  },
  {
    name: "Curtain Bangs",
    category: "Fringe",
    searchQuery: "curtain bangs hairstyle",
    tags: ["curtain", "bangs", "face-framing", "70s"],
    hairType: "medium"
  },
  {
    name: "Bottleneck Bangs",
    category: "Fringe",
    searchQuery: "bottleneck bangs haircut",
    tags: ["bottleneck", "bangs", "trendy", "versatile"],
    hairType: "medium"
  },
  {
    name: "Wispy Bangs",
    category: "Fringe",
    searchQuery: "wispy bangs hairstyle",
    tags: ["wispy", "bangs", "soft", "feminine"],
    hairType: "long"
  },

  // Updos & Special Occasions
  {
    name: "Messy Bun",
    category: "Updo",
    searchQuery: "messy bun hairstyle",
    tags: ["messy", "bun", "casual", "effortless"],
    hairType: "long"
  },
  {
    name: "Sleek Low Bun",
    category: "Updo",
    searchQuery: "sleek low bun updo",
    tags: ["sleek", "bun", "elegant", "formal"],
    hairType: "long"
  },
  {
    name: "French Twist",
    category: "Updo",
    searchQuery: "french twist updo",
    tags: ["french", "twist", "classic", "elegant"],
    hairType: "long"
  },
  {
    name: "Braided Updo",
    category: "Updo",
    searchQuery: "braided updo hairstyle",
    tags: ["braided", "updo", "romantic", "intricate"],
    hairType: "long"
  },
  {
    name: "Half-Up Half-Down",
    category: "Long",
    searchQuery: "half up half down hairstyle",
    tags: ["half-up", "versatile", "casual", "feminine"],
    hairType: "long"
  },

  // Beach & Waves
  {
    name: "Beach Waves",
    category: "Long",
    searchQuery: "beach waves hair",
    tags: ["beach", "waves", "effortless", "summer"],
    hairType: "long"
  },
  {
    name: "Loose Curls",
    category: "Long",
    searchQuery: "loose curls hair styled",
    tags: ["loose", "curls", "romantic", "soft"],
    hairType: "long"
  },
  {
    name: "Hollywood Waves",
    category: "Long",
    searchQuery: "hollywood waves vintage hair",
    tags: ["hollywood", "waves", "glamour", "vintage"],
    hairType: "long"
  },

  // Men's Styles
  {
    name: "Fade Haircut",
    category: "Short",
    searchQuery: "fade haircut men",
    tags: ["fade", "clean", "modern", "men"],
    hairType: "short"
  },
  {
    name: "Pompadour",
    category: "Short",
    searchQuery: "pompadour hairstyle men",
    tags: ["pompadour", "volume", "classic", "men"],
    hairType: "short"
  },
  {
    name: "Undercut Men",
    category: "Short",
    searchQuery: "undercut haircut men",
    tags: ["undercut", "sharp", "modern", "men"],
    hairType: "short"
  },
  {
    name: "Textured Crop",
    category: "Short",
    searchQuery: "textured crop haircut men",
    tags: ["crop", "textured", "modern", "men"],
    hairType: "short"
  },
  {
    name: "Slicked Back",
    category: "Short",
    searchQuery: "slicked back hair men",
    tags: ["slicked", "polished", "professional", "men"],
    hairType: "short"
  },

  // Sleek & Straight
  {
    name: "Glass Hair",
    category: "Long",
    searchQuery: "glass hair sleek shiny straight",
    tags: ["glass", "sleek", "shiny", "ultra-smooth"],
    hairType: "long"
  },
  {
    name: "Blunt Cut Long",
    category: "Long",
    searchQuery: "blunt cut long hair straight",
    tags: ["blunt", "long", "straight", "minimal"],
    hairType: "long"
  },
]

async function fetchUnsplashImage(query: string): Promise<string | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error("UNSPLASH_ACCESS_KEY not set")
    return null
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=portrait`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    )

    if (!response.ok) {
      console.error(`Unsplash API error: ${response.status}`)
      return null
    }

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      // Use the small size (400px width) for gallery thumbnails
      return data.results[0].urls.small
    }

    return null
  } catch (error) {
    console.error(`Error fetching ${query}:`, error)
    return null
  }
}

async function seedHairstyles() {
  console.log("🎨 Fetching REAL hairstyle images from Unsplash...")
  console.log(`📊 Processing ${hairstyleSearches.length} hairstyles`)

  const supabase = createClient(supabaseUrl, supabaseKey)

  // First, clear existing hairstyles for fresh start
  console.log("🗑️ Clearing existing hairstyles...")
  const { error: deleteError } = await supabase
    .from("hairstyles")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000") // Delete all

  if (deleteError) {
    console.error("Error clearing hairstyles:", deleteError)
  }

  let successCount = 0
  let failCount = 0

  for (const style of hairstyleSearches) {
    console.log(`🔍 Searching: "${style.searchQuery}" for ${style.name}...`)

    const imageUrl = await fetchUnsplashImage(style.searchQuery)

    if (!imageUrl) {
      console.log(`  ❌ No image found for ${style.name}`)
      failCount++
      continue
    }

    const { error } = await supabase.from("hairstyles").insert({
      name: style.name,
      category: style.category,
      tags: style.tags,
      image_url: imageUrl,
      hair_type: style.hairType,
    })

    if (error) {
      console.error(`  ❌ Failed to insert ${style.name}:`, error.message)
      failCount++
    } else {
      console.log(`  ✅ Added: ${style.name}`)
      successCount++
    }

    // Respect rate limits - 50 requests/hour
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.log("\n=================================")
  console.log(`✅ Successfully added: ${successCount} hairstyles`)
  console.log(`❌ Failed: ${failCount} hairstyles`)
  console.log("=================================")
}

// Run the seeder
seedHairstyles().catch(console.error)
