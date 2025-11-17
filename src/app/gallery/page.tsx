"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Filter, Grid3X3, List, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StyleItem {
  id: string
  name: string
  category: string
  length: string
  tags: string[]
  description: string
  popularity: number
}

const styleGallery: StyleItem[] = [
  {
    id: "1",
    name: "Classic Bob",
    category: "Short",
    length: "Chin-length",
    tags: ["professional", "easy-maintenance", "classic"],
    description: "Timeless chin-length bob with clean lines and subtle layers",
    popularity: 95,
  },
  {
    id: "2",
    name: "Beach Waves",
    category: "Medium",
    length: "Shoulder-length",
    tags: ["casual", "texture", "trendy"],
    description: "Effortless waves that give a relaxed, sun-kissed appearance",
    popularity: 88,
  },
  {
    id: "3",
    name: "Layered Lob",
    category: "Medium",
    length: "Long bob",
    tags: ["versatile", "volume", "modern"],
    description: "Long bob with face-framing layers for movement and dimension",
    popularity: 92,
  },
  {
    id: "4",
    name: "Pixie Cut",
    category: "Short",
    length: "Very short",
    tags: ["bold", "low-maintenance", "edgy"],
    description: "Short, cropped style that highlights facial features",
    popularity: 78,
  },
  {
    id: "5",
    name: "Balayage Highlights",
    category: "Color",
    length: "Any",
    tags: ["natural", "dimensional", "low-maintenance"],
    description: "Hand-painted highlights for a natural, sun-kissed effect",
    popularity: 96,
  },
  {
    id: "6",
    name: "Curtain Bangs",
    category: "Fringe",
    length: "Any",
    tags: ["face-framing", "soft", "retro"],
    description: "Center-parted bangs that frame the face softly",
    popularity: 89,
  },
  {
    id: "7",
    name: "Shag Cut",
    category: "Medium",
    length: "Various",
    tags: ["textured", "edgy", "volume"],
    description: "Heavily layered style with lots of texture and movement",
    popularity: 85,
  },
  {
    id: "8",
    name: "Blunt Cut",
    category: "Long",
    length: "Long",
    tags: ["sleek", "modern", "bold"],
    description: "One-length cut with sharp, precise ends",
    popularity: 82,
  },
  {
    id: "9",
    name: "Ombre Color",
    category: "Color",
    length: "Any",
    tags: ["gradient", "trendy", "dimensional"],
    description: "Gradual color transition from dark roots to lighter ends",
    popularity: 90,
  },
  {
    id: "10",
    name: "Textured Crop",
    category: "Short",
    length: "Short",
    tags: ["modern", "easy-style", "versatile"],
    description: "Short cut with textured top and clean sides",
    popularity: 76,
  },
  {
    id: "11",
    name: "Face-Framing Layers",
    category: "Long",
    length: "Long",
    tags: ["flattering", "movement", "classic"],
    description: "Long layers that frame and soften the face",
    popularity: 91,
  },
  {
    id: "12",
    name: "Money Pieces",
    category: "Color",
    length: "Any",
    tags: ["face-framing", "bold", "trendy"],
    description: "Bright face-framing highlights that make a statement",
    popularity: 87,
  },
]

const categories = ["All", "Short", "Medium", "Long", "Color", "Fringe"]

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredStyles = styleGallery.filter((style) => {
    const matchesSearch =
      style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "All" || style.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h1 className="text-xl font-bold">Style Gallery</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search styles, tags, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredStyles.length} of {styleGallery.length} styles
        </div>

        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStyles.map((style) => (
              <Card
                key={style.id}
                className="overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-6xl opacity-30">✂️</div>
                  <button
                    onClick={() => toggleFavorite(style.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <Heart
                      className={cn(
                        "w-5 h-5",
                        favorites.includes(style.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      )}
                    />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded text-xs font-medium">
                    {style.popularity}% popular
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{style.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {style.category} • {style.length}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">{style.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {style.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStyles.map((style) => (
              <Card key={style.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-3xl opacity-30">✂️</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{style.name}</h3>
                      <button onClick={() => toggleFavorite(style.id)}>
                        <Heart
                          className={cn(
                            "w-5 h-5",
                            favorites.includes(style.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          )}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      {style.category} • {style.length} • {style.popularity}% popular
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {style.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredStyles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No styles found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
