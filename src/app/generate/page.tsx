"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import HairstyleGenerator from "@/components/HairstyleGenerator"

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold uppercase tracking-[0.15em] text-[#1A1A1A]">
                Hair Architect
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium uppercase tracking-[0.15em] text-[#666666] hover:text-[#C9A961] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/gallery"
                className="text-sm font-medium uppercase tracking-[0.15em] text-[#666666] hover:text-[#C9A961] transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/generate"
                className="text-sm font-medium uppercase tracking-[0.15em] text-[#C9A961]"
              >
                Generate
              </Link>
              <Link
                href="/consultation"
                className="text-sm font-medium uppercase tracking-[0.15em] text-[#666666] hover:text-[#C9A961] transition-colors"
              >
                Consultation
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HairstyleGenerator />
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12 mt-16">
        <div className="max-w-[1200px] mx-auto px-10 text-center">
          <p className="text-sm text-[#A3A3A3]">
            &copy; {new Date().getFullYear()} Hair Architect - Studio and Training. Powered by AI.
          </p>
        </div>
      </footer>
    </div>
  )
}
