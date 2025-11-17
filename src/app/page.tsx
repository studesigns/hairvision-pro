"use client"

import { useState, useEffect } from "react"
import {
  Camera,
  Palette,
  FlaskConical,
  ArrowRight,
  Scissors,
  Image as ImageIcon,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Camera,
      title: "Visual Consultation",
      description: "Capture your client's current look and visualize transformations before making any changes",
    },
    {
      icon: Palette,
      title: "Color Exploration",
      description: "Browse and apply different color options to see how they complement your client's features",
    },
    {
      icon: FlaskConical,
      title: "Formula Precision",
      description: "Get exact mixing ratios and processing times for consistent, professional results",
    },
  ]

  const galleryImages = [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80",
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80",
    "https://images.unsplash.com/photo-1605980776566-0486c3b394f0?w=600&q=80",
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80",
    "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=600&q=80",
  ]

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-nav shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center transition-transform group-hover:scale-105">
                <Scissors className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
                Ha-Ha
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/consultation"
                className="text-sm font-medium text-[var(--neutral-600)] hover:text-[var(--primary)] transition-colors"
              >
                Consultation
              </Link>
              <Link
                href="/gallery"
                className="text-sm font-medium text-[var(--neutral-600)] hover:text-[var(--primary)] transition-colors"
              >
                Style Gallery
              </Link>
              <Link
                href="/formulas"
                className="text-sm font-medium text-[var(--neutral-600)] hover:text-[var(--primary)] transition-colors"
              >
                Formulas
              </Link>
            </nav>

            <Link href="/consultation" className="btn-primary text-sm hidden md:inline-flex items-center gap-2">
              Start Session
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Photography Forward */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image Grid */}
        <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-20">
          {galleryImages.map((src, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                priority={i < 3}
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)]/90 to-[var(--background)]" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <p className="text-sm font-medium text-[var(--secondary-dark)] tracking-wide uppercase mb-4">
                Professional Hair Consultation
              </p>
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--foreground)] leading-[1.1] mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Visualize the
              <br />
              <span className="font-semibold">transformation</span>
              <br />
              before it happens
            </h1>

            <p
              className="text-lg text-[var(--neutral-600)] max-w-xl mb-12 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              Help your clients see their new look before you start. Preview colors, styles, and get
              precise formulas for flawless results every time.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Link href="/consultation" className="btn-primary inline-flex items-center justify-center gap-2 text-base">
                Begin Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/gallery" className="btn-secondary inline-flex items-center justify-center gap-2 text-base">
                <ImageIcon className="w-5 h-5" />
                Browse Styles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[var(--foreground)] mb-4">
              Everything you need for
              <span className="font-semibold"> perfect consultations</span>
            </h2>
            <p className="text-[var(--neutral-600)] max-w-2xl mx-auto">
              Streamline your workflow with tools designed specifically for professional stylists
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl transition-all duration-500 hover-lift cursor-pointer ${
                  activeFeature === index
                    ? "bg-[var(--primary)] text-white shadow-xl"
                    : "bg-[var(--neutral-100)] hover:bg-[var(--neutral-200)]"
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                    activeFeature === index
                      ? "bg-white/20"
                      : "bg-[var(--primary)]/10"
                  }`}
                >
                  <feature.icon
                    className={`w-6 h-6 ${
                      activeFeature === index ? "text-white" : "text-[var(--primary)]"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p
                  className={`leading-relaxed ${
                    activeFeature === index ? "text-white/90" : "text-[var(--neutral-600)]"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-[var(--foreground)] mb-4">
                Curated style <span className="font-semibold">inspiration</span>
              </h2>
              <p className="text-[var(--neutral-600)] max-w-lg">
                Browse our collection of professional styles to share with your clients during consultations
              </p>
            </div>
            <Link
              href="/gallery"
              className="mt-6 md:mt-0 text-[var(--primary)] font-medium inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              View all styles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.slice(0, 6).map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] rounded-xl overflow-hidden hover-lift cursor-pointer group"
              >
                <Image
                  src={src}
                  alt={`Style inspiration ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Sparkles className="w-10 h-10 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Ready to elevate your <span className="font-semibold">client experience?</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-10">
            Start your first consultation today and see how visualization tools can transform your salon workflow
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center gap-2 bg-white text-[var(--primary)] px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            Start Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--neutral-900)] text-[var(--neutral-400)] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                <Scissors className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">Ha-Ha</span>
            </div>
            <div className="flex gap-8 text-sm">
              <Link href="/consultation" className="hover:text-white transition-colors">
                Consultation
              </Link>
              <Link href="/gallery" className="hover:text-white transition-colors">
                Gallery
              </Link>
              <Link href="/formulas" className="hover:text-white transition-colors">
                Formulas
              </Link>
            </div>
            <p className="text-sm">&copy; 2025 Ha-Ha. Professional Hair Consultation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
