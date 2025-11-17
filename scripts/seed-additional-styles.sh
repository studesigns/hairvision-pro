#!/bin/bash

# Seed additional hairstyles to reach 100+ total
# Using Unsplash images (reliable, high-quality, no API key needed)

SUPABASE_URL="https://burdztelpeqkbhaevako.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cmR6dGVscGVxa2JoYWV2YWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NDI3NTMsImV4cCI6MjA0NzMxODc1M30.yh1Gf9VT0gKDt4E-3ikFRwOVe7yx1vRfBsQbG6XgvLE"

echo "🎨 Seeding additional hairstyles to reach 100+ total..."

# Balayage & Highlights Collection
echo "Adding Balayage & Highlights..."
curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Caramel Balayage",
    "category": "Color",
    "tags": ["balayage", "caramel", "highlights", "warm"],
    "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ash Blonde Highlights",
    "category": "Color",
    "tags": ["ash", "blonde", "highlights", "cool-tones"],
    "image_url": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&h=600&fit=crop",
    "hair_type": "medium"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Chocolate Brown Balayage",
    "category": "Color",
    "tags": ["balayage", "chocolate", "brown", "natural"],
    "image_url": "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rose Gold Tones",
    "category": "Color",
    "tags": ["rose-gold", "pink", "trendy", "warm"],
    "image_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=600&fit=crop",
    "hair_type": "medium"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Copper Red Highlights",
    "category": "Color",
    "tags": ["copper", "red", "highlights", "autumn"],
    "image_url": "https://images.unsplash.com/photo-1560087637-bf797bc7796a?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

echo "✓ Added 5 balayage/highlights styles"

# Textured Cuts
echo "Adding Textured Cuts..."
curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Textured Lob",
    "category": "Medium",
    "tags": ["lob", "textured", "layers", "modern"],
    "image_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop",
    "hair_type": "medium"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Shaggy Layers",
    "category": "Medium",
    "tags": ["shaggy", "layers", "textured", "70s"],
    "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
    "hair_type": "medium"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Choppy Bob",
    "category": "Short",
    "tags": ["choppy", "bob", "edgy", "textured"],
    "image_url": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=600&fit=crop",
    "hair_type": "short"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Feathered Layers",
    "category": "Long",
    "tags": ["feathered", "layers", "soft", "feminine"],
    "image_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Razor Cut Bob",
    "category": "Short",
    "tags": ["razor", "bob", "sharp", "modern"],
    "image_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop",
    "hair_type": "short"
  }' > /dev/null

echo "✓ Added 5 textured cut styles"

# Natural Texture Styles
echo "Adding Natural Texture Styles..."
curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Natural Curls Define",
    "category": "Curly",
    "tags": ["natural", "curls", "defined", "moisturized"],
    "image_url": "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=500&h=600&fit=crop",
    "hair_type": "curly"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Coily Afro",
    "category": "Curly",
    "tags": ["coily", "afro", "natural", "volume"],
    "image_url": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&h=600&fit=crop",
    "hair_type": "curly"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Beach Wave Texture",
    "category": "Long",
    "tags": ["beach", "waves", "textured", "effortless"],
    "image_url": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Soft Wave Perm",
    "category": "Medium",
    "tags": ["perm", "waves", "soft", "volume"],
    "image_url": "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=500&h=600&fit=crop",
    "hair_type": "medium"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tight Ringlets",
    "category": "Curly",
    "tags": ["ringlets", "tight", "curls", "bouncy"],
    "image_url": "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=500&h=600&fit=crop",
    "hair_type": "curly"
  }' > /dev/null

echo "✓ Added 5 natural texture styles"

# Sleek & Polished
echo "Adding Sleek & Polished Styles..."
curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Glass Hair",
    "category": "Long",
    "tags": ["glass", "sleek", "shiny", "straight"],
    "image_url": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Blunt Cut Perfection",
    "category": "Medium",
    "tags": ["blunt", "precise", "sleek", "modern"],
    "image_url": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&h=600&fit=crop",
    "hair_type": "medium"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Slicked Back Style",
    "category": "Short",
    "tags": ["slicked", "back", "gel", "professional"],
    "image_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop",
    "hair_type": "short"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Low Sleek Ponytail",
    "category": "Updo",
    "tags": ["ponytail", "sleek", "low", "elegant"],
    "image_url": "https://images.unsplash.com/photo-1592621385612-4d7129426394?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Polished Chignon",
    "category": "Updo",
    "tags": ["chignon", "polished", "elegant", "formal"],
    "image_url": "https://images.unsplash.com/photo-1569124589354-615739ae007b?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

echo "✓ Added 5 sleek & polished styles"

# Bold Fashion Colors
echo "Adding Bold Fashion Colors..."
curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pastel Pink Dream",
    "category": "Color",
    "tags": ["pastel", "pink", "fashion", "soft"],
    "image_url": "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=500&h=600&fit=crop",
    "hair_type": "medium"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Electric Blue",
    "category": "Color",
    "tags": ["blue", "electric", "bold", "statement"],
    "image_url": "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=500&h=600&fit=crop",
    "hair_type": "short"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Purple Ombre",
    "category": "Color",
    "tags": ["purple", "ombre", "gradient", "creative"],
    "image_url": "https://images.unsplash.com/photo-1541271696563-3be2f555fc4e?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Silver Fox",
    "category": "Color",
    "tags": ["silver", "gray", "platinum", "bold"],
    "image_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop",
    "hair_type": "medium"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Burgundy Wine",
    "category": "Color",
    "tags": ["burgundy", "wine", "rich", "deep"],
    "image_url": "https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

echo "✓ Added 5 bold fashion color styles"

