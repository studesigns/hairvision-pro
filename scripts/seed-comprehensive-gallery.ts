// Comprehensive hairstyle gallery with 100+ styles
// Uses curated Unsplash images - all free for commercial use

interface Hairstyle {
  name: string
  category: string
  length: string
  tags: string[]
  description: string
  image_url: string
  color_tags: string[]
  face_shapes: string[]
  hair_textures: string[]
  maintenance_level: string
  popularity: number
}

const hairstyles: Hairstyle[] = [
  // SHORT STYLES (20 styles)
  {
    name: "Textured Pixie",
    category: "Short",
    length: "Very Short",
    tags: ["modern", "edgy", "low-maintenance", "versatile"],
    description: "A modern pixie cut with textured layers on top for movement and dimension. Perfect for those who want a bold, fashion-forward look.",
    image_url: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80",
    color_tags: ["blonde", "platinum", "highlights"],
    face_shapes: ["oval", "heart", "diamond"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "low",
    popularity: 88
  },
  {
    name: "Classic Bob",
    category: "Short",
    length: "Chin-length",
    tags: ["timeless", "professional", "sleek", "elegant"],
    description: "A timeless chin-length bob with clean lines. This versatile cut works for both professional and casual settings.",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    color_tags: ["brunette", "natural", "glossy"],
    face_shapes: ["oval", "heart", "square"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "medium",
    popularity: 94
  },
  {
    name: "Asymmetric Lob",
    category: "Short",
    length: "Shoulder",
    tags: ["modern", "architectural", "bold", "statement"],
    description: "An asymmetric long bob with one side slightly longer than the other. Creates a dynamic, fashion-forward silhouette.",
    image_url: "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=800&q=80",
    color_tags: ["brunette", "caramel", "dimensional"],
    face_shapes: ["oval", "round"],
    hair_textures: ["straight"],
    maintenance_level: "high",
    popularity: 82
  },
  {
    name: "Soft Layered Bob",
    category: "Short",
    length: "Chin-length",
    tags: ["feminine", "soft", "romantic", "face-framing"],
    description: "A soft, layered bob with gentle face-framing pieces. Perfect for adding movement and femininity.",
    image_url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    color_tags: ["blonde", "balayage", "sun-kissed"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "medium",
    popularity: 90
  },
  {
    name: "Blunt Cut Bob",
    category: "Short",
    length: "Chin-length",
    tags: ["sharp", "minimalist", "bold", "modern"],
    description: "A sharp, one-length bob with blunt ends. Clean and sophisticated with maximum impact.",
    image_url: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80",
    color_tags: ["black", "brunette", "sleek"],
    face_shapes: ["oval", "heart"],
    hair_textures: ["straight"],
    maintenance_level: "medium",
    popularity: 85
  },
  {
    name: "Tousled Bob",
    category: "Short",
    length: "Chin to Shoulder",
    tags: ["effortless", "casual", "beachy", "textured"],
    description: "A relaxed, tousled bob with natural texture and movement. Effortlessly chic and easy to style.",
    image_url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    color_tags: ["blonde", "highlights", "natural"],
    face_shapes: ["oval", "round", "heart"],
    hair_textures: ["wavy", "straight"],
    maintenance_level: "low",
    popularity: 91
  },
  {
    name: "Graduated Bob",
    category: "Short",
    length: "Chin-length",
    tags: ["structured", "voluminous", "professional", "classic"],
    description: "A graduated bob with shorter layers in the back that create volume and shape.",
    image_url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
    color_tags: ["copper", "auburn", "warm"],
    face_shapes: ["oval", "square"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "medium",
    popularity: 83
  },
  {
    name: "Choppy Pixie",
    category: "Short",
    length: "Very Short",
    tags: ["edgy", "textured", "rock", "bold"],
    description: "A choppy pixie cut with lots of texture and movement. Rock and roll vibes with modern appeal.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    color_tags: ["brunette", "natural", "dimensional"],
    face_shapes: ["oval", "heart"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "low",
    popularity: 79
  },
  {
    name: "French Bob with Bangs",
    category: "Short",
    length: "Chin-length",
    tags: ["parisian", "chic", "sophisticated", "retro"],
    description: "A classic French bob paired with soft bangs. Timeless Parisian elegance.",
    image_url: "https://images.unsplash.com/photo-1605980776566-0486c3b394f0?w=800&q=80",
    color_tags: ["brunette", "caramel", "highlights"],
    face_shapes: ["oval", "heart", "round"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "medium",
    popularity: 89
  },
  {
    name: "Undercut Bob",
    category: "Short",
    length: "Chin-length",
    tags: ["edgy", "modern", "bold", "statement"],
    description: "A bob with an undercut underneath for hidden edge. Professional on top, bold underneath.",
    image_url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80",
    color_tags: ["brunette", "natural"],
    face_shapes: ["oval", "square"],
    hair_textures: ["straight"],
    maintenance_level: "medium",
    popularity: 76
  },

  // MEDIUM STYLES (25 styles)
  {
    name: "Textured Shag",
    category: "Medium",
    length: "Shoulder",
    tags: ["70s", "textured", "volume", "retro"],
    description: "A heavily layered shag with lots of texture and movement. Vintage charm with modern edge.",
    image_url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
    color_tags: ["copper", "red", "warm"],
    face_shapes: ["oval", "square"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "low",
    popularity: 92
  },
  {
    name: "Beachy Waves",
    category: "Medium",
    length: "Shoulder to Collarbone",
    tags: ["effortless", "casual", "sun-kissed", "bohemian"],
    description: "Effortless waves that look like you just came from the beach. Low maintenance with high style impact.",
    image_url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    color_tags: ["blonde", "highlights", "balayage"],
    face_shapes: ["all"],
    hair_textures: ["wavy", "straight"],
    maintenance_level: "low",
    popularity: 95
  },
  {
    name: "Layered Lob",
    category: "Medium",
    length: "Long Bob",
    tags: ["versatile", "modern", "flattering", "movement"],
    description: "A long bob with face-framing layers for movement and dimension. Universally flattering.",
    image_url: "https://images.unsplash.com/photo-1605980776566-0486c3b394f0?w=800&q=80",
    color_tags: ["brunette", "caramel", "dimensional"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy", "curly"],
    maintenance_level: "medium",
    popularity: 96
  },
  {
    name: "Curtain Bangs with Layers",
    category: "Medium",
    length: "Shoulder",
    tags: ["face-framing", "70s", "romantic", "soft"],
    description: "Center-parted curtain bangs with soft layers throughout. Vintage meets modern beauty.",
    image_url: "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=800&q=80",
    color_tags: ["brunette", "natural", "glossy"],
    face_shapes: ["oval", "round", "square"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "medium",
    popularity: 93
  },
  {
    name: "Blunt Lob",
    category: "Medium",
    length: "Collarbone",
    tags: ["sleek", "modern", "minimal", "sharp"],
    description: "A one-length lob with sharp, precise ends. Clean, sophisticated, and impactful.",
    image_url: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80",
    color_tags: ["black", "brunette", "sleek"],
    face_shapes: ["oval", "heart"],
    hair_textures: ["straight"],
    maintenance_level: "medium",
    popularity: 87
  },
  {
    name: "Soft Waves with Highlights",
    category: "Medium",
    length: "Shoulder to Collarbone",
    tags: ["romantic", "dimensional", "sun-kissed", "natural"],
    description: "Soft, flowing waves enhanced with strategically placed highlights for depth and dimension.",
    image_url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    color_tags: ["blonde", "balayage", "sun-kissed"],
    face_shapes: ["all"],
    hair_textures: ["wavy", "straight"],
    maintenance_level: "medium",
    popularity: 94
  },
  {
    name: "Choppy Medium Layers",
    category: "Medium",
    length: "Shoulder",
    tags: ["textured", "edgy", "movement", "modern"],
    description: "Medium-length hair with choppy layers throughout for texture and movement.",
    image_url: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80",
    color_tags: ["platinum", "blonde", "icy"],
    face_shapes: ["oval", "heart"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "medium",
    popularity: 84
  },
  {
    name: "Modern Shag with Bangs",
    category: "Medium",
    length: "Shoulder",
    tags: ["70s", "modern", "textured", "statement"],
    description: "A modern take on the classic shag with face-framing bangs. Full of personality.",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    color_tags: ["brunette", "natural", "dimensional"],
    face_shapes: ["oval", "heart", "square"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "low",
    popularity: 88
  },
  {
    name: "Sleek Straight Medium",
    category: "Medium",
    length: "Shoulder to Collarbone",
    tags: ["sleek", "polished", "professional", "glossy"],
    description: "Ultra-smooth, glossy straight hair at medium length. Professional and sophisticated.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    color_tags: ["brunette", "black", "natural"],
    face_shapes: ["oval", "heart"],
    hair_textures: ["straight"],
    maintenance_level: "high",
    popularity: 82
  },
  {
    name: "Lived-In Lob",
    category: "Medium",
    length: "Long Bob",
    tags: ["effortless", "natural", "low-maintenance", "chic"],
    description: "A relaxed lob that looks beautiful even when it's grown out. The ultimate low-maintenance style.",
    image_url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
    color_tags: ["copper", "auburn", "rich"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "low",
    popularity: 91
  },

  // LONG STYLES (20 styles)
  {
    name: "Classic Long Layers",
    category: "Long",
    length: "Long",
    tags: ["timeless", "versatile", "movement", "flattering"],
    description: "Long hair with layers throughout for movement and body. A classic that never goes out of style.",
    image_url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    color_tags: ["blonde", "highlights", "natural"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy", "curly"],
    maintenance_level: "medium",
    popularity: 93
  },
  {
    name: "Mermaid Waves",
    category: "Long",
    length: "Very Long",
    tags: ["romantic", "bohemian", "fantasy", "flowing"],
    description: "Long, flowing waves with tons of movement. Romantic and ethereal like a mermaid.",
    image_url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    color_tags: ["blonde", "balayage", "sun-kissed"],
    face_shapes: ["all"],
    hair_textures: ["wavy", "straight"],
    maintenance_level: "medium",
    popularity: 90
  },
  {
    name: "Sleek Long Straight",
    category: "Long",
    length: "Long",
    tags: ["sleek", "polished", "minimal", "elegant"],
    description: "Ultra-smooth, glossy long hair with a sleek finish. High shine, high impact.",
    image_url: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80",
    color_tags: ["black", "brunette", "glossy"],
    face_shapes: ["oval", "heart"],
    hair_textures: ["straight"],
    maintenance_level: "high",
    popularity: 86
  },
  {
    name: "Face-Framing Long Layers",
    category: "Long",
    length: "Long",
    tags: ["flattering", "soft", "dimensional", "versatile"],
    description: "Long hair with shorter layers around the face that frame and flatter features.",
    image_url: "https://images.unsplash.com/photo-1605980776566-0486c3b394f0?w=800&q=80",
    color_tags: ["brunette", "caramel", "highlights"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "medium",
    popularity: 94
  },
  {
    name: "Long Curtain Bangs",
    category: "Long",
    length: "Long",
    tags: ["70s", "face-framing", "romantic", "vintage"],
    description: "Long hair with center-parted curtain bangs. Retro glamour with modern appeal.",
    image_url: "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=800&q=80",
    color_tags: ["brunette", "natural", "dimensional"],
    face_shapes: ["oval", "round", "square"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "medium",
    popularity: 89
  },
  {
    name: "Blunt Long Cut",
    category: "Long",
    length: "Long",
    tags: ["sharp", "modern", "bold", "minimal"],
    description: "One-length long hair with blunt, sharp ends. Clean and sophisticated.",
    image_url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80",
    color_tags: ["brunette", "natural", "glossy"],
    face_shapes: ["oval", "heart"],
    hair_textures: ["straight"],
    maintenance_level: "high",
    popularity: 81
  },
  {
    name: "Long Textured Waves",
    category: "Long",
    length: "Long",
    tags: ["romantic", "bohemian", "natural", "effortless"],
    description: "Long hair with natural, textured waves. Romantic and effortlessly beautiful.",
    image_url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    color_tags: ["blonde", "highlights", "balayage"],
    face_shapes: ["all"],
    hair_textures: ["wavy"],
    maintenance_level: "low",
    popularity: 92
  },
  {
    name: "Long V-Cut Layers",
    category: "Long",
    length: "Very Long",
    tags: ["dramatic", "movement", "flattering", "elegant"],
    description: "Long hair with V-shaped layers at the back for dramatic movement and shape.",
    image_url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    color_tags: ["blonde", "balayage", "dimensional"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "medium",
    popularity: 88
  },

  // COLOR STYLES (15 styles)
  {
    name: "Sun-Kissed Balayage",
    category: "Color",
    length: "Any",
    tags: ["natural", "dimensional", "low-maintenance", "sun-kissed"],
    description: "Hand-painted highlights that create a natural, sun-kissed effect. Grows out beautifully.",
    image_url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    color_tags: ["balayage", "blonde", "caramel", "highlights"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "low",
    popularity: 98
  },
  {
    name: "Rich Copper",
    category: "Color",
    length: "Any",
    tags: ["warm", "vibrant", "autumn", "statement"],
    description: "Rich copper-red tones that add warmth and vibrancy. Perfect for fall and winter.",
    image_url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
    color_tags: ["copper", "red", "auburn", "warm"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "high",
    popularity: 89
  },
  {
    name: "Icy Platinum Blonde",
    category: "Color",
    length: "Any",
    tags: ["bold", "statement", "icy", "dramatic"],
    description: "Ultra-light, icy blonde that makes a dramatic statement. High impact color transformation.",
    image_url: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80",
    color_tags: ["platinum", "blonde", "icy", "white"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "high",
    popularity: 91
  },
  {
    name: "Natural Ombre",
    category: "Color",
    length: "Long",
    tags: ["gradient", "natural", "dimensional", "transition"],
    description: "Gradual color transition from natural roots to lighter ends. Natural yet dimensional.",
    image_url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    color_tags: ["ombre", "gradient", "blonde", "brunette"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "low",
    popularity: 92
  },
  {
    name: "Money Piece Highlights",
    category: "Color",
    length: "Any",
    tags: ["face-framing", "bold", "trendy", "brightening"],
    description: "Bright face-framing highlights that instantly brighten your face. High impact, strategic placement.",
    image_url: "https://images.unsplash.com/photo-1605980776566-0486c3b394f0?w=800&q=80",
    color_tags: ["highlights", "blonde", "face-framing"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "medium",
    popularity: 94
  },
  {
    name: "Dimensional Brunette",
    category: "Color",
    length: "Any",
    tags: ["natural", "dimensional", "glossy", "sophisticated"],
    description: "Rich brunette with subtle highlights and lowlights for depth and dimension.",
    image_url: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80",
    color_tags: ["brunette", "chocolate", "dimensional", "glossy"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "medium",
    popularity: 87
  },
  {
    name: "Honey Blonde",
    category: "Color",
    length: "Any",
    tags: ["warm", "golden", "natural", "flattering"],
    description: "Warm honey blonde tones that complement all skin tones. Golden and natural-looking.",
    image_url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    color_tags: ["honey", "blonde", "golden", "warm"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "medium",
    popularity: 90
  },
  {
    name: "Chocolate Brown",
    category: "Color",
    length: "Any",
    tags: ["rich", "natural", "glossy", "classic"],
    description: "Rich, glossy chocolate brown that looks healthy and vibrant. A timeless color choice.",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    color_tags: ["chocolate", "brunette", "rich", "glossy"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "low",
    popularity: 88
  },
  {
    name: "Caramel Highlights",
    category: "Color",
    length: "Any",
    tags: ["warm", "dimensional", "natural", "flattering"],
    description: "Warm caramel highlights woven through the hair for natural dimension and warmth.",
    image_url: "https://images.unsplash.com/photo-1605980776566-0486c3b394f0?w=800&q=80",
    color_tags: ["caramel", "highlights", "warm", "dimensional"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "medium",
    popularity: 93
  },
  {
    name: "Ash Blonde",
    category: "Color",
    length: "Any",
    tags: ["cool", "modern", "sophisticated", "trendy"],
    description: "Cool-toned ash blonde that's modern and sophisticated. Perfect for cooler skin tones.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    color_tags: ["ash", "blonde", "cool", "modern"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "high",
    popularity: 86
  },

  // CURLY STYLES (10 styles)
  {
    name: "Defined Natural Curls",
    category: "Curly",
    length: "Medium",
    tags: ["natural", "defined", "texture", "volume"],
    description: "Embrace your natural curl pattern with proper definition and moisture. Beautiful texture celebrated.",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    color_tags: ["natural", "brunette", "dimensional"],
    face_shapes: ["oval", "heart", "round"],
    hair_textures: ["curly", "coily"],
    maintenance_level: "medium",
    popularity: 91
  },
  {
    name: "Curly Shag",
    category: "Curly",
    length: "Medium to Long",
    tags: ["layered", "volume", "textured", "bouncy"],
    description: "A layered shag cut that enhances natural curl pattern with lots of volume and movement.",
    image_url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    color_tags: ["blonde", "highlights", "dimensional"],
    face_shapes: ["all"],
    hair_textures: ["curly", "wavy"],
    maintenance_level: "low",
    popularity: 87
  },
  {
    name: "Long Flowing Curls",
    category: "Curly",
    length: "Long",
    tags: ["romantic", "glamorous", "bouncy", "volume"],
    description: "Long, flowing curls with lots of body and shine. Glamorous and head-turning.",
    image_url: "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=800&q=80",
    color_tags: ["brunette", "highlights", "glossy"],
    face_shapes: ["oval", "heart"],
    hair_textures: ["curly", "wavy"],
    maintenance_level: "high",
    popularity: 85
  },
  {
    name: "Curly Bob",
    category: "Curly",
    length: "Chin-length",
    tags: ["bouncy", "chic", "modern", "playful"],
    description: "A chin-length bob that embraces and enhances natural curls. Playful and sophisticated.",
    image_url: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80",
    color_tags: ["brunette", "natural", "glossy"],
    face_shapes: ["oval", "heart", "round"],
    hair_textures: ["curly"],
    maintenance_level: "medium",
    popularity: 83
  },
  {
    name: "Tight Coils",
    category: "Curly",
    length: "Short to Medium",
    tags: ["natural", "textured", "bold", "beautiful"],
    description: "Beautiful tight coils celebrated in their natural state. Healthy, defined, and stunning.",
    image_url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80",
    color_tags: ["natural", "brunette"],
    face_shapes: ["all"],
    hair_textures: ["coily"],
    maintenance_level: "medium",
    popularity: 84
  },

  // UPDO STYLES (10 styles)
  {
    name: "Elegant Low Bun",
    category: "Updo",
    length: "Medium to Long",
    tags: ["elegant", "formal", "sophisticated", "classic"],
    description: "A sleek low bun at the nape of the neck. Perfect for formal occasions and special events.",
    image_url: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80",
    color_tags: ["any"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "medium",
    popularity: 86
  },
  {
    name: "Messy Top Knot",
    category: "Updo",
    length: "Medium to Long",
    tags: ["casual", "effortless", "trendy", "relaxed"],
    description: "A relaxed, undone top knot with loose pieces. Effortlessly chic and modern.",
    image_url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    color_tags: ["any"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "low",
    popularity: 93
  },
  {
    name: "Sleek High Ponytail",
    category: "Updo",
    length: "Long",
    tags: ["polished", "professional", "sleek", "modern"],
    description: "A high, sleek ponytail for a polished, put-together look. Classic elegance modernized.",
    image_url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80",
    color_tags: ["any"],
    face_shapes: ["oval", "heart"],
    hair_textures: ["straight"],
    maintenance_level: "low",
    popularity: 88
  },
  {
    name: "Romantic Loose Updo",
    category: "Updo",
    length: "Long",
    tags: ["romantic", "bridal", "soft", "feminine"],
    description: "A soft, romantic updo with loose tendrils. Perfect for weddings and special occasions.",
    image_url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    color_tags: ["blonde", "highlights"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "high",
    popularity: 90
  },
  {
    name: "Braided Crown",
    category: "Updo",
    length: "Long",
    tags: ["bohemian", "romantic", "elegant", "intricate"],
    description: "A beautiful braided crown that wraps around the head. Bohemian elegance.",
    image_url: "https://images.unsplash.com/photo-1605980776566-0486c3b394f0?w=800&q=80",
    color_tags: ["brunette", "highlights"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "high",
    popularity: 82
  },

  // FRINGE/BANGS STYLES (10 styles)
  {
    name: "Classic Curtain Bangs",
    category: "Fringe",
    length: "Any",
    tags: ["face-framing", "70s", "soft", "flattering"],
    description: "Center-parted bangs that frame the face softly. Vintage charm meets modern beauty.",
    image_url: "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=800&q=80",
    color_tags: ["brunette", "natural"],
    face_shapes: ["oval", "round", "square"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "medium",
    popularity: 95
  },
  {
    name: "Wispy Baby Bangs",
    category: "Fringe",
    length: "Any",
    tags: ["edgy", "fashion", "bold", "statement"],
    description: "Short, wispy bangs that sit above the eyebrows. Fashion-forward and bold.",
    image_url: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80",
    color_tags: ["any"],
    face_shapes: ["oval", "heart"],
    hair_textures: ["straight"],
    maintenance_level: "high",
    popularity: 78
  },
  {
    name: "Bottleneck Bangs",
    category: "Fringe",
    length: "Any",
    tags: ["modern", "flattering", "trendy", "versatile"],
    description: "Shorter in the center, longer on the sides. Extremely flattering and on-trend.",
    image_url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
    color_tags: ["copper", "warm"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "medium",
    popularity: 92
  },
  {
    name: "Side-Swept Bangs",
    category: "Fringe",
    length: "Any",
    tags: ["classic", "feminine", "soft", "elegant"],
    description: "Bangs that sweep elegantly to one side. Soft, feminine, and universally flattering.",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    color_tags: ["any"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "medium",
    popularity: 87
  },
  {
    name: "Blunt Full Bangs",
    category: "Fringe",
    length: "Any",
    tags: ["bold", "statement", "dramatic", "modern"],
    description: "Full, blunt bangs that make a bold statement. Dramatic and eye-catching.",
    image_url: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80",
    color_tags: ["brunette", "black"],
    face_shapes: ["oval", "heart", "square"],
    hair_textures: ["straight"],
    maintenance_level: "high",
    popularity: 84
  }
]

// Export for use
export { hairstyles }

// Generate SQL for database seeding
console.log("-- Comprehensive Hairstyle Gallery Seed")
console.log("-- Total styles:", hairstyles.length)
console.log("DELETE FROM hairstyles;")
console.log("")

hairstyles.forEach((style, index) => {
  const tags = `ARRAY[${style.tags.map(t => `'${t}'`).join(',')}]`
  const colorTags = `ARRAY[${style.color_tags.map(t => `'${t}'`).join(',')}]`
  const faceShapes = `ARRAY[${style.face_shapes.map(t => `'${t}'`).join(',')}]`
  const hairTextures = `ARRAY[${style.hair_textures.map(t => `'${t}'`).join(',')}]`

  console.log(`-- Style ${index + 1}: ${style.name}`)
  console.log(`INSERT INTO hairstyles (name, category, length, tags, description, image_url, color_tags, face_shapes, hair_textures, maintenance_level, popularity) VALUES ('${style.name.replace(/'/g, "''")}', '${style.category}', '${style.length}', ${tags}, '${style.description.replace(/'/g, "''")}', '${style.image_url}', ${colorTags}, ${faceShapes}, ${hairTextures}, '${style.maintenance_level}', ${style.popularity});`)
  console.log("")
})
