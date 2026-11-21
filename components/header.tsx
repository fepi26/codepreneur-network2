"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // On every page except the home page the ribbon stays hidden until the mouse
  // moves to the top of the screen, then it fades in from above.
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [canHover, setCanHover] = useState(true) // false on touch screens: ribbon always visible there
  const [nearTop, setNearTop] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => setNearTop((was) => (was ? e.clientY < 150 : e.clientY < 40))
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setNearTop(true) // pointer left the window through the top edge
    }
    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  const visible = isHome || !canHover || nearTop || hasFocus || isMenuOpen

  return (
    <header
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={() => setHasFocus(false)}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-3 transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-8 opacity-0"
      }`}
    >
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
          <Link href="/blog/our-story" className="text-base font-medium text-gray-300 hover:text-white transition-colors">
            Our Story
          </Link>
          <Link href="/blog" className="text-base font-medium text-gray-300 hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/get-involved" className="text-base font-medium text-gray-300 hover:text-white transition-colors">
            Get Involved
          </Link>
          <Link href="/events" className="text-base font-medium text-gray-300 hover:text-white transition-colors">
            Events
          </Link>
          <Link href="/courses" className="text-base font-medium text-gray-300 hover:text-white transition-colors">
            Courses
          </Link>
        </nav>
        <div className="flex items-center gap-4">
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
              className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              href="/blog"
              className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/get-involved"
              className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Involved
            </Link>
            <Link
              href="/events"
              className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/courses"
              className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}