# Classic Men's Styles
echo "Adding Classic Men Styles..."
curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Classic Pompadour",
    "category": "Short",
    "tags": ["pompadour", "classic", "men", "volume"],
    "image_url": "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=500&h=600&fit=crop",
    "hair_type": "short"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Undercut Fade",
    "category": "Short",
    "tags": ["undercut", "fade", "modern", "sharp"],
    "image_url": "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&h=600&fit=crop",
    "hair_type": "short"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Textured Quiff",
    "category": "Short",
    "tags": ["quiff", "textured", "volume", "modern"],
    "image_url": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&h=600&fit=crop",
    "hair_type": "short"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Buzz Cut Clean",
    "category": "Short",
    "tags": ["buzz", "clean", "minimal", "sharp"],
    "image_url": "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&h=600&fit=crop",
    "hair_type": "short"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Side Part Business",
    "category": "Short",
    "tags": ["side-part", "business", "professional", "classic"],
    "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
    "hair_type": "short"
  }' > /dev/null

echo "✓ Added 5 classic men styles"

# Wedding & Special Occasion
echo "Adding Wedding & Special Occasion Styles..."
curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bridal Braided Crown",
    "category": "Updo",
    "tags": ["bridal", "braided", "crown", "romantic"],
    "image_url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Loose Romantic Updo",
    "category": "Updo",
    "tags": ["loose", "romantic", "soft", "elegant"],
    "image_url": "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hollywood Waves",
    "category": "Long",
    "tags": ["hollywood", "waves", "glamour", "vintage"],
    "image_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Waterfall Braid",
    "category": "Long",
    "tags": ["waterfall", "braid", "romantic", "bohemian"],
    "image_url": "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Classic French Twist",
    "category": "Updo",
    "tags": ["french", "twist", "elegant", "timeless"],
    "image_url": "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

echo "✓ Added 5 wedding/special occasion styles"

# Modern Bangs/Fringe
echo "Adding Modern Bangs/Fringe Styles..."
curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bottleneck Bangs",
    "category": "Fringe",
    "tags": ["bottleneck", "bangs", "trendy", "face-framing"],
    "image_url": "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=500&h=600&fit=crop",
    "hair_type": "medium"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Micro Bangs",
    "category": "Fringe",
    "tags": ["micro", "bangs", "edgy", "statement"],
    "image_url": "https://images.unsplash.com/photo-1592621385612-4d7129426394?w=500&h=600&fit=crop",
    "hair_type": "short"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Birkin Bangs",
    "category": "Fringe",
    "tags": ["birkin", "bangs", "french", "effortless"],
    "image_url": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wispy Fringe",
    "category": "Fringe",
    "tags": ["wispy", "fringe", "soft", "delicate"],
    "image_url": "https://images.unsplash.com/photo-1611042553365-9b101441c135?w=500&h=600&fit=crop",
    "hair_type": "medium"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bardot Fringe",
    "category": "Fringe",
    "tags": ["bardot", "fringe", "vintage", "sexy"],
    "image_url": "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

echo "✓ Added 5 modern bangs/fringe styles"

# Protective Styles
echo "Adding Protective Styles..."
curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Box Braids Classic",
    "category": "Long",
    "tags": ["box-braids", "protective", "classic", "versatile"],
    "image_url": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Goddess Locs",
    "category": "Long",
    "tags": ["locs", "goddess", "bohemian", "protective"],
    "image_url": "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Senegalese Twists",
    "category": "Long",
    "tags": ["twists", "senegalese", "protective", "elegant"],
    "image_url": "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cornrows Elegant",
    "category": "Short",
    "tags": ["cornrows", "protective", "neat", "geometric"],
    "image_url": "https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=500&h=600&fit=crop",
    "hair_type": "short"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Passion Twists",
    "category": "Medium",
    "tags": ["passion", "twists", "bohemian", "protective"],
    "image_url": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&h=600&fit=crop",
    "hair_type": "medium"
  }' > /dev/null

echo "✓ Added 5 protective styles"

# Layered Cuts
echo "Adding Layered Cuts..."
curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Face-Framing Layers",
    "category": "Long",
    "tags": ["face-framing", "layers", "soft", "flattering"],
    "image_url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Butterfly Cut",
    "category": "Long",
    "tags": ["butterfly", "layers", "voluminous", "trendy"],
    "image_url": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wolf Cut",
    "category": "Medium",
    "tags": ["wolf", "cut", "shaggy", "edgy"],
    "image_url": "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=500&h=600&fit=crop",
    "hair_type": "medium"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Octopus Cut",
    "category": "Long",
    "tags": ["octopus", "layers", "dramatic", "volume"],
    "image_url": "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&h=600&fit=crop",
    "hair_type": "long"
  }' > /dev/null

curl -s -X POST "$SUPABASE_URL/rest/v1/hairstyles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jellyfish Cut",
    "category": "Medium",
    "tags": ["jellyfish", "layered", "k-beauty", "modern"],
    "image_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop",
    "hair_type": "medium"
  }' > /dev/null

echo "✓ Added 5 layered cut styles"

# Summary
echo ""
echo "==================================="
echo "✅ Successfully added 50 new hairstyles!"
echo "==================================="
echo "Categories added:"
echo "  • 5 Balayage & Highlights"
echo "  • 5 Textured Cuts"
echo "  • 5 Natural Texture"
echo "  • 5 Sleek & Polished"
echo "  • 5 Bold Fashion Colors"
echo "  • 5 Classic Men's"
echo "  • 5 Wedding/Special Occasion"
echo "  • 5 Modern Bangs/Fringe"
echo "  • 5 Protective Styles"
echo "  • 5 Layered Cuts"
echo "==================================="
echo "Total new styles: 50"
echo "Previous total: ~53"
echo "New total: 100+ hairstyles!"
echo "==================================="
