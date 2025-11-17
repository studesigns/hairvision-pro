#!/bin/bash

# Supabase connection details
URL="https://didjsykzhoitoklbfygc.supabase.co/rest/v1/hairstyles"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpZGpzeWt6aG9pdG9rbGJmeWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMjM5MTIsImV4cCI6MjA3ODg5OTkxMn0.df6XHScUdGOdnHAduCflzhZvIevWtR-UOeDwVvn2rxc"

# Function to insert a hairstyle
insert_style() {
  curl -s -X POST "$URL" \
    -H "apikey: $ANON_KEY" \
    -H "Authorization: Bearer $ANON_KEY" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=minimal" \
    -d "$1"
}

echo "Adding Short Styles..."

insert_style '{
  "name": "Classic Pixie Cut",
  "category": "Short",
  "length": "Very Short",
  "tags": ["bold", "low-maintenance", "edgy", "statement"],
  "description": "Short, cropped style that highlights facial features. Bold and confident look that is easy to style.",
  "image_url": "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80",
  "color_tags": ["platinum", "blonde", "fashion"],
  "face_shapes": ["oval", "heart"],
  "hair_textures": ["straight", "wavy"],
  "maintenance_level": "low",
  "popularity": 85
}'

insert_style '{
  "name": "Textured French Bob",
  "category": "Short",
  "length": "Chin-length",
  "tags": ["chic", "parisian", "sophisticated", "effortless"],
  "description": "Slightly longer than a classic bob with subtle texture and movement. Very French and understated.",
  "image_url": "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=800&q=80",
  "color_tags": ["brunette", "natural"],
  "face_shapes": ["oval", "round", "heart"],
  "hair_textures": ["straight", "wavy"],
  "maintenance_level": "medium",
  "popularity": 88
}'

insert_style '{
  "name": "Asymmetric Bob",
  "category": "Short",
  "length": "Chin to Shoulder",
  "tags": ["modern", "edgy", "architectural", "bold"],
  "description": "One side longer than the other for a dramatic, fashion-forward look.",
  "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  "color_tags": ["brunette", "highlights"],
  "face_shapes": ["oval", "square"],
  "hair_textures": ["straight"],
  "maintenance_level": "high",
  "popularity": 79
}'

insert_style '{
  "name": "Soft Layered Crop",
  "category": "Short",
  "length": "Short",
  "tags": ["feminine", "soft", "layers", "volume"],
  "description": "Short layers with soft, feminine movement. Perfect for fine hair needing volume.",
  "image_url": "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
  "color_tags": ["blonde", "highlights"],
  "face_shapes": ["oval", "heart", "round"],
  "hair_textures": ["straight", "wavy"],
  "maintenance_level": "medium",
  "popularity": 82
}'

echo "Adding Medium Styles..."

insert_style '{
  "name": "Textured Shag",
  "category": "Medium",
  "length": "Shoulder",
  "tags": ["70s", "textured", "rock", "volume"],
  "description": "Heavily layered with lots of texture and movement. Rock and roll vibes with modern appeal.",
  "image_url": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
  "color_tags": ["copper", "red", "warm"],
  "face_shapes": ["oval", "square"],
  "hair_textures": ["straight", "wavy"],
  "maintenance_level": "low",
  "popularity": 91
}'

insert_style '{
  "name": "Lived-In Layers",
  "category": "Medium",
  "length": "Mid-length",
  "tags": ["natural", "effortless", "movement", "versatile"],
  "description": "Soft, face-framing layers that look beautiful grown out. Low maintenance elegance.",
  "image_url": "https://images.unsplash.com/photo-1605980776566-0486c3b394f0?w=800&q=80",
  "color_tags": ["brunette", "caramel", "balayage"],
  "face_shapes": ["all"],
  "hair_textures": ["straight", "wavy", "curly"],
  "maintenance_level": "low",
  "popularity": 94
}'

