"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Search,
  Grid3X3,
  LayoutList,
  Heart,
  X,
  Loader2,
  Tag,
  Clock,
  Scissors
} from "lucide-react"

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
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "high":
        return "bg-rose-50 text-rose-700 border-rose-200"
      default:
        return "bg-[var(--neutral-100)] text-[var(--neutral-600)]"
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="glass-nav sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-[#666666] hover:text-[#C9A961] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-[13px] font-medium uppercase tracking-[0.15em]">Back</span>
              </Link>
              <div className="h-6 w-px bg-[#E8E8E8]" />
              <div className="flex flex-col">
                <span className="text-lg font-medium tracking-tight text-[#1A1A1A]">
                  Hair Architect
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#666666]">
                  Style Gallery
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#C9A961] text-white"
                    : "bg-[#F5F5F5] text-[#666666] hover:bg-[#E8E8E8]"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-[#C9A961] text-white"
                    : "bg-[#F5F5F5] text-[#666666] hover:bg-[#E8E8E8]"
                }`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters Section */}
      <section className="border-b border-[#E8E8E8] bg-white">
        <div className="max-w-[1200px] mx-auto px-10 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3A3A3]" />
                <input
                  type="text"
                  placeholder="Search styles, colors, techniques..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#FAFAFA] border border-[#E8E8E8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A961] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-[#C9A961] text-white shadow-md"
                      : "bg-[#F5F5F5] text-[#666666] hover:bg-[#E8E8E8]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Maintenance Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#666666]">Maintenance:</span>
              <select
                value={selectedMaintenance}
                onChange={(e) => setSelectedMaintenance(e.target.value)}
                className="px-3 py-2 bg-[#FAFAFA] border border-[#E8E8E8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
              >
                <option value="all">All Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="max-w-[1200px] mx-auto px-10 py-4">
        <p className="text-sm text-[#666666]">
          {loading ? "Loading..." : `${filteredStyles.length} styles found`}
        </p>
      </div>

      {/* Gallery Grid */}
      <main className="max-w-[1200px] mx-auto px-10 pb-16">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-[#C9A961] animate-spin" />
          </div>
        ) : filteredStyles.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#737373]">No styles found matching your criteria</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStyles.map((style) => (
              <div
                key={style.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover-lift"
                onClick={() => setSelectedStyle(style)}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {imageLoadErrors.has(style.id) ? (
                    <div className="absolute inset-0 bg-[var(--neutral-100)] flex items-center justify-center">
                      <span className="text-[var(--neutral-400)] text-sm">Image unavailable</span>
                    </div>
                  ) : (
                    <Image
                      src={style.image_url}
                      alt={style.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={() => handleImageError(style.id)}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(style.id)
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(style.id)
                          ? "fill-rose-500 text-rose-500"
                          : "text-[var(--neutral-600)]"
                      }`}
                    />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className={`inline-block px-2 py-1 rounded-md text-xs font-medium border ${getMaintenanceColor(
                        style.maintenance_level
                      )}`}
                    >
                      {style.maintenance_level} maintenance
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[var(--foreground)]">{style.name}</h3>
                    <span className="text-xs text-[var(--neutral-500)] bg-[var(--neutral-100)] px-2 py-1 rounded">
                      {style.category}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--neutral-600)] line-clamp-2 mb-3">
                    {style.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {style.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[#C9A961] bg-[#C9A961]/10 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStyles.map((style) => (
              <div
                key={style.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex gap-6 cursor-pointer hover-lift"
                onClick={() => setSelectedStyle(style)}
              >
                <div className="relative w-32 h-40 rounded-lg overflow-hidden flex-shrink-0">
                  {imageLoadErrors.has(style.id) ? (
                    <div className="absolute inset-0 bg-[#F5F5F5] flex items-center justify-center">
                      <span className="text-[#A3A3A3] text-xs">No image</span>
                    </div>
                  ) : (
                    <Image
                      src={style.image_url}
                      alt={style.name}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(style.id)}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">{style.name}</h3>
                      <span className="text-sm text-[var(--neutral-500)]">{style.category}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(style.id)
                      }}
                      className="p-2 rounded-full hover:bg-[var(--neutral-100)] transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(style.id)
                            ? "fill-rose-500 text-rose-500"
                            : "text-[var(--neutral-400)]"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-[var(--neutral-600)] mb-3">{style.description}</p>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium border ${getMaintenanceColor(
                        style.maintenance_level
                      )}`}
                    >
                      <Clock className="w-3 h-3 inline-block mr-1" />
                      {style.maintenance_level} maintenance
                    </span>
                    <div className="flex gap-1">
                      {style.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-[#C9A961] bg-[#C9A961]/10 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedStyle && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedStyle(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 h-full">
              <div className="relative aspect-[4/5] md:aspect-auto">
                {imageLoadErrors.has(selectedStyle.id) ? (
                  <div className="absolute inset-0 bg-[#F5F5F5] flex items-center justify-center">
                    <span className="text-[#A3A3A3]">Image unavailable</span>
                  </div>
                ) : (
                  <Image
                    src={selectedStyle.image_url}
                    alt={selectedStyle.name}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(selectedStyle.id)}
                  />
                )}
              </div>
              <div className="p-8 overflow-y-auto">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-sm text-[#C9A961] font-medium uppercase tracking-[0.1em]">
                      {selectedStyle.category}
                    </span>
                    <h2 className="text-2xl font-semibold text-[#1A1A1A] mt-1">
                      {selectedStyle.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedStyle(null)}
                    className="p-2 rounded-full hover:bg-[#F5F5F5] transition-colors"
                  >
                    <X className="w-5 h-5 text-[#666666]" />
                  </button>
                </div>

                <p className="text-[#666666] leading-relaxed mb-6">
                  {selectedStyle.description}
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Style Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStyle.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-[#F5F5F5] text-[#404040] rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1A1A] mb-3">
                      Color Characteristics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStyle.color_tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-[#C9A961]/10 text-[#8B7740] rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-[#1A1A1A] mb-2">
                        Best Face Shapes
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedStyle.face_shapes.map((shape) => (
                          <span
                            key={shape}
                            className="text-xs text-[#666666] bg-[#F5F5F5] px-2 py-1 rounded"
                          >
                            {shape}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1A1A1A] mb-2">
                        Hair Textures
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedStyle.hair_textures.map((texture) => (
                          <span
                            key={texture}
                            className="text-xs text-[#666666] bg-[#F5F5F5] px-2 py-1 rounded"
                          >
                            {texture}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1A1A] mb-2">
                      Maintenance Level
                    </h4>
                    <span
                      className={`inline-block px-3 py-1.5 rounded-lg text-sm font-medium border ${getMaintenanceColor(
                        selectedStyle.maintenance_level
                      )}`}
                    >
                      {selectedStyle.maintenance_level.charAt(0).toUpperCase() +
                        selectedStyle.maintenance_level.slice(1)}{" "}
                      Maintenance
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => toggleFavorite(selectedStyle.id)}
                    className="flex-1 btn-secondary flex items-center justify-center gap-2"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(selectedStyle.id) ? "fill-current" : ""
                      }`}
                    />
                    {favorites.includes(selectedStyle.id) ? "Saved" : "Save Style"}
                  </button>
                  <Link
                    href="/consultation"
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    Use in Consultation
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
