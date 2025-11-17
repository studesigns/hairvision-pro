"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Search,
  Grid3X3,
  List,
  Heart,
  Sparkles,
  X,
  Loader2,
  ZoomIn,
  Tag,
  Palette,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface HairstyleItem {
  id: string
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
  created_at: string
}

const categories = ["All", "Short", "Medium", "Long", "Color", "Fringe", "Curly", "Updo"]
const maintenanceLevels = ["all", "low", "medium", "high"]

export default function GalleryPage() {
  const [hairstyles, setHairstyles] = useState<HairstyleItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedMaintenance, setSelectedMaintenance] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedStyle, setSelectedStyle] = useState<HairstyleItem | null>(null)
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchHairstyles()
  }, [selectedCategory, selectedMaintenance])

  const fetchHairstyles = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory !== "All") {
        params.append("category", selectedCategory)
      }
      if (selectedMaintenance !== "all") {
        params.append("maintenance", selectedMaintenance)
      }
      params.append("sortBy", "popularity")

      const response = await fetch(`/api/hairstyles?${params.toString()}`)
      const result = await response.json()

      if (result.success) {
        setHairstyles(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch hairstyles:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredStyles = hairstyles.filter((style) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      style.name.toLowerCase().includes(query) ||
      style.description.toLowerCase().includes(query) ||
      style.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      style.color_tags.some((tag) => tag.toLowerCase().includes(query))
    )
  })

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const handleImageError = (id: string) => {
    setImageLoadErrors((prev) => new Set(prev).add(id))
  }

  const getMaintenanceColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "high":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
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
        <div className="container mx-auto px-4 py-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search styles, tags, colors, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-500 mb-2">Category</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Maintenance Filter */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Maintenance</p>
              <div className="flex gap-2">
                {maintenanceLevels.map((level) => (
                  <Button
                    key={level}
                    variant={selectedMaintenance === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMaintenance(level)}
                    className="capitalize"
                  >
                    {level === "all" ? "Any" : level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {loading ? "Loading..." : `Showing ${filteredStyles.length} styles`}
          </p>
          {favorites.length > 0 && (
            <p className="text-sm text-purple-600">
              {favorites.length} favorited
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStyles.map((style) => (
              <Card
                key={style.id}
                className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => setSelectedStyle(style)}
              >
                <div className="relative h-64 bg-gray-100">
                  {!imageLoadErrors.has(style.id) ? (
                    <img
                      src={style.image_url}
                      alt={style.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(style.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                      <Sparkles className="w-12 h-12 text-purple-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(style.id)
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
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
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className="bg-white/90 px-2 py-1 rounded text-xs font-medium">
                      {style.popularity}% popular
                    </span>
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium capitalize",
                        getMaintenanceColor(style.maintenance_level)
                      )}
                    >
                      {style.maintenance_level} maintenance
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{style.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {style.category} • {style.length}
                  </p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {style.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {style.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {style.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{style.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStyles.map((style) => (
              <Card
                key={style.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedStyle(style)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    {!imageLoadErrors.has(style.id) ? (
                      <img
                        src={style.image_url}
                        alt={style.name}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(style.id)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                        <Sparkles className="w-8 h-8 text-purple-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-lg">{style.name}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(style.id)
                        }}
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
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {style.category} • {style.length} • {style.popularity}% popular
                    </p>
                    <p className="text-sm text-gray-600 mb-2">{style.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded capitalize",
                          getMaintenanceColor(style.maintenance_level)
                        )}
                      >
                        {style.maintenance_level} maintenance
                      </span>
                      {style.tags.slice(0, 4).map((tag) => (
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

        {!loading && filteredStyles.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No styles found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSelectedMaintenance("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedStyle && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedStyle(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Image */}
              <div className="md:w-1/2 relative bg-gray-100">
                <img
                  src={selectedStyle.image_url}
                  alt={selectedStyle.name}
                  className="w-full h-64 md:h-full object-cover"
                />
                <button
                  onClick={() => setSelectedStyle(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Details */}
              <div className="md:w-1/2 p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{selectedStyle.name}</h2>
                  <button onClick={() => toggleFavorite(selectedStyle.id)}>
                    <Heart
                      className={cn(
                        "w-6 h-6",
                        favorites.includes(selectedStyle.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      )}
                    />
                  </button>
                </div>

                <div className="flex gap-2 mb-4">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedStyle.category}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {selectedStyle.length}
                  </span>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-sm capitalize",
                      getMaintenanceColor(selectedStyle.maintenance_level)
                    )}
                  >
                    {selectedStyle.maintenance_level} maintenance
                  </span>
                </div>

                <p className="text-gray-700 mb-6">{selectedStyle.description}</p>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Tag className="w-4 h-4" />
                      Style Tags
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedStyle.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Palette className="w-4 h-4" />
                      Color Tags
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedStyle.color_tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Best For</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Face Shapes:</p>
                        <p className="capitalize">{selectedStyle.face_shapes.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Hair Textures:</p>
                        <p className="capitalize">{selectedStyle.hair_textures.join(", ")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">
                      {selectedStyle.popularity}% popularity rating
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <Link href="/consultation">
                    <Button className="w-full">Use This Style in Consultation</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
