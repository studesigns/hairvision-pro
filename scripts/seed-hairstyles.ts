// Seed script for hairstyles with real Unsplash images
// Run with: npx tsx scripts/seed-hairstyles.ts

const hairstyles = [
  {
    name: "Classic Bob",
    category: "Short",
    length: "Chin-length",
    tags: ["professional", "easy-maintenance", "classic", "sleek"],
    description: "Timeless chin-length bob with clean lines and subtle layers. Perfect for professional settings.",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    color_tags: ["brunette", "natural"],
    face_shapes: ["oval", "heart", "square"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "low",
    popularity: 95
  },
  {
    name: "Beach Waves",
    category: "Medium",
    length: "Shoulder-length",
    tags: ["casual", "texture", "trendy", "effortless"],
    description: "Effortless waves that give a relaxed, sun-kissed appearance. Low maintenance with high style impact.",
    image_url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    color_tags: ["blonde", "highlights", "balayage"],
    face_shapes: ["oval", "round", "heart"],
    hair_textures: ["wavy", "straight"],
    maintenance_level: "low",
    popularity: 88
  },
  {
    name: "Layered Lob",
    category: "Medium",
    length: "Long bob",
    tags: ["versatile", "volume", "modern", "face-framing"],
    description: "Long bob with face-framing layers for movement and dimension. Universally flattering.",
    image_url: "https://images.unsplash.com/photo-1605980776566-0486c3b394f0?w=800&q=80",
    color_tags: ["brunette", "caramel", "highlights"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy", "curly"],
    maintenance_level: "medium",
    popularity: 92
  },
  {
    name: "Pixie Cut",
    category: "Short",
    length: "Very short",
    tags: ["bold", "low-maintenance", "edgy", "statement"],
    description: "Short, cropped style that highlights facial features. Bold and confident.",
    image_url: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80",
    color_tags: ["platinum", "blonde", "fashion"],
    face_shapes: ["oval", "heart"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "high",
    popularity: 78
  },
  {
    name: "Balayage Highlights",
    category: "Color",
    length: "Any",
    tags: ["natural", "dimensional", "low-maintenance", "sun-kissed"],
    description: "Hand-painted highlights for a natural, sun-kissed effect. Grows out beautifully.",
    image_url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    color_tags: ["balayage", "blonde", "caramel", "highlights"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "low",
    popularity: 96
  },
  {
    name: "Curtain Bangs",
    category: "Fringe",
    length: "Any",
    tags: ["face-framing", "soft", "retro", "70s"],
    description: "Center-parted bangs that frame the face softly. Vintage charm meets modern style.",
    image_url: "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=800&q=80",
    color_tags: ["brunette", "natural"],
    face_shapes: ["oval", "round", "square"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "medium",
    popularity: 89
  },
  {
    name: "Copper Red",
    category: "Color",
    length: "Any",
    tags: ["vibrant", "warm", "autumn", "statement"],
    description: "Rich copper-red tones that add warmth and vibrancy. Perfect for fall.",
    image_url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
    color_tags: ["copper", "red", "auburn", "warm"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "high",
    popularity: 85
  },
  {
    name: "Blunt Cut",
    category: "Long",
    length: "Long",
    tags: ["sleek", "modern", "bold", "minimalist"],
    description: "One-length cut with sharp, precise ends. Clean and sophisticated.",
    image_url: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80",
    color_tags: ["brunette", "black", "natural"],
    face_shapes: ["oval", "heart"],
    hair_textures: ["straight"],
    maintenance_level: "medium",
    popularity: 82
  },
  {
    name: "Platinum Blonde",
    category: "Color",
    length: "Any",
    tags: ["bold", "high-maintenance", "statement", "icy"],
    description: "Ultra-light, icy blonde that makes a dramatic statement. High impact color.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    color_tags: ["platinum", "blonde", "icy", "white"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "high",
    popularity: 90
  },
  {
    name: "Natural Curls",
    category: "Curly",
    length: "Medium",
    tags: ["natural", "volume", "texture", "defined"],
    description: "Embrace natural curl pattern with proper definition and moisture. Beautiful texture.",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    color_tags: ["natural", "brunette"],
    face_shapes: ["oval", "heart", "round"],
    hair_textures: ["curly", "coily"],
    maintenance_level: "medium",
    popularity: 87
  },
  {
    name: "Shaggy Layers",
    category: "Medium",
    length: "Various",
    tags: ["textured", "edgy", "volume", "70s"],
    description: "Heavily layered style with lots of texture and movement. Rock and roll vibes.",
    image_url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
    color_tags: ["natural", "highlights"],
    face_shapes: ["oval", "square"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "low",
    popularity: 85
  },
  {
    name: "Ombre Gradient",
    category: "Color",
    length: "Long",
    tags: ["gradient", "trendy", "dimensional", "transition"],
    description: "Gradual color transition from dark roots to lighter ends. Dramatic yet natural.",
    image_url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    color_tags: ["ombre", "gradient", "blonde", "brunette"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "low",
    popularity: 90
  },
  {
    name: "Textured Crop",
    category: "Short",
    length: "Short",
    tags: ["modern", "easy-style", "versatile", "masculine"],
    description: "Short cut with textured top and clean sides. Stylish and practical.",
    image_url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80",
    color_tags: ["natural", "brunette"],
    face_shapes: ["all"],
    hair_textures: ["straight", "wavy"],
    maintenance_level: "low",
    popularity: 76
  },
  {
    name: "Money Pieces",
    category: "Color",
    length: "Any",
    tags: ["face-framing", "bold", "trendy", "highlights"],
    description: "Bright face-framing highlights that make a statement. Instant face brightener.",
    image_url: "https://images.unsplash.com/photo-1605980776566-0486c3b394f0?w=800&q=80",
    color_tags: ["highlights", "blonde", "face-framing"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "medium",
    popularity: 87
  },
  {
    name: "Sleek Ponytail",
    category: "Updo",
    length: "Long",
    tags: ["polished", "professional", "elegant", "simple"],
    description: "High, sleek ponytail for a polished, put-together look. Classic elegance.",
    image_url: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80",
    color_tags: ["any"],
    face_shapes: ["oval", "heart"],
    hair_textures: ["straight"],
    maintenance_level: "low",
    popularity: 83
  },
  {
    name: "Messy Bun",
    category: "Updo",
    length: "Medium to Long",
    tags: ["casual", "effortless", "romantic", "bohemian"],
    description: "Relaxed, undone bun with loose pieces. Effortlessly chic.",
    image_url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    color_tags: ["any"],
    face_shapes: ["all"],
    hair_textures: ["all"],
    maintenance_level: "low",
    popularity: 91
  }
];

// Export for use in API
export { hairstyles };

// SQL insert statements
const insertStatements = hairstyles.map(style => {
  const tags = `ARRAY[${style.tags.map(t => `'${t}'`).join(',')}]`;
  const colorTags = `ARRAY[${style.color_tags.map(t => `'${t}'`).join(',')}]`;
  const faceShapes = `ARRAY[${style.face_shapes.map(t => `'${t}'`).join(',')}]`;
  const hairTextures = `ARRAY[${style.hair_textures.map(t => `'${t}'`).join(',')}]`;

  return `INSERT INTO hairstyles (name, category, length, tags, description, image_url, color_tags, face_shapes, hair_textures, maintenance_level, popularity) VALUES ('${style.name.replace(/'/g, "''")}', '${style.category}', '${style.length}', ${tags}, '${style.description.replace(/'/g, "''")}', '${style.image_url}', ${colorTags}, ${faceShapes}, ${hairTextures}, '${style.maintenance_level}', ${style.popularity});`;
});

console.log("-- Hairstyles seed data");
console.log("DELETE FROM hairstyles;");
insertStatements.forEach(stmt => console.log(stmt));
