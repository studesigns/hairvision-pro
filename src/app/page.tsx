"use client"

import { useState, useEffect } from "react"
import {
  Camera,
  Palette,
  FlaskConical,
  Wand2,
  ArrowRight,
  Phone,
  MapPin
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      number: "01",
      icon: Camera,
      title: "PROFESSIONAL CAPTURE",
      description: "Upload client photos for accurate visualization on actual hair texture and face shape",
    },
    {
      number: "02",
      icon: Wand2,
      title: "EXPLORE POSSIBILITIES",
      description: "Generate realistic style previews from your description using professional visualization",
    },
    {
      number: "03",
      icon: Palette,
      title: "REAL-TIME COLOR MATCHING",
      description: "Preview different colors on client photos in real-time with professional accuracy",
    },
    {
      number: "04",
      icon: FlaskConical,
      title: "PRECISE FORMULATION",
      description: "Generate exact chemical mixing ratios and professional product recommendations",
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav`}
      >
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex flex-col">
              <span className="text-xl font-medium tracking-tight text-[#1A1A1A]">
                Hair Architect
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#666666]">
                Studio and Training
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="#how-it-works"
                className="text-[13px] font-medium uppercase tracking-[0.15em] text-[#1A1A1A] hover:text-[#C9A961] transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/gallery"
                className="text-[13px] font-medium uppercase tracking-[0.15em] text-[#1A1A1A] hover:text-[#C9A961] transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="#contact"
                className="text-[13px] font-medium uppercase tracking-[0.15em] text-[#1A1A1A] hover:text-[#C9A961] transition-colors"
              >
                Contact
              </Link>
            </nav>

            <Link
              href="/consultation"
              className="hidden md:inline-flex btn-primary items-center gap-2"
            >
              Start Consultation
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560869713-7d0a29430803?w=1920&q=80"
            alt="Salon interior"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <p className="font-script text-4xl text-[#C9A961] mb-4 animate-fade-in-up">
            Visualize Your
          </p>

          <h1
            className="text-5xl md:text-6xl font-bold uppercase tracking-[0.15em] text-white mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Transformation
          </h1>

          <p
            className="text-lg text-white/90 font-normal mb-4 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Professional consultation technology for Hair Architect salon
          </p>

          <p
            className="text-sm uppercase tracking-[0.2em] text-white/70 mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Ryde &bull; Isle of Wight
          </p>

          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              href="/consultation"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Start Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-[120px] bg-white">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold uppercase tracking-[0.15em] text-[#1A1A1A]">
              Our Consultation Process
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.number}
                className="group bg-white border border-[#E8E8E8] rounded-lg p-10 transition-all duration-300 hover:border-[#C9A961] hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-xl font-light text-[#C9A961] mb-4 block">
                  {feature.number}
                </span>

                <feature.icon
                  className="w-12 h-12 text-[#C9A961] mb-4"
                  strokeWidth={1.5}
                />

                <h3 className="text-base font-bold uppercase tracking-[0.1em] text-[#1A1A1A] mb-3">
                  {feature.title}
                </h3>

                <p className="text-[15px] text-[#666666] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[120px] bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto px-10 text-center">
          <h2 className="text-4xl font-bold uppercase tracking-[0.15em] text-[#1A1A1A] mb-6">
            Ready to Begin?
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto mb-10">
            Start your professional consultation and help your clients visualize their perfect transformation
          </p>
          <Link
            href="/consultation"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            Start Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1A1A1A] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-medium mb-2">Hair Architect</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#999999] mb-6">
                Studio and Training
              </p>
              <p className="text-sm text-[#999999]">
                Professional hair consultation technology
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.1em] mb-4">
                Location
              </h4>
              <div className="flex items-start gap-2 text-[#999999]">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  Ryde<br />
                  Isle of Wight
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.1em] mb-4">
                Contact
              </h4>
              <div className="flex items-center gap-2 text-[#999999] mb-4">
                <Phone className="w-4 h-4" />
                <p className="text-sm">Contact salon for appointments</p>
              </div>
              <p className="text-xs text-[#666666]">
                Part of HAHA College
              </p>
            </div>
          </div>

          <div className="border-t border-[#333333] mt-12 pt-8 text-center">
            <p className="text-sm text-[#666666]">
              &copy; 2025 Hair Architect. Professional Hair Consultation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
