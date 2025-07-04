"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-3">
      <div className="flex items-center justify-between px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-black/60 via-zinc-900/60 to-black/60 rounded-full max-w-6xl w-full border border-white/10">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Copia%20de%20visual-xEv6VBJIekq7tW5SF0423WXZBu0AlR.png"
              alt="Codepreneur Network Logo"
              width={160}
              height={160}
              className="h-24 w-24 object-contain"
              priority
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 px-8">
          <Link href="/blog/our-story" className="text-sm text-gray-300 hover:text-white transition-colors">
            Our Story
          </Link>
          <Link href="/blog" className="text-sm text-gray-300 hover:text-white transition-colors">
            Blog
          </Link>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfdCKrWeB0ABur1oJLZk7cwTXw4qtDWNN_c7qXU0a-4QvowvA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Volunteer
          </a>
          <Link href="/events" className="text-sm text-gray-300 hover:text-white transition-colors">
            Events
          </Link>
          <Link href="/courses" className="text-sm text-gray-300 hover:text-white transition-colors">
            Courses
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            className="bg-white text-black hover:bg-orange-500 hover:text-white transition-colors duration-300 hidden md:flex"
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfdCKrWeB0ABur1oJLZk7cwTXw4qtDWNN_c7qXU0a-4QvowvA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </a>
          </Button>
          <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none" aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>}
      {isMenuOpen && (
        <div className="fixed top-20 left-4 right-4 bg-zinc-900 rounded-lg shadow-lg p-4 z-50 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              href="/blog/our-story"
              className="text-sm text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/volunteer"
              className="text-sm text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Volunteer
            </Link>
            <Link
              href="/events"
              className="text-sm text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/courses"
              className="text-sm text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Button
              variant="secondary"
              className="bg-white text-black hover:bg-orange-500 hover:text-white transition-colors duration-300 w-full mt-2"
            >
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfdCKrWeB0ABur1oJLZk7cwTXw4qtDWNN_c7qXU0a-4QvowvA/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

