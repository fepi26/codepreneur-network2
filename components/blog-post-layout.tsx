"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react" // Added import for React
import { useRef, useState } from "react"

interface BlogPostLayoutProps {
  title: string
  date: string
  readTime: string
  author: string
  image: string
  children: React.ReactNode
  tags?: string[]
}

export function BlogPostLayout({ title, date, readTime, author, image, children, tags = [] }: BlogPostLayoutProps) {
  // 3D tilt effect state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
    const rotateY = ((x - centerX) / centerX) * 10;  // Max 10 degrees
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <article className="min-h-screen bg-black text-white pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <div className="py-8">
          <Button variant="ghost" asChild className="text-gray-400 hover:text-white">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Post Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
            <time>{date}</time>
            <span>·</span>
            <span>{readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{title}</h1>
          <p className="text-gray-400">By {author}</p>
        </div>

        {/* Featured Image */}
        <div 
          ref={cardRef}
          className="relative w-full aspect-[16/9] mb-12 cursor-pointer transition-all duration-300 ease-out hover:scale-105"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`,
            transformStyle: 'preserve-3d',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          <Image 
            src={image || "/placeholder.svg"} 
            alt={title} 
            fill 
            className="object-cover rounded-xl transition-all duration-300" 
            priority 
          />
          {/* 3D glow effect overlay */}
          <div 
            className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{
              opacity: isHovered ? 0.3 : 0,
              background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 70%)',
              transform: 'translateZ(20px)',
            }}
          />
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className=" flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-zinc-900 text-gray-300 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert max-w-none [&_p]:text-justify">{children}</div>
      </div>
    </article>
  )
}

