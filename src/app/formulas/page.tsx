"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, FlaskConical, Search, Info, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface BrandInfo {
  name: string
  colorSystem: string
  levelRange: string
  developerRatios: string[]
  popularProducts: string[]
}

const brands: BrandInfo[] = [
  {
    name: "Wella Koleston Perfect",
    colorSystem: "Level/Tone (e.g., 7/3 = Level 7, Gold tone)",
    levelRange: "2/0 to 12/0",
    developerRatios: ["1:1 for levels 2-10", "1:2 for high lift (11-12)"],
    popularProducts: [
      "Koleston Perfect ME+ (Permanent)",
      "Color Touch (Semi-permanent)",
      "Blondor (Lightener)",
    ],
  },
  {
    name: "Schwarzkopf Igora Royal",
    colorSystem: "Level-Tone (e.g., 7-5 = Level 7, Gold tone)",
    levelRange: "1-0 to 12-0",
    developerRatios: ["1:1 for standard colors", "1:2 for lightening"],
    popularProducts: [
      "Igora Royal (Permanent)",
      "Vibrance (Demi-permanent)",
      "BlondMe (Lightening)",
    ],
  },
  {
    name: "L'Oréal Majirel",
    colorSystem: "Level.Tone (e.g., 7.3 = Level 7, Gold tone)",
    levelRange: "1 to 10",
    developerRatios: ["1:1.5 for most colors", "1:2 for high lift"],
    popularProducts: [
      "Majirel (Permanent)",
      "Dia Richesse (Demi-permanent)",
      "Blond Studio (Lightener)",
    ],
  },
  {
    name: "Redken Shades EQ",
    colorSystem: "Level N/B (e.g., 7N = Level 7, Neutral)",
    levelRange: "01 to 10",
    developerRatios: ["1:1 processing solution"],
    popularProducts: [
      "Shades EQ (Demi-permanent gloss)",
      "Color Fusion (Permanent)",
      "Flash Lift (Lightener)",
    ],
  },
  {
    name: "Matrix SoColor",
    colorSystem: "Level/Tone (e.g., 7G = Level 7, Gold)",
    levelRange: "1 to 12",
    developerRatios: ["1:1 for standard", "1:1.5 for gray coverage", "1:2 for high lift"],
    popularProducts: [
      "SoColor Beauty (Permanent)",
      "Color Sync (Demi-permanent)",
      "Light Master (Lightener)",
    ],
  },
]

const developerGuide = [
  {
    volume: 10,
    lift: "No lift (deposit only)",
    uses: "Toning, darkening, gray blending",
    processingTime: "20-25 minutes",
  },
  {
    volume: 20,
    lift: "1-2 levels of lift",
    uses: "Standard coverage, slight lightening",
    processingTime: "30-35 minutes",
  },
  {
    volume: 30,
    lift: "2-3 levels of lift",
    uses: "Moderate lightening, high lift colors",
    processingTime: "35-40 minutes",
  },
  {
    volume: 40,
    lift: "3-4 levels of lift",
    uses: "Maximum lift, high lift blonde",
    processingTime: "40-45 minutes",
  },
]

const toneChart = [
  { code: "0", tone: "Natural", description: "Pure, no undertone" },
  { code: "1", tone: "Ash/Blue", description: "Cool, neutralizes orange/red" },
  { code: "2", tone: "Iridescent/Violet", description: "Cool, neutralizes yellow" },
  { code: "3", tone: "Gold", description: "Warm, adds warmth" },
  { code: "4", tone: "Copper", description: "Warm, vibrant orange-red" },
  { code: "5", tone: "Mahogany", description: "Red-violet, rich tones" },
  { code: "6", tone: "Red", description: "True red, intense" },
  { code: "7", tone: "Matte/Green", description: "Neutralizes red" },
]

export default function FormulasPage() {
  const [selectedBrand, setSelectedBrand] = useState<string>("Wella Koleston Perfect")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedBrandInfo = brands.find((b) => b.name === selectedBrand)

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
              <FlaskConical className="w-6 h-6 text-purple-600" />
              <h1 className="text-xl font-bold">Formula Reference</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Brand Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Professional Brands</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search brands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {filteredBrands.map((brand) => (
                  <button
                    key={brand.name}
                    onClick={() => setSelectedBrand(brand.name)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedBrand === brand.name
                        ? "bg-purple-100 border-purple-300 border"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <p className="font-medium text-sm">{brand.name}</p>
                    <p className="text-xs text-gray-500">{brand.levelRange}</p>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right: Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Brand Info */}
            {selectedBrandInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    {selectedBrandInfo.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Color System</p>
                    <p className="text-sm bg-gray-50 p-2 rounded">
                      {selectedBrandInfo.colorSystem}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Level Range</p>
                    <p className="text-sm bg-gray-50 p-2 rounded">
                      {selectedBrandInfo.levelRange}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Developer Ratios</p>
                    <ul className="text-sm bg-gray-50 p-2 rounded space-y-1">
                      {selectedBrandInfo.developerRatios.map((ratio, i) => (
                        <li key={i}>• {ratio}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Popular Products</p>
                    <ul className="text-sm bg-gray-50 p-2 rounded space-y-1">
                      {selectedBrandInfo.popularProducts.map((product, i) => (
                        <li key={i}>• {product}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Developer Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Developer Volume Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Volume</th>
                        <th className="text-left py-2 font-medium">Lift</th>
                        <th className="text-left py-2 font-medium">Uses</th>
                        <th className="text-left py-2 font-medium">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {developerGuide.map((dev) => (
                        <tr key={dev.volume} className="border-b last:border-0">
                          <td className="py-2 font-semibold">{dev.volume} Vol</td>
                          <td className="py-2">{dev.lift}</td>
                          <td className="py-2">{dev.uses}</td>
                          <td className="py-2">{dev.processingTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Tone Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Universal Tone Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {toneChart.map((tone) => (
                    <div
                      key={tone.code}
                      className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700">
                        {tone.code}
                      </div>
                      <div>
                        <p className="font-medium">{tone.tone}</p>
                        <p className="text-xs text-gray-500">{tone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Safety Info */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Info className="w-5 h-5" />
                  Important Safety Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-amber-900 space-y-2">
                <p>• Always perform a patch test 48 hours before service</p>
                <p>• Perform strand test for accurate timing and results</p>
                <p>• Never exceed manufacturer recommended processing times</p>
                <p>• Use appropriate PPE (gloves, apron)</p>
                <p>• Mix products in well-ventilated areas</p>
                <p>• Follow manufacturer instructions for specific products</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