insert_style '{
  "name": "Blunt Lob",
  "category": "Medium",
  "length": "Long Bob",
  "tags": ["sleek", "modern", "bold", "minimalist"],
  "description": "One-length long bob with sharp, precise ends. Clean and sophisticated.",
  "image_url": "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80",
  "color_tags": ["brunette", "black", "natural"],
  "face_shapes": ["oval", "heart"],
  "hair_textures": ["straight"],
  "maintenance_level": "medium",
  "popularity": 86
}'

insert_style '{
  "name": "Soft Waves with Curtain Bangs",
  "category": "Medium",
  "length": "Shoulder to Collarbone",
  "tags": ["romantic", "soft", "vintage", "face-framing"],
  "description": "Gentle waves paired with face-framing curtain bangs. Feminine and flattering.",
  "image_url": "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
  "color_tags": ["blonde", "highlights", "sun-kissed"],
  "face_shapes": ["oval", "round", "square"],
  "hair_textures": ["wavy", "straight"],
  "maintenance_level": "medium",
  "popularity": 93
}'

echo "Adding Long Styles..."

insert_style '{
  "name": "Classic Long Layers",
  "category": "Long",
  "length": "Long",
  "tags": ["classic", "versatile", "movement", "timeless"],
  "description": "Long layers throughout for movement and body. Works with any texture.",
  "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "color_tags": ["brunette", "natural"],
  "face_shapes": ["all"],
  "hair_textures": ["straight", "wavy", "curly"],
  "maintenance_level": "medium",
  "popularity": 90
}'

insert_style '{
  "name": "Sleek Straight Hair",
  "category": "Long",
  "length": "Long",
  "tags": ["sleek", "polished", "glossy", "minimal"],
  "description": "Ultra-smooth, glossy straight hair. High shine, high impact.",
  "image_url": "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80",
  "color_tags": ["black", "brunette", "natural"],
  "face_shapes": ["oval", "heart"],
  "hair_textures": ["straight"],
  "maintenance_level": "high",
  "popularity": 84
}'

insert_style '{
  "name": "Mermaid Waves",
  "category": "Long",
  "length": "Very Long",
  "tags": ["romantic", "bohemian", "beachy", "fantasy"],
  "description": "Loose, flowing waves with tons of movement. Effortlessly romantic.",
  "image_url": "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
  "color_tags": ["blonde", "highlights", "balayage"],
  "face_shapes": ["all"],
  "hair_textures": ["wavy", "straight"],
  "maintenance_level": "low",
  "popularity": 89
}'

insert_style '{
  "name": "Face-Framing Long Layers",
  "category": "Long",
  "length": "Long",
  "tags": ["face-framing", "flattering", "soft", "dimensional"],
  "description": "Shorter layers around the face that frame and flatter features.",
  "image_url": "https://images.unsplash.com/photo-1605980776566-0486c3b394f0?w=800&q=80",
  "color_tags": ["brunette", "caramel", "highlights"],
  "face_shapes": ["all"],
  "hair_textures": ["straight", "wavy"],
  "maintenance_level": "medium",
  "popularity": 92
}'

echo "Adding Color Styles..."

insert_style '{
  "name": "Sun-Kissed Balayage",
  "category": "Color",
  "length": "Any",
  "tags": ["natural", "dimensional", "low-maintenance", "sun-kissed"],
  "description": "Hand-painted highlights for a natural, sun-kissed effect that grows out beautifully.",
  "image_url": "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
  "color_tags": ["balayage", "blonde", "caramel", "highlights"],
  "face_shapes": ["all"],
  "hair_textures": ["all"],
  "maintenance_level": "low",
  "popularity": 97
}'

