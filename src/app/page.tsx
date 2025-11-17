"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Camera,
  Wand2,
  Palette,
  FlaskConical,
  ChevronRight,
  Upload,
  Sparkles,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const features = [
    {
      icon: Camera,
      title: "Capture Client Photo",
      description: "Take or upload a photo of your client's current hair for realistic previews",
      color: "bg-blue-500",
    },
    {
      icon: Wand2,
      title: "AI Style Generation",
      description: "Describe any style in natural language and AI generates visual previews",
      color: "bg-purple-500",
    },
    {
      icon: Palette,
      title: "Color Visualization",
      description: "See how different colors look on the actual client photo in real-time",
      color: "bg-pink-500",
    },
    {
      icon: FlaskConical,
      title: "Formula Calculator",
      description: "Automatically translate chosen colors into exact chemical mixing formulas",
      color: "bg-green-500",
    },
  ]

  const workflow = [
    { step: 1, title: "Client describes their vision", icon: "💭" },
    { step: 2, title: "AI generates style options", icon: "✨" },
    { step: 3, title: "Preview on client's photo", icon: "📸" },
    { step: 4, title: "Client approves the look", icon: "👍" },
    { step: 5, title: "Get exact formula to mix", icon: "🧪" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              HairVision Pro
            </h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/consultation" className="text-gray-600 hover:text-purple-600 transition-colors">
              Start Consultation
            </Link>
            <Link href="/gallery" className="text-gray-600 hover:text-purple-600 transition-colors">
              Style Gallery
            </Link>
            <Link href="/formulas" className="text-gray-600 hover:text-purple-600 transition-colors">
              Formulas
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Hair Consultations with{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered Visualization
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Help clients see their dream hairstyle before you start. Generate styles from descriptions,
            visualize colors on their actual photo, and get exact chemical formulas.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/consultation">
              <Button size="lg" className="gap-2">
                Start New Consultation
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="gap-2">
              <Upload className="w-5 h-5" />
              Upload Client Photo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold text-center mb-12">Complete Consultation Toolkit</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setActiveDemo(feature.title)}
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Simple 5-Step Workflow</h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {workflow.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-2xl mb-2">
                    {item.icon}
                  </div>
                  <div className="text-center max-w-[120px]">
                    <div className="text-sm font-semibold text-purple-600">Step {item.step}</div>
                    <div className="text-xs text-gray-600">{item.title}</div>
                  </div>
                </div>
                {index < workflow.length - 1 && (
                  <ChevronRight className="w-6 h-6 text-gray-300 mx-2 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Live Demo Preview</h3>
            <p className="opacity-90">See how the consultation workflow works</p>
          </div>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Input */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Client Request</h4>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <p className="text-gray-700 italic">
                    "I want a shoulder-length bob with subtle balayage highlights,
                    going from my natural dark brown to a warm caramel blonde at the ends.
                    Something low-maintenance but still trendy."
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  AI analyzing request...
                </div>
              </div>

              {/* Right: Output */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Generated Formula</h4>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Base Color:</span>
                      <span>Wella Koleston 7/3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Highlight:</span>
                      <span>9/03 + 10/38 (1:1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Developer:</span>
                      <span>30 Vol (1:1 ratio)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Process Time:</span>
                      <span>35-45 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Consultations?</h3>
          <p className="text-xl opacity-90 mb-8">
            Start using AI-powered visualization today
          </p>
          <Link href="/consultation">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 gap-2"
            >
              Launch Consultation Tool
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 HairVision Pro. Professional Hair Consultation Software.</p>
        </div>
      </footer>
    </div>
  )
}