insert_style '{
  "name": "Rich Copper Auburn",
  "category": "Color",
  "length": "Any",
  "tags": ["vibrant", "warm", "autumn", "statement"],
  "description": "Rich copper-red tones that add warmth and vibrancy. Perfect for fall.",
  "image_url": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
  "color_tags": ["copper", "red", "auburn", "warm"],
  "face_shapes": ["all"],
  "hair_textures": ["all"],
  "maintenance_level": "high",
  "popularity": 87
}'

insert_style '{
  "name": "Icy Platinum Blonde",
  "category": "Color",
  "length": "Any",
  "tags": ["bold", "high-maintenance", "statement", "icy"],
  "description": "Ultra-light, icy blonde that makes a dramatic statement. High impact color.",
  "image_url": "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80",
  "color_tags": ["platinum", "blonde", "icy", "white"],
  "face_shapes": ["all"],
  "hair_textures": ["all"],
  "maintenance_level": "high",
  "popularity": 88
}'

insert_style '{
  "name": "Soft Ombre Gradient",
  "category": "Color",
  "length": "Long",
  "tags": ["gradient", "trendy", "dimensional", "transition"],
  "description": "Gradual color transition from dark roots to lighter ends. Dramatic yet natural.",
  "image_url": "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
  "color_tags": ["ombre", "gradient", "blonde", "brunette"],
  "face_shapes": ["all"],
  "hair_textures": ["straight", "wavy"],
  "maintenance_level": "low",
  "popularity": 91
}'

insert_style '{
  "name": "Money Piece Highlights",
  "category": "Color",
  "length": "Any",
  "tags": ["face-framing", "bold", "trendy", "highlights"],
  "description": "Bright face-framing highlights that make a statement. Instant face brightener.",
  "image_url": "https://images.unsplash.com/photo-1605980776566-0486c3b394f0?w=800&q=80",
  "color_tags": ["highlights", "blonde", "face-framing"],
  "face_shapes": ["all"],
  "hair_textures": ["all"],
  "maintenance_level": "medium",
  "popularity": 90
}'

insert_style '{
  "name": "Dimensional Brunette",
  "category": "Color",
  "length": "Any",
  "tags": ["natural", "dimensional", "glossy", "sophisticated"],
  "description": "Rich brunette with subtle highlights and lowlights for depth and dimension.",
  "image_url": "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80",
  "color_tags": ["brunette", "chocolate", "dimensional"],
  "face_shapes": ["all"],
  "hair_textures": ["all"],
  "maintenance_level": "medium",
  "popularity": 86
}'

echo "Adding Curly Styles..."

insert_style '{
  "name": "Defined Natural Curls",
  "category": "Curly",
  "length": "Medium",
  "tags": ["natural", "volume", "texture", "defined"],
  "description": "Embrace natural curl pattern with proper definition and moisture. Beautiful texture.",
  "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  "color_tags": ["natural", "brunette"],
  "face_shapes": ["oval", "heart", "round"],
  "hair_textures": ["curly", "coily"],
  "maintenance_level": "medium",
  "popularity": 89
}'

insert_style '{
  "name": "Curly Shag",
  "category": "Curly",
  "length": "Medium to Long",
  "tags": ["volume", "layers", "textured", "bouncy"],
  "description": "Layered shag cut that enhances natural curl pattern with lots of volume.",
  "image_url": "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
  "color_tags": ["natural", "highlights"],
  "face_shapes": ["all"],
  "hair_textures": ["curly", "wavy"],
  "maintenance_level": "low",
  "popularity": 85
}'

insert_style '{
  "name": "Big Bouncy Curls",
  "category": "Curly",
  "length": "Long",
  "tags": ["glamorous", "volume", "bouncy", "statement"],
  "description": "Large, voluminous curls with lots of body and shine. Glamorous and bold.",
  "image_url": "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=800&q=80",
  "color_tags": ["brunette", "highlights"],
  "face_shapes": ["oval", "heart"],
  "hair_textures": ["curly", "wavy"],
  "maintenance_level": "high",
  "popularity": 83
}'

echo "Adding Updo Styles..."

insert_style '{
  "name": "Elegant Low Bun",
  "category": "Updo",
  "length": "Medium to Long",
  "tags": ["elegant", "sophisticated", "formal", "polished"],
  "description": "Sleek low bun at the nape of the neck. Perfect for formal occasions.",
  "image_url": "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80",
  "color_tags": ["any"],
  "face_shapes": ["all"],
  "hair_textures": ["all"],
  "maintenance_level": "medium",
  "popularity": 84
}'

insert_style '{
  "name": "Messy Top Knot",
  "category": "Updo",
  "length": "Medium to Long",
  "tags": ["casual", "effortless", "trendy", "relaxed"],
  "description": "Relaxed, undone top knot with loose pieces. Effortlessly chic and modern.",
  "image_url": "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
  "color_tags": ["any"],
  "face_shapes": ["all"],
  "hair_textures": ["all"],
  "maintenance_level": "low",
  "popularity": 92
}'

insert_style '{
  "name": "Sleek High Ponytail",
  "category": "Updo",
  "length": "Long",
  "tags": ["polished", "professional", "elegant", "simple"],
  "description": "High, sleek ponytail for a polished, put-together look. Classic elegance.",
  "image_url": "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80",
  "color_tags": ["any"],
  "face_shapes": ["oval", "heart"],
  "hair_textures": ["straight"],
  "maintenance_level": "low",
  "popularity": 87
}'

insert_style '{
  "name": "Romantic Loose Updo",
  "category": "Updo",
  "length": "Long",
  "tags": ["romantic", "soft", "bridal", "feminine"],
  "description": "Soft, romantic updo with loose tendrils. Perfect for weddings and special events.",
  "image_url": "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
  "color_tags": ["blonde", "highlights"],
  "face_shapes": ["all"],
  "hair_textures": ["straight", "wavy"],
  "maintenance_level": "high",
  "popularity": 88
}'

echo "Adding Fringe Styles..."

insert_style '{
  "name": "Classic Curtain Bangs",
  "category": "Fringe",
  "length": "Any",
  "tags": ["face-framing", "soft", "retro", "70s"],
  "description": "Center-parted bangs that frame the face softly. Vintage charm meets modern style.",
  "image_url": "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=800&q=80",
  "color_tags": ["brunette", "natural"],
  "face_shapes": ["oval", "round", "square"],
  "hair_textures": ["straight", "wavy"],
  "maintenance_level": "medium",
  "popularity": 93
}'

insert_style '{
  "name": "Wispy Baby Bangs",
  "category": "Fringe",
  "length": "Any",
  "tags": ["edgy", "fashion", "statement", "bold"],
  "description": "Short, choppy bangs that sit above the eyebrows. Fashion-forward and bold.",
  "image_url": "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80",
  "color_tags": ["any"],
  "face_shapes": ["oval", "heart"],
  "hair_textures": ["straight"],
  "maintenance_level": "high",
  "popularity": 76
}'

insert_style '{
  "name": "Bottleneck Bangs",
  "category": "Fringe",
  "length": "Any",
  "tags": ["modern", "flattering", "versatile", "trendy"],
  "description": "Shorter in the center, longer on the sides. Extremely flattering and on-trend.",
  "image_url": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
  "color_tags": ["any"],
  "face_shapes": ["all"],
  "hair_textures": ["straight", "wavy"],
  "maintenance_level": "medium",
  "popularity": 91
}'

insert_style '{
  "name": "Side-Swept Bangs",
  "category": "Fringe",
  "length": "Any",
  "tags": ["classic", "feminine", "soft", "versatile"],
  "description": "Bangs that sweep to one side for a soft, feminine look. Very flattering.",
  "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  "color_tags": ["any"],
  "face_shapes": ["all"],
  "hair_textures": ["straight", "wavy"],
  "maintenance_level": "medium",
  "popularity": 86
}'

echo "Done! Added 30 hairstyles to the database."
